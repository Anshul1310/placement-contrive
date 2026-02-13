import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Calendar,
  Bell,
  Settings,
  LogOut,
  Building2,
  FileText,
  BarChart3
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/recruiter/dashboard", icon: LayoutDashboard },
  { title: "Candidates", url: "/recruiter/candidates", icon: Users },
  { title: "Search Talent", url: "/recruiter/search", icon: Search },
  { title: "Interviews", url: "/recruiter/interviews", icon: Calendar },
  { title: "Analytics", url: "/recruiter/analytics", icon: BarChart3 },
];

interface RecruiterLayoutProps {
  children: ReactNode;
}

const SidebarContents = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <>
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          {!collapsed && <span className="font-display font-bold text-lg">PlaceAI</span>}
        </Link>
      </div>

      <SidebarContent className="px-2 py-4">
        {/* Recruiter Profile */}
        <div className={`mb-6 p-3 rounded-xl bg-sidebar-accent ${collapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <p className="font-medium text-sm">TCS Recruitment</p>
                <p className="text-xs text-sidebar-foreground/60">HR Manager</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        {!collapsed && (
          <div className="mb-6 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-2xl font-bold font-display text-primary">145</p>
              <p className="text-xs text-sidebar-foreground/60">Applicants</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-2xl font-bold font-display text-green-400">28</p>
              <p className="text-xs text-sidebar-foreground/60">Shortlisted</p>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            {collapsed ? '' : 'Recruitment'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom section */}
      <div className="mt-auto border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/recruiter/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                <Settings className="w-5 h-5" />
                {!collapsed && <span>Settings</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-destructive transition-colors">
                <LogOut className="w-5 h-5" />
                {!collapsed && <span>Logout</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </>
  );
};

const RecruiterLayout = ({ children }: RecruiterLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-sidebar-border">
          <SidebarContents />
        </Sidebar>
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 gap-4 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger />
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </Button>
          </header>
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterLayout;
