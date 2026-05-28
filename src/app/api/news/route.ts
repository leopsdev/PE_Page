import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const news = await prisma.clippingNews.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar notícias" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newsItem = await prisma.clippingNews.create({
      data: {
        title: body.title,
        author: body.author || "Redação",
        content: body.content,
        sourceUrl: body.sourceUrl,
        imageUrl: body.imageUrl || "",
        videoUrl: body.videoUrl || "",
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      },
    });
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar notícia" }, { status: 500 });
  }
}
