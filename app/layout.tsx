import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgressBar from "./components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Abdulrauf Kazi — Developer & Designer",
  description: "Portfolio of Abdulrauf Kazi — BTech CSE student building thoughtful digital products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgressBar />
            <Navigation />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
