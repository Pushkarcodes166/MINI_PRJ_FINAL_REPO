import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { opportunities } from '@/data/opportunities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, MapPin, DollarSign, Clock, ArrowLeft } from 'lucide-react';

const OpportunitiesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const careerFilter = queryParams.get('career');

  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(careerFilter || '');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    let filtered = opportunities;

    if (selectedCareer) {
      filtered = filtered.filter(opp => opp.careerField === selectedCareer);
    }

    if (selectedType) {
      filtered = filtered.filter(opp => opp.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(opp =>
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedCareer, selectedType]);

  const careerFields = [...new Set(opportunities.map(opp => opp.careerField))];
  const types = [...new Set(opportunities.map(opp => opp.type))];

  return (
    <>
      <Helmet>
        <title>Opportunities - Career Guidance System</title>
        <meta name="description" content="Explore internships and training opportunities to kickstart your career." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />

        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/student-dashboard')} className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Target className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">Opportunities</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold mb-4 gradient-text">
              Launch Your Career Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Discover internships, training programs, and workshops that align with your career goals and help you gain valuable experience.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="search" className="text-white text-lg font-semibold mb-2 block">Search Opportunities</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title, company, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                />
              </div>
              <div>
                <Label htmlFor="career" className="text-white text-lg font-semibold mb-2 block">Filter by Career Field</Label>
                <select
                  id="career"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                >
                  <option value="" className="bg-gray-800">All Career Fields</option>
                  {careerFields.map(field => (
                    <option key={field} value={field} className="bg-gray-800">{field}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="type" className="text-white text-lg font-semibold mb-2 block">Filter by Type</Label>
                <select
                  id="type"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="" className="bg-gray-800">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type} className="bg-gray-800">{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Opportunities Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-effect rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                style={{ transformStyle: 'preserve-3d', perspective: 900 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{opp.title}</h3>
                    <p className="text-gray-300 mb-2">{opp.company}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    {opp.company.charAt(0)}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm">{opp.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-sm font-medium text-green-300">{opp.stipend}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-sm">{opp.duration}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{opp.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {opp.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="bg-purple-600/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                      {req}
                    </span>
                  ))}
                  {opp.requirements.length > 3 && (
                    <span className="bg-gray-600/20 text-gray-400 text-xs px-3 py-1 rounded-full">
                      +{opp.requirements.length - 3} more
                    </span>
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:scale-105">
                  Apply Now
                </Button>
              </motion.div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Target className="w-20 h-20 text-gray-500 mx-auto mb-6" />
              <p className="text-gray-400 text-xl">No opportunities found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default OpportunitiesPage;
