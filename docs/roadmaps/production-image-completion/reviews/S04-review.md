# S04 review — Production pipeline

The extended manifest owns every current production image and records both editable and web-delivery metadata. The verifier independently reads image containers, calculates hashes and sizes, enforces budgets, and traces runtime keys from manifest to TypeScript to HTML. `npm run check` now includes this guard before type checking.

**Decision:** Close `S04`; release `S05.1`.
