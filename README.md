# VibeCoder Nuxt Template

A production-ready full-stack SaaS starter built with Nuxt 4 and designed for [VibeCoder](https://vibecode.new) -- the AI vibe-coding platform. Ship authenticated, payment-enabled web apps in minutes instead of weeks.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4.2 / Vue 3.5 / TypeScript 5.9 |
| Styling | Tailwind CSS v4.2 with DM Sans font and a Shuffle-inspired purple (`#382CDD`) design system |
| Database | PostgreSQL 17 via Prisma 7 (`@prisma/adapter-pg`) |
| Cache | Redis 7.4 via ioredis |
| Auth | nuxt-auth-utils with bcryptjs session-based authentication |
| Payments | Stripe (server SDK v20) with webhook support |
| Email | Resend v6 |
| State | TanStack Vue Query v5 |
| UI Extras | vue-sonner (toasts), @nuxt/icon (Lucide icon set), @nuxtjs/color-mode (dark/light), clsx + tailwind-merge |
| Validation | Zod v4 |
| Runtime | Node 22, Nitro `node-server` preset |

## Features

- **Authentication** -- Login, register, forgot password, and reset password flows with secure session handling
- **Dashboard** -- Sidebar layout with dedicated dashboard and settings pages
- **User Settings** -- Profile editing and password change endpoints
- **Stripe Payments** -- Webhook-ready integration for subscriptions and one-time charges
- **Email via Resend** -- Transactional email support (password resets, notifications)
- **File Uploads** -- Server-side upload API endpoint
- **Health Check** -- `GET /api/health` for load balancers and monitoring
- **Dark / Light Mode** -- System-aware color mode with manual toggle via `@nuxtjs/color-mode`
- **Custom Error Page** -- Branded `error.vue` for graceful error handling
- **Database Seed Script** -- `npx prisma db seed` to bootstrap initial data
- **Docker + docker-compose** -- Multi-stage Dockerfile and full compose stack (app, Postgres, Redis)
- **CI/CD Ready** -- GitHub Actions compatible build pipeline

## Quick Start

### Prerequisites

- Node.js 22+
- Docker and Docker Compose (for Postgres and Redis)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd vibecoder-template-nuxt
npm install
```

### 2. Configure environment

Copy the example below into a `.env` file at the project root and fill in your values:

```env
DATABASE_URL=postgresql://vibecoder:vibecoder@localhost:5432/app
REDIS_URL=redis://localhost:6379
AUTH_SECRET=change-me-to-a-random-string-at-least-32-chars
NUXT_SESSION_PASSWORD=change-me-to-a-random-string-at-least-32-chars

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Resend
RESEND_API_KEY=re_...

# Public
APP_URL=http://localhost:3000
```

### 3. Start infrastructure

```bash
docker-compose up -d postgres redis
```

### 4. Set up the database

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Run the dev server

```bash
npm run dev
```

The app is now running at **http://localhost:3000**.

## Project Structure

```
vibecoder-template-nuxt/
├── app/                        # Nuxt 4 app directory
│   ├── app.vue                 # Root component
│   ├── error.vue               # Custom error page
│   ├── assets/css/             # Tailwind CSS entry point
│   ├── components/
│   │   ├── layout/             # Header, Footer, Sidebar
│   │   └── ui/                 # ThemeToggle and reusable UI
│   ├── composables/            # Vue composables
│   ├── layouts/
│   │   ├── default.vue         # Public layout
│   │   └── dashboard.vue       # Authenticated sidebar layout
│   ├── middleware/              # Route middleware (auth guards)
│   └── pages/
│       ├── index.vue           # Landing page
│       ├── login.vue           # Login
│       ├── register.vue        # Register
│       ├── forgot-password.vue # Forgot password
│       ├── reset-password.vue  # Reset password
│       └── dashboard/
│           └── settings.vue    # User settings (profile + password)
├── server/
│   ├── api/
│   │   ├── auth/               # login, register, logout, forgot/reset password
│   │   ├── stripe/             # webhook.post.ts
│   │   ├── upload/             # File upload endpoint
│   │   ├── user/               # profile.patch, password.patch
│   │   └── health.get.ts       # Health check
│   ├── middleware/              # Server middleware
│   └── utils/                  # Server utilities (db, redis, email)
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── prisma.config.ts        # Prisma configuration
│   └── seed.ts                 # Database seed script
├── public/                     # Static assets
├── docker-compose.yml          # Postgres + Redis + App
├── Dockerfile                  # Multi-stage production build
├── nuxt.config.ts              # Nuxt configuration
└── tsconfig.json               # TypeScript configuration
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `AUTH_SECRET` | Yes | Secret for signing auth tokens (min 32 chars) |
| `NUXT_SESSION_PASSWORD` | Yes | Secret for encrypting sessions (min 32 chars) |
| `STRIPE_SECRET_KEY` | No | Stripe server-side secret key |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret |
| `NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Stripe client-side publishable key |
| `RESEND_API_KEY` | No | Resend API key for transactional email |
| `APP_URL` | No | Public-facing URL (defaults to `http://localhost:3000`) |

## Deployment

### Docker (recommended)

Build and run the production image:

```bash
docker build -t vibecoder-app .
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  -e AUTH_SECRET=... \
  -e NUXT_SESSION_PASSWORD=... \
  vibecoder-app
```

The Dockerfile uses a three-stage build (deps, build, production) on `node:22-bookworm-slim` and automatically runs `prisma db push` on startup. The Nitro server listens on port 3000.

### Full stack with docker-compose

```bash
docker-compose up -d
```

This starts the app, PostgreSQL 17, and Redis 7.4 together with health checks and persistent volumes.

### Manual build

```bash
npm run build
node .output/server/index.mjs
```

The build uses the `node-server` Nitro preset, producing a standalone Node.js server in `.output/`.

## Design System

The template ships with a cohesive visual identity:

- **Font**: DM Sans (Google Fonts)
- **Primary color**: `#382CDD` -- a Shuffle-inspired vibrant purple used for buttons, links, and accents
- **Color mode**: System-aware with manual dark/light toggle
- **Icons**: Lucide icon set via `@nuxt/icon`

## License

MIT

---

Built with [VibeCoder](https://vibecode.new)
