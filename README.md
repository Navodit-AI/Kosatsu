# 🎯 Kōsatsu: Intelligent Recruitment Pipeline

Kōsatsu (考察 - "Analysis/Observation") is a sophisticated, agentic recruitment tool designed to bridge the gap between thousands of resumes and the perfect technical hire. By combining LLM-powered resume screening with real-world GitHub data auditing, it provides a 360-degree view of a candidate's technical prowess.

## 🚀 Project Structure

```text
.
├── backend/            # Python LangGraph & Groq AI logic
│   ├── app.py          # Streamlit UI / Logic entry point
│   ├── recruiter_graph.py # LangGraph Multi-Agent Workflow
│   ├── tools.py        # GitHub Audit & External Tools
│   ├── models.py       # Pydantic Data Models
│   └── requirements.txt
├── frontend/           # Next.js (App Router) + shadcn/ui Dashboard
│   ├── src/app/        # Frontend pages & routes
│   └── src/components/ # Shared UI components (shadcn)
└── README.md
```

## ✨ Key Features

*   **Multi-Agent Workflow:** Built with **LangGraph**, the system uses specialized agents for Job Description architecture, Resume Screening, and GitHub Auditing.
*   **GitHub Technical Audit:** Automatically extracts GitHub handles from resumes and fetches real-time data on repositories, languages, and contribution quality.
*   **Next.js Dashboard:** A premium, modern interface to visualize candidate match scores, skill distributions, and project relevance.
*   **Deterministic Scoring:** USes a 100-point weighted formula (Technical Skills, Projects, Experience, GitHub Activity).

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, TailwindCSS, shadcn/ui, Lucide Icons.
- **AI Framework:** [LangGraph](https://github.com/langchain-ai/langgraph) / [LangChain](https://github.com/langchain-ai/langchain)
- **LLM:** [Groq](https://groq.com/) (Llama-3 models)
- **Data Viz:** Plotly (Backend) / Recharts (Planned for Frontend)
- **Extraction:** PyGithub, PyPDF2, python-docx

## 📋 Getting Started

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. Set your `GROQ_API_KEY` and `GITHUB_TOKEN` in `.env`.
4. `streamlit run app.py`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---
Built with ❤️ for better hiring.
