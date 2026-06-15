import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { APPS } from '../utils/apps.js';

const DEFAULT_WALLPAPER =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80';

export const useOS = create(persist((set, get) => ({
  locked: false,
  startOpen: false,
  wallpaper: DEFAULT_WALLPAPER,
  theme: 'dark',
  username: 'User',
  windows: [], // {id, appId, title, x, y, w, h, z, minimized, maximized}
  zCounter: 10,

  lock: () => set({ locked: true, startOpen: false }),
  unlock: () => set({ locked: false }),
  toggleStart: () => set(s => ({ startOpen: !s.startOpen })),
  closeStart: () => set({ startOpen: false }),
  setWallpaper: (w) => set({ wallpaper: w }),
  setTheme: (t) => set({ theme: t }),
  setUsername: (n) => set({ username: n }),

  openApp: (appId, payload) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;
    const existing = get().windows.find(w => w.appId === appId && !app.allowMulti);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) get().toggleMinimize(existing.id);
      return;
    }
    const z = get().zCounter + 1;
    const id = `${appId}-${Date.now()}`;
    set(s => ({
      windows: [...s.windows, {
        id, appId, title: app.name, payload,
        x: 80 + (s.windows.length * 30) % 200,
        y: 60 + (s.windows.length * 30) % 150,
        w: app.defaultW || 720, h: app.defaultH || 480,
        z, minimized: false, maximized: false
      }],
      zCounter: z, startOpen: false
    }));
  },
  closeWindow: (id) => set(s => ({ windows: s.windows.filter(w => w.id !== id) })),
  focusWindow: (id) => set(s => {
    const z = s.zCounter + 1;
    return { zCounter: z, windows: s.windows.map(w => w.id === id ? { ...w, z, minimized: false } : w) };
  }),
  toggleMinimize: (id) => set(s => ({ windows: s.windows.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w) })),
  toggleMaximize: (id) => set(s => ({ windows: s.windows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w) })),
  updateWindow: (id, patch) => set(s => ({ windows: s.windows.map(w => w.id === id ? { ...w, ...patch } : w) })),
}), {
  name: 'stackos-state',
  partialize: (s) => ({ wallpaper: s.wallpaper, theme: s.theme, username: s.username })
}));
