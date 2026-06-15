import React from 'react';
import { useFS } from '../../store/useFS.js';
import { Trash2, RotateCcw } from 'lucide-react';
export default function RecycleBinApp() {
  const trash = useFS(s => s.trash);
  const restore = useFS(s => s.restore);
  const empty = useFS(s => s.emptyTrash);
  const items = Object.keys(trash);
  return (
    <div className="app-pad">
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}>
        <h3>🗑️ Recycle Bin ({items.length})</h3>
        <button className="btn" onClick={empty} disabled={!items.length}><Trash2 size={14}/> Empty</button>
      </div>
      {items.length === 0 && <div style={{opacity:0.5}}>Recycle bin is empty.</div>}
      {items.map(p => (
        <div key={p} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
          <span style={{fontSize:13}}>{p}</span>
          <button className="btn ghost" onClick={() => restore(p)}><RotateCcw size={12}/> Restore</button>
        </div>
      ))}
    </div>
  );
}
