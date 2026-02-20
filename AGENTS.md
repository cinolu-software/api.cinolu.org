# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains the NestJS application source code.
  - `src/core/` holds cross-cutting concerns (auth, helpers, interceptors).
  - `src/modules/` contains feature modules (users, projects, programs, notifications, etc.).
  - `src/main.ts` bootstraps the API.
- `migrations/` holds TypeORM migration files (generated and applied via scripts).
- `templates/` contains Handlebars email templates.
- `uploads/` stores user-uploaded assets (served via `ServeStaticModule`).
- `dist/` is the build output and should be treated as generated artifacts.

## Build, Test, and Development Commands

Use `pnpm` as the package manager.

- `pnpm build` compiles to `dist/`.
- `pnpm lint` runs ESLint with autofix.
- `pnpm format` runs prettier format

## Coding Style & Naming Conventions

- Always adhere to the principle of single responsibility
- Keep methods short and clear by doing only one thing
- Use existing code patterns and organization
- Lint for validation after adding a feature
- TypeScript with NestJS patterns (modules, controllers, services, DTOs, entities).
- Indentation: 2 spaces (match existing files).
- File names use kebab-case; classes use PascalCase.
- Entities extend `AbstractEntity` and use snake_case columns when present in existing models.
- Do not generate migrations; I will do this manually.
