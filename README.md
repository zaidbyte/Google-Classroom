# Classroom-themed site

A small Next.js app styled after Google Classroom's look, gated behind real
Google sign-in, with an email whitelist deciding who reaches the actual
homepage.

## How it works

1. Visiting `/` while signed out shows a Classroom-styled "Sign in with
   Google" screen (`components/SignInScreen.tsx`).
2. Signing in uses real Google OAuth via [Auth.js](https://authjs.dev)
   (`auth.ts`). No credentials are collected by this app — Google handles
   the login.
3. After sign-in, `app/page.tsx` checks the signed-in email against
   `WHITELISTED_EMAILS`:
   - **Whitelisted** → the Classroom-themed homepage
     (`components/Homepage.tsx`), with your real Google profile picture
     in the top-right corner and a search bar.
   - **Not whitelisted** → redirected to `https://classroom.google.com`.

## Setup

### 1. Create Google OAuth credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth client ID** of type **Web application**.
3. Add authorized redirect URIs:
   - Local dev: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://<your-vercel-domain>/api/auth/callback/google`
4. Copy the generated **Client ID** and **Client Secret**.

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- `AUTH_SECRET` — generate with `npx auth secret`
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — from step 1
- `WHITELISTED_EMAILS` — comma-separated list of emails allowed onto the
  main homepage, e.g. `you@gmail.com,friend@gmail.com`

### 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this from the
   repo).
2. Import the project into [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env.example` in the Vercel
   project's **Settings → Environment Variables**.
4. Add the production redirect URI
   (`https://<your-vercel-domain>/api/auth/callback/google`) to the OAuth
   client in Google Cloud Console.
5. Deploy.

## Notes

- The search bar currently just submits to `google.com/search` — it's a
  placeholder to expand later (e.g. a custom search backend).
- `homepage.html` in the repo root is the raw Google Classroom page you
  originally uploaded. It's kept for reference but isn't used by the app —
  it's a live scrape of Google's own production bundle and contains a real
  account's name, email, profile photo URL, and session tokens, so it
  should not be deployed as-is.
