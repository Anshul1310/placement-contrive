import StudentLayout from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  BookOpen, 
  FileText, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  Brain,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { icon: BookOpen, title: "Practice Aptitude", href: "/student/preparation", color: "primary" },
  { icon: FileText, title: "Analyze Resume", href: "/student/resume", color: "accent" },
  { icon: MessageSquare, title: "Mock Interview", href: "/student/interview", color: "[hsl(200_80%_50%)]" },
  { icon: TrendingUp, title: "View Predictions", href: "/student/predictions", color: "[hsl(150_80%_45%)]" },
];

const upcomingTasks = [
  { title: "Complete Aptitude Test", deadline: "Today", priority: "high", progress: 60 },
  { title: "Submit Updated Resume", deadline: "Tomorrow", priority: "medium", progress: 80 },
  { title: "Technical Mock Interview", deadline: "In 3 days", priority: "low", progress: 0 },
];

const recentActivity = [
  { title: "Completed Logical Reasoning Module", time: "2 hours ago", type: "practice" },
  { title: "Resume analyzed - Score: 85%", time: "Yesterday", type: "resume" },
  { title: "Mock Interview - Communication: A", time: "2 days ago", type: "interview" },
];

const skillProgress = [
  { name: "Aptitude", progress: 75, color: "primary" },
  { name: "Technical", progress: 60, color: "accent" },
  { name: "Communication", progress: 85, color: "[hsl(200_80%_50%)]" },
  { name: "Domain Knowledge", progress: 45, color: "[hsl(150_80%_45%)]" },
];

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Welcome back, John! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Here's your personalized placement dashboard
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/student/preparation">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/student/interview">
                <Sparkles className="w-4 h-4 mr-2" />
                Start AI Interview
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="stat">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Placement Score</p>
                <p className="text-3xl font-bold font-display gradient-text">78%</p>
                <p className="text-xs text-green-400 mt-1">+5% from last week</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card variant="stat">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Skills Completed</p>
                <p className="text-3xl font-bold font-display">12/18</p>
                <p className="text-xs text-muted-foreground mt-1">67% progress</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card variant="stat">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Practice Sessions</p>
                <p className="text-3xl font-bold font-display">24</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(200_80%_50%)]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[hsl(200_80%_50%)]" />
              </div>
            </div>
          </Card>

          <Card variant="stat">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interview Ready</p>
                <p className="text-3xl font-bold font-display">85%</p>
                <p className="text-xs text-green-400 mt-1">Above average</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(150_80%_45%)]/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[hsl(150_80%_45%)]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Roadmap & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Jump into your next activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-${action.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`w-6 h-6 text-${action.color}`} />
                      </div>
                      <span className="text-sm font-medium text-center">{action.title}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
                  <CardDescription>Your personalized preparation roadmap</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={task.title}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      task.priority === 'high' ? 'bg-destructive/20' : 
                      task.priority === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                    }`}>
                      {task.progress === 100 ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className={`w-5 h-5 ${
                          task.priority === 'high' ? 'text-destructive' : 
                          task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.deadline}</p>
                    </div>
                    <div className="w-24">
                      <Progress value={task.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right mt-1">{task.progress}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skill Progress */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Skill Progress
                </CardTitle>
                <CardDescription>Track your improvement across key areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillProgress.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Insights & Activity */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <Card variant="gradient" className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-1">Focus Area</p>
                  <p className="text-sm text-muted-foreground">
                    Your technical skills need improvement. Practice Data Structures daily.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm font-medium text-accent mb-1">Suggested Companies</p>
                  <p className="text-sm text-muted-foreground">
                    Based on your profile: TCS, Infosys, Wipro match 85%+ compatibility.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[hsl(200_80%_50%)]/10 border border-[hsl(200_80%_50%)]/20">
                  <p className="text-sm font-medium text-[hsl(200_80%_50%)] mb-1">Next Step</p>
                  <p className="text-sm text-muted-foreground">
                    Complete mock interview to boost confidence score by 10%.
                  </p>
                </div>
                <Button variant="default" className="w-full">
                  Get Detailed Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your latest actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.type === 'practice' ? 'bg-primary/20' :
                      activity.type === 'resume' ? 'bg-accent/20' : 'bg-[hsl(200_80%_50%)]/20'
                    }`}>
                      {activity.type === 'practice' && <BookOpen className="w-4 h-4 text-primary" />}
                      {activity.type === 'resume' && <FileText className="w-4 h-4 text-accent" />}
                      {activity.type === 'interview' && <MessageSquare className="w-4 h-4 text-[hsl(200_80%_50%)]" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div>
                    <p className="text-sm font-medium">TCS Drive</p>
                    <p className="text-xs text-muted-foreground">Application closes</p>
                  </div>
                  <span className="text-sm font-bold text-destructive">2 days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div>
                    <p className="text-sm font-medium">Infosys Test</p>
                    <p className="text-xs text-muted-foreground">Online assessment</p>
                  </div>
                  <span className="text-sm font-bold text-yellow-500">5 days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div>
                    <p className="text-sm font-medium">Mock Interview</p>
                    <p className="text-xs text-muted-foreground">HR Round practice</p>
                  </div>
                  <span className="text-sm font-bold text-green-500">1 week</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
