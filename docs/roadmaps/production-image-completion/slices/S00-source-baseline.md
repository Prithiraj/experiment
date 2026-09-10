# S00 — Source archive baseline

**Objective:** Freeze a trustworthy local source baseline before any production derivation.

**Risk:** Low. The main failure mode is accidental source mutation or deployment leakage.

## Children

- [`S00.1`](./S00.1-archive-integrity.md) verifies extraction and hashes.
- [`S00.2`](./S00.2-reference-production-boundary.md) verifies filesystem and import boundaries.

## Parent acceptance

- All 21 expected PNGs exist and match inventory SHA-256 values.
- ZIP and extracted originals remain Git-ignored and outside the app import graph.
- Evidence records the exact baseline without modifying the originals.
