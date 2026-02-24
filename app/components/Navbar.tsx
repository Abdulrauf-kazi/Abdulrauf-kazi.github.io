"use client";

import { motion } from "framer-motion";

const links = [
    { label: "HOME", href: "#home" },
    { label: "PROJECT", href: "#project" },
    { label: "CONTACT", href: "#contact" },
];

function scrollTo(href: string) {
    if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
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
