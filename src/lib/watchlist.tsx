import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "tt.watchlist";

interface Ctx {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const WatchCtx = createContext<Ctx | undefined>(undefined);

export function WatchProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  const has = (id: string) => ids.includes(id);
  const clear = () => persist([]);

  return <WatchCtx.Provider value={{ ids, toggle, has, clear }}>{children}</WatchCtx.Provider>;
}

export function useWatch() {
  const ctx = useContext(WatchCtx);
  if (!ctx) throw new Error("useWatch must be used within WatchProvider");
  return ctx;
}
