import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const collabs = await prisma.collaborator.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(collabs);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar colaboradores" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const collab = await prisma.collaborator.create({
      data: {
        name: body.name,
        role: "",
        lattes: body.lattes || "",
        linkedin: body.linkedin || "",
        image: body.image || "",
      },
    });
    return NextResponse.json(collab);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar colaborador" }, { status: 500 });
  }
}
