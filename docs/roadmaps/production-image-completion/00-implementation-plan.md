# Implementation plan

## Outcome

Finish the Zero-G Bloom image system with preserved source provenance, individually usable production assets, responsive delivery, automated verification, and a verified live release.

## Delivery sequence

| Order | Parent slice | Outcome | Risk | Entry dependency |
| ---: | --- | --- | --- | --- |
| 1 | `S00` | Immutable, hash-verified source baseline | Low | Extracted archive present |
| 2 | `S01` | One disposition for every source and canonical candidate | Medium | `S00` verified |
| 3 | `S02` | Responsive cinematic bud/bloom production scenes | Medium | `S01` verified |
| 4 | `S03` | Minimal approved set of individual lotus/water components | Medium | `S01`; references from `S02` |
| 5 | `S04` | Manifest and automated asset checks | Medium | `S02`; each approved `S03` child |
| 6 | `S05` | Responsive, deferred, fallback-safe scene integration | High | `S04` verified |
| 7 | `S06` | Local, browser, CI, and live release evidence | Critical | `S05` verified |

## Global invariants

1. The 21 extracted source PNGs must retain their inventory hashes.
2. Reference boards must never be application imports or deployment inputs.
3. Every production asset must have a stable name, provenance, dimensions, intended role, optimized derivative, and lifecycle status.
4. No full-frame derivative may exceed the 1536 × 1024 source dimensions.
5. Below-fold imagery must not compete with the hero load.
6. Reduced-motion and static-fallback layouts must preserve content and shopping controls.

## Recursive slice rule

A parent is `VERIFIED` only when every required descendant is `VERIFIED` or has a documented `DEFERRED` decision. A failed check reopens the smallest owning slice. Scope discovered outside an active slice is added as a child slice rather than silently expanding the current change.

## Commit and release policy

- Commit after each verified parent or coherent child batch.
- Keep source-ledger, asset, pipeline, integration, and evidence changes in separate commits where practical.
- Do not push the deployment slice until local and browser gates are green.
- Preserve local-only originals and the ZIP through `.gitignore`.
