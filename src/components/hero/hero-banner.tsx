"use client";

import { motion } from "framer-motion";

const CARDS = [
  { x: 90, y: 150, w: 132, h: 92, label: "Web", delay: 0.5 },
  { x: 840, y: 150, w: 132, h: 92, label: "Mobile", delay: 0.62 },
  { x: 470, y: 190, w: 150, h: 66, label: "AI", delay: 0.74 },
];

export function HeroBanner() {
  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border bg-background-alt sm:aspect-[2.4/1]">
      <svg
        viewBox="0 0 1200 500"
        className="h-full w-full"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="Abstract illustration of a sky-blue horizon with layered hills and floating product screens, representing web, mobile and AI products"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-soft)" />
            <stop offset="100%" stopColor="var(--background)" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1200" height="500" fill="url(#sky)" />

        <motion.circle
          cx="1095"
          cy="85"
          r="55"
          className="fill-accent"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.path
          d="M0 360 C 180 300, 320 300, 480 350 C 640 400, 760 320, 960 340 C 1080 352, 1150 330, 1200 320 L1200 500 L0 500 Z"
          className="fill-accent/15"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M0 410 C 220 370, 380 430, 600 400 C 820 370, 980 430, 1200 400 L1200 500 L0 500 Z"
          className="fill-accent/30"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M0 460 C 260 430, 440 470, 700 450 C 900 435, 1040 465, 1200 450 L1200 500 L0 500 Z"
          className="fill-accent"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {CARDS.map((card) => (
          <motion.g
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x={card.x}
              y={card.y}
              width={card.w}
              height={card.h}
              rx={14}
              className="fill-card stroke-border-strong"
              strokeWidth={1.5}
            />
            <rect
              x={card.x + 16}
              y={card.y + 18}
              width={card.w - 32}
              height={8}
              rx={4}
              className="fill-accent"
            />
            <rect
              x={card.x + 16}
              y={card.y + 36}
              width={card.w - 60}
              height={6}
              rx={3}
              className="fill-border-strong"
            />
            <rect
              x={card.x + 16}
              y={card.y + 50}
              width={card.w - 76}
              height={6}
              rx={3}
              className="fill-border-strong"
            />
            <text
              x={card.x + 16}
              y={card.y + card.h - 14}
              className="fill-foreground-muted font-mono"
              style={{ fontSize: 11, letterSpacing: 1 }}
            >
              {card.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
