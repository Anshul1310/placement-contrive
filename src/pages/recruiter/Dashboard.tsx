import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UserCheck, 
  Calendar,
  TrendingUp,
  Search,
  FileText,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  CheckCircle,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { title: "Total Applicants", value: "145", change: "+23", icon: Users, color: "primary" },
  { title: "Shortlisted", value: "28", change: "+5", icon: UserCheck, color: "accent" },
  { title: "Interviews Today", value: "8", change: "0", icon: Calendar, color: "yellow-500" },
  { title: "Offers Made", value: "12", change: "+2", icon: CheckCircle, color: "green-500" },
];

const topCandidates = [
  { name: "Priya Sharma", branch: "CSE", score: 95, skills: ["Python", "ML", "React"], status: "Shortlisted" },
  { name: "Rahul Kumar", branch: "IT", score: 92, skills: ["Java", "Spring", "AWS"], status: "Interview" },
  { name: "Ananya Gupta", branch: "ECE", score: 89, skills: ["C++", "Embedded", "IoT"], status: "Shortlisted" },
  { name: "Vikash Singh", branch: "CSE", score: 87, skills: ["JavaScript", "Node.js", "MongoDB"], status: "New" },
];

const upcomingInterviews = [
  { candidate: "Rahul Kumar", time: "10:00 AM", type: "Technical", duration: "45 min" },
  { candidate: "Sneha Patel", time: "11:30 AM", type: "HR", duration: "30 min" },
  { candidate: "Amit Verma", time: "2:00 PM", type: "Technical", duration: "45 min" },
  { candidate: "Pooja Rao", time: "3:30 PM", type: "Final", duration: "60 min" },
];

const RecruiterDashboard = () => {
  return (
    <RecruiterLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Recruiter Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Find and hire top talent with AI-powered insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="hero">
              <Search className="w-4 h-4 mr-2" />
              Search Candidates
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
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-muted-foreground'
                  }`}>
                    {stat.change !== '0' ? `${stat.change} today` : 'No change'}
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
            {/* Top Candidates */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Top Candidates
                  </CardTitle>
                  <CardDescription>AI-ranked based on your requirements</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCandidates.map((candidate) => (
                    <div
                      key={candidate.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-lg font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.branch}</p>
                          <div className="flex gap-1 mt-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold gradient-text">{candidate.score}%</p>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          candidate.status === 'Shortlisted' ? 'bg-green-500/20 text-green-400' :
                          candidate.status === 'Interview' ? 'bg-primary/20 text-primary' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hiring Funnel */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Hiring Funnel
                </CardTitle>
                <CardDescription>Track your recruitment pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm">Applied</span>
                    <Progress value={100} className="flex-1 h-4" />
                    <span className="w-12 text-right font-semibold">145</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm">Screened</span>
                    <Progress value={62} className="flex-1 h-4" />
                    <span className="w-12 text-right font-semibold">90</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm">Shortlisted</span>
                    <Progress value={19} className="flex-1 h-4" />
                    <span className="w-12 text-right font-semibold">28</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm">Interviewed</span>
                    <Progress value={12} className="flex-1 h-4" />
                    <span className="w-12 text-right font-semibold">18</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-sm">Offered</span>
                    <Progress value={8} className="flex-1 h-4" />
                    <span className="w-12 text-right font-semibold">12</span>
                  </div>
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
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm font-medium text-primary mb-1">Top Skills Match</p>
                  <p className="text-sm text-muted-foreground">
                    Python, Java, and React are most common among top candidates.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10">
                  <p className="text-sm font-medium text-accent mb-1">Recommendation</p>
                  <p className="text-sm text-muted-foreground">
                    Consider 15 more candidates who match 85%+ of your criteria.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10">
                  <p className="text-sm font-medium text-green-400 mb-1">Pipeline Health</p>
                  <p className="text-sm text-muted-foreground">
                    Conversion rate is 8.2%, above industry average of 6%.
                  </p>
                </div>
                <Button variant="default" className="w-full">
                  Get AI Recommendations
                </Button>
              </CardContent>
            </Card>

            {/* Today's Interviews */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{interview.candidate}</p>
                        <p className="text-xs text-muted-foreground">{interview.type} • {interview.duration}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">{interview.time}</span>
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
                  <Search className="w-4 h-4 mr-2" />
                  Advanced Search
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Resumes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-2" />
                  Company Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;
