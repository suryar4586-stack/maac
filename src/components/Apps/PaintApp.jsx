import React, { useRef, useState, useEffect } from 'react';
export default function PaintApp() {
  const ref = useRef(null);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(4);
  const drawing = useRef(false);

  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,c.width,c.height);
  }, []);

  const pos = (e) => { const r = ref.current.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top }; };
  const start = (e) => { drawing.current = true; const ctx = ref.current.getContext('2d'); const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); };
  const move = (e) => { if (!drawing.current) return; const ctx = ref.current.getContext('2d'); const p = pos(e); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap='round'; ctx.lineTo(p.x,p.y); ctx.stroke(); };
  const end = () => drawing.current = false;
  const clear = () => { const c = ref.current; const ctx = c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height); };
  const save = () => { const a = document.createElement('a'); a.download='paint.png'; a.href = ref.current.toDataURL(); a.click(); };

  return (
    <div className="paint">
      <div className="paint-tools">
        <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
        <input type="range" min="1" max="40" value={size} onChange={e=>setSize(+e.target.value)} />
        <span style={{fontSize:12}}>{size}px</span>
        <button className="btn ghost" onClick={clear}>Clear</button>
        <button className="btn" onClick={save}>Save PNG</button>
      </div>
      <canvas ref={ref} width={1200} height={700} onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end} />
    </div>
  );
}
