import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { careerRoadmaps } from '../data/careerRoadmaps.js';

const biologyHealthCareers = [
  {
    id: 'Medical (MBBS/BDS/AYUSH)',
    title: 'Medical (MBBS/BDS/AYUSH)',
    description: 'Clinical practice and medical research; MBBS leads to physician/medical specialist careers; BDS for dentistry; AYUSH for traditional medicine.',
    icon: '🏥'
  },
  {
    id: 'Pharmacy',
    title: 'Pharmacy',
    description: 'Pharmaceutical sciences: drug development, manufacturing, clinical trials and regulatory affairs.',
    icon: '💊'
  },
  {
    id: 'Nursing & Allied Health Sciences',
    title: 'Nursing & Allied Health Sciences',
    description: 'Clinical support roles: nursing, physiotherapy, occupational therapy, radiography, lab technology.',
    icon: '👩‍⚕️'
  },
  {
    id: 'Biotechnology & Life Sciences',
    title: 'Biotechnology & Life Sciences',
    description: 'Study and application of biological systems for health, agriculture, industry and environment.',
    icon: '🧬'
  }
];

const BiologyHealthPage = () => {
  const navigate = useNavigate();

  const handleExploreRoadmap = (careerId) => {
    navigate(`/roadmap-details/${careerId}`);
  };

  return (
    <>
      <Helmet>
        <title>Biology and Health Careers - Career Guidance System</title>
      </Helmet>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Biology and Health Careers</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover rewarding careers in healthcare, medicine, and life sciences. From clinical practice to research and innovation,
              find your path in the growing field of biology and health.
            </p>
          </motion.div>

          {/* Common Pathway Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-3xl mb-12 border border-purple-700/30"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Common Pathway for Biology & Health Careers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Educational Foundation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Complete 10th Standard
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Choose Science Stream (PCB - Physics, Chemistry, Biology) in 11th and 12th
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Complete 12th Standard with good percentage (minimum 50% in PCB required)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Key Skills Development</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Strong foundation in Biology, Chemistry, and Physics
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Research and analytical thinking
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Communication and interpersonal skills
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Career Specializations Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {biologyHealthCareers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-3xl card-hover shadow-lg border border-purple-700/30"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{career.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 gradient-text">{career.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{career.description}</p>
                </div>
                <Button
                  onClick={() => handleExploreRoadmap(career.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Explore Detailed Roadmap
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Career Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass-effect p-8 rounded-3xl border border-purple-700/30"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Career Insights</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Growth</h3>
                <p className="text-gray-300">Healthcare sector shows 12-18% growth with increasing demand for medical professionals and aging population.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Salary Range</h3>
                <p className="text-gray-300">Entry-level: ₹3-8 LPA | Mid-level: ₹8-20 LPA | Senior: ₹20-60 LPA depending on specialization.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Trends</h3>
                <p className="text-gray-300">Telemedicine, AI in diagnostics, personalized medicine, biotechnology advancements, and preventive healthcare.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BiologyHealthPage;
