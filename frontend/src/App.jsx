import React, {useState} from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App(){
  const [job,setJob]=useState('');
  const [files,setFiles]=useState([]);
  const [results,setResults]=useState([]);
  const [selected,setSelected]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  async function screen(){
    setError('');
    if(!files.length) return setError('Upload at least one PDF resume.');
    if(!job.trim()) return setError('Paste the job description.');
    const fd=new FormData();
    fd.append('job_description',job);
    files.forEach(f=>fd.append('resumes',f));
    setLoading(true);
    try{
      const r=await fetch(`${API}/api/screen`,{method:'POST',body:fd});
      const data=await r.json();
      if(!r.ok) throw new Error(data.detail || 'Screening failed');
      setResults(data.candidates || []);
      setSelected(data.candidates?.[0] || null);
    }catch(e){setError(e.message)}
    finally{setLoading(false)}
  }

  return <div className="app">
    <header><div className="brand"><span>✦</span> Smart Resume Screener</div><div className="badge">AI Candidate Matching</div></header>
    <main>
      <section className="hero">
        <div><h1>Find the strongest candidates <em>faster.</em></h1>
        <p>Upload resumes, paste a job description, and get structured candidate matching with scores and explanations.</p></div>
      </section>
      <section className="inputs">
        <div className="card"><h2>Job description</h2><p className="muted">Paste the role requirements and responsibilities.</p>
          <textarea value={job} onChange={e=>setJob(e.target.value)} placeholder="Example: Looking for a Java developer with Spring Boot, SQL, REST APIs..."/>
        </div>
        <div className="card"><h2>Resume upload</h2><p className="muted">Upload one or more PDF resumes.</p>
          <label className="drop"><input type="file" accept=".pdf" multiple onChange={e=>setFiles([...e.target.files])}/><strong>⇧ Click to upload PDFs</strong><span>Multiple resumes supported</span></label>
          {files.length>0 && <div className="filelist">{files.map(f=><div key={f.name}>📄 {f.name}</div>)}</div>}
          <button onClick={screen} disabled={loading}>{loading?'Screening candidates...':'Screen candidates'}</button>
          {error && <div className="error">{error}</div>}
        </div>
      </section>

      <section className="results card">
        <div className="resulthead"><div><h2>Candidate results</h2><p className="muted">{results.length} candidates screened</p></div></div>
        {results.length===0 ? <div className="empty">Your screened candidates will appear here.</div> :
        <div className="candidateGrid">
          <div className="candidateList">{results.map(c=><button className={'candidate '+(selected?.id===c.id?'active':'')} onClick={()=>setSelected(c)} key={c.id}>
            <div className="avatar">{(c.name||'U')[0]}</div><div className="candidateInfo"><strong>{c.name||'Unnamed candidate'}</strong><small>{c.email||c.filename}</small></div><b className={c.score>=8?'good':c.score>=6?'mid':'low'}>{c.score}/10</b>
          </button>)}</div>
          {selected && <div className="detail">
            <h2>{selected.name||'Unnamed candidate'}</h2><p className="muted">{selected.email||'Email not detected'}</p>
            <div className="scorebox"><strong>{selected.score}/10</strong><span>{selected.recommendation}</span><p>{selected.justification}</p></div>
            <Block title="Matched skills" items={selected.matched}/>
            <Block title="Skill gaps" items={selected.missing}/>
            <Block title="Strengths" items={selected.strengths}/>
            <Block title="Concerns" items={selected.concerns}/>
          </div>}
        </div>}
      </section>
    </main>
  </div>
}
function Block({title,items=[]}){return <div className="block"><h3>{title}</h3>{items.length?<ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul>:<span className="muted">None detected</span>}</div>}
