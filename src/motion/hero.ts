import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlyphSplit {
  glyphs: HTMLElement[];
  restore: () => void;
}

function splitHeroGlyphs(line: HTMLElement): GlyphSplit {
  const originalText = line.textContent ?? '';
  line.textContent = '';
  line.dataset.split = 'true';
  line.setAttribute('aria-hidden', 'true');

  const glyphs = Array.from(originalText).map((character, index) => {
    const glyph = document.createElement('span');
    glyph.className = 'hero-glyph';
    glyph.dataset.glyphIndex = String(index);
    glyph.textContent = character === ' ' ? '\u00a0' : character;
    line.append(glyph);
    return glyph;
  });

  return {
    glyphs,
    restore: () => {
      line.textContent = originalText;
      delete line.dataset.split;
      line.removeAttribute('aria-hidden');
    },
  };
}

export function initReleaseHero(): () => void {
  const hero = document.querySelector<HTMLElement>('[data-scene="release"]');
  if (!hero) return () => undefined;

  const bouquet = hero.querySelector<HTMLElement>('[data-bouquet]');
  const actors = gsap.utils.toArray<HTMLElement>('[data-release-actor]', hero);
  const accentLine = hero.querySelector<HTMLElement>('.hero-line--accent');
  const split = accentLine ? splitHeroGlyphs(accentLine) : null;
  const glyphs = split?.glyphs ?? [];

  const context = gsap.context(() => {
    gsap.set([...actors, ...glyphs], { willChange: 'transform' });

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
        scrub: 0.65,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to('.hero-backdrop', { scale: 1.06, transformOrigin: '70% 35%', duration: 1 }, 0)
      .to('.hero-copy .eyebrow', { y: -20, opacity: 0.38, duration: 0.45 }, 0.08)
      .to('.hero-intro, .hero-actions', { y: 36, opacity: 0, duration: 0.48 }, 0.18)
      .to('.scroll-cue', { y: 24, opacity: 0, duration: 0.28 }, 0.02);

    actors.forEach((actor, index) => {
      const band = index % 4;
      const x = [-150, 120, -70, 180][band] ?? 0;
      const y = [-220, -120, 150, -280][band] ?? -120;
      const rotation = [-14, 11, 8, -18][band] ?? 0;
      const depth = 0.92 + ((index % 3) * 0.1);

      timeline.to(
        actor,
        { x, y, rotation: `+=${rotation}`, scale: depth, duration: 0.78 },
        0.16 + (index % 5) * 0.025,
      );
    });

    glyphs.forEach((glyph, index) => {
      if (index % 2 === 1) return;
      const direction = index % 4 === 0 ? -1 : 1;
      timeline.to(
        glyph,
        {
          x: direction * (18 + index * 2.5),
          y: -34 - (index % 5) * 12,
          rotation: direction * (3 + index * 0.7),
          duration: 0.55,
        },
        0.3 + index * 0.008,
      );
    });
  }, hero);

  const onPointerMove = (event: PointerEvent) => {
    if (!bouquet || event.pointerType === 'touch') return;
    const nx = event.clientX / window.innerWidth - 0.5;
    const ny = event.clientY / window.innerHeight - 0.5;
    gsap.to(bouquet, { x: nx * 20, y: ny * 16, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
  };

  const onPointerLeave = () => {
    if (bouquet) gsap.to(bouquet, { x: 0, y: 0, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
  };

  hero.addEventListener('pointermove', onPointerMove);
  hero.addEventListener('pointerleave', onPointerLeave);

  return () => {
    hero.removeEventListener('pointermove', onPointerMove);
    hero.removeEventListener('pointerleave', onPointerLeave);
    context.revert();
    split?.restore();
  };
}
