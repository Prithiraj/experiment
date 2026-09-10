import lotusBloom from '../assets/production/lotus/lotus-bloom-full.webp';
import lotusBud from '../assets/production/lotus/lotus-bud.webp';
import lotusLeaf from '../assets/production/lotus/lotus-leaf-foreground.webp';
import lotusWater from '../assets/production/water/lotus-water-plate.webp';
import petal01 from '../assets/production/petal-field/lotus-petal-floating-01.webp';
import petal02 from '../assets/production/petal-field/lotus-petal-floating-02.webp';
import petal03 from '../assets/production/petal-field/lotus-petal-floating-03.webp';
import citrusOrbit from '../assets/production/orbit/orbit-citrus-orbit.webp';
import quietMoon from '../assets/production/orbit/orbit-quiet-moon.webp';
import violetNoise from '../assets/production/orbit/orbit-violet-noise.webp';
import wildSignal from '../assets/production/orbit/orbit-wild-signal.webp';

export const productionAssets = {
  lotusBloom,
  lotusBud,
  lotusLeaf,
  lotusWater,
  petal01,
  petal02,
  petal03,
  citrusOrbit,
  quietMoon,
  violetNoise,
  wildSignal,
} as const;

type ProductionAssetKey = keyof typeof productionAssets;

export function bindProductionAssets(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-production-image]').forEach((element) => {
    const key = element.dataset.productionImage as ProductionAssetKey | undefined;
    const source = key ? productionAssets[key] : undefined;
    if (!source || !(element instanceof HTMLImageElement)) return;

    element.src = source;
    element.decoding = 'async';
    element.draggable = false;
    if (!element.hasAttribute('alt')) element.alt = '';
  });

  document.documentElement.dataset.assets = 'production';
}
