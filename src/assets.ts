import cinematicBloom from '../assets/production/cinematic/cinematic-lotus-bloom-pond.webp';
import cinematicBloom768 from '../assets/production/cinematic/cinematic-lotus-bloom-pond-768.webp';
import cinematicBud from '../assets/production/cinematic/cinematic-lotus-bud-pond.webp';
import cinematicBud768 from '../assets/production/cinematic/cinematic-lotus-bud-pond-768.webp';
import lotusEarly from '../assets/production/lotus/lotus-bloom-early-open.webp';
import lotusBloom from '../assets/production/lotus/lotus-bloom-full.webp';
import lotusHalf from '../assets/production/lotus/lotus-bloom-half-open.webp';
import lotusBud from '../assets/production/lotus/lotus-bud.webp';
import lotusLeaf from '../assets/production/lotus/lotus-leaf-foreground.webp';
import lotusWater from '../assets/production/water/lotus-water-plate.webp';
import waterReflection from '../assets/production/water/lotus-water-reflection-plate.webp';
import waterReflection768 from '../assets/production/water/lotus-water-reflection-plate-768.webp';
import waterRipple from '../assets/production/water/lotus-water-ripple-overlay.webp';
import waterRipple768 from '../assets/production/water/lotus-water-ripple-overlay-768.webp';
import petal01 from '../assets/production/petal-field/lotus-petal-floating-01.webp';
import petal02 from '../assets/production/petal-field/lotus-petal-floating-02.webp';
import petal03 from '../assets/production/petal-field/lotus-petal-floating-03.webp';
import citrusOrbit from '../assets/production/orbit/orbit-citrus-orbit.webp';
import quietMoon from '../assets/production/orbit/orbit-quiet-moon.webp';
import violetNoise from '../assets/production/orbit/orbit-violet-noise.webp';
import wildSignal from '../assets/production/orbit/orbit-wild-signal.webp';

export const productionAssets = {
  cinematicBloom,
  cinematicBud,
  lotusBloom,
  lotusBud,
  lotusEarly,
  lotusHalf,
  lotusLeaf,
  lotusWater,
  petal01,
  petal02,
  petal03,
  citrusOrbit,
  quietMoon,
  violetNoise,
  waterReflection,
  waterRipple,
  wildSignal,
} as const;

type ProductionAssetKey = keyof typeof productionAssets;

const responsiveSources: Partial<Record<ProductionAssetKey, { srcset: string; sizes: string }>> = {
  cinematicBloom: { srcset: `${cinematicBloom768} 768w, ${cinematicBloom} 1536w`, sizes: '100vw' },
  cinematicBud: { srcset: `${cinematicBud768} 768w, ${cinematicBud} 1536w`, sizes: '100vw' },
  waterReflection: { srcset: `${waterReflection768} 768w, ${waterReflection} 1536w`, sizes: '100vw' },
  waterRipple: { srcset: `${waterRipple768} 768w, ${waterRipple} 1536w`, sizes: '100vw' },
};

type AssetLoading = 'critical' | 'visible' | 'preload' | 'sequence' | 'deferred';

function whenReady(image: HTMLImageElement): Promise<void> {
  if (image.complete) return image.decode().catch(() => undefined);
  return new Promise((resolve) => {
    image.addEventListener('load', () => resolve(), { once: true });
    image.addEventListener('error', () => resolve(), { once: true });
  });
}

export function bindProductionAssets(root: ParentNode = document): () => void {
  const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-production-image]')).filter(
    (element): element is HTMLImageElement => element instanceof HTMLImageElement,
  );
  const deferred: HTMLImageElement[] = [];
  const sequenced: HTMLImageElement[] = [];
  let active = true;

  const load = (element: HTMLImageElement) => {
    const key = element.dataset.productionImage as ProductionAssetKey | undefined;
    const source = key ? productionAssets[key] : undefined;
    if (!key || !source || element.src) return;

    const responsive = responsiveSources[key];
    if (responsive) {
      element.srcset = responsive.srcset;
      element.sizes = responsive.sizes;
    }
    element.src = source;
    element.decoding = 'async';
    element.draggable = false;
    if (!element.hasAttribute('alt')) element.alt = '';
  };

  elements.forEach((element) => {
    const loading = (element.dataset.assetLoading ?? 'deferred') as AssetLoading;
    element.decoding = 'async';
    element.draggable = false;
    if (!element.hasAttribute('alt')) element.alt = '';

    if (loading === 'sequence') {
      element.loading = 'eager';
      element.setAttribute('fetchpriority', 'low');
      sequenced.push(element);
      return;
    }

    if (loading === 'deferred') {
      element.loading = 'lazy';
      element.setAttribute('fetchpriority', 'low');
      deferred.push(element);
      return;
    }

    element.loading = 'eager';
    element.setAttribute('fetchpriority', loading === 'critical' ? 'high' : 'auto');
    load(element);
  });

  const sequenceAnchor = elements.find(
    (element) => element.dataset.assetLoading === 'preload' && element.dataset.assetSequence === '0',
  );
  const sequenceGroups = new Map<number, HTMLImageElement[]>();
  sequenced.forEach((element) => {
    const step = Number(element.dataset.assetSequence ?? 0);
    const group = sequenceGroups.get(step) ?? [];
    group.push(element);
    sequenceGroups.set(step, group);
  });
  let sequence = sequenceAnchor ? whenReady(sequenceAnchor) : Promise.resolve();
  [...sequenceGroups.entries()]
    .sort(([left], [right]) => left - right)
    .forEach(([, group]) => {
      sequence = sequence.then(async () => {
        if (!active) return;
        group.forEach(load);
        await Promise.all(group.map(whenReady));
      });
    });

  let observer: IntersectionObserver | undefined;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const image = entry.target as HTMLImageElement;
          load(image);
          observer?.unobserve(image);
        });
      },
      { rootMargin: '100% 0px' },
    );
    deferred.forEach((element) => observer?.observe(element));
  } else {
    deferred.forEach(load);
  }

  document.documentElement.dataset.assets = 'production';

  return () => {
    active = false;
    observer?.disconnect();
  };
}
