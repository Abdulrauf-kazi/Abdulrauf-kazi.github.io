"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Excalidraw Clone",
        tag: "Canvas · Real-time",
        description: "Collaborative whiteboard for sketching diagrams and ideas.",
        src: "/projects/excalidraw-clone.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
    },
    {
        id: 2,
        title: "OpenRouter Clone",
        tag: "AI · API Gateway",
        description: "Unified interface to route prompts across LLM providers.",
        src: "/projects/openrouter-clone.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
    },
    {
        id: 3,
        title: "CivicReport",
        tag: "Civic · Full-stack",
        description: "Petition platform for citizens to report city problems.",
        src: "/projects/civicreport.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
    },
    {
        id: 4,
        title: "Coming Soon",
        tag: "— · —",
        description: "Next project in progress. Something interesting is on the way.",
        src: null,
        github: null,
        live: null,
    },
];

// Duplicate for infinite seamless loop
const doubled = [...projects, ...projects];

export default function Projects() {
    const trackRef = useRef<HTMLDivElement>(null);

    const pause = () => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
    };
    const resume = () => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "running";
    };

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

            {/* Marquee track — pauses when mouse enters any card */}
            <div
                ref={trackRef}
                className="flex gap-5"
                style={{
                    animation: "marquee 45s linear infinite",
                    width: "max-content",
                }}
            >
                {doubled.map((project, i) => {
                    // Destination: live URL > github > "#"
                    const destination = project.live ?? project.github ?? "#";
                    const isClickable = !!(project.live ?? project.github);

                    return (
                        <div
                            key={i}
                            onMouseEnter={pause}
                            onMouseLeave={resume}
                            className="relative flex-shrink-0 rounded-2xl overflow-hidden
                                       border border-[#1e1e1e] hover:border-[#333]
                                       transition-all duration-500"
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
                                                <p className="text-[#333] text-xs tracking-[0.3em] uppercase">Coming Soon</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Subtle bottom fade */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                                </div>

                                {/* Info section — always visible */}
                                <div className="flex flex-col justify-between flex-1 px-5 py-4 bg-[#0d0d0d] border-t border-[#1e1e1e]">
                                    <div>
                                        <p className="text-[#888] text-[10px] tracking-[0.25em] uppercase mb-2 font-medium">
                                            {project.tag}
                                        </p>
                                        <h3 className="text-white font-bold text-lg leading-tight mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-[#aaa] text-sm leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Bottom row — view link + icons */}
                                    <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                                        {/* "View project" — clickable if there's a link */}
                                        {isClickable ? (
                                            <a
                                                href={destination}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[#aaa] hover:text-white text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 flex items-center gap-1.5 group/view"
                                            >
                                                View project
                                                <svg
                                                    width="11" height="11"
                                                    viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2.5"
                                                    strokeLinecap="round" strokeLinejoin="round"
                                                    className="opacity-60 group-hover/view:opacity-100 transition-opacity"
                                                >
                                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">
                                                Coming soon
                                            </span>
                                        )}

                                        <div className="flex items-center gap-3">
                                            {/* GitHub icon */}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[#777] hover:text-white transition-colors duration-200"
                                                    title="View on GitHub"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {/* External / live link icon — only if live URL exists */}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[#777] hover:text-white transition-colors duration-200"
                                                    title="View live"
                                                >
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Keyframe defined inline */}
            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
