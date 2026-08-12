"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const pipeline = [
  { key: "frontend", y: 90 },
  { key: "api", y: 200 },
  { key: "database", y: 310 },
];

const satellites = [
  { key: "mobile", x: 90 },
  { key: "ai", x: 260 },
  { key: "maps", x: 430 },
  { key: "infra", x: 600 },
];

export function ArchitectureDiagram() {
  const t = useTranslations("architecture.labels");
  const centerX = 345;
  const boxW = 260;
  const boxH = 56;
  const satY = 420;

  return (
    <div className="mx-auto w-full max-w-3xl overflow-x-auto no-scrollbar">
      <svg
        viewBox="0 0 690 480"
        className="mx-auto h-auto w-full min-w-[560px]"
        role="img"
        aria-label="Architecture diagram: user connects to a Next.js frontend, a Symfony REST API, and a PostgreSQL database, with Flutter, AI, MapLibre and infrastructure modules attached to the API layer"
      >
        <defs>
          <linearGradient id="arch-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.text
          x={centerX}
          y={24}
          textAnchor="middle"
          className="fill-foreground-muted font-mono"
          style={{ fontSize: 12, letterSpacing: 2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t("user")}
        </motion.text>

        {pipeline.map((node, i) => {
          const prevY = i === 0 ? 34 : pipeline[i - 1].y + boxH / 2;
          return (
            <motion.line
              key={`edge-${node.key}`}
              x1={centerX}
              y1={prevY}
              x2={centerX}
              y2={node.y - boxH / 2}
              stroke="url(#arch-edge)"
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            />
          );
        })}

        {pipeline.map((node, i) => (
          <motion.g
            key={node.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.15 }}
          >
            <rect
              x={centerX - boxW / 2}
              y={node.y - boxH / 2}
              width={boxW}
              height={boxH}
              rx={12}
              className={i === 1 ? "fill-accent" : "fill-card"}
              stroke={i === 1 ? "var(--accent)" : "var(--border-strong)"}
              strokeWidth={1.25}
            />
            <text
              x={centerX}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={
                i === 1
                  ? "fill-accent-foreground font-sans font-semibold"
                  : "fill-foreground font-sans font-semibold"
              }
              style={{ fontSize: 14 }}
            >
              {t(node.key)}
            </text>
          </motion.g>
        ))}

        {satellites.map((sat, i) => (
          <motion.line
            key={`sat-edge-${sat.key}`}
            x1={centerX}
            y1={200 + boxH / 2}
            x2={sat.x}
            y2={satY - 22}
            stroke="url(#arch-edge)"
            strokeWidth={1.25}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {satellites.map((sat, i) => (
          <motion.g
            key={sat.key}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            <rect
              x={sat.x - 62}
              y={satY - 22}
              width={124}
              height={44}
              rx={10}
              className="fill-card"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={sat.x}
              y={satY}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground-muted font-sans font-medium"
              style={{ fontSize: 12 }}
            >
              {t(sat.key)}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
