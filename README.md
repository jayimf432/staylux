# StayLux — Luxury Rental Platform

A full-stack Airbnb-style rental platform built with Next.js 16, Prisma, PostgreSQL (Supabase), Stripe payments, and NextAuth v5. Features 200+ real Denver listings imported from Inside Airbnb data.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth v5 (Google, GitHub, Credentials) |
| Database | PostgreSQL via Supabase |
| ORM | Prisma 7 + `@prisma/adapter-pg` |
| Payments | Stripe Checkout + Webhooks |
| File Uploads | Uploadthing v7 |
| Email | Resend |
| Maps | Mapbox / react-map-gl |
| Animations | Framer Motion |
| Deployment | Vercel-ready |

---

## Features

- **Guest** — Browse listings, search by location/type, book with Stripe, manage bookings, leave reviews, favorites, messaging
- **Host** — List properties, manage bookings, availability calendar, earnings dashboard
- **Admin** — Full admin panel: users, listings, bookings, review moderation
- **Auth** — Email/password + Google OAuth + GitHub OAuth
- **200 real Denver listings** from Inside Airbnb (photos, ratings, amenities)
- Double-booking prevention via atomic DB transactions
- Instant book + request-to-book flows

---

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Stripe](https://stripe.com) account (test mode)
- Stripe CLI (for local webhooks)
- Optional: Google OAuth app, GitHub OAuth app, Uploadthing account, Resend account, Mapbox token

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/staylux.git
cd staylux
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Auth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional — login with Google)
GOOGLE_CLIENT_ID="from console.cloud.google.com"
GOOGLE_CLIENT_SECRET="from console.cloud.google.com"

# GitHub OAuth (optional — login with GitHub)
GITHUB_ID="from github.com/settings/developers"
GITHUB_SECRET="from github.com/settings/developers"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_... (from stripe listen output)"

# Uploadthing (optional — file uploads)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"

# Resend (optional — transactional emails)
RESEND_API_KEY="re_..."

# Mapbox (optional — listing maps)
NEXT_PUBLIC_MAPBOX_TOKEN="pk.eyJ1..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Push the database schema

```bash
npx prisma db push
```

### 5. Seed the database

Seeds an admin user, 8 hosts, 2 guests, and 50 luxury listings:

```bash
npm run db:seed
```

**Seeded accounts (all use password `Password123!`):**

| Email | Role |
|-------|------|
| `admin@staylux.com` | Admin |
| `nikos@staylux.com` | Host |
| `amira@staylux.com` | Host |
| `james@staylux.com` | Host |
| `sarah@example.com` | Guest |
| `marco@example.com` | Guest |

### 6. (Optional) Import 200 real Denver listings

Requires `listings.csv.gz` from [Inside Airbnb](https://insideairbnb.com/get-the-data/) (Denver, Colorado). Place it in the root folder alongside `import_denver.py`, then:

```bash
# From root StayLux/ folder (one level above staylux-app/)
python3 import_denver.py

# Then run the generated seed
cd staylux-app
npx tsx --tsconfig tsconfig.seed.json prisma/seed_denver.ts
```

### 7. Start the development server

```bash
npm run dev
```

App is available at **http://localhost:3000**

---

## Running Stripe Webhooks Locally

You need two terminals running simultaneously:

**Terminal 1 — Dev server:**
```bash
npm run dev
```

**Terminal 2 — Stripe webhook listener:**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` secret printed and set it as `STRIPE_WEBHOOK_SECRET` in `.env.local`, then restart the dev server.

**Test card numbers:**

| Card | Number |
|------|--------|
| Success | `4242 4242 4242 4242` |
| 3D Secure | `4000 0025 0000 3155` |
| Decline | `4000 0000 0000 0002` |

Use any future expiry (e.g. `12/34`), any CVC (`123`), any ZIP (`12345`).

---

## OAuth Setup (Optional)

### Google
1. Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID (Web application)
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret into `.env.local`

### GitHub
1. Go to github.com → Settings → Developer settings → OAuth Apps → New OAuth App
2. Set callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy Client ID + generate Client Secret → paste into `.env.local`

---

## Useful Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run db:seed       # Seed database with sample data
npm run db:studio     # Open Prisma Studio (visual DB browser)
npm run db:push       # Push schema changes to database
npm run db:generate   # Regenerate Prisma client
```

---

## Project Structure

```
staylux-app/
├── app/
│   ├── (auth)/          # Login, register, forgot password, reset password
│   ├── (main)/
│   │   ├── page.tsx     # Homepage with hero, featured listings
│   │   ├── listings/    # Browse listings + detail page + booking flow
│   │   ├── dashboard/   # Guest: bookings, messages, favorites, profile
│   │   ├── host/        # Host: listings CRUD, bookings, calendar, earnings
│   │   └── admin/       # Admin panel: users, listings, bookings, reviews
│   └── api/             # REST API routes
├── components/          # Reusable UI components (listings, ui, layout)
├── lib/                 # Auth, DB client, Stripe, email, utils
├── prisma/              # Schema, migrations, seed files
└── types/               # Shared TypeScript types
```

---

## Deployment

Configured for Vercel (`vercel.json` included). Set all environment variables in Vercel project settings. For production OAuth, update redirect URIs to your production domain.

---

## License

MIT
