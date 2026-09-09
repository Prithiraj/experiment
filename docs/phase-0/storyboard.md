# Phase 0A — Art direction and storyboard

## Creative thesis

**The flowers escape the website.**

The page starts with recognizable editorial-commerce structure. Scroll progressively weakens gravity until petals, words, and product cards behave like independent objects in a suspended botanical installation. The experience reaches a short gravitational collapse, then resolves into a calm shop.

The story is deliberately asymmetric:

`order → release → weightlessness → orbit → axis break → collapse → arrangement`

## Visual system

### Palette

| Token | Value | Role |
| --- | --- | --- |
| Forest 950 | `#102B24` | primary dark field, footer, depth |
| Forest 800 | `#214A3C` | secondary botanical surface |
| Cream 050 | `#FFF9F1` | main canvas |
| Cream 100 | `#F4E9DA` | paper/card surface |
| Fuchsia 500 | `#E93673` | primary action / vivid floral accent |
| Coral 500 | `#FF6F5E` | energetic transition accent |
| Tangerine 400 | `#F6A23A` | warm flower highlight |
| Lavender 300 | `#C8A7E8` | depth / secondary bloom |
| Gold 400 | `#C99B57` | restrained premium accent |
| Ink 950 | `#16201D` | body type |

### Typography roles

- **Display:** high-contrast editorial serif; very large, tightly composed, allowed to overlap imagery.
- **UI:** neutral sans-serif; predictable, compact, excellent at small sizes.
- **Accent:** handwritten/italic treatment only for emotional notes and tiny interruptions.

The prototype should rely on system-safe fallbacks first; custom webfont loading can be added only after motion/performance is stable.

### Shape language

- soft paper cards with 24–40px radii;
- large irregular botanical blobs behind hero elements;
- elliptical orbit paths;
- occasional torn-paper labels;
- no heavy glassmorphism over critical commerce text.

## Scene storyboard

### Scene 0 — Entry / gravity intact

**Viewport:** 0–100vh

The visitor sees a stable navigation, giant statement, and composed bouquet. Everything feels editorial but physically plausible.

Key message: **FLOWERS WERE NEVER MEANT TO STAY STILL.**

Scroll cue: **Release gravity**.

### Scene 1 — Release gravity

**Approx. scroll budget:** 180vh

- hero remains pinned;
- flower layers detach at different rates;
- selected headline glyphs move off baseline;
- petals drift upward and diagonally;
- background shape scales slightly to imply depth;
- navigation stays stable.

Narrative job: teach the visitor that scroll no longer means only vertical movement.

### Scene 2 — Zero-G botanical field

**Approx. scroll budget:** 220vh

- independent botanical actors cross the viewport;
- foreground actors travel farther and rotate faster;
- labels/words briefly pin while objects move behind them;
- opposing x/y movement prevents the page from feeling like ordinary parallax.

Narrative job: full weightlessness.

### Scene 3 — Orbital collection

**Approx. scroll budget:** 240vh

- 4–6 product cards occupy an elliptical orbit;
- visual depth is communicated through scale, opacity, and z-index;
- the current/front card is legible and actionable;
- keyboard focus order remains logical and independent of visual position.

Narrative job: introduce actual products without ending the spectacle.

### Scene 4 — Axis break

**Approx. scroll budget:** 220vh

Vertical scroll drives a horizontal world. The overall composition tilts only a few degrees.

Oversized words pass through several depth planes:

`NOT → JUST → A → BOUQUET`

Narrative job: the page itself appears to stop obeying gravity.

### Scene 5 — Vortex

**Approx. scroll budget:** 150vh

- a small luminous bloom becomes the focal point;
- nearby actors rotate toward it first;
- attraction accelerates non-linearly;
- elements converge without being removed from the DOM;
- the final 10–15% resolves to cream/white.

Narrative job: climax and reset.

### Scene 6 — Gravity returns

**Approx. scroll budget:** 120vh transition + normal flow

A stem grows from the reset field, becomes a bouquet, then resolves into a conventional product grid.

Narrative job: **chaos becomes arrangement**.

From here, shopping behavior is calm and predictable.

## Desktop / tablet / mobile intent

### Desktop

Full choreography. Highest actor count, complete orbit and horizontal track.

### Tablet

60–70% of decorative actors, shorter pin durations, reduced depth range.

### Mobile

30–40% of decorative actors. Orbit becomes a shallow arc/carousel, axis-break tilt is removed, vortex actor count is reduced, commerce arrives sooner.

## Non-negotiable experience rules

1. Native scrolling always remains possible.
2. Scroll direction reversal must visually reverse every deterministic scene.
3. No important content is available only while an animation is at a precise progress value.
4. Navigation never participates in the vortex.
5. The final shopping zone must not inherit transform state from storytelling scenes.
6. Reduced-motion mode should look intentionally designed, not like a broken animation was disabled.
