"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <section className="relative h-screen overflow-hidden bg-[#0a0a0a]">

            {/* ── Background: video (swap src when you have a file) ───────────── */}
            {/* Uncomment and set src="/your-video.mp4" when ready */}
            {/*
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-100"
        style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      */}

            {/* Animated gradient fallback (replace with video above when available) */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 120% 80% at 50% 60%, #111 0%, #0a0a0a 60%, #0a0a0a 100%)",
                    animation: "gradientPulse 8s ease-in-out infinite alternate",
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* ── Main content ─────────────────────────────────────────────────── */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                >
                    I am Abdulrauf Kazi
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 text-lg md:text-2xl text-[#aaa] font-normal max-w-xl"
                >
                    Passionate about learning new things
                </motion.p>
            </div>

            {/* ── Bottom-left badge ─────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-8 left-6 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-[#333]"
            >
                <span className="text-white text-xs font-bold leading-none">N</span>
            </motion.div>

            {/* Gradient pulse keyframe */}
            <style jsx>{`
        @keyframes gradientPulse {
          from { opacity: 0.8; }
          to   { opacity: 1; }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }
      `}</style>
        </section>
    );
}
