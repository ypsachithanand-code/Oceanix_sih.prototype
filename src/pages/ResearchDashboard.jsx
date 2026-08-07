import React, { useState, useMemo } from 'react';
import { 
  MOCK_SPECIES_OBSERVATIONS, 
  MOCK_ANOMALIES, 
  MOCK_REGIONS, 
  MOCK_TREND_DATA 
} from '../mock/marineData';
import MarineMap from '../components/map/MarineMap';
import SpeciesDetectionDemo from '../components/common/SpeciesDetectionDemo';
import SpeciesSearchSection from '../components/common/SpeciesSearchSection';
import DailySpeciesCards from '../components/common/DailySpeciesCards';
import { 
  Filter, 
  Download, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  Thermometer, 
  Layers, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function ResearchDashboard() {
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [activeSpeciesList, setActiveSpeciesList] = useState(MOCK_SPECIES_OBSERVATIONS);

  // Available unique species options
  const speciesOptions = ['All', ...new Set(MOCK_SPECIES_OBSERVATIONS.map(s => s.species))];
  const regionOptions = ['All', ...MOCK_REGIONS.map(r => r.name)];

  // Filtered Species Observations
  const filteredSpecies = useMemo(() => {
    return activeSpeciesList.filter(obs => {
      const matchSpecies = selectedSpecies === 'All' || obs.species === selectedSpecies;
      const matchRegion = selectedRegion === 'All' || obs.region.includes(selectedRegion) || selectedRegion.includes(obs.region);
      return matchSpecies && matchRegion;
    });
  }, [selectedSpecies, selectedRegion, activeSpeciesList]);

  // Filtered Anomalies
  const filteredAnomalies = useMemo(() => {
    return MOCK_ANOMALIES.filter(anom => {
      const matchRegion = selectedRegion === 'All' || anom.region.includes(selectedRegion) || selectedRegion.includes(anom.region);
      return matchRegion;
    });
  }, [selectedRegion]);

  // CSV Export Functionality
  const handleExportCSV = () => {
    const headers = ["ID", "Species", "Category", "Region", "Latitude", "Longitude", "Depth (m)", "Temperature (°C)", "Salinity (PSU)", "Count", "Timestamp", "Notes"];
    const rows = filteredSpecies.map(item => [
      item.id,
      `"${item.species}"`,
      `"${item.category}"`,
      `"${item.region}"`,
      item.lat,
      item.lng,
      item.depth,
      item.temp,
      item.salinity,
      item.count,
      `"${item.timestamp}"`,
      `"${item.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Oceanix_Marine_Observations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Control Toolbar */}
      <div className="glass-panel p-5 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <span>Research & Telemetry Dashboard</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Real-time bathymetric sensor monitoring & species observation filter engine
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Species Dropdown */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
            <Filter className="w-4 h-4 text-[var(--accent)]" />
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="bg-transparent text-xs font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
            >
              {speciesOptions.map(sp => (
                <option key={sp} value={sp} className="bg-[var(--surface-strong)] text-[var(--text-primary)]">{sp}</option>
              ))}
            </select>
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
            <Layers className="w-4 h-4 text-[var(--accent)]" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-xs font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
            >
              {regionOptions.map(reg => (
                <option key={reg} value={reg} className="bg-[var(--surface-strong)] text-[var(--text-primary)]">{reg}</option>
              ))}
            </select>
          </div>

          {/* Date Range Dropdown */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-xl border" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
            <Calendar className="w-4 h-4 text-[var(--accent)]" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-transparent text-xs font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
            >
              <option value="24h" className="bg-[var(--surface-strong)]">Last 24 Hours</option>
              <option value="7d" className="bg-[var(--surface-strong)]">Last 7 Days</option>
              <option value="30d" className="bg-[var(--surface-strong)]">Last 30 Days</option>
              <option value="all" className="bg-[var(--surface-strong)]">All Time</option>
            </select>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-md"
            style={{ backgroundColor: 'var(--accent)', color: '#001526', borderColor: 'transparent' }}
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* High-Level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border space-y-1" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
          <div className="flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-xs font-mono uppercase">Filtered Observations</span>
            <Activity className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div className="text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{filteredSpecies.length}</div>
          <div className="text-[10px] font-mono flex items-center space-x-1" style={{ color: '#0f766e' }}>
            <CheckCircle2 className="w-3 h-3" />
            <span>Live Telemetry Stream</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border space-y-1" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
          <div className="flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-xs font-mono uppercase">Active Anomalies</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{filteredAnomalies.length}</div>
          <div className="text-[10px] font-mono" style={{ color: '#b91c1c' }}>
            {filteredAnomalies.length > 0 ? 'Action Required' : 'Nominal Thresholds'}
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border space-y-1" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
          <div className="flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-xs font-mono uppercase">Avg Sea Surface Temp</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>28.9°C</div>
          <div className="text-[10px] font-mono" style={{ color: '#b45309' }}>+1.2°C anomaly delta</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border space-y-1" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
          <div className="flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-xs font-mono uppercase">Marine Health Index</span>
            <TrendingUp className="w-4 h-4 text-[var(--accent-strong)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--accent)]">78 / 100</div>
          <div className="text-[10px] font-mono text-[var(--accent-strong)]">Moderate Ecological Status</div>
        </div>
      </div>

      {/* Interactive Map View */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold font-mono uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            Interactive Marine Telemetry Map
          </h3>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Click markers to inspect environmental parameters
          </span>
        </div>
        
        <MarineMap 
          speciesObs={filteredSpecies} 
          anomalies={filteredAnomalies} 
          regions={MOCK_REGIONS} 
          height="480px" 
        />
      </div>

      {/* Species Diversity Demo */}
      <SpeciesDetectionDemo />

      {/* Species Search Explorer */}
      <SpeciesSearchSection />

      {/* Daily rotating species cards */}
      <DailySpeciesCards />

      {/* Trend Chart Below Map */}
      <div className="glass-panel p-5 rounded-3xl border space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>Historical Marine Telemetry & Temperature Trends</h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sea Surface Temperature (°C) vs Coral Reef Health Index over time</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[var(--accent)]"></span>
              <span>Coral Health Index</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[#fb7185]"></span>
              <span>SST (°C)</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#50d6f9" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#50d6f9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="sstGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffb4ab" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ffb4ab" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#162c3f" />
              <XAxis dataKey="month" stroke="#9BB7C9" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9BB7C9" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#081c2d', borderColor: '#50d6f9', borderRadius: '12px', color: '#cfe5ff' }}
              />
              <Area type="monotone" dataKey="coralHealth" name="Coral Health Score" stroke="#50d6f9" fillOpacity={1} fill="url(#coralGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="sst" name="Sea Temp (°C)" stroke="#ffb4ab" fillOpacity={1} fill="url(#sstGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
