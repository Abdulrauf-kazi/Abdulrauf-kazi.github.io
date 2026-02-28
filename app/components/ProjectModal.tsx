"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Project = {
    id: number;
    title: string;
    tag: string;
    description: string;
    detail: string;
    tech: string[];
    src: string | null;
    github: string | null;
    live: string | null;
    span?: string;
};

type Props = {
    project: Project | null;
    onClose: () => void;
};

const overlayVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const panelVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
};

export default function ProjectModal({ project, onClose }: Props) {
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock body scroll while open
    useEffect(() => {
        if (project) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key="overlay"
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    {/* Blur backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

                    {/* Panel */}
                    <motion.div
                        key="panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto
                                   rounded-2xl border border-[#1e1e1e] bg-[#0a0a0a]
                                   shadow-2xl shadow-black/60"
                    >
                        {/* Image banner */}
                        {project.src && (
                            <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-2xl">
                                <img
                                    src={project.src}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top opacity-50"
                                    draggable={false}
                                />
                                {/* gradient fade into panel bg */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8 md:p-10">
                            {/* Tag + close */}
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-[#707070] font-medium">
                                    {project.tag}
                                </span>
                                <button
                                    onClick={onClose}
                                    className="text-[#444] hover:text-white transition-colors duration-200 ml-4 shrink-0"
                                    aria-label="Close modal"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                {project.title}
                            </h2>

                            {/* Short description */}
                            <p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
                                {project.description}
                            </p>

                            {/* Divider */}
                            <div className="border-t border-[#161616] mb-6" />

                            {/* Long detail */}
                            <p className="text-[#888] text-sm leading-loose mb-8">
                                {project.detail}
                            </p>

                            {/* Tech pills */}
                            {project.tech.length > 0 && (
                                <div className="mb-8">
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#606060] mb-3">
                                        Built with
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 text-xs font-medium text-[#a0a0a0] border border-[#252525]
                                                           rounded-full hover:border-[#444] hover:text-white transition-colors duration-200"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            <div className="flex items-center gap-5">
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium
                                                   text-white border border-[#2a2a2a] rounded-full px-5 py-2.5
                                                   hover:border-[#555] transition-colors duration-200"
                                    >
                                        Live demo
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round">
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
                                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium
                                                   text-[#666] hover:text-white transition-colors duration-200"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
