import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGravityReturn(): () => void {
  const scene = document.querySelector<HTMLElement>('[data-scene="return"]');
  if (!scene) return () => undefined;

  const context = gsap.context(() => {
    const stem = scene.querySelector<HTMLElement>('.return-stem');
    const bloom = scene.querySelector<HTMLElement>('.return-bloom');
    const cards = gsap.utils.toArray<HTMLElement>('.shop-card', scene);

    gsap.set(stem, { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set(bloom, { scale: 0.08, opacity: 0, rotation: -26 });
    gsap.set(cards, { y: 38, opacity: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top 82%',
        end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
        scrub: 0.62,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(stem, { scaleY: 1, duration: 0.34, ease: 'power2.out' }, 0)
      .to(bloom, { scale: 1, opacity: 1, rotation: 0, duration: 0.34, ease: 'power2.out' }, 0.18)
      .from('.shop-heading .eyebrow', { y: 12, opacity: 0, duration: 0.2, ease: 'power2.out' }, 0.34)
      .from('.shop-heading h2, .shop-heading > p', { y: 24, opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' }, 0.39)
      .to(cards, { y: 0, opacity: 1, stagger: 0.055, duration: 0.36, ease: 'power2.out' }, 0.52);
  }, scene);

  return () => context.revert();
}
