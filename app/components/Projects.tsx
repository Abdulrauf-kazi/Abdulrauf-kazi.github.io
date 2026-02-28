"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal, { type Project } from "./ProjectModal";

const projects: Project[] = [
    {
        id: 1,
        title: "Excalidraw Clone",
        tag: "Canvas · Real-time",
        description: "Collaborative whiteboard for sketching diagrams and ideas in real-time.",
        detail:
            "A feature-rich collaborative drawing tool built on HTML Canvas. Supports freehand sketching, shape primitives, text annotations, and real-time multi-user collaboration via WebSockets. Designed to be fast and intuitive with a minimal UI that stays out of the way.",
        tech: ["React", "TypeScript", "Canvas API", "WebSockets", "Node.js"],
        src: "/projects/excalidraw-clone.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
        span: "col-span-2 row-span-2",
    },
    {
        id: 2,
        title: "OpenRouter Clone",
        tag: "AI · API Gateway",
        description: "Unified interface to route prompts across LLM providers.",
        detail:
            "A unified API gateway that abstracts multiple LLM providers (OpenAI, Anthropic, Mistral, etc.) behind a single endpoint. Handles provider routing, cost tracking, token counting, and fallback logic. Built with a clean dashboard to monitor usage in real-time.",
        tech: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL"],
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
        detail:
            "A full-stack civic tech platform that empowers citizens to report local issues — potholes, broken streetlights, garbage overflow — directly to city authorities. Features geotagged reports, image uploads, status tracking, and an admin dashboard for municipal teams.",
        tech: ["React", "Node.js", "Express", "PostgreSQL", "Cloudinary"],
        src: "/projects/civicreport.svg",
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
        span: "col-span-1 row-span-1",
    },
    {
        id: 4,
        title: "Atlas",
        tag: "Mobile · Social",
        description: "Share memories and visited places with the people who matter.",
        detail:
            "Atlas is a React Native mobile app that lets you capture and share memories tied to real locations. Pin a photo to a place on the map, write a note, and share it with friends — who can then see exactly where you've been and what you experienced there. Think of it as a personal travel journal that's also a shared memory map.",
        tech: ["React Native", "Expo", "TypeScript", "Supabase", "MapLibre"],
        src: null,
        github: "https://github.com/Abdulrauf-kazi",
        live: null,
        span: "col-span-1 row-span-1",
    },
    {
        id: 5,
        title: "Coming Soon",
        tag: "— · —",
        description: "Next project in progress. Something interesting is on the way.",
        detail: "",
        tech: [],
        src: null,
        github: null,
        live: null,
        span: "col-span-1 row-span-1",
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
    const [active, setActive] = useState<Project | null>(null);

    const openModal = (project: Project) => {
        // Don't open modal for placeholder cards
        if (!project.github && !project.live && !project.detail) return;
        setActive(project);
    };

    return (
        <>
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
                            const isClickable = !!(project.detail || project.github || project.live);

                            return (
                                <motion.div
                                    key={project.id}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-60px" }}
                                    variants={fadeUp}
                                    onClick={() => openModal(project)}
                                    className={`group relative rounded-2xl overflow-hidden border border-[#1a1a1a]
                                                bg-[#0d0d0d] hover:border-[#2e2e2e]
                                                transition-colors duration-500
                                                ${isClickable ? "cursor-pointer" : "cursor-default"}
                                                ${project.span}`}
                                >
                                    {/* Background image */}
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
                                        </div>
                                    )}

                                    {/* Atlas placeholder — map pin icon */}
                                    {!project.src && project.id === 4 && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                                                stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Coming Soon placeholder */}
                                    {!project.src && project.id === 5 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 border border-[#222] rounded-full flex items-center justify-center">
                                                <span className="text-[#333] text-2xl leading-none">+</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Click hint — top right */}
                                    {isClickable && project.id !== 5 && (
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-7 h-7 rounded-full border border-[#333] flex items-center justify-center">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                                    stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                                                </svg>
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
                                        <p className="text-[#888] text-sm leading-relaxed mb-3
                                                      max-h-0 overflow-hidden opacity-0
                                                      group-hover:max-h-16 group-hover:opacity-100
                                                      transition-all duration-500 ease-out">
                                            {project.description}
                                        </p>
                                        {isClickable && project.id !== 5 && (
                                            <p className="text-[#444] text-[10px] tracking-[0.2em] uppercase
                                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Click to explore →
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ProjectModal project={active} onClose={() => setActive(null)} />
        </>
    );
}
