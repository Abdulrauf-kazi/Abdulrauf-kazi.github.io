"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
    // @ts-expect-error: window.lenis is not typed
    window.lenis = null;
}

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Default slower scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // @ts-expect-error: window.lenis is not typed
        window.lenis = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return <>{children}</>;
}
