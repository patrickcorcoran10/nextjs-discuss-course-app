# Discuss

Discuss is a full-stack course discussion platform built with Next.js. Users can browse topics, publish posts, search discussions, and join threaded conversations with nested comments. Authenticated users can create topics, posts, comments, and replies through server-side actions backed by PostgreSQL and Prisma.

## Features

- Browse the latest posts from the home page
- Organize conversations into topics
- Create topics with descriptions
- Create posts inside a topic
- Read posts and their comment threads
- Reply to comments with nested discussions
- Search posts and topics
- Sign in with GitHub OAuth
- Persist users, sessions, topics, posts, and comments in a relational database
- Validate form input with Zod
- Revalidate affected pages after mutations with Next.js server actions
- Stream slower sections of the UI with React Suspense

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) with the App Router |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/), [NextUI](https://nextui.org/), and [Tailwind CSS](https://tailwindcss.com/) |
| Authentication | [NextAuth.js](https://next-auth.js.org/) with GitHub OAuth |
| Database | PostgreSQL |
| ORM | [Prisma](https://www.prisma.io/) |
| Validation | [Zod](https://zod.dev/) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Development | ESLint, PostCSS, dotenv-cli, and Docker |

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL, either locally or through Docker
- A GitHub OAuth application

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/discuss"
AUTH_SECRET="replace-with-a-long-random-string"
GITHUB_CLIENT_ID="your-github-oauth-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
```

The authentication configuration reads the GitHub credentials from `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `src/auth.ts`.

For local OAuth development, add this callback URL to the GitHub OAuth app:

```text
http://localhost:3000/api/auth/callback/github
```

Never commit `.env.local` or real credentials. Environment files are ignored by Git.

### 3. Start PostgreSQL

To run PostgreSQL in Docker using the project script:

```bash
npm run start:db
```

Alternatively, use an existing PostgreSQL instance and point `DATABASE_URL` at it.

### 4. Generate the Prisma client and apply migrations

```bash
npm run prisma:generate:local
npx prisma migrate deploy
```

For local schema development, create and apply a migration with:

```bash
npm run prisma:migrate:local
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server with `.env.local` |
| `npm run build` | Apply production migrations and create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run the configured Next.js lint command |
| `npm run prisma:generate:local` | Generate Prisma Client using local environment variables |
| `npm run prisma:migrate:local` | Create/apply a development Prisma migration |
| `npm run start:db` | Start a PostgreSQL Docker container |

## Application structure

```text
src/
|-- actions/                 Server actions for topics, posts, comments, search, and auth
|-- app/                     App Router pages and the authentication API route
|-- components/              Reusable UI for headers, topics, posts, comments, and forms
|-- db/                      Prisma client and database query functions
|-- auth.ts                  NextAuth configuration and GitHub provider
`-- paths.ts                 Centralized route helpers

prisma/
|-- schema.prisma            Database models and relationships
`-- migrations/              Versioned database migrations
```

The main data relationships are:

```text
User --+-- Post ---- Topic
       `-- Comment -- Post
                    `-- Comment (nested replies)
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Top posts, topic list, and topic creation |
| `/topics/[slug]` | Posts for a topic and post creation |
| `/topics/[slug]/posts/[postId]` | Post details, comments, and replies |
| `/search?term=...` | Post search results |
| `/api/auth/*` | NextAuth authentication endpoints |

## Screenshots

No screenshots are currently checked into this repository. To add them, save images in `docs/screenshots/` and embed them here:

```md
![Discuss home page](docs/screenshots/home.png)
![Topic discussion](docs/screenshots/topic.png)
![Post and nested comments](docs/screenshots/post.png)
```

## Deployment

The application can be deployed to platforms that support Next.js, such as [Vercel](https://vercel.com/). Configure the production environment with:

- A managed PostgreSQL `DATABASE_URL`
- A strong `AUTH_SECRET`
- GitHub OAuth credentials
- The production callback URL registered in the GitHub OAuth application

Build the application with:

```bash
npm run build
```

The build command runs `prisma migrate deploy` before compiling the Next.js application, so the production database must be reachable during deployment.

## License

This project is intended for learning and demonstration purposes.
