# Zero-G Bloom

An experimental florist storefront where scrolling progressively removes gravity from the interface, then resolves into a calm commerce experience.

## Run locally

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run check
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
- [`docs/phase-8-audit.md`](./docs/phase-8-audit.md) — accessibility, responsive, performance, and CI audit
- [`docs/phase-9-launch.md`](./docs/phase-9-launch.md) — launch checklist, fallback behavior, and remaining production work

## Accessibility contract

`prefers-reduced-motion: reduce` removes pinned storytelling, continuous orbit/drift/vortex behavior, and large axis rotation while preserving all content and shopping actions.

If animation initialization fails, the motion orchestrator switches the page to an explicit static fallback layout rather than leaving partially transformed scenes behind.

## Implementation status

- [x] Phase 0 — direction, storyboard, motion language
- [x] Phase 1 — technical foundation and static responsive page
- [x] Phase 2 — release-gravity hero
- [x] Phase 3 — zero-gravity field
- [x] Phase 4 — orbital collection
- [x] Phase 5 — horizontal axis break
- [x] Phase 6 — gravity vortex
- [x] Phase 7 — gravity returns / commerce transition
- [x] Phase 8 — accessibility, responsive, performance, and CI pass
- [x] Phase 9 — fallback resilience and launch-readiness documentation

## Verification

GitHub Actions verifies TypeScript and a production Vite build on pushes and pull requests. The Phase 8 verification loop caught and fixed the missing Vite ambient CSS declarations; the follow-up run passed both type-check and production build.

## Scope

This is a front-end interaction prototype. Product imagery is currently CSS botanical art, cart behavior is a UI shell, and no payment/catalog backend is connected yet. Real-device Safari/iOS QA and final-asset Core Web Vitals profiling remain launch tasks once production photography and commerce infrastructure are introduced.
