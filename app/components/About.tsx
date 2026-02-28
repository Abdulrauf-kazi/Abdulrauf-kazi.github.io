"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.9, ease: EASE },
});

// ── Data ─────────────────────────────────────────────────────────────────────

const skills = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++"] },
    { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express"] },
    { category: "Tools", items: ["Git", "Figma", "VS Code", "Tailwind CSS"] },
];


// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
    return (
        <section
            id="about"
            className="px-8 md:px-20 py-24 md:py-36 border-t border-[#1a1a1a]"
        >
            {/* ── BIO ── */}
            <div className="max-w-2xl mb-20 md:mb-28">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
                        About
                    </h2>
                    <p className="text-[#444] text-xs uppercase tracking-[0.25em]">
                        BTech CSE student who cares about the details.
                    </p>
                </motion.div>
            </div>

            {/* ── TECH STACK & SKILLS ── */}
            <div className="mb-20 md:mb-28">
                <motion.h3
                    {...fadeUp(0)}
                    className="text-xs tracking-[0.3em] uppercase text-[#555] mb-8"
                >
                    Tech Stack
                </motion.h3>

                <div className="flex flex-col gap-6">
                    {skills.map((group, gi) => (
                        <motion.div
                            key={group.category}
                            {...fadeUp(gi * 0.1)}
                            className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8"
                        >
                            <span className="text-xs text-[#444] uppercase tracking-widest w-28 shrink-0 pt-1">
                                {group.category}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-xs font-medium text-[#999] border border-[#222]
                                                   rounded-full hover:border-[#444] hover:text-white
                                                   transition-colors duration-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


        </section>
    );
}
