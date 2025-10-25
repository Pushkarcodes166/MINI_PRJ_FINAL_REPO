import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import scienceCareers from '../data/science_careers.js';
import { Search, ChevronDown, ChevronRight, BookOpen, Users, Heart, Microscope, Calculator, Globe, Briefcase } from 'lucide-react';
// Main headings for clubbing
const mainFields = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Professional engineering across multiple disciplines including Computer Science & IT, Mechanical, Chemical, Civil, General, Electrical, Electronic, Aerospace, Aeronautical, Biomedical.',
    route: '/careers/engineering'
  },
  {
    id: 'biology_health',
    title: 'Biology and Health',
    description: 'Medical, Pharmacy, Nursing, Allied Health, Biotechnology & Life Sciences careers clubbed together for biology and health sciences.',
    route: '/careers/biology-health'
  }
];

// All careers except those clubbed under Engineering
const clubbedIds = [
  'engineering_general',
  'computer_science_it',
  'mechanical_engineering',
  'chemical_engineering',
  'civil_engineering',
  'electrical_electronics',
  'aerospace_engineering',
  'biomedical_engineering',
  'medical_mbbs',
  'pharmacy',
  'nursing_allied',
  'biotechnology'
];
const remainingCareers = scienceCareers.filter(c => !clubbedIds.includes(c.id));


const CareerFieldsPage = () => {
  const [openField, setOpenField] = useState(null);
  const [showPath, setShowPath] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (title) => {
    if (title.toLowerCase().includes('engineering')) return <Calculator className="w-8 h-8 text-purple-400" />;
    if (title.toLowerCase().includes('biology') || title.toLowerCase().includes('health')) return <Heart className="w-8 h-8 text-red-400" />;
    if (title.toLowerCase().includes('science')) return <Microscope className="w-8 h-8 text-green-400" />;
    if (title.toLowerCase().includes('education')) return <BookOpen className="w-8 h-8 text-blue-400" />;
    if (title.toLowerCase().includes('social')) return <Users className="w-8 h-8 text-yellow-400" />;
    if (title.toLowerCase().includes('business') || title.toLowerCase().includes('management')) return <Briefcase className="w-8 h-8 text-orange-400" />;
    return <Globe className="w-8 h-8 text-indigo-400" />;
  };

  const filteredRemainingCareers = remainingCareers.filter(career =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Explore Career Fields - Career Guidance System</title>
      </Helmet>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-16 gradient-text text-center"
          >
            Explore Career Fields
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg bg-white/10 border-purple-500/50 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>

          <div className="space-y-16">
            {/* Featured Career Paths */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">Featured Career Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
                {mainFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect p-10 rounded-3xl card-hover shadow-2xl border border-purple-700/30 w-full flex flex-col min-w-0 hover:shadow-purple-500/20"
                  >
                    <div className="flex items-center mb-6">
                      {getIcon(field.title)}
                      <h3 className="text-2xl md:text-3xl font-bold ml-4 gradient-text">{field.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">{field.description}</p>
                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="default"
                        className="flex-1 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all duration-300 hover:scale-105"
                        onClick={() => window.open(field.route, '_blank')}
                      >
                        Explore Path
                      </Button>
                      <Button
                        variant="outline"
                        className="px-6 py-3 text-lg font-semibold border-purple-500 text-purple-300 hover:bg-purple-500/10 rounded-xl transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Other Career Options */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">Other Career Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
                {filteredRemainingCareers.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-effect p-8 rounded-2xl card-hover shadow-xl border border-purple-700/30 w-full flex flex-col min-w-0 hover:shadow-purple-500/20"
                  >
                    <div className="flex items-center mb-4">
                      {getIcon(field.title)}
                      <Button
                        variant="ghost"
                        className="w-full text-left text-xl md:text-2xl font-bold ml-3 gradient-text p-0 h-auto hover:bg-transparent"
                        onClick={() => setOpenField(openField === field.id ? null : field.id)}
                      >
                        <span className="flex items-center">
                          {field.title}
                          {openField === field.id ? (
                            <ChevronDown className="ml-2 w-5 h-5" />
                          ) : (
                            <ChevronRight className="ml-2 w-5 h-5" />
                          )}
                        </span>
                      </Button>
                    </div>
                    <p className="text-gray-300 mb-4 text-base leading-relaxed flex-1">{field.description}</p>
                    {openField === field.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-4"
                      >
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg"
                            onClick={() => setShowPath(prev => ({ ...prev, [field.id]: !prev[field.id] }))}
                          >
                            {showPath[field.id] ? 'Hide Path' : 'View Roadmap'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-4 py-2 text-sm font-semibold border-purple-500 text-purple-300 hover:bg-purple-500/10 rounded-lg"
                          >
                            Learn More
                          </Button>
                        </div>
                        {showPath[field.id] && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/5 p-4 rounded-lg"
                          >
                            <h4 className="font-semibold mb-3 text-purple-400 text-lg">Pathway Steps:</h4>
                            <ul className="space-y-2">
                              {field.roadmap_steps.split('|').map((step, idx) => (
                                <li key={idx} className="flex items-start text-gray-300 text-sm">
                                  <span className="text-purple-400 mr-2 font-bold">{idx + 1}.</span>
                                  <span>{step.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerFieldsPage;
