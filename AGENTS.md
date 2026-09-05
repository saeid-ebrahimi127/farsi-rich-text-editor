# AGENTS.md

Persian (RTL) rich-text editor built on Tiptap v3 + React 19, scaffolded via TanStack Start (file-router, SSR), styled with Tailwind v4 + shadcn/ui. UI copy and comments are in Persian — keep new UI text Persian.

## Working rules

- **Never install with npm or npx** — always use `bun` / `bunx`.
- **Don't change or remove anything without asking permission** first.
- **Don't commit without checking** — confirm with the user what to commit and the commit message first.
- **Don't run eslint, prettier, or tsx manually.** The project uses **husky + lint-staged**, which runs `eslint --fix` and `prettier --write` automatically via the pre-commit hook. Let the hook handle formatting/linting.

## Commands (Bun, not npm/pnpm)

All scripts use `bun --bun vite ...`. Always run with the `bun` runtime from the repo root.

- `bun install` — install deps
- `bun run dev` — dev server on port 5000
- `bun run build` — production build
- `bun run preview` — preview build on port 5000
- `bun run lint` — ESLint (TanStack config)
- `bun run format` — Prettier + ESLint --fix
- `bun run check` — Prettier check only
- `bun run generate-routes` — regenerate TanStack Router route tree

There are **no tests** in the repo — don't attempt to run a test suite.

## Generated / gitignored files

- **`src/routeTree.gen.ts` is gitignored** but required for build, typecheck, and importing from `./routeTree.gen` (in `src/router.tsx`). After adding/changing files under `src/routes/`, run `bun run generate-routes` before type-checking or building. Its absence from `git status`/diffs is expected.
- **`src/components/ui/**` and default shadcn components are generated and ignored** by both ESLint and Prettier. Don't hand-edit them; regenerate via the shadcn CLI (`components.json` aliases `ui` → `#/components/ui`, `components` → `#/components`, `utils` → `#/lib/utils`).
- `.env.local` and `.vercel/` are gitignored; deployment is Vercel.

## Code conventions (non-default)

- **Path aliases:** `#/*` and `@/*` both map to `./src/*` (tsconfig `paths`). Notice `.ts`/`.tsx` extensions **are included** in relative/alias imports — required because `allowImportingTsExtensions: true` and `verbatimModuleSyntax: true`. Keep them.
- **TypeScript is strict** with `noUncheckedIndexedAccess`, `noUncheckedSideEffectImports`, `noUnusedLocals`, `noUnusedParameters` on. Handle possibly-undefined array/object index access explicitly.
- **Pre-commit hook** runs lint-staged: `eslint --fix` + `prettier --write` on tracked JS/TS files; other files get `prettier --write`. Keep changes formatted or the commit hook will rewrite them.
- **React Compiler** is enabled via a Babel preset in `vite.config.ts`. Follow hooks rules (no conditional hooks, stable deps).
- Tailwind class ordering is enforced by `prettier-plugin-tailwindcss`; formatter must not be bypassed.

## Architecture

- **Editor core:** `src/farsi-rich-text-editor/` — `index.tsx` wires up Tiptap extensions and the toolbar/content/footer; `toolbar/` holds one component per feature; custom nodes/extensions live in `extensions/`; `components/` holds node views and bubble menus; `utils/` has editor-utility helpers.
- **Routing:** TanStack Router file-based. Routes live in `src/routes/` (`__root.tsx` is the shell with RTL, tooltip, and toaster providers; `index.tsx` is the single page). See the codegen note above.
- **Toolbar feature example:** buttons track active state via `useEditorState(... editor.isActive('strike') ...)` — note Tiptap's mark/command names (e.g. `strike`, not `strikethrough`). Use `useEditorState` selectors to avoid re-rendering the toolbar on every keystroke.
- Zod schemas for form validation live in `src/zod-schema/`.
