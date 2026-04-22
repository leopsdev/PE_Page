import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    if (!res.ok) {
      throw new Error(`Falha ao carregar a página: ${res.statusText}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Estratégia de busca de meta tags populares (OG e Twitter)
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || "";
    // Author search
    let author = $('meta[name="author"]').attr('content') || $('meta[property="article:author"]').attr('content') || "";
    if (!author) {
      // Sometimes authors are in specific span classes like .author, .byline, etc.
      author = $('.author').first().text() || $('.byline').first().text() || "Redação";
    }
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || "";
    const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || "";
    const video = $('meta[property="og:video:url"]').attr('content') || "";

    return NextResponse.json({
      title: title.trim(),
      author: author.trim(),
      content: description.trim(),
      imageUrl: image.trim(),
      videoUrl: video.trim()
    });
  } catch (error: any) {
    console.error("Scrape Error:", error);
    return NextResponse.json({ error: "Erro ao extrair dados da página", details: error.message }, { status: 500 });
  }
}
