import { prisma } from "@/lib/prisma";
import { calculateEstimate } from "@/lib/calculator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { technologyId, stateId, acreage, propertyType, indoor } = body;

  if (!technologyId || !stateId || !acreage || !propertyType) {
    return NextResponse.json(
      { error: "Missing required fields: technologyId, stateId, acreage, propertyType" },
      { status: 400 }
    );
  }

  const [technology, state] = await Promise.all([
    prisma.technology.findUnique({ where: { id: technologyId } }),
    prisma.state.findUnique({ where: { id: stateId } }),
  ]);

  if (!technology) {
    return NextResponse.json({ error: "Technology not found" }, { status: 404 });
  }
  if (!state) {
    return NextResponse.json({ error: "State not found" }, { status: 404 });
  }

  const result = calculateEstimate({
    technologyCostMin: technology.costMin,
    technologyCostMax: technology.costMax,
    technologyAnnualOperating: technology.annualOperating,
    technologyMinAcreage: technology.minAcreage,
    technologyMaxAcreage: technology.maxAcreage,
    acreage: Number(acreage),
    propertyType,
    indoor: Boolean(indoor),
    stateLaborCostMultiplier: state.laborCostMultiplier,
    statePermitCostMultiplier: state.permitCostMultiplier,
    stateLandCostPerAcre: state.landCostPerAcre,
    stateWaterRegulationLevel: state.waterRegulationLevel,
    stateEnvironmentalReview: state.environmentalReview,
  });

  // Save estimate to DB
  const estimate = await prisma.estimate.create({
    data: {
      technologyId,
      stateId,
      acreage: Number(acreage),
      propertyType,
      indoor: Boolean(indoor),
      technologyCost: result.technologyCost,
      constructionCost: result.constructionCost,
      landCost: result.landCost,
      permitCost: result.permitCost,
      infrastructureCost: result.infrastructureCost,
      annualOperatingCost: result.annualOperatingCost,
      totalCost: result.totalCost,
      fitScore: result.fitScore,
    },
  });

  return NextResponse.json({ ...result, estimateId: estimate.id });
}
