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

const timeline = [
    {
        year: "2023",
        title: "Started BTech CSE",
        desc: "Enrolled in Computer Science & Engineering. Started learning fundamentals — data structures, algorithms, and the web.",
    },
    {
        year: "2024",
        title: "First Real Project",
        desc: "Built my first full-stack web app. Learned React, Next.js, and how to ship something real.",
    },
    {
        year: "2025",
        title: "Sharpening the Craft",
        desc: "Focusing on clean code, UI details, and building a portfolio of work worth showing.",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
    return (
        <section
            id="about"
            className="px-8 md:px-20 py-24 md:py-36 border-t border-[#1a1a1a]"
        >
            {/* Section label */}
            <motion.span
                {...fadeUp(0)}
                className="block text-[10px] tracking-[0.35em] uppercase text-[#555] mb-14"
            >
                About
            </motion.span>

            {/* ── BIO ── */}
            <div className="max-w-2xl mb-20 md:mb-28">
                <motion.p
                    {...fadeUp(0.1)}
                    className="text-2xl md:text-3xl font-semibold text-white leading-[1.3] tracking-tight"
                >
                    BTech CSE student who cares about the details.
                </motion.p>
                <motion.p
                    {...fadeUp(0.2)}
                    className="mt-5 text-base text-[#666] leading-relaxed"
                >
                    I'm Abdulrauf Kazi — a computer science student driven by curiosity
                    and a genuine love for building. I spend my time writing code, studying
                    design, and figuring out how to make things that actually work well.
                    Not just functional — thoughtful.
                </motion.p>
            </div>

            {/* ── TECH STACK & SKILLS ── */}
            <div className="mb-20 md:mb-28">
                <motion.h3
                    {...fadeUp(0)}
                    className="text-[10px] tracking-[0.3em] uppercase text-[#555] mb-8"
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

            {/* ── TIMELINE ── */}
            <div>
                <motion.h3
                    {...fadeUp(0)}
                    className="text-[10px] tracking-[0.3em] uppercase text-[#555] mb-8"
                >
                    Timeline
                </motion.h3>

                <div className="relative flex flex-col gap-0">
                    {/* Vertical line */}
                    <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-[#1c1c1c]" />

                    {timeline.map((item, i) => (
                        <motion.div
                            key={item.year}
                            {...fadeUp(i * 0.12)}
                            className="flex gap-8 items-start py-8 border-b border-[#111] last:border-b-0"
                        >
                            {/* Year */}
                            <span className="text-xs text-[#444] tracking-widest font-mono w-10 shrink-0 pt-0.5">
                                {item.year}
                            </span>

                            {/* Dot */}
                            <span className="relative z-10 mt-1.5 w-2 h-2 rounded-full bg-[#333] border border-[#555] shrink-0" />

                            {/* Text */}
                            <div>
                                <p className="text-sm font-semibold text-white">{item.title}</p>
                                <p className="mt-1 text-sm text-[#555] leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
