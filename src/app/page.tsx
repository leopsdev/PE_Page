import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Footer from "@/components/ui/Footer";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import Collaborators from "@/components/sections/Collaborators";
import Partners from "@/components/sections/Partners";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Ensures the page is always fresh

export default async function Home() {
  const projects = await prisma.project.findMany({ 
    orderBy: { createdAt: "desc" },
    include: { screenshots: true }
  });
  
  const partners = await prisma.partner.findMany({ 
    orderBy: { createdAt: "desc" } 
  });
  
  const collaborators = await prisma.collaborator.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-500 selection:text-white">
      <Navbar projects={projects as any[]} />
      <Hero />
      <About />
      <ProjectsCarousel projects={projects as any[]} />
      <Partners partners={partners} />
      <Collaborators collaborators={collaborators} />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
