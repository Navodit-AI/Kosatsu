import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, GitBranch, FileText, User, Users } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ResultPage({ params }: { params: { id: string } }) {
  const candidate = await prisma.candidate.findUnique({
    where: { id: params.id },
  });

  if (!candidate) return notFound();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Link href="/candidates" className="text-secondary-foreground hover:text-primary transition-colors">
                    <Users className="w-4 h-4" />
                  </Link>
                  <h1 className="text-3xl font-bold">{candidate.name}</h1>
                </div>
                <p className="text-muted-foreground">Analyzed on {new Date(candidate.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-black ${getScoreColor(candidate.score)}`}>
                {candidate.score}%
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Match Score</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 shadow-lg border-none bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {candidate.summary}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  GitHub Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {candidate.github_data || "No GitHub data found for this candidate."}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-8">
            <Badge variant="outline" className="px-4 py-2 text-lg font-medium border-primary/20 bg-primary/5 text-primary">
              Match Status: {candidate.score >= 70 ? "Qualified" : candidate.score >= 50 ? "Needs Review" : "Unqualified"}
            </Badge>
          </div>
        </div>
      </main>
    </div>
  );
}
