import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, GitBranch, FileText, User, Users, ShieldCheck, Cpu, Code2, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function ResultPage({ params }: { params: { id: string } }) {
  const candidate = await prisma.candidate.findUnique({
    where: { id: params.id },
  });

  if (!candidate) return notFound();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/30">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20" />
      <div className="fixed inset-0 hero-gradient pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-1 container py-16 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass p-10 rounded-[3rem]">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-primary/20 rounded-[2rem] flex items-center justify-center border border-primary/30 shadow-[0_0_30px_oklch(0.65_0.25_260/0.2)]">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-black tracking-tight">{candidate.name}</h1>
                  <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                    Verified Profile
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground font-bold text-sm uppercase tracking-wider">
                   <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4" /> {new Date(candidate.createdAt).toLocaleDateString()}
                   </div>
                   <div className="h-1 w-1 rounded-full bg-white/20" />
                   <Link href="/candidates" className="hover:text-primary transition-colors flex items-center gap-2">
                     <Users className="w-4 h-4" /> Pipeline
                   </Link>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right space-y-1">
              <div className={cn("text-7xl font-black tracking-tighter text-glow", getScoreColor(candidate.score))}>
                {candidate.score}%
              </div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">Evaluation Integrity</p>
            </div>
          </div>

          {/* Analysis Content */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
              <Card className="glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
                <CardHeader className="p-10 pb-6 border-b border-white/5">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    Agent Screening Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-6">
                  <p className="text-xl text-foreground font-medium leading-relaxed whitespace-pre-wrap">
                    {candidate.summary}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-8">
                 <div className="glass p-8 rounded-[2rem] space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">Architecture</h4>
                      <p className="font-bold text-lg">Systematic Match</p>
                    </div>
                 </div>
                 <div className="glass p-8 rounded-[2rem] space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">Implementation</h4>
                      <p className="font-bold text-lg">Verified Code</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="glass border-none rounded-[2.5rem] shadow-2xl h-full flex flex-col">
                <CardHeader className="p-10 pb-6 border-b border-white/5">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <GitBranch className="w-6 h-6 text-indigo-400" />
                    GitHub Source Audit
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex-1">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed whitespace-pre-wrap italic">
                      {candidate.github_data || "No external code repositories were linked for this session. Evaluation based on internal data vectors only."}
                    </p>
                  </div>
                </CardContent>
                <div className="p-10 pt-0 mt-auto">
                   <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Audit Certificate</p>
                      <div className="flex items-center justify-center gap-2 text-primary font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Authenticated by Logic Agent
                      </div>
                   </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link 
              href="/candidates" 
              className={buttonVariants({ variant: "outline", className: "rounded-full px-10 h-14 font-black uppercase tracking-widest text-xs border-white/10 glass" })}
            >
              Return to Pipeline
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
