export type MotionProfile = 'full' | 'reduced';

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean };
}

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function currentMotionProfile(): MotionProfile {
  return reducedQuery.matches ? 'reduced' : 'full';
}

export function actorBudget(): number {
  let budget = window.innerWidth < 640 ? 8 : window.innerWidth < 980 ? 14 : 24;
  const cores = navigator.hardwareConcurrency || 8;
  const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

  if (cores <= 4) budget = Math.min(budget, 10);
  if (saveData) budget = Math.min(budget, 8);
  return budget;
}

export function bindMotionPreference(onChange?: (profile: MotionProfile) => void): () => void {
  const apply = () => {
    const profile = currentMotionProfile();
    document.documentElement.dataset.motion = profile;
    onChange?.(profile);
  };

  apply();
  reducedQuery.addEventListener('change', apply);
  return () => reducedQuery.removeEventListener('change', apply);
}

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}
