# General God Store

Digital product store built with Next.js App Router, Prisma, and PostgreSQL.

## Overview

General God Store is a web app for managing and selling digital products with:

- Public storefront pages
- Auth pages (login/register)
- Admin dashboard (products, transactions, users)
- Payment integration flow (Midtrans)
- Product/saldo/provider flow (Digiflazz)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- PostgreSQL (Supabase-friendly)

## Project Structure

```text
app/
	(public)/
	(auth)/
	admin/
	api/
components/
lib/
prisma/
utils/
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create or update `.env` with your database and provider keys.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true&sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"

DIGIFLAZZ_USERNAME="your_username"
DIGIFLAZZ_API_KEY="your_api_key"
```

### 3) Generate Prisma client

```bash
npx prisma generate
```

### 4) Push schema to database

```bash
npx prisma db push
```

### 5) Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # run production server
npm run lint    # run eslint
```

## Notes

- Do not commit `.env` or any secret keys.
- If database auth fails (`P1000`), verify username/password and URL encoding.
- If Prisma client types break, run `npx prisma generate` again.

## Deployment

You can deploy to any Node.js-compatible host (Vercel, VPS, container platform, etc.).

Before deploy:

- Set production environment variables
- Run `npm run build`
- Ensure database is reachable from your hosting environment
