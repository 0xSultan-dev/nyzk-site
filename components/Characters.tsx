"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { characters, type Character } from "@/lib/site";
import { SectionTitle } from "./Reveal";

function CharacterImage({ c, className }: { c: Character; className?: string }) {
  // Cutout image (no background) dropped at /public/characters/*.png later.
  // Until then, a stylized monogram stands in.
  return (
    <div className={`relative flex items-end justify-center ${className ?? ""}`}>
      <div
        className="absolute inset-x-6 bottom-0 h-2/3 rounded-[40%] blur-2xl"
        style={{ background: c.accent ?? "#a855f7", opacity: 0.25 }}
      />
      {c.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.image}
          alt={c.name}
          className="relative z-10 max-h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}
      <span
        className="font-display absolute z-0 select-none text-7xl font-extrabold opacity-20"
        style={{ color: c.accent ?? "#a855f7" }}
      >
        {c.name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

export function Characters() {
  const [active, setActive] = useState<Character | null>(null);

  return (
    <section id="characters" className="relative mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="The Cast" title="NyZk Characters" arabic="شخصيات نيزك" />

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {characters.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => setActive(c)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative flex h-72 flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left sm:h-80"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120% 80% at 50% 100%, ${c.accent}22, transparent 70%)`,
              }}
            />
            <CharacterImage c={c} className="flex-1 pt-6" />
            <div className="relative z-10 border-t border-border/60 bg-background/40 p-4 backdrop-blur-sm">
              <p className="font-display text-lg font-bold">{c.name}</p>
              <p className="text-xs text-muted">
                {c.role ?? "Tap to reveal"} · <span className="text-purple-bright">open</span>
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Expanded info */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glow-purple relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-surface md:flex-row"
            >
              <div className="relative h-64 w-full shrink-0 md:h-auto md:w-2/5">
                <CharacterImage c={active} className="h-full py-6" />
              </div>
              <div className="flex-1 p-7">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.3em]"
                  style={{ color: active.accent ?? "#c084fc" }}
                >
                  {active.role ?? "Character"}
                </span>
                <h3 className="font-display mt-2 text-3xl font-extrabold">{active.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {active.bio && active.bio.length > 0 ? (
                    active.bio
                  ) : (
                    <span className="italic">Full bio coming soon.</span>
                  )}
                </p>

                {active.traits && active.traits.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {active.traits.map((t) => (
                      <div
                        key={t.label}
                        className="rounded-xl border border-border bg-surface-2 px-4 py-3"
                      >
                        <p className="text-[11px] uppercase tracking-wide text-muted">
                          {t.label}
                        </p>
                        <p className="font-display text-lg font-bold">{t.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setActive(null)}
                  className="mt-7 rounded-full border border-border px-5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
