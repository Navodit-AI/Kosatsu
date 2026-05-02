interface AnalysisResponse {
  score: number;
  summary: string;
  github_insights: string;
  full_report: any;
}

function resolveBackendUrl(origin?: string): string {
  const configured = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  if (configured.startsWith("/")) {
    if (!origin) {
      throw new Error("Relative NEXT_PUBLIC_BACKEND_URL requires request origin");
    }
    return new URL(configured, origin).toString().replace(/\/$/, "");
  }
  return configured;
}

export async function analyzeResume(
  resumeText: string,
  jobDescription: string,
  requestOrigin?: string
): Promise<AnalysisResponse> {
  const backendUrl = resolveBackendUrl(requestOrigin);
  
  try {
    const response = await fetch(`${backendUrl}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume_text: resumeText,
        job_description: jobDescription,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to analyze resume");
    }

    return await response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
}
