import React, { useMemo, useState } from 'react';
import { Search, Microscope, Fish, Sparkles } from 'lucide-react';

const coralCatalog = [
  {
    name: 'Acropora cervicornis',
    category: 'Species',
    type: 'Staghorn coral',
    role: 'Creates reef structure and shelters fish',
    location: 'Shallow tropical reefs',
  },
  {
    name: 'Porites lutea',
    category: 'Species',
    type: 'Massive coral',
    role: 'Contributes to long-term reef resilience',
    location: 'Lagoon and slope zones',
  },
  {
    name: 'Zooxanthellae',
    category: 'Microorganism',
    type: 'Symbiotic algae',
    role: 'Provides energy through photosynthesis',
    location: 'Inside coral tissue',
  },
  {
    name: 'Endozoicomonas',
    category: 'Microorganism',
    type: 'Beneficial bacteria',
    role: 'Supports coral health and microbial balance',
    location: 'Coral mucus and tissues',
  },
  {
    name: 'Montipora digitata',
    category: 'Species',
    type: 'Finger coral',
    role: 'Adds color and habitat complexity',
    location: 'Reef flats and outer slopes',
  },
  {
    name: 'Cyanobacteria',
    category: 'Microorganism',
    type: 'Photosynthetic microbes',
    role: 'Contributes to nutrient cycling on reefs',
    location: 'Coral surfaces and sediment',
  },
];

export default function SpeciesSearchSection() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return coralCatalog.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const searchableText = `${item.name} ${item.type} ${item.role} ${item.location}`.toLowerCase();
      const matchesQuery = normalizedQuery === '' || searchableText.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <div className="glass-panel rounded-3xl border border-[#162c3f] p-5 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Coral Species & Microorganism Explorer</h3>
          <p className="mt-1 text-xs text-[#9BB7C9]">
            Search for coral species and microorganisms commonly found in reef ecosystems.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#50d6f9]/30 bg-[#0b3954] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#78d1ff]">
          <Sparkles className="h-3.5 w-3.5" />
          Species Explorer
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-[#162c3f] bg-[#071722] px-3 py-2.5">
          <Search className="h-4 w-4 text-[#50d6f9]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search species or microorganism"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#6b86a1]"
          />
        </label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-2xl border border-[#162c3f] bg-[#071722] px-3 py-2.5 text-sm text-white outline-none"
        >
          <option value="All" className="bg-[#071722]">All entries</option>
          <option value="Species" className="bg-[#071722]">Species</option>
          <option value="Microorganism" className="bg-[#071722]">Microorganisms</option>
        </select>
      </div>

      <div className="flex items-center justify-between text-xs text-[#9BB7C9]">
        <span>{filteredResults.length} visible entries</span>
        <span>Searches coral biodiversity and reef-associated microbes</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filteredResults.map((item) => (
          <div key={item.name} className="rounded-2xl border border-[#162c3f] bg-[#071722] p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.category === 'Microorganism' ? (
                  <Microscope className="h-4 w-4 text-[#78d1ff]" />
                ) : (
                  <Fish className="h-4 w-4 text-[#50d6f9]" />
                )}
                <h4 className="text-sm font-semibold text-white">{item.name}</h4>
              </div>
              <span className="rounded-full border border-[#50d6f9]/20 bg-[#0b3954] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#78d1ff]">
                {item.category}
              </span>
            </div>

            <p className="mt-3 text-xs text-[#9BB7C9]">{item.type}</p>
            <p className="mt-2 text-sm text-[#cfe5ff]">{item.role}</p>
            <p className="mt-2 text-xs text-[#78d1ff]">Location: {item.location}</p>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#2d4d67] bg-[#08131d] p-4 text-sm text-[#9BB7C9]">
          No matching coral species or microorganisms found. Try another keyword.
        </div>
      )}
    </div>
  );
}
