# Smart Resume Screener

An AI-assisted resume screening application that allows recruiters to upload multiple PDF resumes, provide a job description, and rank candidates based on their relevance to the role.

## 🌐 Live Application

**Public Website:**  
https://frontend-orpin-zeta-sg6do86sja.vercel.app/

**Backend API:**  
https://smart-resume-screener-api-id0s.onrender.com/

**GitHub Repository:**  
https://github.com/Sudarshan1310/smart-resume-screener

---

## 📌 Project Overview

Smart Resume Screener is a web-based recruitment assistance platform designed to reduce the time required for manually reviewing multiple resumes.

The application allows a recruiter to:

- Enter a job description
- Upload multiple candidate resumes in PDF format
- Extract relevant information from resumes
- Compare candidate information against job requirements
- Generate a candidate relevance score
- Identify matched skills and skill gaps
- Display candidate strengths and concerns
- Rank candidates for easier screening

The project follows the Smart Resume Screener project requirements, including resume/JD input, structured candidate information, candidate matching, 1–10 scoring, and screening justification.

---

## 🎯 Objectives

1. Automate the initial resume screening process.
2. Reduce manual effort involved in comparing resumes.
3. Extract useful candidate information from PDF resumes.
4. Compare candidate profiles against a provided job description.
5. Provide an interpretable candidate score.
6. Highlight matching skills and missing requirements.
7. Provide a simple recruiter-friendly dashboard.
8. Deploy the application as a publicly accessible web application.

---

## ✨ Features

### Resume Upload
- Upload one or multiple PDF resumes.
- Resume files are processed by the backend.
- Text is extracted from uploaded PDF documents.

### Job Description Input
Recruiters can paste a complete job description containing:
- Required skills
- Technical requirements
- Responsibilities
- Qualifications
- Experience requirements

### Candidate Screening
The system provides:
- Candidate name
- Email
- Match score
- Recommendation
- Matched skills
- Skill gaps
- Strengths
- Concerns
- Screening justification

### Candidate Ranking
Candidates are ranked according to their screening score, making it easier to identify stronger candidates first.

### Responsive Interface
The frontend is designed for desktop and smaller screens.

---

## 🏗️ System Architecture

```text
                     ┌─────────────────────┐
                     │      Recruiter      │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   React Frontend   │
                     │       Vercel        │
                     └──────────┬──────────┘
                                │
                         REST API Request
                                │
                                ▼
                     ┌─────────────────────┐
                     │   FastAPI Backend   │
                     │       Render        │
                     └──────────┬──────────┘
                                │
                   ┌────────────┴────────────┐
                   ▼                         ▼
          ┌─────────────────┐       ┌─────────────────┐
          │ PDF Text        │       │ Candidate       │
          │ Extraction      │       │ Matching        │
          │ PyMuPDF          │       │ & Scoring       │
          └─────────────────┘       └─────────────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Screening Results   │
                     │ Score / Skills /    │
                     │ Gaps / Explanation  │
                     └─────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- FastAPI
- Uvicorn
- PyMuPDF
- Python Multipart

### Deployment
- GitHub — Source code management
- Vercel — Frontend deployment
- Render — Backend deployment

### Matching
The application uses a backend candidate-matching and scoring workflow. The architecture can be extended with semantic/LLM-based matching through a server-side AI provider.

---

## 📁 Project Structure

```text
smart-resume-screener/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
│
├── docs/
│
├── render.yaml
├── .gitignore
└── README.md
```

---

# 🚀 Deployment Process

The application was deployed using a GitHub → Render → Vercel workflow.

## 1. GitHub Repository

A GitHub repository was created for the project:

```text
Sudarshan1310/smart-resume-screener
```

Repository:

https://github.com/Sudarshan1310/smart-resume-screener

The source code was uploaded with the frontend and backend maintained as separate directories.

---

## 2. Backend Deployment Using Render

The FastAPI backend was deployed on Render.

### Render Configuration

```text
Service Type: Web Service
Runtime: Python
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Deployed Backend

https://smart-resume-screener-api-id0s.onrender.com/

### Health Check

The backend provides:

```text
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

## 3. Frontend Deployment Using Vercel

The React frontend was deployed using Vercel.

### Vercel Configuration

```text
Framework: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

The frontend communicates with the Render backend through the `VITE_API_URL` environment variable.

Example:

```text
VITE_API_URL=https://smart-resume-screener-api-id0s.onrender.com
```

### Public Website

https://frontend-orpin-zeta-sg6do86sja.vercel.app/

---

# 💻 Running Locally

## Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

## Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Vite will provide a local URL such as:

```text
http://localhost:5173
```

Set the frontend API URL if required:

```text
VITE_API_URL=http://localhost:8000
```

---

# 🔄 Application Workflow

```text
1. Recruiter opens the website
              ↓
2. Enters job description
              ↓
3. Uploads PDF resumes
              ↓
4. Frontend sends files + JD
              ↓
5. FastAPI receives request
              ↓
6. PDF text is extracted
              ↓
7. Resume information is processed
              ↓
8. Resume is compared against JD
              ↓
9. Candidate score is generated
              ↓
10. Matching skills and gaps identified
              ↓
11. Results returned to frontend
              ↓
12. Candidates displayed and ranked
```

---

# 📊 Candidate Scoring

Each candidate receives a score on a **1–10 scale**.

The score provides an initial indication of how closely the candidate's resume matches the provided job description.

Example:

```text
Candidate: John Doe

Score: 8/10
Recommendation: Shortlist

Matched Skills:
- Java
- Spring Boot
- SQL
- REST API

Skill Gaps:
- Docker

Strengths:
- Strong backend development experience
- Relevant technical skills

Concerns:
- Docker experience not detected
```

The score should be treated as decision support rather than an automated hiring decision.

---

# 🔐 Security Considerations

Sensitive credentials should never be committed to GitHub.

Do not upload:

```text
.env
API keys
Passwords
Database credentials
Private credentials
```

Environment variables should be configured directly through Vercel or Render.

---

# 🧪 Testing

### Frontend

1. Open the public Vercel URL.
2. Enter a sample job description.
3. Upload one or more PDF resumes.
4. Click **Screen candidates**.
5. Verify that candidates appear in the results panel.

### Backend

Check:

```text
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# ⚠️ Current Limitations

The current deployed implementation includes a deterministic screening fallback so that the application can operate without an external AI API key.

For full LLM-based semantic screening, an LLM provider can be integrated through a server-side environment variable.

The application should be treated as a recruitment assistance tool, not as a fully autonomous hiring system.

---

# 🔮 Future Enhancements

- LLM-powered structured resume extraction
- Semantic embedding-based matching
- Advanced experience matching
- Education qualification matching
- Job-specific weighting
- Recruiter authentication
- PostgreSQL candidate history
- Candidate comparison view
- Export results to CSV/PDF
- Advanced filtering
- Resume anonymization
- Bias/fairness monitoring
- Interview question generation
- Candidate feedback generation
- Recruiter analytics dashboard

---

# 📋 Deployment Summary

| Component | Platform | Status |
|---|---|---|
| Source Code | GitHub | ✅ |
| Frontend | Vercel | ✅ |
| Backend | Render | ✅ |
| Public Website | Vercel | ✅ |
| PDF Processing | PyMuPDF | ✅ |
| Candidate Matching | Backend | ✅ |
| Candidate Scoring | Backend | ✅ |

---

# 🔗 Project Links

**Live Application:**  
https://frontend-orpin-zeta-sg6do86sja.vercel.app/

**Backend API:**  
https://smart-resume-screener-api-id0s.onrender.com/

**GitHub Repository:**  
https://github.com/Sudarshan1310/smart-resume-screener

---

## 👤 Author

**Sudarshan**

**B.Tech — Computer Science & Engineering**

VIT-AP University
