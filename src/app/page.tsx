import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TechCard from "@/components/TechCard";

export default async function HomePage() {
  const featuredTechs = await prisma.technology.findMany({
    where: { featured: true },
    take: 5,
    orderBy: { name: "asc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-ocean to-ocean-light text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bring the Ocean to Your Backyard
          </h1>
          <p className="text-lg md:text-xl text-ocean-pale mb-10 max-w-2xl mx-auto">
            Waveside makes wave pool technology accessible. Explore cutting-edge
            surf systems, compare options, and calculate what it takes to build
            your dream wave pool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="bg-sand hover:bg-sand-light text-navy font-bold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Feasibility Calculator
            </Link>
            <Link
              href="/technologies"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg border border-white/30"
            >
              Explore Technologies
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-ocean-pale/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Democratizing Surf Culture
          </h2>
          <p className="text-gray-600 text-lg">
            Surfing shouldn&apos;t be limited by geography. Wave pool technology
            is evolving rapidly, making it possible for communities everywhere
            to experience the joy of riding waves. Waveside helps you navigate
            the options and understand the costs.
          </p>
        </div>
      </section>

      {/* Featured Technologies */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
              Featured Technologies
            </h2>
            <p className="text-gray-500">
              Leading wave generation systems from around the world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTechs.map((tech) => (
              <TechCard key={tech.id} {...tech} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/technologies"
              className="text-ocean hover:text-ocean-light font-semibold transition-colors"
            >
              View all 16 technologies &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
