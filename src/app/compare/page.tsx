"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/calculator";

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
  annualOperating: number;
  skillLevelMin: string;
  skillLevelMax: string;
  description: string;
  pros: string[];
  cons: string[];
}

export default function ComparePage() {
  const [allTechs, setAllTechs] = useState<Technology[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<Technology[]>([]);

  useEffect(() => {
    fetch("/api/technologies")
      .then((r) => r.json())
      .then(setAllTechs);
  }, []);

  useEffect(() => {
    setSelected(allTechs.filter((t) => selectedIds.includes(t.id)));
  }, [selectedIds, allTechs]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const specs = [
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Mechanism", key: "mechanism" },
    {
      label: "Waves/Hour",
      render: (t: Technology) =>
        t.wavesPerHour >= 9999 ? "Continuous" : t.wavesPerHour.toLocaleString(),
    },
    { label: "Max Wave Height", render: (t: Technology) => `${t.maxWaveHeight} ft` },
    {
      label: "Acreage Required",
      render: (t: Technology) => `${t.minAcreage} - ${t.maxAcreage}`,
    },
    {
      label: "Skill Level",
      render: (t: Technology) => `${t.skillLevelMin} - ${t.skillLevelMax}`,
    },
    {
      label: "Cost Range",
      render: (t: Technology) =>
        `${formatCurrency(t.costMin)} - ${formatCurrency(t.costMax)}`,
    },
    {
      label: "Annual Operating",
      render: (t: Technology) => formatCurrency(t.annualOperating),
    },
  ];

  // Find best values for highlighting
  const getBest = (key: string, selected: Technology[]) => {
    if (selected.length < 2) return null;
    switch (key) {
      case "Waves/Hour":
        return selected.reduce((a, b) => (a.wavesPerHour > b.wavesPerHour ? a : b)).id;
      case "Max Wave Height":
        return selected.reduce((a, b) => (a.maxWaveHeight > b.maxWaveHeight ? a : b)).id;
      case "Cost Range":
        return selected.reduce((a, b) => (a.costMin < b.costMin ? a : b)).id;
      case "Annual Operating":
        return selected.reduce((a, b) => (a.annualOperating < b.annualOperating ? a : b)).id;
      case "Acreage Required":
        return selected.reduce((a, b) => (a.minAcreage < b.minAcreage ? a : b)).id;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Compare Technologies</h1>
      <p className="text-gray-500 mb-8">
        Select 2-3 technologies to compare side by side.
      </p>

      {/* Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTechs.map((t) => (
          <button
            key={t.id}
            onClick={() => toggleSelect(t.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedIds.includes(t.id)
                ? "bg-ocean text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } ${
              !selectedIds.includes(t.id) && selectedIds.length >= 3
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
            disabled={!selectedIds.includes(t.id) && selectedIds.length >= 3}
          >
            {t.name}
          </button>
        ))}
      </div>

      {selected.length < 2 ? (
        <div className="text-center py-20 text-gray-400">
          Select at least 2 technologies to compare.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 text-sm text-gray-500 font-medium border-b-2 border-gray-200 w-40">
                  Spec
                </th>
                {selected.map((t) => (
                  <th
                    key={t.id}
                    className="text-left p-3 text-sm font-bold text-navy border-b-2 border-gray-200"
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => {
                const bestId = getBest(spec.label, selected);
                return (
                  <tr key={spec.label} className="border-b border-gray-100">
                    <td className="p-3 text-sm text-gray-500 font-medium">
                      {spec.label}
                    </td>
                    {selected.map((t) => (
                      <td
                        key={t.id}
                        className={`p-3 text-sm capitalize ${
                          bestId === t.id
                            ? "text-ocean font-bold"
                            : "text-navy"
                        }`}
                      >
                        {spec.render
                          ? spec.render(t)
                          : (t as unknown as Record<string, string>)[spec.key as string]}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="border-b border-gray-100">
                <td className="p-3 text-sm text-gray-500 font-medium align-top">
                  Pros
                </td>
                {selected.map((t) => (
                  <td key={t.id} className="p-3 text-sm text-navy">
                    <ul className="space-y-1">
                      {t.pros.map((p, i) => (
                        <li key={i} className="flex gap-1">
                          <span className="text-green-500">+</span> {p}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-sm text-gray-500 font-medium align-top">
                  Cons
                </td>
                {selected.map((t) => (
                  <td key={t.id} className="p-3 text-sm text-navy">
                    <ul className="space-y-1">
                      {t.cons.map((c, i) => (
                        <li key={i} className="flex gap-1">
                          <span className="text-red-500">-</span> {c}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
