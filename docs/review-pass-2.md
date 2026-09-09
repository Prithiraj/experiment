# Review pass 2 — interaction and visual cohesion

## Findings fixed

1. The prominent Bag control had no behavior, making the prototype feel unfinished even though add-to-bag buttons changed its count.
2. Add buttons exposed generic accessible names such as “Add”, and the live status message did not identify which bouquet was added.
3. The orbital settle effect could leave an earlier card visually marked if a different product was added before the first settle timer ended.
4. The six experimental scenes had strong individual effects but lacked a persistent visual device tying their changing physics together.
5. Commerce interactions had little tactile feedback compared with the experimental storytelling above them.

## Changes

- Added a native `<dialog>` cart drawer that works entirely on the front end and requires no backend.
- Aggregated repeated product adds into quantities and a prototype total.
- Added product-specific button labels and live-region announcements.
- Fixed rapid orbital selection so only one product can be in the settled visual state.
- Added a fixed gravity telemetry HUD that changes from Earth gravity through drift/orbit/axis-loss/vortex and back to 1g.
- Added hover/press polish for stable shop cards and product actions.
- Added font-host preconnects and balanced heading wrapping.
- Kept the cart explicit about its prototype status: no fake checkout behavior is presented.

## Review goal

The experience should feel intentional both as digital art and as a testable storefront prototype: the strange parts are strange on purpose, while controls behave like controls.
