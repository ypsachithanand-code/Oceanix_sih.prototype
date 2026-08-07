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
      <div className="glass-panel p-5 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#162c3f]">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
            <span>Research & Telemetry Dashboard</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#50d6f9] animate-pulse"></span>
          </h2>
          <p className="text-xs text-[#9BB7C9] mt-0.5">
            Real-time bathymetric sensor monitoring & species observation filter engine
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Species Dropdown */}
          <div className="flex items-center space-x-2 bg-[#092134] px-3 py-2 rounded-xl border border-[#162c3f]">
            <Filter className="w-4 h-4 text-[#50d6f9]" />
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
            >
              {speciesOptions.map(sp => (
                <option key={sp} value={sp} className="bg-[#092134] text-white">{sp}</option>
              ))}
            </select>
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center space-x-2 bg-[#092134] px-3 py-2 rounded-xl border border-[#162c3f]">
            <Layers className="w-4 h-4 text-[#50d6f9]" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
            >
              {regionOptions.map(reg => (
                <option key={reg} value={reg} className="bg-[#092134] text-white">{reg}</option>
              ))}
            </select>
          </div>

          {/* Date Range Dropdown */}
          <div className="flex items-center space-x-2 bg-[#092134] px-3 py-2 rounded-xl border border-[#162c3f]">
            <Calendar className="w-4 h-4 text-[#50d6f9]" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
            >
              <option value="24h" className="bg-[#092134]">Last 24 Hours</option>
              <option value="7d" className="bg-[#092134]">Last 7 Days</option>
              <option value="30d" className="bg-[#092134]">Last 30 Days</option>
              <option value="all" className="bg-[#092134]">All Time</option>
            </select>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 bg-[#0b3954] hover:bg-[#2d9bc9] text-[#50d6f9] hover:text-white px-4 py-2 rounded-xl border border-[#50d6f9]/40 text-xs font-semibold transition-all duration-200 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* High-Level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-1">
          <div className="flex items-center justify-between text-[#9BB7C9]">
            <span className="text-xs font-mono uppercase">Filtered Observations</span>
            <Activity className="w-4 h-4 text-[#50d6f9]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{filteredSpecies.length}</div>
          <div className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Live Telemetry Stream</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-1">
          <div className="flex items-center justify-between text-[#9BB7C9]">
            <span className="text-xs font-mono uppercase">Active Anomalies</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{filteredAnomalies.length}</div>
          <div className="text-[10px] text-red-400 font-mono">
            {filteredAnomalies.length > 0 ? 'Action Required' : 'Nominal Thresholds'}
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-1">
          <div className="flex items-center justify-between text-[#9BB7C9]">
            <span className="text-xs font-mono uppercase">Avg Sea Surface Temp</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">28.9°C</div>
          <div className="text-[10px] text-amber-300 font-mono">+1.2°C anomaly delta</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-1">
          <div className="flex items-center justify-between text-[#9BB7C9]">
            <span className="text-xs font-mono uppercase">Marine Health Index</span>
            <TrendingUp className="w-4 h-4 text-[#78d1ff]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#50d6f9]">78 / 100</div>
          <div className="text-[10px] text-[#78d1ff] font-mono">Moderate Ecological Status</div>
        </div>
      </div>

      {/* Interactive Map View */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold text-[#cfe5ff] font-mono uppercase tracking-wider">
            Interactive Marine Telemetry Map
          </h3>
          <span className="text-xs text-[#9BB7C9]">
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
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-base">Historical Marine Telemetry & Temperature Trends</h3>
            <p className="text-xs text-[#9BB7C9]">Sea Surface Temperature (°C) vs Coral Reef Health Index over time</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[#50d6f9]"></span>
              <span className="text-[#cfe5ff]">Coral Health Index</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[#ffb4ab]"></span>
              <span className="text-[#cfe5ff]">SST (°C)</span>
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
