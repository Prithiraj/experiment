export type DepthLayer = 'far' | 'mid' | 'near' | 'foreground';

export interface ZeroGProfile {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  travel: number;
}

const depthProfiles: Record<DepthLayer, Omit<ZeroGProfile, 'x' | 'y' | 'rotation'>> = {
  far: { scale: 0.8, opacity: 0.58, travel: 0.45 },
  mid: { scale: 0.94, opacity: 0.82, travel: 0.75 },
  near: { scale: 1.08, opacity: 0.96, travel: 1 },
  foreground: { scale: 1.28, opacity: 1, travel: 1.35 },
};

const vectors = [
  { x: -180, y: -80, rotation: -14 },
  { x: 140, y: -210, rotation: 12 },
  { x: 210, y: 90, rotation: 18 },
  { x: -110, y: 180, rotation: -10 },
  { x: 80, y: -280, rotation: 7 },
  { x: -230, y: -160, rotation: -18 },
] as const;

export function zeroGProfile(index: number, depth: DepthLayer): ZeroGProfile {
  const vector = vectors[index % vectors.length] ?? vectors[0];
  const layer = depthProfiles[depth];

  return {
    x: vector.x * layer.travel,
    y: vector.y * layer.travel,
    rotation: vector.rotation * layer.travel,
    scale: layer.scale,
    opacity: layer.opacity,
    travel: layer.travel,
  };
}

export function parseDepth(value: string | undefined): DepthLayer {
  return value === 'far' || value === 'mid' || value === 'near' || value === 'foreground' ? value : 'mid';
}
