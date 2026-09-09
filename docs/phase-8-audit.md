# Phase 8 — Accessibility, responsiveness, performance audit

## Completed safeguards

### Motion accessibility

- `prefers-reduced-motion: reduce` prevents the GSAP storytelling scenes from mounting.
- Reduced-motion users receive normal document flow, static orbit cards, stacked horizontal content, and stable commerce content.
- The release cue is hidden when reduced motion is requested.
- Critical product names, prices, CTAs, and navigation never depend on animation progress.

### Keyboard / input

- Skip link jumps directly to the stable shop.
- Product CTA buttons remain native buttons.
- Orbit cards elevate visually with `:focus-within` while DOM/focus order remains unchanged.
- Touch inputs do not receive pointer parallax.
- Interactive controls use `touch-action: manipulation`.

### Contrast / forced colors

- Higher-contrast preferences receive stronger borders.
- Forced-color mode restores explicit control borders and visible core/brand outlines.

### Responsive degradation

- Desktop gets the full pinned choreography.
- Tablet uses reduced orbit radii and existing actor limits.
- Mobile replaces the full orbit with card reveals and the horizontal track with stacked panels.
- Low-core devices and data-saver mode receive smaller botanical actor budgets.

### Performance

- Heavy scenes animate transforms/opacity primarily.
- Pinned scenes use paint containment.
- Non-pinned lower-page sections use `content-visibility: auto`.
- Large continuous blur animation is avoided.
- Mobile removes the expensive header backdrop blur.

## CI verification

A repository-native GitHub Actions workflow runs on push and pull request using Node 24.

Verification steps:

1. install dependencies;
2. `npm run check` (`tsc --noEmit`);
3. `npm run build` (production Vite build).

The first CI run correctly exposed missing Vite ambient declarations for CSS side-effect imports. `src/vite-env.d.ts` was added with the standard `vite/client` reference.

The second run completed successfully: install, TypeScript check, and production build all passed.

## What this audit does not prove

- It is not a Lighthouse/Core Web Vitals field measurement.
- It is not a physical-device Safari/iOS visual QA pass.
- It does not test a real payment/checkout backend; the repository contains a storefront/cart interaction shell only.
- The current botanicals are CSS art, so image decoding/network budgets are intentionally not representative of a production photography-heavy florist site.
