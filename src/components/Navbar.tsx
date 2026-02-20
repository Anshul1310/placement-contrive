import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const location = useLocation(); // Get current location

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
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
            {/* Show Dashboard Links only if logged in */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Dashboards <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-strong">
                  <DropdownMenuItem asChild className="text-xs">
                    <Link to="/student/dashboard">Student</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-xs">
                    <Link to="/coordinator/dashboard">Coordinator</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-xs h-8 gap-2">
                  <LogOut className="w-3 h-3" /> Log Out
                </Button>
                <Button variant="default" size="sm" asChild className="text-xs h-8">
                  <Link to="/student/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                {/* Sign In returns to current page */}
                <Button variant="ghost" size="sm" onClick={() => login(location.pathname)} className="text-xs h-8">
                  Sign In
                </Button>
                {/* Get Started goes to Dashboard */}
                <Button variant="default" size="sm" onClick={() => login('/student/dashboard')} className="text-xs h-8">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              <a href="#ai-features" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                Features
              </a>
              {user && (
                 <Link to="/student/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                  Dashboard
                </Link>
              )}
              <div className="flex gap-2 pt-3 border-t border-border">
                {user ? (
                  <Button variant="ghost" size="sm" className="flex-1 text-xs h-8" onClick={logout}>
                    Log Out
                  </Button>
                ) : (
                  <Button variant="default" size="sm" className="flex-1 text-xs h-8" onClick={() => login(location.pathname)}>
                    Login with DAuth
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;