import StudentLayout from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Megaphone, 
  Calendar, 
  Building2, 
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MessageSquare
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "announcement",
    title: "TCS Recruitment Drive - Registration Open",
    message: "TCS is visiting on Feb 5th. Register before Feb 3rd to be eligible. Requirements: 60% aggregate, no backlogs.",
    time: "2 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "deadline",
    title: "Resume Submission Deadline",
    message: "Submit your updated resume for Infosys drive by tomorrow 5 PM.",
    time: "5 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 3,
    type: "interview",
    title: "Interview Scheduled - Wipro",
    message: "Your technical interview is scheduled for Feb 12th at 10:00 AM. Virtual mode.",
    time: "1 day ago",
    read: true,
    priority: "medium",
  },
  {
    id: 4,
    type: "result",
    title: "Shortlist Released - TCS",
    message: "Congratulations! You've been shortlisted for TCS. Check your email for details.",
    time: "2 days ago",
    read: true,
    priority: "low",
  },
  {
    id: 5,
    type: "reminder",
    title: "Complete Mock Interview",
    message: "You have pending mock interviews. Complete them to improve your readiness score.",
    time: "3 days ago",
    read: true,
    priority: "low",
  },
];

const Notifications = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "announcement": return Megaphone;
      case "deadline": return Clock;
      case "interview": return Calendar;
      case "result": return Star;
      case "reminder": return Bell;
      default: return MessageSquare;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "announcement": return "text-primary";
      case "deadline": return "text-destructive";
      case "interview": return "text-accent";
      case "result": return "text-green-400";
      case "reminder": return "text-yellow-400";
      default: return "text-muted-foreground";
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "announcement": return "bg-primary/20";
      case "deadline": return "bg-destructive/20";
      case "interview": return "bg-accent/20";
      case "result": return "bg-green-500/20";
      case "reminder": return "bg-yellow-500/20";
      default: return "bg-secondary";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with placement announcements and deadlines
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Unread Count */}
        {unreadCount > 0 && (
          <Card variant="gradient" className="border-primary/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">You have {unreadCount} unread notifications</p>
                <p className="text-sm text-muted-foreground">Some require immediate action</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="glass p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="interviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Interviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  variant="glass"
                  className={`transition-all hover:border-primary/30 ${
                    !notification.read ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${getBgColor(notification.type)} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {notification.priority === 'high' && (
                              <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs">
                                Urgent
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  variant="glass"
                  className="transition-all hover:border-primary/30 border-l-4 border-l-primary"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${getBgColor(notification.type)} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            {notification.priority === 'high' && (
                              <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs">
                                Urgent
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            {notifications.filter(n => n.type === 'announcement').map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  variant="glass"
                  className={`transition-all hover:border-primary/30 ${
                    !notification.read ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${getBgColor(notification.type)} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="interviews" className="space-y-4">
            {notifications.filter(n => n.type === 'interview').map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  variant="glass"
                  className={`transition-all hover:border-primary/30 ${
                    !notification.read ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${getBgColor(notification.type)} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default Notifications;
