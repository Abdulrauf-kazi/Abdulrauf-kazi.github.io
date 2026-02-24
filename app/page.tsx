import Hero from "./components/Hero";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Hero />
      <Services />
      <Clients />
      <Experience />
      <Testimonials />
      <Footer />
    </main>
  );
}
