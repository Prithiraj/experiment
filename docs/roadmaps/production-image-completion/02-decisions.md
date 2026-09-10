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
