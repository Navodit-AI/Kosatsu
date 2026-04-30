import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";

export default async function CandidatesPage() {
  const candidates = await prisma.candidate.findMany({
    orderBy: { createdAt: "desc" },
  });

  const getScoreVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 50) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 page-shell py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                Analyzed Candidates
              </h1>
              <p className="text-muted-foreground mt-1">History of all analyzed resumes and their scores.</p>
            </div>
            <Link href="/upload" className={buttonVariants()}>
              Analyze New
            </Link>
          </div>

          <Card className="shadow-lg border-none bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Candidate Name</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Date Analyzed</TableHead>
                    <TableHead className="text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate: any) => (
                    <TableRow key={candidate.id} className="group">
                      <TableCell className="font-semibold pl-6">{candidate.name}</TableCell>
                      <TableCell>
                        <Badge variant={getScoreVariant(candidate.score)}>
                          {candidate.score}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Link 
                          href={`/results/${candidate.id}`}
                          className={buttonVariants({ variant: "ghost", size: "sm" })}
                        >
                          View Details <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {candidates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground italic">
                        No candidates analyzed yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
