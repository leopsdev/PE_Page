import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { prisma } from "@/lib/prisma";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;

  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
    include: { screenshots: true }
  });

  const allProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { screenshots: true }
  });

  if (!project) {
    notFound();
  }

  // Parse technologies safely
  let techArray: string[] = [];
  try {
    techArray = JSON.parse(project.technologies);
  } catch (e) {
    techArray = typeof project.technologies === 'string' ? project.technologies.split(',') : [];
  }

  return (
    <main className="min-h-screen bg-foreground/[0.02] text-foreground pt-32 pb-20">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        {/* Back navigation */}
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-2 text-foreground hover:text-brand-600 transition-colors mb-8 group font-medium"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Voltar
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            {project.link ? (
              <Link href={project.link} target="_blank" className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-foreground text-background hover:bg-blue-logo hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-md">
                Acesse
              </Link>
            ) : null}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
              {project.shortDescription}
            </p>

            {/* Tech Stack */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">Principios</h3>
              <div className="flex flex-wrap gap-2">
                {techArray.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg text-sm font-medium text-foreground/80 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image/Logo Placeholder */}
          <div className={`w-full md:w-[400px] aspect-square rounded-3xl ${project.themeLight || 'bg-brand-50'} border border-border/50 flex items-center justify-center p-12 shadow-xl shadow-brand-100/50`}>
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={`${project.title} logo`}
                fill
                sizes="100vw"
                className="object-contain filter drop-shadow-md"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-20 pt-16 border-t border-gray-500/50">
          <div className="">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400 mb-6">Sobre o Projeto</h2>
            <div className="prose prose-lg prose-brand text-white">
              <p className="leading-relaxed text-justify text-lg mb-12">
                {project.fullDescription}
              </p>
            </div>
          </div>

          {/* Screenshots Section */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400 mb-8">Fotos do Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((screenshot: any, idx: number) => (
                  <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-lg">
                    <Image
                      src={screenshot.url}
                      alt={`Screenshot ${idx + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Carousel / Outros Projetos Section */}
        <div className="mt-32 pt-16 border-t border-gray-500/50">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400 mb-8">Outros Projetos</h2>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {allProjects.filter((p: any) => p.id !== project.id).map((otherProject: any) => (
              <Link
                href={`/projetos/${otherProject.id}`}
                key={otherProject.id}
                className="flex-none w-[300px] md:w-[400px] snap-start group relative rounded-3xl overflow-hidden border border-white/10 bg-black/20 shadow-xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`aspect-video w-full ${otherProject.themeLight || 'bg-brand-50'} flex-shrink-0 flex items-center justify-center p-8`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={otherProject.image}
                      alt={otherProject.title}
                      fill
                      sizes="100vw"
                      className="object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-logo transition-colors">
                    {otherProject.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {otherProject.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
