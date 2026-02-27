"use client";

import { motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Excalidraw Clone",
        tag: "Canvas · Real-time",
        description: "Collaborative whiteboard for sketching diagrams and ideas in real-time.",
        src: "/projects/excalidraw-clone.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
        span: "col-span-2 row-span-2", // Large featured card
    },
    {
        id: 2,
        title: "OpenRouter Clone",
        tag: "AI · API Gateway",
        description: "Unified interface to route prompts across LLM providers.",
        src: "/projects/openrouter-clone.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
        span: "col-span-1 row-span-1",
    },
    {
        id: 3,
        title: "CivicReport",
        tag: "Civic · Full-stack",
        description: "Petition platform for citizens to report city problems.",
        src: "/projects/civicreport.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
        span: "col-span-1 row-span-1",
    },
    {
        id: 4,
        title: "Coming Soon",
        tag: "— · —",
        description: "Next project in progress. Something interesting is on the way.",
        src: null,
        github: null,
        live: null,
        span: "col-span-2 row-span-1",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay: i * 0.08,
        },
    }),
};

export default function Projects() {
    return (
        <section id="project" className="py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">Projects</h2>
                    <p className="text-[#444] text-xs uppercase tracking-[0.25em]">Selected work</p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[280px] gap-4">
                    {projects.map((project, i) => {
                        const destination = project.live ?? project.github ?? "#";
                        const isClickable = !!(project.live ?? project.github);

                        return (
                            <motion.div
                                key={project.id}
                                custom={i}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeUp}
                                className={`group relative rounded-2xl overflow-hidden border border-[#1a1a1a]
                                            bg-[#0d0d0d] hover:border-[#2e2e2e]
                                            transition-colors duration-500 cursor-default
                                            ${project.span}`}
                            >
                                {/* Background image with subtle zoom on hover */}
                                {project.src && (
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src={project.src}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top
                                                       opacity-30 group-hover:opacity-50
                                                       scale-100 group-hover:scale-105
                                                       transition-all duration-700 ease-out"
                                            draggable={false}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
                                    </div>
                                )}

                                {/* Coming Soon placeholder */}
                                {!project.src && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 border border-[#222] rounded-full flex items-center justify-center">
                                            <span className="text-[#333] text-2xl leading-none">+</span>
                                        </div>
                                    </div>
                                )}

                                {/* Content — pinned to bottom */}
                                <div className="absolute inset-0 flex flex-col justify-end p-5">
                                    <p className="text-[#666] text-[10px] tracking-[0.25em] uppercase mb-1.5 font-medium">
                                        {project.tag}
                                    </p>
                                    <h3 className="text-white font-bold text-xl leading-tight mb-1.5">
                                        {project.title}
                                    </h3>
                                    <p className="text-[#888] text-sm leading-relaxed mb-4
                                                  max-h-0 overflow-hidden opacity-0
                                                  group-hover:max-h-16 group-hover:opacity-100
                                                  transition-all duration-500 ease-out">
                                        {project.description}
                                    </p>

                                    {/* Links row */}
                                    <div className="flex items-center gap-3
                                                    translate-y-2 opacity-0
                                                    group-hover:translate-y-0 group-hover:opacity-100
                                                    transition-all duration-400 ease-out">
                                        {isClickable && (
                                            <a
                                                href={destination}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#aaa] hover:text-white text-[10px] tracking-[0.2em] uppercase font-medium
                                                           transition-colors duration-200 flex items-center gap-1.5"
                                            >
                                                View project
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2.5"
                                                    strokeLinecap="round" strokeLinejoin="round"
                                                >
                                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#666] hover:text-white transition-colors duration-200"
                                                title="View on GitHub"
                                            >
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        )}
                                        {!isClickable && !project.github && (
                                            <span className="text-[#444] text-[10px] tracking-[0.2em] uppercase font-medium">
                                                Coming soon
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
