"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix = numeric !== null ? value.split(numericMatch![0])[0] : "";
  const suffix = numeric !== null ? value.split(numericMatch![0])[1] : "";

  useEffect(() => {
    if (!isInView) return;
    if (numeric === null) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Number.isInteger(numeric) ? String(Math.round(v)) : v.toFixed(1));
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
