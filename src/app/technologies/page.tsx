"use client";

import { useEffect, useState } from "react";
import TechCard from "@/components/TechCard";

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

const mechanisms = ["all", "foil", "hydrofoil", "pneumatic", "hydraulic", "mechanical", "plunger"];
const skillLevels = ["all", "beginner", "intermediate", "advanced"];
const budgetRanges = [
  { label: "All Budgets", min: "", max: "" },
  { label: "Under $5M", min: "", max: "5000000" },
  { label: "$5M - $20M", min: "5000000", max: "20000000" },
  { label: "$20M - $50M", min: "20000000", max: "50000000" },
  { label: "$50M+", min: "50000000", max: "" },
];

export default function TechnologiesPage() {
  const [techs, setTechs] = useState<Technology[]>([]);
  const [mechanism, setMechanism] = useState("all");
  const [skillLevel, setSkillLevel] = useState("all");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [acreage, setAcreage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (mechanism !== "all") params.set("mechanism", mechanism);
    if (skillLevel !== "all") params.set("skillLevel", skillLevel);
    const budget = budgetRanges[budgetIdx];
    if (budget.min) params.set("minBudget", budget.min);
    if (budget.max) params.set("maxBudget", budget.max);
    if (acreage) params.set("maxAcreage", acreage);

    setLoading(true);
    fetch(`/api/technologies?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setTechs(data);
        setLoading(false);
      });
  }, [mechanism, skillLevel, budgetIdx, acreage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Technology Explorer</h1>
      <p className="text-gray-500 mb-8">
        Browse and filter wave pool technologies to find the right fit.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-ocean-pale/10 rounded-xl">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Mechanism</label>
          <select
            value={mechanism}
            onChange={(e) => setMechanism(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {mechanisms.map((m) => (
              <option key={m} value={m}>
                {m === "all" ? "All Types" : m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Skill Level</label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {skillLevels.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Levels" : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Budget Range</label>
          <select
            value={budgetIdx}
            onChange={(e) => setBudgetIdx(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {budgetRanges.map((b, i) => (
              <option key={i} value={i}>{b.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Max Acreage</label>
          <input
            type="number"
            value={acreage}
            onChange={(e) => setAcreage(e.target.value)}
            placeholder="e.g. 10"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-24"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading technologies...</div>
      ) : techs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No technologies match your filters. Try adjusting your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techs.map((tech) => (
            <TechCard key={tech.id} {...tech} />
          ))}
        </div>
      )}
    </div>
  );
}
