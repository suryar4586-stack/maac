import React, { useState } from 'react';
import { useFS } from '../../store/useFS.js';

export default function NotepadApp({ win }) {
  const path = win?.payload?.path;
  const fs = useFS();
  const [text, setText] = useState(path ? fs.read(path) : '');
  const [saveAs, setSaveAs] = useState(path || '/Documents/untitled.txt');

  const save = () => { fs.write(saveAs, text); alert('Saved to ' + saveAs); };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ padding:8, background:'#252525', display:'flex', gap:8 }}>
        <input className="field" style={{flex:1}} value={saveAs} onChange={e => setSaveAs(e.target.value)} />
        <button className="btn" onClick={save}>Save</button>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)}
                style={{flex:1, background:'#1a1a1a', color:'#fff', border:'none', padding:12, outline:'none', resize:'none', fontFamily:'Consolas,monospace', fontSize:14}} />
    </div>
  );
}
