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
        title: "Petition",
        tag: "Civic · Full-stack",
        description: "Petition platform for citizens to report city problems.",
        detail:
            "A full-stack civic tech platform that empowers citizens to report local issues — potholes, broken streetlights, garbage overflow — directly to city authorities. Features geotagged reports, image uploads, status tracking, and an admin dashboard for municipal teams.",
        tech: ["React", "Node.js", "Express", "PostgreSQL", "Cloudinary"],
        src: "/projects/petition.svg",
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
        span: "col-span-3 row-span-1",
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
                        <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-3">Projects</h2>
                        <p className="text-[var(--text-dim)] text-xs uppercase tracking-[0.25em]">Selected work</p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-3 auto-rows-[260px] gap-4">
                        {projects.map((project, i) => {
                            const isClickable = !!(project.detail || project.github || project.live);
                            const isWide = project.span?.includes("col-span-3");

                            return (
                                <motion.div
                                    key={project.id}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-60px" }}
                                    variants={fadeUp}
                                    onClick={() => openModal(project)}
                                    className={`group relative rounded-2xl overflow-hidden transition-colors duration-500
                                                ${isClickable ? "cursor-pointer" : "cursor-default"}
                                                ${project.span ?? ""}`}
                                    style={{
                                        background: "var(--card-bg)",
                                        border: "1px solid var(--card-border)",
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    {/* Background image */}
                                    {project.src && (
                                        <div className="absolute inset-0 overflow-hidden">
                                            <img
                                                src={project.src}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-top
                                                           opacity-25 group-hover:opacity-45
                                                           scale-100 group-hover:scale-105
                                                           transition-all duration-700 ease-out"
                                                draggable={false}
                                            />
                                            <div className="absolute inset-0"
                                                style={{ background: "linear-gradient(to top, var(--card-bg), transparent)" }} />
                                        </div>
                                    )}

                                    {/* Atlas — map-pin decoration */}
                                    {project.id === 4 && (
                                        <div className="absolute inset-0 flex items-center justify-end pr-16 opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-700">
                                            <svg width="180" height="180" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"
                                                className="text-[var(--text-primary)]">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Click hint pill */}
                                    {isClickable && (
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100
                                                        transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm"
                                                style={{ border: "1px solid var(--card-border-hover)", background: "var(--card-bg)" }}>
                                                <span className="text-[var(--text-dim)] text-[9px] tracking-[0.2em] uppercase">Open</span>
                                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                    className="text-[var(--text-dim)]">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className={`absolute inset-0 flex flex-col justify-end
                                                     ${isWide ? "p-8 md:p-10 flex-row items-end" : "p-5"}`}>
                                        {isWide ? (
                                            <>
                                                <div className="flex-1">
                                                    <p className="text-[var(--tag-text)] text-[10px] tracking-[0.3em] uppercase mb-2 font-medium">
                                                        {project.tag}
                                                    </p>
                                                    <h3 className="text-[var(--text-primary)] font-bold text-3xl md:text-4xl leading-tight mb-3">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-[var(--text-body)] text-sm leading-relaxed max-w-md">
                                                        {project.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0 mb-1">
                                                    {project.tech.slice(0, 3).map((t) => (
                                                        <span key={t}
                                                            className="px-2.5 py-1 text-[10px] font-medium text-[var(--pill-text)] rounded-full"
                                                            style={{ border: "1px solid var(--pill-border)" }}>
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-[var(--tag-text)] text-[10px] tracking-[0.25em] uppercase mb-1.5 font-medium">
                                                    {project.tag}
                                                </p>
                                                <h3 className="text-[var(--text-primary)] font-bold text-xl leading-tight mb-1.5">
                                                    {project.title}
                                                </h3>
                                                <p className="text-[var(--text-body)] text-sm leading-relaxed
                                                              max-h-0 overflow-hidden opacity-0
                                                              group-hover:max-h-16 group-hover:opacity-100
                                                              transition-all duration-500 ease-out mb-0 group-hover:mb-2">
                                                    {project.description}
                                                </p>
                                            </>
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
