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
- `pnpm dev` starts the API in watch mode.
- `pnpm start` runs the standard NestJS start command.
- `pnpm build` compiles to `dist/`.
- `pnpm start:prod` runs the compiled build.
- `pnpm lint` runs ESLint with autofix.
- `pnpm format` runs Prettier on `src/**/*.ts`.
- `pnpm db:migrate --name=<migration-name>` generates a migration after building.
- `pnpm db:up` applies migrations.
- `pnpm db:down` reverts the last migration.

## Coding Style & Naming Conventions
- TypeScript with NestJS patterns (modules, controllers, services, DTOs, entities).
- Indentation: 2 spaces (match existing files).
- Filenames use kebab-case; classes use PascalCase.
- Prettier and ESLint are the enforced format/lint tools (`pnpm format`, `pnpm lint`).
- Entities extend `AbstractEntity` and use snake_case columns where present in existing models.

## Testing Guidelines
- Jest is installed but there are no default test scripts yet.
- If adding tests, follow NestJS/Jest conventions and colocate tests with the module or under a `test/` folder.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits via `@commitlint/config-conventional`.
  - Example: `feat(notifications): add participant alerts`
- PRs should include:
  - A clear summary of changes and why.
  - Linked issue/task if applicable.
  - Migration notes when schema changes are included.

## Configuration & Security Notes
- Environment variables are loaded from `.env` (see `src/core/email/email.module.ts` and `orm.config.ts`).
- Do not commit secrets or production credentials.
- Email templates live in `templates/` and are referenced by name in `EmailService`.
