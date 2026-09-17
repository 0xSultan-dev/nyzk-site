NyZk site — where to drop images later
=======================================

hero/
  nyzk-face.jpg        → full-screen face photo for the homepage hero
                          (portrait/landscape, high-res; the purple shadow
                          overlay is applied automatically)

characters/
  nyzk.png             → cutout of NyZk (transparent background / no bg)
  char-2.png ...       → one cutout PNG per character
                          (file names must match `image` in lib/site.ts)

icons3d/
  kick.png  instagram.png  tiktok.png  x.png  snapchat.png  discord.png
                          → 3D app icons (transparent PNG). Until added,
                          a flat glyph shows as fallback.

clips/                  → not needed; clip thumbnails come live from Kick.

Notes
-----
- Anything missing just falls back gracefully (gradient / glyph / "Soon").
- Character names, roles, and bios are edited in  lib/site.ts
- Social handles are edited in  lib/site.ts  and  .env.local
