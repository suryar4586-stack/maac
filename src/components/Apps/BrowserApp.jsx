import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
export default function BrowserApp() {
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Operating_system');
  const [input, setInput] = useState(url);
  const [key, setKey] = useState(0);
  const go = (e) => { e?.preventDefault?.(); let u = input.trim(); if (!u.startsWith('http')) u = 'https://' + u; setUrl(u); setInput(u); };
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
      <form onSubmit={go} style={{display:'flex', gap:6, padding:8, background:'#252525'}}>
        <button type="button" className="btn ghost"><ArrowLeft size={14}/></button>
        <button type="button" className="btn ghost"><ArrowRight size={14}/></button>
        <button type="button" className="btn ghost" onClick={() => setKey(k=>k+1)}><RotateCw size={14}/></button>
        <input className="field" style={{flex:1}} value={input} onChange={e=>setInput(e.target.value)} />
        <button className="btn">Go</button>
      </form>
      <iframe key={key} src={url} title="browser" style={{flex:1, border:'none', background:'#fff'}} />
      <div style={{padding:6, fontSize:11, opacity:0.6, background:'#222'}}>Note: many sites block iframe embedding (X-Frame-Options).</div>
    </div>
  );
}
