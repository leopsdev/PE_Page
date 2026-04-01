import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Footer from "@/components/ui/Footer";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import Collaborators from "@/components/sections/Collaborators";
import Partners from "@/components/sections/Partners";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-500 selection:text-white">
      <Navbar />
      <Hero />
      
      <About />
      <ProjectsCarousel />
      <Partners />
      <Collaborators />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
