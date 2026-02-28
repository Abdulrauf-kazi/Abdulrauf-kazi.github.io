"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: EASE },
});

export default function Hero() {
    return (
        <>
            {/* ── HERO ── */}
            <section
                id="home"
                className="relative h-screen flex flex-col justify-end px-8 md:px-20 pb-20 overflow-hidden"
            >
                {/* Name — massive display type */}
                <div className="overflow-hidden">
                    <motion.h1
                        {...fadeUp(0.3)}
                        className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.92] tracking-[-0.03em] text-[var(--text-primary)] uppercase"
                    >
                        Abdulrauf
                        <br />
                        <span style={{ color: "#c4bfa8" }}>Kazi</span>
                    </motion.h1>
                </div>

                {/* Role tag row */}
                <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 mt-6">
                    <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
                        BTech · CSE · Student
                    </span>
                    <span className="h-px flex-1 max-w-[80px]" style={{ background: "var(--section-border)" }} />
                    <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)] font-medium">
                        2026 – present
                    </span>
                </motion.div>

                {/* Scroll cue */}
                <motion.div
                    {...fadeUp(0.8)}
                    className="absolute bottom-10 right-8 md:right-20 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] rotate-90 origin-center">
                        scroll
                    </span>
                    <motion.span
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                        className="text-[var(--text-dim)] text-xl leading-none"
                    >
                        ↓
                    </motion.span>
                </motion.div>
            </section>

            {/* ── INTRO ── */}
            <section className="px-8 md:px-20 py-24 md:py-36" style={{ borderTop: "1px solid var(--section-border)" }}>
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold text-[var(--text-primary)] leading-[1.25] tracking-tight"
                    >
                        I build things for the web.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
                        className="mt-6 text-base md:text-lg text-[var(--text-body)] leading-relaxed max-w-xl"
                    >
                        Computer science student obsessed with clean interfaces,
                        thoughtful code, and turning ideas into real products.
                        Currently learning — always building.
                    </motion.p>
                </div>
            </section>
        </>
    );
}
