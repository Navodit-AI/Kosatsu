import { NextResponse } from "next/server";
import { analyzeResume, analyzeResumeFile } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const requestOrigin = new URL(request.url).origin;
    let result;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const job_description = formData.get("job_description") as string;

      if (!file || !job_description) {
        return NextResponse.json(
          { error: "File and job description are required" },
          { status: 400 }
        );
      }
      
      result = await analyzeResumeFile(file, job_description, requestOrigin);
    } else {
      const { resume_text, job_description } = await request.json();

      if (!resume_text || !job_description) {
        return NextResponse.json(
          { error: "Resume text and job description are required" },
          { status: 400 }
        );
      }
      
      result = await analyzeResume(resume_text, job_description, requestOrigin);
    }

    // 2. Save result to SQLite
    const candidate = await prisma.candidate.create({
      data: {
        name: result.full_report?.candidate_name || "Unknown Candidate",
        score: result.score,
        summary: result.summary,
        github_data: result.github_insights,
      },
    });

    // 3. Revalidate paths to update dashboard and candidates list
    revalidatePath("/");
    revalidatePath("/candidates");

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
