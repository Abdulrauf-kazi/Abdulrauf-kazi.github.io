"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

interface FormState {
    name: string;
    email: string;
    message: string;
}

export default function ContactForm() {
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 1200));
        setSubmitting(false);
        setSubmitted(true);
    };

    const fieldStyle = (field: string) => ({
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${focusedField === field ? "var(--accent)" : "var(--border)"}`,
        padding: "0.75rem 0",
        fontFamily: "var(--font-body)",
        fontSize: "0.95rem",
        color: "var(--text-primary)",
        outline: "none",
        transition: "border-color 0.3s ease",
    });

    const labelStyle = {
        display: "block",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase" as const,
        color: "var(--text-secondary)",
        marginBottom: "0.5rem",
    };

    return (
        <AnimatePresence mode="wait">
            {!submitted ? (
                <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
                >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                        <div>
                            <label style={labelStyle}>Your Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                                style={fieldStyle("name")}
                                placeholder="Abdulrauf"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                style={fieldStyle("email")}
                                placeholder="hello@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Your Message</label>
                        <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            rows={4}
                            style={{
                                ...fieldStyle("message"),
                                resize: "none",
                                fontFamily: "var(--font-body)",
                            }}
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <div>
                        <MagneticButton
                            type="submit"
                            disabled={submitting}
                            className="group"
                            style={{
                                background: "var(--text-primary)",
                                color: "var(--bg)",
                                padding: "1rem 2.5rem",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.7rem",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                border: "1px solid var(--text-primary)",
                                cursor: submitting ? "wait" : "pointer",
                                transition: "background 0.3s ease, color 0.3s ease",
                            } as React.CSSProperties}
                        >
                            {submitting ? "Sending..." : "Send Message"}
                        </MagneticButton>
                    </div>
                </motion.form>
            ) : (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                    style={{
                        padding: "4rem 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: "var(--accent)",
                            textTransform: "uppercase",
                        }}
                    >
                        Message Sent.
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        I&apos;ll get back to you soon. Thanks for reaching out!
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
