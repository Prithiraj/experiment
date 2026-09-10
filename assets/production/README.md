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
