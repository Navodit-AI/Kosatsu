import os
import re
import json
import hashlib
from pathlib import Path
from typing import Literal, List
from typing_extensions import TypedDict
from dotenv import load_dotenv
from pydantic import BaseModel, Field, field_validator

from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, START, END

from models.schemas import CandidateReport, SkillMatch, LanguageMatch, ProjectHighlight, EvaluationScore
from services.github_service import GithubService

load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")

# Scoring Rubric
SCORING_RUBRIC = """
═══ DETERMINISTIC SCORING RUBRIC — FOLLOW EXACTLY ═══
Compute match_score using this FIXED weighted formula.
  CATEGORY              WEIGHT   MAX PTS
  ─────────────────────────────────────
  Technical Skills        35%      35
  Programming Languages   20%      20
  Project Relevance       20%      20
  Years of Experience     15%      15
  Code Quality / GitHub   10%      10
  ─────────────────────────────────────
  TOTAL                  100%     100
═══════════════════════════════════════════════════════
"""

class RecruiterState(TypedDict):
    job_description: str
    resume_text: str
    github_handle: str
    jd_analysis: str
    screening_verdict: str
    github_audit: str
    skill_analysis: str
    project_analysis: str
    is_technical_match: bool
    final_evaluation: CandidateReport
    cache_hit: bool

class AnalysisService:
    def __init__(self):
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0,
            model_kwargs={"seed": 42},
        )
        self.github_service = GithubService()
        self.workflow = self._build_workflow()

    def _build_workflow(self):
        workflow = StateGraph(RecruiterState)
        
        workflow.add_node("analyze_jd", self.jd_architect)
        workflow.add_node("screen_resume", self.resume_screener)
        workflow.add_node("audit_github", self.github_auditor)
        workflow.add_node("analyze_skills", self.skill_analyzer)
        workflow.add_node("analyze_projects", self.project_analyzer)
        workflow.add_node("finalize_report", self.quality_control_officer)

        workflow.add_edge(START, "analyze_jd")
        workflow.add_edge("analyze_jd", "screen_resume")
        
        workflow.add_conditional_edges(
            "screen_resume",
            lambda state: "deep_dive" if state["is_technical_match"] else "quick_report",
            {
                "deep_dive": "audit_github",
                "quick_report": "finalize_report",
            }
        )

        workflow.add_edge("audit_github", "analyze_skills")
        workflow.add_edge("analyze_skills", "analyze_projects")
        workflow.add_edge("analyze_projects", "finalize_report")
        workflow.add_edge("finalize_report", END)

        return workflow.compile()

    def jd_architect(self, state: RecruiterState):
        prompt = f"Analyze this JD deeply. Extract must-haves, languages, frameworks, exp, and persona.\n\nJD:\n{state['job_description']}"
        response = self.llm.invoke(prompt)
        return {"jd_analysis": response.content}

    def resume_screener(self, state: RecruiterState):
        prompt = (
            f"Screen resume vs JD requirements.\n\nRESUME:\n{state['resume_text']}\n\nJD:\n{state['jd_analysis']}\n\n"
            "Format: VERDICT: [MATCH/NO_MATCH], GITHUB: [handle], EXPERIENCE: [X years]"
        )
        response = self.llm.invoke(prompt).content
        is_match = "MATCH" in response.upper()
        github_match = re.search(r"GITHUB:\s*(\S+)", response, re.IGNORECASE)
        github_handle = github_match.group(1) if github_match else "unknown"
        github_handle = re.sub(r"https?://(www\.)?github\.com/", "", github_handle).strip("/")
        # LLM output often includes trailing punctuation after handles (e.g., "octocat,")
        github_handle = github_handle.strip(".,;:!?)(")
        return {"screening_verdict": response, "is_technical_match": is_match, "github_handle": github_handle}

    def github_auditor(self, state: RecruiterState):
        handle = state.get("github_handle", "unknown")
        data = self.github_service.fetch_user_data(handle)
        return {"github_audit": data}

    def skill_analyzer(self, state: RecruiterState):
        prompt = f"Compare skills. JD:\n{state['jd_analysis']}\n\nRESUME:\n{state['resume_text']}\n\nGITHUB:\n{state.get('github_audit', '')}"
        response = self.llm.invoke(prompt)
        return {"skill_analysis": response.content}

    def project_analyzer(self, state: RecruiterState):
        prompt = f"Analyze projects. JD:\n{state['jd_analysis']}\n\nRESUME:\n{state['resume_text']}\n\nGITHUB:\n{state.get('github_audit', '')}"
        response = self.llm.invoke(prompt)
        return {"project_analysis": response.content}

    def quality_control_officer(self, state: RecruiterState):
        """
        Two-pass structured output to avoid tool validation errors.
        """
        resume    = state["resume_text"]
        jd        = state["jd_analysis"]
        screening = state.get("screening_verdict", "N/A")
        github    = state.get("github_audit", "Not available")
        skills    = state.get("skill_analysis", "N/A")
        projects  = state.get("project_analysis", "N/A")

        context = (
            f"RESUME:\n{resume}\n\n"
            f"JD REQUIREMENTS:\n{jd}\n\n"
            f"SCREENING:\n{screening}\n\n"
            f"GITHUB:\n{github}\n\n"
            f"SKILL ANALYSIS:\n{skills}\n\n"
            f"PROJECT ANALYSIS:\n{projects}"
        )

        # ── PASS 1: Core fields only (flat schema) ──────────────────────────
        class CoreReport(BaseModel):
            candidate_name: str = "Unknown"
            email: str = ""
            phone_no: str = ""
            university_name: str = ""
            cgpa: str = ""
            github_handle: str = ""
            years_of_experience: str = "Unknown"
            match_score: int = Field(default=0, description="Integer 0-100. IMPORTANT: Provide as plain number, no quotes.")
            final_decision: str = "NO_MATCH"
            cultural_fit_notes: str = ""
            strengths: List[str] = Field(default_factory=list)
            red_flags: List[str] = Field(default_factory=list)
            outreach_email_draft: str = ""

            @field_validator("match_score", mode="before")
            @classmethod
            def to_int(cls, v):
                if isinstance(v, str):
                    c = re.sub(r'[^0-9]', '', v)
                    return int(c) if c else 0
                try: return int(v)
                except: return 0

        pass1_prompt = (
            "Fill the CoreReport for this candidate. "
            "IMPORTANT: match_score must be a plain integer like 75, NOT a string.\n\n"
            + SCORING_RUBRIC
            + "\n\n" + context
        )

        try:
            core = self.llm.with_structured_output(CoreReport).invoke(pass1_prompt)
        except Exception as e:
            print(f"Pass 1 failed: {e}")
            # Fallback for core fields
            core = CoreReport(candidate_name="Error Candidate", match_score=0)

        # ── PASS 2: Lists only ─────────────────────────────────────────────
        class ListsReport(BaseModel):
            skill_matches: List[SkillMatch] = Field(default_factory=list)
            language_matches: List[LanguageMatch] = Field(default_factory=list)
            project_highlights: List[ProjectHighlight] = Field(default_factory=list)
            evaluation_scores: List[EvaluationScore] = Field(default_factory=list)

        pass2_prompt = (
            "Fill the ListsReport for this candidate based on the analysis context.\n\n"
            + context
        )

        try:
            lists = self.llm.with_structured_output(ListsReport).invoke(pass2_prompt)
        except Exception as e:
            print(f"Pass 2 failed: {e}")
            lists = ListsReport()

        # Merge into final CandidateReport
        report = CandidateReport(
            candidate_name      = core.candidate_name,
            email               = core.email,
            phone_no            = core.phone_no,
            university_name     = core.university_name,
            cgpa                = core.cgpa,
            github_handle       = core.github_handle,
            years_of_experience = core.years_of_experience,
            match_score         = core.match_score,
            final_decision      = core.final_decision,
            cultural_fit_notes  = core.cultural_fit_notes,
            strengths           = core.strengths,
            red_flags           = core.red_flags,
            outreach_email_draft= core.outreach_email_draft,
            skill_matches       = lists.skill_matches,
            language_matches    = lists.language_matches,
            project_highlights  = lists.project_highlights,
            evaluation_scores   = lists.evaluation_scores,
            github_summary      = github,
        )

        return {"final_evaluation": report}

    def run_analysis(self, resume_text: str, job_description: str):
        initial_state = {
            "job_description": job_description,
            "resume_text": resume_text,
            "github_handle": "",
            "jd_analysis": "",
            "screening_verdict": "",
            "github_audit": "",
            "skill_analysis": "",
            "project_analysis": "",
            "is_technical_match": False,
            "final_evaluation": None,
            "cache_hit": False
        }
        result = self.workflow.invoke(initial_state)
        return result["final_evaluation"]
