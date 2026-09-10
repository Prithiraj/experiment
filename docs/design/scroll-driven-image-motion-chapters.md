# Scroll-Driven Photographic Motion Chapters

## Core design principle

Every section should transform an image, not merely display one.

Scroll can become time, depth, force, focus, gravity, or camera movement depending on the chapter. The visual system should avoid repeating the same parallax pattern across sections; each chapter needs its own physical law.

---

## Chapter 1 — Lotus bloom

The lotus is the first production-quality photographic case study because its natural transformation maps directly to scroll:

| Scroll | Visual state | Motion logic |
| --- | --- | --- |
| 0–15% | Emergence | Stem rises from water; real flower strengthens while reflection softens. |
| 15–35% | Outer petals unlock | Large petals hinge from their attachment points. |
| 35–55% | Inner petals unfold | Rear, side, middle, then inner layers open in staggered order. |
| 55–70% | Full bloom | Flower reaches its visual peak; center sharpens, light warms, typography intensifies. |
| 70–82% | Gravity breaks | A few petals detach and rise instead of falling. |
| 82–100% | Petal wipe | One foreground petal scales until it fills the viewport and hands off to the next scene. |

### Lotus asset plan

The lotus should be a layered photographic object rather than one flat image:

```text
lotus/
  water-background.avif
  reflection.avif
  stem.webp
  bud-base.webp
  sepals.webp
  outer-petal-left.webp
  outer-petal-right.webp
  outer-back-petals.webp
  middle-petals.webp
  inner-petals.webp
  center.webp
  pollen.webp
  loose-petal-01.webp
  loose-petal-02.webp
  ripple-overlay.webp
```

Approximately 15–20 carefully prepared assets should be enough for the first convincing prototype.

### Petal hinge physics

Petals should not simply slide sideways. Their transform origin belongs close to the physical attachment point.

```text
transform-origin: 50% 92%

outer petal:
  rotateZ: -24deg
  rotateX: -18deg
  y: +12px
```

The bloom should feel biologically plausible before the design intentionally breaks natural physics.

### Full-bloom composition

At full bloom:

- the flower center sharpens;
- warm light rises behind the petal layers;
- the background shifts from deep forest tones toward dawn/cream;
- oversized typography appears behind the lotus;
- selected petals overlap letterforms;
- the flower scales only slightly so the effect remains believable.

### Gravity break and transition

After the bloom reaches completion, only a few petals detach. They rise rather than fall, signaling the transition into Zero-G physics.

A single foreground petal then approaches the camera, scales beyond the viewport, and becomes the transition surface into Chapter 2. This is preferable to a conventional fade because the visual object itself carries the visitor into the next scene.

---

## Chapter sequence

| Chapter | Primary image | Motion vocabulary | Scroll metaphor |
| --- | --- | --- | --- |
| 01 — Bloom | Closed lotus → full flower | Hinged petal opening | Time passing |
| 02 — Water | Lotus leaves + reflections | Ripple / lateral drift | Crossing water |
| 03 — Petal field | Detached photographic petals | Depth / parallax | Moving through air |
| 04 — Garden walls | Editorial floral photography | Mask reveals | Passing botanical curtains |
| 05 — Macro world | Extreme close-up petals | Scale / focus-plane shifts | Entering a flower |
| 06 — Orbit | Real bouquet cutouts | Elliptical orbit | Weightless product gallery |
| 07 — Floral convergence | Several arrangements | Attraction / overlap | Gravity returning |
| 08 — Shop | Product photography | Minimal stable motion | Commerce and clarity |

---

## Chapter 2 — Water as the motion system

After the petal wipe, reveal a wide photographic lotus-water scene.

The viewport can pin while different depth layers travel laterally at different rates:

```text
foreground leaf  → 500 px
mid leaf         → 260 px
background leaf  → 100 px
reflection       → 180 px
```

Typography can be revealed or sharpened as a ripple crosses it. This can be achieved using layered masks/duplicates before considering a shader.

---

## Chapter 3 — Three-dimensional petal field

The petals released from the lotus persist into the next scene.

Each photographic petal receives its own:

- x travel;
- y travel;
- rotation;
- scale;
- opacity;
- depth profile.

The movement should disagree about gravity: one petal drifts toward the upper right, another moves downward, another grows toward the camera, while another barely moves.

This maps directly onto the existing Zero-G actor architecture; transparent photographic assets replace the CSS-generated shapes.

---

## Chapter 4 — Botanical mask reveals

Change the motion vocabulary completely.

Flower and leaf silhouettes become masks through which editorial photography appears. A bud can expand into a flower-shaped window and eventually expose a complete wedding, bouquet, or flower-market photograph.

SVG masks and clip paths prevent the photography from becoming a conventional stack of rectangular cards.

---

## Chapter 5 — Macro photography

The design changes scale radically.

A petal can fill most of the viewport while layered sharp/soft imagery simulates a moving focus plane:

```text
macro sharp petal
foreground soft edge
pollen layer
background soft petal
```

Scroll changes position, scale, and visual emphasis. Tiny editorial typography against enormous botanical texture creates contrast without requiring large amounts of motion.

### Macro → product transformation

The camera gradually pulls back:

```text
macro petal
   ↓
whole flower
   ↓
bouquet
   ↓
product card

ART → PRODUCT
```

The visual storytelling therefore enters commerce naturally rather than abruptly switching to a product grid.

---

## Chapter 6 — Orbital product photography

Use isolated photography of real bouquets with the existing orbital math.

Front-facing arrangements become:

- larger;
- sharper;
- higher contrast.

Rear arrangements become:

- smaller;
- visually quieter;
- optionally slightly softer.

When a bouquet is selected, gravity temporarily returns: the orbit pauses and the chosen product settles into a stable position with price and CTA.

---

## Chapter 7 — Floral convergence

Several bouquet photographs occupy different regions of the viewport and slowly drift toward one shared center.

This is less violent than a black-hole vortex. The bouquets overlap until they form one controlled floral mass, which then resolves into the normal collection layout.

Narrative meaning: **arrangement is controlled chaos.**

---

## Reusable image-motion patterns

### Object continuity

A lotus petal can persist through multiple chapters:

```text
lotus petal
  ↓
floating petal
  ↓
foreground wipe
  ↓
macro texture
  ↓
product detail
  ↓
vortex / convergence actor
```

### Image handoff

An image in one scene ends at the exact screen position where a matching image in the next scene begins. Scene ownership changes, but the visitor perceives one continuous object.

### Growth beyond image edges

A stem begins inside a photograph, grows outside its rectangular boundary, and becomes a free-standing element in the page.

### Torn photography

Prepare multiple vertical/horizontal crops from one photo. They initially reconstruct the full image, then separate during scroll while flowers appear in the gaps.

### Reflection becomes real

A reflected bouquet detaches from the reflective surface, flips, and resolves into a second product or image.

### 2.5D depth stack

Split one editorial composition into foreground flowers, subject/model, and background garden. Scroll separates the layers at different rates and can eventually hand each layer into the next scene.

### Typography invasion

Flowers and stems grow through or across oversized letterforms using simple z-order layering.

### Focus-plane transition

Instead of moving everything, shift attention between foreground, subject, and background by changing sharpness and prominence.

---

## Continuous-object principle

Avoid this:

```text
section → section → section → section
```

Prefer this:

```text
scene → transforms → becomes next scene
      → transforms → becomes next scene
```

This is one of the main differences between an ordinary animated website and an authored visual experience.

---

## Rhythm

Not every scene should be loud.

```text
HUGE EVENT
lotus blooms

QUIET
water drift

ENERGY
petal field

QUIET
masked photography

INTIMATE
macro flower

ENERGY
orbiting collection

CLIMAX
floral convergence

CALM
shopping
```

Quiet sections create contrast. If every chapter contains maximum motion, the visitor adapts and the dramatic moments lose impact.

---

## Three implementation routes for the lotus

### 1. Layered photographic lotus — recommended

Strengths:

- interactive;
- reversible with scroll;
- GSAP-friendly;
- mobile-adaptable;
- relatively small number of assets;
- fits the current architecture.

Tradeoff: requires careful photography/retouching and petal isolation.

### 2. Pre-rendered frame sequence

A bloom is represented by perhaps 80–150 frames and scroll chooses the current frame.

Strength: highly realistic state change.

Tradeoff: significantly heavier image payload and preload complexity.

### 3. WebGL / 3D lotus

Strength: true camera depth and petal deformation.

Tradeoff: highest complexity and unnecessary unless the lotus must rotate/deform in ways that layered photography cannot convincingly reproduce.

---

## Recommended first photographic experiment

Before converting the whole site, build one production-quality **Lotus Chapter** using roughly 15–20 assets and the six-stage bloom timeline.

It should answer:

1. Does photographic layering look convincing?
2. How much retouching/isolation work is required?
3. What are the network and decoded-memory costs?
4. How well does it perform on mobile?
5. Do the petal hinge motions feel natural?
6. How far can DOM + GSAP go before WebGL adds meaningful value?

If this one scene feels exceptional at good frame rates, it establishes the visual grammar for the entire photographic version of Zero-G Bloom.

## Final principle

> Every section should transform an image, not merely display one.

The lotus blooms. The water ripples. Petals escape. A photograph tears open. A macro flower becomes a bouquet. The bouquet begins to orbit. Bouquets converge. Then gravity returns and the photography stops performing so the customer can shop.
