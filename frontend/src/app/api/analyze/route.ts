import { NextResponse } from "next/server";
import { analyzeResume } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { resume_text, job_description } = await request.json();

    if (!resume_text || !job_description) {
      return NextResponse.json(
        { error: "Resume text and job description are required" },
        { status: 400 }
      );
    }

    // 1. Call FastAPI backend
    const result = await analyzeResume(resume_text, job_description);

    // 2. Save result to SQLite
    const candidate = await prisma.candidate.create({
      data: {
        name: result.full_report?.candidate_name || "Unknown Candidate",
        score: result.score,
        summary: result.summary,
        github_data: result.github_insights,
      },
    });

    return NextResponse.json({
      id: candidate.id,
      ...result
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
