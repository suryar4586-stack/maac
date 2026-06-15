import React from 'react';
import { useFS } from '../store/useFS.js';
import { useOS } from '../store/useOS.js';
import { APPS } from '../utils/apps.js';
import { File as FileIcon, Folder } from 'lucide-react';

export default function Desktop() {
  const items = useFS(s => s.list('/Desktop'));
  const openApp = useOS(s => s.openApp);
  return (
    <div className="desktop" onContextMenu={e => e.preventDefault()}>
      {APPS.slice(0, 6).map(app => {
        const Icon = app.icon;
        return (
          <div key={app.id} className="desktop-icon" onDoubleClick={() => openApp(app.id)}>
            <Icon size={42} />
            <span>{app.name}</span>
          </div>
        );
      })}
      {items.map(it => (
        <div key={it.path} className="desktop-icon"
             onDoubleClick={() => openApp('notepad', { path: it.path })}>
          {it.type === 'dir' ? <Folder size={42} /> : <FileIcon size={42} />}
          <span>{it.name}</span>
        </div>
      ))}
    </div>
  );
}
