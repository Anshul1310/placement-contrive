import StudentLayout from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Mic, 
  Video, 
  Play,
  Clock,
  Star,
  Target,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Building2
} from "lucide-react";
import { useState } from "react";

const interviewTypes = [
  {
    id: "hr",
    title: "HR Interview",
    description: "Behavioral & situational questions",
    icon: MessageSquare,
    duration: "30 mins",
    difficulty: "Moderate",
  },
  {
    id: "technical",
    title: "Technical Interview",
    description: "Coding & problem-solving",
    icon: Target,
    duration: "45 mins",
    difficulty: "Hard",
  },
  {
    id: "company",
    title: "Company-Specific",
    description: "TCS, Infosys, Wipro patterns",
    icon: Building2,
    duration: "40 mins",
    difficulty: "Varies",
  },
];

const pastInterviews = [
  {
    type: "HR Interview",
    date: "2 days ago",
    score: 85,
    feedback: {
      confidence: 88,
      communication: 82,
      content: 85,
    },
  },
  {
    type: "Technical Interview",
    date: "1 week ago",
    score: 72,
    feedback: {
      confidence: 75,
      communication: 80,
      content: 65,
    },
  },
];

const sampleQuestions = [
  "Tell me about yourself and your career aspirations.",
  "Why do you want to work for our company?",
  "Describe a challenging situation you faced and how you handled it.",
  "What are your greatest strengths and weaknesses?",
];

const MockInterview = () => {
  const [mode, setMode] = useState<"select" | "interview" | "results">("select");
  const [interviewMode, setInterviewMode] = useState<"text" | "voice">("text");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">AI Mock Interview</h1>
            <p className="text-muted-foreground mt-1">
              Practice with our AI interviewer and get real-time feedback
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Interview History
            </Button>
          </div>
        </div>

        {mode === "select" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Interview Types */}
            <div className="lg:col-span-2 space-y-6">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Choose Interview Type</CardTitle>
                  <CardDescription>Select the type of interview you want to practice</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  {interviewTypes.map((type) => (
                    <div
                      key={type.id}
                      className="p-6 rounded-xl border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group"
                      onClick={() => setMode("interview")}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <type.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{type.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{type.duration}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          type.difficulty === 'Hard' ? 'bg-destructive/20 text-destructive' :
                          type.difficulty === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {type.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Interview Mode */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Interview Mode</CardTitle>
                  <CardDescription>Choose how you want to respond</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${
                      interviewMode === 'text' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setInterviewMode("text")}
                  >
                    <MessageSquare className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-1">Text Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Type your responses to practice articulation
                    </p>
                  </div>
                  <div
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${
                      interviewMode === 'voice' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setInterviewMode("voice")}
                  >
                    <Mic className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-1">Voice Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Speak your answers for realistic practice
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Questions */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Sample Questions</CardTitle>
                  <CardDescription>Preview what to expect</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sampleQuestions.map((q, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <p className="text-sm">{q}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Past Interviews */}
            <div className="space-y-6">
              <Card variant="gradient" className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Jump into a quick 10-minute interview session with AI-selected questions.
                  </p>
                  <Button variant="hero" className="w-full" onClick={() => setMode("interview")}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Quick Interview
                  </Button>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastInterviews.map((interview, index) => (
                    <div key={index} className="p-4 rounded-xl bg-secondary/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">{interview.type}</span>
                        <span className="text-xs text-muted-foreground">{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="text-xl font-bold gradient-text">{interview.score}</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Confidence</span>
                            <span>{interview.feedback.confidence}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Communication</span>
                            <span>{interview.feedback.communication}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Content</span>
                            <span>{interview.feedback.content}%</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Tips for Success</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Use STAR method for behavioral questions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Maintain eye contact (for video mode)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Keep answers concise - 2 to 3 minutes max</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Practice regularly for best results</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {mode === "interview" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Interview Progress */}
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of 5</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-8 h-1 rounded-full ${
                            i < currentQuestion ? 'bg-green-500' :
                            i === currentQuestion ? 'bg-primary' : 'bg-secondary'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>15:30 remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Interviewer */}
            <Card variant="gradient" className="border-primary/30">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">AI Interviewer</p>
                    <p className="text-muted-foreground text-sm">HR Round • Question {currentQuestion + 1}</p>
                  </div>
                </div>
                <p className="text-xl font-medium leading-relaxed">
                  {sampleQuestions[currentQuestion]}
                </p>
              </CardContent>
            </Card>

            {/* Response Area */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Your Response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviewMode === "text" ? (
                  <textarea
                    className="w-full h-40 p-4 rounded-xl bg-secondary/30 border border-border focus:border-primary/50 outline-none resize-none"
                    placeholder="Type your response here..."
                  />
                ) : (
                  <div className="h-40 rounded-xl bg-secondary/30 border border-border flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click to start recording</p>
                  </div>
                )}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setMode("select")}>
                    Exit Interview
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}>
                      Previous
                    </Button>
                    <Button 
                      variant="hero"
                      onClick={() => {
                        if (currentQuestion < 4) {
                          setCurrentQuestion(currentQuestion + 1);
                        } else {
                          setMode("results");
                        }
                      }}
                    >
                      {currentQuestion < 4 ? "Next Question" : "Finish Interview"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {mode === "results" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card variant="gradient" className="border-primary/30 text-center">
              <CardContent className="p-12">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
                    <div>
                      <p className="text-5xl font-bold font-display gradient-text">85</p>
                      <p className="text-xs text-muted-foreground">out of 100</p>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold font-display mb-2">Great Performance!</h2>
                <p className="text-muted-foreground">You've shown strong communication skills and confidence.</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card variant="glass">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">88%</p>
                  <p className="font-medium">Confidence</p>
                  <p className="text-sm text-muted-foreground mt-1">Above average</p>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">82%</p>
                  <p className="font-medium">Communication</p>
                  <p className="text-sm text-muted-foreground mt-1">Clear articulation</p>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">85%</p>
                  <p className="font-medium">Content Quality</p>
                  <p className="text-sm text-muted-foreground mt-1">Relevant answers</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setMode("select")}>
                Back to Selection
              </Button>
              <Button variant="hero" onClick={() => setMode("interview")}>
                Practice Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MockInterview;
