# Implementation tracker

Statuses: `READY`, `IN PROGRESS`, `BLOCKED`, `VERIFIED`, `DEFERRED`.

| Slice | Deliverable | Depends on | Risk | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| `S00.1` | 21-file hash and extraction audit | — | Low | VERIFIED | `evidence/S00.1-archive-integrity.md` |
| `S00.2` | Enforced reference/production boundary | `S00.1` | Low | VERIFIED | `evidence/S00.2-boundary.md` |
| `S01.1` | Source disposition rows `00`–`20` | `S00` | Low | VERIFIED | `production-candidate-inventory.csv` |
| `S01.2` | Canonical candidate rows | `S01.1` | Medium | VERIFIED | `production-candidate-inventory.csv` |
| `S01.3` | Priority and extract/regenerate decisions | `S01.2` | Medium | VERIFIED | `evidence/S01-ledger-review.md` |
| `S02.1` | Bud scene master and responsive WebP pair | `S01` | Medium | IN PROGRESS | `evidence/S02.1-bud-scene.md` |
| `S02.2` | Bloom scene master and responsive WebP pair | `S01` | Medium | READY | `evidence/S02.2-bloom-scene.md` |
| `S02.3` | Crop, color, horizon, and payload QA | `S02.1`, `S02.2` | Medium | READY | `evidence/S02.3-continuity.md` |
| `S03.1a` | Early-open lotus cutout | `S01.3` | Medium | READY | `evidence/S03.1a-early-open.md` |
| `S03.1b` | Half-open lotus cutout | `S03.1a` | Medium | READY | `evidence/S03.1b-half-open.md` |
| `S03.2a` | Stem and sepals layers | `S03.1` | Medium | READY | `evidence/S03.2a-stem-sepals.md` |
| `S03.2b` | Approved inner-structure layers | `S03.2a` | Medium | READY | `evidence/S03.2b-inner-structure.md` |
| `S03.3a` | Reflection plate | `S02.3` | Medium | READY | `evidence/S03.3a-reflection.md` |
| `S03.3b` | Ripple plus minimal atmosphere overlays | `S03.3a` | Medium | READY | `evidence/S03.3b-overlays.md` |
| `S03.4` | Distinct depth leaves/petals or deferment | `S01.3` | Medium | READY | `evidence/S03.4-depth-assets.md` |
| `S04.1` | Extended manifest | `S02`, approved `S03` children | Medium | READY | `evidence/S04.1-manifest.md` |
| `S04.2` | Repeatable verifier | `S04.1` | Medium | READY | `evidence/S04.2-verifier.md` |
| `S04.3` | Import/orphan/reference guards | `S04.2` | Medium | READY | `evidence/S04.3-guards.md` |
| `S05.1` | Priority/deferred loading behavior | `S04` | High | READY | `evidence/S05.1-loading.md` |
| `S05.2` | Responsive cinematic handoff | `S05.1` | High | READY | `evidence/S05.2-cinematic.md` |
| `S05.3` | Approved component states in motion chapters | `S05.2` | High | READY | `evidence/S05.3-motion.md` |
| `S05.4` | Reduced/static fallback parity | `S05.3` | High | READY | `evidence/S05.4-fallback.md` |
| `S06.1` | Hash, asset, type, and build checks | `S05` | High | READY | `evidence/S06.1-local-gates.md` |
| `S06.2` | 1440/1024/390 browser evidence | `S06.1` | High | READY | `evidence/S06.2-browser.md` |
| `S06.3` | CI and live Pages verification | `S06.2` | Critical | READY | `evidence/S06.3-release.md` |

## Parent roll-up

| Parent | Status rule | Current status |
| --- | --- | --- |
| `S00` | `S00.1` and `S00.2` verified | VERIFIED |
| `S01` | `S01.1`–`S01.3` verified | VERIFIED |
| `S02` | `S02.1`–`S02.3` verified | IN PROGRESS |
| `S03` | All required `S03.*` verified or explicitly deferred | READY |
| `S04` | `S04.1`–`S04.3` verified | READY |
| `S05` | `S05.1`–`S05.4` verified | READY |
| `S06` | `S06.1`–`S06.3` verified | READY |
