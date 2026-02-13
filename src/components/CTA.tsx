import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
const CTA = () => {
  return <section className="py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs mb-4">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">Join 50K+ successful placements</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 leading-tight">
            Ready to Transform Your{' '}
            <span className="gradient-text">Placement Journey?</span>
          </h2>

          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
            Join the most intelligent placement platform and take the first step toward your dream career.
          </p>

          

          
        </div>
      </div>
    </section>;
};
export default CTA;