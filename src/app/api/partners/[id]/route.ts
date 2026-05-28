import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: body.name,
        image: body.image,
      },
    });
    
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar parceiro" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.partner.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir parceiro" }, { status: 500 });
  }
}
