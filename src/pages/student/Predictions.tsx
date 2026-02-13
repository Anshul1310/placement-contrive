import StudentLayout from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Brain,
  Building2,
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const predictionData = {
  placementProbability: 78,
  trend: "+5%",
  trendDirection: "up",
  confidence: "High",
  factors: [
    { name: "Technical Skills", score: 75, weight: 30, impact: "positive" },
    { name: "Communication", score: 85, weight: 25, impact: "positive" },
    { name: "Aptitude", score: 70, weight: 20, impact: "neutral" },
    { name: "Resume Quality", score: 85, weight: 15, impact: "positive" },
    { name: "Interview Prep", score: 60, weight: 10, impact: "negative" },
  ],
  weeklyProgress: [65, 68, 70, 72, 75, 76, 78],
  recommendations: [
    { action: "Complete 3 more mock interviews", impact: "+8%", priority: "high" },
    { action: "Finish Data Structures module", impact: "+5%", priority: "high" },
    { action: "Update resume with recent project", impact: "+3%", priority: "medium" },
    { action: "Practice aptitude daily", impact: "+4%", priority: "medium" },
  ],
  companyPredictions: [
    { name: "TCS", probability: 92, status: "Highly Likely" },
    { name: "Infosys", probability: 88, status: "Highly Likely" },
    { name: "Wipro", probability: 82, status: "Likely" },
    { name: "Cognizant", probability: 75, status: "Likely" },
    { name: "Amazon", probability: 45, status: "Moderate" },
  ],
};

const Predictions = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Placement Predictions</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered insights into your placement readiness
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View History
            </Button>
            <Button variant="hero">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Detailed Report
            </Button>
          </div>
        </div>

        {/* Main Prediction Score */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card variant="gradient" className="lg:col-span-2 border-primary/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-card flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-6xl font-bold font-display gradient-text">
                          {predictionData.placementProbability}%
                        </p>
                        <p className="text-sm text-muted-foreground">Placement Probability</p>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                    predictionData.trendDirection === 'up' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {predictionData.trendDirection === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {predictionData.trend}
                  </div>
                </div>

                {/* Score Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Your Placement Readiness</h3>
                    <p className="text-muted-foreground">
                      Based on your current progress, you have a <span className="text-primary font-semibold">{predictionData.confidence}</span> confidence placement prediction.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                      <p className="text-sm text-green-400 font-medium">Strengths</p>
                      <p className="text-lg font-semibold">Communication, Resume</p>
                    </div>
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                      <p className="text-sm text-destructive font-medium">Focus Areas</p>
                      <p className="text-lg font-semibold">Interview Prep, DSA</p>
                    </div>
                  </div>

                  {/* Weekly Trend */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">7-Day Progress</p>
                    <div className="flex items-end gap-2 h-16">
                      {predictionData.weeklyProgress.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-primary/40 rounded-t-sm transition-all hover:bg-primary"
                          style={{ height: `${value}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>7 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card variant="glass" className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Recommendations
              </CardTitle>
              <CardDescription>Actions to improve your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {predictionData.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    rec.priority === 'high' 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-secondary/30 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      rec.priority === 'high' ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {rec.priority === 'high' ? 'High Priority' : 'Recommended'}
                    </span>
                    <span className="text-sm font-semibold text-green-400">{rec.impact}</span>
                  </div>
                  <p className="text-sm">{rec.action}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Factor Analysis & Company Predictions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Factor Analysis */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Factor Analysis
              </CardTitle>
              <CardDescription>How each factor impacts your prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictionData.factors.map((factor) => (
                <div key={factor.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{factor.name}</span>
                      <span className="text-xs text-muted-foreground">({factor.weight}% weight)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {factor.impact === 'positive' && <ArrowUp className="w-4 h-4 text-green-500" />}
                      {factor.impact === 'negative' && <ArrowDown className="w-4 h-4 text-destructive" />}
                      <span className={`font-semibold ${
                        factor.impact === 'positive' ? 'text-green-400' :
                        factor.impact === 'negative' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {factor.score}%
                      </span>
                    </div>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Company Predictions */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent" />
                Company-wise Predictions
              </CardTitle>
              <CardDescription>Your chances at target companies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictionData.companyPredictions.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className={`text-xs ${
                        company.probability >= 80 ? 'text-green-400' :
                        company.probability >= 60 ? 'text-yellow-400' : 'text-muted-foreground'
                      }`}>
                        {company.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={company.probability} className="w-24 h-2" />
                    <span className="font-semibold w-12 text-right">{company.probability}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Improvement Areas */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-lg">Detailed Improvement Plan</CardTitle>
            <CardDescription>Follow these steps to maximize your placement chances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30">
                <AlertCircle className="w-8 h-8 text-destructive mb-4" />
                <h3 className="font-semibold mb-2">Critical: Interview Prep</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your mock interview score is below average. This significantly impacts your prediction.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    Complete 5 AI mock interviews
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    Practice STAR method responses
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <AlertCircle className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="font-semibold mb-2">Important: Technical Skills</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  DSA fundamentals need improvement. Focus on commonly asked patterns.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    Complete Arrays & Strings module
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    Solve 50 easy-level problems
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">Maintain: Communication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your communication skills are above average. Keep practicing to maintain.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Continue daily speaking practice
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Participate in group discussions
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default Predictions;
