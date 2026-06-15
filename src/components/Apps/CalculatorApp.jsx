import React, { useState } from 'react';
export default function CalculatorApp() {
  const [d, setD] = useState('0');
  const press = (k) => {
    if (k === 'C') return setD('0');
    if (k === '=') { try { setD(String(eval(d.replace(/×/g,'*').replace(/÷/g,'/')))); } catch { setD('Err'); } return; }
    if (k === '←') return setD(d.length>1 ? d.slice(0,-1) : '0');
    setD(d === '0' && /[0-9.]/.test(k) ? k : d + k);
  };
  const keys = ['C','←','÷','×','7','8','9','-','4','5','6','+','1','2','3','=','0','.'];
  return (
    <div className="calc">
      <div className="calc-disp">{d}</div>
      <div className="calc-keys">
        {keys.map(k => <button key={k} className={'+-×÷='.includes(k)?'op':''} onClick={() => press(k)}>{k}</button>)}
      </div>
    </div>
  );
}
