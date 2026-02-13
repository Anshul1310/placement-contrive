import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  BookOpen, 
  Brain, 
  BarChart3 
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analyzer",
    description: "AI feedback on quality, ATS compatibility, and skill gaps.",
    tag: "Profile",
  },
  {
    icon: MessageSquare,
    title: "Mock Interview",
    description: "Practice with AI through text or voice with real-time evaluation.",
    tag: "Interview",
  },
  {
    icon: TrendingUp,
    title: "Predictions",
    description: "AI predicts placement probability and highlights weak areas.",
    tag: "Analytics",
  },
  {
    icon: BookOpen,
    title: "Smart Prep",
    description: "AI-generated questions with company-specific practice modules.",
    tag: "Practice",
  },
  {
    icon: Brain,
    title: "AI Advisor",
    description: "Personalized learning paths that adapt to your goals.",
    tag: "Personal",
  },
  {
    icon: BarChart3,
    title: "Batch Insights",
    description: "For coordinators: batch performance and forecasting.",
    tag: "Admin",
  },
];

const AIFeatures = () => {
  return (
    <section id="ai-features" className="py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs mb-4">
            <Brain className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Intelligent Features for <span className="gradient-text">Every Step</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            From resume building to interview prep, AI guides your entire placement journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="feature"
              className="p-4 animate-fade-in-up hover:translate-y-[-4px] transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-sm">{feature.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {feature.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
