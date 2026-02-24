"use client";

import { motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Project One",
        description: "A brief description of this project and what it does.",
        bg: "#111",
        accent: "#1a1a1a",
    },
    {
        id: 2,
        title: "Project Two",
        description: "A brief description of this project and what it does.",
        bg: "#0f0f0f",
        accent: "#161616",
    },
    {
        id: 3,
        title: "Project Three",
        description: "A brief description of this project and what it does.",
        bg: "#111",
        accent: "#0d0d0d",
    },
    {
        id: 4,
        title: "Project Four",
        description: "A brief description of this project and what it does.",
        bg: "#0e0e0e",
        accent: "#1a1a1a",
    },
];

export default function Projects() {
    return (
        <section id="project" className="min-h-screen py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-bold text-white mb-16"
                >
                    Projects
                </motion.h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group relative aspect-[4/3] rounded-lg border border-[#222]
                         overflow-hidden cursor-pointer
                         hover:border-[#444] hover:scale-[1.02]
                         transition-all duration-300"
                            style={{
                                background: `linear-gradient(135deg, ${project.bg} 0%, ${project.accent} 100%)`,
                            }}
                        >
                            {/* Replace this div with an <img> or <Image> once you have project screenshots */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6
                              opacity-0 group-hover:opacity-100
                              bg-gradient-to-t from-black/80 via-black/20 to-transparent
                              transition-opacity duration-300">
                                <h3 className="text-white font-bold text-xl mb-1">{project.title}</h3>
                                <p className="text-[#aaa] text-sm">{project.description}</p>
                            </div>

                            {/* Default label (visible when not hovering) */}
                            <div className="absolute top-4 left-4">
                                <span className="text-[#444] text-xs tracking-widest uppercase font-medium">
                                    0{project.id}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
