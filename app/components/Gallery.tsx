'use client';

import React from 'react';
import { ZoomParallax } from '@/app/components/ui/zoom-parallax';
import Lenis from '@studio-freight/lenis';

// Gallery images — each one represents a project or aesthetic
const images = [
    {
        // Excalidraw Clone — custom SVG project card
        src: '/projects/excalidraw-clone.svg',
        alt: 'Excalidraw Clone — collaborative whiteboard',
    },
    {
        // OpenRouter Clone — custom SVG project card
        src: '/projects/openrouter-clone.svg',
        alt: 'OpenRouter Clone — AI model router',
    },
    {
        // CivicReport — custom SVG project card
        src: '/projects/civicreport.svg',
        alt: 'CivicReport — city problem reporting platform',
    },
    {
        // Aesthetic filler — dark code / terminal
        src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Dark code editor aesthetic',
    },
    {
        // Aesthetic filler — futuristic architecture
        src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Modern architecture',
    },
    {
        // Aesthetic filler — abstract minimal geometry
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&auto=format&q=80',
        alt: 'Abstract minimalist design',
    },
    {
        // Aesthetic filler — dark moody forest / depth
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Forest depth and light',
    },
];

export default function Gallery() {
    React.useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <section id="gallery">
            <ZoomParallax images={images} />
        </section>
    );
}
