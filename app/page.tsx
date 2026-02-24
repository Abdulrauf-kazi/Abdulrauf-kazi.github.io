import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Hero />
      <Gallery />
      <Projects />
      <Footer />
    </main>
  );
}
