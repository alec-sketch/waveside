export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">About Waveside</h1>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Waveside exists to democratize surf culture. We believe that the joy of
          riding a wave shouldn&apos;t be limited by geography, economics, or access
          to the coast. By providing transparent, accessible information about wave
          pool technologies and their costs, we empower communities, entrepreneurs,
          and dreamers to bring the ocean inland.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We envision a world where every community has access to quality surf
          experiences. Wave pools aren&apos;t just about surfing &mdash; they&apos;re
          about community health, economic development, and creating spaces where
          people connect with the power of water.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy mb-3">
          Why Wave Pools Matter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-ocean-pale/15 rounded-xl p-6">
            <h3 className="font-bold text-navy mb-2">Community</h3>
            <p className="text-sm text-gray-600">
              Wave pools create gathering spaces that bring people together around
              a shared love of water and sport, fostering community bonds.
            </p>
          </div>
          <div className="bg-ocean-pale/15 rounded-xl p-6">
            <h3 className="font-bold text-navy mb-2">Health</h3>
            <p className="text-sm text-gray-600">
              Surfing is a full-body workout that improves cardiovascular health,
              balance, and mental wellbeing. Wave pools make this accessible year-round.
            </p>
          </div>
          <div className="bg-ocean-pale/15 rounded-xl p-6">
            <h3 className="font-bold text-navy mb-2">Access</h3>
            <p className="text-sm text-gray-600">
              Only a fraction of the population lives near surfable coastline.
              Wave pools bring the surf experience to landlocked communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
