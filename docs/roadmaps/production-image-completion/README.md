# Zero-G Bloom production-image slice workspace

This workspace turns the approved [production image completion plan](../../production-image-completion-plan.md) into small, evidence-backed implementation slices. It follows the adaptive, risk-gated workflow used by UTSOV and MLPOINT: parent phases own outcomes, child slices own verifiable changes, and a parent closes only after every required descendant is verified or explicitly deferred.

## Working rules

- Keep at most one slice `IN PROGRESS`.
- Preserve source originals; production files are copied or derived, never moved from the archive.
- Generate one new visual asset at a time and pass its quality gate before starting the next.
- Keep the mistaken broad concept (`00`) and visual-direction boards (`18`–`20`) reference-only.
- Commit verified slices as reviewable units. Do not combine asset generation with unrelated motion changes.
- Record commands, measurements, screenshots, and release checks under `evidence/`.
- `S06.3` is a critical deployment gate and is not complete until the reviewed revision is pushed and the live site is checked.

## Slice tree

```text
S00 Source archive baseline
├── S00.1 Archive integrity
└── S00.2 Reference/production boundary
S01 Source and candidate ledger
├── S01.1 Source disposition
├── S01.2 Canonical candidate inventory
└── S01.3 Candidate priority and extraction decision
S02 Cinematic conversion
├── S02.1 Bud scene derivatives
├── S02.2 Bloom scene derivatives
└── S02.3 Transition continuity QA
S03 Individual lotus and water components
├── S03.1 Lotus state gaps
│   ├── S03.1a Early-open lotus
│   └── S03.1b Half-open lotus
├── S03.2 Structural components
│   ├── S03.2a Stem and sepals
│   └── S03.2b Center, stamens, seed pod, and pollen
├── S03.3 Water continuity
│   ├── S03.3a Reflection plate
│   └── S03.3b Ripple and atmosphere overlays
└── S03.4 Distinct depth leaves and petals
S04 Production pipeline
├── S04.1 Manifest schema and provenance
├── S04.2 Asset verifier
└── S04.3 Reference-import and orphan guards
S05 Scene integration
├── S05.1 Loading policy
├── S05.2 Responsive cinematic handoff
├── S05.3 Lotus component motion states
└── S05.4 Reduced-motion and static fallback
S06 Verification and release
├── S06.1 Local quality gates
├── S06.2 Browser and breakpoint evidence
└── S06.3 GitHub Pages release
```

## Current checkpoint

See [the tracker](./01-implementation-tracker.md) for the only authoritative slice status. The four-state lotus sequence is verified, structural layers are deliberately deferred, and `S03.3a` is the active slice.

## Files

- [Implementation plan](./00-implementation-plan.md)
- [Tracker matrix](./01-implementation-tracker.md)
- [Decision log](./02-decisions.md)
- [Slice briefs](./slices/README.md)
- [Review records](./reviews/README.md)
- [Evidence index](./evidence/README.md)
