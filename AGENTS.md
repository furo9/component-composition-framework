# AGENTS.md

## Repo shape
- Docs content lives in `apps/ccf-docs/content/`.
- If you add or rename a page, update `apps/ccf-docs/content/_meta.js` so navigation stays correct.
- AGENTS section headings use Title Case.
- Docs headings should use sentence case, not Title Case, unless the text is a proper noun.
- Workspace package names should start with `@furo9/ccf-`.

## Commands
- Use `pnpm` (repo pins `pnpm@9.15.0`).
- Run the docs app from its package: `pnpm --dir apps/ccf-docs dev`.
- Build docs with `pnpm --dir apps/ccf-docs build`; its `postbuild` step runs Pagefind indexing automatically.

## Edit carefully
- Do not hand-edit generated output in `.next/` or `apps/ccf-docs/public/_pagefind/`; both are build artifacts and are gitignored.
- Commit messages should not use Conventional Commits prefixes.
- Commit messages should start with an uppercase letter.
