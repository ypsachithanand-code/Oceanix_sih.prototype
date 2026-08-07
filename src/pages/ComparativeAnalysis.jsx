import React, { useState } from 'react';
import { MOCK_COMPARISON_PRESETS, MOCK_SPECIES_OBSERVATIONS, MOCK_ANOMALIES, MOCK_REGIONS } from '../mock/marineData';
import MarineMap from '../components/map/MarineMap';
import { GitCompare, Sparkles, ArrowRight, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function ComparativeAnalysis() {
  const [selectedPresetId, setSelectedPresetId] = useState('preset-1');

  const currentPreset = MOCK_COMPARISON_PRESETS.find(p => p.id === selectedPresetId) || MOCK_COMPARISON_PRESETS[0];

  // Map subsets for Region A & Region B
  const obsA = MOCK_SPECIES_OBSERVATIONS.slice(0, 3);
  const obsB = MOCK_SPECIES_OBSERVATIONS.slice(3, 6);

  const comparisonChartData = [
    { metric: 'Health Score', RegionA: currentPreset.scoreA, RegionB: currentPreset.scoreB },
    { metric: 'Species Count (/10)', RegionA: Math.round(currentPreset.speciesA / 100), RegionB: Math.round(currentPreset.speciesB / 100) },
    { metric: 'SST (°C)', RegionA: currentPreset.sstA, RegionB: currentPreset.sstB },
    { metric: 'Anomalies', RegionA: currentPreset.anomaliesA * 10, RegionB: currentPreset.anomaliesB * 10 },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
        <div>
          <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
            <GitCompare className="w-6 h-6 text-[var(--accent)]" />
            <span>Comparative Analysis Engine</span>
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Side-by-side spatial and temporal evaluation of marine ecosystems
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-2 rounded-2xl border p-1.5" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
          {MOCK_COMPARISON_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedPresetId === preset.id
                  ? 'text-[var(--text-primary)] shadow-md' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              style={selectedPresetId === preset.id ? { background: 'linear-gradient(90deg, var(--accent), var(--accent-strong))', borderColor: 'transparent' } : { backgroundColor: 'transparent', borderColor: 'transparent' }}
            >
              {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Title Banner */}
      <div className="glass-panel p-4 rounded-2xl border flex items-center justify-between" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
        <span className="text-sm font-semibold flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
          <span>{currentPreset.title}</span>
        </span>
        <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ color: 'var(--accent)', backgroundColor: 'rgba(11, 110, 168, 0.12)', border: '1px solid rgba(11, 110, 168, 0.18)' }}>
          Delta: {Math.abs(currentPreset.scoreA - currentPreset.scoreB)} Points
        </span>
      </div>

      {/* Side-by-Side Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Region A Panel */}
        <div className="glass-panel p-5 rounded-3xl border space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
          <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.75rem' }}>
            <h3 className="font-bold text-base flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
              <span className="w-3 h-3 rounded-full bg-[var(--accent)]"></span>
              <span>{currentPreset.regionA}</span>
            </h3>
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>
              Score: {currentPreset.scoreA}/100
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
              <span className="text-[10px] font-mono block" style={{ color: 'var(--text-secondary)' }}>SPECIES COUNT</span>
              <span className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{currentPreset.speciesA}</span>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
              <span className="text-[10px] font-mono block" style={{ color: 'var(--text-secondary)' }}>ANOMALIES</span>
              <span className="text-lg font-bold font-mono" style={{ color: '#ef4444' }}>{currentPreset.anomaliesA}</span>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
              <span className="text-[10px] font-mono block" style={{ color: 'var(--text-secondary)' }}>AVG SST</span>
              <span className="text-lg font-bold font-mono" style={{ color: '#0284c7' }}>{currentPreset.sstA}°C</span>
            </div>
          </div>

          <MarineMap speciesObs={obsA} anomalies={[]} regions={MOCK_REGIONS.slice(0, 2)} height="280px" />
        </div>

        {/* Region B Panel */}
        <div className="glass-panel p-5 rounded-3xl border space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
          <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.75rem' }}>
            <h3 className="font-bold text-base flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
              <span className="w-3 h-3 rounded-full bg-[var(--accent-strong)]"></span>
              <span>{currentPreset.regionB}</span>
            </h3>
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-strong)' }}>
              Score: {currentPreset.scoreB}/100
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
              <span className="text-[10px] font-mono block" style={{ color: 'var(--text-secondary)' }}>SPECIES COUNT</span>
              <span className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{currentPreset.speciesB}</span>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
              <span className="text-[10px] font-mono block" style={{ color: 'var(--text-secondary)' }}>ANOMALIES</span>
              <span className="text-lg font-bold font-mono" style={{ color: '#ef4444' }}>{currentPreset.anomaliesB}</span>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
              <span className="text-[10px] font-mono block" style={{ color: 'var(--text-secondary)' }}>AVG SST</span>
              <span className="text-lg font-bold font-mono" style={{ color: '#0284c7' }}>{currentPreset.sstB}°C</span>
            </div>
          </div>

          <MarineMap speciesObs={obsB} anomalies={MOCK_ANOMALIES.slice(0, 2)} regions={MOCK_REGIONS.slice(2, 4)} height="280px" />
        </div>

      </div>

      {/* Executive Summary Breakdown Card */}
      <div className="glass-panel p-5 rounded-3xl border space-y-3" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
        <div className="flex items-center space-x-2" style={{ color: 'var(--accent)' }}>
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Algorithmic Synthesis & Ecological Summary</h3>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {currentPreset.summary}
        </p>
      </div>

      {/* Multi-Series Recharts Bar Chart */}
      <div className="glass-panel p-5 rounded-3xl border space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
        <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Side-by-Side Metric Histogram Comparison</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.35)" />
              <XAxis dataKey="metric" stroke="var(--text-secondary)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--accent)', borderRadius: '12px', color: 'var(--text-primary)' }} />
              <Legend wrapperStyle={{ paddingTop: '10px', color: 'var(--text-secondary)' }} />
              <Bar dataKey="RegionA" name={currentPreset.regionA} fill="var(--accent)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="RegionB" name={currentPreset.regionB} fill="var(--accent-strong)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
