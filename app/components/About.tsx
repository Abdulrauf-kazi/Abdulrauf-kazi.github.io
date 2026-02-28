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
    { category: "Tools", items: ["Git", "Figma", "VS Code", "Tailwind CSS", "Docker", "Nginx", "Deployment"] },
];


// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
    return (
        <section
            id="about"
            className="px-8 md:px-20 py-32 md:py-48 border-t border-[#1a1a1a]"
        >
            {/* ── BIO ── */}
            <div className="max-w-3xl mb-24 md:mb-36">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mb-10"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        About
                    </h2>
                    <p className="text-[#707070] text-xs uppercase tracking-[0.25em]">
                        BTech CSE student who cares about the details.
                    </p>
                </motion.div>

                <motion.p
                    {...fadeUp(0.1)}
                    className="text-[#a0a0a0] text-lg md:text-xl leading-relaxed mb-6"
                >
                    I&apos;m a computer science student passionate about building
                    thoughtful digital products — from clean, performant UIs to
                    well-structured backends. I enjoy the entire process: sketching
                    ideas, writing code that scales, and obsessing over the small
                    details that make a product feel polished.
                </motion.p>

                <motion.p
                    {...fadeUp(0.2)}
                    className="text-[#808080] text-base md:text-lg leading-relaxed"
                >
                    When I&apos;m not coding, you&apos;ll find me exploring open-source
                    projects, tinkering with side experiments, or thinking about
                    how great design and engineering intersect.
                </motion.p>
            </div>


            {/* ── TECH STACK & SKILLS ── */}
            <div className="mb-20 md:mb-28">
                <motion.h3
                    {...fadeUp(0)}
                    className="text-xs tracking-[0.3em] uppercase text-[#707070] mb-8"
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
                            <span className="text-xs text-[#606060] uppercase tracking-widest w-28 shrink-0 pt-1">
                                {group.category}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-xs font-medium text-[#aaa] border border-[#2a2a2a]
                                                   rounded-full hover:border-[#555] hover:text-white
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
