import { UserPlus, Sparkles, Building, Trophy } from "lucide-react";

const steps = [
  { icon: UserPlus, num: "01", title: "Create Profile", desc: "Build your comprehensive profile" },
  { icon: Sparkles, num: "02", title: "AI Analysis", desc: "Get personalized prep plan" },
  { icon: Building, num: "03", title: "Smart Match", desc: "Connect with right companies" },
  { icon: Trophy, num: "04", title: "Get Placed", desc: "Land your dream job" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Four simple steps to your dream career.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary hidden md:block" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="relative text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30 hover:scale-110 transition-transform cursor-default">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <span className="text-xs font-mono text-primary mb-1 block">{step.num}</span>
                <h3 className="font-display font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
