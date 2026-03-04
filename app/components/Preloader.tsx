"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Ring definitions ─────────────────────────────────────────────────── */
/* Each ring has a label array, a radius, rotation direction & speed,
   font size, and the progress % at which it dispatches into view.       */

const RINGS = [
  {
    label: "Tech Stack",
    words: [
      "REACT", "NEXT.JS", "TYPESCRIPT", "NODE", "TAILWIND",
      "GSAP", "THREE.JS", "POSTGRESQL", "REDIS", "DOCKER",
    ],
    radius: 140,
    direction: 1,        // clockwise
    speed: 36,           // seconds per full rotation
    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
    fontWeight: 700,
    threshold: 0,        // visible from 0 %
  },
  {
    label: "Design & Creative",
    words: [
      "FIGMA", "BLENDER", "PREMIERE", "PHOTOSHOP",
      "AFTER EFFECTS", "MIDJOURNEY", "SPLINE",
    ],
    radius: 220,
    direction: -1,       // counter-clockwise
    speed: 44,
    fontSize: "clamp(0.7rem, 1.6vw, 1.05rem)",
    fontWeight: 600,
    threshold: 20,       // appears at 20 %
  },
  {
    label: "Built for Fun",
    words: [
      "EXCALIDRAW CLONE", "CLI GAMES", "PIXEL ART EDITOR",
      "SHADER TOYS", "WEATHER WIDGET", "MARKDOWN PREVIEWER",
    ],
    radius: 310,
    direction: 1,
    speed: 52,
    fontSize: "clamp(0.75rem, 1.8vw, 1.15rem)",
    fontWeight: 600,
    threshold: 40,       // appears at 40 %
  },
];

/* Pre-compute character arrays for each ring */
const RING_CHARS = RINGS.map((r) => r.words.join(" · ").split(""));

/* ─────────────────────────────────────────────────────────────────────── */

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  /* ── Progress timer ─────────────────────────────────────────────────── */
  useEffect(() => {
    // Smooth eased progress: pause at 0, accelerate, decelerate, pause at 100
    const HOLD_START = 200;   // ms pause at 0%
    const RAMP_DURATION = 1200; // ms for 0→100 with easing
    const HOLD_END = 300;     // ms pause at 100%
    let start: number | null = null;
    let raf: number;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;

      if (elapsed < HOLD_START) {
        // hold at 0 %
        setProgress(0);
      } else if (elapsed < HOLD_START + RAMP_DURATION) {
        // ease-in-out ramp
        const t = (elapsed - HOLD_START) / RAMP_DURATION; // 0→1 linear
        // cubic ease-in-out
        const eased = t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
        setProgress(Math.min(100, Math.round(eased * 100)));
      } else if (elapsed < HOLD_START + RAMP_DURATION + HOLD_END) {
        // hold at 100 %
        setProgress(100);
      } else {
        // done
        setIsExiting(true);
        setTimeout(onComplete, 1200);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#B0BDB0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── Rings ─────────────────────────────────────────────────── */}
          {RINGS.map((ring, ri) => {
            const chars = RING_CHARS[ri];
            const angleStep = 360 / chars.length;
            const visible = progress >= ring.threshold;

            return (
              <AnimatePresence key={ri}>
                {visible && (
                  <motion.div
                    key={`ring-${ri}`}
                    initial={{ scale: 0.4, opacity: 0, rotate: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: ring.direction * 360,
                    }}
                    exit={{
                      scale: 1.8,
                      opacity: 0,
                      transition: {
                        duration: 1.2,
                        ease: [0.33, 1, 0.68, 1],
                      },
                    }}
                    transition={{
                      scale: {
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: 0.9, ease: "easeOut" },
                      rotate: {
                        duration: ring.speed,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                    style={{
                      position: "absolute",
                      width: ring.radius * 2,
                      height: ring.radius * 2,
                    }}
                  >
                    {chars.map((char, ci) => {
                      const angle = angleStep * ci - 90;
                      return (
                        <span
                          key={ci}
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: `rotate(${angle}deg) translateY(-${ring.radius}px)`,
                            transformOrigin: "0 0",
                            fontSize: ring.fontSize,
                            fontFamily: "var(--font-display)",
                            fontWeight: ring.fontWeight,
                            color: "#1a1a1a",
                            userSelect: "none",
                            pointerEvents: "none",
                            lineHeight: 1,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}

          {/* ── Progress counter (center) ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.6,
              transition: { duration: 1, ease: "easeIn" },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 500,
              color: "#1a1a1a",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
