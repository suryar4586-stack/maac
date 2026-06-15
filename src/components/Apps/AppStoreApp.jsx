import React from 'react';
import { useOS } from '../../store/useOS.js';
import { APPS } from '../../utils/apps.js';
export default function AppStoreApp() {
  const openApp = useOS(s => s.openApp);
  return (
    <div>
      <div style={{padding:'20px 16px 8px'}}><h2>StackOS App Store</h2><p style={{opacity:0.7, fontSize:13, marginTop:4}}>All apps are pre-installed.</p></div>
      <div className="store-grid">
        {APPS.map(a => {
          const Icon = a.icon;
          return (
            <div key={a.id} className="store-card">
              <Icon size={28} style={{marginBottom:8}}/>
              <h4>{a.name}</h4>
              <p>Built-in StackOS app.</p>
              <button className="btn" onClick={()=>openApp(a.id)}>Open</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
