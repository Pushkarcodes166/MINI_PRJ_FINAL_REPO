import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Cpu, Wrench, Beaker as Flask, Building, Zap, Plane, Heart, Code, ChevronRight } from 'lucide-react';
import scienceCareers from '../data/science_careers.js';

const engineeringCareers = scienceCareers.filter(career =>
  career.id.includes('engineering') || career.id === 'computer_science_it' || career.id === 'aerospace_engineering' || career.id === 'biomedical_engineering'
);

const commonRoadmap = [
  "Complete high school with strong foundation in Mathematics, Physics, and Chemistry",
  "Pursue undergraduate degree in Engineering (4 years)",
  "Gain practical experience through internships or projects",
  "Obtain professional certifications if required",
  "Pursue advanced degrees or specializations for career advancement",
  "Build a professional network and continuous learning"
];

const EngineeringPage = () => {
  const navigate = useNavigate();

  const getIcon = (id) => {
    switch (id) {
      case 'computer_science_it': return <Code className="w-12 h-12 text-blue-400" />;
      case 'mechanical_engineering': return <Wrench className="w-12 h-12 text-orange-400" />;
      case 'chemical_engineering': return <Flask className="w-12 h-12 text-green-400" />;
      case 'civil_engineering': return <Building className="w-12 h-12 text-brown-400" />;
      case 'electrical_electronics': return <Zap className="w-12 h-12 text-yellow-400" />;
      case 'aerospace_engineering': return <Plane className="w-12 h-12 text-sky-400" />;
      case 'biomedical_engineering': return <Heart className="w-12 h-12 text-red-400" />;
      default: return <Cpu className="w-12 h-12 text-purple-400" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Engineering Careers - Career Guidance System</title>
        <meta name="description" content="Explore engineering career paths with detailed roadmaps and specializations." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 animate-gradient" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/engineering-hero.jpg')" }} />

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-serif font-extrabold mb-6 gradient-text">
              Engineering Careers
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Discover the diverse world of engineering with comprehensive roadmaps, specializations, and pathways to success.
            </p>
          </motion.div>

          {/* Common Engineering Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect p-8 rounded-3xl mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text text-center">Common Engineering Pathway</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commonRoadmap.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 bg-gradient-to-br from-white/5 to-white/3 rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-lg text-gray-300">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Engineering Specializations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Engineering Specializations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {engineeringCareers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-effect p-8 rounded-3xl card-hover shadow-xl border border-purple-700/30 cursor-pointer group relative overflow-hidden"
                  onClick={() => navigate(`/roadmap-details?career=${encodeURIComponent(career.title)}`, { state: { career: career.title } })}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {getIcon(career.id)}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">{career.title}</h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">{career.description}</p>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl group-hover:shadow-lg transition-all duration-300 relative z-10"
                    >
                      Explore Detailed Roadmap
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass-effect p-12 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4 gradient-text">Ready to Start Your Engineering Journey?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Take our career aptitude test to get personalized recommendations and discover which engineering path suits you best.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xl px-12 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/career-test')}
              >
                Take Career Test
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EngineeringPage;
