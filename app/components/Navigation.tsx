"use client";

import { useState, useRef, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
];

/* ── Scramble nav link ───────────────────────────────────────────────────── */
function ScrambleButton({
    label,
    href,
    onNavigate
}: {
    label: string;
    href: string;
    onNavigate?: (href: string) => void;
}) {
    const [text, setText] = useState(label.toUpperCase());
    const [hovered, setHovered] = useState(false);
    const iRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const scramble = useCallback(() => {
        const target = label.toUpperCase();
        let iter = 0;
        clearInterval(iRef.current!);
        iRef.current = setInterval(() => {
            setText(target.split("").map((ch, i) => {
                if (ch === " ") return " ";
                if (i < Math.floor(iter / 2)) return ch;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join(""));
            iter++;
            if (iter >= target.length * 2 + 2) {
                clearInterval(iRef.current!);
                setText(target);
            }
        }, 38);
    }, [label]);

    const reset = useCallback(() => {
        clearInterval(iRef.current!);
        setText(label.toUpperCase());
    }, [label]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate(href);
        } else {
            const el = document.querySelector(href);
            // @ts-ignore
            if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo(el, { duration: 1.8 });
            } else if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            onMouseEnter={() => { setHovered(true); scramble(); }}
            onMouseLeave={() => { setHovered(false); reset(); }}
            style={{
                position: "relative",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-end",
                textDecoration: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
            }}
        >
            <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                fontWeight: 600,
                display: "block",
                color: hovered ? "var(--accent)" : "var(--text-primary)",
                transition: "color 0.2s ease",
            }}>
                {text}
            </span>
            <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    display: "block",
                    height: "1px",
                    width: "100%",
                    background: "var(--accent)",
                    transformOrigin: "right",
                    marginTop: "1px",
                }}
            />
        </a>
    );
}

/* ── Navigation ──────────────────────────────────────────────────────────── */
export default function Navigation() {
    const [open, setOpen] = useState(false);

    const handleNavigate = (href: string) => {
        setOpen(false);
        const el = document.querySelector(href);
        if (el) {
            // @ts-ignore
            if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo(el, { duration: 1.8 });
            } else {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <header style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: "clamp(1.5rem, 3vw, 2.5rem) var(--px)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                pointerEvents: "none",
            }}>
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={e => { e.preventDefault(); handleNavigate("#hero"); }}
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        letterSpacing: "-0.02em",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        pointerEvents: "auto"
                    }}
                >
                    ARK<span style={{ color: "var(--accent)" }}>.</span>
                </a>

                {/* Vertical Stack - Top Right */}
                <div style={{ pointerEvents: "auto" }}>
                    {/* Desktop View (Using JS for visibility to avoid inline-style conflicts with Tailwind) */}
                    <div className="hidden md:flex" style={{ flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
                        {NAV_LINKS.map(l => (
                            <ScrambleButton
                                key={l.href}
                                label={l.label}
                                href={l.href}
                                onNavigate={handleNavigate}
                            />
                        ))}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setOpen(o => !o)}
                            aria-label="Toggle menu"
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "4px"
                            }}
                        >
                            <div style={{ width: 20, height: 1.5, background: "var(--text-primary)", marginBottom: 4 }} />
                            <div style={{ width: 20, height: 1.5, background: "var(--text-primary)" }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "var(--bg)",
                            zIndex: 99,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "0 var(--px)"
                        }}
                    >
                        <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {NAV_LINKS.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={e => { e.preventDefault(); handleNavigate(l.href); }}
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "3rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        color: "var(--text-primary)",
                                        textDecoration: "none"
                                    }}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </nav>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                position: "absolute",
                                top: "var(--px)",
                                right: "var(--px)",
                                background: "none",
                                border: "none",
                                color: "var(--text-primary)",
                                fontSize: "1.5rem"
                            }}
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
