"use client";

import { motion } from "framer-motion";

const socials = [
    {
        label: "GitHub",
        href: "https://github.com/Abdulrauf-kazi",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "Twitter",
        href: "https://twitter.com/",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative overflow-hidden border-t border-[#1a1a1a]">

            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10"
                style={{ background: "radial-gradient(ellipse at center, #7c3aed 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12">

                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

                    {/* Left — CTA */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-xs uppercase tracking-[0.3em] text-[#555] mb-4"
                        >
                            Available for projects
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8"
                        >
                            Let&apos;s build
                            <br />
                            <span className="text-transparent bg-clip-text"
                                style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #4f46e5 100%)" }}>
                                something great.
                            </span>
                        </motion.h2>

                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            href="mailto:kaziabdulrauf15@gmail.com"
                            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold text-white
                                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(124,58,237,0.45)]"
                            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                            </svg>
                            Say hello
                        </motion.a>
                    </div>

                    {/* Right — contact info + socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7 }}
                        className="flex flex-col justify-between"
                    >
                        {/* Email */}
                        <div className="mb-10">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#444] mb-3">Email</p>
                            <a
                                href="mailto:kaziabdulrauf15@gmail.com"
                                className="text-[#bbb] text-lg hover:text-white transition-colors duration-300"
                            >
                                kaziabdulrauf15@gmail.com
                            </a>
                        </div>

                        {/* Socials */}
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#444] mb-4">Socials</p>
                            <div className="flex items-center gap-4">
                                {socials.map(({ label, href, icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        title={label}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center
                                                   border border-[#222] bg-[#111] text-[#666]
                                                   hover:border-[#7c3aed] hover:text-white hover:bg-[#1a1025]
                                                   transition-all duration-300 hover:scale-110 hover:shadow-[0_0_16px_rgba(124,58,237,0.3)]"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#1a1a1a] mb-8" />

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                    <p className="text-sm text-[#444]">
                        © {new Date().getFullYear()} Abdulrauf Kazi. All rights reserved.
                    </p>
                    <p className="text-xs text-[#333] tracking-[0.15em] uppercase">
                        Designed &amp; built by hand
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
