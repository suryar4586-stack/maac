import React, { useState } from 'react';
import { useOS } from '../../store/useOS.js';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&q=80',
];

export default function SettingsApp() {
  const { wallpaper, setWallpaper, username, setUsername, theme, setTheme } = useOS();
  const [tab, setTab] = useState('personalize');
  return (
    <div className="settings-grid">
      <div className="settings-nav">
        <div className={tab==='personalize'?'active':''} onClick={()=>setTab('personalize')}>Personalize</div>
        <div className={tab==='account'?'active':''} onClick={()=>setTab('account')}>Account</div>
        <div className={tab==='about'?'active':''} onClick={()=>setTab('about')}>About</div>
      </div>
      <div className="settings-pane">
        {tab==='personalize' && <>
          <div className="row">
            <label>Wallpaper</label>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8}}>
              {WALLPAPERS.map(w => (
                <img key={w} src={w} alt="" onClick={()=>setWallpaper(w)}
                     style={{width:'100%', height:90, objectFit:'cover', cursor:'pointer', border: wallpaper===w?'3px solid #0078d4':'3px solid transparent', borderRadius:4}}/>
              ))}
            </div>
          </div>
          <div className="row">
            <label>Theme</label>
            <select className="field" value={theme} onChange={e=>setTheme(e.target.value)}>
              <option value="dark">Dark</option><option value="light">Light</option>
            </select>
          </div>
        </>}
        {tab==='account' && <div className="row">
          <label>Username</label>
          <input className="field" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>}
        {tab==='about' && <div>
          <h3>StackOS</h3>
          <p style={{opacity:0.7, marginTop:8}}>Version 1.0 — Frontend Only</p>
          <p style={{opacity:0.7, marginTop:4}}>React + Vite + Zustand</p>
        </div>}
      </div>
    </div>
  );
}
