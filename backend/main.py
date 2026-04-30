import os
from functools import lru_cache
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import AnalysisRequest, AnalysisResponse
from services.analyzer import AnalysisService
import uvicorn

app = FastAPI(title="Kōsatsu API", description="AI Recruitment Matcher")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@lru_cache(maxsize=1)
def get_analyzer() -> AnalysisService:
    if not os.getenv("GROQ_API_KEY"):
        raise RuntimeError("Missing GROQ_API_KEY environment variable")
    return AnalysisService()

@app.get("/")
async def root():
    return {"message": "Kōsatsu API is running"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(request: AnalysisRequest):
    if not request.resume_text:
        raise HTTPException(status_code=400, detail="Resume text is required")
    
    try:
        analyzer = get_analyzer()
        report = analyzer.run_analysis(request.resume_text, request.job_description)
        
        return AnalysisResponse(
            score=report.match_score,
            summary=report.cultural_fit_notes or "Analysis complete",
            github_insights=report.github_summary or "No GitHub data",
            full_report=report
        )
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
