import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    const newsItem = await prisma.clippingNews.update({
      where: { id },
      data: {
        title: body.title,
        author: body.author,
        content: body.content,
        sourceUrl: body.sourceUrl,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl,
      },
    });
    
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar notícia" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.clippingNews.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir notícia" }, { status: 500 });
  }
}
