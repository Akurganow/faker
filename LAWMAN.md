---
contract_version: 3
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

## Labels

- `needs-human` (owner attention): Lawman cannot decide this issue alone. A person decides on it.
- `dependencies`: Pull requests that update a dependency file
- `javascript`: Pull requests that update javascript code
- `bug`: Something isn't working
- `documentation`: Improvements or additions to documentation
- `duplicate`: This issue or pull request already exists
- `enhancement`: New feature or request
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `invalid`: This doesn't seem right
- `question`: Further information is requested
- `wontfix`: This will not be worked on

## Precedents

none
