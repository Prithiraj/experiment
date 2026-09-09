import { initReleaseHero } from './hero';
import { initHorizontalWorld } from './horizontal';
import { initOrbitGallery } from './orbit';
import { bindMotionPreference, type MotionProfile } from './runtime';
import { initZeroGField } from './zero-g';

type Cleanup = () => void;

export function initMotionSystem(): Cleanup {
  let sceneCleanups: Cleanup[] = [];

  const clearScenes = () => {
    sceneCleanups.forEach((cleanup) => cleanup());
    sceneCleanups = [];
  };

  const mountScenes = (profile: MotionProfile) => {
    clearScenes();
    if (profile === 'reduced') return;

    sceneCleanups = [
      initReleaseHero(),
      initZeroGField(),
      initOrbitGallery(),
      initHorizontalWorld(),
    ];
  };

  const unbindPreference = bindMotionPreference(mountScenes);

  return () => {
    clearScenes();
    unbindPreference();
  };
}
