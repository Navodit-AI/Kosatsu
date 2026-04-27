"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Loader2, FileText, Cpu, BrainCircuit, Sparkles, Send } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Backround Gradients */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <Navbar />
      
      <main className="flex-1 container flex flex-col items-center justify-center py-16">
        <div className="max-w-4xl w-full grid md:grid-cols-5 gap-12 items-start">
          
          {/* Instructions / Sidebar */}
          <div className="md:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
            <div className="space-y-4">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary border-none text-xs font-black uppercase tracking-widest">
                Step 1: Input Data
              </Badge>
              <h1 className="text-4xl font-black tracking-tight leading-none">
                Feed the <span className="text-gradient">Agents.</span>
              </h1>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Our agentic pipeline requires the raw candidate data and the technical requirements to begin its multi-stage evaluation.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: FileText, title: "JD Architect", text: "Parses requirements into structured criteria." },
                { icon: Cpu, title: "GitHub Auditor", text: "Scans repos for code quality and activity." },
                { icon: BrainCircuit, title: "Quality Control", text: "Cross-checks findings for objective scoring." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-card border border-border/50 shadow-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="md:col-span-3 border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-card/50 backdrop-blur-2xl animate-in fade-in slide-in-from-right-6 duration-700">
            <CardHeader className="text-center md:text-left pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Evaluation Payload
              </CardTitle>
              <CardDescription className="text-sm font-medium">Please provide the raw text for analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="resume" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Resume (Plain Text)
                  </Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste candidate's resume content..."
                    className="min-h-[180px] bg-muted/20 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 resize-none transition-all focus:bg-muted/40 p-4"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="jd" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5" /> Job Description
                  </Label>
                  <Textarea
                    id="jd"
                    placeholder="What are the key technical requirements?"
                    className="min-h-[140px] bg-muted/20 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 resize-none transition-all focus:bg-muted/40 p-4"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                </div>
                
                {error && (
                  <div className="p-4 text-sm font-bold text-destructive bg-destructive/10 rounded-2xl border border-destructive/20 animate-bounce">
                    ⚠️ {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-black rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Engaging Neural Agents...
                    </>
                  ) : (
                    <>
                      Launch Analysis <Send className="ml-3 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
