export type MotionProfile = 'full' | 'reduced';

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function currentMotionProfile(): MotionProfile {
  return reducedQuery.matches ? 'reduced' : 'full';
}

export function actorBudget(): number {
  if (window.innerWidth < 640) return 8;
  if (window.innerWidth < 980) return 14;
  return 24;
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
