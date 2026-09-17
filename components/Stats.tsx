"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Leader, SiteStats } from "@/lib/stats";
import { compact } from "@/lib/format";
import { SectionTitle } from "./Reveal";

const followerMeta = [
  { key: "kick", label: "Kick Followers", color: "#53fc18", arabic: "متابعين كيك" },
  { key: "tiktok", label: "TikTok Followers", color: "#25f4ee", arabic: "متابعين تيك توك" },
  { key: "x", label: "X Followers", color: "#e7e7e7", arabic: "متابعين X" },
  { key: "discord", label: "Discord Members", color: "#5865f2", arabic: "أعضاء ديسكورد" },
] as const;

function SoonPill() {
  return (
    <span className="rounded-full border border-purple/30 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-purple-bright">
      Soon
    </span>
  );
}

function FollowerTile({
  label,
  arabic,
  color,
  value,
  i,
}: {
  label: string;
  arabic: string;
  color: string;
  value: number | null;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6"
    >
      <span
        className="absolute right-0 top-0 h-20 w-20 rounded-full blur-2xl"
        style={{ background: color, opacity: 0.18 }}
      />
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
      {/* Number in ink, not the brand color (accessibility) */}
      <p className="font-display mt-4 text-4xl font-extrabold tabular-nums">
        {value == null ? <SoonPill /> : compact(value)}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
      <p className="font-arabic text-xs text-muted/70" dir="rtl">
        {arabic}
      </p>
    </motion.div>
  );
}

function Board({
  title,
  arabic,
  hint,
  rows,
}: {
  title: string;
  arabic: string;
  hint?: string;
  rows: Leader[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-lg font-bold">{title}</h3>
          {hint && <p className="text-xs text-muted">{hint}</p>}
        </div>
        <span className="font-arabic text-sm text-muted" dir="rtl">
          {arabic}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
          <SoonPill />
          <p className="text-xs text-muted">Data connects here soon.</p>
        </div>
      ) : (
        <ol className="scroll-thin flex flex-col gap-1">
          {rows.map((r) => (
            <li
              key={r.rank}
              className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface-2"
            >
              <span
                className={`font-display w-6 text-center text-sm font-extrabold ${
                  r.rank === 1
                    ? "text-yellow-400"
                    : r.rank === 2
                      ? "text-slate-300"
                      : r.rank === 3
                        ? "text-amber-600"
                        : "text-muted"
                }`}
              >
                {r.rank}
              </span>
              <span className="flex-1 truncate text-sm font-medium">{r.name}</span>
              <span className="font-display text-sm font-bold tabular-nums text-purple-bright">
                {r.value}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

type Period = "week" | "month" | "all";

export function Stats({ stats }: { stats: SiteStats }) {
  const [period, setPeriod] = useState<Period>("all");
  const periods: { key: Period; label: string; ar: string }[] = [
    { key: "week", label: "Week", ar: "الأسبوع" },
    { key: "month", label: "Month", ar: "الشهر" },
    { key: "all", label: "All", ar: "الكل" },
  ];

  return (
    <section id="stats" className="relative mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="The Numbers" title="Community Stats" arabic="الإحصائيات" />

      {/* Follower tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {followerMeta.map((m, i) => (
          <FollowerTile
            key={m.key}
            label={m.label}
            arabic={m.arabic}
            color={m.color}
            value={stats.followers[m.key]}
            i={i}
          />
        ))}
      </div>

      {/* Leaderboards */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top Gifters with period tabs */}
        <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Top Gifters</h3>
            <div className="flex rounded-full border border-border p-0.5">
              {periods.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    period === p.key
                      ? "bg-purple text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          {stats.topGifters[period].length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <SoonPill />
              <p className="text-xs text-muted">Gifting leaderboard connects soon.</p>
            </div>
          ) : (
            <ol className="flex flex-col gap-1">
              {stats.topGifters[period].map((r) => (
                <li
                  key={r.rank}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface-2"
                >
                  <span className="font-display w-6 text-center text-sm font-extrabold text-muted">
                    {r.rank}
                  </span>
                  <span className="flex-1 truncate text-sm font-medium">{r.name}</span>
                  <span className="font-display text-sm font-bold text-purple-bright">
                    {r.value}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <Board
          title="Stream Regulars"
          arabic="الأكثر حضورًا"
          hint="Most active across all streams · hours watched (signed in on Kick)"
          rows={stats.streamRegulars}
        />

        <Board
          title="Kick Top Gifters"
          arabic="القفنان في الكيك"
          hint="All-time on Kick"
          rows={stats.kickTopGifters}
        />
      </div>
    </section>
  );
}
