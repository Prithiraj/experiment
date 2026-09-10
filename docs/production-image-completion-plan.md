# Zero-G Bloom — Production Image Completion Plan

**Status:** Approved; execution in progress  
**Prepared:** 2026-09-10  
**Execution workspace:** [`roadmaps/production-image-completion/`](./roadmaps/production-image-completion/README.md)

## 1. Purpose

Complete the transition from the recovered conversation archive to an individually usable, traceable, performance-aware production image system for Zero-G Bloom.

“Complete” does not mean publishing every archived board. It means preserving every source, assigning every source a documented disposition, and promoting only clean individual assets into the application. The mistaken broad homepage concept and visual-direction boards remain reference material.

## 2. Verified baseline

| Area | Verified state |
| --- | --- |
| Source archive | `zero_g_bloom_all_generated_images.zip`, approximately 47 MB, preserved locally and Git-ignored |
| Extracted originals | 21 PNG files, approximately 48 MB, under `assets/reference/conversation-archive-originals/zero_g_bloom_generated_assets/` |
| Integrity | All 21 extracted PNG SHA-256 values match `assets/reference/conversation-archive/asset_inventory.csv` |
| Reference previews | 21 WebP thumbnails, 128 px wide, under `assets/reference/conversation-archive/` |
| Current production pack | 11 PNG masters and 11 matching WebP derivatives under `assets/production/` |
| Production manifest | 11 entries; every referenced PNG and WebP exists |
| Application integration | 11 unique production keys used across 34 `<img>` placements |
| Reference isolation | No archive reference or contact-sheet image is imported by application code |
| Current optimized payload | Approximately 2.2 MB across the 11 unique WebP files |

The current production pack is useful and valid, but it is a newly prepared scene-ready set rather than a one-to-one conversion of all 21 archived PNGs.

## 3. Source disposition

| Archive IDs | Count | Source type | Current status | Planned disposition |
| --- | ---: | --- | --- | --- |
| `00` | 1 | Broad homepage concept | Extracted; 128 px reference preview available | **Reference only.** This is the mistaken broad asset-board output and must never enter the production manifest or storefront imports. |
| `01`–`02` | 2 | Standalone cinematic lotus scenes | Full-resolution originals extracted; only reference previews exist | **Direct conversion candidates.** Prepare responsive development derivatives without altering the originals. |
| `03`–`17` | 15 | Lotus asset/contact-sheet boards | Full-resolution boards extracted; only reference previews exist | **Reference plus candidate inventory.** Identify repeated canonical elements, then extract only panels that pass quality gates; regenerate the rest individually, one asset at a time. |
| `18`–`20` | 3 | Visual-direction boards | Extracted; 128 px reference previews available | **Reference only.** Use for palette, composition, and chapter direction; never ship the boards themselves. |

### Contact-sheet rule

Boards `03`–`17` repeat many of the same concepts on light, dark, or checkerboard layouts. They are not fifteen independent production scenes. A panel may be extracted only when it has:

- one complete subject with no neighboring element, caption, grid, or baked checkerboard;
- enough source resolution for its intended rendered size;
- clean edges without halos, label fragments, or compression damage;
- a background that can be removed without damaging translucent petals, pollen, or fine stems.

If any gate fails, the board remains a visual reference and the target asset is regenerated individually.

## 4. Canonical production target set

The repeated boards should be consolidated into a canonical set rather than copied panel by panel.

### Priority A — complete the lotus chapter

| Target | Intended use | Current coverage | Planned action |
| --- | --- | --- | --- |
| Cinematic closed-bud scene | Hero or Chapter 1 background | Original `01` exists but is not production-converted | Produce 1536 px and 768 px WebP derivatives; assess AVIF only if materially smaller at equal visual quality |
| Cinematic full-bloom scene | Full-bloom chapter state | Original `02` exists but is not production-converted | Produce matching responsive derivatives and validate crop continuity with the bud scene |
| Closed bud cutout | Hero opening and field actor | Existing production asset | Retain; compare color and silhouette against `01` |
| Early-open and half-open lotus cutouts | Intermediate bloom states | Missing | Generate individually using the boards as references |
| Full-bloom cutout | Hero release and return state | Existing production asset | Retain; validate against the cinematic full bloom |
| Sepals and stem | Layered bloom construction | Missing as independent layers | Generate or extract separately with transparent backgrounds |
| Center, stamens, seed pod, pollen | Inner bloom and macro transitions | Missing | Generate one component at a time at macro-safe resolution |
| Outer, middle, inner, side, and curled petals | Hinged bloom animation | Three loose petals exist; layered families are incomplete | Build a restrained non-duplicate family with documented hinge origins |

### Priority B — complete water and continuity assets

| Target | Intended use | Current coverage | Planned action |
| --- | --- | --- | --- |
| Wide water plate | Zero-G field and chapter handoff | Existing production asset | Retain; add responsive sizing metadata |
| Reflection plate | Bud-to-bloom continuity | Missing | Prepare as a separate full-width layer |
| Ripple overlay | Water transition and typography reveal | Missing | Prepare transparent or blend-safe overlay |
| Lotus leaves at front, side, and distant angles | 2.5D water depth | One foreground leaf exists | Add only clearly distinct views |
| Water sparkle, bokeh, droplets, and mist | Atmospheric depth | Missing | Add small reusable overlays with strict payload budgets |

### Priority C — editorial and commerce expansion

- Retain the four existing bouquet cutouts: Wild Signal, Citrus Orbit, Violet Noise, and Quiet Moon.
- Add dedicated macro imagery only after the lotus and water layers are complete.
- Add campaign or garden-wall photography only when a specific chapter composition has been approved.
- Do not derive product photography from the broad homepage concept or visual-direction boards.

## 5. Definition of development-ready

An asset is development-ready only when all applicable conditions below pass.

### Visual and technical quality

- One subject or one intentional full-frame scene per file.
- sRGB color space and correct orientation.
- Transparent cutouts use real alpha; no white, black, or checkerboard matte is baked into the image.
- Edges remain clean at 100% and at the intended display size.
- No captions, labels, borders, neighboring panels, or accidental duplicate subjects.
- Cutout masters target at least 1200 × 1200 px when source quality permits.
- Full-frame derivatives never upscale beyond the 1536 × 1024 archived source.

### File pair and naming

- Preserve the highest-quality PNG master.
- Produce a matching WebP derivative using the same kebab-case basename.
- Use two-digit suffixes for visual families: `lotus-petal-outer-01`, `lotus-leaf-depth-02`.
- Store assets by role: `cinematic/`, `lotus/`, `petal-field/`, `water/`, `orbit/`, or `macro/`.
- Generate AVIF only when it provides a meaningful saving and a `<picture>` fallback is planned.

### Proposed WebP budgets

| Asset class | Target maximum |
| --- | ---: |
| Hero or cinematic frame | 450 KB per largest responsive source |
| Bouquet or large botanical cutout | 450 KB |
| Lotus layer or leaf | 250 KB |
| Petal | 80 KB |
| Ripple, sparkle, droplet, mist, or bokeh overlay | 150 KB |

An exception requires a documented visual reason and a measured effect on page loading.

### Manifest and provenance

Each production entry should record:

- stable ID and semantic role;
- PNG master and WebP derivative paths;
- archive source ID or generation reference;
- source SHA-256 where directly derived from the archive;
- width, height, alpha state, and WebP byte size;
- intended scene or scenes;
- status: `candidate`, `approved`, `integrated`, or `retired`.

## 6. Planned execution phases

### Phase 0 — preserve and freeze the source archive

**State:** Complete.

- Keep the ZIP and extracted original PNGs unchanged.
- Keep both locations Git-ignored and out of the deployed bundle.
- Re-run the 21-file hash check before and after any batch operation touching the archive tree.

**Gate:** 21/21 originals present and valid.

### Phase 1 — create the source and candidate ledger

- Create a ledger covering every archive ID from `00` through `20`.
- For boards `03`–`17`, record every distinct concept once and list duplicate appearances separately.
- Mark each candidate `direct-convert`, `extract`, `regenerate`, or `reject`.
- Assign an intended scene, priority, and expected output basename.
- Confirm that `00` and `18`–`20` are locked as reference-only.

**Deliverable:** `assets/reference/production-candidate-inventory.csv`.

**Gate:** Every source and candidate has exactly one disposition; duplicates are not counted as new production assets.

### Phase 2 — convert the standalone cinematic originals

- Produce responsive WebP derivatives from `01` and `02` without resizing above source resolution.
- Match crop, exposure, color, and horizon position so the scenes can transition without a visible jump.
- Store development copies under `assets/production/cinematic/` while preserving source provenance in the manifest.
- Validate desktop, tablet, and mobile crops before code integration.

**Gate:** Both scenes pass visual continuity, size-budget, and responsive-crop checks.

### Phase 3 — prepare individual lotus and water components

- Work through the approved ledger one asset at a time.
- Attempt direct extraction only when the contact-sheet rule passes.
- Otherwise regenerate the component individually using the relevant board as visual reference.
- Inspect transparency, edges, anatomy, lighting, palette, and uniqueness before starting the next component.
- Prefer the minimum canonical set needed for the chapter over every visible board variation.

**Gate per asset:** PNG master, optimized WebP, QA record, manifest entry, and approved role.

### Phase 4 — update the production pipeline

- Extend `assets/production/manifest.json` with dimensions, alpha, byte size, provenance, scene assignment, and lifecycle status.
- Extend `src/assets.ts` only with approved assets.
- Add an automated verification script to detect missing files, unmanifested files, orphaned imports, accidental reference imports, hash failures, and invalid alpha expectations.
- Keep PNG masters available for future editing while importing only optimized web assets into the Vite application.

**Gate:** Verification reports no missing, orphaned, or reference-sourced production imports.

### Phase 5 — integrate by scene and fix loading behavior

- Hero: load the opening bud immediately and preload only the next required bloom state.
- Below-fold chapters: use lazy or intersection-based loading instead of assigning all image sources at startup.
- Reuse cached assets for repeated actors rather than creating additional files.
- Add responsive `srcset`/`sizes` for full-frame cinematic images.
- Preserve the existing reduced-motion and static fallback states.
- Tune motion only after final dimensions and crop behavior are known.

**Gate:** No broken images; correct hero state; correct scene handoffs; no reference boards in the network payload; below-fold assets do not compete with the hero load.

### Phase 6 — verification and deployment

- Run archive completeness and SHA-256 checks.
- Run production-manifest and import-coverage checks.
- Run TypeScript checking and the production Vite build.
- Test 1440 px desktop, 1024 px tablet, and 390 px mobile layouts.
- Test full motion, reduced motion, and static fallback behavior.
- Check the browser console, image responses, intrinsic dimensions, and cart interaction.
- Measure the initial image payload and largest-contentful-paint candidate.
- Push one reviewed production batch at a time and verify the GitHub Pages workflow and live asset responses.

**Gate:** Local checks pass, GitHub Actions succeeds, and the live site serves the expected revision and image files.

## 7. Planned file structure

```text
assets/
  reference/
    conversation-archive/                 # tracked 128 px reference previews
    conversation-archive-originals/       # local extracted PNGs; Git-ignored
    production-candidate-inventory.csv    # planned source/candidate ledger
  production/
    cinematic/                            # responsive bud/bloom pond scenes
    lotus/                                # whole states and independent layers
    petal-field/                          # reusable loose petals
    water/                                # plates, reflections, ripples, atmosphere
    orbit/                                # bouquet/product cutouts
    macro/                                # later approved macro assets
    manifest.json                         # production source of truth
```

## 8. Commit sequence

1. `docs: add production image source ledger`
2. `assets: add cinematic lotus derivatives`
3. `assets: add approved lotus and water component batch`
4. `feat: integrate completed production image system`
5. `perf: defer below-fold production imagery`
6. `docs: record production image QA and deployment result`

Each asset commit should contain a small reviewable batch. Do not mix a large generation batch with motion-system changes.

## 9. Acceptance criteria

The production-image completion iteration is finished only when:

- all 21 archived PNGs remain preserved and hash-valid;
- every archive source is explicitly classified;
- the mistaken homepage concept and visual-direction boards remain reference-only;
- every production asset is individually usable and free from contact-sheet artifacts;
- every approved asset has a PNG master, optimized derivative, provenance, dimensions, and intended role;
- no duplicate board concept is promoted under multiple filenames without a documented reason;
- the application imports only approved production derivatives;
- image loading prioritizes the hero and defers below-fold imagery;
- reduced-motion and static fallback layouts retain complete content;
- local checks, browser QA, GitHub Actions, and live Pages verification pass;
- documentation reflects the final inventory and any consciously deferred assets.

## 10. Explicitly deferred

- Commerce backend, catalog service, payment, CMS, and analytics integrations.
- Real wedding, florist, or market campaign photography not already approved.
- WebGL or shader-based water effects; use layered DOM/CSS assets first.
- Converting reference boards merely to increase the production asset count.
- Publishing the ZIP or the 48 MB extracted conversation archive in the deployed site.

## 11. Approved execution decisions

The implementation proceeds under these decisions:

1. `01` and `02` should become responsive full-frame production scenes.
2. Contact-sheet panels that fail extraction quality should be regenerated individually.
3. PNG production masters may remain tracked while the original conversation archive remains local-only.
4. The canonical target set takes priority over reproducing every repeated panel from boards `03`–`17`.

The source ledger remains the gate for generating or integrating additional assets. Deployment is a separately gated release slice.
