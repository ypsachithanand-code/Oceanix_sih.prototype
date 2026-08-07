import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Compass, 
  GitCompare, 
  TrendingUp, 
  ShieldCheck, 
  UploadCloud, 
  Users, 
  Bot, 
  Waves, 
  Clock, 
  Menu, 
  X,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import AIChatbotModal from '../common/AIChatbotModal';

export default function DashboardLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oceanix-theme') || 'dark';
    }
    return 'dark';
  });
  const location = useLocation();

  const navItems = [
    { path: '/dashboard/home', label: 'Research Dashboard', icon: Compass },
    { path: '/dashboard/compare', label: 'Comparative Analysis', icon: GitCompare },
    { path: '/dashboard/projection', label: 'Scenario Projection', icon: TrendingUp },
    { path: '/dashboard/policy', label: 'Policy Dashboard', icon: ShieldCheck },
    { path: '/dashboard/upload', label: 'Data Upload', icon: UploadCloud },
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('oceanix-theme', theme);
  }, [theme]);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#50d6f9]/30" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-[var(--panel-border)] px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden p-2 rounded-lg bg-[var(--surface-strong)] text-[var(--text-primary)] border border-[var(--panel-border)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/oceanix-logo.png" 
              alt="Oceanix Logo" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[var(--accent)]/30 border border-[var(--accent)]/40 bg-[var(--surface-strong)] p-0.5"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] flex items-center space-x-2">
                <span>OCEANIX</span>
                <span className="text-[10px] font-mono uppercase bg-[var(--surface-soft)] text-[var(--accent)] border border-[var(--accent)]/40 px-2 py-0.5 rounded-full font-semibold">
                  v2.6 Hackathon
                </span>
              </h1>
              <p className="text-xs hidden sm:block" style={{ color: 'var(--text-secondary)' }}>Bathymetric Marine Intelligence Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center space-x-2 rounded-full px-3 py-1.5 text-xs font-mono" style={{ backgroundColor: 'var(--surface-strong)', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>INCOIS BUOY TELEMETRY: ACTIVE</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{currentTime} IST</span>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center rounded-full border bg-transparent p-2 text-[var(--text-primary)] shadow-sm transition hover:scale-105"
            style={{ borderColor: 'var(--panel-border)', backgroundColor: 'var(--surface-strong)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Citizen App Quick Link */}
          <NavLink
            to="/community"
            className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 shadow-md"
            style={{ backgroundColor: 'var(--surface-soft)', border: '1px solid var(--panel-border)', color: 'var(--text-primary)' }}
          >
            <Users className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Community Portal</span>
          </NavLink>

          {/* AI Trigger Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#50d6f9] to-[#78d1ff] hover:from-[#78d1ff] hover:to-[#a4cbec] text-[#001526] font-semibold text-xs md:text-sm px-4 py-2 rounded-full shadow-lg shadow-[#50d6f9]/20 transition-all duration-200 transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#001526]" />
            <span className="hidden sm:inline">Ask Oceanix AI</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        
        {/* Floating Desktop Navigation Sidebar */}
        <aside className="hidden md:flex flex-col w-64 p-4 sticky top-[65px] h-[calc(100vh-65px)] z-30">
          <div className="glass-panel rounded-3xl p-3 flex-1 flex flex-col justify-between border border-[#162c3f] shadow-2xl">
            <div className="space-y-1.5">
              <div className="px-3 py-2 text-[10px] font-mono text-[#9BB7C9] uppercase tracking-wider font-semibold">
                Modules Navigation
              </div>
              
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path === '/dashboard/home' && location.pathname === '/dashboard');
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-[var(--surface-strong)] text-[var(--text-primary)] border border-[var(--accent)] shadow-sm shadow-[var(--accent)]/10 font-semibold' 
                        : 'text-[var(--text-primary)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]'
                    }`}
                    style={{ borderColor: isActive ? 'var(--accent)' : 'transparent' }}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#162c3f] pb-4">
              <h2 className="text-lg font-bold text-white">Oceanix Navigation</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-[#092134] text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-base font-medium bg-[#092134] border border-[#162c3f] text-white"
                  >
                    <Icon className="w-5 h-5 text-[#50d6f9]" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
              <NavLink
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-base font-semibold bg-[#0b3954] border border-[#50d6f9]/40 text-[#50d6f9]"
              >
                <Users className="w-5 h-5 text-[#50d6f9]" />
                <span>Community Mobile Portal</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* AI Chatbot Floating Modal */}
      <AIChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
}
