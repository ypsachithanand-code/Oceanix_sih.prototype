import React, { useRef, useState } from 'react';
import { Camera, RotateCcw, Sparkles, ScanLine } from 'lucide-react';

const speciesBank = [
  {
    name: 'Green Sea Turtle',
    family: 'Cheloniidae',
    habitat: 'Coral lagoon',
    highlight: 'Shell pattern indicates a juvenile grazing turtle',
  },
  {
    name: 'Clownfish',
    family: 'Pomacentridae',
    habitat: 'Anemone reef',
    highlight: 'Bright orange body with white bands suggests a reef associate',
  },
  {
    name: 'Manta Ray',
    family: 'Mobulidae',
    habitat: 'Open coastal waters',
    highlight: 'Broad cephalic fins and wing-like motion detected in the frame',
  },
  {
    name: 'Sea Horse',
    family: 'Syngnathidae',
    habitat: 'Seagrass meadow',
    highlight: 'Head and neck posture matches a seagrass-dwelling seahorse',
  },
  {
    name: 'Parrotfish',
    family: 'Scaridae',
    habitat: 'Reef crest',
    highlight: 'Beak-like jaws and coral grazing behavior are visible',
  },
];

const getSpeciesResult = (file) => {
  if (!file) return null;

  const seed = Array.from(`${file.name}${file.size}${file.lastModified}`).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );

  const index = seed % speciesBank.length;
  const match = speciesBank[index];
  const confidence = `${88 + (seed % 8)}%`;

  return {
    ...match,
    confidence,
    fileName: file.name,
    fileSize: `${(file.size / 1024).toFixed(1)} KB`,
  };
};

export default function SpeciesDetectionDemo() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const [detection, setDetection] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setIsProcessing(true);

      window.setTimeout(() => {
        setDetection(getSpeciesResult(file));
        setIsProcessing(false);
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const resetSelection = () => {
    setImagePreview('');
    setDetection(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-3xl space-y-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Species Diversity Camera</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Upload an image to preview a species identification experience for marine biodiversity.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--accent)' }}>
          <Sparkles className="h-3.5 w-3.5" />
          Image Analysis
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--panel-bg)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <Camera className="h-4 w-4 text-[var(--accent)]" />
              <span>Capture or upload a specimen</span>
            </div>
            <button
              onClick={resetSelection}
              className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition"
              style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)', color: 'var(--accent)' }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <label className="mt-4 flex h-56 cursor-pointer items-center justify-center rounded-2xl border border-dashed p-4 text-center transition" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />

            {imagePreview ? (
              <img src={imagePreview} alt="Selected specimen preview" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <div className="space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-strong)] text-[var(--accent)]">
                  <ScanLine className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Tap to choose or capture an image</p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    The UI will simulate a species identification result for the experience.
                  </p>
                </div>
              </div>
            )}
          </label>

          <div className="mt-3 flex items-center justify-between text-[11px]" style={{ color: 'var(--text-secondary)' }}>
            <span>Supports phones and desktops</span>
            <span>Image-based preview</span>
          </div>
        </div>

        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--panel-bg)' }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            <span>Detection preview</span>
          </div>

          {isProcessing ? (
            <div className="mt-4 flex h-44 items-center justify-center rounded-2xl border text-sm" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--panel-bg-strong)', color: 'var(--text-secondary)' }}>
              Analyzing the specimen image...
            </div>
          ) : detection ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-soft)' }}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{detection.name}</p>
                    <p className="text-xs" style={{ color: 'var(--accent-strong)' }}>{detection.family}</p>
                  </div>
                  <div className="rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent)' }}>
                    {detection.confidence}
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                  <p>
                    <span style={{ color: 'var(--text-secondary)' }}>Habitat:</span> {detection.habitat}
                  </p>
                  <p>
                    <span style={{ color: 'var(--text-secondary)' }}>Signal:</span> {detection.highlight}
                  </p>
                  <p>
                    <span style={{ color: 'var(--text-secondary)' }}>Source:</span> {detection.fileName}
                  </p>
                  <p>
                    <span style={{ color: 'var(--text-secondary)' }}>File size:</span> {detection.fileSize}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border p-3 text-xs" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--panel-bg-strong)', color: 'var(--text-secondary)' }}>
                This view is intentionally simulated to showcase the interface and does not run real image recognition.
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--panel-bg-strong)', color: 'var(--text-secondary)' }}>
              The detection box will populate with a plausible marine species match once you add an image.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
