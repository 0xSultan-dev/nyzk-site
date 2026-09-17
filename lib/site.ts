/**
 * Central site config. Edit handles, links, and character data here.
 * Anything left empty / marked `soon` renders a "Soon" state on the site.
 */

export const KICK_SLUG = process.env.KICK_CHANNEL_SLUG ?? "nyzzk";

export const site = {
  brand: "NyZk",
  tagline: "#1",
  kickUrl: `https://kick.com/${KICK_SLUG}`,
};

export type Social = {
  key: string;
  label: string;
  handle: string;
  url: string;
  /** brand color used for the hover glow */
  color: string;
  /** path under /public for the 3D icon — add later; falls back to a glyph */
  icon3d?: string;
};

const tiktok = process.env.NEXT_PUBLIC_TIKTOK_USERNAME ?? "..rh32";
const x = process.env.NEXT_PUBLIC_X_USERNAME ?? "nyzk65";

export const socials: Social[] = [
  {
    key: "kick",
    label: "Kick",
    handle: KICK_SLUG,
    url: `https://kick.com/${KICK_SLUG}`,
    color: "#53fc18",
    icon3d: "/icons3d/kick.png",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "soon",
    url: "#",
    color: "#e1306c",
    icon3d: "/icons3d/instagram.png",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: tiktok,
    url: `https://www.tiktok.com/@${tiktok}`,
    color: "#25f4ee",
    icon3d: "/icons3d/tiktok.png",
  },
  {
    key: "x",
    label: "X",
    handle: x,
    url: `https://x.com/${x}`,
    color: "#ffffff",
    icon3d: "/icons3d/x.png",
  },
  {
    key: "snapchat",
    label: "Snapchat",
    handle: "soon",
    url: "#",
    color: "#fffc00",
    icon3d: "/icons3d/snapchat.png",
  },
  {
    key: "discord",
    label: "Discord",
    handle: "soon",
    url: "#",
    color: "#5865f2",
    icon3d: "/icons3d/discord.png",
  },
];

export type Character = {
  id: string;
  name: string;
  /** short line shown on the card face */
  role?: string;
  /** full bio revealed on expand; empty => "Soon" */
  bio?: string;
  /** stats/traits revealed on expand */
  traits?: { label: string; value: string }[];
  /** cutout image (no background) under /public/characters — add later */
  image?: string;
  accent?: string;
};

/**
 * NyZk characters. Fill real names/bios/images later.
 * Cards show only the name until clicked; then the full info unfolds.
 */
export const characters: Character[] = [
  {
    id: "nyzk",
    name: "NyZk",
    role: "The One",
    bio: "",
    accent: "#a855f7",
    image: "/characters/nyzk.png",
    traits: [
      { label: "Rank", value: "#1" },
      { label: "Since", value: "Soon" },
    ],
  },
  {
    id: "char-2",
    name: "Character 02",
    role: "Soon",
    accent: "#c084fc",
    image: "/characters/char-2.png",
  },
  {
    id: "char-3",
    name: "Character 03",
    role: "Soon",
    accent: "#7c3aed",
    image: "/characters/char-3.png",
  },
  {
    id: "char-4",
    name: "Character 04",
    role: "Soon",
    accent: "#8b5cf6",
    image: "/characters/char-4.png",
  },
];
