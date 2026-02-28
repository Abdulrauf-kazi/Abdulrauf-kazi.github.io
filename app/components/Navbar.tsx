"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECT", href: "#project" },
    { label: "CONTACT", href: "#contact" },
];

function easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function scrollTo(href: string) {
    const NAVBAR_OFFSET = 80;
    const start = window.scrollY;
    const duration = 1100;

    let target: number;
    if (href === "#home") {
        target = 0;
    } else {
        const el = document.querySelector(href) as HTMLElement | null;
        if (!el) return;
        target = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    }

    const distance = target - start;
    let startTime: number | null = null;

    function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutQuint(progress));
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// ── Letter-wrap hover button ────────────────────────────────────────────────

const charVariants = {
    initial: { y: "0%" },
    hover: { y: "-100%" },
};

const charShadowVariants = {
    initial: { y: "100%" },
    hover: { y: "0%" },
};

function NavButton({ label, href }: { label: string; href: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.button
            onClick={() => scrollTo(href)}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative overflow-hidden cursor-pointer"
            style={{ lineHeight: "1.8" }}
            aria-label={label}
        >
            <span className="flex" aria-hidden="true">
                {label.split("").map((char, i) => (
                    <span
                        key={i}
                        className="relative overflow-hidden inline-flex flex-col"
                        style={{ height: "1em" }}
                    >
                        <motion.span
                            className="inline-block text-[var(--text-muted)]"
                            style={{ fontSize: "12px", letterSpacing: "0.25em", fontWeight: 600, textTransform: "uppercase" }}
                            animate={hovered ? "hover" : "initial"}
                            variants={charVariants}
                            transition={{ duration: 0.35, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                        >
                            {char}
                        </motion.span>
                        <motion.span
                            className="inline-block text-[var(--text-primary)] absolute top-0 left-0"
                            style={{ fontSize: "12px", letterSpacing: "0.25em", fontWeight: 600, textTransform: "uppercase" }}
                            animate={hovered ? "hover" : "initial"}
                            variants={charShadowVariants}
                            transition={{ duration: 0.35, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                        >
                            {char}
                        </motion.span>
                    </span>
                ))}
            </span>
        </motion.button>
    );
}

// ── Theme toggle button ─────────────────────────────────────────────────────

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            aria-label="Toggle theme"
            className="mt-4 w-8 h-8 rounded-full flex items-center justify-center
                       border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm
                       hover:border-[var(--card-border-hover)] transition-colors duration-300 cursor-pointer"
        >
            {isDark ? (
                // Sun icon
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            ) : (
                // Moon icon
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </motion.button>
    );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-end items-start
                 pt-10 md:pt-14 px-12 md:px-20 bg-transparent pointer-events-none"
        >
            <nav className="pointer-events-auto flex flex-col items-end mt-2">
                {links.map((link, i) => (
                    <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <NavButton label={link.label} href={link.href} />
                    </motion.div>
                ))}
                <ThemeToggle />
            </nav>
        </motion.header>
    );
}
