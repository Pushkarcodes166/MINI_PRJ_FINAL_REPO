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
import CareerFieldsPage from '@/pages/CareerFieldsPage';
import EngineeringPage from '@/pages/EngineeringPage';
import BiologyHealthPage from '@/pages/BiologyHealthPage';
import JobBoardPage from '@/pages/JobBoardPage';
import ResumeBuilderPage from '@/pages/ResumeBuilderPage';
import OpportunitiesPage from '@/pages/OpportunitiesPage';
import MentorshipPage from '@/pages/MentorshipPage';
import DiscussionForumsPage from '@/pages/DiscussionForumsPage';
import UserContentPage from '@/pages/UserContentPage';

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
          <Route path="/career-fields" element={<CareerFieldsPage />} />
          <Route path="/careers/engineering" element={<EngineeringPage />} />
          <Route path="/careers/biology-health" element={<BiologyHealthPage />} />
          <Route path="/job-board" element={<JobBoardPage />} />
          <Route path="/resume-builder" element={<ResumeBuilderPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/discussion-forums" element={<DiscussionForumsPage />} />
          <Route path="/user-content" element={<UserContentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;