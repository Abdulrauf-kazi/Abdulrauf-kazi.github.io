"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useTheme } from "./components/ThemeProvider";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {/* ── Global animated background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MeshGradient
          className="w-full h-full"
          colors={isDark
            ? ["#000000", "#555555", "#aaaaaa", "#ffffff"]
            : ["#ddd8d1", "#ccc7c0", "#d4cfc8", "#bfb9b2"]}
          speed={0.3}
          distortion={1.0}
          swirl={0.2}
        />
        <div className={`absolute inset-0 ${isDark ? "bg-black/60" : "bg-[#ddd8d1]/55"}`} />
      </div>

      {/* ── Page content ── */}
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
