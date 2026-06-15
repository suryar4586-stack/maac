import React, { useRef } from 'react';
import { useOS } from '../store/useOS.js';
import { Minus, Square, X } from 'lucide-react';

export default function Window({ win, children, icon: Icon }) {
  const { focusWindow, closeWindow, toggleMinimize, toggleMaximize, updateWindow } = useOS();
  const drag = useRef(null);

  const onMouseDown = (e) => {
    if (win.maximized) return;
    drag.current = { sx: e.clientX, sy: e.clientY, x: win.x, y: win.y };
    const move = (ev) => updateWindow(win.id, { x: drag.current.x + ev.clientX - drag.current.sx, y: drag.current.y + ev.clientY - drag.current.sy });
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
  };

  const style = win.maximized ? {} : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div className={`window ${win.maximized ? 'maximized' : ''}`}
         style={{ ...style, zIndex: win.z }} onMouseDown={() => focusWindow(win.id)}>
      <div className="win-titlebar" onMouseDown={onMouseDown} onDoubleClick={() => toggleMaximize(win.id)}>
        {Icon && <Icon size={14} />}
        <span className="win-title">{win.title}</span>
        <div className="win-controls">
          <button onClick={() => toggleMinimize(win.id)}><Minus size={14} /></button>
          <button onClick={() => toggleMaximize(win.id)}><Square size={12} /></button>
          <button className="close" onClick={() => closeWindow(win.id)}><X size={14} /></button>
        </div>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}
