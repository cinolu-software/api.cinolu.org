# CINOLU API

Backend API for CINOLU, built with NestJS and TypeORM (MariaDB).

## Tech Stack

- NestJS 11
- TypeORM 0.3
- MariaDB
- JWT + Passport (including Google OAuth)
- Handlebars email templates

## Prerequisites

- Node.js 18+
- pnpm
- MariaDB instance

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Default local URL:

- `http://localhost:8000` (or your configured `PORT`)

## Environment Variables

Create a `.env` file in the project root.

Required variables (from `.env.example`):

```env
PORT=8000

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=

SESSION_SECRET=
SESSION_RESAVE=
SESSION_SAVE_UNINITIALIZED=

GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/redirect
FRONTEND_URI=http://localhost:4200
```

Also used in the codebase:

- `JWT_SECRET`
- `SUPPORT_EMAIL`

## Scripts

```bash
pnpm dev            # Run in watch mode
pnpm start          # Start app
pnpm build          # Build to dist/
pnpm start:prod     # Run compiled app
pnpm lint           # Lint + auto-fix
pnpm format         # Format src/**/*.ts
```

## Database Migrations

```bash
pnpm db:migrate --name=<migration-name>  # Generate migration
pnpm db:up                               # Apply migrations
pnpm db:down                             # Revert last migration
```

## Project Structure

```text
src/
  core/       # Auth, guards, interceptors, shared internals
  modules/    # Domain modules (users, projects, programs, etc.)
  main.ts     # App bootstrap
migrations/   # TypeORM migrations
templates/    # Email templates
uploads/      # Uploaded files served statically
```

## Notes

- Global validation is enabled with Nest `ValidationPipe` (`transform: true`).
- CORS is enabled with credentials support.
- Static files are exposed from `/uploads`.
- `dist/` is generated output and should not be edited manually.

## API Modules and Base Routes

These are controller base paths defined via `@Controller(...)`.

- Auth: `/auth`
- Users: `/users`, `/roles`
- Projects: `/projects`, `/project-categories`, `/phases`
- Events: `/events`, `/event-categories`
- Programs: `/programs`, `/program-categories`, `/subprograms`
- Mentors: `/mentors`, `/expertises`
- Ventures: `/ventures`, `/products`
- Blog: `/articles`, `/tags`, `/comments`
- Media and content: `/highlights`, `/notifications`, `/stats`

## Complete API Documentation

For full API details (all routes, params, query/body DTOs, upload fields, and DTO field validation rules), see:

- `docs/API.md`

Regenerate it after API changes with:

```bash
node scripts/generate-api-docs.js
```

## Category Routes (Conflict-Free)

Category routes use dedicated top-level prefixes to avoid collisions with dynamic routes like `/programs/:programId`:

- Program categories: `/program-categories`
- Project categories: `/project-categories`
- Event categories: `/event-categories`

Each category module exposes the same endpoints:

- `GET /<category-prefix>`
- `GET /<category-prefix>/paginated?page=<number>&q=<string>`
- `GET /<category-prefix>/:id`
- `POST /<category-prefix>`
- `PATCH /<category-prefix>/:id`
- `DELETE /<category-prefix>/:id`

Params:

- `id`: category UUID
- `page` (query, optional): page number
- `q` (query, optional): text filter by category name
