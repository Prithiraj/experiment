# Antigravity Florist — Phased Web Design Plan

## Product idea

Build an experimental florist storefront where scrolling progressively removes gravity from the page. Flowers, petals, typography, and product cards move according to different motion rules, eventually collapsing into a dramatic vortex before the experience resolves into a calm, highly usable shopping interface.

The goal is not animation for its own sake. The site should begin as an immersive digital-art experience and deliberately transition into a conventional commerce experience when the visitor is ready to browse and buy.

## Core experience principles

1. **Scroll is the input, not simply vertical movement.** Different objects may rise, orbit, rotate, pin, drift sideways, scale, or move toward/away from the viewer.
2. **Motion has narrative progression.** Gravity exists → weakens → disappears → becomes chaotic → collapses → returns.
3. **The shop remains usable.** Extreme animation belongs primarily in the storytelling portion. Product discovery, cart, and checkout must become calm and predictable.
4. **Performance is a feature.** Prefer transforms and opacity, minimize layout thrashing, lazy-load expensive media, and budget GPU-heavy effects.
5. **Reduced motion is first-class.** `prefers-reduced-motion` must provide a complete, attractive, stable experience.
6. **Mobile is designed, not merely scaled down.** Fewer simultaneous actors, shorter pinned scenes, simpler physics, and touch-friendly navigation.

---

# Phase 0 — Direction, constraints, and motion language

## Goal

Turn the visual concept into a small set of explicit rules before writing animation-heavy code.

## Work

- Define brand direction: editorial florist, vivid botanical photography, deep forest green, warm cream, fluorescent coral/fuchsia accents, restrained gold.
- Establish typography roles:
  - expressive editorial display serif;
  - neutral sans-serif for commerce/UI;
  - optional handwritten accent used sparingly.
- Define the motion vocabulary:
  - **drift** — slow x/y displacement;
  - **float** — upward movement with mild oscillation;
  - **orbit** — rotation around an invisible center;
  - **depth** — scale/blur/parallax to imply z-space;
  - **attraction** — elements accelerate toward a focal point;
  - **release** — elements separate from their original layout positions.
- Establish scene boundaries and approximate scroll lengths.
- Decide desktop/mobile simplifications before implementation.

## Deliverable

A static storyboard for all scenes and a small motion-token specification.

## Exit criteria

Every major visual element has a reason to move and a defined behavior. No animation should be described only as “make it cool.”

---

# Phase 1 — Technical foundation and static page

## Goal

Build the complete page without extreme animation first.

## Suggested stack

- Vite
- TypeScript
- semantic HTML
- CSS custom properties / modern CSS
- GSAP + ScrollTrigger for timeline orchestration
- Three.js only where true depth/3D materially improves the result

Avoid introducing a 3D renderer for effects that can be achieved cleanly with DOM transforms.

## Work

- Create semantic page structure.
- Build responsive layout and design tokens.
- Implement:
  - navigation;
  - hero;
  - featured arrangements;
  - services;
  - seasonal story section;
  - testimonials;
  - shop/product grid;
  - footer.
- Add image loading strategy and responsive assets.
- Add a small motion utility layer instead of scattering scroll math throughout components.
- Add reduced-motion detection.

## Deliverable

A polished static florist site that already works without JavaScript animation.

## Exit criteria

The page is responsive, readable, keyboard navigable, and visually complete before scroll choreography begins.

---

# Phase 2 — Scene 1: “Release Gravity” hero

## Goal

Make the first screen establish the central mechanic immediately.

## Experience

The visitor sees a dramatic bouquet and the headline:

> FLOWERS WERE NEVER MEANT TO STAY STILL

A scroll cue reads **Release Gravity**.

As the visitor starts scrolling:

- the hero pins in place;
- the bouquet begins to separate into layers;
- individual petals drift independently;
- selected headline characters detach from the baseline;
- background depth increases subtly;
- navigation remains stable so the experience still feels controlled.

## Implementation notes

- Treat bouquet layers as individually addressable DOM/image elements.
- Use a master scroll timeline rather than independent window-scroll listeners.
- Keep transforms deterministic based on scroll progress.
- Use pointer movement only as a subtle secondary input.

## Exit criteria

The first scene feels surprising but remains smooth on a normal laptop and does not create layout jumps.

---

# Phase 3 — Scene 2: zero-gravity botanical field

## Goal

Fully break the relationship between “scroll down” and “everything moves up.”

## Experience

The viewport becomes a floating botanical field.

Different elements receive different physics profiles:

- flowers drift diagonally;
- petals rise upward;
- leaves rotate slowly;
- letters move in opposing directions;
- decorative labels remain pinned temporarily;
- foreground elements move faster than distant elements.

The visitor should feel as if they are moving through a suspended floral installation.

## Work

- Create reusable `ZeroGActor` configuration:
  - start/end position;
  - x/y travel;
  - rotation;
  - scale;
  - depth layer;
  - easing;
  - optional oscillation.
- Use CSS transforms only for most actors.
- Add viewport-based actor count limits for mobile.

## Exit criteria

Motion remains coherent rather than random, and scroll direction can be reversed cleanly without visual glitches.

---

# Phase 4 — Scene 3: orbital product gallery

## Goal

Introduce actual products without abandoning the antigravity world.

## Experience

Four to six bouquet cards orbit around an invisible center instead of sitting in a conventional grid.

During scroll:

- cards rotate around the center;
- nearer cards scale up and sharpen;
- distant cards scale down and soften;
- flowers may visually escape beyond their card boundaries;
- product names/prices can lag slightly behind the cards to create layered motion.

On selection, gravity briefly returns: the chosen bouquet settles into the center and its product information becomes stable and actionable.

## Work

- Implement orbit math from normalized scroll progress.
- Keep CTAs accessible even if the card is visually transformed.
- Provide keyboard/focus behavior independent of the visual orbit.
- Ensure product content remains legible at all times.

## Exit criteria

The gallery is both a spectacle and a usable product selector.

---

# Phase 5 — Scene 4: rotating horizontal flower world

## Goal

Break the page axis itself.

## Experience

The composition tilts several degrees and vertical scrolling begins driving horizontal travel through an oversized flower landscape.

Huge typographic statements pass through multiple visual depths:

- NOT
- JUST
- A
- BOUQUET

Flowers can pass both in front of and behind the lettering.

## Work

- Pin the scene while vertical scroll drives x-axis translation.
- Use a bounded horizontal track rather than uncontrolled transforms.
- Keep tilt subtle enough to avoid discomfort.
- Reduce or remove rotation on narrow screens.

## Exit criteria

The horizontal scene feels intentional, reverses correctly, and never causes actual browser horizontal overflow.

---

# Phase 6 — Scene 5: floral gravity vortex

## Goal

Create the emotional climax of the experience.

## Experience

A tiny flower/light appears near the center of the viewport. As scroll progresses:

1. surrounding petals begin turning toward it;
2. typography bends inward through translation/rotation/scale;
3. product fragments and botanicals accelerate toward the focal point;
4. the screen becomes visually dense;
5. everything collapses into the center;
6. a brief white/cream visual reset follows.

This should feel like the whole website has been swallowed by its own gravity field.

## Work

- Use distance-to-center calculations for attraction vectors.
- Clamp scale/blur/rotation values.
- Avoid DOM destruction; transform existing scene actors so reverse scrolling works.
- Keep the climax relatively short.

## Exit criteria

The vortex is dramatic without creating nausea, frame drops, or an excessively long forced scroll section.

---

# Phase 7 — Scene 6: gravity returns / commerce mode

## Goal

Transition from experimentation into shopping clarity.

## Experience

After the white-out, a single stem grows into the scene. More flowers join it and gradually resolve into a conventional product grid.

From here onward:

- page flow is mostly normal;
- cards remain stable;
- filters and sorting behave conventionally;
- add-to-cart interactions are immediate;
- motion is reduced to subtle hover/reveal effects.

The narrative message is: **chaos becomes arrangement**.

## Work

- Build accessible product cards.
- Add collection filters/sorting if needed.
- Add cart interaction shell.
- Keep ecommerce state completely separate from scroll-animation state.

## Exit criteria

A shopper can ignore the artistic story from this point onward and use the site like a fast, predictable store.

---

# Phase 8 — Accessibility, responsiveness, and performance pass

## Goal

Make the extreme experience production-worthy.

## Accessibility

- Implement `prefers-reduced-motion` alternatives for every pinned/animated scene.
- Verify keyboard traversal while elements are transformed.
- Never communicate critical information only through motion.
- Maintain readable contrast over moving imagery.
- Avoid autoplay audio.
- Avoid scroll hijacking that prevents expected browser behavior.

## Performance

- Target transforms/opacity for the majority of motion.
- Audit long tasks and dropped frames.
- Lazy-load below-the-fold imagery.
- Preload only true hero assets.
- Reduce actor count and image resolution on smaller devices.
- Pause or disable non-visible animation work.
- Avoid filters such as large-area blur when cheaper depth cues work.

## Responsive strategy

Desktop receives the full experience. Tablet receives fewer actors and shorter pinned scenes. Mobile preserves the narrative but simplifies orbital/depth effects and removes unnecessary simultaneous movement.

## Exit criteria

The site remains usable with reduced motion, keyboard-only navigation, slower devices, and narrow mobile screens.

---

# Phase 9 — Final polish and launch readiness

## Goal

Turn the prototype into a coherent branded experience.

## Work

- Tune timing and easing scene-by-scene.
- Verify all scene transitions when scrolling both forward and backward.
- Add loading states and graceful image fallbacks.
- Test direct links and browser history behavior.
- Validate analytics events separately from visual animation callbacks.
- Check CLS, LCP, INP, memory usage, and GPU load.
- Test Safari/iOS separately because pinned and transformed scenes can behave differently there.
- Add a lightweight static fallback if advanced effects fail.

## Exit criteria

The page feels authored rather than merely animated: every transition contributes to the story, and commerce remains fast and understandable.

---

# Recommended implementation order

Do **not** implement every effect in parallel.

1. Complete Phase 1 static layout.
2. Build the hero timeline in Phase 2 and establish the animation architecture.
3. Reuse that architecture for the zero-gravity field.
4. Build the orbital product gallery as the first complex interactive scene.
5. Add the horizontal world.
6. Add the vortex only after the previous scenes run smoothly.
7. Build/finish the calm commerce section.
8. Perform accessibility and performance work before final visual polish.

# Definition of success

The experiment succeeds when a visitor can describe the experience as **“the flowers escaped the website”**, yet can still locate a bouquet, understand its price, and start buying it without fighting the interface.
