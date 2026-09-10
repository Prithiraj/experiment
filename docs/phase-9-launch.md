# Phase 9 — Launch readiness

## Final experience map

1. **Gravity intact** — editorial hero and stable navigation.
2. **Release gravity** — bouquet layers and selected glyphs detach.
3. **Zero-G field** — depth-layered botanicals follow opposing vectors.
4. **Orbital collection** — products orbit an elliptical center while remaining actionable.
5. **Axis break** — vertical scroll drives a bounded horizontal typographic world.
6. **Vortex** — existing actors collapse toward one luminous bloom.
7. **Gravity returns** — a stem grows into the stable shop.
8. **Commerce mode** — normal product grid, services, seasonal story, testimonials, footer.

## Failure behavior

Motion initialization is wrapped at the orchestration boundary. If one of the scene initializers throws:

- already-mounted scenes are reverted;
- the document switches to `data-motion-state="fallback"`;
- fallback CSS restores normal-flow orbit/horizontal/shop layouts;
- navigation and commerce interactions remain available.

Reduced motion uses the intentional `static` state rather than the failure state.

## Launch checklist

- [x] Semantic page structure.
- [x] Stable navigation during storytelling.
- [x] Keyboard-accessible actions.
- [x] Reduced-motion representation.
- [x] Mobile simplifications.
- [x] Low-resource actor degradation.
- [x] Reverse-safe deterministic scroll scenes.
- [x] Static fallback if animation initialization fails.
- [x] TypeScript check in CI.
- [x] Production Vite build in CI.
- [x] Replace the core CSS botanical prototypes with individually usable optimized production assets; add remaining campaign/macro photography in a later visual pass.
- [ ] Run real-device Safari/iOS QA for pinning and transformed scene behavior.
- [ ] Run Lighthouse and field-oriented Core Web Vitals profiling after final assets are installed.
- [ ] Connect product/catalog/cart actions to a real commerce backend.
- [ ] Add production analytics events at commerce boundaries rather than animation callbacks.

## Scope boundary

This repository is now a **working front-end prototype** of the full antigravity storytelling concept, not a production ecommerce deployment. It deliberately proves the interaction architecture and visual language before adding real catalog data, checkout, CMS, photography, deployment infrastructure, or analytics.

## Recommended next iteration

The highest-value next pass is not more animation. Tune the installed image pack against actual image weights, crop behavior, and real-device performance, then add dedicated macro and campaign assets where the current reusable set is not expressive enough.
