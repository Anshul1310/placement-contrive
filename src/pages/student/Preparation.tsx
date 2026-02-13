import StudentLayout from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Code, 
  MessageSquare, 
  Building2, 
  Play, 
  CheckCircle,
  Lock,
  Star,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";

const categories = [
  {
    id: "aptitude",
    title: "Aptitude",
    icon: Brain,
    description: "Logical reasoning, quantitative, verbal",
    progress: 65,
    modules: [
      { name: "Logical Reasoning", status: "completed", score: 85 },
      { name: "Quantitative Aptitude", status: "in-progress", score: 60 },
      { name: "Verbal Ability", status: "locked", score: 0 },
      { name: "Data Interpretation", status: "locked", score: 0 },
    ]
  },
  {
    id: "technical",
    title: "Technical",
    icon: Code,
    description: "DSA, programming, system design",
    progress: 45,
    modules: [
      { name: "Data Structures", status: "completed", score: 78 },
      { name: "Algorithms", status: "in-progress", score: 45 },
      { name: "DBMS & SQL", status: "locked", score: 0 },
      { name: "OOP Concepts", status: "locked", score: 0 },
    ]
  },
  {
    id: "communication",
    title: "Communication",
    icon: MessageSquare,
    description: "HR preparation, soft skills",
    progress: 80,
    modules: [
      { name: "Self Introduction", status: "completed", score: 92 },
      { name: "Common HR Questions", status: "completed", score: 88 },
      { name: "Situational Questions", status: "in-progress", score: 70 },
      { name: "Group Discussion", status: "locked", score: 0 },
    ]
  },
  {
    id: "company",
    title: "Company Specific",
    icon: Building2,
    description: "TCS, Infosys, Wipro prep",
    progress: 30,
    modules: [
      { name: "TCS NQT Pattern", status: "in-progress", score: 55 },
      { name: "Infosys InfyTQ", status: "locked", score: 0 },
      { name: "Wipro NLTH", status: "locked", score: 0 },
      { name: "Cognizant GenC", status: "locked", score: 0 },
    ]
  },
];

const practiceQuestions = [
  {
    question: "If A is 2 times as fast as B, and B is 3 times as fast as C, then the time taken by A, B, and C to complete a work is in the ratio?",
    options: ["1:2:6", "6:3:1", "1:2:3", "2:3:6"],
    difficulty: "Medium",
    topic: "Work & Time"
  },
  {
    question: "What is the time complexity of binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    difficulty: "Easy",
    topic: "Algorithms"
  }
];

const Preparation = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Preparation Hub</h1>
            <p className="text-muted-foreground mt-1">
              Practice and master skills for your placement journey
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Practice History
            </Button>
            <Button variant="hero">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Generated Quiz
            </Button>
          </div>
        </div>

        {/* Overall Progress */}
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Overall Preparation Progress</h3>
                <p className="text-sm text-muted-foreground">You've completed 55% of all modules</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-3xl font-bold font-display gradient-text">55%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
                <div className="w-48">
                  <Progress value={55} className="h-3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs defaultValue="aptitude" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl glass p-1">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <cat.icon className="w-4 h-4 mr-2 hidden sm:block" />
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {/* Category Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card variant="gradient" className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <category.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{category.title} Practice</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Category Progress</span>
                      <span className="font-semibold">{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-3 mb-6" />
                    
                    {/* Modules */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {category.modules.map((module) => (
                        <div
                          key={module.name}
                          className={`p-4 rounded-xl border transition-all ${
                            module.status === 'completed' 
                              ? 'bg-green-500/10 border-green-500/30' 
                              : module.status === 'in-progress'
                              ? 'bg-primary/10 border-primary/30'
                              : 'bg-secondary/50 border-border opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{module.name}</span>
                            {module.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {module.status === 'in-progress' && <Play className="w-5 h-5 text-primary" />}
                            {module.status === 'locked' && <Lock className="w-5 h-5 text-muted-foreground" />}
                          </div>
                          {module.status !== 'locked' && (
                            <div className="flex items-center gap-2">
                              <Progress value={module.score} className="h-1.5 flex-1" />
                              <span className="text-xs text-muted-foreground">{module.score}%</span>
                            </div>
                          )}
                          {module.status === 'locked' && (
                            <p className="text-xs text-muted-foreground">Complete previous module to unlock</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card variant="glass" className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <p className="text-sm font-medium text-primary mb-1">Strength</p>
                      <p className="text-sm text-muted-foreground">
                        You excel at logical patterns. Keep it up!
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <p className="text-sm font-medium text-destructive mb-1">Focus Area</p>
                      <p className="text-sm text-muted-foreground">
                        Work on time-speed-distance problems.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/10">
                      <p className="text-sm font-medium text-accent mb-1">Recommendation</p>
                      <p className="text-sm text-muted-foreground">
                        Practice 15 minutes daily for best results.
                      </p>
                    </div>
                    <Button variant="default" className="w-full">
                      <Star className="w-4 h-4 mr-2" />
                      Start Personalized Practice
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Practice Questions Preview */}
              <Card variant="glass">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Practice Questions</CardTitle>
                    <CardDescription>AI-generated questions tailored to your level</CardDescription>
                  </div>
                  <Button variant="default">
                    Start Full Practice <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {practiceQuestions.map((q, index) => (
                    <div key={index} className="p-4 rounded-xl bg-secondary/30 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">{q.topic}</span>
                      </div>
                      <p className="font-medium">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((option, i) => (
                          <button
                            key={i}
                            className="p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:border-primary/50 border border-transparent text-left text-sm transition-all"
                          >
                            {String.fromCharCode(65 + i)}. {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default Preparation;
