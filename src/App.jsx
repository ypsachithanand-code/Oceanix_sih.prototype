import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import ResearchDashboard from './pages/ResearchDashboard';
import ComparativeAnalysis from './pages/ComparativeAnalysis';
import ScenarioProjection from './pages/ScenarioProjection';
import PolicyDashboard from './pages/PolicyDashboard';
import DataUpload from './pages/DataUpload';
import CommunityApp from './pages/CommunityApp';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect Root & /dashboard to /dashboard/home */}
        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />

        {/* Dashboard Routes wrapped in DashboardLayout */}
        <Route path="/dashboard/home" element={<DashboardLayout><ResearchDashboard /></DashboardLayout>} />
        <Route path="/dashboard/compare" element={<DashboardLayout><ComparativeAnalysis /></DashboardLayout>} />
        <Route path="/dashboard/projection" element={<DashboardLayout><ScenarioProjection /></DashboardLayout>} />
        <Route path="/dashboard/policy" element={<DashboardLayout><PolicyDashboard /></DashboardLayout>} />
        <Route path="/dashboard/upload" element={<DashboardLayout><DataUpload /></DashboardLayout>} />

        {/* Standalone Mobile-First Community Portal */}
        <Route path="/community" element={<CommunityApp />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </Router>
  );
}
