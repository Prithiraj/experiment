import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { attractionVector, type Point } from './gravity';

gsap.registerPlugin(ScrollTrigger);

function cssPosition(element: HTMLElement, centeredByTransform: boolean): Point {
  const style = window.getComputedStyle(element);
  const left = Number.parseFloat(style.left) || element.offsetLeft;
  const top = Number.parseFloat(style.top) || element.offsetTop;

  if (centeredByTransform) return { x: left, y: top };
  return { x: left + element.offsetWidth / 2, y: top + element.offsetHeight / 2 };
}

export function initVortex(): () => void {
  const scene = document.querySelector<HTMLElement>('[data-scene="vortex"]');
  const stage = scene?.querySelector<HTMLElement>('[data-vortex-stage]');
  const core = scene?.querySelector<HTMLElement>('.vortex-core');
  if (!scene || !stage || !core) return () => undefined;

  const actors = gsap.utils.toArray<HTMLElement>('[data-vortex-actor]', stage);
  const vectorFor = (actor: HTMLElement) => {
    const actorPoint = cssPosition(actor, actor.classList.contains('bloom'));
    const corePoint = cssPosition(core, true);
    return attractionVector(actorPoint, corePoint);
  };

  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
        scrub: 0.65,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.set(actors, { willChange: 'transform, opacity' });
    timeline
      .to('.vortex-copy', { y: -26, scale: 0.96, opacity: 0.35, duration: 0.55, ease: 'power2.in' }, 0.04)
      .to(core, { scale: 1.35, rotation: 35, boxShadow: '0 0 150px rgba(255,249,241,.7)', duration: 0.58, ease: 'power2.in' }, 0.08);

    actors.forEach((actor, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      timeline
        .to(actor, {
          x: () => vectorFor(actor).x * 0.28,
          y: () => vectorFor(actor).y * 0.28,
          rotation: `+=${direction * 28}`,
          scale: 0.92,
          duration: 0.34,
          ease: 'power1.in',
        }, 0.12 + index * 0.018)
        .to(actor, {
          x: () => vectorFor(actor).x,
          y: () => vectorFor(actor).y,
          rotation: `+=${direction * 150}`,
          scale: 0.08,
          opacity: 0,
          duration: 0.48,
          ease: 'power3.in',
        }, 0.42 + index * 0.018);
    });

    timeline
      .to(core, { scale: 0.05, rotation: 240, duration: 0.24, ease: 'power3.in' }, 0.72)
      .to(scene, { backgroundColor: '#fff9f1', color: '#102b24', duration: 0.18, ease: 'none' }, 0.82)
      .to(core, { opacity: 0, duration: 0.12, ease: 'none' }, 0.84);
  }, scene);

  return () => context.revert();
}
