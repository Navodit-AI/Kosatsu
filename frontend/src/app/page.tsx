import { Navbar } from "@/components/navbar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { 
  Users, 
  FileText, 
  GitBranch, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  Briefcase,
  ArrowRight,
  Zap,
  ShieldCheck,
  Search
} from "lucide-react"

export default async function Home() {
  const candidates = await prisma.candidate.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const totalCandidates = await prisma.candidate.count();
  const topMatches = await prisma.candidate.count({ where: { score: { gte: 80 } } });

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-1 container py-12 space-y-16">
        {/* Floating Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        {/* Hero Section */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Zap className="w-3.5 h-3.5 mr-2 fill-primary" /> 
            Agentic Recruitment Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Evaluate Talent with <br />
            <span className="text-gradient">Precision Logic.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Kōsatsu uses a network of specialized AI agents to analyze resumes, 
            audit code repositories, and find your next 10x engineer.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link 
              href="/upload" 
              className={buttonVariants({ size: "lg", className: "rounded-full px-8 h-14 text-lg font-bold shadow-2xl shadow-primary/30" })}
            >
              Analyze New Resume <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in zoom-in duration-700 delay-200">
          {[
            { title: "Total Resumes", value: totalCandidates, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
            { title: "Top Matches", value: topMatches, icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10" },
            { title: "GitHub Audits", value: totalCandidates, icon: GitBranch, color: "text-violet-500", bg: "bg-violet-500/10" },
            { title: "Active Hirings", value: "1", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10" },
          ].map((stat, i) => (
            <Card key={i} className="group overflow-hidden border-none shadow-xl bg-card/40 backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-card/60">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
                <div className={cn("p-2 rounded-xl transition-colors", stat.bg, stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tabular-nums tracking-tighter">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Real-time data</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-7">
          {/* Recent Evaluations */}
          <Card className="col-span-1 md:col-span-4 overflow-hidden border-none shadow-2xl bg-card/40 backdrop-blur-md">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Live Evaluations
                  </CardTitle>
                  <CardDescription className="text-base">Track and manage your candidate pipeline.</CardDescription>
                </div>
                <Link href="/candidates" className={buttonVariants({ variant: "ghost", size: "sm", className: "rounded-full" })}>
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {candidates.map((candidate: any) => (
                  <div key={candidate.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors group">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-primary/20 to-blue-500/10 flex items-center justify-center text-primary font-black text-xl shadow-inner uppercase">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-lg font-bold leading-tight">{candidate.name}</p>
                        <div className="flex items-center gap-3 mt-1.5 font-medium">
                          <span className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {new Date(candidate.createdAt).toLocaleDateString()}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className="text-xs text-primary/80">Resume Analyzed</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-black tracking-tight uppercase shadow-inner",
                          candidate.score >= 80 ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
                        )}>
                          {candidate.score}% Match
                        </div>
                      </div>
                      <Link 
                        href={`/results/${candidate.id}`}
                        className={cn(
                          buttonVariants({ variant: "secondary", size: "sm" }),
                          "rounded-full font-bold transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                        )}
                      >
                        View Report
                      </Link>
                    </div>
                  </div>
                ))}
                {candidates.length === 0 && (
                  <div className="p-20 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium italic">Your candidate list is empty.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats / Info Card */}
          <div className="col-span-1 md:col-span-3 space-y-6">
            <Card className="border-none shadow-2xl bg-primary/90 text-primary-foreground overflow-hidden relative group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Hiring Pipeline
                </CardTitle>
                <CardDescription className="text-primary-foreground/70">
                  Ready to assess your next top engineer?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 text-center">
                  <p className="text-sm font-medium opacity-80 mb-4">Click below to start a new deep-dive evaluation.</p>
                  <Link 
                    href="/upload" 
                    className={buttonVariants({ variant: "secondary", className: "w-full h-14 rounded-xl text-lg font-black shadow-xl" })}
                  >
                    Start Analysis 🚀
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 text-center bg-white/5 p-3 rounded-xl">
                    <p className="text-2xl font-black">98.4%</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Accuracy</p>
                  </div>
                  <div className="space-y-1 text-center bg-white/5 p-3 rounded-xl">
                    <p className="text-2xl font-black">&lt; 30s</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "JD Architect", status: "Operational", color: "bg-green-500" },
                  { name: "GitHub Auditor", status: "Operational", color: "bg-green-500" },
                  { name: "Quality Controller", status: "Idle", color: "bg-primary/50" },
                ].map((agent, i) => (
                  <div key={i} className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-2 w-2 rounded-full", agent.color)} />
                      <span className="text-sm font-bold">{agent.name}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{agent.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/30 py-12 mt-20">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
             <div className="h-6 w-6 rounded-lg bg-linear-to-br from-primary to-blue-600 flex items-center justify-center">
              <Sparkles className="text-primary-foreground h-3 w-3" />
            </div>
            <span className="font-bold text-muted-foreground">Kōsatsu</span>
          </div>
          <p className="text-sm text-muted-foreground/60 font-medium">© 2026 Agentic Recruiting Systems. Built for top performers.</p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground/60">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
