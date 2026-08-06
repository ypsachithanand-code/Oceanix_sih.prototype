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
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
            <GitCompare className="w-6 h-6 text-[#50d6f9]" />
            <span>Comparative Analysis Engine</span>
          </h2>
          <p className="text-xs text-[#9BB7C9]">
            Side-by-side spatial and temporal evaluation of marine marine ecosystems
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-2 bg-[#092134] p-1.5 rounded-2xl border border-[#162c3f]">
          {MOCK_COMPARISON_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedPresetId === preset.id
                  ? 'bg-gradient-to-r from-[#0b3954] to-[#2d9bc9] text-white border border-[#50d6f9]/40 shadow-md'
                  : 'text-[#9BB7C9] hover:text-white'
              }`}
            >
              {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Title Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-[#50d6f9]/30 bg-[#092134]/80 flex items-center justify-between">
        <span className="text-sm font-semibold text-white flex items-center space-x-2">
          <span>{currentPreset.title}</span>
        </span>
        <span className="text-xs font-mono text-[#50d6f9] bg-[#0b3954] px-3 py-1 rounded-full border border-[#50d6f9]/30">
          Delta: {Math.abs(currentPreset.scoreA - currentPreset.scoreB)} Points
        </span>
      </div>

      {/* Side-by-Side Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Region A Panel */}
        <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-4">
          <div className="flex items-center justify-between border-b border-[#162c3f] pb-3">
            <h3 className="font-bold text-white text-base flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#50d6f9]"></span>
              <span>{currentPreset.regionA}</span>
            </h3>
            <span className="text-xs font-mono text-[#50d6f9] font-bold">
              Score: {currentPreset.scoreA}/100
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#051d30] p-2.5 rounded-xl border border-[#162c3f]">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">SPECIES COUNT</span>
              <span className="text-lg font-bold text-white font-mono">{currentPreset.speciesA}</span>
            </div>
            <div className="bg-[#051d30] p-2.5 rounded-xl border border-[#162c3f]">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">ANOMALIES</span>
              <span className="text-lg font-bold text-[#ffb4ab] font-mono">{currentPreset.anomaliesA}</span>
            </div>
            <div className="bg-[#051d30] p-2.5 rounded-xl border border-[#162c3f]">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">AVG SST</span>
              <span className="text-lg font-bold text-[#78d1ff] font-mono">{currentPreset.sstA}°C</span>
            </div>
          </div>

          <MarineMap speciesObs={obsA} anomalies={[]} regions={MOCK_REGIONS.slice(0, 2)} height="280px" />
        </div>

        {/* Region B Panel */}
        <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-4">
          <div className="flex items-center justify-between border-b border-[#162c3f] pb-3">
            <h3 className="font-bold text-white text-base flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#78d1ff]"></span>
              <span>{currentPreset.regionB}</span>
            </h3>
            <span className="text-xs font-mono text-[#78d1ff] font-bold">
              Score: {currentPreset.scoreB}/100
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#051d30] p-2.5 rounded-xl border border-[#162c3f]">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">SPECIES COUNT</span>
              <span className="text-lg font-bold text-white font-mono">{currentPreset.speciesB}</span>
            </div>
            <div className="bg-[#051d30] p-2.5 rounded-xl border border-[#162c3f]">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">ANOMALIES</span>
              <span className="text-lg font-bold text-[#ffb4ab] font-mono">{currentPreset.anomaliesB}</span>
            </div>
            <div className="bg-[#051d30] p-2.5 rounded-xl border border-[#162c3f]">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">AVG SST</span>
              <span className="text-lg font-bold text-[#78d1ff] font-mono">{currentPreset.sstB}°C</span>
            </div>
          </div>

          <MarineMap speciesObs={obsB} anomalies={MOCK_ANOMALIES.slice(0, 2)} regions={MOCK_REGIONS.slice(2, 4)} height="280px" />
        </div>

      </div>

      {/* Executive Summary Breakdown Card */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-3">
        <div className="flex items-center space-x-2 text-[#50d6f9]">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-white text-base">Algorithmic Synthesis & Ecological Summary</h3>
        </div>
        <p className="text-sm text-[#cfe5ff] leading-relaxed">
          {currentPreset.summary}
        </p>
      </div>

      {/* Multi-Series Recharts Bar Chart */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-4">
        <h3 className="font-bold text-white text-base">Side-by-Side Metric Histogram Comparison</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#162c3f" />
              <XAxis dataKey="metric" stroke="#9BB7C9" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9BB7C9" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#081c2d', borderColor: '#50d6f9', borderRadius: '12px', color: '#cfe5ff' }} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="RegionA" name={currentPreset.regionA} fill="#50d6f9" radius={[6, 6, 0, 0]} />
              <Bar dataKey="RegionB" name={currentPreset.regionB} fill="#2d9bc9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
