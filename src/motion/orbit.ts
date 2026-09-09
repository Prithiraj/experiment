import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { currentLayoutBand, lerp } from './runtime';

gsap.registerPlugin(ScrollTrigger);

interface OrbitState {
  progress: number;
  settledIndex: number | null;
}

function renderOrbit(cards: HTMLElement[], state: OrbitState): void {
  const count = cards.length;
  const compact = currentLayoutBand() !== 'desktop';
  const radiusX = Math.min(window.innerWidth * (compact ? 0.33 : 0.38), compact ? 320 : 470);
  const radiusY = Math.min(window.innerHeight * (compact ? 0.18 : 0.24), compact ? 150 : 220);

  cards.forEach((card, index) => {
    if (state.settledIndex === index) {
      gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 34, scale: 1.08, opacity: 1, zIndex: 500 });
      return;
    }

    const theta = state.progress * Math.PI * 2 + (index / count) * Math.PI * 2 - Math.PI / 2;
    const depth = (Math.sin(theta) + 1) / 2;
    const x = Math.cos(theta) * radiusX;
    const y = Math.sin(theta) * radiusY + 60;

    gsap.set(card, {
      xPercent: -50,
      yPercent: -50,
      x,
      y,
      scale: lerp(0.76, 1.08, depth),
      opacity: lerp(0.54, 1, depth),
      zIndex: 20 + Math.round(depth * 100),
      '--orbit-depth': depth,
    });
  });
}

export function initOrbitGallery(): () => void {
  const scene = document.querySelector<HTMLElement>('[data-scene="orbit"]');
  const stage = scene?.querySelector<HTMLElement>('[data-orbit-stage]');
  if (!scene || !stage) return () => undefined;

  const cards = gsap.utils.toArray<HTMLElement>('[data-orbit-card]', stage);
  if (cards.length === 0) return () => undefined;

  if (currentLayoutBand() === 'mobile') {
    const context = gsap.context(() => {
      gsap.from(cards, {
        y: 34,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: stage, start: 'top 82%' },
      });
    }, scene);
    return () => context.revert();
  }

  const state: OrbitState = { progress: 0, settledIndex: null };
  const settleTimers = new Map<HTMLElement, number>();
  const context = gsap.context(() => {
    gsap.set(cards, { position: 'absolute', left: '50%', top: '52%', willChange: 'transform, opacity' });
    renderOrbit(cards, state);

    ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        state.progress = self.progress;
        renderOrbit(cards, state);
      },
      onRefresh: (self) => {
        state.progress = self.progress;
        renderOrbit(cards, state);
      },
    });
  }, scene);

  const clearSettledCard = (card: HTMLElement) => {
    const timer = settleTimers.get(card);
    if (timer !== undefined) window.clearTimeout(timer);
    settleTimers.delete(card);
    card.classList.remove('is-settled');
  };

  const settle = (card: HTMLElement, index: number) => {
    const previousIndex = state.settledIndex;
    if (previousIndex !== null && previousIndex !== index) {
      const previousCard = cards[previousIndex];
      if (previousCard) clearSettledCard(previousCard);
    }
    clearSettledCard(card);

    state.settledIndex = index;
    card.classList.add('is-settled');
    renderOrbit(cards, state);

    const timer = window.setTimeout(() => {
      clearSettledCard(card);
      if (state.settledIndex === index) state.settledIndex = null;
      renderOrbit(cards, state);
    }, 950);
    settleTimers.set(card, timer);
  };

  const handlers = cards.map((card, index) => {
    const button = card.querySelector<HTMLButtonElement>('[data-add-to-cart]');
    const onClick = () => settle(card, index);
    const onFocus = () => card.classList.add('has-focus');
    const onBlur = () => card.classList.remove('has-focus');
    button?.addEventListener('click', onClick);
    card.addEventListener('focusin', onFocus);
    card.addEventListener('focusout', onBlur);
    return { card, button, onClick, onFocus, onBlur };
  });

  return () => {
    settleTimers.forEach((timer) => window.clearTimeout(timer));
    settleTimers.clear();
    handlers.forEach(({ card, button, onClick, onFocus, onBlur }) => {
      button?.removeEventListener('click', onClick);
      card.removeEventListener('focusin', onFocus);
      card.removeEventListener('focusout', onBlur);
      card.classList.remove('is-settled', 'has-focus');
    });
    context.revert();
  };
}
