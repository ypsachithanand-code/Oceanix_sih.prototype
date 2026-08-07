import React, { useMemo } from 'react';
import { Sparkles, CalendarDays, Waves, Microscope } from 'lucide-react';

const dailySpeciesFeed = [
  {
    dateLabel: 'Today',
    name: 'Blue Tang',
    type: 'Species',
    habitat: 'Coral reef crest',
    note: 'Bright blue color and active schooling near branching corals.',
    signal: 'High visibility',
  },
  {
    dateLabel: 'Tomorrow',
    name: 'Seahorse',
    type: 'Species',
    habitat: 'Seagrass meadow',
    note: 'Camouflaged body posture suggests a calm morning observation.',
    signal: 'Low disturbance',
  },
  {
    dateLabel: 'Day 3',
    name: 'Diatom Bloom',
    type: 'Microorganism',
    habitat: 'Surface waters',
    note: 'Tiny phytoplankton activity increasing around the reef edge.',
    signal: 'Nutrient pulse',
  },
  {
    dateLabel: 'Day 4',
    name: 'Crown-of-Thorns Starfish',
    type: 'Species',
    habitat: 'Outer reef slope',
    note: 'A notable predator sighting near coral heads during the survey.',
    signal: 'Watchlist',
  },
  {
    dateLabel: 'Day 5',
    name: 'Symbiodinium',
    type: 'Microorganism',
    habitat: 'Inside coral tissue',
    note: 'Photosynthetic partner creating a vibrant reef energy signal.',
    signal: 'Healthy symbiosis',
  },
  {
    dateLabel: 'Day 6',
    name: 'Parrotfish',
    type: 'Species',
    habitat: 'Reef flat',
    note: 'Scraping algae from coral blocks while grazing in shallow water.',
    signal: 'Active grazing',
  },
];

function getDaySeed() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function DailySpeciesCards() {
  const daySeed = getDaySeed();

  const cards = useMemo(() => {
    return dailySpeciesFeed.map((item, index) => {
      const position = (daySeed + index) % dailySpeciesFeed.length;
      return dailySpeciesFeed[position];
    });
  }, [daySeed]);

  return (
    <div className="glass-panel rounded-3xl p-5 space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Daily Species Feed</h3>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            A new random marine species or microorganism card appears each day in this live feed.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--accent)' }}>
          <CalendarDays className="h-3.5 w-3.5" />
          Daily Insights
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cards.slice(0, 3).map((item, index) => (
          <div key={`${item.name}-${index}`} className="rounded-2xl border p-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.type === 'Microorganism' ? (
                  <Microscope className="h-4 w-4 text-[var(--accent-strong)]" />
                ) : (
                  <Waves className="h-4 w-4 text-[var(--accent)]" />
                )}
                <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.name}</h4>
              </div>
              <span className="rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--accent)' }}>
                {item.type}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{`Day ${index + 1}`}</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.note}</p>
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--accent)' }}>
                <span>Habitat: {item.habitat}</span>
                <span>{item.signal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
