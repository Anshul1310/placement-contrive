import CoordinatorLayout from "@/components/layouts/CoordinatorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  UserCheck,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { title: "Total Students", value: "248", change: "+12", icon: Users, color: "primary" },
  { title: "Placed Students", value: "156", change: "+8", icon: UserCheck, color: "green-500" },
  { title: "Active Companies", value: "12", change: "+2", icon: Building2, color: "accent" },
  { title: "Pending Interviews", value: "34", change: "-5", icon: Calendar, color: "yellow-500" },
];

const upcomingDrives = [
  { company: "TCS", date: "Feb 5, 2026", students: 145, status: "Scheduled", type: "On-Campus" },
  { company: "Infosys", date: "Feb 8, 2026", students: 132, status: "Open", type: "On-Campus" },
  { company: "Wipro", date: "Feb 12, 2026", students: 98, status: "Registering", type: "Virtual" },
  { company: "Cognizant", date: "Feb 15, 2026", students: 78, status: "Upcoming", type: "On-Campus" },
];

const recentActivity = [
  { action: "TCS shortlist released", time: "2 hours ago", type: "company" },
  { action: "45 students registered for Infosys", time: "5 hours ago", type: "registration" },
  { action: "Interview schedule updated", time: "Yesterday", type: "schedule" },
  { action: "Placement report generated", time: "2 days ago", type: "report" },
];

const batchAnalysis = {
  avgReadiness: 72,
  highPerformers: 45,
  needsAttention: 28,
  distribution: { placed: 63, inProcess: 22, notStarted: 15 },
};

const CoordinatorDashboard = () => {
  return (
    <CoordinatorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Coordinator Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage placements and track student progress
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="hero">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} variant="stat">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold font-display">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-destructive'
                  }`}>
                    {stat.change} this week
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Drives */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Upcoming Placement Drives</CardTitle>
                  <CardDescription>Scheduled company visits and interviews</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDrives.map((drive) => (
                    <div
                      key={drive.company}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{drive.company}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {drive.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {drive.students} eligible
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          drive.status === 'Scheduled' ? 'bg-green-500/20 text-green-400' :
                          drive.status === 'Open' ? 'bg-primary/20 text-primary' :
                          drive.status === 'Registering' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {drive.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{drive.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Batch Analysis */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Batch Analysis
                </CardTitle>
                <CardDescription>AI-powered insights on batch performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Average Readiness */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-2">Avg. Placement Readiness</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold font-display gradient-text">{batchAnalysis.avgReadiness}%</span>
                    </div>
                    <Progress value={batchAnalysis.avgReadiness} className="h-2 mt-3" />
                  </div>

                  {/* Performance Distribution */}
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-3">Performance Distribution</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          High Performers
                        </span>
                        <span className="font-semibold">{batchAnalysis.highPerformers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive" />
                          Needs Attention
                        </span>
                        <span className="font-semibold">{batchAnalysis.needsAttention}</span>
                      </div>
                    </div>
                  </div>

                  {/* Placement Status */}
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-3">Placement Status</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Placed</span>
                        <span className="font-semibold text-green-400">{batchAnalysis.distribution.placed}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">In Process</span>
                        <span className="font-semibold text-yellow-400">{batchAnalysis.distribution.inProcess}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Not Started</span>
                        <span className="font-semibold text-muted-foreground">{batchAnalysis.distribution.notStarted}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Status Table */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Students Requiring Attention</CardTitle>
                  <CardDescription>Students with low readiness scores</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/coordinator/students">View All Students</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Amit Kumar", branch: "CSE", score: 45, issue: "Low mock interview scores" },
                    { name: "Priya Singh", branch: "ECE", score: 52, issue: "Resume not updated" },
                    { name: "Rahul Sharma", branch: "IT", score: 48, issue: "Technical skills below average" },
                  ].map((student) => (
                    <div
                      key={student.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.branch} • {student.issue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-destructive">{student.score}%</p>
                          <p className="text-xs text-muted-foreground">Readiness</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card variant="gradient" className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm font-medium text-primary mb-1">Batch Forecast</p>
                  <p className="text-sm text-muted-foreground">
                    Predicted placement rate: <span className="font-semibold text-primary">78%</span> by semester end.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10">
                  <p className="text-sm font-medium text-accent mb-1">Company Match</p>
                  <p className="text-sm text-muted-foreground">
                    TCS and Infosys show highest compatibility with current batch.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <p className="text-sm font-medium text-yellow-400 mb-1">Attention Needed</p>
                  <p className="text-sm text-muted-foreground">
                    28 students need immediate intervention to improve scores.
                  </p>
                </div>
                <Button variant="default" className="w-full">
                  View Full Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.type === 'company' ? 'bg-accent/20' :
                      activity.type === 'registration' ? 'bg-primary/20' :
                      activity.type === 'schedule' ? 'bg-yellow-500/20' : 'bg-secondary'
                    }`}>
                      {activity.type === 'company' && <Building2 className="w-4 h-4 text-accent" />}
                      {activity.type === 'registration' && <Users className="w-4 h-4 text-primary" />}
                      {activity.type === 'schedule' && <Calendar className="w-4 h-4 text-yellow-500" />}
                      {activity.type === 'report' && <FileText className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-2" />
                  Register Company
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Drive
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CoordinatorLayout>
  );
};

export default CoordinatorDashboard;
