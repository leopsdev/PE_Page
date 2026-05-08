import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        nickname: body.nickname,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        image: body.image,
        link: body.link,
        technologies: JSON.stringify(body.technologies || []),
        themePrimary: body.themePrimary,
        themeSecondary: body.themeSecondary,
        themeLight: body.themeLight,
        screenshots: body.screenshots ? {
          deleteMany: {},
          create: body.screenshots.map((url: string) => ({ url }))
        } : undefined,
      },
    });
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir projeto" }, { status: 500 });
  }
}
