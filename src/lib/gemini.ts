import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

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
 * Converts a File object to a GoogleGenerativeAI.Part object (Base64).
 */
async function fileToGenerativePart(file: File) {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function analyzeResumeWithGemini(file: File): Promise<ResumeAnalysisData> {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
  const prompt = `
    You are an expert ATS (Applicant Tracking System) and Resume Analyzer for students.
    Analyze the attached resume and provide a strict JSON response. 
    
    Do NOT include markdown formatting (like \`\`\`json). Just return the raw JSON object.
    
    The JSON structure must be exactly:
    {
      "overallScore": number (0-100),
      "atsScore": number (0-100 based on parsing ease),
      "sections": [
        { "name": "Contact Information", "score": number, "feedback": "string" },
        { "name": "Education", "score": number, "feedback": "string" },
        { "name": "Skills", "score": number, "feedback": "string" },
        { "name": "Experience", "score": number, "feedback": "string" },
        { "name": "Projects", "score": number, "feedback": "string" }
      ],
      "suggestions": ["string", "string", "string", "string"],
      "keywords": {
        "present": ["string", "string", "string", "string", "string"],
        "missing": ["string", "string", "string", "string", "string"]
      },
      "companyMatch": [
        { "name": "TCS", "match": number },
        { "name": "Infosys", "match": number },
        { "name": "Wipro", "match": number },
        { "name": "Cognizant", "match": number }
      ]
    }

    For 'companyMatch', estimate the fit based on standard requirements for these specific companies.
  `;

  try {
    const filePart = await fileToGenerativePart(file);
    const result = await model.generateContent([prompt, filePart]);
    const response = await result.response;
    const text = response.text();

    // Cleanup formatting if Gemini adds markdown code blocks
    const cleanJson = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}