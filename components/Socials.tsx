"use client";

import { motion } from "framer-motion";
import { socials, type Social } from "@/lib/site";
import { SectionTitle } from "./Reveal";

/** Minimal brand glyphs — fallback until the 3D PNGs are dropped in /public/icons3d */
function Glyph({ k }: { k: string }) {
  const common = "h-9 w-9";
  switch (k) {
    case "kick":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M4 3h4v6l4-6h5l-6 9 6 9h-5l-4-6v6H4z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M18.9 2H22l-7.3 8.4L23 22h-6.8l-5-6.5L5.5 22H2.4l7.8-9L1.6 2h7l4.5 6zM17.7 20l-9.9-13H6.2l10 13z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M16 3c.3 2.2 1.6 3.9 3.8 4.1v2.7c-1.3.1-2.6-.3-3.8-1v5.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 1 0 2 2.6V3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "snapchat":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M12 2c2.6 0 4.3 2 4.4 4.6.1 1 0 1.8 0 2 .3.2.8.3 1.3.1.9-.3 1.4.9.5 1.4-.6.3-1.4.4-1.6.9-.2.6.9 2.4 2.8 3.1.5.2.4.8-.1 1-.6.2-1.3.2-1.6.7-.2.4.1 1-.5 1.1-.7.1-1.5-.4-2.6 0-1 .4-1.7 1.6-3.9 1.6s-2.9-1.2-3.9-1.6c-1.1-.4-1.9.1-2.6 0-.6-.1-.3-.7-.5-1.1-.3-.5-1-.5-1.6-.7-.5-.2-.6-.8-.1-1 1.9-.7 3-2.5 2.8-3.1-.2-.5-1-.6-1.6-.9-.9-.5-.4-1.7.5-1.4.5.2 1 .1 1.3-.1 0-.2-.1-1 0-2C7.7 4 9.4 2 12 2z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M20 5.3A17 17 0 0 0 15.7 4l-.2.4a13 13 0 0 1 3.6 1.8 12 12 0 0 0-10.2 0A13 13 0 0 1 12.5 4.4L12.3 4A17 17 0 0 0 8 5.3C5.3 9.3 4.6 13.2 5 17a17 17 0 0 0 5.2 2.6l.6-1a11 11 0 0 1-1.8-.9l.4-.3a12 12 0 0 0 9.2 0l.4.3c-.6.4-1.2.7-1.8.9l.6 1A17 17 0 0 0 23 17c.4-4.4-.6-8.2-3-11.7zM9.7 14.7c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7zm4.6 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.6 1.7-1.5 1.7z" />
        </svg>
      );
    default:
      return null;
  }
}

function Card({ s, i }: { s: Social; i: number }) {
  const soon = s.handle === "soon";
  const Wrapper = soon ? "div" : "a";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Wrapper
        {...(!soon
          ? { href: s.url, target: "_blank", rel: "noreferrer" }
          : {})}
        className={`group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-border bg-surface transition-transform ${
          soon ? "cursor-default opacity-70" : "hover:-translate-y-2"
        }`}
      >
        <span
          className="absolute -bottom-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: s.color, opacity: 0.25 }}
        />
        {/* 3D icon slot — the PNG shows once added; glyph is the fallback */}
        <span
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl float-slow"
          style={{ color: s.color }}
        >
          {s.icon3d && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.icon3d}
              alt={s.label}
              className="absolute inset-0 h-full w-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <Glyph k={s.key} />
        </span>
        <div className="relative z-10 text-center">
          <p className="font-display text-sm font-bold">{s.label}</p>
          <p className="text-xs text-muted">{soon ? "Soon" : `@${s.handle}`}</p>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export function Socials() {
  return (
    <section id="socials" className="relative mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="Follow" title="Social Media" arabic="حسابات السوشل ميديا" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {socials.map((s, i) => (
          <Card key={s.key} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
