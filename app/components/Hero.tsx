"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen overflow-hidden">
            {/* Content — bg is the global MeshGradient from page.tsx */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                >
                    I am Abdulrauf Kazi
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 text-lg md:text-2xl text-[#aaa] font-normal max-w-xl"
                >
                    Passionate about learning new things
                </motion.p>
            </div>

            {/* Bottom-left N badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-8 left-6 z-10 w-10 h-10 rounded-full border border-[#333]
                   flex items-center justify-center"
            >
                <span className="text-white text-xs font-bold leading-none">N</span>
            </motion.div>
        </section>
    );
}
