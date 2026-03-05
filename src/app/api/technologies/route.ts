import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mechanism = searchParams.get("mechanism");
  const skillLevel = searchParams.get("skillLevel");
  const minBudget = searchParams.get("minBudget");
  const maxBudget = searchParams.get("maxBudget");
  const maxAcreage = searchParams.get("maxAcreage");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};

  if (mechanism) where.mechanism = mechanism;
  if (featured === "true") where.featured = true;

  if (skillLevel) {
    const levels = ["beginner", "intermediate", "advanced"];
    const idx = levels.indexOf(skillLevel);
    if (idx >= 0) {
      where.skillLevelMin = { in: levels.slice(0, idx + 1) };
    }
  }

  if (minBudget || maxBudget) {
    if (minBudget) where.costMin = { gte: Number(minBudget) };
    if (maxBudget) where.costMax = { lte: Number(maxBudget) };
  }

  if (maxAcreage) {
    where.minAcreage = { lte: Number(maxAcreage) };
  }

  const technologies = await prisma.technology.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(technologies);
}
