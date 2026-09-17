import { NextResponse } from "next/server";
import { getKickChannel } from "@/lib/kick";
import { KICK_SLUG } from "@/lib/site";

export const dynamic = "force-dynamic";

// Live status + channel snapshot. Polled by the LiveStream section.
export async function GET() {
  const channel = await getKickChannel(KICK_SLUG);
  return NextResponse.json(
    { channel, ok: channel !== null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
