# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains the NestJS application source code.
  - `src/core/` holds cross-cutting concerns (auth, email, helpers, interceptors).
  - `src/modules/` contains feature modules (users, projects, programs, notifications, etc.).
  - `src/main.ts` bootstraps the API.
- `migrations/` holds TypeORM migration files (generated and applied via scripts).
- `templates/` contains Handlebars email templates.
- `uploads/` stores user-uploaded assets (served via `ServeStaticModule`).
- `dist/` is the build output and should be treated as generated artifacts.

## Build, Test, and Development Commands

Use `pnpm` as the package manager.

- `pnpm build` compiles to `dist/`.
- `pnpm start:prod` runs the compiled build.
- `pnpm lint` runs ESLint with autofix.

## Coding Style & Naming Conventions

- Always follow single responsability principle
- Keep methods short and clean doing only one thing
- Use existing patterns and code organization
- TypeScript with NestJS patterns (modules, controllers, services, DTOs, entities).
- Indentation: 2 spaces (match existing files).
- Filenames use kebab-case; classes use PascalCase.
- Prettier and ESLint are the enforced format/lint tools (`pnpm format`, `pnpm lint`).
- Entities extend `AbstractEntity` and use snake_case columns where present in existing models.
