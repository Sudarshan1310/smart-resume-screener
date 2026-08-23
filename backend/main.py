import os, re, json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz

app=FastAPI(title="Smart Resume Screener API")
origins=[x.strip() for x in os.getenv("CORS_ORIGINS","*").split(",")]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

def extract(data):
    doc=fitz.open(stream=data,filetype="pdf")
    text="\n".join(p.get_text() for p in doc)
    doc.close()
    return text

def fallback(text,job,filename,idx):
    words=lambda s:set(re.findall(r"[A-Za-z][A-Za-z0-9+#.-]{2,}",s.lower()))
    stop={"the","and","with","for","from","that","this","your","have","will","are","you","our","job","role","work","years","using"}
    common=sorted((words(text)&words(job))-stop)
    matched=common[:15]
    missing=sorted(words(job)-words(text)-stop)[:10]
    score=max(1,min(10,round(3+7*len(matched)/max(10,min(30,len(words(job)))))))
    name=None
    for line in text.splitlines():
        if re.fullmatch(r"[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+){1,3}",line.strip()):
            name=line.strip(); break
    email=re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+",text)
    rec="Shortlist" if score>=8 else ("Review" if score>=6 else "Reject")
    return {"id":idx,"filename":filename,"name":name,"email":email.group(0) if email else None,
            "score":score,"recommendation":rec,"matched":matched,"missing":missing,
            "strengths":[f"Relevant requirement detected: {x}" for x in matched[:5]],
            "concerns":[f"Requirement not detected: {x}" for x in missing[:5]],
            "justification":f"Preliminary screening found {len(matched)} overlapping terms. Configure OPENAI_API_KEY for LLM semantic matching."}

@app.get("/health")
def health(): return {"status":"ok"}

@app.post("/api/screen")
async def screen(job_description:str=Form(...), resumes:list[UploadFile]=File(...)):
    if not job_description.strip(): raise HTTPException(400,"Job description is required")
    out=[]
    for i,f in enumerate(resumes,1):
        if not f.filename.lower().endswith(".pdf"): continue
        data=await f.read()
        text=extract(data)
        # Safe offline fallback; OpenAI integration can be added via server-side key.
        out.append(fallback(text,job_description,f.filename,i))
    if not out: raise HTTPException(400,"Upload at least one PDF resume")
    return {"candidates":sorted(out,key=lambda x:x["score"],reverse=True)}
