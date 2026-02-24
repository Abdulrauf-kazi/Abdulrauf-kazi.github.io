"use client";

import { motion } from "framer-motion";

const services = [
    {
        number: "01",
        title: "3D",
        emoji: "🧊",
        description:
            "I can produce anything that my 16\" laptop can render before it catches fire.",
        tags: ["Blender", "Cinema 4D", "Redshift"],
    },
    {
        number: "02",
        title: "Visual",
        emoji: "👁️",
        description:
            "I search the internet for visual references and then combine them to create my own work. Very creative.",
        tags: ["Figma", "Photoshop", "Illustrator"],
    },
    {
        number: "03",
        title: "Motion",
        emoji: "✨",
        description:
            "I use fancy motion that makes my design more interesting than it actually is.",
        tags: ["After Effects", "Lottie", "GSAP"],
    },
    {
        number: "04",
        title: "Product",
        emoji: "📦",
        description:
            "I utilize common design best practices, test, and re-iterate until it works (hopefully).",
        tags: ["UX Research", "Prototyping", "Design Systems"],
    },
];

export default function Services() {
    return (
        <section id="services" className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <p className="text-[#888888] text-sm tracking-widest uppercase mb-4">What I Do</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                        Services
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative border border-white/10 rounded-2xl p-8 md:p-10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 cursor-default overflow-hidden"
                        >
                            {/* Number watermark */}
                            <span className="absolute top-6 right-8 text-7xl font-black text-white/5 group-hover:text-white/8 transition-colors duration-500 select-none">
                                {service.number}
                            </span>

                            {/* Accent line */}
                            <div className="w-8 h-0.5 bg-[#ff3366] mb-6" />

                            <p className="text-3xl mb-2 select-none">{service.emoji}</p>
                            <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-[#888888] text-base leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-medium text-[#888888] border border-white/10 px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
