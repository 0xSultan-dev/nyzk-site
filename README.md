# NyZk — official site

Landing site for **NyZk** on Kick. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, and Framer Motion. Live Kick data (followers, live status,
clips) is fetched server-side so API keys never reach the browser.

## Sections

1. **Hero** — full-screen face with a purple shadow, `NyZk #1` centered.
2. **Characters** — cards showing a name; click to unfold the full character info.
3. **Live Stream** — Kick player + live chat + a button straight to the stream
   (shows an offline state when not live; polls status every 30s).
4. **Saved Clips** — most-viewed clips; play on the site, or click the title to
   open the clip on Kick.
5. **Community Stats** — Kick / TikTok / X / Discord followers, Top Gifters
   (week / month / all), Stream Regulars (watch hours), Kick Top Gifters.
6. **Social Media** — Instagram, Snapchat, TikTok, X, Discord with 3D icons.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Environment variables (`.env.local` — never committed)

| Variable | Purpose | Status |
|---|---|---|
| `KICK_CLIENT_ID` / `KICK_CLIENT_SECRET` | Kick OAuth app (server-side) | set |
| `KICK_CHANNEL_SLUG` | channel slug (`nyzzk`) | set |
| `NEXT_PUBLIC_TIKTOK_USERNAME` / `NEXT_PUBLIC_X_USERNAME` | profile links | set |
| `X_BEARER_TOKEN` | X follower count | empty → **Soon** |
| `DISCORD_GUILD_ID` | Discord member count (enable Server Widget) | empty → **Soon** |
| `TIKTOK_FOLLOWERS` | TikTok follower count (no simple API) | empty → **Soon** |

> **Security:** `.env.local` is gitignored. The Kick client secret must **never**
> be committed or exposed to the client. If it ever leaks, reset it in the Kick
> developer dashboard.

## What's live vs. "Soon"

- **Live now:** Kick followers, live status, live chat, saved clips.
- **Soon (needs a source):** TikTok / X / Discord counts, Top Gifters, Stream
  Regulars, Kick Top Gifters. These come from the bot's database or extra API
  keys — wire them in `lib/stats.ts`. Until then the UI shows a "Soon" state.

## Editing content

- **Characters** (names, roles, bios, images): `lib/site.ts`
- **Social links / handles:** `lib/site.ts` + `.env.local`
- **Images:** drop files as described in `public/ASSETS-README.txt`

## Deploy (GitHub → Vercel)

1. Create a GitHub repo and push (see below).
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Add the environment variables from `.env.local` in
   **Project Settings → Environment Variables**.
4. Deploy. Vercel auto-detects Next.js; every push to `main` redeploys.
