# Zero-G Bloom

An experimental florist storefront where scrolling progressively removes gravity from the interface, then resolves into a calm commerce experience.

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Stack

- Vite 8
- TypeScript 7
- GSAP 3 + ScrollTrigger
- semantic HTML
- CSS custom properties and transform-driven motion

## Experience architecture

The storytelling layer follows this sequence:

`gravity intact → release → zero-G field → orbital products → horizontal axis break → vortex → gravity returns`

The final shop is intentionally stable and conventional.

## Project docs

- [`ANTIGRAVITY_FLORIST_PLAN.md`](./ANTIGRAVITY_FLORIST_PLAN.md) — overall phased roadmap
- [`docs/phase-0/storyboard.md`](./docs/phase-0/storyboard.md) — art direction and scene storyboard
- [`docs/phase-0/motion-tokens.md`](./docs/phase-0/motion-tokens.md) — shared motion language and constraints

## Accessibility contract

`prefers-reduced-motion: reduce` removes pinned storytelling, continuous orbit/drift/vortex behavior, and large axis rotation while preserving all content and shopping actions.

## Current implementation status

- [x] Phase 0 — direction, storyboard, motion language
- [x] Phase 1 — technical foundation and static responsive page
- [ ] Phase 2 — release-gravity hero
- [ ] Phase 3 — zero-gravity field
- [ ] Phase 4 — orbital collection
- [ ] Phase 5 — horizontal axis break
- [ ] Phase 6 — gravity vortex
- [ ] Phase 7 — gravity returns / commerce polish
- [ ] Phase 8 — accessibility, responsive, performance audit
- [ ] Phase 9 — final polish and launch readiness
