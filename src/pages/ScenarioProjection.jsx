import React, { useState, useMemo } from 'react';
import { MOCK_REGIONS } from '../mock/marineData';
import { TrendingUp, Sliders, AlertTriangle, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function ScenarioProjection() {
  const [selectedRegion, setSelectedRegion] = useState('Bay of Bengal');
  const [parameter, setParameter] = useState('sst'); // 'sst', 'ph', 'debris'
  const [severitySlider, setSeveritySlider] = useState(5); // 1 - 20 years/multiplier

  // Generate dynamic projection points based on formula
  const projectionData = useMemo(() => {
    const years = [2026, 2028, 2030, 2032, 2034, 2036, 2038, 2040, 2042, 2045];
    
    let baseHealth = 80;
    if (selectedRegion.includes('Andaman')) baseHealth = 60;
    if (selectedRegion.includes('Lakshadweep')) baseHealth = 90;
    if (selectedRegion.includes('Arabian')) baseHealth = 84;

    return years.map((year, idx) => {
      const yearOffset = idx * 2;
      let healthDegradation = 0;
      let bleachingRisk = 10;
      let biodiversityIndex = 85;

      if (parameter === 'sst') {
        healthDegradation = (yearOffset * 1.8) * (severitySlider / 5);
        bleachingRisk = Math.min(95, 12 + (yearOffset * 7.5) * (severitySlider / 5));
        biodiversityIndex = Math.max(20, 85 - (yearOffset * 4.2) * (severitySlider / 5));
      } else if (parameter === 'ph') {
        healthDegradation = (yearOffset * 1.4) * (severitySlider / 5);
        bleachingRisk = Math.min(90, 10 + (yearOffset * 5.2) * (severitySlider / 5));
        biodiversityIndex = Math.max(25, 85 - (yearOffset * 3.8) * (severitySlider / 5));
      } else {
        // Debris
        healthDegradation = (yearOffset * 2.1) * (severitySlider / 5);
        bleachingRisk = Math.min(85, 15 + (yearOffset * 6.0) * (severitySlider / 5));
        biodiversityIndex = Math.max(15, 85 - (yearOffset * 5.0) * (severitySlider / 5));
      }

      const projectedHealth = Math.max(10, Math.round((baseHealth - healthDegradation) * 10) / 10);

      return {
        year: String(year),
        ProjectedHealth: projectedHealth,
        BleachingRiskPct: Math.round(bleachingRisk),
        BiodiversityScore: Math.round(biodiversityIndex)
      };
    });
  }, [selectedRegion, parameter, severitySlider]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f]">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-[#50d6f9]" />
          <span>Predictive Scenario Projection Engine</span>
        </h2>
        <p className="text-xs text-[#9BB7C9] mt-1">
          Interactive parametric simulation model projecting future ocean health & biodiversity trajectories
        </p>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Region Selector */}
        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-2">
          <label className="text-xs font-mono uppercase text-[#9BB7C9] block font-semibold">
            Target EEZ Marine Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full glass-input px-3 py-2 rounded-xl text-sm font-medium focus:outline-none"
          >
            {MOCK_REGIONS.map(reg => (
              <option key={reg.id} value={reg.name} className="bg-[#092134] text-white">
                {reg.name} (Base: {reg.healthScore}/100)
              </option>
            ))}
          </select>
        </div>

        {/* Stressor Parameter Selector */}
        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-2">
          <label className="text-xs font-mono uppercase text-[#9BB7C9] block font-semibold">
            Climate Stressor Parameter
          </label>
          <select
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
            className="w-full glass-input px-3 py-2 rounded-xl text-sm font-medium focus:outline-none"
          >
            <option value="sst" className="bg-[#092134]">Sea Surface Temp (SST Surge +2.5°C)</option>
            <option value="ph" className="bg-[#092134]">Ocean Acidification (pH Drop -0.3 units)</option>
            <option value="debris" className="bg-[#092134]">Marine Microplastic Density Accumulation</option>
          </select>
        </div>

        {/* Projection Horizon Slider */}
        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase text-[#9BB7C9] font-semibold">
              Stressor Severity Intensity
            </label>
            <span className="text-xs font-mono text-[#50d6f9] font-bold">
              Level {severitySlider} / 20
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={severitySlider}
            onChange={(e) => setSeveritySlider(Number(e.target.value))}
            className="w-full accent-[#50d6f9] cursor-pointer"
          />
        </div>

      </div>

      {/* Projection Summary Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f]">
          <span className="text-xs font-mono text-[#9BB7C9] block">PROJECTED 2045 HEALTH</span>
          <span className="text-2xl font-bold font-mono text-[#50d6f9]">
            {projectionData[projectionData.length - 1].ProjectedHealth} / 100
          </span>
          <span className="text-[10px] text-red-400 font-mono block mt-1">
            -{Math.round((projectionData[0].ProjectedHealth - projectionData[projectionData.length - 1].ProjectedHealth))} points by 2045
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f]">
          <span className="text-xs font-mono text-[#9BB7C9] block">CORAL BLEACHING RISK</span>
          <span className="text-2xl font-bold font-mono text-amber-300">
            {projectionData[projectionData.length - 1].BleachingRiskPct}%
          </span>
          <span className="text-[10px] text-amber-400 font-mono block mt-1">High Thermal Vulnerability</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f]">
          <span className="text-xs font-mono text-[#9BB7C9] block">BIODIVERSITY RETENTION</span>
          <span className="text-2xl font-bold font-mono text-[#78d1ff]">
            {projectionData[projectionData.length - 1].BiodiversityScore}%
          </span>
          <span className="text-[10px] text-[#78d1ff] font-mono block mt-1">Refugia Conservation Required</span>
        </div>
      </div>

      {/* Projection Graph */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[var(--text-primary)] text-base">20-Year Projected Marine Health & Risk Trajectory</h3>
          <span className="text-xs font-mono px-3 py-1 rounded-full border" style={{ backgroundColor: 'var(--accent)', borderColor: 'rgba(11, 197, 234, 0.3)', color: '#ffffff' }}>
            Parametric Model Active
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#162c3f" />
              <XAxis dataKey="year" stroke="#9BB7C9" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9BB7C9" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--panel-bg-strong)', borderColor: 'var(--accent)', borderRadius: '12px', color: 'var(--text-primary)' }} />
              <Legend />
              <Line type="monotone" dataKey="ProjectedHealth" name="Marine Health Index" stroke="#50d6f9" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="BleachingRiskPct" name="Bleaching Risk (%)" stroke="#ffb4ab" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="BiodiversityScore" name="Biodiversity Index" stroke="#78d1ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prominent Scientific Disclaimer Box */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 flex items-start space-x-3 text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <strong className="block font-bold text-amber-300 font-mono uppercase">
            Scientific Simulation & Correlation Disclaimer:
          </strong>
          <p>
            Scenario projections rendered on this page are generated using historical baseline correlations and simplified parametric algorithms purely for visual demonstration during live hackathon evaluation. They do not constitute guaranteed meteorological or biological predictions.
          </p>
        </div>
      </div>

    </div>
  );
}
