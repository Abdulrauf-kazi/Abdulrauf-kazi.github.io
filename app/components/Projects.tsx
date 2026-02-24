"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

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

export default function Projects() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPaused = useRef(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onEnter = () => { isPaused.current = true; };
        const onLeave = () => { isPaused.current = false; };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        const interval = setInterval(() => {
            if (isPaused.current || !el) return;
            const cardWidth = el.firstElementChild
                ? (el.firstElementChild as HTMLElement).offsetWidth + 20
                : el.offsetWidth / 2;
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= maxScroll - 4) {
                // Loop back to start smoothly
                el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                el.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <section id="project" className="py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-[#444] text-xs uppercase tracking-[0.25em] mb-12"
                >
                    Selected work
                </motion.p>

                {/* Horizontal card strip — 2 per view, snap scroll */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                delay: i * 0.08,
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group relative flex-shrink-0 snap-start rounded-2xl overflow-hidden
                                       cursor-pointer border border-[#1a1a1a]
                                       hover:border-[#333] hover:scale-[1.01]
                                       transition-all duration-500"
                            style={{
                                width: "calc(50% - 10px)",
                                height: "clamp(360px, 55vh, 600px)",
                            }}
                        >
                            {/* Image or placeholder */}
                            {project.src ? (
                                <img
                                    src={project.src}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-8 h-8 border border-[#222] rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <span className="text-[#333] text-lg leading-none">+</span>
                                        </div>
                                        <p className="text-[#222] text-xs tracking-[0.3em] uppercase">Soon</p>
                                    </div>
                                </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-400
                                            flex flex-col justify-end p-5">
                                <p className="text-[#555] text-[10px] tracking-[0.25em] uppercase mb-1">
                                    {project.tag}
                                </p>
                                <h3 className="text-white font-bold text-lg leading-tight mb-1">
                                    {project.title}
                                </h3>
                                <p className="text-[#777] text-xs leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Default number badge */}
                            <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                                <span className="text-[#2a2a2a] text-xs tracking-[0.3em] font-medium">0{project.id}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
