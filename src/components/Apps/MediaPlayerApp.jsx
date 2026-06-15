import React, { useState } from 'react';
export default function MediaPlayerApp() {
  const [url, setUrl] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  return (
    <div className="app-pad">
      <h3 style={{marginBottom:12}}>🎵 Media Player</h3>
      <input className="field" style={{width:'100%', marginBottom:12}} value={url} onChange={e=>setUrl(e.target.value)} placeholder="Audio/Video URL" />
      <audio controls src={url} style={{width:'100%'}} />
      <video controls src={url} style={{width:'100%', marginTop:12, background:'#000'}} />
    </div>
  );
}
