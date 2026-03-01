"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextReveal from "./components/TextReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TECH_STACK = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++"] },
  { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express"] },
  { category: "Tools", items: ["Git", "Figma", "Docker", "Tailwind CSS", "Nginx"] },
];

const PREVIEW_PROJECTS = [
  { num: "01", title: "Excalidraw Clone", tag: "Canvas · Real-time" },
  { num: "02", title: "OpenRouter Clone", tag: "AI · API Gateway" },
  { num: "03", title: "Petition", tag: "Civic · Full-stack" },
  { num: "04", title: "Atlas", tag: "Mobile · Social" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);

  useGSAP(() => {
    // Velocity skew effect on project strip
    const skewSetter = gsap.quickSetter(skewRef.current, "skewY", "deg");
    let last = 0;

    const handleScroll = () => {
      const velocity = scrollY.get() - last;
      last = scrollY.get();
      skewSetter(velocity * 0.02);
      gsap.to(skewRef.current, { skewY: 0, duration: 0.6, ease: "power2.out", overwrite: true });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, { scope: skewRef });

  return (
    <main style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="home"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 var(--px) 5rem",
          overflow: "hidden",
        }}
      >
        {/* Parallax wrapper */}
        <motion.div style={{ y: heroY }}>
          {/* Index label */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
            }}
          >
            Abdulrauf Kazi · Portfolio 2026
          </p>

          {/* Massive kinetic headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4.5rem, 12vw, 10rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              textTransform: "uppercase",
              overflow: "hidden",
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <TextReveal delay={0.1}>ABDULRAUF</TextReveal>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <TextReveal delay={0.25} className="text-accent" style={{ color: "var(--accent)" } as React.CSSProperties}>
                KAZI
              </TextReveal>
            </span>
          </h1>

          {/* Role + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              Developer · Designer · BTech CSE
            </span>
            <span style={{ height: "1px", width: "60px", background: "var(--border)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              2026 — Present
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "var(--px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "40px",
              background: "var(--text-primary)",
              transformOrigin: "top",
            }}
          />
        </motion.div>

        {/* Hairline bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "var(--px)",
            right: "var(--px)",
            height: "1px",
            background: "var(--border)",
          }}
        />
      </section>

      {/* ── PROJECT PREVIEW STRIP ────────────────────────────────────── */}
      <section
        style={{
          padding: "var(--section-py) var(--px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "4rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            Selected Work
          </p>
          <Link
            href="/projects"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            View All →
          </Link>
        </div>

        <div ref={skewRef} className="skew-on-scroll">
          {PREVIEW_PROJECTS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "2rem",
                padding: "1.5rem 0",
                borderTop: i === 0 ? "1px solid var(--border)" : "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  minWidth: "2rem",
                }}
              >
                {p.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  flex: 1,
                }}
              >
                {p.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  display: "none",
                }}
                className="md:block"
              >
                {p.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: "var(--section-py) var(--px)",
          borderBottom: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
            }}
          >
            About
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "36ch",
            }}
          >
            Computer science student obsessed with clean interfaces, thoughtful code, and turning ideas into real products.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ marginTop: "2rem" }}
          >
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                textDecoration: "none",
                borderBottom: "1px solid var(--text-primary)",
                paddingBottom: "2px",
              }}
            >
              More About Me →
            </Link>
          </motion.div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <TextReveal
            as="p"
            className="font-display"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "var(--text-primary)",
            } as React.CSSProperties}
          >
            I BUILD THINGS.
          </TextReveal>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────── */}
      <section
        style={{
          padding: "var(--section-py) var(--px)",
          background: "var(--bg-dark)",
          color: "white",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#444",
            marginBottom: "4rem",
          }}
        >
          Tech Stack
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TECH_STACK.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "2rem",
                padding: "2rem 0",
                borderBottom: "1px solid #1a1a1a",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#444",
                }}
              >
                {group.category}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      color: "white",
                      padding: "0.4rem 1rem",
                      border: "1px solid #222",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "3rem var(--px)",
          background: "var(--bg-dark)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1a1a1a",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#444",
          }}
        >
          © 2026 Abdulrauf Kazi
        </p>

        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { label: "GitHub", href: "https://github.com/Abdulrauf-kazi" },
            { label: "LinkedIn", href: "#" },
            { label: "Email", href: "mailto:hello@example.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#666",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
