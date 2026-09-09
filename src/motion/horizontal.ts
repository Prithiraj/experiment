import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHorizontalWorld(): () => void {
  const scene = document.querySelector<HTMLElement>('[data-scene="horizontal"]');
  const track = scene?.querySelector<HTMLElement>('[data-axis-track]');
  if (!scene || !track) return () => undefined;

  const panels = gsap.utils.toArray<HTMLElement>('.axis-panel', track);
  const flowers = gsap.utils.toArray<HTMLElement>('.axis-flower', track);

  if (window.innerWidth < 640) {
    const context = gsap.context(() => {
      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll('b, strong, span'), {
          y: 45,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: panel, start: 'top 78%' },
        });
      });
    }, scene);
    return () => context.revert();
  }

  const context = gsap.context(() => {
    const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
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

    timeline.to(track, { x: () => -travel(), duration: 1 }, 0);

    flowers.forEach((flower, index) => {
      timeline.fromTo(
        flower,
        { x: index % 2 === 0 ? -80 : 90, rotation: index % 2 === 0 ? -8 : 9, scale: 0.86 },
        { x: index % 2 === 0 ? 130 : -120, rotation: index % 2 === 0 ? 12 : -14, scale: 1.12, duration: 0.7 },
        index * 0.08,
      );
    });
  }, scene);

  return () => context.revert();
}
