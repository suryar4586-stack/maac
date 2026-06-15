import React, { useEffect } from 'react';
import Desktop from './components/Desktop.jsx';
import Taskbar from './components/Taskbar.jsx';
import WindowManager from './components/WindowManager.jsx';
import StartMenu from './components/StartMenu.jsx';
import LockScreen from './components/LockScreen.jsx';
import { useOS } from './store/useOS.js';

export default function App() {
  const { locked, wallpaper } = useOS();
  useEffect(() => { document.title = 'StackOS'; }, []);
  if (locked) return <LockScreen />;
  return (
    <div className="os-root" style={{ backgroundImage: `url(${wallpaper})` }}>
      <Desktop />
      <WindowManager />
      <StartMenu />
      <Taskbar />
    </div>
  );
}
