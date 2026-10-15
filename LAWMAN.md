---
contract_version: 1
---

# Constitution of Akurganow/faker

## Read first

- README.md
- .github/copilot-instructions.md

## Departments

- abstractions: judged by none

## Fence

- Lint (`npm run lint`, Biome) runs on every push and pull request to main, on Linux, macOS and Windows: .github/workflows/main.yml
- Unit tests (`npm run test`, Jest with an 80% global coverage threshold) run after lint on the same three systems: .github/workflows/main.yml
- The type check runs as the build (`npm run build`, `tsc`) after the tests on the same three systems: .github/workflows/main.yml
- The fence does not run the release script. A break in `npm run release` passes it.

## Regression proof

- npm run lint
- npm run test
- npm run build

## Not judged

- __tests__
- package-lock.json
- CHANGELOG.md

## Execution

- Run code only in a copy under the run directory. Never run it in the clone.
- The tree expects the Node version named in .node-version.
- The tree expects npm, as package-lock.json shows. Install with `npm ci --ignore-scripts`, as the workflow does.

## Executor loads

none

## Precedents

none
