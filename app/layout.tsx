import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgressBar from "./components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Abdulrauf Kazi — Developer & Designer",
  description:
    "Portfolio of Abdulrauf Kazi — BTech CSE student building thoughtful digital products, from performant UIs to well-structured backends.",
  keywords: ["developer", "designer", "portfolio", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Abdulrauf Kazi" }],
  openGraph: {
    title: "Abdulrauf Kazi — Developer & Designer",
    description: "BTech CSE student building thoughtful digital products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <SmoothScroll>
          <ScrollProgressBar />
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
