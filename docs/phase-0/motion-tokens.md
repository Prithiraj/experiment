# Phase 0B — Motion language and tokens

These values are design constraints, not sacred constants. They provide a common vocabulary so scene code does not become a pile of unrelated magic numbers.

## Normalized progress

Every scroll-driven scene exposes normalized progress `p` in `[0, 1]`.

Scene-specific values are derived from `p` and should remain deterministic. Pointer input may add subtle offsets but must never be required for the primary choreography.

## Motion vocabulary

### Drift

Slow translation with no implication of falling.

- x travel: `40–180px`
- y travel: `20–120px`
- rotation: `-8deg…8deg`
- preferred ease: `none` for scroll mapping

### Float

Predominantly upward movement with mild horizontal displacement.

- y travel: `-80…-360px`
- x travel: `-80…80px`
- rotation: `-14deg…14deg`

### Orbit

Position around an elliptical center.

```text
x = cx + cos(theta) * radiusX
y = cy + sin(theta) * radiusY
```

- desktop radiusX: `30–38vw`
- desktop radiusY: `18–25vh`
- tablet radius multiplier: `0.72`
- mobile: replace full orbit with shallow arc

### Depth

Depth is simulated primarily with scale + opacity, optionally a small blur for non-text decorative objects.

| Layer | Scale | Opacity | Travel multiplier |
| --- | ---: | ---: | ---: |
| far | 0.72–0.84 | 0.45–0.70 | 0.45 |
| mid | 0.88–1.00 | 0.70–0.92 | 0.75 |
| near | 1.02–1.18 | 0.90–1.00 | 1.00 |
| foreground | 1.20–1.45 | 1.00 | 1.35 |

Avoid blur on critical text and CTAs.

### Attraction

Actors accelerate toward a focal point.

Given actor origin `(x0, y0)` and focal point `(fx, fy)`:

```text
dx = fx - x0
dy = fy - y0
strength = easeInCubic(p)
x = x0 + dx * strength
y = y0 + dy * strength
```

Clamp scale and rotation. The vortex should never require removing actors, so reverse scrolling remains possible.

### Release

A composed element separates into independently addressable layers.

Release begins slowly (`p < 0.2`) and becomes obvious through the middle of the timeline. Do not send all layers in different directions at once; use 3–4 coherent vectors.

## Scene tokens

```ts
export const motion = {
  duration: {
    micro: 0.18,
    ui: 0.28,
    reveal: 0.6,
    settle: 0.9,
  },
  rotation: {
    whisper: 3,
    drift: 8,
    expressive: 16,
    axisBreak: 5,
  },
  scale: {
    far: 0.78,
    mid: 0.92,
    near: 1.08,
    foreground: 1.32,
  },
  actors: {
    desktop: 24,
    tablet: 14,
    mobile: 8,
  },
  scroll: {
    release: 1.8,
    field: 2.2,
    orbit: 2.4,
    horizontal: 2.2,
    vortex: 1.5,
    return: 1.2,
  },
};
```

Scroll values are multiples of viewport height rather than hardcoded pixels.

## Easing rules

- direct scroll mapping: linear (`none`);
- release/settle emphasis: `power2.inOut`;
- attraction: `power3.in`;
- micro-interactions: `power2.out`;
- avoid elastic/bounce easing for large spatial movement.

## Pointer input

Pointer movement is a secondary signal only.

Recommended maximum desktop influence:

- hero bouquet: `±10px` x/y;
- foreground petal: `±18px` x/y;
- product card tilt: `±2deg`;
- disable or dramatically reduce on touch devices.

## Reduced-motion contract

When `prefers-reduced-motion: reduce` is active:

- no pinned storytelling sections;
- no continuous drift/orbit/vortex;
- actors render in intentional static compositions;
- horizontal scene becomes normal stacked content;
- product cards use standard grid/carousel layouts;
- tiny hover/focus opacity/color transitions may remain under ~200ms.

## Performance budget

- animate `transform` and `opacity` by default;
- no per-frame layout reads after scene initialization;
- maximum 24 decorative actors desktop, 14 tablet, 8 mobile in any single heavy scene;
- never animate large-area `filter: blur()` continuously;
- avoid simultaneous `box-shadow`, blur, and scale animation on many cards;
- pause non-scroll ambient motion while the document is hidden.

## Acceptance test for any new motion

Before adding a new effect, answer:

1. Which named behavior does it use: drift, float, orbit, depth, attraction, or release?
2. What story purpose does it serve?
3. What is its reduced-motion representation?
4. Can the effect reverse cleanly?
5. Can it run with transforms/opacity only?

If these answers are unclear, the effect does not belong in the build yet.
