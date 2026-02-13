import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary-foreground font-bold text-xs">P</span>
            </div>
            <span className="font-display font-bold text-lg">EvolveAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#ai-features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                For You <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-strong">
                <DropdownMenuItem asChild className="text-xs">
                  <Link to="/student/dashboard">For Students</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-xs">
                  <Link to="/coordinator/dashboard">For Coordinators</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-xs">
                  <Link to="/recruiter/dashboard">For Recruiters</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-xs h-8">
              <Link to="/student/dashboard">Sign In</Link>
            </Button>
            <Button variant="default" size="sm" asChild className="text-xs h-8">
              <Link to="/student/dashboard">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-3 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              <a href="#ai-features" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                Features
              </a>
              <Link to="/student/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                For Students
              </Link>
              <Link to="/coordinator/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                For Coordinators
              </Link>
              <Link to="/recruiter/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                For Recruiters
              </Link>
              <a href="#how-it-works" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                How It Works
              </a>
              <div className="flex gap-2 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" className="flex-1 text-xs h-8" asChild>
                  <Link to="/student/dashboard">Sign In</Link>
                </Button>
                <Button variant="default" size="sm" className="flex-1 text-xs h-8" asChild>
                  <Link to="/student/dashboard">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;