"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TechCard from "@/components/TechCard";
import { formatCurrency } from "@/lib/calculator";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface State {
  id: string;
  code: string;
  name: string;
}

interface Technology {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  mechanism: string;
  wavesPerHour: number;
  maxWaveHeight: number;
  minAcreage: number;
  maxAcreage: number;
  costMin: number;
  costMax: number;
  skillLevelMin: string;
  skillLevelMax: string;
}

interface CalcResult {
  technologyCost: number;
  constructionCost: number;
  landCost: number;
  permitCost: number;
  infrastructureCost: number;
  annualOperatingCost: number;
  totalCost: number;
  fitScore: number;
  breakdown: { category: string; amount: number; percentage: number }[];
}

const COLORS = ["#0077B6", "#00B4D8", "#90E0EF", "#F4A261", "#E9C46A"];

const steps = ["Location", "Land", "Technology", "Results"];

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-10 text-center text-gray-400">Loading calculator...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}

function CalculatorContent() {
  const searchParams = useSearchParams();
  const preselectedTech = searchParams.get("tech");

  const [step, setStep] = useState(0);
  const [states, setStates] = useState<State[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [stateId, setStateId] = useState("");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("commercial");
  const [acreage, setAcreage] = useState("");
  const [indoor, setIndoor] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  // Load states on mount
  useEffect(() => {
    fetch("/api/states")
      .then((r) => r.json())
      .then(setStates);
  }, []);

  // Load technologies when we reach step 3, filtered by acreage
  useEffect(() => {
    if (step === 2 && acreage) {
      fetch(`/api/technologies?maxAcreage=${acreage}`)
        .then((r) => r.json())
        .then((techs: Technology[]) => {
          setTechnologies(techs);
          // Auto-select preselected tech if available
          if (preselectedTech) {
            const found = techs.find((t: Technology) => t.slug === preselectedTech);
            if (found) {
              setSelectedTechId(found.id);
              setSelectedTech(found);
            }
          }
        });
    }
  }, [step, acreage, preselectedTech]);

  const canProceed = () => {
    switch (step) {
      case 0: return stateId && propertyType;
      case 1: return acreage && Number(acreage) > 0;
      case 2: return selectedTechId;
      default: return false;
    }
  };

  const handleCalculate = async () => {
    setLoading(true);
    const res = await fetch("/api/calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        technologyId: selectedTechId,
        stateId,
        acreage: Number(acreage),
        propertyType,
        indoor,
      }),
    });
    const data = await res.json();
    setResult(data);
    setStep(3);
    setLoading(false);
  };

  const handleNext = () => {
    if (step === 2) {
      handleCalculate();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Feasibility Calculator</h1>
      <p className="text-gray-500 mb-8">
        Estimate the cost of building a wave pool in your area.
      </p>

      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step
                  ? "bg-ocean text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`ml-2 text-sm font-medium hidden sm:inline ${
                i <= step ? "text-navy" : "text-gray-400"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 ${
                  i < step ? "bg-ocean" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 1: Location */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  State
                </label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white"
                >
                  <option value="">Select a state...</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Property Type
                </label>
                <div className="flex gap-4">
                  {(["residential", "commercial"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`flex-1 py-3 rounded-lg font-medium text-sm border-2 transition-colors ${
                        propertyType === type
                          ? "border-ocean bg-ocean/5 text-ocean"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Land */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Available Acreage
                </label>
                <input
                  type="number"
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value)}
                  placeholder="e.g. 6"
                  step="0.1"
                  min="0.05"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Installation Type
                </label>
                <div className="flex gap-4">
                  {[false, true].map((isIndoor) => (
                    <button
                      key={String(isIndoor)}
                      onClick={() => setIndoor(isIndoor)}
                      className={`flex-1 py-3 rounded-lg font-medium text-sm border-2 transition-colors ${
                        indoor === isIndoor
                          ? "border-ocean bg-ocean/5 text-ocean"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {isIndoor ? "Indoor" : "Outdoor"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Technology */}
          {step === 2 && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Showing technologies that fit within {acreage} acres.
              </p>
              {technologies.length === 0 ? (
                <p className="text-center py-10 text-gray-400">
                  No technologies fit your acreage. Try increasing the available land.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technologies.map((tech) => (
                    <TechCard
                      key={tech.id}
                      {...tech}
                      selectable
                      selected={selectedTechId === tech.id}
                      onSelect={() => {
                        setSelectedTechId(tech.id);
                        setSelectedTech(tech);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Results */}
          {step === 3 && result && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-ocean to-ocean-light text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <p className="text-ocean-pale text-sm">Estimated Total Cost</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.totalCost)}</p>
                  <p className="text-ocean-pale text-sm mt-1">
                    {selectedTech?.name}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 text-center">
                  <p className="text-ocean-pale text-sm">Technology Fit Score</p>
                  <p className="text-5xl font-bold">{result.fitScore}</p>
                  <p className="text-ocean-pale text-xs">/100</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-bold text-navy mb-4">Cost Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={result.breakdown}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                      >
                        {result.breakdown.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-bold text-navy mb-4">
                    Construction vs Operating
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={[
                        { name: "Construction", cost: result.totalCost },
                        {
                          name: "Annual Operating",
                          cost: result.annualOperatingCost,
                        },
                      ]}
                    >
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(v) => formatCurrency(v)} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Bar dataKey="cost" fill="#0077B6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line items */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-navy mb-4">Cost Details</h3>
                <div className="divide-y">
                  {result.breakdown.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-3 text-sm"
                    >
                      <span className="text-gray-600">{item.category}</span>
                      <span className="font-semibold text-navy">
                        {formatCurrency(item.amount)}{" "}
                        <span className="text-gray-400 font-normal">
                          ({item.percentage}%)
                        </span>
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between py-3 text-sm font-bold text-navy border-t-2 border-navy">
                    <span>Total Construction Cost</span>
                    <span>{formatCurrency(result.totalCost)}</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-gray-600">
                      Estimated Annual Operating Cost
                    </span>
                    <span className="font-semibold text-sand">
                      {formatCurrency(result.annualOperatingCost)}/yr
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(0)}
                  className="bg-gray-200 hover:bg-gray-300 text-navy font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 3 && (
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-6 py-3 rounded-lg font-medium text-sm text-gray-500 hover:text-navy disabled:opacity-30 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed() || loading}
            className="bg-ocean hover:bg-ocean-light disabled:bg-gray-300 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            {loading ? "Calculating..." : step === 2 ? "Calculate" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
