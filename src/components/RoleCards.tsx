import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Briefcase, ArrowRight, Check, Album } from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
{
  icon: GraduationCap,
  title: "Students",
  description: "Your AI career companion",
  gradient: "from-primary to-primary/50",
  link: "/student/dashboard",
  features: ["Skill gap analysis", "Interview prep", "Company matching", "Progress tracking"]
},
{
  icon: Building2,
  title: "Coordinators",
  description: "Streamline placements",
  gradient: "from-accent to-accent/50",
  link: "/coordinator/dashboard",
  features: ["Student management", "Auto scheduling", "Analytics dashboard", "Bulk operations"]
},
{
  icon: Briefcase,
  title: "Recruiters",
  description: "Find top talent faster",
  gradient: "from-[hsl(200_80%_50%)] to-[hsl(200_80%_50%)/0.5]",
  link: "/recruiter/dashboard",
  features: ["Smart shortlisting", "Culture fit analysis", "Interview scheduling", "Candidate insights"]
}];


const RoleCards = () => {
  return (
    <section id="roles" className="py-8 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Built for <span className="gradient-text">Everyone</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Whether you're seeking opportunities, managing placements, or finding talent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {roles.map((role, index) =>
          <div
            key={role.title}
            className="group relative p-5 rounded-xl bg-card/60 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}>

              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="">
                  <role.icon className="w-5 h-5 text-sidebar bg-primary" />
                </div>
                
                <h3 className="font-display font-semibold text-lg mb-1">{role.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                
                <ul className="space-y-2 mb-5">
                  {role.features.map((feature) =>
                <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      {feature}
                    </li>
                )}
                </ul>

                <Button variant="outline" size="sm" asChild className="w-full group/btn text-xs">
                  <Link to={role.link}>
                    Get Started
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default RoleCards;