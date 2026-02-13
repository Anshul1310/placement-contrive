import { Brain, TrendingUp, Users, Target, BarChart3, MessageSquare } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Predictions", desc: "98% accurate placement forecasting" },
  { icon: TrendingUp, title: "Smart Prep", desc: "Personalized learning paths" },
  { icon: Users, title: "Unified Platform", desc: "Connect all stakeholders" },
  { icon: Target, title: "Company Match", desc: "AI-powered mutual fit scoring" },
  { icon: BarChart3, title: "Live Analytics", desc: "Real-time dashboards" },
  { icon: MessageSquare, title: "AI Coach", desc: "Mock interviews on demand" },
];

const Features = () => {
  return (
    <section id="features" className="py-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Powered by <span className="gradient-text">AI</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Transforming placements with intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
