import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBloomChapter(): () => void {
  const chapter = document.querySelector<HTMLElement>('[data-scene="bloom"]');
  if (!chapter) return () => undefined;

  const bud = chapter.querySelector<HTMLElement>('[data-bloom-plate="bud"]');
  const reflection = chapter.querySelector<HTMLElement>('[data-bloom-plate="reflection"]');
  const open = chapter.querySelector<HTMLElement>('[data-bloom-plate="open"]');
  const ripple = chapter.querySelector<HTMLElement>('[data-bloom-ripple]');
  const copy = chapter.querySelector<HTMLElement>('.lotus-chapter__copy');

  const context = gsap.context(() => {
    gsap.set([reflection, open, ripple], { opacity: 0 });
    gsap.set(bud, { opacity: 1, scale: 1 });

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: chapter,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(bud, { scale: 1.035, duration: 0.34 }, 0)
      .to(bud, { opacity: 0, duration: 0.2 }, 0.18)
      .to(reflection, { opacity: 1, scale: 1.025, duration: 0.28 }, 0.17)
      .to(ripple, { opacity: 0.58, scale: 1.04, duration: 0.42 }, 0.28)
      .to(copy, { y: -18, duration: 0.28 }, 0.28)
      .to(reflection, { opacity: 0, duration: 0.24 }, 0.66)
      .to(open, { opacity: 1, scale: 1.025, duration: 0.28 }, 0.64)
      .to(ripple, { opacity: 0, scale: 1.09, duration: 0.22 }, 0.7)
      .to(open, { scale: 1.055, duration: 0.22 }, 0.78);
  }, chapter);

  return () => context.revert();
}
