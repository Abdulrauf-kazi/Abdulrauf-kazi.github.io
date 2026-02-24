"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const clients = [
    {
        name: "Ford",
        category: "Automotive",
        year: "2023",
        description:
            "Working on the Next-Generation HMI Experience without any driving experience.",
        bg: "from-blue-950/20 to-transparent",
    },
    {
        name: "UFC",
        category: "Sports & Entertainment",
        year: "2022",
        description:
            "Designed for fighters without getting punched. My greatest personal achievement.",
        bg: "from-red-950/20 to-transparent",
    },
    {
        name: "Lincoln",
        category: "Luxury Automotive",
        year: "2023",
        description:
            "Made luxury look luxurious. Apparently that's harder than it sounds.",
        bg: "from-slate-800/20 to-transparent",
    },
    {
        name: "Reebok",
        category: "Sportswear",
        year: "2021",
        description:
            "Designed activewear campaigns from my desk. Very ironic.",
        bg: "from-orange-950/20 to-transparent",
    },
    {
        name: "Spotify",
        category: "Music & Tech",
        year: "2022",
        description:
            "Worked on features nobody asked for but everyone uses. That's the magic.",
        bg: "from-green-950/20 to-transparent",
    },
];

export default function Clients() {
    return (
        <section id="work" className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <p className="text-[#888888] text-sm tracking-widest uppercase mb-4">Portfolio</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                        Clients
                    </h2>
                    <p className="text-[#888888] text-lg md:text-xl max-w-2xl leading-relaxed">
                        I was only a small part of a large team. They probably have no idea I exist.
                    </p>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mt-16 mb-0" />

                {/* Client list */}
                <div>
                    {clients.map((client, i) => (
                        <motion.div
                            key={client.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: i * 0.08,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 py-10 border-b border-white/10 bg-gradient-to-r ${client.bg} cursor-pointer overflow-hidden hover:pl-4 transition-all duration-500`}
                        >
                            {/* Accent bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#ff3366] group-hover:w-1 transition-all duration-500" />

                            {/* Left side */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                                <div className="text-[#888888] text-sm font-mono w-12 shrink-0">{client.year}</div>
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight group-hover:text-[#ff3366] transition-colors duration-500">
                                    {client.name}
                                </h3>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-8 md:max-w-md">
                                <div>
                                    <p className="text-xs text-[#ff3366] tracking-widest uppercase mb-1 font-medium">
                                        {client.category}
                                    </p>
                                    <p className="text-[#888888] text-sm leading-relaxed">{client.description}</p>
                                </div>
                                <div className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#ff3366] group-hover:border-[#ff3366] transition-all duration-300">
                                    <ArrowUpRight size={16} className="text-[#888888] group-hover:text-white transition-colors duration-300" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
