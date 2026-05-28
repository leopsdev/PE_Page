import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { screenshots: true },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar projetos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        nickname: body.nickname || "",
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        image: body.image || "",
        link: body.link || "",
        technologies: JSON.stringify(body.technologies || []),
        themePrimary: body.themePrimary || "bg-blue-600",
        themeSecondary: body.themeSecondary || "text-blue-300",
        themeLight: body.themeLight || "bg-blue-50",
        screenshots: body.screenshots && body.screenshots.length > 0 ? {
          create: body.screenshots.map((url: string) => ({ url }))
        } : undefined,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 });
  }
}
