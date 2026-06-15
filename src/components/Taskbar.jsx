import React, { useEffect, useState } from 'react';
import { useOS } from '../store/useOS.js';
import { APPS } from '../utils/apps.js';
import { Search, LayoutGrid } from 'lucide-react';

export default function Taskbar() {
  const { windows, toggleStart, focusWindow, toggleMinimize, openApp } = useOS();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const pinned = ['files', 'browser', 'terminal', 'notepad'];
  const visible = [...new Set([...pinned, ...windows.map(w => w.appId)])];

  return (
    <div className="taskbar">
      <button className="tb-btn" onClick={toggleStart} title="Start"><LayoutGrid size={20} /></button>
      <button className="tb-btn" title="Search"><Search size={18} /></button>
      {visible.map(id => {
        const app = APPS.find(a => a.id === id); if (!app) return null;
        const Icon = app.icon;
        const win = windows.find(w => w.appId === id);
        return (
          <button key={id} className={`tb-btn ${win ? 'active' : ''}`} title={app.name}
                  onClick={() => win ? (win.minimized ? focusWindow(win.id) : toggleMinimize(win.id)) : openApp(id)}>
            <Icon size={20} />
          </button>
        );
      })}
      <div className="tb-clock">
        <div>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div>{now.toLocaleDateString()}</div>
      </div>
    </div>
  );
}
