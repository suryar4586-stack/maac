import {
  Folder, Terminal, FileText, Calculator, Globe, Paintbrush,
  Music, Settings as SettingsIcon, Store, Trash2
} from 'lucide-react';

export const APPS = [
  { id: 'files', name: 'File Manager', icon: Folder, defaultW: 800, defaultH: 520 },
  { id: 'terminal', name: 'Terminal', icon: Terminal, defaultW: 680, defaultH: 420 },
  { id: 'notepad', name: 'Notepad', icon: FileText, defaultW: 640, defaultH: 480, allowMulti: true },
  { id: 'calculator', name: 'Calculator', icon: Calculator, defaultW: 320, defaultH: 460 },
  { id: 'browser', name: 'Browser', icon: Globe, defaultW: 900, defaultH: 600 },
  { id: 'paint', name: 'Paint', icon: Paintbrush, defaultW: 760, defaultH: 540 },
  { id: 'media', name: 'Media Player', icon: Music, defaultW: 520, defaultH: 360 },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, defaultW: 700, defaultH: 500 },
  { id: 'store', name: 'App Store', icon: Store, defaultW: 720, defaultH: 500 },
  { id: 'trash', name: 'Recycle Bin', icon: Trash2, defaultW: 640, defaultH: 440 },
];
