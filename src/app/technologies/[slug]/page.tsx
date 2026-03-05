import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/calculator";

export default async function TechnologyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tech = await prisma.technology.findUnique({ where: { slug } });

  if (!tech) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/technologies"
        className="text-ocean hover:text-ocean-light text-sm mb-6 inline-block"
      >
        &larr; Back to Technologies
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-navy mb-1">{tech.name}</h1>
          <p className="text-gray-500 mb-6">{tech.manufacturer}</p>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">{tech.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-3">How It Works</h2>
            <p className="text-gray-700 leading-relaxed">
              {tech.mechanismDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-navy mb-2">Pros</h3>
              <ul className="space-y-2">
                {tech.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-navy mb-2">Cons</h3>
              <ul className="space-y-2">
                {tech.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-500 mt-0.5">-</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specs sidebar */}
        <div className="bg-ocean-pale/10 rounded-xl p-6 h-fit">
          <h2 className="font-bold text-navy mb-4">Specifications</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-gray-500">Mechanism</dt>
              <dd className="font-semibold text-navy capitalize">{tech.mechanism}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Waves Per Hour</dt>
              <dd className="font-semibold text-navy">
                {tech.wavesPerHour >= 9999
                  ? "Continuous"
                  : tech.wavesPerHour.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Max Wave Height</dt>
              <dd className="font-semibold text-navy">{tech.maxWaveHeight} ft</dd>
            </div>
            <div>
              <dt className="text-gray-500">Acreage Required</dt>
              <dd className="font-semibold text-navy">
                {tech.minAcreage} - {tech.maxAcreage} acres
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Skill Level</dt>
              <dd className="font-semibold text-navy capitalize">
                {tech.skillLevelMin} - {tech.skillLevelMax}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Cost Range</dt>
              <dd className="font-semibold text-navy">
                {formatCurrency(tech.costMin)} - {formatCurrency(tech.costMax)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Annual Operating</dt>
              <dd className="font-semibold text-navy">
                {formatCurrency(tech.annualOperating)}
              </dd>
            </div>
          </dl>

          <Link
            href={`/calculator?tech=${tech.slug}`}
            className="block mt-6 bg-ocean hover:bg-ocean-light text-white text-center font-bold py-3 rounded-lg transition-colors"
          >
            Calculate with this technology
          </Link>
        </div>
      </div>
    </div>
  );
}
