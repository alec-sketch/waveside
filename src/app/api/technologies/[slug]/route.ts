import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const technology = await prisma.technology.findUnique({ where: { slug } });

  if (!technology) {
    return NextResponse.json({ error: "Technology not found" }, { status: 404 });
  }

  return NextResponse.json(technology);
}
