import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  GitBranch, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  Briefcase
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          {/* Hero Section */}
          <section className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Recruitment Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Analyze resumes and audit GitHub profiles with AI-powered precision.
            </p>
          </section>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">GitHub Audits</CardTitle>
                <GitBranch className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <p className="text-xs text-muted-foreground">98% success rate</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">Top 10% selected</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Across 3 categories</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-7">
            {/* Recent Activity */}
            <Card className="col-span-4 bg-card/50 backdrop-blur overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Evaluations
                </CardTitle>
                <CardDescription>Latest resume analyses performed by the agents.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">John Doe</p>
                          <p className="text-xs text-muted-foreground mt-1">Fullstack Engineer • 4y exp</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={i === 1 ? "default" : i === 2 ? "secondary" : "outline"}>
                            {i === 1 ? "92% Match" : i === 2 ? "74% Match" : "45% Match"}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">View All Candidates</Button>
              </CardContent>
            </Card>

            {/* Quick Actions / Status */}
            <Card className="col-span-3 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Agent Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">JD Architect</span>
                    <span className="text-primary font-medium">Idle</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GitHub Auditor</span>
                    <span className="text-yellow-500 font-medium">Running...</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-yellow-400 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quality Control</span>
                    <span className="text-muted-foreground font-medium">Queued</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full" />
                </div>
                
                <div className="pt-4 space-y-4">
                  <h4 className="text-sm font-semibold">Start New Analysis</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start gap-2 h-16">
                      <FileText className="h-4 w-4" />
                      <div className="text-left">
                        <div className="text-xs border-b border-transparent group-hover:border-primary transition-all">Upload</div>
                        <div className="text-[10px] text-muted-foreground font-normal">Resume</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start gap-2 h-16">
                      <Briefcase className="h-4 w-4" />
                      <div className="text-left">
                        <div className="text-xs">Select</div>
                        <div className="text-[10px] text-muted-foreground font-normal">Job Posting</div>
                      </div>
                    </Button>
                  </div>
                  <Button className="w-full">Run Agents 🚀</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
