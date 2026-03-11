# Copilot Instructions

## Project Overview
A REST API built with TypeScript, Express, and Vite.

## Level of developers

- Assume that all developers in this team are junior developers with 0-2 years of experience.

## Tech Stack
- **Language:** TypeScript
- **Framework:** Express
- **Build tool:** Vite (library/SSR mode) + vite-node for development
- **Runtime:** Node.js 20+
- **Other tools:** ESLint, dotenv

## Code Style & Conventions
- Use clear, descriptive variable and function names.
- Keep functions small and focused on a single responsibility.
- Prefer `const` over `let`; avoid `var`.
- Use `async/await` over raw Promises where possible.
- Write self-documenting code; add comments only when logic is non-obvious.

## Architecture
```
src/
  index.ts          # App entry point — Express app setup and server start
  routes/
    index.ts        # Route definitions (mounted at /api)
```
Routes are registered in `src/routes/` and mounted under `/api` in `src/index.ts`.

## Testing
- Write unit tests for all business logic.
- Use descriptive test names that explain the expected behavior.
- Prefer test files co-located with source files (e.g., `foo.test.ts` next to `foo.ts`).

## Security
- Never hardcode secrets, API keys, or credentials — use environment variables.
- Validate and sanitize all user input at system boundaries.
- Follow least-privilege principles for database and API access.

## General Guidelines
- Avoid over-engineering; implement only what is needed for the current task.
- Keep PRs small and focused on a single concern.
- Prefer editing existing files over creating new ones when possible.
- Follow the existing patterns and conventions already in the codebase.

## Tickets 
- When asked to execute a ticket, look for it in .tickets/backlog
- Once finished with a ticket, move it to .tickets/done and update the ticket with a summary of what was done. Also check all acceptance criteria 