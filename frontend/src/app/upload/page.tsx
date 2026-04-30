"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Upload, 
  Loader2, 
  FileText, 
  Cpu, 
  BrainCircuit, 
  Sparkles, 
  Send,
  ArrowRight,
  Database,
  Code
} from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: jobDescription,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to analyze resume");
      }

      const result = await response.json();
      router.push(`/results/${result.id}`);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/30">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20" />
      <div className="fixed inset-0 hero-gradient pointer-events-none" />

      <Navbar />
      
      <main className="flex-1 page-shell flex flex-col items-center justify-center py-20 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Enhanced Instructions */}
          <motion.div 
            className="lg:col-span-5 space-y-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <Badge className="px-6 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-[0.3em]">
                System Initialization
              </Badge>
              <h1 className="text-6xl font-black tracking-tighter leading-[0.9] text-glow">
                Deploy Your <br /><span className="text-gradient-premium">Analysis Pack.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-sm">
                Provide the raw candidate telemetry and job context. Our agents will handle the rest.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Code, title: "Architect Agent", text: "Generates high-precision evaluation matrices." },
                { icon: Database, title: "Audit Agent", text: "Scrapes and evaluates GitHub repositories." },
                { icon: BrainCircuit, title: "Logic Agent", text: "Synthesizes data into an objective score." },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  className="flex gap-6 group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <div className="h-16 w-16 shrink-0 rounded-[1.5rem] glass border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-[0_0_30px_oklch(0.65_0.25_260/0.4)]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{step.title}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="rounded-[3rem] border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] glass relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
               
               <CardHeader className="p-10 pb-6">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Payload Entry
                </CardTitle>
                <CardDescription className="text-base font-bold uppercase tracking-wider text-muted-foreground">Neural sequence ready for input.</CardDescription>
              </CardHeader>

              <CardContent className="p-10 pt-0">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-4">
                    <Label htmlFor="resume" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" /> Candidate Dossier
                    </Label>
                    <Textarea
                      id="resume"
                      placeholder="Paste resume text or repository links..."
                      className="min-h-[200px] bg-white/5 border border-white/5 rounded-[2rem] focus:border-primary/50 focus:ring-0 resize-none transition-all focus:bg-white/[0.08] p-8 text-lg font-bold placeholder:text-white/20"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="jd" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-primary" /> Execution Context (JD)
                    </Label>
                    <Textarea
                      id="jd"
                      placeholder="Define the technical mission requirements..."
                      className="min-h-[140px] bg-white/5 border border-white/5 rounded-[2rem] focus:border-primary/50 focus:ring-0 resize-none transition-all focus:bg-white/[0.08] p-8 text-lg font-bold placeholder:text-white/20"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  {error && (
                    <motion.div 
                      className="p-6 text-sm font-black text-destructive bg-destructive/10 rounded-[1.5rem] border border-destructive/20"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      CRITICAL FAULT: {error}
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-20 text-2xl font-black rounded-[2rem] shadow-[0_0_40px_oklch(0.65_0.25_260/0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] group" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        Engaging Core...
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        Execute Pipeline <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
