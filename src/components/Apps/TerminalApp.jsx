import React, { useState, useRef, useEffect } from 'react';
import { useFS } from '../../store/useFS.js';

export default function TerminalApp() {
  const [lines, setLines] = useState(['StackOS Terminal v1.0', 'Type "help" for commands', '']);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/');
  const fs = useFS();
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView(); }, [lines]);

  const resolve = (p) => p.startsWith('/') ? p : (cwd === '/' ? '/' + p : cwd + '/' + p);

  const run = (cmd) => {
    const out = [`${cwd}> ${cmd}`];
    const [c, ...args] = cmd.trim().split(/\s+/);
    switch (c) {
      case 'help': out.push('Commands: ls, cd, cat, echo, mkdir, touch, rm, pwd, date, clear, whoami'); break;
      case 'ls': out.push(fs.list(cwd).map(i => (i.type==='dir'?'📁 ':'📄 ')+i.name).join('  ') || '(empty)'); break;
      case 'pwd': out.push(cwd); break;
      case 'cd': {
        const t = args[0] || '/';
        if (t === '..') setCwd(cwd === '/' ? '/' : cwd.split('/').slice(0,-1).join('/') || '/');
        else { const np = resolve(t); if (fs.files[np]?.type === 'dir') setCwd(np); else out.push('No such directory'); }
        break;
      }
      case 'cat': out.push(fs.read(resolve(args[0])) || '(empty/missing)'); break;
      case 'echo': out.push(args.join(' ')); break;
      case 'mkdir': fs.mkdir(resolve(args[0])); break;
      case 'touch': fs.write(resolve(args[0]), ''); break;
      case 'rm': fs.remove(resolve(args[0])); break;
      case 'date': out.push(new Date().toString()); break;
      case 'whoami': out.push('user'); break;
      case 'clear': setLines([]); return;
      case '': break;
      default: out.push(`${c}: command not found`);
    }
    setLines(l => [...l, ...out]);
  };

  return (
    <div className="term" onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
      {lines.map((l, i) => <div key={i} className="line">{l}</div>)}
      <div style={{display:'flex'}}>
        <span>{cwd}&gt;&nbsp;</span>
        <input autoFocus value={input}
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => { if (e.key==='Enter') { run(input); setInput(''); } }} />
      </div>
      <div ref={endRef} />
    </div>
  );
}
