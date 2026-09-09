import { initReleaseHero } from './hero';
import { initHorizontalWorld } from './horizontal';
import { initOrbitGallery } from './orbit';
import { initGravityReturn } from './return';
import { bindMotionEnvironment, type MotionProfile } from './runtime';
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

function runCleanups(cleanups: Cleanup[]): void {
  [...cleanups].reverse().forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      console.warn('[Zero-G Bloom] Scene cleanup failed.', error);
    }
  });
}

export function initMotionSystem(): Cleanup {
  let sceneCleanups: Cleanup[] = [];

  const clearScenes = () => {
    runCleanups(sceneCleanups);
    sceneCleanups = [];
  };

  const mountScenes = (profile: MotionProfile) => {
    clearScenes();
    document.documentElement.dataset.motionState = profile === 'reduced' ? 'static' : 'mounting';
    if (profile === 'reduced') return;

    const mounted: Cleanup[] = [];

    try {
      for (const scene of scenes) {
        mounted.push(scene.init());
      }
      sceneCleanups = mounted;
      document.documentElement.dataset.motionState = 'ready';
    } catch (error) {
      console.error('[Zero-G Bloom] Motion initialization failed; using static fallback.', error);
      runCleanups(mounted);
      sceneCleanups = [];
      document.documentElement.dataset.motionState = 'fallback';
    }
  };

  const unbindEnvironment = bindMotionEnvironment(mountScenes);

  return () => {
    clearScenes();
    unbindEnvironment();
    document.documentElement.dataset.motionState = 'static';
  };
}
