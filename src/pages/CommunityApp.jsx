import React, { useState, useEffect } from 'react';
import { COMMUNITY_MULTILINGUAL_QA } from '../mock/marineData';
import { Mic, MicOff, Volume2, VolumeX, Globe, Waves, ShieldAlert, Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommunityApp() {
  const [lang, setLang] = useState('ta'); // Default Tamil ('ta') or English ('en')
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  const strings = COMMUNITY_MULTILINGUAL_QA[lang] || COMMUNITY_MULTILINGUAL_QA.ta;

  // Initialize SpeechSynthesis and SpeechRecognition
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStartVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(lang === 'ta' 
        ? "உங்கள் உலாவியில் குரல் அங்கீகாரம் கிடைக்கவில்லை. கீழேயுள்ள மாதிரி கேள்விகளைத் தேர்ந்தெடுக்கவும்."
        : "Web Speech API is not supported in this browser. Please select one of the sample questions below."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setSpokenText('');

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      setIsListening(false);
      matchVoiceQuery(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const matchVoiceQuery = (queryText) => {
    const samples = strings.samples;
    // Find closest match or default to first sample answer
    let matched = samples.find(s => queryText.toLowerCase().includes(s.q.toLowerCase())) || samples[0];
    selectQuestion(matched);
  };

  const selectQuestion = (sampleObj) => {
    setActiveAnswer(sampleObj);
    speakAnswer(sampleObj.a);
  };

  const speakAnswer = (textToSpeak) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001526] text-[#cfe5ff] flex justify-center p-0 sm:p-4 selection:bg-[#50d6f9]/30">
      
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-[#001526] border border-[#162c3f] sm:rounded-[36px] shadow-2xl flex flex-col min-h-screen sm:min-h-[820px] overflow-hidden relative">
        
        {/* Top Mobile Bar */}
        <div className="px-5 py-4 bg-[#092134] border-b border-[#162c3f] flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard/home')}
            className="flex items-center space-x-1 text-xs text-[#9BB7C9] hover:text-white font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div className="flex items-center space-x-2">
            <img 
              src="/oceanix-logo.png" 
              alt="Oceanix Logo" 
              className="w-7 h-7 rounded-lg object-cover border border-[#50d6f9]/40 bg-white p-0.5"
            />
            <span className="font-bold text-white text-sm">Oceanix Kural (குரல்)</span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#051d30] p-1 rounded-full border border-[#162c3f]">
            <button
              onClick={() => { setLang('en'); stopSpeech(); }}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-colors ${
                lang === 'en' ? 'bg-[#50d6f9] text-[#001526]' : 'text-[#9BB7C9]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { setLang('ta'); stopSpeech(); }}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-colors ${
                lang === 'ta' ? 'bg-[#50d6f9] text-[#001526]' : 'text-[#9BB7C9]'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-6 text-center space-y-2 bg-gradient-to-b from-[#092134] to-[#001526]">
          <h1 className="text-xl font-bold text-white leading-tight">
            {strings.welcomeTitle}
          </h1>
          <p className="text-xs text-[#9BB7C9]">
            {strings.welcomeSubtitle}
          </p>
        </div>

        {/* Central Voice Button */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          
          <button
            onClick={isListening ? () => setIsListening(false) : handleStartVoice}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-red-500/50 scale-105' 
                : 'bg-gradient-to-tr from-[#50d6f9] to-[#2d9bc9] text-[#001526] hover:scale-105 shadow-[#50d6f9]/30'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-12 h-12 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                  {lang === 'ta' ? 'பேசவும்' : 'Speak'}
                </span>
              </>
            )}
          </button>

          <p className="text-xs font-mono text-center text-[#50d6f9] h-5">
            {isListening ? strings.listeningText : strings.micHint}
          </p>

          {/* Spoken Query Display */}
          {spokenText && (
            <div className="w-full bg-[#092134] p-3 rounded-2xl border border-[#50d6f9]/30 text-center">
              <span className="text-[10px] text-[#9BB7C9] font-mono block">YOUR VOICE INPUT:</span>
              <p className="text-sm font-semibold text-white">"{spokenText}"</p>
            </div>
          )}

          {/* Active Spoken Answer Box */}
          {activeAnswer && (
            <div className="w-full glass-panel p-4 rounded-2xl border border-[#50d6f9]/40 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#162c3f] pb-2">
                <span className="text-xs font-bold text-white flex items-center space-x-1">
                  <span>{activeAnswer.q}</span>
                </span>
                
                {/* Speech Control */}
                {isSpeaking ? (
                  <button onClick={stopSpeech} className="p-1 rounded bg-red-950 text-red-300 text-xs font-mono flex items-center space-x-1">
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Mute</span>
                  </button>
                ) : (
                  <button onClick={() => speakAnswer(activeAnswer.a)} className="p-1 rounded bg-[#0b3954] text-[#50d6f9] text-xs font-mono flex items-center space-x-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                {activeAnswer.a}
              </p>
            </div>
          )}
        </div>

        {/* Sample Predefined Questions List */}
        <div className="p-5 bg-[#092134] border-t border-[#162c3f] space-y-3">
          <span className="text-xs font-mono font-semibold text-[#9BB7C9] uppercase block">
            {strings.sampleQuestionsLabel}
          </span>

          <div className="space-y-2">
            {strings.samples.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => selectQuestion(sample)}
                className="w-full text-left p-3 rounded-xl bg-[#051d30] hover:bg-[#0b3954] border border-[#162c3f] hover:border-[#50d6f9]/40 text-xs text-[#D6E7F3] hover:text-white transition-all duration-200 flex items-center justify-between"
              >
                <span className="line-clamp-1">{sample.q}</span>
                <Navigation className="w-3.5 h-3.5 text-[#50d6f9] shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
