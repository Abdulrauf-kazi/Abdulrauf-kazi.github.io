"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
    {
        number: "01",
        title: "Excalidraw Clone",
        description:
            "Collaborative whiteboard for sketching diagrams and ideas in real-time. Freehand sketching, shapes, text, and WebSocket multi-user collaboration.",
        tags: ["Canvas", "Real-time", "TypeScript"],
        year: "2025",
        href: "https://github.com/Abdulrauf-kazi",
    },
    {
        number: "02",
        title: "OpenRouter Clone",
        description:
            "Unified API gateway abstracting multiple LLM providers behind a single endpoint. Cost tracking, token counting, fallback logic, and usage dashboard.",
        tags: ["AI", "API Gateway", "Next.js"],
        year: "2025",
        href: "https://github.com/Abdulrauf-kazi",
    },
    {
        number: "03",
        title: "Petition",
        description:
            "Civic tech platform empowering citizens to report local issues to city authorities. Geotagged reports, image uploads, status tracking, admin dashboard.",
        tags: ["Civic", "Full-stack", "PostgreSQL"],
        year: "2024",
        href: "https://github.com/Abdulrauf-kazi",
    },
    {
        number: "04",
        title: "Atlas",
        description:
            "React Native app for capturing and sharing location-tied memories. Pin photos to maps, write notes, share with friends. A personal shared memory map.",
        tags: ["Mobile", "Social", "Supabase"],
        year: "2024",
        href: "https://github.com/Abdulrauf-kazi",
    },
    {
        number: "05",
        title: "This Portfolio",
        description:
            "Brutalist-Swiss portfolio built with Next.js, Framer Motion, GSAP, Lenis, and React Three Fiber. Kinetic typography, 3D elements, scroll animations.",
        tags: ["Next.js", "GSAP", "Three.js"],
        year: "2026",
        href: "https://github.com/Abdulrauf-kazi",
    },
];

export default function ProjectsPage() {
    return (
        <main
            style={{
                background: "var(--bg)",
                color: "var(--text-primary)",
                paddingTop: "64px",
            }}
        >
            {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
            <section
                style={{
                    padding: "6rem var(--px) 4rem",
                    borderBottom: "1px solid var(--border)",
                }}
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        marginBottom: "2rem",
                    }}
                >
                    Selected Work · {projects.length} Projects
                </motion.p>

                <h1
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(3.5rem, 10vw, 9rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.92,
                        textTransform: "uppercase",
                        overflow: "hidden",
                    }}
                >
                    <span style={{ display: "block", overflow: "hidden" }}>
                        <motion.span
                            style={{ display: "block" }}
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Selected
                        </motion.span>
                    </span>
                    <span style={{ display: "block", overflow: "hidden" }}>
                        <motion.span
                            style={{ display: "block", color: "var(--accent)" }}
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Work
                        </motion.span>
                    </span>
                </h1>
            </section>

            {/* ── PROJECT GRID ────────────────────────────────────────────── */}
            <section style={{ padding: "var(--section-py) var(--px)" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
                        gap: "1px",
                        background: "var(--border)",
                        border: "1px solid var(--border)",
                    }}
                >
                    {projects.map((project) => (
                        <div key={project.number} style={{ background: "var(--bg)" }}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER STRIP ────────────────────────────────────────────── */}
            <footer
                style={{
                    padding: "3rem var(--px)",
                    background: "var(--bg-dark)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                <p
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#444",
                    }}
                >
                    More on <a
                        href="https://github.com/Abdulrauf-kazi"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--accent)", textDecoration: "none" }}
                    >GitHub</a>
                </p>
                <Link
                    href="/"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#666",
                        textDecoration: "none",
                    }}
                >
                    ← Back Home
                </Link>
            </footer>
        </main>
    );
}
