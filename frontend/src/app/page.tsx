"use client";

import { Navbar } from "@/components/navbar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
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
  Search,
  Sparkles,
  Command
} from "lucide-react"

export default function Home() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, top: 0 });

  useEffect(() => {
    fetch("/api/candidates")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCandidates(data.slice(0, 5));
          setStats({
            total: data.length,
            top: data.filter((c: any) => c.score >= 80).length
          });
        }
      })
      .catch(err => console.error("Dashboard fetch error:", err));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30 relative">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20" />
      <div className="fixed inset-0 hero-gradient pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-1 page-shell py-20 space-y-32 relative z-10">
        
        {/* Animated Hero */}
        <section className="relative text-center max-w-5xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/30 bg-primary/5 text-primary text-sm font-black tracking-widest uppercase mb-8 border-glow">
              <Sparkles className="w-4 h-4 mr-2 fill-primary animate-pulse" /> 
              Next-Gen Agentic Intelligence
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95]"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hire Smarter with <br />
            <span className="text-gradient-premium text-glow">Agentic Logic.</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Kōsatsu deploys specialized AI agents to audit codebases, verify skills, 
            and identify top matches across your entire candidate pool.
          </motion.p>

          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/upload" 
              className={buttonVariants({ size: "lg", className: "rounded-2xl px-10 h-16 text-xl font-black shadow-[0_0_30px_oklch(0.65_0.25_260/0.3)] hover:shadow-[0_0_50px_oklch(0.65_0.25_260/0.5)] transition-all duration-500 scale-100 hover:scale-[1.03]" })}
            >
              Start Analysis <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link 
              href="/candidates" 
              className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-2xl px-10 h-16 text-xl font-bold border-white/10 glass hover:bg-white/5 transition-all" })}
            >
              View Pipeline
            </Link>
          </motion.div>
        </section>

        {/* Dynamic Stats Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Resumes", value: stats.total, icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
            { title: "A+ Talent", value: stats.top, icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { title: "GitHub Audits", value: stats.total, icon: GitBranch, color: "text-indigo-400", bg: "bg-indigo-400/10" },
            { title: "Processing", value: "Live", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass border-none group hover:border-primary/20 transition-all duration-500">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</CardTitle>
                  <div className={cn("p-2.5 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main List */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <TrendingUp className="text-primary h-7 w-7" />
                  Latest Profiles
                </h3>
              </div>

              <div className="space-y-4">
                {candidates.map((candidate: any, i) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/results/${candidate.id}`}>
                      <div className="glass p-6 rounded-[2rem] flex items-center justify-between group hover:bg-white/5 border-white/5 hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center gap-6">
                          <div className="h-16 w-16 rounded-[1.25rem] bg-linear-to-br from-primary/30 to-blue-500/10 flex items-center justify-center text-white font-black text-2xl shadow-inner uppercase border border-white/10 group-hover:bg-primary transition-all">
                            {candidate.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xl font-bold group-hover:text-primary transition-colors">{candidate.name}</p>
                            <div className="flex items-center gap-3 mt-1 font-bold text-muted-foreground text-xs uppercase tracking-widest">
                               <Clock className="w-3.5 h-3.5" />
                               {new Date(candidate.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/5 font-black text-sm tracking-tight">
                            {candidate.score}% SC
                          </div>
                          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-primary group-hover:text-black transition-all">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                {candidates.length === 0 && (
                  <div className="glass p-20 text-center rounded-[3rem] border-dashed border-white/10">
                    <Command className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground font-bold uppercase tracking-widest">No candidates detected yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4 h-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
               <div className="relative p-[1px] rounded-[2.5rem] bg-linear-to-br from-primary/50 via-transparent to-blue-500/50">
                  <div className="bg-background rounded-[2.5rem] p-10 space-y-10 border-glow">
                    <div className="space-y-4">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Zap className="h-7 w-7 fill-primary" />
                      </div>
                      <h3 className="text-3xl font-black tracking-tight leading-tight">Ready for <br />Deep Analysis?</h3>
                      <p className="text-muted-foreground font-medium">Click below to engage the agentic screening system.</p>
                    </div>

                    <Link 
                      href="/upload" 
                      className={buttonVariants({ className: "w-full h-16 rounded-2xl text-xl font-black shadow-[0_0_30px_oklch(0.65_0.25_260/0.2)]" })}
                    >
                      Start Analysis 🚀
                    </Link>

                    <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xl font-black">20+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Agents</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-black">99%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-black">Sub 1m</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Audit</p>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-20 mt-40 glass">
        <div className="page-shell flex flex-col items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_oklch(0.65_0.25_260/0.4)]">
              <Sparkles className="text-black h-5 w-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter">KŌSATSU</span>
          </div>
          <p className="text-muted-foreground font-medium text-center">Built with the future of recruitment in mind. <br />Powered by an ensemble of autonomous AI agents.</p>
          <div className="flex gap-8 text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
             <Link href="#" className="hover:text-primary">Twitter</Link>
             <Link href="#" className="hover:text-primary">GitHub</Link>
             <Link href="#" className="hover:text-primary">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
