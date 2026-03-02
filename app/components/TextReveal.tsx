"use client";

import { useRef, createElement } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    as?: string;
}

export default function TextReveal({
    children,
    className = "",
    style,
    delay = 0,
    as = "span",
}: TextRevealProps) {
    const containerRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: "-10%" });
    const prefersReduced = useReducedMotion();

    const words = children.split(" ");

    const inner = (
        <>
            {words.map((word: string, i: number) => (
                <span key={i} className="word-clip" aria-hidden="true">
                    <motion.span
                        className="word-inner"
                        initial={prefersReduced ? false : { y: "110%" }}
                        animate={isInView || prefersReduced ? { y: "0%" } : { y: "110%" }}
                        transition={{
                            duration: 1.4,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + i * 0.2,
                        }}
                        onAnimationComplete={() => {
                            if (containerRef.current) {
                                containerRef.current.querySelectorAll<HTMLElement>(".word-inner").forEach((el) => {
                                    el.style.removeProperty("will-change");
                                });
                            }
                        }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </>
    );

    return createElement(
        as,
        {
            ref: containerRef,
            className,
            style,
            "aria-label": children,
        },
        inner
    );
}
