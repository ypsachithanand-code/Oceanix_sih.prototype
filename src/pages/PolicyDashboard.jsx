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
      <div className="glass-panel p-5 rounded-3xl border" style={{ borderColor: 'var(--panel-border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
              <ShieldCheck className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              <span>Policymaker & Ecosystem Protection Dashboard</span>
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Marine Conservation Policy Directives, Risk Assessment & Executive Reporting
            </p>
          </div>

        {/* Generate Report Button */}
        <button
          onClick={handlePrintReport}
          className="flex items-center space-x-2 font-bold text-xs md:text-sm px-5 py-2.5 rounded-2xl transition-all duration-200"
          style={{ background: 'linear-gradient(90deg, var(--accent), #2d9bc9)', color: '#001526', boxShadow: '0 20px 40px rgba(80, 214, 249, 0.15)' }}
        >
          <Printer className="w-4 h-4" />
          <span>Generate Executive Report</span>
        </button>
        </div>
      </div>

      {/* Regional Marine Health Index Cards */}
      <div className="space-y-3">
<h3 className="text-sm font-semibold font-mono uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
          Regional EEZ Marine Health Index Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_REGIONS.map((reg) => {
            let statusColor = "text-emerald-700 bg-emerald-100 border-emerald-300";
            if (reg.status === "Critical") statusColor = "text-red-700 bg-red-100 border-red-300";
            if (reg.status === "Stable") statusColor = "text-[#0b6ea8] bg-[#dbeafe] border-[#7dd3fc]";

            return (
              <div key={reg.id} className="glass-panel p-4 rounded-2xl space-y-3 transition-all duration-200" style={{ borderColor: 'var(--panel-border)' }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{reg.name}</h4>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {reg.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                    <span>Health Index:</span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{reg.healthScore}/100</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-soft)', border: '1px solid var(--panel-border)' }}>
                    <div 
                      className="h-full rounded-full"
                      style={{ width: `${reg.healthScore}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-strong))' }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1" style={{ color: 'var(--text-secondary)', borderTop: '1px solid var(--panel-border)' }}>
                  <div><span style={{ color: 'var(--text-secondary)' }}>Species:</span> {reg.speciesCount}</div>
                  <div><span style={{ color: 'var(--text-secondary)' }}>Anomalies:</span> {reg.anomalyCount}</div>
                  <div><span style={{ color: 'var(--text-secondary)' }}>Coral:</span> {reg.coralHealth}%</div>
                  <div><span style={{ color: 'var(--text-secondary)' }}>pH:</span> {reg.phLevel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Predefined Ecological Anomaly Alerts Feed */}
      <div className="glass-panel p-5 rounded-3xl space-y-4" style={{ borderColor: 'var(--panel-border)' }}>
        <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--panel-border)' }}>
          <div className="flex items-center space-x-2" style={{ color: 'var(--accent)' }}>
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Active Ecological Anomaly & Action Directives</h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full border" style={{ color: '#9b2c2c', backgroundColor: 'rgba(254, 226, 226, 0.5)', borderColor: 'rgba(248, 113, 113, 0.35)' }}>
            {MOCK_ANOMALIES.length} Urgent Feed Alerts
          </span>
        </div>

        <div className="space-y-3">
          {MOCK_ANOMALIES.map((anom) => (
            <div key={anom.id} className="p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200" style={{ backgroundColor: 'var(--surface-strong)', border: '1px solid var(--panel-border)' }}>
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded border font-bold" style={{ color: '#9b2c2c', backgroundColor: 'rgba(254, 226, 226, 0.5)', borderColor: 'rgba(248, 113, 113, 0.35)' }}>
                    {anom.severity}
                  </span>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{anom.title}</h4>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>• {anom.region}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {anom.description}
                </p>
                <div className="text-xs font-mono pt-1" style={{ color: 'var(--accent)' }}>
                  <strong>Policy Recommendation:</strong> {anom.actionRequired}
                </div>
              </div>

              <button className="self-start md:self-center text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap flex items-center space-x-1" style={{ backgroundColor: 'var(--surface-soft)', color: 'var(--accent)', borderColor: 'var(--panel-border)' }}>
                <span>Issue Directive</span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] rounded-3xl p-6 overflow-y-auto space-y-6 shadow-2xl" style={{ backgroundColor: 'var(--surface-strong)', color: 'var(--text-primary)', border: '1px solid var(--panel-border)' }}>
            <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '1rem' }}>
              <div>
                <h3 className="text-xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>OCEANIX EXECUTIVE POLICY REPORT</h3>
                <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Generated on {new Date().toLocaleDateString()} | INCOIS Marine Intelligence Platform</p>
              </div>
              <button 
                onClick={() => setShowReportModal(false)}
                className="p-2 rounded-full"
                style={{ color: 'var(--text-primary)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-strong)', border: '1px solid var(--panel-border)' }}>
                <h4 className="font-bold mb-1 font-mono" style={{ color: 'var(--accent)' }}>1. EXECUTIVE SUMMARY</h4>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Overall Indian Ocean & Bay of Bengal marine health stands at 78/100. Thermal stress anomalies in Andaman Sea require immediate intervention level 2. Coral bleaching mitigation is recommended.
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-strong)', border: '1px solid var(--panel-border)' }}>
                <h4 className="font-bold mb-2 font-mono" style={{ color: 'var(--accent)' }}>2. REGIONAL HEALTH SCORE MATRIX</h4>
                <div className="space-y-1.5 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {MOCK_REGIONS.map(r => (
                    <div key={r.id} className="flex justify-between" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-primary)' }}>{r.name}</span>
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{r.healthScore} / 100 ({r.status})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-strong)', border: '1px solid var(--panel-border)' }}>
                <h4 className="font-bold mb-1 font-mono" style={{ color: '#9b2c2c' }}>3. URGENT ANOMALY DIRECTIVES</h4>
                <ul className="list-disc list-inside text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
                  {MOCK_ANOMALIES.map(a => (
                    <li key={a.id}><strong>{a.region}:</strong> {a.actionRequired}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-3" style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1rem' }}>
              <button
                onClick={() => window.print()}
                className="font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5"
                style={{ backgroundColor: 'var(--accent)', color: '#001526' }}
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
