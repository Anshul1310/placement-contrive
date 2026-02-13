import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "For Students", href: "/student/dashboard" },
    { label: "For Coordinators", href: "/coordinator/dashboard" },
    { label: "For Recruiters", href: "/recruiter/dashboard" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const socials = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
  { icon: Mail, href: "#" },
];

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">P</span>
              </div>
              <span className="font-display font-bold text-lg">EvolveAI</span>
            </Link>
            <p className="text-xs text-muted-foreground mb-4 max-w-xs">
              AI-powered placement platform transforming how students find careers.
            </p>
            <div className="flex gap-2">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('/') ? (
                      <Link to={item.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">© 2026 EvolveAI. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ for the next generation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
