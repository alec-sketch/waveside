import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const technologies = [
  {
    slug: "wavegarden-cove",
    name: "Wavegarden Cove",
    manufacturer: "Wavegarden",
    description:
      "Wavegarden's flagship lagoon technology using a central foil mechanism to generate waves radiating outward. Produces up to 1,000 waves per hour across multiple zones for different skill levels. The Cove design is the most widely deployed commercial wave pool system globally.",
    mechanism: "foil",
    mechanismDescription:
      "A submerged foil moves along a central track, displacing water to create waves that radiate to shore zones on both sides of the lagoon.",
    wavesPerHour: 1000,
    maxWaveHeight: 6.5,
    minAcreage: 4,
    maxAcreage: 8,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 20000000,
    costMax: 35000000,
    annualOperating: 2500000,
    pros: [
      "Proven technology with multiple installations worldwide",
      "Multi-zone design serves all skill levels simultaneously",
      "High wave count per hour",
      "Energy efficient foil mechanism",
    ],
    cons: [
      "Large footprint required",
      "High upfront capital cost",
      "Complex water filtration system",
    ],
    featured: true,
  },
  {
    slug: "kelly-slater-surf-ranch",
    name: "Surf Ranch (Kelly Slater Wave Co.)",
    manufacturer: "Kelly Slater Wave Company",
    description:
      "The iconic point-break wave pool designed by 11-time world champion Kelly Slater. Produces a single, perfect, long barrel wave along a 700m linear pool. Used for WSL Championship Tour events.",
    mechanism: "hydrofoil",
    mechanismDescription:
      "A large hydrofoil attached to a sled travels along a linear track at the bottom of a long, narrow pool, creating a single perfect wave that peels along the entire length.",
    wavesPerHour: 12,
    maxWaveHeight: 7.0,
    minAcreage: 12,
    maxAcreage: 20,
    skillLevelMin: "intermediate",
    skillLevelMax: "advanced",
    costMin: 40000000,
    costMax: 60000000,
    annualOperating: 4000000,
    pros: [
      "Produces the longest, most perfect barrel wave",
      "WSL competition-grade quality",
      "Iconic brand recognition",
    ],
    cons: [
      "Very low wave count per hour",
      "Extremely high cost",
      "Large land requirement",
      "One rider at a time",
      "Long reset time between waves",
    ],
    featured: true,
  },
  {
    slug: "american-wave-machines-perfectswell",
    name: "PerfectSwell",
    manufacturer: "American Wave Machines",
    description:
      "Pneumatic wave generation system using compressed air chambers along the pool perimeter. Creates highly customizable waves with software-controlled patterns. Each wave can be uniquely programmed.",
    mechanism: "pneumatic",
    mechanismDescription:
      "Banks of pneumatic caissons along the pool walls use compressed air to push and pull water, generating programmable wave patterns with precise control over shape, size, and direction.",
    wavesPerHour: 500,
    maxWaveHeight: 6.0,
    minAcreage: 3,
    maxAcreage: 7,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 15000000,
    costMax: 30000000,
    annualOperating: 2000000,
    pros: [
      "Highly programmable wave shapes",
      "Software-defined wave patterns",
      "Moderate footprint",
      "Good wave variety",
    ],
    cons: [
      "Air compressors can be noisy",
      "Higher energy consumption than foil systems",
      "Complex mechanical systems require maintenance",
    ],
    featured: true,
  },
  {
    slug: "surf-lakes",
    name: "Surf Lakes",
    manufacturer: "Surf Lakes International",
    description:
      "Revolutionary concentric ring design with a giant central plunger (\"The Plunger\") that creates 360-degree waves radiating outward to multiple reef configurations at different distances.",
    mechanism: "plunger",
    mechanismDescription:
      "A massive central plunger drops into the water creating concentric waves that travel outward to shaped reef structures arranged in a circle, producing up to 8 different break types simultaneously.",
    wavesPerHour: 2400,
    maxWaveHeight: 8.0,
    minAcreage: 8,
    maxAcreage: 15,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 25000000,
    costMax: 45000000,
    annualOperating: 3000000,
    pros: [
      "Highest wave count in the industry",
      "8 different break types simultaneously",
      "360-degree surfing",
      "Largest capacity for surfers",
    ],
    cons: [
      "Very large footprint required",
      "Plunger mechanism creates vibration",
      "Still in early commercial deployment",
      "Complex construction",
    ],
    featured: true,
  },
  {
    slug: "wavegarden-the-cove-2",
    name: "Wavegarden Cove 2.0",
    manufacturer: "Wavegarden",
    description:
      "Updated second generation of Wavegarden's Cove technology with improved wave quality, faster reset times, and enhanced energy efficiency. Features refined foil geometry for better barrel formation.",
    mechanism: "foil",
    mechanismDescription:
      "Next-generation submerged foil with optimized geometry travels along the central track, producing higher-quality waves with less energy and faster cycle times.",
    wavesPerHour: 1200,
    maxWaveHeight: 7.0,
    minAcreage: 5,
    maxAcreage: 10,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 25000000,
    costMax: 40000000,
    annualOperating: 2200000,
    pros: [
      "Improved wave quality over original Cove",
      "Better energy efficiency",
      "Faster wave cycling",
      "Proven Wavegarden platform",
    ],
    cons: [
      "Premium price over original Cove",
      "Limited installations to date",
      "Larger minimum footprint",
    ],
  },
  {
    slug: "citywave",
    name: "CityWave",
    manufacturer: "CityWave GmbH",
    description:
      "Standing wave technology designed for urban environments and indoor installations. Creates a continuous stationary wave using high-pressure water pumps. Compact footprint ideal for shopping malls, entertainment centers.",
    mechanism: "hydraulic",
    mechanismDescription:
      "High-pressure pumps force water over a shaped surface to create a continuous standing wave. Wave height and shape are adjustable via flow rate and surface angle.",
    wavesPerHour: 9999,
    maxWaveHeight: 5.0,
    minAcreage: 0.1,
    maxAcreage: 0.5,
    skillLevelMin: "beginner",
    skillLevelMax: "intermediate",
    costMin: 1500000,
    costMax: 4000000,
    annualOperating: 400000,
    pros: [
      "Smallest footprint — fits in urban spaces",
      "Continuous wave (no waiting)",
      "Lower capital cost",
      "Indoor-friendly",
    ],
    cons: [
      "Standing wave only — not a traditional surf wave",
      "Limited wave height",
      "Not suitable for advanced surfers",
      "High water pump energy cost",
    ],
    featured: true,
  },
  {
    slug: "unit-surf-pool",
    name: "Unit Surf Pool",
    manufacturer: "Unit Parktech",
    description:
      "Modular standing wave system from Austria that can be installed in various sizes. Uses adjustable water flow to create customizable standing waves for surfing, bodyboarding, and river surfing practice.",
    mechanism: "hydraulic",
    mechanismDescription:
      "Pumps drive water at high velocity over a curved surface, creating a standing wave. Modular design allows different pool sizes and configurations.",
    wavesPerHour: 9999,
    maxWaveHeight: 4.5,
    minAcreage: 0.05,
    maxAcreage: 0.3,
    skillLevelMin: "beginner",
    skillLevelMax: "intermediate",
    costMin: 800000,
    costMax: 2500000,
    annualOperating: 300000,
    pros: [
      "Most affordable option",
      "Smallest possible footprint",
      "Modular and scalable",
      "Quick installation",
    ],
    cons: [
      "Standing wave only",
      "Very limited wave height",
      "Not a traditional surfing experience",
    ],
  },
  {
    slug: "awm-surfstream",
    name: "SurfStream",
    manufacturer: "American Wave Machines",
    description:
      "Indoor-optimized standing/sheet wave system. Creates a thin sheet of fast-moving water over a padded surface. Popular for indoor surf parks and entertainment venues.",
    mechanism: "hydraulic",
    mechanismDescription:
      "High-volume pumps create a thin, fast-moving sheet of water over an adjustable padded surface, producing a standing wave suitable for surfing and bodyboarding.",
    wavesPerHour: 9999,
    maxWaveHeight: 4.0,
    minAcreage: 0.05,
    maxAcreage: 0.25,
    skillLevelMin: "beginner",
    skillLevelMax: "intermediate",
    costMin: 1000000,
    costMax: 3000000,
    annualOperating: 350000,
    pros: [
      "Excellent for indoor venues",
      "Continuous riding",
      "Safe padded surface",
      "Low water volume needed",
    ],
    cons: [
      "Sheet wave, not a traditional surf wave",
      "Limited height and power",
      "Not for advanced surfers",
    ],
  },
  {
    slug: "wavegarden-waveparks",
    name: "Wavegarden WaveParks",
    manufacturer: "Wavegarden",
    description:
      "Turnkey wave park solution combining Wavegarden's Cove technology with full facility planning including retail, dining, lodging, and training areas. A complete business-in-a-box concept.",
    mechanism: "foil",
    mechanismDescription:
      "Uses the proven Cove foil mechanism within a fully designed resort/park concept with integrated amenities and infrastructure planning.",
    wavesPerHour: 1000,
    maxWaveHeight: 6.5,
    minAcreage: 10,
    maxAcreage: 25,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 40000000,
    costMax: 80000000,
    annualOperating: 5000000,
    pros: [
      "Complete turnkey solution",
      "Revenue diversification beyond surfing",
      "Proven Wavegarden wave quality",
      "Full business planning included",
    ],
    cons: [
      "Highest total investment",
      "Very large land requirement",
      "Complex permitting for mixed-use development",
    ],
  },
  {
    slug: "endless-surf",
    name: "Endless Surf",
    manufacturer: "WhiteWater West",
    description:
      "Pneumatic wave generation system by water park industry giant WhiteWater. Uses caisson-based technology licensed from American Wave Machines, optimized for water park integration.",
    mechanism: "pneumatic",
    mechanismDescription:
      "Array of pneumatic caissons generate programmable waves using compressed air, optimized for integration with existing water park infrastructure.",
    wavesPerHour: 500,
    maxWaveHeight: 6.0,
    minAcreage: 3,
    maxAcreage: 8,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 18000000,
    costMax: 35000000,
    annualOperating: 2200000,
    pros: [
      "Backed by WhiteWater (industry leader in water parks)",
      "Easy water park integration",
      "Programmable wave patterns",
      "Scalable design",
    ],
    cons: [
      "Newer to market",
      "Similar noise concerns as other pneumatic systems",
      "Higher operating costs than foil systems",
    ],
  },
  {
    slug: "surf-stadium",
    name: "Surf Stadium",
    manufacturer: "Surf Stadium Wave Co.",
    description:
      "Mid-range wave pool using a proprietary bottom-hinge paddle system. Designed for commercial surf parks with a focus on consistent, reliable wave production at moderate cost.",
    mechanism: "mechanical",
    mechanismDescription:
      "Bottom-hinged paddles along one side of the pool push water in coordinated sequences to create traveling waves that break across a shaped reef floor.",
    wavesPerHour: 300,
    maxWaveHeight: 5.5,
    minAcreage: 3,
    maxAcreage: 6,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 12000000,
    costMax: 22000000,
    annualOperating: 1800000,
    pros: [
      "Moderate cost compared to premium systems",
      "Reliable mechanical system",
      "Good wave consistency",
      "Reasonable footprint",
    ],
    cons: [
      "Lower wave count than leading competitors",
      "Less wave variety",
      "Paddle maintenance required",
    ],
  },
  {
    slug: "webber-wave-pools",
    name: "Webber Wave Pools",
    manufacturer: "Webber Wave Pools",
    description:
      "Innovative circular pool design from Australian surfer/shaper Greg Webber. Uses a rotating foil to continuously generate waves in a circular lagoon, allowing surfers to ride in a loop.",
    mechanism: "foil",
    mechanismDescription:
      "A foil rotates around a circular track in the center of a round lagoon, continuously generating a wave that wraps around the pool in a never-ending circle.",
    wavesPerHour: 600,
    maxWaveHeight: 5.5,
    minAcreage: 2,
    maxAcreage: 5,
    skillLevelMin: "intermediate",
    skillLevelMax: "advanced",
    costMin: 15000000,
    costMax: 25000000,
    annualOperating: 1500000,
    pros: [
      "Continuous wave — no waiting between sets",
      "Unique circular riding experience",
      "Moderate footprint",
      "Energy efficient rotation",
    ],
    cons: [
      "No beginner zone",
      "Unproven at commercial scale",
      "Circular wave takes practice to ride",
    ],
  },
  {
    slug: "murphys-waves",
    name: "Murphy's Waves",
    manufacturer: "Murphy's Waves Ltd.",
    description:
      "Irish-designed wave pool using oscillating water column (OWC) technology adapted from ocean wave energy research. Compact system suitable for smaller installations.",
    mechanism: "pneumatic",
    mechanismDescription:
      "Oscillating water column chambers capture and release air pressure to generate waves, adapted from wave energy harvesting technology for reverse application.",
    wavesPerHour: 200,
    maxWaveHeight: 4.5,
    minAcreage: 1,
    maxAcreage: 3,
    skillLevelMin: "beginner",
    skillLevelMax: "intermediate",
    costMin: 5000000,
    costMax: 12000000,
    annualOperating: 800000,
    pros: [
      "Lower cost entry point",
      "Compact design",
      "Based on proven ocean energy technology",
      "Good for smaller communities",
    ],
    cons: [
      "Limited wave height",
      "Not suitable for advanced surfing",
      "Fewer waves per hour",
      "Limited track record",
    ],
  },
  {
    slug: "nalu-scientific",
    name: "Nalu Scientific",
    manufacturer: "Nalu Scientific LLC",
    description:
      "Research-oriented wave generation system designed for testing and smaller commercial applications. Uses precise pneumatic control for highly repeatable wave generation. Popular with universities and research facilities.",
    mechanism: "pneumatic",
    mechanismDescription:
      "Precision-controlled pneumatic actuators generate highly repeatable waves with scientific accuracy, designed for both research and small commercial applications.",
    wavesPerHour: 150,
    maxWaveHeight: 4.0,
    minAcreage: 0.5,
    maxAcreage: 2,
    skillLevelMin: "beginner",
    skillLevelMax: "intermediate",
    costMin: 3000000,
    costMax: 8000000,
    annualOperating: 500000,
    pros: [
      "Highest wave repeatability",
      "Lower cost tier",
      "Dual use: research + recreation",
      "Compact installation",
    ],
    cons: [
      "Lower wave height",
      "Not designed for advanced surfing",
      "Limited commercial installations",
    ],
  },
  {
    slug: "swell-mfg",
    name: "SWELL MFG",
    manufacturer: "SWELL Manufacturing",
    description:
      "Budget-friendly mechanical wave generation using a simple but effective cam-driven paddle system. Designed for community pools and municipal recreation centers looking to add surf capability.",
    mechanism: "mechanical",
    mechanismDescription:
      "Cam-driven paddles create consistent waves at lower cost, using simplified mechanical components for reliability and ease of maintenance.",
    wavesPerHour: 180,
    maxWaveHeight: 4.0,
    minAcreage: 1,
    maxAcreage: 3,
    skillLevelMin: "beginner",
    skillLevelMax: "intermediate",
    costMin: 2000000,
    costMax: 6000000,
    annualOperating: 400000,
    pros: [
      "Most affordable traditional wave pool",
      "Simple, reliable mechanics",
      "Easy maintenance",
      "Community-scale sizing",
    ],
    cons: [
      "Limited wave quality",
      "Not for advanced surfers",
      "Basic wave shapes only",
      "Lower wave count",
    ],
  },
  {
    slug: "ocean-kontrol",
    name: "Ocean Kontrol",
    manufacturer: "Ocean Kontrol Inc.",
    description:
      "AI-controlled wave generation system using an array of individually programmable water jets. The AI adjusts wave patterns in real-time based on surfer count, skill level, and conditions.",
    mechanism: "hydraulic",
    mechanismDescription:
      "An array of individually addressable high-pressure water jets controlled by AI software create complex, adaptive wave patterns that respond to real-time conditions.",
    wavesPerHour: 400,
    maxWaveHeight: 5.5,
    minAcreage: 2,
    maxAcreage: 6,
    skillLevelMin: "beginner",
    skillLevelMax: "advanced",
    costMin: 18000000,
    costMax: 30000000,
    annualOperating: 2000000,
    pros: [
      "AI-adaptive wave generation",
      "Infinite wave variety",
      "Real-time optimization",
      "Moderate footprint",
    ],
    cons: [
      "Complex software dependency",
      "Higher maintenance for jet array",
      "Newer technology, less proven",
      "Higher energy consumption",
    ],
  },
];

const states = [
  { code: "AL", name: "Alabama", region: "Southeast", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 15000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "AK", name: "Alaska", region: "West", laborCostMultiplier: 1.35, permitCostMultiplier: 1.20, landCostPerAcre: 8000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "AZ", name: "Arizona", region: "Southwest", laborCostMultiplier: 0.95, permitCostMultiplier: 0.90, landCostPerAcre: 25000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "AR", name: "Arkansas", region: "South", laborCostMultiplier: 0.80, permitCostMultiplier: 0.75, landCostPerAcre: 10000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "CA", name: "California", region: "West", laborCostMultiplier: 1.40, permitCostMultiplier: 1.50, landCostPerAcre: 120000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "CO", name: "Colorado", region: "West", laborCostMultiplier: 1.10, permitCostMultiplier: 1.00, landCostPerAcre: 40000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "CT", name: "Connecticut", region: "Northeast", laborCostMultiplier: 1.25, permitCostMultiplier: 1.30, landCostPerAcre: 80000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "DE", name: "Delaware", region: "Northeast", laborCostMultiplier: 1.10, permitCostMultiplier: 1.00, landCostPerAcre: 45000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "FL", name: "Florida", region: "Southeast", laborCostMultiplier: 1.00, permitCostMultiplier: 1.10, landCostPerAcre: 50000, waterRegulationLevel: "moderate", environmentalReview: true },
  { code: "GA", name: "Georgia", region: "Southeast", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 25000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "HI", name: "Hawaii", region: "West", laborCostMultiplier: 1.45, permitCostMultiplier: 1.40, landCostPerAcre: 150000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "ID", name: "Idaho", region: "West", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 15000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "IL", name: "Illinois", region: "Midwest", laborCostMultiplier: 1.15, permitCostMultiplier: 1.10, landCostPerAcre: 35000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "IN", name: "Indiana", region: "Midwest", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 18000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "IA", name: "Iowa", region: "Midwest", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 12000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "KS", name: "Kansas", region: "Midwest", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 10000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "KY", name: "Kentucky", region: "South", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 12000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "LA", name: "Louisiana", region: "South", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 15000, waterRegulationLevel: "moderate", environmentalReview: true },
  { code: "ME", name: "Maine", region: "Northeast", laborCostMultiplier: 1.05, permitCostMultiplier: 1.10, landCostPerAcre: 20000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "MD", name: "Maryland", region: "Northeast", laborCostMultiplier: 1.15, permitCostMultiplier: 1.15, landCostPerAcre: 55000, waterRegulationLevel: "moderate", environmentalReview: true },
  { code: "MA", name: "Massachusetts", region: "Northeast", laborCostMultiplier: 1.30, permitCostMultiplier: 1.35, landCostPerAcre: 90000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "MI", name: "Michigan", region: "Midwest", laborCostMultiplier: 1.00, permitCostMultiplier: 0.95, landCostPerAcre: 20000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "MN", name: "Minnesota", region: "Midwest", laborCostMultiplier: 1.05, permitCostMultiplier: 1.00, landCostPerAcre: 22000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "MS", name: "Mississippi", region: "South", laborCostMultiplier: 0.75, permitCostMultiplier: 0.70, landCostPerAcre: 8000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "MO", name: "Missouri", region: "Midwest", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 15000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "MT", name: "Montana", region: "West", laborCostMultiplier: 0.95, permitCostMultiplier: 0.90, landCostPerAcre: 10000, waterRegulationLevel: "moderate", environmentalReview: true },
  { code: "NE", name: "Nebraska", region: "Midwest", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 10000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "NV", name: "Nevada", region: "West", laborCostMultiplier: 1.10, permitCostMultiplier: 0.95, landCostPerAcre: 30000, waterRegulationLevel: "high", environmentalReview: false },
  { code: "NH", name: "New Hampshire", region: "Northeast", laborCostMultiplier: 1.10, permitCostMultiplier: 1.05, landCostPerAcre: 30000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "NJ", name: "New Jersey", region: "Northeast", laborCostMultiplier: 1.25, permitCostMultiplier: 1.30, landCostPerAcre: 85000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "NM", name: "New Mexico", region: "Southwest", laborCostMultiplier: 0.85, permitCostMultiplier: 0.85, landCostPerAcre: 8000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "NY", name: "New York", region: "Northeast", laborCostMultiplier: 1.35, permitCostMultiplier: 1.40, landCostPerAcre: 100000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "NC", name: "North Carolina", region: "Southeast", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 25000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "ND", name: "North Dakota", region: "Midwest", laborCostMultiplier: 0.90, permitCostMultiplier: 0.80, landCostPerAcre: 8000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "OH", name: "Ohio", region: "Midwest", laborCostMultiplier: 0.95, permitCostMultiplier: 0.90, landCostPerAcre: 18000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "OK", name: "Oklahoma", region: "South", laborCostMultiplier: 0.80, permitCostMultiplier: 0.75, landCostPerAcre: 10000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "OR", name: "Oregon", region: "West", laborCostMultiplier: 1.15, permitCostMultiplier: 1.20, landCostPerAcre: 40000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "PA", name: "Pennsylvania", region: "Northeast", laborCostMultiplier: 1.10, permitCostMultiplier: 1.10, landCostPerAcre: 35000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "RI", name: "Rhode Island", region: "Northeast", laborCostMultiplier: 1.15, permitCostMultiplier: 1.15, landCostPerAcre: 60000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "SC", name: "South Carolina", region: "Southeast", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 20000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "SD", name: "South Dakota", region: "Midwest", laborCostMultiplier: 0.80, permitCostMultiplier: 0.75, landCostPerAcre: 8000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "TN", name: "Tennessee", region: "South", laborCostMultiplier: 0.85, permitCostMultiplier: 0.80, landCostPerAcre: 18000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "TX", name: "Texas", region: "South", laborCostMultiplier: 0.90, permitCostMultiplier: 0.80, landCostPerAcre: 25000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "UT", name: "Utah", region: "West", laborCostMultiplier: 0.95, permitCostMultiplier: 0.90, landCostPerAcre: 20000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "VT", name: "Vermont", region: "Northeast", laborCostMultiplier: 1.05, permitCostMultiplier: 1.10, landCostPerAcre: 20000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "VA", name: "Virginia", region: "Southeast", laborCostMultiplier: 1.00, permitCostMultiplier: 1.00, landCostPerAcre: 35000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "WA", name: "Washington", region: "West", laborCostMultiplier: 1.20, permitCostMultiplier: 1.25, landCostPerAcre: 50000, waterRegulationLevel: "high", environmentalReview: true },
  { code: "WV", name: "West Virginia", region: "South", laborCostMultiplier: 0.80, permitCostMultiplier: 0.75, landCostPerAcre: 8000, waterRegulationLevel: "low", environmentalReview: false },
  { code: "WI", name: "Wisconsin", region: "Midwest", laborCostMultiplier: 0.95, permitCostMultiplier: 0.90, landCostPerAcre: 18000, waterRegulationLevel: "moderate", environmentalReview: false },
  { code: "WY", name: "Wyoming", region: "West", laborCostMultiplier: 0.90, permitCostMultiplier: 0.85, landCostPerAcre: 6000, waterRegulationLevel: "low", environmentalReview: false },
];

async function main() {
  console.log("Seeding technologies...");
  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: tech,
      create: tech,
    });
  }
  console.log(`Seeded ${technologies.length} technologies`);

  console.log("Seeding states...");
  for (const state of states) {
    await prisma.state.upsert({
      where: { code: state.code },
      update: state,
      create: state,
    });
  }
  console.log(`Seeded ${states.length} states`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
