# S01 — Source and candidate ledger

**Objective:** Give every archive source and every distinct production concept exactly one disposition.

**Risk:** Medium. Duplicate board concepts or an ambiguous extraction decision can create waste and inconsistent visual states.

## Children

- [`S01.1`](./S01.1-source-disposition.md) classifies all source files.
- [`S01.2`](./S01.2-canonical-candidate-inventory.md) consolidates repeated concepts.
- [`S01.3`](./S01.3-candidate-priority.md) records build order and extract/regenerate decisions.

## Parent acceptance

- Archive IDs `00`–`20` each have one source disposition.
- Repeated board appearances point to one canonical candidate.
- Every candidate has a role, priority, output basename, and next action.
