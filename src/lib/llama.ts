import Groq from "groq-sdk";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from 'tesseract.js';

// Initialize Groq
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

// ROBUST WORKER SETUP:
// This forces the worker to load from a reliable CDN matching the installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export interface ResumeAnalysisData {
  overallScore: number;
  atsScore: number;
  sections: { name: string; score: number; feedback: string }[];
  suggestions: string[];
  keywords: {
    present: string[];
    missing: string[];
  };
  companyMatch: { name: string; match: number }[];
}

/**
 * Strategy 1: Fast Text Extraction
 * Tries to pull raw text strings from the PDF layer.
 */
async function extractTextFast(pdf: any): Promise<string> {
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      // @ts-ignore
      .map((item) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
}

/**
 * Strategy 2: OCR (Optical Character Recognition)
 * Renders the PDF page as an image and uses Tesseract to read it.
 * Used for scanned resumes.
 */
async function extractTextOCR(pdf: any): Promise<string> {
  console.log("⚠️ Text layer empty. Switching to OCR (this may take a moment)...");
  let fullText = "";
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // High scale for better recognition
    
    // Create an off-screen canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (context) {
      await page.render({ canvasContext: context, viewport }).promise;
      const imageBlob = canvas.toDataURL('image/png');
      
      const { data: { text } } = await Tesseract.recognize(imageBlob, 'eng', {
        logger: m => console.log(`OCR Progress (Page ${i}):`, m.status, m.progress)
      });
      fullText += text + "\n";
    }
  }
  return fullText;
}

/**
 * Main Extraction Function
 */
async function getRobustPDFText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load the PDF document
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  // Try Fast Extraction first
  let text = await extractTextFast(pdf);

  // Check if text is garbage or empty (indicating a scan)
  const cleanText = text.replace(/\s+/g, '').trim();
  if (cleanText.length < 50) {
    // Fallback to OCR
    text = await extractTextOCR(pdf);
  }

  return text;
}

export async function analyzeResumeWithLlama(file: File): Promise<ResumeAnalysisData> {
  try {
    console.log("1. Starting Analysis...");
    
    // Extract Text (Robust Method)
    const resumeText = await getRobustPDFText(file);
    console.log("2. Text Extracted (Length):", resumeText.length);

    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error("Resume appears empty even after OCR. Please check the file.");
    }

    // Send to Llama 3
    console.log("3. Sending to Groq/Llama...");
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert ATS (Applicant Tracking System) parser. 
          Analyze the resume text provided by the user.
          Return ONLY valid JSON. Do not include any markdown formatting.
          
          The JSON structure must be:
          {
            "overallScore": number (0-100),
            "atsScore": number (0-100),
            "sections": [
              { "name": "Contact Information", "score": number, "feedback": "string" },
              { "name": "Education", "score": number, "feedback": "string" },
              { "name": "Skills", "score": number, "feedback": "string" },
              { "name": "Experience", "score": number, "feedback": "string" },
              { "name": "Projects", "score": number, "feedback": "string" }
            ],
            "suggestions": ["string", "string", "string", "string"],
            "keywords": {
              "present": ["string", "string", "string", "string"],
              "missing": ["string", "string", "string", "string"]
            },
            "companyMatch": [
              { "name": "TCS", "match": number },
              { "name": "Infosys", "match": number },
              { "name": "Wipro", "match": number },
              { "name": "Cognizant", "match": number }
            ]
          }`
        },
        {
          role: "user",
          content: `Resume Text:\n${resumeText.slice(0, 15000)}` // Limit tokens just in case
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: { type: "json_object" } // Force JSON mode
    });

    const content = completion.choices[0]?.message?.content || "{}";
    return JSON.parse(content);

  } catch (error) {
    console.error("Full Analysis Error:", error);
    throw new Error("Failed to analyze resume. Please ensure it is a valid PDF.");
  }
}