"use client";

import { motion } from "framer-motion";

const links = [
    { label: "HOME", href: "#home" },
    { label: "PROJECT", href: "#project" },
    { label: "CONTACT", href: "#contact" },
];

function easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function scrollTo(href: string) {
    const NAVBAR_OFFSET = 80; // px — compensate for fixed header height
    const start = window.scrollY;
    const duration = 1100; // ms

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

export default function Navbar() {
    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start
                 pt-10 md:pt-14 px-12 md:px-20 bg-transparent pointer-events-none"
        >
            {/* Left — Circular logo */}
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="pointer-events-auto w-12 h-12 rounded-full border border-[#333]
                   overflow-hidden flex items-center justify-center
                   hover:border-[#555] transition-colors duration-300 shrink-0"
                aria-label="Home"
            >
                {/* Swap inner span for <img src="/logo.png" ... /> when you have a logo */}
                <span className="text-[#c4bfa8] text-xs font-bold leading-none tracking-tight">AK</span>
            </a>

            {/* Right — Vertical stacked links */}
            <nav className="pointer-events-auto flex flex-col items-end mt-2">
                {links.map((link, i) => (
                    <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => scrollTo(link.href)}
                        className="text-[#888] hover:text-white text-[11px] uppercase
                       tracking-[0.25em] font-medium leading-[1.8]
                       transition-colors duration-300 cursor-pointer"
                    >
                        {link.label}
                    </motion.button>
                ))}
            </nav>
        </motion.header>
    );
}
