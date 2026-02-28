"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ── Letter-wrap hover button ──────────────────────────────────────────────────

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
            {/* Each character is a clipped slot — real + shadow stacked */}
            <span className="flex" aria-hidden="true">
                {label.split("").map((char, i) => (
                    <span
                        key={i}
                        className="relative overflow-hidden inline-flex flex-col"
                        style={{ height: "1em" }}
                    >
                        {/* Real character — slides up on hover */}
                        <motion.span
                            className="inline-block text-[#a0a0a0]"
                            style={{
                                fontSize: "12px",
                                letterSpacing: "0.25em",
                                fontWeight: 600,
                                textTransform: "uppercase",
                            }}
                            animate={hovered ? "hover" : "initial"}
                            variants={charVariants}
                            transition={{
                                duration: 0.35,
                                delay: i * 0.07,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            {char}
                        </motion.span>

                        {/* Shadow character — slides in from below */}
                        <motion.span
                            className="inline-block text-white absolute top-0 left-0"
                            style={{
                                fontSize: "12px",
                                letterSpacing: "0.25em",
                                fontWeight: 600,
                                textTransform: "uppercase",
                            }}
                            animate={hovered ? "hover" : "initial"}
                            variants={charShadowVariants}
                            transition={{
                                duration: 0.35,
                                delay: i * 0.07,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            {char}
                        </motion.span>
                    </span>
                ))}
            </span>
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
            {/* Right — Vertical stacked letter-animated links */}
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
            </nav>
        </motion.header>
    );
}
