import React, { useState } from 'react';
import { useFS } from '../../store/useFS.js';
import { useOS } from '../../store/useOS.js';
import { Folder, File as FileIcon, Home, Image, FileText, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function FileManagerApp() {
  const [path, setPath] = useState('/');
  const [sel, setSel] = useState(null);
  const list = useFS(s => s.list);
  const mkdir = useFS(s => s.mkdir);
  const write = useFS(s => s.write);
  const remove = useFS(s => s.remove);
  const openApp = useOS(s => s.openApp);
  const items = list(path);
  const join = (p, n) => p === '/' ? '/' + n : p + '/' + n;
  const up = () => setPath(path === '/' ? '/' : path.split('/').slice(0, -1).join('/') || '/');

  const newFolder = () => { const n = prompt('Folder name'); if (n) mkdir(join(path, n)); };
  const newFile = () => { const n = prompt('File name'); if (n) write(join(path, n), ''); };

  return (
    <div className="fm">
      <div className="fm-side">
        <div className={path==='/' ? 'active':''} onClick={() => setPath('/')}><Home size={14}/>Home</div>
        <div className={path==='/Desktop'?'active':''} onClick={() => setPath('/Desktop')}><Folder size={14}/>Desktop</div>
        <div className={path==='/Documents'?'active':''} onClick={() => setPath('/Documents')}><FileText size={14}/>Documents</div>
        <div className={path==='/Pictures'?'active':''} onClick={() => setPath('/Pictures')}><Image size={14}/>Pictures</div>
      </div>
      <div className="fm-main">
        <div className="fm-bar">
          <button className="btn ghost" onClick={up}><ArrowLeft size={14}/></button>
          <div style={{flex:1, fontSize:13}}>{path}</div>
          <button className="btn ghost" onClick={newFolder}><Plus size={14}/> Folder</button>
          <button className="btn ghost" onClick={newFile}><Plus size={14}/> File</button>
          {sel && <button className="btn ghost" onClick={() => { remove(sel); setSel(null); }}><Trash2 size={14}/></button>}
        </div>
        <div className="fm-grid">
          {items.map(it => (
            <div key={it.path} className={`fm-item ${sel===it.path?'selected':''}`}
                 onClick={() => setSel(it.path)}
                 onDoubleClick={() => it.type === 'dir' ? setPath(it.path) : openApp('notepad', { path: it.path })}>
              {it.type === 'dir' ? <Folder size={42}/> : <FileIcon size={42}/>}
              <span>{it.name}</span>
            </div>
          ))}
          {items.length === 0 && <div style={{ opacity:0.5, padding:20 }}>Empty folder</div>}
        </div>
      </div>
    </div>
  );
}
