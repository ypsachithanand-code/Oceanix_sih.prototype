import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Custom Marker Creator using L.divIcon
const createCustomIcon = (type, category) => {
  let bgColor = "#50d6f9";
  let pulseClass = "";

  if (type === "anomaly") {
    bgColor = "#ffb4ab";
    pulseClass = "animate-ping";
  } else if (category === "Mammal") {
    bgColor = "#78d1ff";
  } else if (category === "Habitat Hazard") {
    bgColor = "#ffb4ab";
  } else if (category === "Reptile") {
    bgColor = "#50d6f9";
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <div class="absolute inset-0 rounded-full ${pulseClass}" style="background-color: ${bgColor}; opacity: 0.4;"></div>
        <div class="w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg" style="background-color: ${bgColor}; shadow: 0 0 10px ${bgColor};">
          <div class="w-2.5 h-2.5 rounded-full bg-[#001526]"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export default function MarineMap({ speciesObs = [], anomalies = [], regions = [], height = "500px" }) {
  // Center near South Asia / Indian Ocean marine zone
  const defaultCenter = [13.5, 82.5];
  const defaultZoom = 5;

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-[#162c3f] shadow-2xl glass-card">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true} 
        style={{ height: height, width: "100%" }}
        className="z-10"
      >
        {/* Dark Matter Bathymetric Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Regional Health Polygon Overlays */}
        {regions.map((reg) => (
          <Polygon
            key={reg.id}
            positions={reg.bounds}
            pathOptions={{
              color: reg.color || "#50d6f9",
              fillColor: reg.color || "#50d6f9",
              fillOpacity: 0.12,
              weight: 1.5,
              dashArray: "4, 4"
            }}
          >
            <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-xs font-mono font-bold text-white">
              <span className="bg-[#001526]/80 px-2.5 py-1 rounded-full border border-[#50d6f9]/30 backdrop-blur-md">
                {reg.name} ({reg.healthScore}/100)
              </span>
            </Tooltip>
          </Polygon>
        ))}

        {/* Species Markers */}
        {speciesObs.map((obs) => (
          <Marker 
            key={obs.id} 
            position={[obs.lat, obs.lng]} 
            icon={createCustomIcon("species", obs.category)}
          >
            <Popup className="marine-popup">
              <div className="p-1 max-w-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#162c3f] pb-1.5">
                  <span className="font-bold text-sm text-white">{obs.species}</span>
                  <span className="text-[10px] font-mono uppercase bg-[#0b3954] text-[#50d6f9] px-2 py-0.5 rounded border border-[#50d6f9]/30">
                    {obs.category}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#D6E7F3]">
                  <div><span className="text-[#9BB7C9]">Depth:</span> {obs.depth}m</div>
                  <div><span className="text-[#9BB7C9]">Temp:</span> {obs.temp}°C</div>
                  <div><span className="text-[#9BB7C9]">Salinity:</span> {obs.salinity} PSU</div>
                  <div><span className="text-[#9BB7C9]">Count:</span> {obs.count}</div>
                </div>

                <p className="text-xs text-[#cfe5ff] italic leading-tight pt-1">
                  "{obs.notes}"
                </p>
                <div className="text-[10px] text-[#9BB7C9] font-mono text-right pt-1 border-t border-[#162c3f]">
                  {obs.timestamp}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Anomaly Pulse Markers */}
        {anomalies.map((anom) => (
          <Marker 
            key={anom.id} 
            position={[anom.lat, anom.lng]} 
            icon={createCustomIcon("anomaly", null)}
          >
            <Popup>
              <div className="p-1 max-w-xs space-y-2">
                <div className="flex items-center justify-between border-b border-red-500/30 pb-1.5">
                  <span className="font-bold text-sm text-red-300 flex items-center space-x-1">
                    <span>⚠️ {anom.title}</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-500/40">
                    {anom.severity}
                  </span>
                </div>
                
                <p className="text-xs text-[#cfe5ff] leading-relaxed">
                  {anom.description}
                </p>

                <div className="p-2 bg-red-950/40 rounded border border-red-500/30 text-xs text-red-200">
                  <strong className="block text-[10px] text-red-400 uppercase font-mono mb-0.5">Action Plan:</strong>
                  {anom.actionRequired}
                </div>
                
                <div className="text-[10px] text-[#9BB7C9] font-mono text-right">
                  {anom.timestamp}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] glass-panel px-3 py-2 rounded-xl text-xs flex items-center space-x-4 border border-[#162c3f]">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-[#50d6f9] border border-white"></span>
          <span className="text-[#D6E7F3]">Species Observation</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ffb4ab] border border-white animate-pulse"></span>
          <span className="text-[#D6E7F3]">Telemetry Anomaly</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-1 bg-[#50d6f9] border-t border-dashed"></span>
          <span className="text-[#D6E7F3]">EEZ Marine Region</span>
        </div>
      </div>
    </div>
  );
}
