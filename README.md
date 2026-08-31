# Classroom-themed site

A small Next.js app styled after Google Classroom's look, gated behind real
Google sign-in (via Supabase Auth), with an email whitelist deciding who
reaches the actual homepage.

## How it works

1. Visiting `/` while signed out shows a Classroom-styled "Sign in with
   Google" screen (`components/SignInScreen.tsx`), which calls
   `supabase.auth.signInWithOAuth({ provider: "google" })`. No credentials
   are collected by this app — Google and Supabase handle the login.
2. `app/auth/callback/route.ts` exchanges the OAuth code for a session.
3. `middleware.ts` runs on every request to `/`:
   - Calls `supabase.auth.getUser()` once (also refreshes the session
     cookie if the access token expired).
   - If signed in, checks the `whitelist` table for that email — a
     row-level-security policy restricts this to the caller's own row,
     and the query uses `head: true` so no row data is transferred, just
     a count.
   - **Whitelisted** → the request continues to `app/page.tsx`, which
     renders the Classroom-themed homepage (`components/Homepage.tsx`)
     with the real Google profile picture and name (passed via request
     headers set in middleware — no extra Supabase call in the page
     itself) and a search bar.
   - **Not whitelisted** → redirected to `https://classroom.google.com`
     directly from middleware, before any page render.

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

### 3. Whitelist emails

The `whitelist` table starts empty. Add emails allowed onto the homepage
via the Supabase SQL editor:

```sql
insert into public.whitelist (email) values ('you@gmail.com');
```

Anyone who signs in but isn't in this table is redirected to
`classroom.google.com` instead of seeing the homepage.

### 4. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL` — already filled in from this project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the publishable/anon key from
  Supabase dashboard → Settings → API.

### 5. Run locally

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
- `homepage.html` in the repo root is the raw Google Classroom page you
  originally uploaded. It's kept for reference but isn't used by the app —
  it's a live scrape of Google's own production bundle and contains a real
  account's name, email, profile photo URL, and session tokens, so it
  should not be deployed as-is.
