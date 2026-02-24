"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        period: "2022 — Present",
        role: "Self-lead Designer",
        company: "Freelance",
        description:
            "Taking on projects nobody else would, delivering results that surprised even myself.",
    },
    {
        period: "2020 — 2022",
        role: "Regular Web Designer",
        company: "Some Agency, Inc.",
        description:
            "Attended meetings about meetings, made countless 'final_v3_FINAL.psd' files.",
    },
    {
        period: "2017 — 2020",
        role: "Photoshop Doodler",
        company: "Startup That's Now Dead",
        description:
            "Wore many hats — designer, developer, coffee maker. Mostly coffee maker.",
    },
    {
        period: "2015 — 2017",
        role: "Jurassic Designer",
        company: "Corporate Hell LLC",
        description:
            "Designed things that never shipped. Built a thick skin and a massive Dribbble portfolio.",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <p className="text-[#888888] text-sm tracking-widest uppercase mb-4">Career</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                        Experience
                    </h2>
                    <p className="text-[#888888] text-lg md:text-xl max-w-2xl leading-relaxed">
                        Only seven years of actively producing cool shit. Other years were me messing
                        around and navigating through my career.
                    </p>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mt-16 mb-0" />

                {/* Timeline list */}
                <div className="relative">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                delay: i * 0.12,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300 px-0 md:px-4 -mx-0 md:-mx-4 rounded-xl"
                        >
                            {/* Period */}
                            <div className="md:w-44 shrink-0">
                                <span className="text-[#888888] text-sm font-mono">{exp.period}</span>
                            </div>

                            {/* Dot */}
                            <div className="hidden md:flex items-start pt-1">
                                <div className="w-2 h-2 rounded-full bg-[#ff3366] mt-1.5 group-hover:scale-150 transition-transform duration-300" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-1 group-hover:text-[#ff3366] transition-colors duration-300">
                                    {exp.role}
                                </h3>
                                <p className="text-[#888888] font-medium mb-3">{exp.company}</p>
                                <p className="text-[#888888] text-base leading-relaxed">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
