import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar parceiros" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const partner = await prisma.partner.create({
      data: {
        name: body.name,
        image: body.image || "",
      },
    });
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar parceiro" }, { status: 500 });
  }
}
