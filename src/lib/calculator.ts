export interface CalculatorInput {
  technologyCostMin: number;
  technologyCostMax: number;
  technologyAnnualOperating: number;
  technologyMinAcreage: number;
  technologyMaxAcreage: number;
  acreage: number;
  propertyType: "residential" | "commercial";
  indoor: boolean;
  stateLaborCostMultiplier: number;
  statePermitCostMultiplier: number;
  stateLandCostPerAcre: number;
  stateWaterRegulationLevel: string;
  stateEnvironmentalReview: boolean;
}

export interface CostBreakdown {
  technologyCost: number;
  constructionCost: number;
  landCost: number;
  permitCost: number;
  infrastructureCost: number;
  annualOperatingCost: number;
  totalCost: number;
  fitScore: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export function calculateEstimate(input: CalculatorInput): CostBreakdown {
  const {
    technologyCostMin,
    technologyCostMax,
    technologyAnnualOperating,
    technologyMinAcreage,
    technologyMaxAcreage,
    acreage,
    propertyType,
    indoor,
    stateLaborCostMultiplier,
    statePermitCostMultiplier,
    stateLandCostPerAcre,
    stateWaterRegulationLevel,
    stateEnvironmentalReview,
  } = input;

  // Technology cost scales with acreage within the tech's range
  const acreageRatio = Math.min(
    1,
    Math.max(0, (acreage - technologyMinAcreage) / (technologyMaxAcreage - technologyMinAcreage || 1))
  );
  const technologyCost = Math.round(
    technologyCostMin + (technologyCostMax - technologyCostMin) * acreageRatio
  );

  // Construction: base 40% of tech cost, scaled by labor multiplier
  // Indoor adds 60% premium, commercial adds 15%
  let constructionCost = technologyCost * 0.4 * stateLaborCostMultiplier;
  if (indoor) constructionCost *= 1.6;
  if (propertyType === "commercial") constructionCost *= 1.15;
  constructionCost = Math.round(constructionCost);

  // Land cost
  const landCost = Math.round(acreage * stateLandCostPerAcre);

  // Permit costs: base 3% of tech cost, scaled by permit multiplier
  // Environmental review adds 50%, high regulation adds 30%
  let permitCost = technologyCost * 0.03 * statePermitCostMultiplier;
  if (stateEnvironmentalReview) permitCost *= 1.5;
  if (stateWaterRegulationLevel === "high") permitCost *= 1.3;
  else if (stateWaterRegulationLevel === "moderate") permitCost *= 1.1;
  permitCost = Math.round(permitCost);

  // Infrastructure: water, electrical, drainage — 15% of tech cost
  // Indoor adds 25% (HVAC, enclosure), high water regulation adds 20%
  let infrastructureCost = technologyCost * 0.15;
  if (indoor) infrastructureCost *= 1.25;
  if (stateWaterRegulationLevel === "high") infrastructureCost *= 1.2;
  infrastructureCost = Math.round(infrastructureCost);

  // Annual operating cost scaled by labor and indoor premium
  let annualOperatingCost = technologyAnnualOperating * stateLaborCostMultiplier;
  if (indoor) annualOperatingCost *= 1.3;
  annualOperatingCost = Math.round(annualOperatingCost);

  const totalCost = technologyCost + constructionCost + landCost + permitCost + infrastructureCost;

  // Fit score (0-100)
  const fitScore = calculateFitScore(input);

  // Breakdown for charts
  const categories = [
    { category: "Technology & Equipment", amount: technologyCost },
    { category: "Construction & Labor", amount: constructionCost },
    { category: "Land Acquisition", amount: landCost },
    { category: "Permits & Compliance", amount: permitCost },
    { category: "Infrastructure", amount: infrastructureCost },
  ];

  const breakdown = categories.map((c) => ({
    ...c,
    percentage: Math.round((c.amount / totalCost) * 100),
  }));

  return {
    technologyCost,
    constructionCost,
    landCost,
    permitCost,
    infrastructureCost,
    annualOperatingCost,
    totalCost,
    fitScore,
    breakdown,
  };
}

function calculateFitScore(input: CalculatorInput): number {
  let score = 100;

  const { acreage, technologyMinAcreage, technologyMaxAcreage, indoor } = input;

  // Acreage fit: perfect if within range, penalize if outside
  if (acreage < technologyMinAcreage) {
    const deficit = (technologyMinAcreage - acreage) / technologyMinAcreage;
    score -= Math.round(deficit * 40);
  } else if (acreage > technologyMaxAcreage) {
    // Over-sized land is less of a problem but still not ideal
    const excess = (acreage - technologyMaxAcreage) / technologyMaxAcreage;
    score -= Math.round(Math.min(excess * 15, 20));
  }

  // Water regulation penalty
  if (input.stateWaterRegulationLevel === "high") score -= 10;
  else if (input.stateWaterRegulationLevel === "moderate") score -= 5;

  // Environmental review penalty
  if (input.stateEnvironmentalReview) score -= 5;

  // Indoor with large-acreage tech is a poor fit
  if (indoor && technologyMinAcreage > 3) score -= 15;

  // High labor cost states
  if (input.stateLaborCostMultiplier > 1.3) score -= 5;

  return Math.max(0, Math.min(100, score));
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}
