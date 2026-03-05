-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mechanism" TEXT NOT NULL,
    "mechanismDescription" TEXT NOT NULL,
    "wavesPerHour" INTEGER NOT NULL,
    "maxWaveHeight" DOUBLE PRECISION NOT NULL,
    "minAcreage" DOUBLE PRECISION NOT NULL,
    "maxAcreage" DOUBLE PRECISION NOT NULL,
    "skillLevelMin" TEXT NOT NULL,
    "skillLevelMax" TEXT NOT NULL,
    "costMin" DOUBLE PRECISION NOT NULL,
    "costMax" DOUBLE PRECISION NOT NULL,
    "annualOperating" DOUBLE PRECISION NOT NULL,
    "pros" TEXT[],
    "cons" TEXT[],
    "imageUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "laborCostMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "permitCostMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "landCostPerAcre" DOUBLE PRECISION NOT NULL,
    "waterRegulationLevel" TEXT NOT NULL DEFAULT 'moderate',
    "environmentalReview" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "acreage" DOUBLE PRECISION NOT NULL,
    "propertyType" TEXT NOT NULL,
    "indoor" BOOLEAN NOT NULL DEFAULT false,
    "technologyCost" DOUBLE PRECISION NOT NULL,
    "constructionCost" DOUBLE PRECISION NOT NULL,
    "landCost" DOUBLE PRECISION NOT NULL,
    "permitCost" DOUBLE PRECISION NOT NULL,
    "infrastructureCost" DOUBLE PRECISION NOT NULL,
    "annualOperatingCost" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "fitScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_slug_key" ON "Technology"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "State_code_key" ON "State"("code");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE INDEX "Estimate_technologyId_idx" ON "Estimate"("technologyId");

-- CreateIndex
CREATE INDEX "Estimate_stateId_idx" ON "Estimate"("stateId");

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
