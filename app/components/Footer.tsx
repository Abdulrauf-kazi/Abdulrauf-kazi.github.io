"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/" },
];

export default function Footer() {
    return (
        <footer id="contact" className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-[#222]">
            <div className="max-w-6xl mx-auto">

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-bold text-white"
                >
                    Let's work together
                </motion.h2>

                {/* Email */}
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    href="mailto:hello@abdulraufkazi.com"
                    className="inline-block mt-6 text-xl text-[#888] hover:text-white
                     transition-colors duration-300"
                >
                    hello@abdulraufkazi.com
                </motion.a>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-6 mt-8"
                >
                    {socials.map(({ icon: Icon, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="text-[#555] hover:text-white transition-colors duration-300"
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </motion.div>

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="mt-16 text-sm text-[#444]"
                >
                    © {new Date().getFullYear()} Abdulrauf Kazi
                </motion.p>
            </div>
        </footer>
    );
}
