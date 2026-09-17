/**
 * Aggregated community stats — SERVER ONLY.
 * Real where we have a source; `null` (→ "Soon" in UI) otherwise.
 */
import { getKickChannel } from "@/lib/kick";
import { KICK_SLUG } from "@/lib/site";

export type Leader = { rank: number; name: string; value: string; avatar?: string };

export type SiteStats = {
  followers: {
    kick: number | null;
    tiktok: number | null;
    x: number | null;
    discord: number | null;
  };
  topGifters: { week: Leader[]; month: Leader[]; all: Leader[] };
  streamRegulars: Leader[];
  kickTopGifters: Leader[];
  updatedAt: string;
};

async function getDiscordMembers(): Promise<number | null> {
  const guild = process.env.DISCORD_GUILD_ID;
  if (!guild) return null;
  try {
    // Requires "Server Widget" enabled in Discord server settings.
    const res = await fetch(`https://discord.com/api/guilds/${guild}/widget.json`, {
      next: { revalidate: 120 }, signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { presence_count?: number };
    return typeof json.presence_count === "number" ? json.presence_count : null;
  } catch {
    return null;
  }
}

async function getXFollowers(): Promise<number | null> {
  const token = process.env.X_BEARER_TOKEN;
  const username = process.env.NEXT_PUBLIC_X_USERNAME;
  if (!token || !username) return null;
  try {
    const res = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
      { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: { public_metrics?: { followers_count?: number } };
    };
    return json.data?.public_metrics?.followers_count ?? null;
  } catch {
    return null;
  }
}

function getTiktokFollowers(): number | null {
  const v = process.env.TIKTOK_FOLLOWERS;
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}

export async function getSiteStats(): Promise<SiteStats> {
  const [channel, discord, x] = await Promise.all([
    getKickChannel(KICK_SLUG),
    getDiscordMembers(),
    getXFollowers(),
  ]);

  return {
    followers: {
      kick: channel?.followers ?? null,
      tiktok: getTiktokFollowers(),
      x,
      discord,
    },
    // These come from the bot's database (gifts / watch hours).
    // Wire the bot export here later; empty arrays render as "Soon".
    topGifters: { week: [], month: [], all: [] },
    streamRegulars: [],
    kickTopGifters: [],
    updatedAt: new Date().toISOString(),
  };
}
