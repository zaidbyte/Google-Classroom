# Classroom-themed site

A small Next.js app styled after Google Classroom's look, gated behind real
Google sign-in (via Supabase Auth), with a pattern-based rule on the email
deciding who reaches the actual homepage.

## How it works

1. Visiting `/` while signed out shows a Classroom-styled "Sign in with
   Google" screen (`components/SignInScreen.tsx`), which calls
   `supabase.auth.signInWithOAuth({ provider: "google" })`. No credentials
   are collected by this app — Google and Supabase handle the login.
2. `app/auth/callback/route.ts` exchanges the OAuth code for a session.
3. `proxy.ts` runs on every request to `/`:
   - Calls `supabase.auth.getUser()` once (also refreshes the session
     cookie if the access token expired) — the only Supabase call in the
     whole request.
   - If signed in, checks the email against `lib/whitelist.ts`: it's
     allowed if it's in `EXTRA_ALLOWED_EMAILS` (individually named
     exceptions), or if it ends with `ALLOWED_EMAIL_DOMAIN` and its local
     part (before the `@`) starts with one of `ALLOWED_ID_PREFIXES`. This
     is a pure string check, not a database lookup, so it costs nothing
     and scales to any number of matching accounts (e.g. every student in
     a given cohort) without a table to maintain.
   - **Matches** → the request continues to `app/page.tsx`, which renders
     the Classroom-themed homepage (`components/Homepage.tsx`) with the
     real Google profile picture and name (passed via request headers set
     in proxy — no extra Supabase call in the page itself) and a search
     bar.
   - **Doesn't match** → redirected to `https://classroom.google.com`
     directly from proxy, before any page render.

## Setup

### 1. Google OAuth credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   and create (or reuse) an **OAuth client ID** of type **Web application**.
2. Add this authorized redirect URI (Supabase's own callback, not this
   app's):
   ```
   https://tbumrkmjeglwdgkcwevf.supabase.co/auth/v1/callback
   ```
3. Copy the **Client ID** and **Client Secret**.

### 2. Enable Google in Supabase Auth

In the [Supabase dashboard](https://supabase.com/dashboard/project/tbumrkmjeglwdgkcwevf/auth/providers) →
**Authentication → Providers → Google**:

- Enable the provider.
- Paste in the Client ID and Client Secret from step 1.

### 3. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL` — already filled in from this project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the publishable/anon key from
  Supabase dashboard → Settings → API.
- `ALLOWED_EMAIL_DOMAIN` / `ALLOWED_ID_PREFIXES` — who gets past the
  gate. Defaults (`students.csdmi.org`, `2001,2002`) are baked into
  `lib/whitelist.ts`, so these are only needed if that ever changes (e.g.
  adding next year's cohort prefix) — no code change or redeploy of logic
  needed, just update the env var.

### 4. Run locally

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
4. Deploy. No further redirect-URI changes are needed — Google only ever
   redirects to Supabase's own callback URL, and Supabase redirects back
   to whatever origin the sign-in request came from.

## Notes

- The search bar currently just submits to `google.com/search` — it's a
  placeholder to expand later (e.g. a custom search backend).
