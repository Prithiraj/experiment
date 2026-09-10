# Zero-G Bloom — Production Image Assets

These are individually usable image assets for the current Zero-G Bloom production iteration. Each PNG is kept as a production master; the matching WebP is the optimized derivative imported by the Vite app.

## Naming and roles

| Folder | Files | Use |
| --- | --- | --- |
| `lotus/` | `lotus-bud`, `lotus-bloom-full`, `lotus-leaf-foreground` | Hero transformation, zero-G field, axis break, vortex, return transition |
| `petal-field/` | `lotus-petal-floating-01` through `03` | Release, zero-G field, and vortex actor motion |
| `water/` | `lotus-water-plate` | Atmospheric zero-G field plate |
| `orbit/` | `orbit-wild-signal`, `orbit-citrus-orbit`, `orbit-violet-noise`, `orbit-quiet-moon` | Orbital collection cards and stable shop cards |

The broad conversation boards and contact sheets remain under `assets/reference/`; none are used as production UI imagery. The source-to-derivative mapping used by the application lives in `src/assets.ts`.

`cinematic/` contains byte-identical development copies of the two standalone archived pond scenes plus 1536 px and 768 px WebP derivatives. Their archive IDs and source hashes are recorded in the production-image slice evidence and production manifest.

The lotus chapter adds individually generated early-open and half-open cutouts, each with a transparent PNG master and optimized WebP. The water pack adds a responsive reflection plate and a black-backed ripple overlay intended for `mix-blend-mode: screen` compositing.

`manifest.json` is the production source of truth. Run `npm run verify:assets` for portable repository checks or `npm run verify:assets:local` when the ignored archive originals are present and their source hashes must also be enforced.
