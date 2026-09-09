import { initReleaseHero } from './hero';
import { initHorizontalWorld } from './horizontal';
import { initOrbitGallery } from './orbit';
import { initGravityReturn } from './return';
import { bindMotionPreference, type MotionProfile } from './runtime';
import { initVortex } from './vortex';
import { initZeroGField } from './zero-g';

type Cleanup = () => void;
type SceneFactory = { name: string; init: () => Cleanup };

const scenes: SceneFactory[] = [
  { name: 'release', init: initReleaseHero },
  { name: 'field', init: initZeroGField },
  { name: 'orbit', init: initOrbitGallery },
  { name: 'horizontal', init: initHorizontalWorld },
  { name: 'vortex', init: initVortex },
  { name: 'return', init: initGravityReturn },
];

export function initMotionSystem(): Cleanup {
  let sceneCleanups: Cleanup[] = [];

  const clearScenes = () => {
    sceneCleanups.forEach((cleanup) => cleanup());
    sceneCleanups = [];
  };

  const mountScenes = (profile: MotionProfile) => {
    clearScenes();
    document.documentElement.dataset.motionState = profile === 'reduced' ? 'static' : 'mounting';
    if (profile === 'reduced') return;

    try {
      sceneCleanups = scenes.map(({ init }) => init());
      document.documentElement.dataset.motionState = 'ready';
    } catch (error) {
      console.error('[Zero-G Bloom] Motion initialization failed; using static fallback.', error);
      clearScenes();
      document.documentElement.dataset.motionState = 'fallback';
    }
  };

  const unbindPreference = bindMotionPreference(mountScenes);

  return () => {
    clearScenes();
    unbindPreference();
  };
}
