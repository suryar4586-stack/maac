import React from 'react';
import { useOS } from '../store/useOS.js';
import Window from './Window.jsx';
import { APPS } from '../utils/apps.js';
import FileManagerApp from './Apps/FileManagerApp.jsx';
import TerminalApp from './Apps/TerminalApp.jsx';
import NotepadApp from './Apps/NotepadApp.jsx';
import CalculatorApp from './Apps/CalculatorApp.jsx';
import BrowserApp from './Apps/BrowserApp.jsx';
import PaintApp from './Apps/PaintApp.jsx';
import MediaPlayerApp from './Apps/MediaPlayerApp.jsx';
import SettingsApp from './Apps/SettingsApp.jsx';
import AppStoreApp from './Apps/AppStoreApp.jsx';
import RecycleBinApp from './Apps/RecycleBinApp.jsx';

const REG = {
  files: FileManagerApp, terminal: TerminalApp, notepad: NotepadApp,
  calculator: CalculatorApp, browser: BrowserApp, paint: PaintApp,
  media: MediaPlayerApp, settings: SettingsApp, store: AppStoreApp, trash: RecycleBinApp
};

export default function WindowManager() {
  const windows = useOS(s => s.windows);
  return (<>
    {windows.map(w => {
      if (w.minimized) return null;
      const Comp = REG[w.appId];
      const app = APPS.find(a => a.id === w.appId);
      return (
        <Window key={w.id} win={w} icon={app?.icon}>
          {Comp ? <Comp win={w} /> : <div className="app-pad">App not found</div>}
        </Window>
      );
    })}
  </>);
}
