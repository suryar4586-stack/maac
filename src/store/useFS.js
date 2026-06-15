import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Simple virtual FS stored as flat record of paths -> {type, content, mtime}
const seed = {
  '/': { type: 'dir' },
  '/Desktop': { type: 'dir' },
  '/Documents': { type: 'dir' },
  '/Pictures': { type: 'dir' },
  '/Documents/welcome.txt': { type: 'file', content: 'Welcome to StackOS!\n\nThis is your virtual file system. Everything is saved locally in your browser.' },
  '/Desktop/readme.txt': { type: 'file', content: 'Right-click the desktop for options.\nDouble-click apps to launch.' },
};

export const useFS = create(persist((set, get) => ({
  files: seed,
  trash: {},
  list: (dir) => {
    const f = get().files;
    const prefix = dir === '/' ? '/' : dir + '/';
    return Object.entries(f)
      .filter(([p]) => p !== dir && p.startsWith(prefix) && !p.slice(prefix.length).includes('/'))
      .map(([p, v]) => ({ path: p, name: p.split('/').pop(), ...v }));
  },
  read: (path) => get().files[path]?.content || '',
  write: (path, content) => set(s => ({ files: { ...s.files, [path]: { type: 'file', content, mtime: Date.now() } } })),
  mkdir: (path) => set(s => ({ files: { ...s.files, [path]: { type: 'dir', mtime: Date.now() } } })),
  remove: (path) => set(s => {
    const files = { ...s.files };
    const trash = { ...s.trash };
    Object.keys(files).forEach(p => {
      if (p === path || p.startsWith(path + '/')) {
        trash[p] = files[p];
        delete files[p];
      }
    });
    return { files, trash };
  }),
  restore: (path) => set(s => {
    const files = { ...s.files };
    const trash = { ...s.trash };
    Object.keys(trash).forEach(p => {
      if (p === path || p.startsWith(path + '/')) {
        files[p] = trash[p];
        delete trash[p];
      }
    });
    return { files, trash };
  }),
  emptyTrash: () => set({ trash: {} }),
}), { name: 'stackos-fs' }));
