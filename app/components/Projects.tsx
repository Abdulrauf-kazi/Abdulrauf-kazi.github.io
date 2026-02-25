"use client";

import { motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Excalidraw Clone",
        tag: "Canvas · Real-time",
        description: "Collaborative whiteboard for sketching diagrams and ideas.",
        src: "/projects/excalidraw-clone.svg",
    },
    {
        id: 2,
        title: "OpenRouter Clone",
        tag: "AI · API Gateway",
        description: "Unified interface to route prompts across LLM providers.",
        src: "/projects/openrouter-clone.svg",
    },
    {
        id: 3,
        title: "CivicReport",
        tag: "Civic · Full-stack",
        description: "Petition platform for citizens to report city problems.",
        src: "/projects/civicreport.svg",
    },
    {
        id: 4,
        title: "Coming Soon",
        tag: "— · —",
        description: "Next project in progress. Something interesting is on the way.",
        src: null,
    },
];

// Duplicate for infinite seamless loop
const doubled = [...projects, ...projects];

export default function Projects() {
    return (
        <section id="project" className="py-24 overflow-hidden">

            {/* Header */}
            <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-bold text-white mb-3"
                >
                    Projects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-[#444] text-xs uppercase tracking-[0.25em]"
                >
                    Selected work
                </motion.p>
            </div>

            {/* Marquee track — CSS infinite scroll, pauses on hover */}
            <div
                className="group flex gap-5"
                style={{
                    animation: "marquee 45s linear infinite",
                    width: "max-content",
                }}
            >
                {doubled.map((project, i) => (
                    <div
                        key={i}
                        className="relative flex-shrink-0 rounded-2xl overflow-hidden
                                   border border-[#1e1e1e] hover:border-[#444]
                                   transition-all duration-500 cursor-pointer"
                        style={{
                            width: "44vw",
                            maxWidth: "600px",
                            minWidth: "320px",
                            height: "56vh",
                            minHeight: "360px",
                        }}
                    >
                        {/* Card inner layout */}
                        <div className="flex flex-col h-full">

                            {/* Image area — top 60% */}
                            <div className="relative overflow-hidden bg-[#0d0d0d]" style={{ height: "60%" }}>
                                {project.src ? (
                                    <img
                                        src={project.src}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top"
                                        draggable={false}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-10 h-10 border border-[#2a2a2a] rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-[#444] text-xl leading-none">+</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Subtle bottom fade into info section */}
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                            </div>

                            {/* Info section — always visible */}
                            <div className="flex flex-col justify-between flex-1 px-5 py-4 bg-[#0d0d0d] border-t border-[#1a1a1a]">
                                <div>
                                    <p className="text-[#444] text-[10px] tracking-[0.25em] uppercase mb-2">
                                        {project.tag}
                                    </p>
                                    <h3 className="text-white font-bold text-lg leading-tight mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-[#555] text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                                {/* Bottom row */}
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-[#2a2a2a] text-[10px] tracking-[0.2em] uppercase">View project</span>
                                    <span className="text-[#2a2a2a] text-xs">→</span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Keyframe defined inline */}
            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .group:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
