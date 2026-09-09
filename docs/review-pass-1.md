# Review pass 1 — correctness, accessibility, lifecycle

## Findings fixed

1. Motion scenes were only remounted when `prefers-reduced-motion` changed. Crossing the 640px/980px responsive breakpoints could leave desktop pin/orbit behavior mounted under a mobile layout.
2. Reduced-motion mode disabled the horizontal animation but left a 500vw track in place, making most of the story panels unreachable.
3. If a later scene threw during initialization, cleanups from scenes that had already mounted could be lost.
4. Vortex attraction vectors were calculated only once and could become stale after resize/orientation changes.
5. `pagehide` cleanup was registered with `{ once: true }`, which is unsafe with bfcache navigation.
6. Hero glyph splitting was not restored during scene cleanup, leaving mutated DOM after dynamic motion-mode changes.
7. The initial document did not explicitly start in a stable static state before the motion runtime mounted.

## Changes

- Added runtime layout-band tracking (`mobile`, `tablet`, `desktop`) and remount only when the band or motion preference changes.
- Made scene mounting transactional with reverse-order cleanup on failure.
- Unified reduced-motion/static/fallback layouts for orbit and horizontal scenes.
- Recomputed vortex vectors from layout coordinates through function-based GSAP values.
- Preserved motion across bfcache navigation and refreshed layout on restore.
- Restored hero text DOM on cleanup.
- Set the initial HTML motion state to `static`.

## Review goal

The experiment should remain navigable and deterministic when motion preferences change, the viewport rotates/resizes, a scene fails to initialize, or the browser restores the page from history cache.
