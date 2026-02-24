"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* ── Global animated background — fixed, sits behind all sections ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MeshGradient
          className="w-full h-full"
          colors={["#000000", "#555555", "#aaaaaa", "#ffffff"]}
          speed={0.3}
          distortion={1.0}
          swirl={0.2}
        />
        {/* Global dark overlay so text stays readable everywhere */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ── Page content — all sections sit above the fixed background ── */}
      <main className="relative z-10 text-white overflow-x-hidden">
        <Hero />
        <Gallery />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
