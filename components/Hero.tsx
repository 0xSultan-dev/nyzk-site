"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Face background. Drop the photo at /public/hero/nyzk-face.jpg later;
          until then the gradient below carries the look. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(7,6,11,0.35) 0%, rgba(7,6,11,0.15) 40%, rgba(7,6,11,0.9) 100%), url('/hero/nyzk-face.jpg')",
          backgroundColor: "#0b0714",
        }}
      />

      {/* Purple shadow — hides most of the room, keeps focus on the face */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, rgba(124,58,237,0.10) 0%, rgba(88,28,135,0.35) 45%, rgba(7,6,11,0.92) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_30%,rgba(7,6,11,0.85)_100%)]" />

      {/* Center title */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-glow text-6xl font-extrabold uppercase leading-none tracking-tight sm:text-8xl md:text-[9rem]"
        >
          {site.brand}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-purple-bright/60" />
          <span className="font-display bg-gradient-to-r from-purple-bright to-purple bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            {site.tagline}
          </span>
          <span className="h-px w-10 bg-purple-bright/60" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#characters"
        aria-label="Scroll"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-purple-bright/50 p-1.5">
          <span className="h-2 w-1 rounded-full bg-purple-bright" />
        </span>
      </motion.a>
    </section>
  );
}
