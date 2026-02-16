# API Documentation

Generated from source code in `src/core/auth` and `src/modules`.

## Conventions

- `Auth`: `Public` means route has `@Public()`. Otherwise route is protected.
- `Roles`: extracted from `@UseRoles(...)` where present.
- `Params`, `Query`, `Body`, `Files`: extracted from method decorators/interceptors.

## Modules and Routes

### Auth

#### AuthController (`/auth`)

Source: `src/core/auth/auth.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/auth/support/contact` | Public  | - | - | `body: ContactSupportDto` | - |
| POST | `/auth/signup` | Public  | - | - | `body: SignUpDto` | - |
| POST | `/auth/signin` | Public  | - | - | - | - |
| GET | `/auth/google` | Public  | - | - | - | - |
| GET | `/auth/google/callback` | Public  | - | - | - | - |
| POST | `/auth/signout` | Protected  | - | - | - | - |
| GET | `/auth/me` | Protected  | - | - | - | - |
| PATCH | `/auth/me` | Protected  | - | - | `body: UpdateProfileDto` | - |
| PATCH | `/auth/me/password` | Protected  | - | - | `body: UpdatePasswordDto` | - |
| POST | `/auth/password/forgot` | Public  | - | - | `body: ForgotPasswordDto` | - |
| POST | `/auth/password/reset` | Public  | - | - | `body: ResetPasswordDto` | - |

### Blog

#### ArticlesController (`/articles`)

Source: `src/modules/blog/articles/articles.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/articles` | Protected  | - | - | `body: CreateArticleDto` | - |
| GET | `/articles/recent` | Public  | - | - | - | - |
| GET | `/articles` | Protected  | - | `(query object): FilterArticlesDto` | - | - |
| POST | `/articles/:articleId/gallery` | Protected  | `articleId: string` | - | - | `file` (single)<br>`image` (multipart) |
| DELETE | `/articles/gallery/:galleryId` | Protected  | `galleryId: string` | - | - | - |
| GET | `/articles/by-slug/:slug/gallery` | Public  | `slug: string` | - | - | - |
| POST | `/articles/:articleId/cover` | Protected  | `articleId: string` | - | - | `file` (single)<br>`article` (multipart) |
| GET | `/articles/published` | Public  | - | `(query object): FilterArticlesDto` | - | - |
| PATCH | `/articles/:articleId/publish` | Protected  | `articleId: string` | - | - | - |
| GET | `/articles/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| GET | `/articles/:articleId` | Protected  | `articleId: string` | - | - | - |
| PATCH | `/articles/:articleId/highlight` | Protected  | `articleId: string` | - | - | - |
| PATCH | `/articles/:articleId` | Protected  | `articleId: string` | - | `body: UpdateArticleDto` | - |
| DELETE | `/articles/:articleId` | Protected  | `articleId: string` | - | - | - |

#### CommentsController (`/comments`)

Source: `src/modules/blog/comments/comments.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/comments` | Protected  | - | - | `body: CreateCommentDto` | - |
| GET | `/comments` | Protected  | - | - | - | - |
| GET | `/comments/by-article/:slug` | Public  | `slug: string` | `(query object): FilterCommentsDto` | - | - |
| GET | `/comments/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/comments/:id` | Protected  | `id: string` | - | `body: UpdateCommentDto` | - |
| DELETE | `/comments/:id` | Protected  | `id: string` | - | - | - |

#### TagsController (`/tags`)

Source: `src/modules/blog/tags/tags.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/tags` | Protected  | - | - | `body: CreateTagDto` | - |
| GET | `/tags/paginated` | Protected  | - | `(query object): FilterTagsDto` | - | - |
| GET | `/tags` | Public  | - | - | - | - |
| GET | `/tags/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/tags/:id` | Protected  | `id: string` | - | `body: UpdateTagDto` | - |
| DELETE | `/tags/:id` | Protected  | `id: string` | - | - | - |

### Events

#### EventCategoriesController (`/event-categories`)

Source: `src/modules/events/categories/categories.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/event-categories` | Protected  | - | - | `body: CreateCategoryDto` | - |
| GET | `/event-categories` | Public  | - | - | - | - |
| GET | `/event-categories/paginated` | Protected  | - | `(query object): QueryParams` | - | - |
| GET | `/event-categories/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/event-categories/:id` | Protected  | `id: string` | - | `body: UpdateCategoryDto` | - |
| DELETE | `/event-categories/:id` | Protected  | `id: string` | - | - | - |

#### EventsController (`/events`)

Source: `src/modules/events/events.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/events` | Protected  | - | - | `body: CreateEventDto` | - |
| GET | `/events` | Protected  | - | `(query object): FilterEventsDto` | - | - |
| GET | `/events/recent` | Public  | - | - | - | - |
| GET | `/events/published` | Public  | - | `(query object): FilterEventsDto` | - | - |
| GET | `/events/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| GET | `/events/:eventId` | Protected  | `eventId: string` | - | - | - |
| POST | `/events/:eventId/participate` | Protected  | `eventId: string` | - | - | - |
| DELETE | `/events/:eventId/participate` | Protected  | `eventId: string` | - | - | - |
| GET | `/events/:eventId/participations` | Protected  | `eventId: string` | - | - | - |
| PATCH | `/events/:eventId/publish` | Protected  | `eventId: string` | - | - | - |
| POST | `/events/:eventId/gallery` | Protected  | `eventId: string` | - | - | `file` (single)<br>`image` (multipart) |
| DELETE | `/events/gallery/:galleryId` | Protected  | `galleryId: string` | - | - | - |
| GET | `/events/by-slug/:slug/gallery` | Public  | `slug: string` | - | - | - |
| POST | `/events/:eventId/cover` | Protected  | `eventId: string` | - | - | `file` (single)<br>`cover` (multipart) |
| PATCH | `/events/:eventId/highlight` | Protected  | `eventId: string` | - | - | - |
| PATCH | `/events/:eventId` | Protected  | `eventId: string` | - | `body: UpdateEventDto` | - |
| DELETE | `/events/:eventId` | Protected  | `eventId: string` | - | - | - |

### Highlights

#### HighlightsController (`/highlights`)

Source: `src/modules/highlights/highlights.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| GET | `/highlights` | Public  | - | - | - | - |

### Mentors

#### ExpertisesController (`/expertises`)

Source: `src/modules/mentors/expertises/expertises.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/expertises` | Protected  | - | - | `body: CreateExpertiseDto` | - |
| GET | `/expertises/paginated` | Protected  | - | `(query object): FilterExpertisesDto` | - | - |
| GET | `/expertises` | Protected  | - | - | - | - |
| GET | `/expertises/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/expertises/:id` | Protected  | `id: string` | - | `body: UpdateExpertiseDto` | - |
| DELETE | `/expertises/:id` | Protected  | `id: string` | - | - | - |

#### MentorsController (`/mentors`)

Source: `src/modules/mentors/mentors.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/mentors` | Protected  | - | - | `body: CreateMentorDto` | - |
| POST | `/mentors/:mentorId/cv` | Protected  | `mentorId: string` | - | - | `file` (single)<br>`cv` (multipart) |
| GET | `/mentors/paginated` | Protected  | - | `(query object): FilterMentorsDto` | - | - |
| PATCH | `/mentors/:mentorId/approve` | Protected  | `mentorId: string` | - | - | - |
| PATCH | `/mentors/:mentorId/reject` | Protected  | `mentorId: string` | - | - | - |
| GET | `/mentors/me` | Protected  | - | - | - | - |
| GET | `/mentors` | Protected  | - | - | - | - |
| GET | `/mentors/:mentorId` | Protected  | `mentorId: string` | - | - | - |
| PATCH | `/mentors/:mentorId` | Protected  | `mentorId: string` | - | `body: UpdateMentorDto` | - |
| DELETE | `/mentors/:mentorId` | Protected  | `mentorId: string` | - | - | - |

### Notifications

#### NotificationsController (`/notifications`)

Source: `src/modules/notifications/notifications.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| GET | `/notifications/project/:projectId` | Protected  | `projectId: string` | `(query object): FilterNotificationsDto` | - | - |
| PATCH | `/notifications/:notificationId/read` | Protected  | `notificationId: string` | - | - | - |
| PATCH | `/notifications/:notificationId` | Protected  | `notificationId: string` | - | `body: UpdateNotificationDto` | - |
| POST | `/notifications/:notificationId/attachments` | Protected  | `notificationId: string` | - | - | `files` (multiple)<br>`attachments` (multipart) |
| DELETE | `/notifications/:notificationId` | Protected  | `notificationId: string` | - | - | - |

### Programs

#### ProgramCategoriesController (`/program-categories`)

Source: `src/modules/programs/categories/categories.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| GET | `/program-categories` | Public  | - | - | - | - |
| POST | `/program-categories` | Protected  | - | - | `body: CreateCategoryDto` | - |
| GET | `/program-categories/paginated` | Protected  | - | `(query object): QueryParams` | - | - |
| GET | `/program-categories/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/program-categories/:id` | Protected  | `id: string` | - | `body: UpdateCategoryDto` | - |
| DELETE | `/program-categories/:id` | Protected  | `id: string` | - | - | - |

#### ProgramsController (`/programs`)

Source: `src/modules/programs/programs.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/programs` | Protected  | - | - | `body: CreateProgramDto` | - |
| GET | `/programs/published` | Public  | - | - | - | - |
| PATCH | `/programs/:programId/publish` | Protected  | `programId: string` | - | - | - |
| POST | `/programs/:programId/logo` | Protected  | `programId: string` | - | - | `file` (single)<br>`logo` (multipart) |
| GET | `/programs/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| GET | `/programs` | Public  | - | - | - | - |
| GET | `/programs/paginated` | Protected  | - | `(query object): FilterProgramsDto` | - | - |
| GET | `/programs/:programId` | Protected  | `programId: string` | - | - | - |
| PATCH | `/programs/:programId/highlight` | Protected  | `programId: string` | - | - | - |
| PATCH | `/programs/:programId` | Protected  | `programId: string` | - | `body: UpdateProgramDto` | - |
| DELETE | `/programs/:programId` | Protected  | `programId: string` | - | - | - |

### Projects

#### PhasesController (`/phases`)

Source: `src/modules/projects/phases/phases.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/phases/:projectId` | Protected  | `projectId: string` | - | `body: CreatePhaseDto` | - |
| GET | `/phases/:phaseId` | Protected  | `phaseId: string` | - | - | - |
| GET | `/phases/project/:projectId` | Protected  | `projectId: string` | - | - | - |
| POST | `/phases/participants/move` | Protected  | - | - | `body: MoveParticipantsDto` | - |
| POST | `/phases/participants/remove` | Protected  | - | - | `body: MoveParticipantsDto` | - |
| PATCH | `/phases/:phaseId` | Protected  | `phaseId: string` | - | `body: UpdatePhaseDto` | - |
| DELETE | `/phases/:phaseId` | Protected  | `phaseId: string` | - | - | - |

#### ProjectCategoriesController (`/project-categories`)

Source: `src/modules/projects/categories/categories.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/project-categories` | Protected  | - | - | `body: CreateCategoryDto` | - |
| GET | `/project-categories` | Public  | - | - | - | - |
| GET | `/project-categories/paginated` | Protected  | - | `(query object): QueryParams` | - | - |
| GET | `/project-categories/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/project-categories/:id` | Protected  | `id: string` | - | `body: UpdateCategoryDto` | - |
| DELETE | `/project-categories/:id` | Protected  | `id: string` | - | - | - |

#### ProjectsController (`/projects`)

Source: `src/modules/projects/projects.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/projects` | Protected  | - | - | `body: CreateProjectDto` | - |
| GET | `/projects` | Protected  | - | `(query object): FilterProjectsDto` | - | - |
| GET | `/projects/recent` | Public  | - | - | - | - |
| GET | `/projects/published` | Public  | - | `(query object): FilterProjectsDto` | - | - |
| GET | `/projects/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| POST | `/projects/:projectId/participate` | Protected  | `projectId: string` | - | `body: ParticipateProjectDto` | - |
| GET | `/projects/me/participations` | Protected  | - | - | - | - |
| GET | `/projects/:projectId/participations` | Protected  | `projectId: string` | - | - | - |
| GET | `/projects/:projectId` | Protected  | `projectId: string` | - | - | - |
| POST | `/projects/:projectId/participants/import-csv` | Protected  | `projectId: string` | - | - | `file` (single) |
| POST | `/projects/:projectId/notifications` | Protected  | `projectId: string` | - | `body: CreateNotificationDto` | - |
| POST | `/projects/notifications/:notificationId/send` | Protected  | `notificationId: string` | - | - | - |
| POST | `/projects/:projectId/gallery` | Protected  | `projectId: string` | - | - | `file` (single)<br>`image` (multipart) |
| DELETE | `/projects/gallery/:galleryId` | Protected  | `galleryId: string` | - | - | - |
| GET | `/projects/by-slug/:slug/gallery` | Public  | `slug: string` | - | - | - |
| PATCH | `/projects/:projectId/publish` | Protected  | `projectId: string` | - | - | - |
| POST | `/projects/:projectId/cover` | Protected  | `projectId: string` | - | - | `file` (single)<br>`cover` (multipart) |
| PATCH | `/projects/:projectId/highlight` | Protected  | `projectId: string` | - | - | - |
| PATCH | `/projects/:projectId` | Protected  | `projectId: string` | - | `body: UpdateProjectDto` | - |
| DELETE | `/projects/:projectId` | Protected  | `projectId: string` | - | - | - |

### Stats

#### StatsController (`/stats`)

Source: `src/modules/stats/stats.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| GET | `/stats/me` | Protected  | - | - | - | - |
| GET | `/stats/admin/overview` | Protected  | - | - | - | - |
| GET | `/stats/admin/year/:year` | Public  | `year: number` | - | - | - |

### Subprograms

#### SubprogramsController (`/subprograms`)

Source: `src/modules/subprograms/subprograms.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/subprograms` | Protected  | - | - | `body: CreateSubprogramDto` | - |
| GET | `/subprograms` | Public  | - | - | - | - |
| PATCH | `/subprograms/:subprogramId/publish` | Protected  | `subprogramId: string` | - | - | - |
| POST | `/subprograms/:subprogramId/logo` | Protected  | `subprogramId: string` | - | - | `file` (single)<br>`logo` (multipart) |
| GET | `/subprograms/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| GET | `/subprograms/program/:programId` | Public  | `programId: string` | - | - | - |
| GET | `/subprograms/program/:programId/paginated` | Protected  | `programId: string` | `(query object): FilterSubprogramDto` | - | - |
| GET | `/subprograms/:subprogramId` | Protected  | `subprogramId: string` | - | - | - |
| PATCH | `/subprograms/:subprogramId/highlight` | Protected  | `subprogramId: string` | - | - | - |
| PATCH | `/subprograms/:subprogramId` | Protected  | `subprogramId: string` | - | `body: UpdateSubprogramDto` | - |
| DELETE | `/subprograms/:subprogramId` | Protected  | `subprogramId: string` | - | - | - |

### Users

#### RolesController (`/roles`)

Source: `src/modules/users/roles/roles.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/roles` | Protected  | - | - | `body: CreateRoleDto` | - |
| GET | `/roles/paginated` | Protected  | - | `(query object): FilterRolesDto` | - | - |
| GET | `/roles` | Protected  | - | - | - | - |
| GET | `/roles/:id` | Protected  | `id: string` | - | - | - |
| PATCH | `/roles/:id` | Protected  | `id: string` | - | `body: UpdateRoleDto` | - |
| DELETE | `/roles/:id` | Protected  | `id: string` | - | - | - |

#### UsersController (`/users`)

Source: `src/modules/users/users.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/users/referral-code/generate` | Protected  | - | - | - | - |
| GET | `/users/staff` | Protected  | - | - | - | - |
| GET | `/users/ambassadors` | Public  | - | `(query object): FilterUsersDto` | - | - |
| GET | `/users/ambassadors/:email` | Public  | `email: string` | - | - | - |
| GET | `/users/me/referred-users` | Protected  | - | `page: number` | - | - |
| POST | `/users` | Protected  | - | - | `body: CreateUserDto` | - |
| GET | `/users/export/users.csv` | Protected  | - | `(query object): FilterUsersDto` | - | - |
| GET | `/users` | Protected  | - | `(query object): FilterUsersDto` | - | - |
| GET | `/users/entrepreneurs` | Public  | - | - | - | - |
| GET | `/users/:email` | Public  | `email: string` | - | - | - |
| PATCH | `/users/:userId` | Protected  | `userId: string` | - | `body: UpdateUserDto` | - |
| POST | `/users/me/profile-image` | Protected  | - | - | - | `file` (single)<br>`profile` (multipart) |
| DELETE | `/users/:userId` | Protected  | `userId: string` | - | - | - |

### Ventures

#### ProductsController (`/products`)

Source: `src/modules/ventures/products/products.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/products` | Protected  | - | - | `body: CreateProductDto` | - |
| POST | `/products/:productId/gallery` | Protected  | `productId: string` | - | - | `file` (single)<br>`image` (multipart) |
| DELETE | `/products/gallery/:galleryId` | Protected  | `galleryId: string` | - | - | - |
| GET | `/products/by-slug/:slug/gallery` | Public  | `slug: string` | - | - | - |
| GET | `/products/me` | Protected  | - | `(query object): FilterProductsDto` | - | - |
| GET | `/products/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| PATCH | `/products/by-slug/:slug` | Protected  | `slug: string` | - | `body: UpdateProductDto` | - |
| DELETE | `/products/:id` | Protected  | `id: string` | - | - | - |

#### VenturesController (`/ventures`)

Source: `src/modules/ventures/ventures.controller.ts`

| Method | Path | Auth | Params | Query | Body | Files |
|---|---|---|---|---|---|---|
| POST | `/ventures` | Protected  | - | - | `body: CreateVentureDto` | - |
| GET | `/ventures/published` | Public  | - | - | - | - |
| GET | `/ventures` | Protected  | - | `(query object): FilterVenturesDto` | - | - |
| GET | `/ventures/by-slug/:slug` | Public  | `slug: string` | - | - | - |
| PATCH | `/ventures/by-slug/:slug/publish` | Protected  | `slug: string` | - | - | - |
| GET | `/ventures/me/paginated` | Protected  | - | `page: string` | - | - |
| GET | `/ventures/me` | Protected  | - | - | - | - |
| POST | `/ventures/:ventureId/gallery` | Protected  | `ventureId: string` | - | - | `file` (single)<br>`image` (multipart) |
| DELETE | `/ventures/gallery/:galleryId` | Protected  | `galleryId: string` | - | - | - |
| GET | `/ventures/by-slug/:slug/gallery` | Public  | `slug: string` | - | - | - |
| POST | `/ventures/:ventureId/logo` | Protected  | `ventureId: string` | - | - | `file` (single)<br>`logo` (multipart) |
| POST | `/ventures/:ventureId/cover` | Protected  | `ventureId: string` | - | - | `file` (single)<br>`cover` (multipart) |
| GET | `/ventures/:ventureId` | Protected  | `ventureId: string` | - | - | - |
| PATCH | `/ventures/:slug` | Protected  | `slug: string` | - | `body: UpdateVentureDto` | - |
| DELETE | `/ventures/:id` | Protected  | `id: string` | - | - | - |

## DTO Reference

### Auth

#### ContactSupportDto

Source: `src/core/auth/dto/contact-support.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `email` | `string` | Yes | - |
| `name` | `string` | Yes | - |
| `country` | `string` | Yes | - |
| `phone_number` | `string` | Yes | - |
| `message` | `string` | Yes | - |

#### CreateWithGoogleDto

Source: `src/core/auth/dto/sign-up-with-google.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | - |
| `email` | `string` | Yes | - |
| `google_image` | `string` | Yes | - |

#### ForgotPasswordDto

Source: `src/core/auth/dto/forgot-password.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `email` | `string` | Yes | @IsEmail |

#### ResetPasswordDto

Source: `src/core/auth/dto/reset-password.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `token` | `string` | Yes | @IsNotEmpty |
| `password` | `string` | Yes | @MinLength(6) |
| `password_confirm` | `string` | Yes | @Match('password') |

#### SignInDto

Source: `src/core/auth/dto/sign-in.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `email` | `string` | Yes | @IsNotEmpty |
| `password` | `string` | Yes | @IsNotEmpty |

#### SignUpDto

Source: `src/core/auth/dto/sign-up.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `email` | `string` | Yes | @IsEmail |
| `name` | `string` | Yes | @IsNotEmpty |
| `phone_number` | `string` | Yes | @IsNotEmpty |
| `gender` | `string` | Yes | @IsNotEmpty |
| `birth_date` | `Date` | Yes | @IsNotEmpty |
| `country` | `string` | Yes | @IsNotEmpty |
| `password` | `string` | Yes | @MinLength(6) |
| `password_confirm` | `string` | Yes | @Match('password', { message: 'Passwords do not match' }) |
| `referral_code` | `string` | Yes | @IsOptional |

#### UpdatePasswordDto

Source: `src/core/auth/dto/update-password.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `password` | `string` | Yes | @MinLength(6) |
| `password_confirm` | `string` | Yes | @IsNotEmpty<br>@Match('password') |

#### UpdateProfileDto

Source: `src/core/auth/dto/update-profile.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `email` | `string` | Yes | @IsEmail |
| `name` | `string` | Yes | @IsNotEmpty |
| `phone_number` | `string` | Yes | @IsNotEmpty |
| `gender` | `string` | Yes | @IsNotEmpty |
| `city` | `string` | Yes | @IsNotEmpty |
| `birth_date` | `Date` | Yes | @IsNotEmpty |
| `country` | `string` | Yes | @IsNotEmpty |
| `biography` | `string` | Yes | @IsOptional |
| `roles` | `string[]` | Yes | @IsOptional |

### Blog

#### CreateArticleDto

Source: `src/modules/blog/articles/dto/create-article.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `published_at` | `string` | Yes | @IsOptional |
| `title` | `string` | Yes | @IsNotEmpty |
| `content` | `string` | Yes | @IsNotEmpty |
| `tags` | `string[]` | Yes | @IsArray |

#### CreateCommentDto

Source: `src/modules/blog/comments/dto/create-comment.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `articleId` | `string` | Yes | @IsNotEmpty |
| `content` | `string` | Yes | @IsNotEmpty |

#### CreateTagDto

Source: `src/modules/blog/tags/dto/create-tag.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty |

#### FilterArticlesDto

Source: `src/modules/blog/articles/dto/filter-articles.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |
| `filter` | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No | - |

#### FilterCommentsDto

Source: `src/modules/blog/comments/dto/filter-comments.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |

#### FilterTagsDto

Source: `src/modules/blog/tags/dto/filter-tags.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `q` | `string \| null` | Yes | - |
| `page` | `string \| null` | Yes | - |

#### UpdateArticleDto

Source: `src/modules/blog/articles/dto/update-article.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateArticleDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateCommentDto

Source: `src/modules/blog/comments/dto/update-comment.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateCommentDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateTagDto

Source: `src/modules/blog/tags/dto/update-tag.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateTagDto)`

No direct fields in this class (mapped/composed DTO).

### Events

#### CreateCategoryDto

Source: `src/modules/events/categories/dto/create-category.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty |

#### CreateEventDto

Source: `src/modules/events/dto/create-event.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty |
| `place` | `string` | Yes | @IsNotEmpty |
| `description` | `string` | Yes | @IsNotEmpty |
| `context` | `string` | No | @IsOptional |
| `objectives` | `string` | No | @IsOptional |
| `duration_hours` | `number` | No | @IsOptional |
| `selection_criteria` | `string` | No | @IsOptional |
| `started_at` | `Date` | Yes | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty |
| `ended_at` | `Date` | Yes | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty |
| `event_manager` | `string` | No | @IsOptional |
| `program` | `string` | Yes | @IsNotEmpty |
| `categories` | `string[]` | Yes | @IsNotEmpty |

#### FilterEventsDto

Source: `src/modules/events/dto/filter-events.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |
| `categories` | `string[]` | Yes | - |
| `filter` | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No | - |

#### ParticipateEventDto

Source: `src/modules/events/dto/participate-event.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `venture_id` | `string` | No | @IsOptional<br>@IsUUID |

#### UpdateCategoryDto

Source: `src/modules/events/categories/dto/update-category.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateCategoryDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateEventDto

Source: `src/modules/events/dto/update-event.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateEventDto)`

No direct fields in this class (mapped/composed DTO).

### Galleries

#### AddGalleryDto

Source: `src/modules/galleries/dto/add-gallery.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `image` | `string` | Yes | - |

### Mentors

#### CreateExperienceDto

Source: `src/modules/mentors/dto/create-experience.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `id` | `string` | No | @IsOptional<br>@IsString |
| `company_name` | `string` | Yes | - |
| `job_title` | `string` | Yes | - |
| `is_current` | `boolean` | Yes | - |
| `start_date` | `Date` | Yes | @Transform(({ value }) => new Date(value)) |
| `end_date` | `Date` | No | @Transform(({ value }) => new Date(value))<br>@IsOptional |

#### CreateExpertiseDto

Source: `src/modules/mentors/expertises/dto/create-expertise.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | - |

#### CreateMentorDto

Source: `src/modules/mentors/dto/create-mentor.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `years_experience` | `number` | Yes | - |
| `expertises` | `string[]` | Yes | - |
| `experiences` | `CreateExperienceDto[]` | Yes | @IsArray<br>@ValidateNested({ each: true })<br>@Type(() => CreateExperienceDto) |

#### FilterExpertisesDto

Source: `src/modules/mentors/expertises/dto/filter-expertises.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |

#### FilterMentorsDto

Source: `src/modules/mentors/dto/filter-mentors.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |
| `status` | `MentorStatus \| null` | Yes | - |

#### UpdateExpertiseDto

Source: `src/modules/mentors/expertises/dto/update-expertise.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateExpertiseDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateMentorDto

Source: `src/modules/mentors/dto/update-mentor.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateMentorDto)`

No direct fields in this class (mapped/composed DTO).

### Notifications

#### CreateNotificationDto

Source: `src/modules/notifications/dto/create-notification.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `title` | `string` | Yes | @IsNotEmpty |
| `body` | `string` | Yes | @IsNotEmpty |
| `phase_id` | `string` | No | @IsOptional |

#### FilterNotificationsDto

Source: `src/modules/notifications/dto/filter-notifications.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `phaseId` | `string \| null` | No | - |
| `page` | `string \| null` | Yes | - |
| `status` | `NotificationStatus \| null` | No | - |

#### UpdateNotificationDto

Source: `src/modules/notifications/dto/update-notification.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateNotificationDto)`

No direct fields in this class (mapped/composed DTO).

### Programs

#### CreateCategoryDto

Source: `src/modules/programs/categories/dto/create-category.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty |

#### CreateProgramDto

Source: `src/modules/programs/dto/create-program.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | - |
| `description` | `string` | Yes | - |
| `category` | `string` | Yes | - |

#### FilterProgramsDto

Source: `src/modules/programs/dto/filter-programs.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |
| `filter` | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No | - |

#### UpdateCategoryDto

Source: `src/modules/programs/categories/dto/update-category.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateCategoryDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateProgramDto

Source: `src/modules/programs/dto/update-program.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateProgramDto)`

No direct fields in this class (mapped/composed DTO).

### Projects

#### CreateCategoryDto

Source: `src/modules/projects/categories/dto/create-category.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty({ message: 'Le nom est obligatoire' }) |

#### CreatePhaseDto

Source: `src/modules/projects/phases/dto/create-phase.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsString |
| `description` | `string` | Yes | @IsString |
| `started_at` | `Date` | Yes | @IsDate<br>@Transform(({ value }) => new Date(value)) |
| `ended_at` | `Date` | Yes | @IsDate<br>@Transform(({ value }) => new Date(value)) |

#### CreateProjectDto

Source: `src/modules/projects/dto/create-project.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty |
| `description` | `string` | Yes | @IsNotEmpty |
| `context` | `string` | No | @IsOptional |
| `objectives` | `string` | No | @IsOptional |
| `duration_hours` | `number` | No | @IsOptional<br>@Transform(({ value }) => (value ? +value : null)) |
| `selection_criteria` | `string` | No | @IsOptional |
| `started_at` | `Date` | Yes | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty |
| `ended_at` | `Date` | Yes | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty |
| `project_manager` | `string` | No | @IsOptional |
| `program` | `string` | Yes | @IsNotEmpty |
| `categories` | `string[]` | Yes | @IsArray<br>@IsNotEmpty |

#### FilterProjectsDto

Source: `src/modules/projects/dto/filter-projects.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | No | - |
| `q` | `string \| null` | No | - |
| `categories` | `string[] \| string` | No | - |
| `status` | `'past' \| 'current' \| 'future' \| null` | No | - |
| `filter` | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No | - |

#### MoveParticipantsDto

Source: `src/modules/projects/phases/dto/move-participants.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `ids` | `string[]` | Yes | @IsArray<br>@IsString({ each: true }) |
| `phaseId` | `string` | Yes | @IsUUID |

#### ParticipateProjectDto

Source: `src/modules/projects/dto/participate.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `ventureId` | `string` | No | @IsOptional<br>@IsUUID |

#### UpdateCategoryDto

Source: `src/modules/projects/categories/dto/update-category.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateCategoryDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdatePhaseDto

Source: `src/modules/projects/phases/dto/update-phase.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreatePhaseDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateProjectDto

Source: `src/modules/projects/dto/update-project.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateProjectDto)`

No direct fields in this class (mapped/composed DTO).

### Subprograms

#### CreateSubprogramDto

Source: `src/modules/subprograms/dto/create-subprogram.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty |
| `description` | `string` | Yes | @IsNotEmpty |
| `programId` | `string` | Yes | @IsNotEmpty |

#### FilterSubprogramDto

Source: `src/modules/subprograms/dto/filter-subprogram.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |

#### UpdateSubprogramDto

Source: `src/modules/subprograms/dto/update-subprogram.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateSubprogramDto)`

No direct fields in this class (mapped/composed DTO).

### Users

#### CreateFromCsvDto

Source: `src/modules/users/dto/create-from-csv.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | - |
| `email` | `string` | Yes | - |
| `phone_number` | `string` | No | - |

#### CreateRoleDto

Source: `src/modules/users/roles/dto/create-role.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | @IsNotEmpty({ message: 'Le nom du rôle est obligatoire' }) |

#### CreateUserDto

Source: `src/modules/users/dto/create-user.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `email` | `string` | Yes | @IsEmail |
| `name` | `string` | Yes | @IsNotEmpty |
| `phone_number` | `string` | Yes | @IsNotEmpty |
| `gender` | `string` | Yes | @IsNotEmpty |
| `city` | `string` | Yes | @IsNotEmpty |
| `birth_date` | `Date` | Yes | @IsNotEmpty |
| `country` | `string` | Yes | @IsNotEmpty |
| `biography` | `string` | Yes | @IsOptional |
| `roles` | `string[]` | Yes | @IsNotEmpty |

#### FilterRolesDto

Source: `src/modules/users/roles/dto/filter-roles.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |

#### FilterUsersDto

Source: `src/modules/users/dto/filter-users.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |

#### UpdateRoleDto

Source: `src/modules/users/roles/dto/update-role.dto.ts`
Type: `class`
Extends/Implements: `PartialType<CreateRoleDto>(CreateRoleDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateUserDto

Source: `src/modules/users/dto/update-user.dto.ts`
Type: `class`
Extends/Implements: `PartialType<CreateUserDto>(CreateUserDto)`

No direct fields in this class (mapped/composed DTO).

### Ventures

#### CreateProductDto

Source: `src/modules/ventures/products/dto/create-product.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `ventureId` | `string` | Yes | @IsNotEmpty |
| `name` | `string` | Yes | @IsNotEmpty |
| `description` | `string` | Yes | @IsNotEmpty |
| `price` | `number` | Yes | @IsNotEmpty |

#### CreateVentureDto

Source: `src/modules/ventures/dto/create-venture.dto.ts`
Type: `class`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `name` | `string` | Yes | - |
| `description` | `string` | Yes | - |
| `problem_solved` | `string` | Yes | - |
| `target_market` | `string` | Yes | - |
| `email` | `string` | Yes | @IsOptional |
| `phone_number` | `string` | Yes | @IsOptional |
| `website` | `string` | Yes | @IsOptional |
| `linkedin_url` | `string` | Yes | @IsOptional |
| `sector` | `string` | Yes | @IsOptional |
| `founded_at` | `Date` | Yes | @IsOptional<br>@Transform(({ value }) => new Date(value)) |
| `location` | `string` | Yes | @IsOptional |
| `stage` | `string` | Yes | @IsOptional |

#### FilterProductsDto

Source: `src/modules/ventures/products/dto/filter-products.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string` | Yes | - |

#### FilterVenturesDto

Source: `src/modules/ventures/dto/filter-ventures.dto.ts`
Type: `interface`

| Field | Type | Required | Validation / Transform decorators |
|---|---|---|---|
| `page` | `string \| null` | Yes | - |
| `q` | `string \| null` | Yes | - |

#### UpdateProductDto

Source: `src/modules/ventures/products/dto/update-product.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateProductDto)`

No direct fields in this class (mapped/composed DTO).

#### UpdateVentureDto

Source: `src/modules/ventures/dto/update-venture.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateVentureDto)`

No direct fields in this class (mapped/composed DTO).

## Notes

- Global input validation uses `ValidationPipe({ transform: true })` in `src/main.ts`.
- File endpoints require `multipart/form-data`; use exact field names from the `Files` column.