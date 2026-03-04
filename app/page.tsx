"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactForm from "./components/ContactForm";
import Navigation from "./components/Navigation";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ──────────────────────────────── DATA ────────────────────────────────── */
const PROJECTS = [
  {
    num: "01", title: "Excalidraw Clone",
    desc: "Collaborative whiteboard for real-time diagram sketching. Freehand drawing, WebSocket multi-user sync, and shape tools.",
    tags: ["Canvas", "Real-time", "TypeScript"], year: "2025",
    href: "https://github.com/Abdulrauf-kazi",
    color: "#FF3B00", size: "feature",  // 2×2
  },
  {
    num: "02", title: "OpenRouter Clone",
    desc: "Unified API gateway for multiple LLM providers. Token counting, cost tracking, fallback logic, usage dashboard.",
    tags: ["AI", "API Gateway", "Next.js"], year: "2025",
    href: "https://github.com/Abdulrauf-kazi",
    color: "#6366F1", size: "tall",    // 1×2
  },
  {
    num: "03", title: "Petition",
    desc: "Civic platform to report local issues to city authorities with geotagged photos and status tracking.",
    tags: ["Civic", "PostgreSQL"], year: "2024",
    href: "https://github.com/Abdulrauf-kazi",
    color: "#10B981", size: "standard", // 1×1
  },
  {
    num: "04", title: "Atlas",
    desc: "React Native memory map — pin photos to locations, write notes, share with friends as a shared memory journal.",
    tags: ["Mobile", "Supabase"], year: "2024",
    href: "https://github.com/Abdulrauf-kazi",
    color: "#F59E0B", size: "wide",    // 2×1
  },
  {
    num: "05", title: "This Portfolio",
    desc: "Brutalist-Swiss design with GSAP scroll animations, Framer Motion, Lenis smooth scroll, and a React Three Fiber 3D element.",
    tags: ["Next.js", "GSAP", "Three.js"], year: "2026",
    href: "https://github.com/Abdulrauf-kazi",
    color: "#FF3B00", size: "standard", // 1×1
  },
];

const SKILLS = [
  { cat: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++"] },
  { cat: "Frontend", items: ["React", "Next.js", "Framer Motion", "GSAP"] },
  { cat: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Supabase"] },
  { cat: "Learning", items: ["AI/ML", "LLMs", "Vector DBs"] },
];

/* ──────────────────────────── BENTO CARD ──────────────────────────────── */
function BentoCard({
  p,
  gridStyle = {},
}: {
  p: (typeof PROJECTS)[number];
  gridStyle?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const isFeature = p.size === "feature";

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 2.0, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
      }
    );
  }, { scope: ref });

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => window.open(p.href, "_blank")}
      animate={{ backgroundColor: hov ? "#0A0A0A" : "var(--bg-card)" }}
      transition={{ duration: 0.32 }}
      style={{
        ...gridStyle,
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--border)",
        padding: isFeature ? "2.5rem" : "1.75rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: isFeature ? "380px" : "180px",
        transition: "border-color 0.3s ease",
      }}
    >
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: p.color, transformOrigin: "left" }}
      />

      <span style={{
        position: "absolute", bottom: "-0.1em", right: "-0.02em",
        fontFamily: "var(--font-display)",
        fontSize: isFeature ? "clamp(8rem, 20vw, 16rem)" : "clamp(4rem, 10vw, 9rem)",
        fontWeight: 700, lineHeight: 1, letterSpacing: "-0.05em",
        color: hov ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.32s ease",
      }}>{p.num}</span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center", zIndex: 1 }}>
        {p.tags.map(t => (
          <span key={t} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.58rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "0.2rem 0.55rem",
            border: `1px solid ${hov ? "rgba(255,255,255,0.15)" : "var(--border)"}`,
            color: hov ? "rgba(255,255,255,0.5)" : "var(--text-secondary)",
            transition: "all 0.32s ease",
          }}>{t}</span>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: hov ? "rgba(255,255,255,0.3)" : "var(--text-secondary)", transition: "color 0.32s" }}>{p.year}</span>
      </div>

      <div style={{ zIndex: 1 }}>
        <motion.h3
          animate={{ color: hov ? "#ffffff" : "var(--text-primary)" }}
          transition={{ duration: 0.32 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isFeature ? "clamp(1.8rem, 3.5vw, 3rem)" : "clamp(1.2rem, 2vw, 1.8rem)",
            fontWeight: 700, letterSpacing: "-0.03em",
            lineHeight: 1.05, textTransform: "uppercase",
            marginBottom: "0.7rem",
          }}>{p.title}</motion.h3>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: isFeature ? "0.9rem" : "0.78rem",
          color: hov ? "rgba(255,255,255,0.55)" : "var(--text-secondary)",
          lineHeight: 1.7, maxWidth: isFeature ? "44ch" : "36ch",
          transition: "color 0.32s ease",
        }}>{p.desc}</p>
        <motion.span
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -8 }}
          transition={{ duration: 0.22 }}
          style={{
            display: "inline-block", marginTop: "1rem",
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            letterSpacing: "0.2em", textTransform: "uppercase", color: p.color,
          }}
        >View →</motion.span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────── WORD REVEAL ─────────────────────────────── */
function Reveal({ children, delay = 0, as: T = "span", className = "", style = {} }: {
  children: string; delay?: number; as?: React.ElementType;
  className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });
  const words = children.split(" ");
  return (
    // @ts-expect-error dynamic tag ref
    <T ref={ref} className={className} style={style} aria-label={children}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.2 }}
          >{w}</motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </T>
  );
}

/* ──────────────────────────────── PAGE ────────────────────────────────── */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);

  useEffect(() => {
    if (loading) {
      // @ts-ignore
      window.lenis?.stop();
    } else {
      // @ts-ignore
      window.lenis?.start();
    }
  }, [loading]);

  useGSAP(() => {
    if (!skewRef.current) return;
    let skew = 0;
    let last = 0;
    ScrollTrigger.create({
      onUpdate(self) {
        const v = (self.getVelocity() / 300) * -1;
        skew = Math.max(-12, Math.min(12, v));
        skewRef.current!.style.transform = `skewY(${skew}deg)`;
        if (last) clearTimeout(last);
        last = window.setTimeout(() => {
          if (skewRef.current) skewRef.current.style.transform = "skewY(0deg)";
        }, 600) as unknown as number;
      },
    });
  }, { scope: skewRef });

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <ScrollProgressBar />
          <Navigation />
        </motion.div>
      )}

      <motion.main 
        initial={{ y: 100, opacity: 0 }}
        animate={!loading ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "var(--bg)", color: "var(--text-primary)" }}
      >
        <section id="hero" ref={heroRef} style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 var(--px) 6rem", paddingTop: "64px", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
          <motion.div 
            style={{ y: heroY }}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 1.2 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2.5rem" }}
            >
              Abdulrauf Kazi · Portfolio 2026
            </motion.p>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.9, textTransform: "uppercase", marginBottom: "3rem" }}>
              {[{ text: "Abdulrauf", color: "var(--text-primary)" }, { text: "Kazi", color: "var(--accent)" }].map(({ text, color }, i) => (
                <span key={i} style={{ display: "block", overflow: "hidden" }}>
                  <motion.span 
                    style={{ display: "block", color }} 
                    variants={{
                      hidden: { y: "110%" },
                      visible: { y: "0%" }
                    }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center" }}>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1.2 }} 
                style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)", color: "var(--text-secondary)", maxWidth: "42ch", lineHeight: 1.7 }}
              >
                Developer · Designer · BTech CSE student building thoughtful digital products.
              </motion.p>
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                transition={{ duration: 0.5 }} 
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
              >
                <a href="https://github.com/Abdulrauf-kazi" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-primary)", textDecoration: "none", border: "1px solid var(--border)", padding: "0.65rem 1.4rem", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                >
                  GitHub ↗
                </a>
                <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", textDecoration: "none", background: "var(--accent)", padding: "0.65rem 1.4rem", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} style={{ position: "absolute", right: "var(--px)", bottom: "6rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-secondary)", writingMode: "vertical-rl" }}>Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} style={{ width: 1, height: 48, background: "var(--text-secondary)" }} />
          </motion.div>
        </section>

        <section id="projects" style={{ padding: "var(--section-py) var(--px)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, textTransform: "uppercase" }}>
              Selected Work
            </Reveal>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
              {PROJECTS.length} Projects · 2024–2026
            </p>
          </div>

          <div id="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
            <BentoCard p={PROJECTS[0]} gridStyle={{ gridColumn: "span 2", gridRow: "span 2" }} />
            <BentoCard p={PROJECTS[1]} gridStyle={{ gridRow: "span 2" }} />
            <BentoCard p={PROJECTS[2]} />
            <BentoCard p={PROJECTS[3]} gridStyle={{ gridColumn: "span 2" }} />
            <BentoCard p={PROJECTS[4]} gridStyle={{ gridColumn: "span 3" }} />
          </div>

          <style>{`
            @media (max-width: 768px) {
              #bento-grid > * {
                grid-column: 1 / -1 !important;
                grid-row: auto !important;
              }
              #bento-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        <section id="about" style={{ padding: "var(--section-py) var(--px)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2.5rem" }}>About Me</p>
              <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase", marginBottom: "2.5rem" }}>
                I Build Things.
              </Reveal>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4 }} style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "1.5rem", paddingLeft: "1.5rem", borderLeft: "2px solid var(--border)" }}>
                I&apos;m a computer science student passionate about building thoughtful digital products — from clean, performant UIs to well-structured backends.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2 }} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)", paddingLeft: "1.5rem", borderLeft: "2px solid var(--border)" }}>
                I enjoy the whole process: sketching ideas, writing code that scales, and obsessing over the small details that make software feel polished and alive.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.5 }} style={{ marginTop: "2rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", padding: "0.4rem 0.9rem", border: "1px solid var(--accent)" }}>
                  Currently Learning: AI/ML Engineering
                </span>
              </motion.div>
            </div>

            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2.5rem" }}>Skills Matrix</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
                {SKILLS.map((s, gi) => (
                  <motion.div
                    key={s.cat}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: gi * 0.07, duration: 0.5 }}
                    style={{ padding: "1.5rem", background: "var(--bg)" }}
                  >
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>{s.cat}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {s.items.map(item => (
                        <span key={item} style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-primary)" }}>{item}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              #about > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
            }
          `}</style>
        </section>

        <section id="contact" style={{ padding: "var(--section-py) var(--px)", background: "var(--bg-dark)", color: "white" }}>
          <div style={{ maxWidth: "760px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#444", marginBottom: "2rem" }}>Get In Touch</p>
            <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, textTransform: "uppercase", color: "white", marginBottom: "4rem" }}>
              Start a Conversation.
            </Reveal>
            <div style={{ "--text-primary": "white", "--text-secondary": "#888", "--border": "#2a2a2a", "--bg": "#0A0A0A" } as React.CSSProperties}>
              <ContactForm />
            </div>
          </div>
        </section>

        <footer style={{ padding: "2.5rem var(--px)", background: "var(--bg-dark)", borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#444" }}>
            © 2026 Abdulrauf Kazi · Hyderabad
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { label: "GitHub", href: "https://github.com/Abdulrauf-kazi" },
              { label: "LinkedIn", href: "#" },
              { label: "Email", href: "mailto:hello@example.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#555"}
              >{label}</a>
            ))}
          </div>
        </footer>
      </motion.main>
    </>
  );
}
