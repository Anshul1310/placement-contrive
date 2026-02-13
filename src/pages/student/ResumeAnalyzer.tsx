import StudentLayout from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Star,
  Target,
  Sparkles,
  Download,
  RefreshCw,
  Building2,
  Loader2
} from "lucide-react";
import { useState, useRef } from "react";
import { analyzeResumeWithLlama, type ResumeAnalysisData } from "@/lib/llama"; // Ensure this matches your actual import path
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeAnalyzer = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null); // REF FOR PDF GENERATION
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisData | null>(null);

  // --- PDF GENERATION LOGIC ---
  const handleDownloadPDF = async () => {
    if (!reportRef.current || !analysis) return;

    setIsDownloading(true);
    try {
      // 1. Capture the DOM element as a high-res canvas
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Handle external images if any
        backgroundColor: "#ffffff" // Ensure white background for PDF
      });

      // 2. Initialize PDF (A4 size)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // 3. Calculate dimensions to fit content
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 4. Add image to PDF (Handle multi-page if content is too long)
      let heightLeft = imgHeight;
      let position = 0;
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 5. Save file
      pdf.save(`Resume_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "Report Downloaded",
        description: "Your graphical report has been saved successfully.",
      });

    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({
        title: "Download Failed",
        description: "Could not generate the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const data = await analyzeResumeWithLlama(file);
      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been successfully analyzed.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">AI Resume Analyzer</h1>
            <p className="text-muted-foreground mt-1">
              Get instant AI feedback on your resume quality and ATS compatibility
            </p>
          </div>
          {analysis && (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleDownloadPDF} 
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isDownloading ? "Generating..." : "Download Report"}
              </Button>
              <Button variant="hero" onClick={triggerFileUpload} disabled={isAnalyzing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                Re-analyze
              </Button>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf"
          onChange={handleFileUpload}
        />

        {isAnalyzing ? (
           /* Loading State */
           <Card variant="glass" className="max-w-2xl mx-auto py-20">
             <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
               <Loader2 className="w-16 h-16 text-primary animate-spin" />
               <h3 className="text-2xl font-semibold">Analyzing your resume...</h3>
               <p className="text-muted-foreground max-w-md">
                 Our AI is reading your details, checking ATS compatibility, and generating personalized feedback.
               </p>
             </CardContent>
           </Card>
        ) : analysis ? (
          // THIS DIV IS WHAT GETS PRINTED TO PDF
          <div ref={reportRef} className="bg-background p-4 rounded-xl"> 
            
            {/* Added a Title specifically for the PDF view that might normally be hidden or just part of the layout */}
            <div className="mb-6 text-center md:hidden print:block">
               <h2 className="text-2xl font-bold">Resume Analysis Report</h2>
               <p className="text-muted-foreground text-sm">Generated by Nexus Placements AI</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Left Column - Scores */}
              <div className="space-y-6">
                {/* Overall Score */}
                <Card variant="gradient" className="border-primary/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                      <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
                        <div>
                          <p className="text-4xl font-bold font-display gradient-text">{analysis.overallScore}</p>
                          <p className="text-xs text-muted-foreground">out of 100</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Overall Score</h3>
                    <p className="text-sm text-muted-foreground">
                      {analysis.overallScore > 80 ? "Your resume is excellent!" : analysis.overallScore > 60 ? "Good start, but needs work." : "Needs significant improvement."}
                    </p>
                  </CardContent>
                </Card>

                {/* ATS Score */}
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      ATS Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Score</span>
                      <span className="font-bold">{analysis.atsScore}%</span>
                    </div>
                    <Progress value={analysis.atsScore} className="h-3 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      {analysis.atsScore > 75 ? "Your resume is likely to pass most ATS filters." : "Formatting issues might block your resume."}
                    </p>
                  </CardContent>
                </Card>

                {/* Company Match */}
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-accent" />
                      Company Match
                    </CardTitle>
                    <CardDescription>Based on your target companies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysis.companyMatch.map((company) => (
                      <div key={company.name} className="flex items-center justify-between">
                        <span className="font-medium">{company.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={company.match} className="w-20 h-2" />
                          <span className="text-sm text-muted-foreground w-10">{company.match}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column - Section Analysis */}
              <div className="space-y-6">
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Section Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of each section</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysis.sections.map((section) => (
                      <div key={section.name} className="p-4 rounded-xl bg-secondary/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{section.name}</span>
                          <div className="flex items-center gap-2">
                            {section.score >= 90 ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : section.score >= 70 ? (
                              <Star className="w-5 h-5 text-yellow-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            )}
                            <span className="font-semibold">{section.score}%</span>
                          </div>
                        </div>
                        <Progress value={section.score} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">{section.feedback}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Suggestions & Keywords */}
              <div className="space-y-6">
                {/* AI Suggestions */}
                <Card variant="glass" className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                        <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">Present Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.present.map((keyword) => (
                          <span key={keyword} className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-destructive mb-2">Missing Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.missing.map((keyword) => (
                          <span key={keyword} className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Upload State (Initial View) */
          <Card variant="glass" className="max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div 
                onClick={triggerFileUpload}
                className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop your resume here, or click to browse
                </p>
                <Button variant="hero">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: PDF (Max 5MB)
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
};

export default ResumeAnalyzer;