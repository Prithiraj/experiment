# S04 — Production pipeline

**Objective:** Make production asset integrity repeatable rather than dependent on manual inspection alone.

**Risk:** Medium. A weak manifest or verifier can create false confidence and allow reference leakage.

## Children

- [`S04.1`](./S04.1-manifest-schema.md)
- [`S04.2`](./S04.2-asset-verifier.md)
- [`S04.3`](./S04.3-reference-orphan-guards.md)

## Parent acceptance

One package command verifies all manifest files, dimensions, hashes, alpha expectations, payload budgets, app imports, and prohibited reference paths.
