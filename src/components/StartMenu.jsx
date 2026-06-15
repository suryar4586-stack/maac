import React, { useState } from 'react';
import { useOS } from '../store/useOS.js';
import { APPS } from '../utils/apps.js';
import { Power, Lock } from 'lucide-react';

export default function StartMenu() {
  const { startOpen, closeStart, openApp, lock, username } = useOS();
  const [q, setQ] = useState('');
  if (!startOpen) return null;
  const filtered = APPS.filter(a => a.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div style={{ position:'absolute', inset:0, zIndex: 9997 }} onClick={closeStart} />
      <div className="start-menu" onClick={e => e.stopPropagation()}>
        <input className="start-search" placeholder="Search apps..." value={q} onChange={e => setQ(e.target.value)} autoFocus />
        <h3>All Apps</h3>
        <div className="start-grid">
          {filtered.map(app => {
            const Icon = app.icon;
            return (
              <div key={app.id} className="start-app" onClick={() => openApp(app.id)}>
                <Icon size={32} /><span>{app.name}</span>
              </div>
            );
          })}
        </div>
        <div className="start-footer">
          <div style={{ fontSize: 13 }}>👤 {username}</div>
          <div style={{ display:'flex', gap: 8 }}>
            <button className="tb-btn" onClick={lock} title="Lock"><Lock size={16} /></button>
            <button className="tb-btn" onClick={() => window.location.reload()} title="Restart"><Power size={16} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
