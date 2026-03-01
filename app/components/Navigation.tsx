"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close on route change
    useEffect(() => setMenuOpen(false), [pathname]);

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: "0 var(--px)",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
                    background: scrolled ? "rgba(245,245,240,0.92)" : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        letterSpacing: "-0.02em",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                    }}
                >
                    ARK<span style={{ color: "var(--accent)" }}>.</span>
                </Link>

                {/* Desktop Nav */}
                <nav
                    className="hidden md:flex"
                    style={{ gap: "2.5rem", alignItems: "center" }}
                >
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    color: active ? "var(--accent)" : "var(--text-primary)",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) (e.target as HTMLElement).style.color = "var(--accent)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) (e.target as HTMLElement).style.color = "var(--text-primary)";
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "28px",
                        height: "20px",
                        position: "relative",
                        zIndex: 200,
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            position: "absolute",
                            height: "1.5px",
                            width: "100%",
                            background: menuOpen ? "white" : "var(--text-primary)",
                            top: menuOpen ? "50%" : "2px",
                            transform: menuOpen ? "rotate(45deg) translateY(-50%)" : "none",
                            transition: "all 0.3s ease",
                            left: 0,
                        }}
                    />
                    <span
                        style={{
                            display: "block",
                            position: "absolute",
                            height: "1.5px",
                            width: menuOpen ? "0%" : "100%",
                            background: "var(--text-primary)",
                            top: "50%",
                            transform: "translateY(-50%)",
                            transition: "all 0.3s ease",
                            left: 0,
                            opacity: menuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        style={{
                            display: "block",
                            position: "absolute",
                            height: "1.5px",
                            width: "100%",
                            background: menuOpen ? "white" : "var(--text-primary)",
                            bottom: menuOpen ? "50%" : "2px",
                            transform: menuOpen ? "rotate(-45deg) translateY(50%)" : "none",
                            transition: "all 0.3s ease",
                            left: 0,
                        }}
                    />
                </button>
            </header>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "var(--bg-dark)",
                            zIndex: 150,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "0 var(--px)",
                        }}
                    >
                        <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(2.5rem, 8vw, 5rem)",
                                            fontWeight: 700,
                                            letterSpacing: "-0.03em",
                                            textTransform: "uppercase",
                                            color: pathname === link.href ? "var(--accent)" : "white",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "2rem",
                                left: "var(--px)",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#444",
                            }}
                        >
                            Abdulrauf Kazi · 2026
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
