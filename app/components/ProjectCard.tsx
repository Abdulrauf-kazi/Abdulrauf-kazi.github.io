"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
    number: string;
    title: string;
    description: string;
    tags: string[];
    year: string;
    href?: string;
}

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const numX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const numY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    useGSAP(() => {
        if (!cardRef.current) return;
        gsap.fromTo(
            cardRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
                clipPath: "inset(0 0% 0 0)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: cardRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
        mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                scale: hovered ? 1.02 : 1,
                rotate: hovered ? 1.5 : 0,
                backgroundColor: hovered ? "#0A0A0A" : "#F5F5F0",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "2.5rem",
                border: "1px solid var(--border)",
                cursor: project.href ? "pointer" : "default",
                willChange: "transform",
            }}
            onClick={() => project.href && window.open(project.href, "_blank")}
        >
            {/* Oversized number — cursor parallax */}
            <motion.span
                style={{
                    position: "absolute",
                    top: "-0.2em",
                    right: "-0.1em",
                    x: numX,
                    y: numY,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(8rem, 18vw, 14rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: hovered ? "rgba(255,255,255,0.06)" : "rgba(10,10,10,0.05)",
                    userSelect: "none",
                    pointerEvents: "none",
                    transition: "color 0.4s ease",
                }}
            >
                {project.number}
            </motion.span>

            {/* Tags row */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "0.3rem 0.75rem",
                            border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "var(--border)"}`,
                            color: hovered ? "rgba(255,255,255,0.6)" : "var(--text-secondary)",
                            transition: "all 0.4s ease",
                        }}
                    >
                        {tag}
                    </span>
                ))}
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.15em",
                        marginLeft: "auto",
                        color: hovered ? "rgba(255,255,255,0.4)" : "var(--text-secondary)",
                        transition: "color 0.4s ease",
                    }}
                >
                    {project.year}
                </span>
            </div>

            {/* Title */}
            <h3
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    position: "relative",
                    zIndex: 1,
                    color: hovered ? "white" : "var(--text-primary)",
                    transition: "color 0.4s ease",
                }}
            >
                {project.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: hovered ? "rgba(255,255,255,0.65)" : "var(--text-secondary)",
                    lineHeight: 1.7,
                    maxWidth: "44ch",
                    position: "relative",
                    zIndex: 1,
                    transition: "color 0.4s ease",
                }}
            >
                {project.description}
            </p>

            {/* Arrow indicator */}
            {project.href && (
                <motion.div
                    animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        bottom: "2.5rem",
                        right: "2.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                    }}
                >
                    View →
                </motion.div>
            )}
        </motion.div>
    );
}
