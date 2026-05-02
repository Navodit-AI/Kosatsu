"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Settings, 
  Key, 
  GitBranch, 
  Bell, 
  Shield, 
  User, 
  Save, 
  Sparkles,
  Database,
  Cpu,
  BrainCircuit
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 1500);
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/30">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20" />
      <div className="fixed inset-0 hero-gradient pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-1 page-shell py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <header className="space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-6 py-1.5 rounded-full border-primary/30 bg-primary/5 text-primary text-[10px] font-black tracking-widest uppercase mb-4 border-glow">
                <Settings className="w-4 h-4 mr-2" /> System Configuration
              </Badge>
            </motion.div>
            <h1 className="text-5xl font-black tracking-tighter text-glow">
              Engine <span className="text-gradient-premium">Parameters.</span>
            </h1>
            <p className="text-muted-foreground font-medium text-lg">Tune the agentic intelligence to your recruitment standards.</p>
          </header>

          <div className="grid gap-12">
            
            {/* API Configuration */}
            <section className="space-y-6">
              <h3 className="text-2xl font-black flex items-center gap-3 px-4">
                <Key className="text-primary w-6 h-6" />
                Neural API Access
              </h3>
              <Card className="glass border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardContent className="p-10 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                         <Cpu className="w-3.5 h-3.5" /> Groq API Key
                      </Label>
                      <Input 
                        type="password" 
                        placeholder="gsk_••••••••••••••••••••••••" 
                        className="bg-white/5 border-white/5 rounded-2xl h-12 focus:border-primary/50 font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                         <GitBranch className="w-3.5 h-3.5" /> GitHub Token
                      </Label>
                      <Input 
                        type="password" 
                        placeholder="ghp_••••••••••••••••••••••••" 
                        className="bg-white/5 border-white/5 rounded-2xl h-12 focus:border-primary/50 font-mono text-xs"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Agent Preferences */}
            <section className="space-y-6">
              <h3 className="text-2xl font-black flex items-center gap-3 px-4">
                <BrainCircuit className="text-primary w-6 h-6" />
                Agentic Behavior
              </h3>
              <Card className="glass border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-6">
                    {[
                      { icon: Shield, title: "Aggressive Skill Verification", desc: "Agents will cross-verify resume claims with GitHub contributions.", default: true },
                      { icon: Sparkles, title: "Creative Summary Generation", desc: "Enable advanced LLM reasoning for candidate storytelling.", default: true },
                      { icon: Database, title: "Deep Repo Indexing", desc: "Analyze up to 20 repositories per candidate (increases latency).", default: false },
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex gap-4">
                          <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                            <pref.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold">{pref.title}</p>
                            <p className="text-sm text-muted-foreground">{pref.desc}</p>
                          </div>
                        </div>
                        <Switch defaultChecked={pref.default} className="data-[state=checked]:bg-primary" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Profile Section */}
            <section className="space-y-6">
              <h3 className="text-2xl font-black flex items-center gap-3 px-4">
                <User className="text-primary w-6 h-6" />
                Administrative Profile
              </h3>
              <Card className="glass border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardContent className="p-10 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Organization Name</Label>
                      <Input defaultValue="Kōsatsu Labs" className="bg-white/5 border-white/5 rounded-2xl h-12 focus:border-primary/50 font-bold" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Recruiter Email</Label>
                      <Input defaultValue="admin@kosatsu.ai" className="bg-white/5 border-white/5 rounded-2xl h-12 focus:border-primary/50 font-bold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <div className="flex justify-end gap-4 pt-8">
              <Button 
                variant="outline" 
                className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs border-white/10 glass"
              >
                Reset to Defaults
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saveStatus !== "idle"}
                className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-xs shadow-[0_0_30px_oklch(0.65_0.25_260/0.3)] min-w-[160px]"
              >
                {saveStatus === "idle" && <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                {saveStatus === "saving" && "Saving Sequence..."}
                {saveStatus === "saved" && "Parameters Applied!"}
              </Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
