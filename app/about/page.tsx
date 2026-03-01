"use client";

import { Suspense, useRef } from "react";
import { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import ContactForm from "../components/ContactForm";
import * as THREE from "three";

// ── 3D Wireframe Cube ──────────────────────────────────────────────────────
function WireframeCube({ mouseX, mouseY }: { mouseX: import("framer-motion").MotionValue<number>; mouseY: import("framer-motion").MotionValue<number> }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((_, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = mouseX.get() * 0.8;
        meshRef.current.rotation.x = mouseY.get() * 0.4;
        meshRef.current.rotation.z += delta * 0.1;
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2.2, 2.2, 2.2]} />
            <meshBasicMaterial color="#F5F5F0" wireframe={false} transparent opacity={0} />
            <Edges threshold={1} color="#FF3B00" />
        </mesh>
    );
}

function CubeScene() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
            }}
            style={{ width: "100%", height: "320px", cursor: "grab" }}
        >
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <WireframeCube mouseX={springX} mouseY={springY} />
            </Canvas>
        </div>
    );
}

// ── Error Boundary ─────────────────────────────────────────────────────────
class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.warn("WebGL 3D element failed to load:", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        height: "320px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #FF3B00",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#FF3B00",
                    }}
                >
                    [ 3D unavailable ]
                </div>
            );
        }
        return this.props.children;
    }
}

// ── Skills data ────────────────────────────────────────────────────────────
const SKILLS = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++"] },
    { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "React Native"] },
    { category: "Tools", items: ["Git", "Figma", "Docker", "Tailwind CSS", "Nginx"] },
    { category: "Learning", items: ["AI/ML Engineering", "LLMs", "Vector DBs"] },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <main
            style={{
                background: "var(--bg)",
                color: "var(--text-primary)",
                paddingTop: "64px",
            }}
        >
            {/* ── DISPLAY HEADLINE ──────────────────────────────────────── */}
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
                    About · Contact
                </motion.p>

                <h1
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(3rem, 9vw, 8rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.92,
                        textTransform: "uppercase",
                    }}
                >
                    <span style={{ display: "block", overflow: "hidden" }}>
                        <motion.span
                            style={{ display: "block" }}
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Let&apos;s Work
                        </motion.span>
                    </span>
                    <span style={{ display: "block", overflow: "hidden" }}>
                        <motion.span
                            style={{ display: "block", color: "var(--accent)" }}
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Together.
                        </motion.span>
                    </span>
                </h1>
            </section>

            {/* ── BIO + 3D CUBE ─────────────────────────────────────────── */}
            <section
                style={{
                    padding: "var(--section-py) var(--px)",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: "6rem",
                    alignItems: "start",
                    borderBottom: "1px solid var(--border)",
                }}
            >
                <div>
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            marginBottom: "2rem",
                        }}
                    >
                        Biography
                    </p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            color: "var(--text-secondary)",
                            marginBottom: "1.5rem",
                            paddingLeft: "2rem",
                            borderLeft: "2px solid var(--border)",
                        }}
                    >
                        I&apos;m a computer science student passionate about building thoughtful digital products — from clean, performant UIs to well-structured backends. I enjoy the entire process: sketching ideas, writing code that scales, and obsessing over the small details that make a product feel polished.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1rem",
                            lineHeight: 1.8,
                            color: "var(--text-secondary)",
                            paddingLeft: "2rem",
                            borderLeft: "2px solid var(--border)",
                        }}
                    >
                        When I&apos;m not coding, you&apos;ll find me exploring open-source projects, tinkering with side experiments, or thinking about how great design and engineering intersect.
                    </motion.p>

                    {/* AI/ML badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{ marginTop: "2.5rem" }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "var(--accent)",
                                padding: "0.5rem 1rem",
                                border: "1px solid var(--accent)",
                            }}
                        >
                            Currently Learning: AI/ML Engineering
                        </span>
                    </motion.div>
                </div>

                {/* 3D Cube */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <WebGLErrorBoundary>
                        <Suspense
                            fallback={
                                <div
                                    style={{
                                        height: "320px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.2em",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Loading 3D...
                                </div>
                            }
                        >
                            <CubeScene />
                        </Suspense>
                    </WebGLErrorBoundary>
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            marginTop: "1rem",
                            textAlign: "center",
                        }}
                    >
                        Move mouse to interact
                    </p>
                </motion.div>
            </section>

            {/* ── SKILLS MATRIX ─────────────────────────────────────────── */}
            <section
                style={{
                    padding: "var(--section-py) var(--px)",
                    borderBottom: "1px solid var(--border)",
                }}
            >
                <p
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        marginBottom: "3rem",
                    }}
                >
                    Skills Matrix
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "0",
                        border: "1px solid var(--border)",
                    }}
                >
                    {SKILLS.map((group, gi) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: gi * 0.08, duration: 0.5 }}
                            style={{
                                padding: "2rem",
                                borderRight: gi < SKILLS.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "var(--accent)",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {group.category}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.8rem",
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CONTACT FORM ──────────────────────────────────────────── */}
            <section
                style={{
                    padding: "var(--section-py) var(--px)",
                    background: "var(--bg-dark)",
                    color: "white",
                }}
            >
                <div style={{ maxWidth: "760px" }}>
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "#444",
                            marginBottom: "2rem",
                        }}
                    >
                        Get In Touch
                    </p>

                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.05,
                            textTransform: "uppercase",
                            color: "white",
                            marginBottom: "4rem",
                        }}
                    >
                        Start a Conversation
                    </h2>

                    <div
                        style={
                            {
                                "--border": "#2a2a2a",
                                "--text-primary": "white",
                                "--text-secondary": "#888",
                                "--bg": "#0A0A0A",
                            } as React.CSSProperties
                        }
                    >
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────────────── */}
            <footer
                style={{
                    padding: "3rem var(--px)",
                    background: "var(--bg-dark)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #1a1a1a",
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
                    © 2026 Abdulrauf Kazi · Hyderabad, India
                </p>
                <div style={{ display: "flex", gap: "2rem" }}>
                    {[
                        { label: "GitHub", href: "https://github.com/Abdulrauf-kazi" },
                        { label: "LinkedIn", href: "#" },
                        { label: "Email", href: "mailto:hello@example.com" },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#666",
                                textDecoration: "none",
                                transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </footer>
        </main>
    );
}
