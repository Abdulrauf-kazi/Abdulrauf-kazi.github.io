"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        quote:
            "He's terrible, but it's his birthday so I'd say something nice.",
        name: "Sarah K.",
        title: "Creative Director",
        company: "Design Corp",
    },
    {
        quote:
            "After countless rounds of feedback, you finally did it right. Took only six months.",
        name: "James R.",
        title: "VP of Product",
        company: "TechStartup Inc.",
    },
    {
        quote:
            "I'm his wife. He made me say that.",
        name: "Emily P.",
        title: "Reluctant Reviewer",
        company: "The Household",
    },
    {
        quote:
            "Hired him once. Would hire him again under duress.",
        name: "Marcus T.",
        title: "Founder",
        company: "Some Company",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

    return (
        <section className="py-32 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <p className="text-[#888888] text-sm tracking-widest uppercase mb-4">Social Proof</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                        Testimonials
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Large quote */}
                    <div className="absolute -top-8 -left-2 text-[180px] leading-none font-black text-white/5 select-none pointer-events-none">
                        "
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 min-h-[220px] flex flex-col justify-center"
                        >
                            <blockquote className="text-3xl md:text-5xl lg:text-6xl font-black italic leading-tight tracking-tight mb-10 max-w-5xl">
                                "{testimonials[current].quote}"
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-0.5 bg-[#ff3366]" />
                                <div>
                                    <p className="text-white font-bold">{testimonials[current].name}</p>
                                    <p className="text-[#888888] text-sm">
                                        {testimonials[current].title},{" "}
                                        <span className="text-[#ff3366]">{testimonials[current].company}</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="flex items-center gap-6 mt-12">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={18} className="text-[#888888] group-hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={18} className="text-[#888888] group-hover:text-white transition-colors" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2 ml-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#ff3366]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
