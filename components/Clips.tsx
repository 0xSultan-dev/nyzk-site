"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { KickClip } from "@/lib/kick";
import { KICK_SLUG, site } from "@/lib/site";
import { SectionTitle } from "./Reveal";

function fmtDuration(s: number | null) {
  if (!s) return null;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function Clips({ clips }: { clips: KickClip[] }) {
  const [playing, setPlaying] = useState<KickClip | null>(null);

  return (
    <section id="clips" className="relative mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="Highlights" title="Saved Clips" arabic="الكليبات المحفوظة" />

      {clips.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
          <span className="rounded-full border border-purple/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-purple-bright">
            Soon
          </span>
          <p className="text-sm text-muted">
            Clips will appear here automatically once the channel has some.
          </p>
          <a
            href={site.kickUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-kick hover:underline"
          >
            Browse on Kick →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip, i) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <button
                onClick={() => setPlaying(clip)}
                className="relative block aspect-video w-full overflow-hidden"
              >
                {clip.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(124,58,237,0.25),transparent)]" />
                )}
                <span className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-purple/90 text-white shadow-lg">
                    ▶
                  </span>
                </span>
                {fmtDuration(clip.duration) && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium">
                    {fmtDuration(clip.duration)}
                  </span>
                )}
              </button>
              <div className="p-4">
                <a
                  href={clip.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium leading-snug transition-colors hover:text-purple-bright"
                  title="Open this clip on Kick"
                >
                  {clip.title}
                </a>
                {clip.views != null && (
                  <p className="mt-1 text-xs text-muted">
                    {clip.views.toLocaleString()} views
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* On-site player */}
      <AnimatePresence>
        {playing && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://player.kick.com/${KICK_SLUG}/clips/${playing.id}`}
                  title={playing.title}
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-4">
                <p className="font-medium">{playing.title}</p>
                <a
                  href={playing.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-sm font-semibold text-kick hover:underline"
                >
                  Open on Kick →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
