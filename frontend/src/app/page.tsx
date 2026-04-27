import { Navbar } from "@/components/navbar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { 
  Users, 
  FileText, 
  GitBranch, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  Briefcase
} from "lucide-react"

export default async function Home() {
  const candidates = await prisma.candidate.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const totalCandidates = await prisma.candidate.count();
  const topMatches = await prisma.candidate.count({ where: { score: { gte: 80 } } });
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
                <div className="text-2xl font-bold">{totalCandidates}</div>
                <p className="text-xs text-muted-foreground">Analyses performed</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Top Matches</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{topMatches}</div>
                <p className="text-xs text-muted-foreground">Score ≥ 80%</p>
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
                  {candidates.map((candidate: any) => (
                    <div key={candidate.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{new Date(candidate.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={candidate.score >= 80 ? "default" : "secondary"}>
                            {candidate.score}% Match
                          </Badge>
                        </div>
                        <Link 
                          href={`/results/${candidate.id}`}
                          className={buttonVariants({ variant: "ghost", size: "sm", className: "opacity-0 group-hover:opacity-100 transition-opacity" })}
                        >
                          View Report
                        </Link>
                      </div>
                    </div>
                  ))}
                  {candidates.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground italic">No candidates analyzed yet.</p>
                  )}
                </div>
                <Link 
                  href="/candidates" 
                  className={buttonVariants({ variant: "outline", className: "w-full mt-6" })}
                >
                  View All Candidates
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions / Status */}
            <Card className="col-span-3 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center py-6">
                <p className="text-sm text-muted-foreground">Ready to find your next top engineer?</p>
                <Link 
                  href="/upload" 
                  className={buttonVariants({ className: "w-full h-16 text-lg" })}
                >
                  Analyze New Resume 🚀
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
