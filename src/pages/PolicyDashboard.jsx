import React, { useState } from 'react';
import { MOCK_REGIONS, MOCK_ANOMALIES } from '../mock/marineData';
import { ShieldCheck, FileText, Printer, AlertTriangle, CheckCircle2, ChevronRight, X, ExternalLink } from 'lucide-react';

export default function PolicyDashboard() {
  const [showReportModal, setShowReportModal] = useState(false);

  const handlePrintReport = () => {
    setShowReportModal(true);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-[#50d6f9]" />
            <span>Policymaker & Ecosystem Protection Dashboard</span>
          </h2>
          <p className="text-xs text-[#9BB7C9] mt-1">
            Marine Conservation Policy Directives, Risk Assessment & Executive Reporting
          </p>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handlePrintReport}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#50d6f9] to-[#2d9bc9] hover:from-[#78d1ff] hover:to-[#50d6f9] text-[#001526] font-bold text-xs md:text-sm px-5 py-2.5 rounded-2xl shadow-lg shadow-[#50d6f9]/20 transition-all duration-200"
        >
          <Printer className="w-4 h-4" />
          <span>Generate Executive Report</span>
        </button>
      </div>

      {/* Regional Marine Health Index Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#cfe5ff] font-mono uppercase tracking-wider">
          Regional EEZ Marine Health Index Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_REGIONS.map((reg) => {
            let statusColor = "text-emerald-400 bg-emerald-950/60 border-emerald-500/40";
            if (reg.status === "Critical") statusColor = "text-red-300 bg-red-950/60 border-red-500/40";
            if (reg.status === "Stable") statusColor = "text-[#50d6f9] bg-[#0b3954]/60 border-[#50d6f9]/40";

            return (
              <div key={reg.id} className="glass-panel p-4 rounded-2xl border border-[#162c3f] space-y-3 hover:border-[#50d6f9]/40 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base">{reg.name}</h4>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {reg.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#9BB7C9]">Health Index:</span>
                    <span className="font-bold text-white">{reg.healthScore}/100</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-[#051d30] h-2 rounded-full overflow-hidden border border-[#162c3f]">
                    <div 
                      className="bg-gradient-to-r from-[#50d6f9] to-[#78d1ff] h-full rounded-full"
                      style={{ width: `${reg.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#D6E7F3] pt-1 border-t border-[#162c3f]">
                  <div><span className="text-[#9BB7C9]">Species:</span> {reg.speciesCount}</div>
                  <div><span className="text-[#9BB7C9]">Anomalies:</span> {reg.anomalyCount}</div>
                  <div><span className="text-[#9BB7C9]">Coral:</span> {reg.coralHealth}%</div>
                  <div><span className="text-[#9BB7C9]">pH:</span> {reg.phLevel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Predefined Ecological Anomaly Alerts Feed */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f] space-y-4">
        <div className="flex items-center justify-between border-b border-[#162c3f] pb-3">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-white text-base">Active Ecological Anomaly & Action Directives</h3>
          </div>
          <span className="text-xs font-mono text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/40">
            {MOCK_ANOMALIES.length} Urgent Feed Alerts
          </span>
        </div>

        <div className="space-y-3">
          {MOCK_ANOMALIES.map((anom) => (
            <div key={anom.id} className="p-4 bg-[#092134] rounded-2xl border border-[#162c3f] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-red-500/30 transition-all duration-200">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono uppercase bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-500/40 font-bold">
                    {anom.severity}
                  </span>
                  <h4 className="font-semibold text-white text-sm">{anom.title}</h4>
                  <span className="text-xs text-[#9BB7C9] font-mono">• {anom.region}</span>
                </div>
                <p className="text-xs text-[#cfe5ff] leading-relaxed">
                  {anom.description}
                </p>
                <div className="text-xs text-[#50d6f9] font-mono pt-1">
                  <strong>Policy Recommendation:</strong> {anom.actionRequired}
                </div>
              </div>

              <button className="self-start md:self-center text-xs font-semibold bg-[#0b3954] hover:bg-[#2d9bc9] text-[#50d6f9] hover:text-white px-3.5 py-2 rounded-xl border border-[#50d6f9]/30 transition-all duration-200 whitespace-nowrap flex items-center space-x-1">
                <span>Issue Directive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001526] text-[#cfe5ff] border border-[#50d6f9]/40 w-full max-w-3xl max-h-[90vh] rounded-3xl p-6 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#162c3f] pb-4">
              <div>
                <h3 className="text-xl font-bold text-white font-mono">OCEANIX EXECUTIVE POLICY REPORT</h3>
                <p className="text-xs text-[#9BB7C9] font-mono">Generated on {new Date().toLocaleDateString()} | INCOIS Marine Intelligence Platform</p>
              </div>
              <button 
                onClick={() => setShowReportModal(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div className="bg-[#092134] p-4 rounded-xl border border-[#162c3f]">
                <h4 className="font-bold text-[#50d6f9] mb-1 font-mono">1. EXECUTIVE SUMMARY</h4>
                <p className="text-xs text-[#cfe5ff]">
                  Overall Indian Ocean & Bay of Bengal marine health stands at 78/100. Thermal stress anomalies in Andaman Sea require immediate intervention level 2. Coral bleaching mitigation is recommended.
                </p>
              </div>

              <div className="bg-[#092134] p-4 rounded-xl border border-[#162c3f]">
                <h4 className="font-bold text-[#50d6f9] mb-2 font-mono">2. REGIONAL HEALTH SCORE MATRIX</h4>
                <div className="space-y-1.5 text-xs font-mono">
                  {MOCK_REGIONS.map(r => (
                    <div key={r.id} className="flex justify-between border-b border-[#162c3f] pb-1">
                      <span>{r.name}</span>
                      <span className="font-bold text-white">{r.healthScore} / 100 ({r.status})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#092134] p-4 rounded-xl border border-[#162c3f]">
                <h4 className="font-bold text-red-400 mb-1 font-mono">3. URGENT ANOMALY DIRECTIVES</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-[#cfe5ff]">
                  {MOCK_ANOMALIES.map(a => (
                    <li key={a.id}><strong>{a.region}:</strong> {a.actionRequired}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-[#162c3f] pt-4">
              <button
                onClick={() => window.print()}
                className="bg-[#50d6f9] text-[#001526] font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
