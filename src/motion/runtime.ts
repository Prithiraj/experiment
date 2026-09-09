export type MotionProfile = 'full' | 'reduced';
export type LayoutBand = 'mobile' | 'tablet' | 'desktop';

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean };
}

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function currentMotionProfile(): MotionProfile {
  return reducedQuery.matches ? 'reduced' : 'full';
}

export function currentLayoutBand(): LayoutBand {
  if (window.matchMedia('(max-width: 640px)').matches) return 'mobile';
  if (window.matchMedia('(max-width: 980px)').matches) return 'tablet';
  return 'desktop';
}

export function actorBudget(): number {
  const layout = currentLayoutBand();
  let budget = layout === 'mobile' ? 8 : layout === 'tablet' ? 14 : 24;
  const cores = navigator.hardwareConcurrency || 8;
  const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

  if (cores <= 4) budget = Math.min(budget, 10);
  if (saveData) budget = Math.min(budget, 8);
  return budget;
}

export function bindMotionEnvironment(onChange?: (profile: MotionProfile) => void): () => void {
  let previousKey = '';
  let frame: number | undefined;

  const apply = () => {
    frame = undefined;
    const profile = currentMotionProfile();
    const layout = currentLayoutBand();
    const key = `${profile}:${layout}`;

    document.documentElement.dataset.motion = profile;
    document.documentElement.dataset.layout = layout;

    if (key === previousKey) return;
    previousKey = key;
    onChange?.(profile);
  };

  const scheduleApply = () => {
    if (frame !== undefined) return;
    frame = window.requestAnimationFrame(apply);
  };

  apply();
  reducedQuery.addEventListener('change', scheduleApply);
  window.addEventListener('resize', scheduleApply, { passive: true });

  return () => {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    reducedQuery.removeEventListener('change', scheduleApply);
    window.removeEventListener('resize', scheduleApply);
  };
}

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}
