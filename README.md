# Smart Resume Screener

AI-powered resume parsing and job matching application based on the supplied project brief.

## Repository setup

This repository is intended to be the source repository for the public deployment.

Planned deployment:
- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL
- AI: OpenAI API

The full production source can be added to `frontend/` and `backend/`. Never commit API keys or `.env` files.

## Project brief

The supplied brief requires:
- PDF/Text resume + job description input
- structured extraction of skills, experience, education
- LLM match scoring from 1–10
- shortlisted candidates with justification
- backend API
- database storage
- README/LLM prompts
- a 2–3 minute demo
