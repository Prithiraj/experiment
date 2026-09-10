# Production asset iteration — Zero-G Bloom

The site now has a first individually usable production image pack rather than relying on CSS botanical placeholders or the mistaken broad asset board.

## Provenance

- The recovered conversation archive contains 21 original PNGs plus the reference inventory.
- `assets/reference/conversation-archive/` holds small WebP thumbnails for visual reference only.
- `assets/reference/conversation-archive-originals/` holds the recovered non-compressed PNG archive locally and is ignored by Git so the masters are preserved without being shipped in the web bundle.
- `assets/production/` holds the new scene-ready production masters and optimized WebP derivatives.
- `src/assets.ts` is the single application import map. It assigns stable semantic names to the WebP files and binds them to `[data-production-image]` elements.

## Current coverage

The production images are integrated into the release hero, zero-G field, orbital collection, horizontal axis, vortex, gravity-return transition, and final product grid. The hero uses the bud and full-bloom assets as two scroll-driven states. The original CSS color fields remain underneath as a palette and loading-safe visual foundation.

The archive boards, contact sheets, macro studies, and the broad homepage concept remain reference material. They are not imported into the site.

## Remaining production work

This is the first production asset pass, not a claim that all final photography is complete. The next visual pass can add dedicated macro, petal-stack, ripple, and campaign assets after real-device performance profiling. Commerce data and checkout remain outside this front-end prototype.

The reviewed execution sequence and completion criteria are defined in [`production-image-completion-plan.md`](./production-image-completion-plan.md). No additional archive conversion should begin until that plan is approved.
