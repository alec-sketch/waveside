"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/calculator";

interface TechCardProps {
  slug: string;
  name: string;
  manufacturer: string;
  mechanism: string;
  wavesPerHour: number;
  maxWaveHeight: number;
  minAcreage: number;
  costMin: number;
  costMax: number;
  skillLevelMin: string;
  skillLevelMax: string;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

const mechanismColors: Record<string, string> = {
  foil: "bg-ocean text-white",
  hydrofoil: "bg-ocean text-white",
  pneumatic: "bg-sand text-navy",
  hydraulic: "bg-ocean-light text-navy",
  mechanical: "bg-sand-light text-navy",
  plunger: "bg-ocean-pale text-navy",
};

export default function TechCard({
  slug,
  name,
  manufacturer,
  mechanism,
  wavesPerHour,
  maxWaveHeight,
  minAcreage,
  costMin,
  costMax,
  skillLevelMin,
  skillLevelMax,
  selectable,
  selected,
  onSelect,
}: TechCardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 ${
        selected ? "border-ocean" : "border-transparent"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-navy text-lg leading-tight">{name}</h3>
          <p className="text-sm text-gray-500">{manufacturer}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            mechanismColors[mechanism] || "bg-gray-200 text-gray-700"
          }`}
        >
          {mechanism}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mt-4">
        <div>
          <p className="text-gray-500">Waves/hr</p>
          <p className="font-semibold text-navy">
            {wavesPerHour >= 9999 ? "Continuous" : wavesPerHour.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Max Height</p>
          <p className="font-semibold text-navy">{maxWaveHeight} ft</p>
        </div>
        <div>
          <p className="text-gray-500">Min Acreage</p>
          <p className="font-semibold text-navy">{minAcreage} acres</p>
        </div>
        <div>
          <p className="text-gray-500">Cost Range</p>
          <p className="font-semibold text-navy">
            {formatCurrency(costMin)} - {formatCurrency(costMax)}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Skill Level:{" "}
          <span className="capitalize font-medium text-navy">
            {skillLevelMin === skillLevelMax
              ? skillLevelMin
              : `${skillLevelMin} - ${skillLevelMax}`}
          </span>
        </p>
      </div>
    </motion.div>
  );

  if (selectable) {
    return (
      <button onClick={onSelect} className="text-left w-full">
        {content}
      </button>
    );
  }

  return <Link href={`/technologies/${slug}`}>{content}</Link>;
}
