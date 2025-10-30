# CINOLU API

This repository contains the backend API for the CINOLU project. It's a NestJS application using TypeORM (MySQL) and includes authentication (JWT + Passport + Google OAuth), email sending, migrations, and seeders.

## Features

- NestJS (v11)
- TypeORM (v0.3) with migrations and seeds
- MySQL database
- Authentication: local (email/password), JWT, Google OAuth
- Email templates using Handlebars
- Swagger docs (available at /docs when running)
- File uploads for media (see `uploads/`)

## Quick start

Prerequisites:

- Node.js (>=18 recommended)
- pnpm
- A running MySQL server

Clone and install:

```bash
git clone <repo-url>
cd api
pnpm install
```

Create a `.env` file in the project root. Example variables used across the app are listed below.

Start the server in development mode:

```bash
pnpm dev
```

The API will listen on the port configured in your `.env` (see `PORT`). Swagger UI will be available at http://localhost:<PORT>/docs.

## Environment variables

Create a `.env` file at the project root. The project reads environment variables directly (no additional .env.example is included here). Typical variables used:

- PORT - HTTP port (e.g. 3000)
- DB_HOST - MySQL host
- DB_PORT - MySQL port (e.g. 3306)
- DB_NAME - Database name
- DB_USERNAME - Database user
- DB_PASSWORD - Database password
- SESSION_SECRET - express-session secret
- SESSION_RESAVE - boolean (true/false)
- SESSION_SAVE_UNINITIALIZED - boolean (true/false)
- JWT_SECRET - secret for signing/verifying JWTs
- FRONTEND_URI - frontend URL used in auth flows (e.g. https://app.example.com/)
- GOOGLE_CLIENT_ID - Google OAuth client ID
- GOOGLE_SECRET - Google OAuth client secret
- GOOGLE_REDIRECT_URI - OAuth callback URL
- MAIL_HOST - SMTP host
- MAIL_PORT - SMTP port
- MAIL_USERNAME - SMTP username (also used as from address)
- MAIL_PASSWORD - SMTP password
- SUPPORT_EMAIL - email address to receive contact/support messages

Example (do not commit real secrets):

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=cinolu_dev
DB_USERNAME=root
DB_PASSWORD=password
SESSION_SECRET=some_long_secret
SESSION_RESAVE=false
SESSION_SAVE_UNINITIALIZED=false
JWT_SECRET=another_secret
FRONTEND_URI=http://localhost:4200/
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_SECRET=your-google-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/redirect
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_mail_user
MAIL_PASSWORD=your_mail_password
SUPPORT_EMAIL=support@example.com
```

## Scripts

Useful npm scripts (run with pnpm):

- pnpm dev — start Nest in watch mode
- pnpm start — start (uses nest start)
- pnpm build — build to `dist/`
- pnpm start:prod — run the built production server
- pnpm lint — run ESLint and auto-fix
- pnpm format — run Prettier

Database and TypeORM helpers:

- pnpm db:migrate --name=<MigrationName> — generate a new migration (builds first)
- pnpm db:up — run pending migrations
- pnpm db:down — revert the last migration
- pnpm db:seed — run seeders (builds first)

Notes: these scripts use the project's TypeORM configuration at `@/core/database/orm.config.ts`.

## Database

This project uses TypeORM with a MySQL database. Entity files are compiled to `dist/` and the TypeORM configuration expects `dist/**/*.entity.js` for runtime.

For local development:

1. Ensure your MySQL server is running and `.env` points to it.
2. Create the database (if not using auto-create):

```sql
CREATE DATABASE cinolu_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Run migrations:

```bash
pnpm db:up
```

4. Optionally run seeders:

```bash
pnpm db:seed
```

Migrations live in `@/core/database/migrations/` and seeds in `@/core/database/seeds/`.

## Email templates

Templates are in the `templates/` folder and use Handlebars. The mailer is configured in `@/core/email/email.module.ts`.

## Authentication

- Local sign-in/sign-up: email and password
- Google OAuth sign-in: configure `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`, and `GOOGLE_REDIRECT_URI`
- JWTs are signed with `JWT_SECRET`

Session-based authentication uses `express-session`. Session cookie options are set in `@/main.ts`.

## Swagger / API docs

Swagger is set up in `@/main.ts` and served at `/docs` when the server is running.

## Testing

The project uses Jest for tests. To run tests:

```bash
pnpm test
```

Unit and e2e tests should be placed under `test/` or `@/**` using `.spec.ts` suffix.

## Folder overview

Top-level layout (important folders):

- `@/` — source code
  - `core/` — core modules (auth, database, email, users)
  - `features/` — feature modules (blog, galleries, programs, ventures, stats, etc.)
  - `shared/` — shared decorators, interceptors, utils
- `templates/` — email templates (Handlebars)
- `uploads/` — static uploaded files (organized by feature)

## Deployment notes

- Build the project: `pnpm build`
- Ensure `NODE_ENV=production` and all environment variables are set on the host
- Run `pnpm start:prod` (this executes `node dist/@/main`)
- For production, configure secure session cookies, and consider using a session store (redis) instead of the default in-memory store.

## Troubleshooting

- If migrations can't find entities, ensure you ran `pnpm build` so compiled `dist/**/*.entity.js` exist.
- If emails fail, confirm SMTP credentials and ports in `.env`.
- For OAuth, ensure redirect URIs configured in provider console match `GOOGLE_REDIRECT_URI`.

## Contributing

Please follow repository conventions for branches and commit messages. Commitlint and husky are included.

## License

See the `package.json` license field. This repository is currently set to UNLICENSED.
