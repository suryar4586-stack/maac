import React, { useEffect, useState } from 'react';
import { useOS } from '../store/useOS.js';
export default function LockScreen() {
  const unlock = useOS(s => s.unlock);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="lock-screen" onDoubleClick={unlock}>
      <div className="time">{now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</div>
      <div className="date">{now.toLocaleDateString(undefined, { weekday:'long', month:'long', day:'numeric' })}</div>
      <button onClick={unlock}>Unlock</button>
      <div style={{ fontSize: 11, opacity: 0.6 }}>(double-click anywhere)</div>
    </div>
  );
}
