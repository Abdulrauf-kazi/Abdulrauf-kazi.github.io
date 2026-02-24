"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin, Dribbble } from "lucide-react";

const socials = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Dribbble, label: "Dribbble", href: "#" },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative pt-32 pb-12 px-6 md:px-12 overflow-hidden border-t border-white/5">
            {/* Giant background text */}
            <div
                className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none leading-none"
                style={{ fontSize: "clamp(60px, 14vw, 180px)" }}
            >
                <span className="font-black text-white/[0.03] whitespace-nowrap">YOUR NAME</span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <p className="text-[#888888] text-sm tracking-widest uppercase mb-6">Let's Talk</p>
                    <h2
                        className="font-black tracking-tight leading-none text-white mb-8"
                        style={{ fontSize: "clamp(36px, 8vw, 110px)" }}
                    >
                        Not all <span className="italic text-[#888888]">honest</span>{" "}
                        design is{" "}
                        <span className="text-[#ff3366]">good</span>.
                    </h2>
                    <p className="text-[#888888] text-lg max-w-lg leading-relaxed">
                        But yours can be. Let's make something worth shipping together.
                    </p>
                </motion.div>

                {/* Email CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <a
                        href="mailto:hello@yourname.com"
                        className="group inline-flex items-center gap-3 text-2xl md:text-4xl font-black hover:text-[#ff3366] transition-colors duration-300 border-b-2 border-white/10 hover:border-[#ff3366] pb-2"
                    >
                        hello@yourname.com
                        <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                </motion.div>

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-white/5">
                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                            >
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>

                    <p className="text-[#888888] text-sm">
                        © {new Date().getFullYear()} Your Name. Made with minimal effort and maximum attitude.
                    </p>
                </div>
            </div>
        </footer>
    );
}
