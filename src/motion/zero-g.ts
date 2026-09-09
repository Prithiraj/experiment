import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { parseDepth, zeroGProfile } from './actors';
import { actorBudget } from './runtime';

gsap.registerPlugin(ScrollTrigger);

export function initZeroGField(): () => void {
  const scene = document.querySelector<HTMLElement>('[data-scene="field"]');
  if (!scene) return () => undefined;

  const actors = gsap.utils.toArray<HTMLElement>('[data-zero-actor]', scene);
  const budget = actorBudget();

  actors.forEach((actor, index) => {
    actor.hidden = index >= budget;
  });

  const visibleActors = actors.filter((actor) => !actor.hidden);

  const context = gsap.context(() => {
    gsap.set(visibleActors, { willChange: 'transform, opacity' });

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
        scrub: 0.72,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .fromTo('.scene-heading', { y: 0, opacity: 1 }, { y: -34, opacity: 0.42, duration: 0.8 }, 0.08)
      .to('.field-word--one', { xPercent: 12, duration: 1 }, 0)
      .to('.field-word--two', { xPercent: -14, duration: 1 }, 0);

    visibleActors.forEach((actor, index) => {
      const depth = parseDepth(actor.dataset.depth);
      const profile = zeroGProfile(index, depth);
      const startX = index % 2 === 0 ? -profile.x * 0.2 : profile.x * 0.12;
      const startY = index % 3 === 0 ? profile.y * 0.12 : -profile.y * 0.08;

      timeline.fromTo(
        actor,
        { x: startX, y: startY, rotation: -profile.rotation * 0.18, scale: Math.max(0.7, profile.scale - 0.12), opacity: Math.max(0.35, profile.opacity - 0.18) },
        { x: profile.x, y: profile.y, rotation: profile.rotation, scale: profile.scale, opacity: profile.opacity, duration: 1 },
        index * 0.018,
      );
    });
  }, scene);

  return () => {
    context.revert();
    actors.forEach((actor) => {
      actor.hidden = false;
    });
  };
}
