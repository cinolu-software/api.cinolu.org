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

| Method | Path                    | Auth      | Roles | Params | Query | Body                      | Files |
| ------ | ----------------------- | --------- | ----- | ------ | ----- | ------------------------- | ----- |
| POST   | `/auth/support/contact` | Public    | -     | -      | -     | `body: ContactSupportDto` | -     |
| POST   | `/auth/signup`          | Public    | -     | -      | -     | `body: SignUpDto`         | -     |
| POST   | `/auth/signin`          | Public    | -     | -      | -     | -                         | -     |
| GET    | `/auth/google`          | Public    | -     | -      | -     | -                         | -     |
| GET    | `/auth/google/callback` | Public    | -     | -      | -     | -                         | -     |
| POST   | `/auth/signout`         | Protected | -     | -      | -     | -                         | -     |
| GET    | `/auth/me`              | Protected | -     | -      | -     | -                         | -     |
| PATCH  | `/auth/me`              | Protected | -     | -      | -     | `body: UpdateProfileDto`  | -     |
| PATCH  | `/auth/me/password`     | Protected | -     | -      | -     | `body: UpdatePasswordDto` | -     |
| POST   | `/auth/password/forgot` | Public    | -     | -      | -     | `body: ForgotPasswordDto` | -     |
| POST   | `/auth/password/reset`  | Public    | -     | -      | -     | `body: ResetPasswordDto`  | -     |

### Blog

#### ArticlesController (`/articles`)

Source: `src/modules/blog/articles/articles.controller.ts`

| Method | Path                              | Auth      | Roles                                   | Params              | Query                               | Body                     | Files                                    |
| ------ | --------------------------------- | --------- | --------------------------------------- | ------------------- | ----------------------------------- | ------------------------ | ---------------------------------------- |
| POST   | `/articles`                       | Protected | { resource: 'blogs', action: 'create' } | -                   | -                                   | `body: CreateArticleDto` | -                                        |
| GET    | `/articles/recent`                | Public    | -                                       | -                   | -                                   | -                        | -                                        |
| GET    | `/articles`                       | Protected | { resource: 'blogs', action: 'read' }   | -                   | `(query object): FilterArticlesDto` | -                        | -                                        |
| POST   | `/articles/:articleId/gallery`    | Protected | { resource: 'blogs', action: 'update' } | `articleId: string` | -                                   | -                        | `file` (single)<br>`image` (multipart)   |
| DELETE | `/articles/gallery/:galleryId`    | Protected | { resource: 'blogs', action: 'update' } | `galleryId: string` | -                                   | -                        | -                                        |
| GET    | `/articles/by-slug/:slug/gallery` | Public    | -                                       | `slug: string`      | -                                   | -                        | -                                        |
| POST   | `/articles/:articleId/cover`      | Protected | { resource: 'blogs', action: 'update' } | `articleId: string` | -                                   | -                        | `file` (single)<br>`article` (multipart) |
| GET    | `/articles/published`             | Public    | -                                       | -                   | `(query object): FilterArticlesDto` | -                        | -                                        |
| PATCH  | `/articles/:articleId/publish`    | Protected | { resource: 'blogs', action: 'update' } | `articleId: string` | -                                   | -                        | -                                        |
| GET    | `/articles/by-slug/:slug`         | Public    | -                                       | `slug: string`      | -                                   | -                        | -                                        |
| GET    | `/articles/:articleId`            | Protected | { resource: 'blogs', action: 'read' }   | `articleId: string` | -                                   | -                        | -                                        |
| PATCH  | `/articles/:articleId/highlight`  | Protected | { resource: 'blogs', action: 'update' } | `articleId: string` | -                                   | -                        | -                                        |
| PATCH  | `/articles/:articleId`            | Protected | { resource: 'blogs', action: 'update' } | `articleId: string` | -                                   | `body: UpdateArticleDto` | -                                        |
| DELETE | `/articles/:articleId`            | Protected | { resource: 'blogs', action: 'delete' } | `articleId: string` | -                                   | -                        | -                                        |

#### CommentsController (`/comments`)

Source: `src/modules/blog/comments/comments.controller.ts`

| Method | Path                         | Auth      | Roles                                      | Params         | Query                               | Body                     | Files |
| ------ | ---------------------------- | --------- | ------------------------------------------ | -------------- | ----------------------------------- | ------------------------ | ----- |
| POST   | `/comments`                  | Protected | -                                          | -              | -                                   | `body: CreateCommentDto` | -     |
| GET    | `/comments`                  | Protected | { resource: 'comments', action: 'read' }   | -              | -                                   | -                        | -     |
| GET    | `/comments/by-article/:slug` | Public    | -                                          | `slug: string` | `(query object): FilterCommentsDto` | -                        | -     |
| GET    | `/comments/:id`              | Protected | { resource: 'comments', action: 'read' }   | `id: string`   | -                                   | -                        | -     |
| PATCH  | `/comments/:id`              | Protected | { resource: 'comments', action: 'update' } | `id: string`   | -                                   | `body: UpdateCommentDto` | -     |
| DELETE | `/comments/:id`              | Protected | { resource: 'comments', action: 'delete' } | `id: string`   | -                                   | -                        | -     |

#### TagsController (`/tags`)

Source: `src/modules/blog/tags/tags.controller.ts`

| Method | Path              | Auth      | Roles                                  | Params       | Query                           | Body                 | Files |
| ------ | ----------------- | --------- | -------------------------------------- | ------------ | ------------------------------- | -------------------- | ----- |
| POST   | `/tags`           | Protected | { resource: 'tags', action: 'create' } | -            | -                               | `body: CreateTagDto` | -     |
| GET    | `/tags/paginated` | Protected | { resource: 'tags', action: 'read' }   | -            | `(query object): FilterTagsDto` | -                    | -     |
| GET    | `/tags`           | Public    | -                                      | -            | -                               | -                    | -     |
| GET    | `/tags/:id`       | Protected | { resource: 'tags', action: 'read' }   | `id: string` | -                               | -                    | -     |
| PATCH  | `/tags/:id`       | Protected | { resource: 'tags', action: 'update' } | `id: string` | -                               | `body: UpdateTagDto` | -     |
| DELETE | `/tags/:id`       | Protected | { resource: 'tags', action: 'update' } | `id: string` | -                               | -                    | -     |

### Events

#### CategoriesController (`/events/categories`)

Source: `src/modules/events/categories/categories.controller.ts`

| Method | Path                           | Auth      | Roles                                             | Params       | Query                         | Body                      | Files |
| ------ | ------------------------------ | --------- | ------------------------------------------------- | ------------ | ----------------------------- | ------------------------- | ----- |
| POST   | `/events/categories`           | Protected | { resource: 'eventCategories', action: 'create' } | -            | -                             | `body: CreateCategoryDto` | -     |
| GET    | `/events/categories`           | Public    | -                                                 | -            | -                             | -                         | -     |
| GET    | `/events/categories/paginated` | Protected | { resource: 'eventCategories', action: 'read' }   | -            | `(query object): QueryParams` | -                         | -     |
| GET    | `/events/categories/:id`       | Protected | { resource: 'eventCategories', action: 'read' }   | `id: string` | -                             | -                         | -     |
| PATCH  | `/events/categories/:id`       | Protected | { resource: 'eventCategories', action: 'update' } | `id: string` | -                             | `body: UpdateCategoryDto` | -     |
| DELETE | `/events/categories/:id`       | Protected | { resource: 'eventCategories', action: 'delete' } | `id: string` | -                             | -                         | -     |

#### EventsController (`/events`)

Source: `src/modules/events/events.controller.ts`

| Method | Path                              | Auth      | Roles                                    | Params              | Query                             | Body                   | Files                                  |
| ------ | --------------------------------- | --------- | ---------------------------------------- | ------------------- | --------------------------------- | ---------------------- | -------------------------------------- |
| POST   | `/events`                         | Protected | { resource: 'events', action: 'create' } | -                   | -                                 | `body: CreateEventDto` | -                                      |
| GET    | `/events`                         | Protected | { resource: 'events', action: 'read' }   | -                   | `(query object): FilterEventsDto` | -                      | -                                      |
| GET    | `/events/recent`                  | Public    | -                                        | -                   | -                                 | -                      | -                                      |
| GET    | `/events/published`               | Public    | -                                        | -                   | `(query object): FilterEventsDto` | -                      | -                                      |
| GET    | `/events/by-slug/:slug`           | Public    | -                                        | `slug: string`      | -                                 | -                      | -                                      |
| GET    | `/events/:eventId`                | Protected | { resource: 'events', action: 'read' }   | `eventId: string`   | -                                 | -                      | -                                      |
| POST   | `/events/:eventId/participate`    | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | -                      | -                                      |
| DELETE | `/events/:eventId/participate`    | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | -                      | -                                      |
| GET    | `/events/:eventId/participations` | Protected | { resource: 'events', action: 'read' }   | `eventId: string`   | -                                 | -                      | -                                      |
| PATCH  | `/events/:eventId/publish`        | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | -                      | -                                      |
| POST   | `/events/:eventId/gallery`        | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | -                      | `file` (single)<br>`image` (multipart) |
| DELETE | `/events/gallery/:galleryId`      | Protected | { resource: 'events', action: 'update' } | `galleryId: string` | -                                 | -                      | -                                      |
| GET    | `/events/by-slug/:slug/gallery`   | Public    | -                                        | `slug: string`      | -                                 | -                      | -                                      |
| POST   | `/events/:eventId/cover`          | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | -                      | `file` (single)<br>`cover` (multipart) |
| PATCH  | `/events/:eventId/highlight`      | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | -                      | -                                      |
| PATCH  | `/events/:eventId`                | Protected | { resource: 'events', action: 'update' } | `eventId: string`   | -                                 | `body: UpdateEventDto` | -                                      |
| DELETE | `/events/:eventId`                | Protected | { resource: 'events', action: 'delete' } | `eventId: string`   | -                                 | -                      | -                                      |

### Highlights

#### HighlightsController (`/highlights`)

Source: `src/modules/highlights/highlights.controller.ts`

| Method | Path          | Auth   | Roles | Params | Query | Body | Files |
| ------ | ------------- | ------ | ----- | ------ | ----- | ---- | ----- |
| GET    | `/highlights` | Public | -     | -      | -     | -    | -     |

### Mentors

#### ExpertisesController (`/expertises`)

Source: `src/modules/mentors/expertises/expertises.controller.ts`

| Method | Path                    | Auth      | Roles                                        | Params       | Query                                 | Body                       | Files |
| ------ | ----------------------- | --------- | -------------------------------------------- | ------------ | ------------------------------------- | -------------------------- | ----- |
| POST   | `/expertises`           | Protected | { resource: 'expertises', action: 'create' } | -            | -                                     | `body: CreateExpertiseDto` | -     |
| GET    | `/expertises/paginated` | Protected | { resource: 'expertises', action: 'read' }   | -            | `(query object): FilterExpertisesDto` | -                          | -     |
| GET    | `/expertises`           | Protected | -                                            | -            | -                                     | -                          | -     |
| GET    | `/expertises/:id`       | Protected | { resource: 'expertises', action: 'read' }   | `id: string` | -                                     | -                          | -     |
| PATCH  | `/expertises/:id`       | Protected | { resource: 'expertises', action: 'update' } | `id: string` | -                                     | `body: UpdateExpertiseDto` | -     |
| DELETE | `/expertises/:id`       | Protected | { resource: 'expertises', action: 'delete' } | `id: string` | -                                     | -                          | -     |

#### MentorsController (`/mentors`)

Source: `src/modules/mentors/mentors.controller.ts`

| Method | Path                         | Auth      | Roles                                                        | Params             | Query                              | Body                    | Files                               |
| ------ | ---------------------------- | --------- | ------------------------------------------------------------ | ------------------ | ---------------------------------- | ----------------------- | ----------------------------------- |
| POST   | `/mentors`                   | Protected | -                                                            | -                  | -                                  | `body: CreateMentorDto` | -                                   |
| POST   | `/mentors/:mentorId/cv`      | Protected | { resource: 'addCV', action: 'update', possession: 'own' }   | `mentorId: string` | -                                  | -                       | `file` (single)<br>`cv` (multipart) |
| GET    | `/mentors/paginated`         | Protected | { resource: 'mentors', action: 'read' }                      | -                  | `(query object): FilterMentorsDto` | -                       | -                                   |
| PATCH  | `/mentors/:mentorId/approve` | Protected | { resource: 'mentorApplications', action: 'update' }         | `mentorId: string` | -                                  | -                       | -                                   |
| PATCH  | `/mentors/:mentorId/reject`  | Protected | { resource: 'mentorApplications', action: 'update' }         | `mentorId: string` | -                                  | -                       | -                                   |
| GET    | `/mentors/me`                | Protected | -                                                            | -                  | -                                  | -                       | -                                   |
| GET    | `/mentors`                   | Protected | { resource: 'mentors', action: 'read' }                      | -                  | -                                  | -                       | -                                   |
| GET    | `/mentors/:mentorId`         | Protected | { resource: 'mentors', action: 'read' }                      | `mentorId: string` | -                                  | -                       | -                                   |
| PATCH  | `/mentors/:mentorId`         | Protected | { resource: 'mentors', action: 'update', possession: 'own' } | `mentorId: string` | -                                  | `body: UpdateMentorDto` | -                                   |
| DELETE | `/mentors/:mentorId`         | Protected | { resource: 'mentors', action: 'delete', possession: 'own' } | `mentorId: string` | -                                  | -                       | -                                   |

### Notifications

#### NotificationsController (`/notifications`)

Source: `src/modules/notifications/notifications.controller.ts`

| Method | Path                                         | Auth      | Roles                                           | Params                   | Query                                    | Body                          | Files                                           |
| ------ | -------------------------------------------- | --------- | ----------------------------------------------- | ------------------------ | ---------------------------------------- | ----------------------------- | ----------------------------------------------- |
| GET    | `/notifications/project/:projectId`          | Protected | { resource: 'projects', action: 'read' }        | `projectId: string`      | `(query object): FilterNotificationsDto` | -                             | -                                               |
| PATCH  | `/notifications/:notificationId/read`        | Protected | { resource: 'notifications', action: 'update' } | `notificationId: string` | -                                        | -                             | -                                               |
| PATCH  | `/notifications/:notificationId`             | Protected | { resource: 'notifications', action: 'update' } | `notificationId: string` | -                                        | `body: UpdateNotificationDto` | -                                               |
| POST   | `/notifications/:notificationId/attachments` | Protected | { resource: 'notifications', action: 'update' } | `notificationId: string` | -                                        | -                             | `files` (multiple)<br>`attachments` (multipart) |
| DELETE | `/notifications/:notificationId`             | Protected | { resource: 'notifications', action: 'delete' } | `notificationId: string` | -                                        | -                             | -                                               |

### Programs

#### CategoriesController (`/programs/categories`)

Source: `src/modules/programs/categories/categories.controller.ts`

| Method | Path                             | Auth      | Roles                                               | Params       | Query                         | Body                      | Files |
| ------ | -------------------------------- | --------- | --------------------------------------------------- | ------------ | ----------------------------- | ------------------------- | ----- |
| POST   | `/programs/categories`           | Protected | { resource: 'programCategories', action: 'create' } | -            | -                             | `body: CreateCategoryDto` | -     |
| GET    | `/programs/categories`           | Public    | -                                                   | -            | -                             | -                         | -     |
| GET    | `/programs/categories/paginated` | Protected | { resource: 'programCategories', action: 'read' }   | -            | `(query object): QueryParams` | -                         | -     |
| GET    | `/programs/categories/:id`       | Protected | { resource: 'programCategories', action: 'read' }   | `id: string` | -                             | -                         | -     |
| PATCH  | `/programs/categories/:id`       | Protected | { resource: 'programCategories', action: 'update' } | `id: string` | -                             | `body: UpdateCategoryDto` | -     |
| DELETE | `/programs/categories/:id`       | Protected | { resource: 'programCategories', action: 'delete' } | `id: string` | -                             | -                         | -     |

#### ProgramsController (`/programs`)

Source: `src/modules/programs/programs.controller.ts`

| Method | Path                             | Auth      | Roles                                      | Params              | Query                               | Body                     | Files                                 |
| ------ | -------------------------------- | --------- | ------------------------------------------ | ------------------- | ----------------------------------- | ------------------------ | ------------------------------------- |
| POST   | `/programs`                      | Protected | { resource: 'programs', action: 'create' } | -                   | -                                   | `body: CreateProgramDto` | -                                     |
| GET    | `/programs/published`            | Public    | -                                          | -                   | -                                   | -                        | -                                     |
| PATCH  | `/programs/:programId/publish`   | Protected | { resource: 'programs', action: 'update' } | `programId: string` | -                                   | -                        | -                                     |
| POST   | `/programs/:programId/logo`      | Protected | { resource: 'programs', action: 'update' } | `programId: string` | -                                   | -                        | `file` (single)<br>`logo` (multipart) |
| GET    | `/programs/by-slug/:slug`        | Public    | -                                          | `slug: string`      | -                                   | -                        | -                                     |
| GET    | `/programs`                      | Public    | -                                          | -                   | -                                   | -                        | -                                     |
| GET    | `/programs/paginated`            | Protected | { resource: 'programs', action: 'read' }   | -                   | `(query object): FilterProgramsDto` | -                        | -                                     |
| GET    | `/programs/:programId`           | Protected | { resource: 'programs', action: 'update' } | `programId: string` | -                                   | -                        | -                                     |
| PATCH  | `/programs/:programId/highlight` | Protected | { resource: 'programs', action: 'update' } | `programId: string` | -                                   | -                        | -                                     |
| PATCH  | `/programs/:programId`           | Protected | { resource: 'programs', action: 'update' } | `programId: string` | -                                   | `body: UpdateProgramDto` | -                                     |
| DELETE | `/programs/:programId`           | Protected | { resource: 'programs', action: 'delete' } | `programId: string` | -                                   | -                        | -                                     |

### Projects

#### CategoriesController (`/projects/categories`)

Source: `src/modules/projects/categories/categories.controller.ts`

| Method | Path                             | Auth      | Roles                                               | Params       | Query                         | Body                      | Files |
| ------ | -------------------------------- | --------- | --------------------------------------------------- | ------------ | ----------------------------- | ------------------------- | ----- |
| POST   | `/projects/categories`           | Protected | { resource: 'projectCategories', action: 'create' } | -            | -                             | `body: CreateCategoryDto` | -     |
| GET    | `/projects/categories`           | Public    | -                                                   | -            | -                             | -                         | -     |
| GET    | `/projects/categories/paginated` | Protected | { resource: 'projectCategories', action: 'read' }   | -            | `(query object): QueryParams` | -                         | -     |
| GET    | `/projects/categories/:id`       | Protected | { resource: 'projectCategories', action: 'read' }   | `id: string` | -                             | -                         | -     |
| PATCH  | `/projects/categories/:id`       | Protected | { resource: 'projectCategories', action: 'update' } | `id: string` | -                             | `body: UpdateCategoryDto` | -     |
| DELETE | `/projects/categories/:id`       | Protected | { resource: 'projectCategories', action: 'delete' } | `id: string` | -                             | -                         | -     |

#### PhasesController (`/phases`)

Source: `src/modules/projects/phases/phases.controller.ts`

| Method | Path                          | Auth      | Roles                                    | Params              | Query | Body                        | Files |
| ------ | ----------------------------- | --------- | ---------------------------------------- | ------------------- | ----- | --------------------------- | ----- |
| POST   | `/phases/:projectId`          | Protected | { resource: 'phases', action: 'create' } | `projectId: string` | -     | `body: CreatePhaseDto`      | -     |
| GET    | `/phases/:phaseId`            | Protected | { resource: 'phases', action: 'read' }   | `phaseId: string`   | -     | -                           | -     |
| GET    | `/phases/project/:projectId`  | Protected | { resource: 'phases', action: 'read' }   | `projectId: string` | -     | -                           | -     |
| POST   | `/phases/participants/move`   | Protected | { resource: 'phases', action: 'update' } | -                   | -     | `body: MoveParticipantsDto` | -     |
| POST   | `/phases/participants/remove` | Protected | { resource: 'phases', action: 'update' } | -                   | -     | `body: MoveParticipantsDto` | -     |
| PATCH  | `/phases/:phaseId`            | Protected | { resource: 'phases', action: 'update' } | `phaseId: string`   | -     | `body: UpdatePhaseDto`      | -     |
| DELETE | `/phases/:phaseId`            | Protected | { resource: 'phases', action: 'delete' } | `phaseId: string`   | -     | -                           | -     |

#### ProjectsController (`/projects`)

Source: `src/modules/projects/projects.controller.ts`

| Method | Path                                           | Auth      | Roles                                      | Params                   | Query                               | Body                          | Files                                  |
| ------ | ---------------------------------------------- | --------- | ------------------------------------------ | ------------------------ | ----------------------------------- | ----------------------------- | -------------------------------------- |
| POST   | `/projects`                                    | Protected | { resource: 'projects', action: 'create' } | -                        | -                                   | `body: CreateProjectDto`      | -                                      |
| GET    | `/projects`                                    | Protected | { resource: 'projects', action: 'read' }   | -                        | `(query object): FilterProjectsDto` | -                             | -                                      |
| GET    | `/projects/recent`                             | Public    | -                                          | -                        | -                                   | -                             | -                                      |
| GET    | `/projects/published`                          | Public    | -                                          | -                        | `(query object): FilterProjectsDto` | -                             | -                                      |
| GET    | `/projects/by-slug/:slug`                      | Public    | -                                          | `slug: string`           | -                                   | -                             | -                                      |
| POST   | `/projects/:projectId/participate`             | Protected | -                                          | `projectId: string`      | -                                   | `body: ParticipateProjectDto` | -                                      |
| GET    | `/projects/me/participations`                  | Protected | -                                          | -                        | -                                   | -                             | -                                      |
| GET    | `/projects/:projectId/participations`          | Protected | { resource: 'projects', action: 'read' }   | `projectId: string`      | -                                   | -                             | -                                      |
| GET    | `/projects/:projectId`                         | Protected | { resource: 'projects', action: 'read' }   | `projectId: string`      | -                                   | -                             | -                                      |
| POST   | `/projects/:projectId/participants/import-csv` | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | -                             | `file` (single)                        |
| POST   | `/projects/:projectId/notifications`           | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | `body: CreateNotificationDto` | -                                      |
| POST   | `/projects/notifications/:notificationId/send` | Protected | { resource: 'projects', action: 'update' } | `notificationId: string` | -                                   | -                             | -                                      |
| POST   | `/projects/:projectId/gallery`                 | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | -                             | `file` (single)<br>`image` (multipart) |
| DELETE | `/projects/gallery/:galleryId`                 | Protected | { resource: 'projects', action: 'update' } | `galleryId: string`      | -                                   | -                             | -                                      |
| GET    | `/projects/by-slug/:slug/gallery`              | Public    | -                                          | `slug: string`           | -                                   | -                             | -                                      |
| PATCH  | `/projects/:projectId/publish`                 | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | -                             | -                                      |
| POST   | `/projects/:projectId/cover`                   | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | -                             | `file` (single)<br>`cover` (multipart) |
| PATCH  | `/projects/:projectId/highlight`               | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | -                             | -                                      |
| PATCH  | `/projects/:projectId`                         | Protected | { resource: 'projects', action: 'update' } | `projectId: string`      | -                                   | `body: UpdateProjectDto`      | -                                      |
| DELETE | `/projects/:projectId`                         | Protected | { resource: 'projects', action: 'delete' } | `projectId: string`      | -                                   | -                             | -                                      |

### Stats

#### StatsController (`/stats`)

Source: `src/modules/stats/stats.controller.ts`

| Method | Path                      | Auth      | Roles                                 | Params         | Query | Body | Files |
| ------ | ------------------------- | --------- | ------------------------------------- | -------------- | ----- | ---- | ----- |
| GET    | `/stats/me`               | Protected | -                                     | -              | -     | -    | -     |
| GET    | `/stats/admin/overview`   | Protected | { resource: 'stats', action: 'read' } | -              | -     | -    | -     |
| GET    | `/stats/admin/year/:year` | Public    | -                                     | `year: number` | -     | -    | -     |

### Subprograms

#### SubprogramsController (`/subprograms`)

Source: `src/modules/subprograms/subprograms.controller.ts`

| Method | Path                                        | Auth      | Roles                                         | Params                 | Query                                 | Body                        | Files                                 |
| ------ | ------------------------------------------- | --------- | --------------------------------------------- | ---------------------- | ------------------------------------- | --------------------------- | ------------------------------------- |
| POST   | `/subprograms`                              | Protected | { resource: 'subprograms', action: 'create' } | -                      | -                                     | `body: CreateSubprogramDto` | -                                     |
| GET    | `/subprograms`                              | Public    | -                                             | -                      | -                                     | -                           | -                                     |
| PATCH  | `/subprograms/:subprogramId/publish`        | Protected | { resource: 'subprograms', action: 'update' } | `subprogramId: string` | -                                     | -                           | -                                     |
| POST   | `/subprograms/:subprogramId/logo`           | Protected | { resource: 'subprograms', action: 'update' } | `subprogramId: string` | -                                     | -                           | `file` (single)<br>`logo` (multipart) |
| GET    | `/subprograms/by-slug/:slug`                | Public    | -                                             | `slug: string`         | -                                     | -                           | -                                     |
| GET    | `/subprograms/program/:programId`           | Public    | -                                             | `programId: string`    | -                                     | -                           | -                                     |
| GET    | `/subprograms/program/:programId/paginated` | Protected | { resource: 'subprograms', action: 'read' }   | `programId: string`    | `(query object): FilterSubprogramDto` | -                           | -                                     |
| GET    | `/subprograms/:subprogramId`                | Protected | { resource: 'subprograms', action: 'update' } | `subprogramId: string` | -                                     | -                           | -                                     |
| PATCH  | `/subprograms/:subprogramId/highlight`      | Protected | { resource: 'subprograms', action: 'update' } | `subprogramId: string` | -                                     | -                           | -                                     |
| PATCH  | `/subprograms/:subprogramId`                | Protected | { resource: 'subprograms', action: 'update' } | `subprogramId: string` | -                                     | `body: UpdateSubprogramDto` | -                                     |
| DELETE | `/subprograms/:subprogramId`                | Protected | { resource: 'subprograms', action: 'delete' } | `subprogramId: string` | -                                     | -                           | -                                     |

### Users

#### RolesController (`/roles`)

Source: `src/modules/users/roles/roles.controller.ts`

| Method | Path               | Auth      | Roles                                   | Params       | Query                            | Body                  | Files |
| ------ | ------------------ | --------- | --------------------------------------- | ------------ | -------------------------------- | --------------------- | ----- |
| POST   | `/roles`           | Protected | { resource: 'roles', action: 'create' } | -            | -                                | `body: CreateRoleDto` | -     |
| GET    | `/roles/paginated` | Protected | { resource: 'roles', action: 'read' }   | -            | `(query object): FilterRolesDto` | -                     | -     |
| GET    | `/roles`           | Protected | { resource: 'roles', action: 'read' }   | -            | -                                | -                     | -     |
| GET    | `/roles/:id`       | Protected | { resource: 'roles', action: 'read' }   | `id: string` | -                                | -                     | -     |
| PATCH  | `/roles/:id`       | Protected | { resource: 'roles', action: 'update' } | `id: string` | -                                | `body: UpdateRoleDto` | -     |
| DELETE | `/roles/:id`       | Protected | { resource: 'roles', action: 'delete' } | `id: string` | -                                | -                     | -     |

#### UsersController (`/users`)

Source: `src/modules/users/users.controller.ts`

| Method | Path                            | Auth      | Roles                                          | Params           | Query                            | Body                  | Files                                    |
| ------ | ------------------------------- | --------- | ---------------------------------------------- | ---------------- | -------------------------------- | --------------------- | ---------------------------------------- |
| POST   | `/users/referral-code/generate` | Protected | -                                              | -                | -                                | -                     | -                                        |
| GET    | `/users/staff`                  | Protected | { resource: 'users', action: 'read' }          | -                | -                                | -                     | -                                        |
| GET    | `/users/ambassadors`            | Public    | -                                              | -                | `(query object): FilterUsersDto` | -                     | -                                        |
| GET    | `/users/ambassadors/:email`     | Public    | -                                              | `email: string`  | -                                | -                     | -                                        |
| GET    | `/users/me/referred-users`      | Protected | -                                              | -                | `page: number`                   | -                     | -                                        |
| POST   | `/users`                        | Protected | { resource: 'users', action: 'create' }        | -                | -                                | `body: CreateUserDto` | -                                        |
| GET    | `/users/export/users.csv`       | Protected | { resource: 'exportUsersCSV', action: 'read' } | -                | `(query object): FilterUsersDto` | -                     | -                                        |
| GET    | `/users`                        | Protected | { resource: 'users', action: 'read' }          | -                | `(query object): FilterUsersDto` | -                     | -                                        |
| GET    | `/users/entrepreneurs`          | Public    | -                                              | -                | -                                | -                     | -                                        |
| GET    | `/users/:email`                 | Public    | -                                              | `email: string`  | -                                | -                     | -                                        |
| PATCH  | `/users/:userId`                | Protected | { resource: 'users', action: 'update' }        | `userId: string` | -                                | `body: UpdateUserDto` | -                                        |
| POST   | `/users/me/profile-image`       | Protected | -                                              | -                | -                                | -                     | `file` (single)<br>`profile` (multipart) |
| DELETE | `/users/:userId`                | Protected | { resource: 'users', action: 'delete' }        | `userId: string` | -                                | -                     | -                                        |

### Ventures

#### ProductsController (`/products`)

Source: `src/modules/ventures/products/products.controller.ts`

| Method | Path                              | Auth      | Roles                                                         | Params              | Query                               | Body                     | Files                                  |
| ------ | --------------------------------- | --------- | ------------------------------------------------------------- | ------------------- | ----------------------------------- | ------------------------ | -------------------------------------- |
| POST   | `/products`                       | Protected | -                                                             | -                   | -                                   | `body: CreateProductDto` | -                                      |
| POST   | `/products/:productId/gallery`    | Protected | { resource: 'products', action: 'update', possession: 'own' } | `productId: string` | -                                   | -                        | `file` (single)<br>`image` (multipart) |
| DELETE | `/products/gallery/:galleryId`    | Protected | { resource: 'products', action: 'update', possession: 'own' } | `galleryId: string` | -                                   | -                        | -                                      |
| GET    | `/products/by-slug/:slug/gallery` | Public    | -                                                             | `slug: string`      | -                                   | -                        | -                                      |
| GET    | `/products/me`                    | Protected | { resource: 'products', action: 'read', possession: 'own' }   | -                   | `(query object): FilterProductsDto` | -                        | -                                      |
| GET    | `/products/by-slug/:slug`         | Public    | -                                                             | `slug: string`      | -                                   | -                        | -                                      |
| PATCH  | `/products/by-slug/:slug`         | Protected | { resource: 'products', action: 'update', possession: 'own' } | `slug: string`      | -                                   | `body: UpdateProductDto` | -                                      |
| DELETE | `/products/:id`                   | Protected | { resource: 'products', action: 'delete', possession: 'own' } | `id: string`        | -                                   | -                        | -                                      |

#### VenturesController (`/ventures`)

Source: `src/modules/ventures/ventures.controller.ts`

| Method | Path                              | Auth      | Roles                                                         | Params              | Query                               | Body                     | Files                                  |
| ------ | --------------------------------- | --------- | ------------------------------------------------------------- | ------------------- | ----------------------------------- | ------------------------ | -------------------------------------- |
| POST   | `/ventures`                       | Protected | -                                                             | -                   | -                                   | `body: CreateVentureDto` | -                                      |
| GET    | `/ventures/published`             | Public    | -                                                             | -                   | -                                   | -                        | -                                      |
| GET    | `/ventures`                       | Protected | { resource: 'ventures', action: 'read', possession: 'any' }   | -                   | `(query object): FilterVenturesDto` | -                        | -                                      |
| GET    | `/ventures/by-slug/:slug`         | Public    | -                                                             | `slug: string`      | -                                   | -                        | -                                      |
| PATCH  | `/ventures/by-slug/:slug/publish` | Protected | { resource: 'publishVenture', action: 'update' }              | `slug: string`      | -                                   | -                        | -                                      |
| GET    | `/ventures/me/paginated`          | Protected | -                                                             | -                   | `page: string`                      | -                        | -                                      |
| GET    | `/ventures/me`                    | Protected | -                                                             | -                   | -                                   | -                        | -                                      |
| POST   | `/ventures/:ventureId/gallery`    | Protected | { resource: 'ventures', action: 'update', possession: 'own' } | `ventureId: string` | -                                   | -                        | `file` (single)<br>`image` (multipart) |
| DELETE | `/ventures/gallery/:galleryId`    | Protected | { resource: 'ventures', action: 'update', possession: 'own' } | `galleryId: string` | -                                   | -                        | -                                      |
| GET    | `/ventures/by-slug/:slug/gallery` | Public    | -                                                             | `slug: string`      | -                                   | -                        | -                                      |
| POST   | `/ventures/:ventureId/logo`       | Protected | { resource: 'ventures', action: 'update', possession: 'own' } | `ventureId: string` | -                                   | -                        | `file` (single)<br>`logo` (multipart)  |
| POST   | `/ventures/:ventureId/cover`      | Protected | { resource: 'ventures', action: 'update', possession: 'own' } | `ventureId: string` | -                                   | -                        | `file` (single)<br>`cover` (multipart) |
| GET    | `/ventures/:ventureId`            | Protected | -                                                             | `ventureId: string` | -                                   | -                        | -                                      |
| PATCH  | `/ventures/:slug`                 | Protected | { resource: 'ventures', action: 'update', possession: 'own' } | `slug: string`      | -                                   | `body: UpdateVentureDto` | -                                      |
| DELETE | `/ventures/:id`                   | Protected | { resource: 'ventures', action: 'delete', possession: 'own' } | `id: string`        | -                                   | -                        | -                                      |

## DTO Reference

### Auth

#### ContactSupportDto

Source: `src/core/auth/dto/contact-support.dto.ts`
Type: `interface`

| Field          | Type     | Required | Validation / Transform decorators |
| -------------- | -------- | -------- | --------------------------------- |
| `email`        | `string` | Yes      | -                                 |
| `name`         | `string` | Yes      | -                                 |
| `country`      | `string` | Yes      | -                                 |
| `phone_number` | `string` | Yes      | -                                 |
| `message`      | `string` | Yes      | -                                 |

#### CreateWithGoogleDto

Source: `src/core/auth/dto/sign-up-with-google.dto.ts`
Type: `class`

| Field          | Type     | Required | Validation / Transform decorators |
| -------------- | -------- | -------- | --------------------------------- |
| `name`         | `string` | Yes      | -                                 |
| `email`        | `string` | Yes      | -                                 |
| `google_image` | `string` | Yes      | -                                 |

#### ForgotPasswordDto

Source: `src/core/auth/dto/forgot-password.dto.ts`
Type: `class`

| Field   | Type     | Required | Validation / Transform decorators |
| ------- | -------- | -------- | --------------------------------- |
| `email` | `string` | Yes      | @IsEmail                          |

#### ResetPasswordDto

Source: `src/core/auth/dto/reset-password.dto.ts`
Type: `class`

| Field              | Type     | Required | Validation / Transform decorators |
| ------------------ | -------- | -------- | --------------------------------- |
| `token`            | `string` | Yes      | @IsNotEmpty                       |
| `password`         | `string` | Yes      | @MinLength(6)                     |
| `password_confirm` | `string` | Yes      | @Match('password')                |

#### SignInDto

Source: `src/core/auth/dto/sign-in.dto.ts`
Type: `class`

| Field      | Type     | Required | Validation / Transform decorators |
| ---------- | -------- | -------- | --------------------------------- |
| `email`    | `string` | Yes      | @IsNotEmpty                       |
| `password` | `string` | Yes      | @IsNotEmpty                       |

#### SignUpDto

Source: `src/core/auth/dto/sign-up.dto.ts`
Type: `class`

| Field              | Type     | Required | Validation / Transform decorators                         |
| ------------------ | -------- | -------- | --------------------------------------------------------- |
| `email`            | `string` | Yes      | @IsEmail                                                  |
| `name`             | `string` | Yes      | @IsNotEmpty                                               |
| `phone_number`     | `string` | Yes      | @IsNotEmpty                                               |
| `gender`           | `string` | Yes      | @IsNotEmpty                                               |
| `birth_date`       | `Date`   | Yes      | @IsNotEmpty                                               |
| `country`          | `string` | Yes      | @IsNotEmpty                                               |
| `password`         | `string` | Yes      | @MinLength(6)                                             |
| `password_confirm` | `string` | Yes      | @Match('password', { message: 'Passwords do not match' }) |
| `referral_code`    | `string` | Yes      | @IsOptional                                               |

#### UpdatePasswordDto

Source: `src/core/auth/dto/update-password.dto.ts`
Type: `class`

| Field              | Type     | Required | Validation / Transform decorators |
| ------------------ | -------- | -------- | --------------------------------- |
| `password`         | `string` | Yes      | @MinLength(6)                     |
| `password_confirm` | `string` | Yes      | @IsNotEmpty<br>@Match('password') |

#### UpdateProfileDto

Source: `src/core/auth/dto/update-profile.dto.ts`
Type: `class`

| Field          | Type       | Required | Validation / Transform decorators |
| -------------- | ---------- | -------- | --------------------------------- |
| `email`        | `string`   | Yes      | @IsEmail                          |
| `name`         | `string`   | Yes      | @IsNotEmpty                       |
| `phone_number` | `string`   | Yes      | @IsNotEmpty                       |
| `gender`       | `string`   | Yes      | @IsNotEmpty                       |
| `city`         | `string`   | Yes      | @IsNotEmpty                       |
| `birth_date`   | `Date`     | Yes      | @IsNotEmpty                       |
| `country`      | `string`   | Yes      | @IsNotEmpty                       |
| `biography`    | `string`   | Yes      | @IsOptional                       |
| `roles`        | `string[]` | Yes      | @IsOptional                       |

### Blog

#### CreateArticleDto

Source: `src/modules/blog/articles/dto/create-article.dto.ts`
Type: `class`

| Field          | Type       | Required | Validation / Transform decorators |
| -------------- | ---------- | -------- | --------------------------------- |
| `published_at` | `string`   | Yes      | @IsOptional                       |
| `title`        | `string`   | Yes      | @IsNotEmpty                       |
| `content`      | `string`   | Yes      | @IsNotEmpty                       |
| `tags`         | `string[]` | Yes      | @IsArray                          |

#### CreateCommentDto

Source: `src/modules/blog/comments/dto/create-comment.dto.ts`
Type: `class`

| Field       | Type     | Required | Validation / Transform decorators |
| ----------- | -------- | -------- | --------------------------------- |
| `articleId` | `string` | Yes      | @IsNotEmpty                       |
| `content`   | `string` | Yes      | @IsNotEmpty                       |

#### CreateTagDto

Source: `src/modules/blog/tags/dto/create-tag.dto.ts`
Type: `class`

| Field  | Type     | Required | Validation / Transform decorators |
| ------ | -------- | -------- | --------------------------------- |
| `name` | `string` | Yes      | @IsNotEmpty                       |

#### FilterArticlesDto

Source: `src/modules/blog/articles/dto/filter-articles.dto.ts`
Type: `interface`

| Field    | Type                                                | Required | Validation / Transform decorators |
| -------- | --------------------------------------------------- | -------- | --------------------------------- |
| `page`   | `string \| null`                                    | Yes      | -                                 |
| `q`      | `string \| null`                                    | Yes      | -                                 |
| `filter` | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No       | -                                 |

#### FilterCommentsDto

Source: `src/modules/blog/comments/dto/filter-comments.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `page` | `string \| null` | Yes      | -                                 |

#### FilterTagsDto

Source: `src/modules/blog/tags/dto/filter-tags.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `q`    | `string \| null` | Yes      | -                                 |
| `page` | `string \| null` | Yes      | -                                 |

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

| Field  | Type     | Required | Validation / Transform decorators |
| ------ | -------- | -------- | --------------------------------- |
| `name` | `string` | Yes      | @IsNotEmpty                       |

#### CreateEventDto

Source: `src/modules/events/dto/create-event.dto.ts`
Type: `class`

| Field                | Type       | Required | Validation / Transform decorators                         |
| -------------------- | ---------- | -------- | --------------------------------------------------------- |
| `name`               | `string`   | Yes      | @IsNotEmpty                                               |
| `place`              | `string`   | Yes      | @IsNotEmpty                                               |
| `description`        | `string`   | Yes      | @IsNotEmpty                                               |
| `context`            | `string`   | No       | @IsOptional                                               |
| `objectives`         | `string`   | No       | @IsOptional                                               |
| `duration_hours`     | `number`   | No       | @IsOptional                                               |
| `selection_criteria` | `string`   | No       | @IsOptional                                               |
| `started_at`         | `Date`     | Yes      | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty |
| `ended_at`           | `Date`     | Yes      | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty |
| `event_manager`      | `string`   | No       | @IsOptional                                               |
| `program`            | `string`   | Yes      | @IsNotEmpty                                               |
| `categories`         | `string[]` | Yes      | @IsNotEmpty                                               |

#### FilterEventsDto

Source: `src/modules/events/dto/filter-events.dto.ts`
Type: `interface`

| Field        | Type                                                | Required | Validation / Transform decorators |
| ------------ | --------------------------------------------------- | -------- | --------------------------------- |
| `page`       | `string \| null`                                    | Yes      | -                                 |
| `q`          | `string \| null`                                    | Yes      | -                                 |
| `categories` | `string[]`                                          | Yes      | -                                 |
| `filter`     | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No       | -                                 |

#### ParticipateEventDto

Source: `src/modules/events/dto/participate-event.dto.ts`
Type: `class`

| Field        | Type     | Required | Validation / Transform decorators |
| ------------ | -------- | -------- | --------------------------------- |
| `venture_id` | `string` | No       | @IsOptional<br>@IsUUID            |

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

| Field   | Type     | Required | Validation / Transform decorators |
| ------- | -------- | -------- | --------------------------------- |
| `image` | `string` | Yes      | -                                 |

### Mentors

#### CreateExperienceDto

Source: `src/modules/mentors/dto/create-experience.dto.ts`
Type: `class`

| Field          | Type      | Required | Validation / Transform decorators                         |
| -------------- | --------- | -------- | --------------------------------------------------------- |
| `id`           | `string`  | No       | @IsOptional<br>@IsString                                  |
| `company_name` | `string`  | Yes      | -                                                         |
| `job_title`    | `string`  | Yes      | -                                                         |
| `is_current`   | `boolean` | Yes      | -                                                         |
| `start_date`   | `Date`    | Yes      | @Transform(({ value }) => new Date(value))                |
| `end_date`     | `Date`    | No       | @Transform(({ value }) => new Date(value))<br>@IsOptional |

#### CreateExpertiseDto

Source: `src/modules/mentors/expertises/dto/create-expertise.dto.ts`
Type: `class`

| Field  | Type     | Required | Validation / Transform decorators |
| ------ | -------- | -------- | --------------------------------- |
| `name` | `string` | Yes      | -                                 |

#### CreateMentorDto

Source: `src/modules/mentors/dto/create-mentor.dto.ts`
Type: `class`

| Field              | Type                    | Required | Validation / Transform decorators                                               |
| ------------------ | ----------------------- | -------- | ------------------------------------------------------------------------------- |
| `years_experience` | `number`                | Yes      | -                                                                               |
| `expertises`       | `string[]`              | Yes      | -                                                                               |
| `experiences`      | `CreateExperienceDto[]` | Yes      | @IsArray<br>@ValidateNested({ each: true })<br>@Type(() => CreateExperienceDto) |

#### FilterExpertisesDto

Source: `src/modules/mentors/expertises/dto/filter-expertises.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `page` | `string \| null` | Yes      | -                                 |
| `q`    | `string \| null` | Yes      | -                                 |

#### FilterMentorsDto

Source: `src/modules/mentors/dto/filter-mentors.dto.ts`
Type: `interface`

| Field    | Type                   | Required | Validation / Transform decorators |
| -------- | ---------------------- | -------- | --------------------------------- |
| `page`   | `string \| null`       | Yes      | -                                 |
| `q`      | `string \| null`       | Yes      | -                                 |
| `status` | `MentorStatus \| null` | Yes      | -                                 |

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

| Field      | Type     | Required | Validation / Transform decorators |
| ---------- | -------- | -------- | --------------------------------- |
| `title`    | `string` | Yes      | @IsNotEmpty                       |
| `body`     | `string` | Yes      | @IsNotEmpty                       |
| `phase_id` | `string` | No       | @IsOptional                       |

#### FilterNotificationsDto

Source: `src/modules/notifications/dto/filter-notifications.dto.ts`
Type: `class`

| Field     | Type                         | Required | Validation / Transform decorators |
| --------- | ---------------------------- | -------- | --------------------------------- |
| `phaseId` | `string \| null`             | No       | -                                 |
| `page`    | `string \| null`             | Yes      | -                                 |
| `status`  | `NotificationStatus \| null` | No       | -                                 |

#### UpdateNotificationDto

Source: `src/modules/notifications/dto/update-notification.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateNotificationDto)`

No direct fields in this class (mapped/composed DTO).

### Programs

#### CreateCategoryDto

Source: `src/modules/programs/categories/dto/create-category.dto.ts`
Type: `class`

| Field  | Type     | Required | Validation / Transform decorators |
| ------ | -------- | -------- | --------------------------------- |
| `name` | `string` | Yes      | @IsNotEmpty                       |

#### CreateProgramDto

Source: `src/modules/programs/dto/create-program.dto.ts`
Type: `class`

| Field         | Type     | Required | Validation / Transform decorators |
| ------------- | -------- | -------- | --------------------------------- |
| `name`        | `string` | Yes      | -                                 |
| `description` | `string` | Yes      | -                                 |
| `category`    | `string` | Yes      | -                                 |

#### FilterProgramsDto

Source: `src/modules/programs/dto/filter-programs.dto.ts`
Type: `interface`

| Field    | Type                                                | Required | Validation / Transform decorators |
| -------- | --------------------------------------------------- | -------- | --------------------------------- |
| `page`   | `string \| null`                                    | Yes      | -                                 |
| `q`      | `string \| null`                                    | Yes      | -                                 |
| `filter` | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No       | -                                 |

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

| Field  | Type     | Required | Validation / Transform decorators                  |
| ------ | -------- | -------- | -------------------------------------------------- |
| `name` | `string` | Yes      | @IsNotEmpty({ message: 'Le nom est obligatoire' }) |

#### CreatePhaseDto

Source: `src/modules/projects/phases/dto/create-phase.dto.ts`
Type: `class`

| Field         | Type     | Required | Validation / Transform decorators                     |
| ------------- | -------- | -------- | ----------------------------------------------------- |
| `name`        | `string` | Yes      | @IsString                                             |
| `description` | `string` | Yes      | @IsString                                             |
| `started_at`  | `Date`   | Yes      | @IsDate<br>@Transform(({ value }) => new Date(value)) |
| `ended_at`    | `Date`   | Yes      | @IsDate<br>@Transform(({ value }) => new Date(value)) |

#### CreateProjectDto

Source: `src/modules/projects/dto/create-project.dto.ts`
Type: `class`

| Field                | Type       | Required | Validation / Transform decorators                                 |
| -------------------- | ---------- | -------- | ----------------------------------------------------------------- |
| `name`               | `string`   | Yes      | @IsNotEmpty                                                       |
| `description`        | `string`   | Yes      | @IsNotEmpty                                                       |
| `context`            | `string`   | No       | @IsOptional                                                       |
| `objectives`         | `string`   | No       | @IsOptional                                                       |
| `duration_hours`     | `number`   | No       | @IsOptional<br>@Transform(({ value }) => (value ? +value : null)) |
| `selection_criteria` | `string`   | No       | @IsOptional                                                       |
| `started_at`         | `Date`     | Yes      | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty         |
| `ended_at`           | `Date`     | Yes      | @Transform(({ value }) => new Date(value))<br>@IsNotEmpty         |
| `project_manager`    | `string`   | No       | @IsOptional                                                       |
| `program`            | `string`   | Yes      | @IsNotEmpty                                                       |
| `categories`         | `string[]` | Yes      | @IsArray<br>@IsNotEmpty                                           |

#### FilterProjectsDto

Source: `src/modules/projects/dto/filter-projects.dto.ts`
Type: `interface`

| Field        | Type                                                | Required | Validation / Transform decorators |
| ------------ | --------------------------------------------------- | -------- | --------------------------------- |
| `page`       | `string \| null`                                    | No       | -                                 |
| `q`          | `string \| null`                                    | No       | -                                 |
| `categories` | `string[] \| string`                                | No       | -                                 |
| `status`     | `'past' \| 'current' \| 'future' \| null`           | No       | -                                 |
| `filter`     | `'all' \| 'published' \| 'drafts' \| 'highlighted'` | No       | -                                 |

#### MoveParticipantsDto

Source: `src/modules/projects/phases/dto/move-participants.dto.ts`
Type: `class`

| Field     | Type       | Required | Validation / Transform decorators     |
| --------- | ---------- | -------- | ------------------------------------- |
| `ids`     | `string[]` | Yes      | @IsArray<br>@IsString({ each: true }) |
| `phaseId` | `string`   | Yes      | @IsUUID                               |

#### ParticipateProjectDto

Source: `src/modules/projects/dto/participate.dto.ts`
Type: `class`

| Field       | Type     | Required | Validation / Transform decorators |
| ----------- | -------- | -------- | --------------------------------- |
| `ventureId` | `string` | No       | @IsOptional<br>@IsUUID            |

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

| Field         | Type     | Required | Validation / Transform decorators |
| ------------- | -------- | -------- | --------------------------------- |
| `name`        | `string` | Yes      | @IsNotEmpty                       |
| `description` | `string` | Yes      | @IsNotEmpty                       |
| `programId`   | `string` | Yes      | @IsNotEmpty                       |

#### FilterSubprogramDto

Source: `src/modules/subprograms/dto/filter-subprogram.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `page` | `string \| null` | Yes      | -                                 |
| `q`    | `string \| null` | Yes      | -                                 |

#### UpdateSubprogramDto

Source: `src/modules/subprograms/dto/update-subprogram.dto.ts`
Type: `class`
Extends/Implements: `PartialType(CreateSubprogramDto)`

No direct fields in this class (mapped/composed DTO).

### Users

#### CreateFromCsvDto

Source: `src/modules/users/dto/create-from-csv.dto.ts`
Type: `class`

| Field          | Type     | Required | Validation / Transform decorators |
| -------------- | -------- | -------- | --------------------------------- |
| `name`         | `string` | Yes      | -                                 |
| `email`        | `string` | Yes      | -                                 |
| `phone_number` | `string` | No       | -                                 |

#### CreateRoleDto

Source: `src/modules/users/roles/dto/create-role.dto.ts`
Type: `class`

| Field  | Type     | Required | Validation / Transform decorators                          |
| ------ | -------- | -------- | ---------------------------------------------------------- |
| `name` | `string` | Yes      | @IsNotEmpty({ message: 'Le nom du rôle est obligatoire' }) |

#### CreateUserDto

Source: `src/modules/users/dto/create-user.dto.ts`
Type: `class`

| Field          | Type       | Required | Validation / Transform decorators |
| -------------- | ---------- | -------- | --------------------------------- |
| `email`        | `string`   | Yes      | @IsEmail                          |
| `name`         | `string`   | Yes      | @IsNotEmpty                       |
| `phone_number` | `string`   | Yes      | @IsNotEmpty                       |
| `gender`       | `string`   | Yes      | @IsNotEmpty                       |
| `city`         | `string`   | Yes      | @IsNotEmpty                       |
| `birth_date`   | `Date`     | Yes      | @IsNotEmpty                       |
| `country`      | `string`   | Yes      | @IsNotEmpty                       |
| `biography`    | `string`   | Yes      | @IsOptional                       |
| `roles`        | `string[]` | Yes      | @IsNotEmpty                       |

#### FilterRolesDto

Source: `src/modules/users/roles/dto/filter-roles.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `page` | `string \| null` | Yes      | -                                 |
| `q`    | `string \| null` | Yes      | -                                 |

#### FilterUsersDto

Source: `src/modules/users/dto/filter-users.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `page` | `string \| null` | Yes      | -                                 |
| `q`    | `string \| null` | Yes      | -                                 |

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

| Field         | Type     | Required | Validation / Transform decorators |
| ------------- | -------- | -------- | --------------------------------- |
| `ventureId`   | `string` | Yes      | @IsNotEmpty                       |
| `name`        | `string` | Yes      | @IsNotEmpty                       |
| `description` | `string` | Yes      | @IsNotEmpty                       |
| `price`       | `number` | Yes      | @IsNotEmpty                       |

#### CreateVentureDto

Source: `src/modules/ventures/dto/create-venture.dto.ts`
Type: `class`

| Field            | Type     | Required | Validation / Transform decorators                         |
| ---------------- | -------- | -------- | --------------------------------------------------------- |
| `name`           | `string` | Yes      | -                                                         |
| `description`    | `string` | Yes      | -                                                         |
| `problem_solved` | `string` | Yes      | -                                                         |
| `target_market`  | `string` | Yes      | -                                                         |
| `email`          | `string` | Yes      | @IsOptional                                               |
| `phone_number`   | `string` | Yes      | @IsOptional                                               |
| `website`        | `string` | Yes      | @IsOptional                                               |
| `linkedin_url`   | `string` | Yes      | @IsOptional                                               |
| `sector`         | `string` | Yes      | @IsOptional                                               |
| `founded_at`     | `Date`   | Yes      | @IsOptional<br>@Transform(({ value }) => new Date(value)) |
| `location`       | `string` | Yes      | @IsOptional                                               |
| `stage`          | `string` | Yes      | @IsOptional                                               |

#### FilterProductsDto

Source: `src/modules/ventures/products/dto/filter-products.dto.ts`
Type: `interface`

| Field  | Type     | Required | Validation / Transform decorators |
| ------ | -------- | -------- | --------------------------------- |
| `page` | `string` | Yes      | -                                 |

#### FilterVenturesDto

Source: `src/modules/ventures/dto/filter-ventures.dto.ts`
Type: `interface`

| Field  | Type             | Required | Validation / Transform decorators |
| ------ | ---------------- | -------- | --------------------------------- |
| `page` | `string \| null` | Yes      | -                                 |
| `q`    | `string \| null` | Yes      | -                                 |

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
