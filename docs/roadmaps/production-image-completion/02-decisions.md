# Decision log

| ID | Decision | Reason | Status |
| --- | --- | --- | --- |
| `D001` | Treat `00_florist-homepage-concept.png` as reference-only. | It is the mistaken broad output, not an individually usable production asset. | Accepted |
| `D002` | Treat visual-direction boards `18`–`20` as reference-only. | They describe palette/composition and contain multiple baked concepts. | Accepted |
| `D003` | Directly convert cinematic originals `01` and `02`. | They are clean standalone 1536 × 1024 scenes with known provenance. | Accepted |
| `D004` | Use boards `03`–`17` as visual references unless a panel passes every extraction gate. | Board crops risk labels, neighboring elements, baked backgrounds, and insufficient resolution. | Accepted |
| `D005` | Generate missing canonical assets individually. | Individual generation provides cleaner composition, naming, alpha, and QA. | Accepted |
| `D006` | Preserve the ZIP and extracted originals locally, outside Git and the deployed bundle. | This protects non-compressed sources without inflating production delivery. | Accepted |
| `D007` | Track editable production masters and import only optimized derivatives in the web app. | Masters support future iteration; derivatives protect loading performance. | Accepted |
| `D008` | Require a critical release gate after local and browser verification. | Deployment should promote an already verified revision, not serve as the test environment. | Accepted |
| `D009` | Expose deterministic `?motion=reduced` and `?motion=fallback` verification profiles. | Native reduced-motion remains honored while repeatable browser checks can exercise both non-animated paths independently of the test machine. | Accepted |
| `D010` | Promote revision `08541ea9f164905db3764c51339b874c6c127c61` after all local and browser gates passed. | The remote had no divergent commits, the worktree was clean, and both the independent build and Pages workflows could verify the same reviewed release. | Accepted |
| `D011` | Upgrade the three official Pages actions to their Node 24 release majors. | The first successful release exposed deprecation notices from the older action runtimes; `configure-pages@v6`, `upload-pages-artifact@v5`, and `deploy-pages@v5` are the current official releases. | Accepted |
