"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const NAV_LINKS = [
    { href: "#hero", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

/* ── Scramble nav link ───────────────────────────────────────────────────── */
function ScrambleButton({ label, href }: { label: string; href: string }) {
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
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
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
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
            }}
        >
            <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                display: "block",
                color: hovered ? "var(--accent)" : "var(--text-primary)",
                transition: "color 0.2s ease",
            }}>
                {text}
            </span>
            {/* Underline draw */}
            <motion.span
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    display: "block",
                    height: "1.5px",
                    width: "100%",
                    background: "var(--accent)",
                    transformOrigin: "left",
                    marginTop: "2px",
                }}
            />
        </a>
    );
}

/* ── Sun/Moon toggle ─────────────────────────────────────────────────────── */
function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <div style={{ width: 34, height: 34 }} />;
    const dark = theme === "dark";
    return (
        <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setTheme(dark ? "light" : "dark")}
            aria-label="Toggle theme"
            style={{
                background: "none",
                border: "1.5px solid var(--border)",
                cursor: "pointer",
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                flexShrink: 0,
                transition: "border-color 0.3s, color 0.3s",
            }}
        >
            <AnimatePresence mode="wait">
                {dark ? (
                    <motion.svg key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </motion.svg>
                ) : (
                    <motion.svg key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </motion.svg>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

/* ── Navigation ──────────────────────────────────────────────────────────── */
export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const scrollTo = (href: string) => {
        setOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <header style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                height: "64px",
                padding: "0 var(--px)",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
                background: scrolled ? "var(--nav-blur)" : "transparent",
                backdropFilter: scrolled ? "blur(14px)" : "none",
                borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                transition: "background 0.35s ease, border-color 0.35s ease",
            }}>
                {/* Logo */}
                <a href="#hero" onClick={e => { e.preventDefault(); scrollTo("#hero"); }} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "var(--text-primary)", textDecoration: "none" }}>
                    ARK<span style={{ color: "var(--accent)" }}>.</span>
                </a>

                {/* Desktop links + toggle */}
                <div className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
                    <nav style={{ display: "flex", gap: "2.5rem" }}>
                        {NAV_LINKS.map(l => <ScrambleButton key={l.href} {...l} />)}
                    </nav>
                    <ThemeToggle />
                </div>

                {/* Mobile right */}
                <div className="md:hidden" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <ThemeToggle />
                    <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px", zIndex: 200 }}>
                        {[0, 1, 2].map(i => (
                            <motion.span key={i} animate={{ rotate: open && i !== 1 ? (i === 0 ? 45 : -45) : 0, y: open && i !== 1 ? (i === 0 ? 7 : -7) : 0, opacity: open && i === 1 ? 0 : 1 }} style={{ display: "block", width: 24, height: 1.5, background: open ? "#fff" : "var(--text-primary)", transformOrigin: "center" }} transition={{ duration: 0.25 }} />
                        ))}
                    </button>
                </div>
            </header>

            {/* Mobile overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ position: "fixed", inset: 0, background: "#0A0A0A", zIndex: 90, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 var(--px)" }}>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            {NAV_LINKS.map((l, i) => (
                                <motion.div key={l.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.07 }}>
                                    <a href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", textTransform: "uppercase", color: "white", textDecoration: "none" }}>
                                        {l.label}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
