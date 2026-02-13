import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Home, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  Target,
  Brain
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: Home },
  { title: "Preparation", url: "/student/preparation", icon: BookOpen },
  { title: "Resume Analyzer", url: "/student/resume", icon: FileText },
  { title: "Mock Interview", url: "/student/interview", icon: MessageSquare },
  { title: "Predictions", url: "/student/predictions", icon: TrendingUp },
  { title: "Notifications", url: "/student/notifications", icon: Bell },
];

interface StudentLayoutProps {
  children: ReactNode;
}

const SidebarContents = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

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
        {/* User Profile */}
        <div className={`mb-6 p-3 rounded-xl bg-sidebar-accent ${collapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-sidebar-foreground/60">B.Tech CSE • 2026</p>
              </div>
            )}
          </div>
        </div>

        {/* Readiness Score */}
        {!collapsed && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sidebar-foreground/80">Placement Readiness</span>
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold font-display gradient-text">78%</span>
              <span className="text-xs text-green-400 mb-1">+5% this week</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-sidebar-accent overflow-hidden">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            {collapsed ? '' : 'Main Menu'}
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

        {/* AI Assistant */}
        {!collapsed && (
          <div className="mt-6 p-4 rounded-xl glass border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Suggestion</span>
            </div>
            <p className="text-xs text-sidebar-foreground/70 mb-3">
              Complete your aptitude practice to improve your readiness score.
            </p>
            <Button size="sm" variant="default" className="w-full" asChild>
              <Link to="/student/preparation">Start Practice</Link>
            </Button>
          </div>
        )}
      </SidebarContent>

      {/* Bottom section */}
      <div className="mt-auto border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/student/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
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

const StudentLayout = ({ children }: StudentLayoutProps) => {
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

export default StudentLayout;
