import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle2, Loader2, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DataUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logStep, setLogStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startUploadSimulation(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      startUploadSimulation(e.target.files[0]);
    }
  };

  const startUploadSimulation = (selectedFile) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);
    setIsSuccess(false);

    // Step 1
    setLogStep('Parsing CSV header schemas & UTF-8 character encoding...');
    setTimeout(() => {
      setProgress(25);
      setLogStep('Validating latitude [-90, 90] & longitude [-180, 180] bathymetric coordinates...');
    }, 800);

    // Step 2
    setTimeout(() => {
      setProgress(60);
      setLogStep('Verifying species taxonomy against WoRMS (World Register of Marine Species)...');
    }, 1600);

    // Step 3
    setTimeout(() => {
      setProgress(90);
      setLogStep('Calculating thermal anomaly indices and injecting observations into map cache...');
    }, 2400);

    // Done
    setTimeout(() => {
      setProgress(100);
      setUploading(false);
      setIsSuccess(true);
      setLogStep('Validation completed successfully! 4 new observations merged.');
    }, 3200);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border border-[#162c3f]">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
          <UploadCloud className="w-6 h-6 text-[#50d6f9]" />
          <span>Telemetry & Field Observation CSV Upload</span>
        </h2>
        <p className="text-xs text-[#9BB7C9] mt-1">
          Ingest autonomous hydrophone audio, buoy telemetry, or diver observation datasets
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`glass-panel p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 text-center flex flex-col items-center justify-center space-y-4 ${
          dragActive 
            ? 'border-[#50d6f9] bg-[#0b3954]/50 scale-[1.01]' 
            : 'border-[#162c3f] hover:border-[#50d6f9]/50'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-[#0b3954] border border-[#50d6f9]/40 flex items-center justify-center text-[#50d6f9] shadow-lg shadow-[#50d6f9]/10">
          <FileSpreadsheet className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            Drag & drop your marine observation CSV here
          </h3>
          <p className="text-xs text-[#9BB7C9]">
            Supports standard CSV, TSV, or Oceanix Hydro-JSON formatted files (Max 50MB)
          </p>
        </div>

        <label className="cursor-pointer bg-[#0b3954] hover:bg-[#2d9bc9] text-[#50d6f9] hover:text-white px-5 py-2.5 rounded-xl border border-[#50d6f9]/40 text-xs font-semibold transition-all duration-200 shadow-md inline-flex items-center space-x-2">
          <UploadCloud className="w-4 h-4" />
          <span>Browse Files</span>
          <input 
            type="file" 
            accept=".csv,.txt,.json" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </label>
      </div>

      {/* Uploading Progress & Validation Animation */}
      {uploading && (
        <div className="glass-panel p-6 rounded-3xl border border-[#50d6f9]/30 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <Loader2 className="w-4 h-4 text-[#50d6f9] animate-spin" />
              <span>Processing File: {file?.name || 'marine_data.csv'}</span>
            </div>
            <span className="text-xs font-mono text-[#50d6f9] font-bold">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#051d30] h-3 rounded-full overflow-hidden border border-[#162c3f]">
            <div 
              className="bg-gradient-to-r from-[#50d6f9] via-[#78d1ff] to-[#a4cbec] h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="p-3 bg-[#051d30] rounded-xl border border-[#162c3f] font-mono text-xs text-[#50d6f9]">
            <span className="text-[#9BB7C9]">$ pipeline_log:</span> {logStep}
          </div>
        </div>
      )}

      {/* Success State Notification */}
      {isSuccess && (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-emerald-950/20 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center space-x-3 text-emerald-400">
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-base">Dataset Validation & Ingestion Successful!</h3>
              <p className="text-xs text-emerald-200">
                Processed file: <strong>{file?.name || 'observation_sample.csv'}</strong>. 4 new observation records were successfully validated and merged into the active map dataset.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => navigate('/dashboard/home')}
              className="bg-[#50d6f9] text-[#001526] font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#78d1ff] transition-colors"
            >
              View on Map Dashboard
            </button>
            <button
              onClick={() => { setIsSuccess(false); setFile(null); }}
              className="text-xs text-[#9BB7C9] hover:text-white underline font-mono"
            >
              Upload Another File
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
