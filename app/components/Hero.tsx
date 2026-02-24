"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const headline = ["Hiding", "bad", "shit", "since", "2009."];
const subtext =
    "A visual designer — with skills that haven't been replaced by A.I (yet) — making good shit only if the paycheck is equally good.";

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6"
        >
            {/* Subtle radial gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,51,102,0.06) 0%, transparent 70%)",
                }}
            />

            <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-6xl mx-auto">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#888888] text-sm md:text-base tracking-widest uppercase mb-6"
                >
                    Visual Designer & Creative Director
                </motion.p>

                {/* Massive headline — word-by-word stagger */}
                <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-none tracking-tight mb-8 overflow-hidden">
                    {headline.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
                            <motion.span
                                className="inline-block"
                                initial={{ y: "110%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{
                                    delay: 0.1 + i * 0.1,
                                    duration: 0.85,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {word === "bad" ? (
                                    <span className="italic text-[#888888]">{word}</span>
                                ) : word === "shit" ? (
                                    <span className="text-[#ff3366]">{word}</span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#888888] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    {subtext}
                </motion.p>

                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                >
                    <a
                        href="#work"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group px-8 py-3.5 bg-[#ff3366] text-white font-bold rounded-full text-sm tracking-wide hover:bg-white hover:text-[#0a0a0a] transition-all duration-300"
                    >
                        See My Work
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-8 py-3.5 border border-white/20 text-white font-bold rounded-full text-sm tracking-wide hover:border-white/60 hover:bg-white/5 transition-all duration-300"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#888888]"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    );
}
