# Copilot Instructions for napro

## Project Overview

- This is a SvelteKit-based web application with modular features and UI components.
- Major directories:
  - `src/routes/`: SvelteKit routing, organized by feature (e.g., `(auth)`, `(marketing)`, `(non-auth)`).
  - `src/lib/components/ui/`: Reusable UI components (alert, avatar, button, card, dropdown-menu, etc.).
  - `src/features/`: Feature modules (e.g., `auth`).
  - `src/lib/server/db/`: Database schema and access logic.
  - `messages/`: Localization files (`en.json`, `es.json`).
  - `project.inlang/`: Inlang i18n configuration and plugin cache.

## Build & Development

- Use `npm run dev` (or `pnpm run dev`) to start the development server.
- Build for production with `npm run build`.
- Preview production build with `npm run preview`.
- E2E tests are in `e2e/` (uses Playwright, see `playwright.config.ts`).
- Unit tests use Vitest, typically found in files ending with `.spec.ts` or `.test.ts`.

## Key Patterns & Conventions

- SvelteKit routing: Files in `src/routes/` define pages and layouts. Parentheses in folder names (e.g., `(auth)`) are used for route grouping.
- UI components are colocated with their `index.ts` for exports. Example: `src/lib/components/ui/button/button.svelte` and `index.ts`.
- Server-side logic lives in `.server.ts` files (e.g., `+layout.server.ts`, `+page.server.ts`).
- Auth logic is split between client (`src/features/auth/`, `src/lib/auth-client.ts`) and server (`src/lib/server/auth.ts`).
- Database schemas are defined in `src/lib/server/db/schema.ts` and related files.
- Localization uses Inlang; translation files are in `messages/` and `src/lib/paraglide/messages/`.
- Use `formDataToObject.ts` and `zodErrorToString.ts` in `src/lib/utils/` for form handling and validation error formatting.

## External Integrations

- Inlang for i18n (see `project.inlang/` and `src/lib/paraglide/`).
- Playwright for E2E testing.
- Vitest for unit testing.
- Drizzle ORM for database access (see `drizzle.config.ts`).
- Vite for build tooling (`vite.config.ts`).

## Example Workflow

1. Add a new page: Create a `.svelte` file in `src/routes/` or a subfolder.
2. Add a new UI component: Place `.svelte` and `index.ts` in `src/lib/components/ui/[component]/`.
3. Add a new feature: Create a folder in `src/features/` and organize client/server code as needed.
4. Run tests: `pnpm test` for unit tests, `pnpm exec playwright test` for E2E.

## References

- See `README.md` for basic setup and commands.
- See `drizzle.config.ts`, `playwright.config.ts`, `vite.config.ts`, and `svelte.config.js` for integration details.
- Localization: `messages/`, `project.inlang/`, and `src/lib/paraglide/messages/`.

---

If any section is unclear or missing, please provide feedback to improve these instructions.
