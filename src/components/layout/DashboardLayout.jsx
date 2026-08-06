import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import AIChatbotModal from '../common/AIChatbotModal';

export default function DashboardLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard/home', label: 'Research Dashboard', icon: Compass },
    { path: '/dashboard/compare', label: 'Comparative Analysis', icon: GitCompare },
    { path: '/dashboard/projection', label: 'Scenario Projection', icon: TrendingUp },
    { path: '/dashboard/policy', label: 'Policy Dashboard', icon: ShieldCheck },
    { path: '/dashboard/upload', label: 'Data Upload', icon: UploadCloud },
  ];

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen bg-[#001526] text-[#cfe5ff] flex flex-col relative selection:bg-[#50d6f9]/30">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#162c3f] px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden p-2 rounded-lg bg-[#092134] text-[#cfe5ff]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/oceanix-logo.png" 
              alt="Oceanix Logo" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#50d6f9]/30 border border-[#50d6f9]/40 bg-white p-0.5"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center space-x-2">
                <span>OCEANIX</span>
                <span className="text-[10px] font-mono uppercase bg-[#50d6f9]/20 text-[#50d6f9] border border-[#50d6f9]/40 px-2 py-0.5 rounded-full font-semibold">
                  v2.6 Hackathon
                </span>
              </h1>
              <p className="text-xs text-[#9BB7C9] hidden sm:block">Bathymetric Marine Intelligence Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#092134] border border-[#162c3f] px-3 py-1.5 rounded-full text-xs font-mono text-[#D6E7F3]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>INCOIS BUOY TELEMETRY: ACTIVE</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono text-[#9BB7C9]">
            <Clock className="w-3.5 h-3.5 text-[#50d6f9]" />
            <span>{currentTime} IST</span>
          </div>

          {/* Citizen App Quick Link */}
          <NavLink
            to="/community"
            className="flex items-center space-x-1.5 text-xs font-medium bg-[#0b3954] hover:bg-[#2d9bc9] text-white px-3 py-1.5 rounded-full border border-[#50d6f9]/30 transition-all duration-200 shadow-md"
          >
            <Users className="w-3.5 h-3.5 text-[#50d6f9]" />
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
                        ? 'bg-gradient-to-r from-[#0b3954] to-[#162c3f] text-[#50d6f9] border border-[#50d6f9]/30 shadow-lg shadow-[#50d6f9]/10 font-semibold' 
                        : 'text-[#D6E7F3] hover:bg-[#092134] hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#50d6f9]' : 'text-[#9BB7C9]'}`} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Sidebar Foot Card */}
            <div className="p-3 bg-[#051d30]/80 rounded-2xl border border-[#162c3f] text-xs">
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#50d6f9]"></span>
                <span className="font-semibold text-white">Mock Engine</span>
              </div>
              <p className="text-[11px] text-[#9BB7C9] leading-tight">
                Frontend-only mode. All telemetry loaded locally.
              </p>
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
