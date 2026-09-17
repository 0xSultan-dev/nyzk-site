import { NextResponse } from "next/server";
import { getSiteStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getSiteStats();
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
  });
}
