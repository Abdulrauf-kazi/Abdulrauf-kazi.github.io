import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
