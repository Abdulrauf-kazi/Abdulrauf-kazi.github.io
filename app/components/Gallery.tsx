'use client';

import React from 'react';
import { ZoomParallax } from '@/app/components/ui/zoom-parallax';
import Lenis from '@studio-freight/lenis';

// Portfolio / creative images — replace with your real project screenshots
const images = [
    {
        src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Modern architecture',
    },
    {
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Urban cityscape',
    },
    {
        src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&auto=format&q=80',
        alt: 'Abstract geometry',
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Mountain landscape',
    },
    {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&auto=format&q=80',
        alt: 'Minimalist design',
    },
    {
        src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Ocean waves',
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&auto=format&q=80',
        alt: 'Forest and light',
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
        <section id="gallery" className="bg-[#0a0a0a]">
            <ZoomParallax images={images} />
        </section>
    );
}
