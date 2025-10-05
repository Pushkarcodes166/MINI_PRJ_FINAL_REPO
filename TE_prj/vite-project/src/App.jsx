import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import StudentDashboard from '@/pages/StudentDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import CareerTest from '@/pages/CareerTest';
import TestResults from '@/pages/TestResults';
import CareerRoadmap from '@/pages/CareerRoadmap';
import RoadmapDetails from '@/pages/RoadmapDetails';
import ProjectDocumentation from '@/pages/ProjectDocumentation';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/career-test" element={<CareerTest />} />
          <Route path="/test-results" element={<TestResults />} />
          <Route path="/career-roadmap/:career" element={<CareerRoadmap />} />
          <Route path="/roadmap-details" element={<RoadmapDetails />} />
          <Route path="/documentation" element={<ProjectDocumentation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;