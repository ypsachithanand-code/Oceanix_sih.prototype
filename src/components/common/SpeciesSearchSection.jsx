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
    <div className="glass-panel rounded-3xl p-5 space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Coral Species & Microorganism Explorer</h3>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            Search for coral species and microorganisms commonly found in reef ecosystems.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--accent)' }}>
          <Sparkles className="h-3.5 w-3.5" />
          Species Explorer
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border px-3 py-2.5" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
          <Search className="h-4 w-4 text-[var(--accent)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search species or microorganism"
            className="w-full bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }}
          />
        </label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-2xl border px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--text-primary)' }}
        >
          <option value="All" className="bg-[var(--surface-strong)]">All entries</option>
          <option value="Species" className="bg-[var(--surface-strong)]">Species</option>
          <option value="Microorganism" className="bg-[var(--surface-strong)]">Microorganisms</option>
        </select>
      </div>

      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span>{filteredResults.length} visible entries</span>
        <span>Searches coral biodiversity and reef-associated microbes</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filteredResults.map((item) => (
          <div key={item.name} className="rounded-2xl border p-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.category === 'Microorganism' ? (
                  <Microscope className="h-4 w-4 text-[var(--accent-strong)]" />
                ) : (
                  <Fish className="h-4 w-4 text-[var(--accent)]" />
                )}
                <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.name}</h4>
              </div>
              <span className="rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--accent)' }}>
                {item.category}
              </span>
            </div>

            <p className="mt-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{item.type}</p>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-primary)' }}>{item.role}</p>
            <p className="mt-2 text-xs" style={{ color: 'var(--accent)' }}>Location: {item.location}</p>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="rounded-2xl border border-dashed p-4 text-sm" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--panel-bg-strong)', color: 'var(--text-secondary)' }}>
          No matching coral species or microorganisms found. Try another keyword.
        </div>
      )}
    </div>
  );
}
