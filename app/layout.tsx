import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Abdulrauf Kazi — Designer",
  description: "Portfolio of Abdulrauf Kazi. Passionate about learning new things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0a] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
