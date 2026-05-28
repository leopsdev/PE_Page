import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    const collab = await prisma.collaborator.update({
      where: { id },
      data: {
        name: body.name,
        role: "",
        lattes: body.lattes,
        linkedin: body.linkedin,
        image: body.image,
      },
    });
    
    return NextResponse.json(collab);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar colaborador" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.collaborator.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir colaborador" }, { status: 500 });
  }
}
