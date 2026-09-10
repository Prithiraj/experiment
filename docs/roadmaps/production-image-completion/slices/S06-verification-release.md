# S06 — Verification and release

**Objective:** Promote only a locally and visually verified revision, then prove CI and live GitHub Pages match it.

**Risk:** Critical for `S06.3`, because it changes the public site.

## Children

- [`S06.1`](./S06.1-local-quality-gates.md)
- [`S06.2`](./S06.2-browser-breakpoint-evidence.md)
- [`S06.3`](./S06.3-github-pages-release.md)

## Parent acceptance

All local checks pass, browser evidence covers required modes and sizes, CI succeeds, and the live site serves the reviewed revision and expected assets.
