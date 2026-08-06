// Mock Data for Oceanix Marine Intelligence System

export const MOCK_SPECIES_OBSERVATIONS = [
  {
    id: "obs-001",
    species: "Blue Whale",
    category: "Mammal",
    region: "Bay of Bengal",
    lat: 13.0827,
    lng: 80.2707,
    depth: 45,
    temp: 28.4,
    salinity: 34.2,
    timestamp: "2026-08-05 14:30",
    status: "Vulnerable",
    count: 3,
    notes: "Group of 3 blue whales sighted migrating southward along continental shelf edge."
  },
  {
    id: "obs-002",
    species: "Coral Bleaching",
    category: "Habitat Hazard",
    region: "Andaman Sea",
    lat: 11.6234,
    lng: 92.7265,
    depth: 12,
    temp: 31.2,
    salinity: 35.1,
    timestamp: "2026-08-06 09:15",
    status: "Critical",
    count: 140,
    notes: "Severe thermal bleaching detected across 40% of shallow Acropora colonies."
  },
  {
    id: "obs-003",
    species: "Dugong",
    category: "Mammal",
    region: "Gulf of Mannar",
    lat: 9.2884,
    lng: 79.1325,
    depth: 8,
    temp: 29.1,
    salinity: 34.8,
    timestamp: "2026-08-04 11:45",
    status: "Endangered",
    count: 2,
    notes: "Mother and calf observed grazing in protected seagrass meadow."
  },
  {
    id: "obs-004",
    species: "Phytoplankton Bloom",
    category: "Microbial Anomaly",
    region: "Arabian Sea",
    lat: 15.2993,
    lng: 73.9242,
    depth: 2,
    temp: 29.8,
    salinity: 36.0,
    timestamp: "2026-08-06 06:20",
    status: "Warning",
    count: 1000,
    notes: "Noctiluca scintillans bioluminescent bloom extending over 12 sq km."
  },
  {
    id: "obs-005",
    species: "Olive Ridley Sea Turtle",
    category: "Reptile",
    region: "Odisha Coast",
    lat: 19.8135,
    lng: 85.8312,
    depth: 5,
    temp: 27.9,
    salinity: 33.9,
    timestamp: "2026-08-05 22:10",
    status: "Protected",
    count: 28,
    notes: "Pre-nesting congregation documented near Rushikulya river mouth."
  },
  {
    id: "obs-006",
    species: "Scalloped Hammerhead Shark",
    category: "Elasmobranch",
    region: "Lakshadweep",
    lat: 10.5667,
    lng: 72.6417,
    depth: 60,
    temp: 28.0,
    salinity: 35.4,
    timestamp: "2026-08-03 16:00",
    status: "Critically Endangered",
    count: 7,
    notes: "Schooling activity recorded near sea pinnacle at depth of 60 meters."
  }
];

export const MOCK_ANOMALIES = [
  {
    id: "anom-101",
    title: "Extreme Sea Surface Temperature Surge",
    type: "Thermal Stress",
    severity: "Critical",
    region: "Andaman Sea",
    lat: 12.1000,
    lng: 93.0000,
    timestamp: "2026-08-06 04:00",
    description: "SST anomaly +2.4°C above 10-year mean. Degree Heating Weeks (DHW) exceeded 8.2°C-weeks.",
    actionRequired: "Deploy emergency reef shading & issue regional bleaching alert level 2."
  },
  {
    id: "anom-102",
    title: "Localized pH Drop & Acidification",
    type: "Acidification Event",
    severity: "Warning",
    region: "Bay of Bengal",
    lat: 14.5000,
    lng: 81.8000,
    timestamp: "2026-08-05 18:30",
    description: "pH dropped to 7.82 near coastal upwelling cell. Calcification rates projected to decline 14%.",
    actionRequired: "Increase autonomous sensor sampling frequency to 15-minute intervals."
  },
  {
    id: "anom-103",
    title: "Marine Microplastic Concentration Peak",
    type: "Marine Debris",
    severity: "Moderate",
    region: "Arabian Sea",
    lat: 18.9750,
    lng: 72.8258,
    timestamp: "2026-08-04 08:10",
    description: "Surface trawl sample detected 48,000 particles/km². High density of synthetic fibers.",
    actionRequired: "Notify coastal waste management authority & dispatch surface skimming vessel."
  }
];

export const MOCK_REGIONS = [
  {
    id: "reg-bob",
    name: "Bay of Bengal",
    healthScore: 76,
    status: "Stable",
    speciesCount: 1420,
    anomalyCount: 2,
    sstAvg: 28.6,
    phLevel: 8.08,
    coralHealth: 74,
    bounds: [[10.0, 79.5], [20.0, 93.5]],
    center: [14.5, 86.5],
    color: "#50d6f9"
  },
  {
    id: "reg-arb",
    name: "Arabian Sea",
    healthScore: 84,
    status: "Good",
    speciesCount: 1890,
    anomalyCount: 1,
    sstAvg: 27.8,
    phLevel: 8.12,
    coralHealth: 88,
    bounds: [[8.0, 68.0], [22.0, 76.0]],
    center: [15.0, 71.5],
    color: "#78d1ff"
  },
  {
    id: "reg-and",
    name: "Andaman Sea & Coral Belt",
    healthScore: 59,
    status: "Critical",
    speciesCount: 940,
    anomalyCount: 4,
    sstAvg: 31.1,
    phLevel: 7.94,
    coralHealth: 48,
    bounds: [[6.0, 91.5], [14.0, 95.0]],
    center: [10.0, 93.2],
    color: "#ffb4ab"
  },
  {
    id: "reg-lks",
    name: "Lakshadweep Archipelago",
    healthScore: 91,
    status: "Optimal",
    speciesCount: 2150,
    anomalyCount: 0,
    sstAvg: 27.2,
    phLevel: 8.16,
    coralHealth: 94,
    bounds: [[8.0, 71.0], [13.0, 74.0]],
    center: [10.5, 72.5],
    color: "#a4cbec"
  }
];

export const MOCK_TREND_DATA = [
  { month: "Jan", sst: 26.4, coralHealth: 88, speciesObserved: 1120, anomalies: 1 },
  { month: "Feb", sst: 26.8, coralHealth: 87, speciesObserved: 1180, anomalies: 1 },
  { month: "Mar", sst: 27.5, coralHealth: 85, speciesObserved: 1290, anomalies: 2 },
  { month: "Apr", sst: 28.9, coralHealth: 82, speciesObserved: 1350, anomalies: 3 },
  { month: "May", sst: 30.2, coralHealth: 74, speciesObserved: 1410, anomalies: 5 },
  { month: "Jun", sst: 29.8, coralHealth: 76, speciesObserved: 1380, anomalies: 4 },
  { month: "Jul", sst: 29.1, coralHealth: 79, speciesObserved: 1450, anomalies: 2 },
  { month: "Aug", sst: 28.5, coralHealth: 81, speciesObserved: 1520, anomalies: 2 }
];

export const MOCK_COMPARISON_PRESETS = [
  {
    id: "preset-1",
    title: "Bay of Bengal (2021 Baseline vs 2026 Present)",
    regionA: "Bay of Bengal (2021)",
    regionB: "Bay of Bengal (2026)",
    scoreA: 88,
    scoreB: 76,
    speciesA: 1680,
    speciesB: 1420,
    anomaliesA: 1,
    anomaliesB: 3,
    sstA: 27.1,
    sstB: 28.6,
    summary: "Significant 5-year thermal shift (+1.5°C avg SST) driven by intensified marine heatwaves, causing a 12-point decline in regional ocean health."
  },
  {
    id: "preset-2",
    title: "Andaman Sea Reefs vs Lakshadweep Atolls",
    regionA: "Andaman Reef Complex",
    regionB: "Lakshadweep Atolls",
    scoreA: 59,
    scoreB: 91,
    speciesA: 940,
    speciesB: 2150,
    anomaliesA: 4,
    anomaliesB: 0,
    sstA: 31.1,
    sstB: 27.2,
    summary: "Lakshadweep displays resilient coral health (+32 points higher) due to deep-water bathymetric flushing, while Andaman faces acute heat stress."
  },
  {
    id: "preset-3",
    title: "Pre-Monsoon vs Post-Monsoon Hydrography",
    regionA: "Pre-Monsoon (May)",
    regionB: "Post-Monsoon (Oct Est)",
    scoreA: 72,
    scoreB: 85,
    speciesA: 1310,
    speciesB: 1740,
    anomaliesA: 5,
    anomaliesB: 1,
    sstA: 30.5,
    sstB: 27.4,
    summary: "Monsoonal wind mixing restores dissolved oxygen levels and cools surface waters, projecting a 13-point seasonal recovery in biomass index."
  }
];

export const CHATBOT_QA_PAIRS = [
  {
    keywords: ["bleach", "coral", "andaman", "heatwave"],
    answer: "Current satellite telemetry indicates an active Coral Bleaching Alert Level 2 across the Andaman Sea. Degree Heating Weeks (DHW) stand at 8.2°C-weeks, with surface temperature hovering around 31.2°C. Recommended action: shading vulnerable Acropora nurseries.",
    citations: ["MODIS Aqua Satellite Sensor", "INCOIS Marine Buoy 4", "ReefWatch 2026 Survey"]
  },
  {
    keywords: ["health", "index", "mhi", "score", "compute"],
    answer: "The Marine Health Index (MHI) is calculated using a composite weighted formula: MHI = 0.35(Biodiversity Index) + 0.30(SST Stability) + 0.20(pH Level) + 0.15(Chlorophyll-a). Scores above 80 indicate Optimal health.",
    citations: ["Oceanix Algorithmic Specification v3.2", "IOC-UNESCO Marine Indicators Standard"]
  },
  {
    keywords: ["whale", "mammal", "sight", "chennai", "dugong"],
    answer: "Recent cetacean observations report 3 Blue Whales near Chennai continental shelf (depth 45m) and 2 Dugongs grazing in the seagrass beds of Gulf of Mannar. Both populations are tracked via passive acoustic hydrophone hydro-arrays.",
    citations: ["Acoustic Buoy Node Alpha-9", "Wildlife Institute of India Census"]
  },
  {
    keywords: ["export", "csv", "data", "download"],
    answer: "You can click the 'Export CSV' button on the Research Dashboard header to instantly export the current filtered marine observation dataset, including coordinates, depth, temperature, and species counts.",
    citations: ["Oceanix Data Pipeline API"]
  },
  {
    keywords: ["wave", "storm", "cyclone", "fisherman", "safety"],
    answer: "Significant Wave Height (SWH) in offshore Bay of Bengal is currently 1.4m to 1.8m with wind speeds under 14 knots. Safe for coastal fishing operations. Always monitor the /community portal for real-time Tamil voice advisories.",
    citations: ["National Centre for Ocean Information Services (INCOIS)", "IMD Marine Warning Bureau"]
  }
];

export const CHATBOT_DEFAULT_FALLBACK = {
  answer: "I am the Oceanix AI Assistant. I can analyze marine observations, ocean temperature anomalies, coral reef health, species distribution, and policy recommendations. Try asking about coral bleaching, Marine Health Index calculations, or recent whale sightings!",
  citations: ["Oceanix Knowledge Base v4.1"]
};

export const COMMUNITY_MULTILINGUAL_QA = {
  en: {
    welcomeTitle: "Coastal Fishing & Marine Community Portal",
    welcomeSubtitle: "Real-time sea conditions, safety advisories, and weather updates spoken in your language.",
    micHint: "Tap the microphone to speak your question",
    listeningText: "Listening to your voice...",
    sampleQuestionsLabel: "Frequently Asked Questions",
    samples: [
      { q: "Is it safe for fishing near Ennore today?", a: "Sea condition near Ennore is normal. Wave height is 1.2 meters. Wind speed is 10 knots from South-East. Safe for small craft fishing." },
      { q: "Where are high fish aggregation zones today?", a: "INCOIS Potential Fishing Zone (PFZ) forecast shows high chlorophyll concentration 12 nautical miles East of Nagapattinam at depth 20 meters." },
      { q: "What should I do if I spot a stranded sea turtle?", a: "Do not pull the turtle back into deep water by force. Cover it with damp cloth, keep in shade, and call the Forest Department Helpline 1800-425-4545 immediately." }
    ]
  },
  ta: {
    welcomeTitle: "கடல் மற்றும் மீனவர் சமூக போர்ட்டல்",
    welcomeSubtitle: "உங்கள் மொழியில் நேரடி கடல் நிலைமைகள், பாதுகாப்பு எச்சரிக்கைகள் மற்றும் வானிலை தகவல்கள்.",
    micHint: "கேள்வி கேட்க மைக்ரோஃபோனைத் தொடவும்",
    listeningText: "உங்கள் குரலைக் கேட்கிறது...",
    sampleQuestionsLabel: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    samples: [
      { q: "இன்று எண்ணூர் அருகே மீன்பிடிக்கப் போவது பாதுகாப்பானதா?", a: "எண்ணூர் அருகே கடல் இயல்பாக உள்ளது. அலை உயரம் 1.2 மீட்டர். காற்று வேகம் 10 நாட்ஸ். சிறிய படகு மீன்பிடிப்புக்கு பாதுகாப்பானது." },
      { q: "இன்று அதிக மீன் பிடிக்கும் மண்டலம் எங்குள்ளது?", a: "நாகப்பட்டினத்திற்கு கிழக்கே 12 கடல் மைல் தொலைவில் 20 மீட்டர் ஆழத்தில் அதிக மீன் கூட்டம் (PFZ) இருப்பதாக செயற்கைக்கோள் கூறுகிறது." },
      { q: "கரையொதுங்கிய ஆமையைக் கண்டால் என்ன செய்ய வேண்டும்?", a: "ஆமையை பலவந்தமாக ஆழமான கடலில் இழுக்க வேண்டாம். ஈரத்துணியால் மூடி, நிழலில் வைத்து, வனத்துறை உதவி எண் 1800-425-4545-க்கு உடனடியாக அழைக்கவும்." }
    ]
  }
};
