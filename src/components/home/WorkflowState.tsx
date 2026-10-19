'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * The invoice example's run state, shared by the hero mini card and the
 * workflow panel. wf 0 = new email arriving, 1–5 = node n active, 6–8 = done.
 * Advances every 900 ms unless paused; under reduced motion it starts paused
 * on the finished state.
 */
type State = { wf: number; paused: boolean; toggle: () => void };
const Ctx = createContext<State>({ wf: 6, paused: true, toggle: () => {} });

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [wf, setWf] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWf(6);
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setWf((w) => (w + 1) % 9), 900);
    return () => window.clearInterval(id);
  }, [paused]);

  return <Ctx.Provider value={{ wf, paused, toggle: () => setPaused((p) => !p) }}>{children}</Ctx.Provider>;
}

export const useWorkflow = () => useContext(Ctx);

/** Done = finished in this run; active = working now. */
export const nodeState = (wf: number, i: number) => ({ done: wf > i + 1 || wf >= 6, active: wf === i + 1 });
