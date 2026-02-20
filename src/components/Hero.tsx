import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Building2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Smart handler: Login if needed, otherwise navigate
  const handleNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      login(path); // Pass the intended destination to the login function
    }
  };

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-14">
      {/* Animated background */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs mb-6 animate-fade-in hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">AI-Powered Placement Platform</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Main headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-4 leading-[1.1] tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            An End-to-End AI Suite for{' '}
            <span className="gradient-text relative">
              Smarter Placements
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 2 150 2 298 10" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="hsl(173 80% 50%)" />
                    <stop offset="1" stopColor="hsl(260 80% 65%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-5 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Prepare better, predict outcomes, and place students efficiently using AI.
            One unified platform for students, coordinators, and recruiters.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => handleNavigation('/student/dashboard')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Login Options */}
          <div 
            className="flex flex-wrap gap-2 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs hover:bg-primary/10 hover:text-primary transition-all"
              onClick={() => handleNavigation('/student/dashboard')}
            >
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Student
              </div>
            </Button>
            <span className="text-border">•</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs hover:bg-accent/10 hover:text-accent transition-all"
              onClick={() => handleNavigation('/coordinator/dashboard')}
            >
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Coordinator
              </div>
            </Button>
            <span className="text-border">•</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs hover:bg-[hsl(200_80%_50%)]/10 hover:text-[hsl(200_80%_50%)] transition-all"
              onClick={() => handleNavigation('/recruiter/dashboard')}
            >
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Recruiter
              </div>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div 
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="relative mx-auto max-w-3xl group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              <div className="relative rounded-xl border border-border/50 overflow-hidden shadow-2xl shadow-primary/10 bg-card/80 backdrop-blur-sm">
                {/* Browser bar */}
                <div className="h-7 bg-secondary/80 border-b border-border/50 flex items-center gap-1.5 px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-0.5 bg-background/50 rounded text-[10px] text-muted-foreground">
                      evolveai.app/dashboard
                    </div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-4 grid grid-cols-12 gap-3">
                  {/* Sidebar */}
                  <div className="col-span-2 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-6 rounded ${i === 0 ? 'bg-primary/30' : 'bg-secondary/50'}`} />
                    ))}
                  </div>
                  
                  {/* Main content */}
                  <div className="col-span-10 space-y-3">
                    <div className="h-24 rounded-lg bg-gradient-to-br from-primary/20 via-accent/10 to-transparent flex items-center justify-center border border-primary/20">
                      <span className="text-sm font-display font-medium text-primary">AI Analytics Dashboard</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['85%', '12', '94'].map((value, i) => (
                        <div key={i} className="h-16 rounded-lg bg-secondary/50 flex flex-col items-center justify-center border border-border/30 hover:border-primary/30 transition-colors">
                          <span className="text-lg font-bold text-foreground">{value}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {['Readiness', 'Interviews', 'Score'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;