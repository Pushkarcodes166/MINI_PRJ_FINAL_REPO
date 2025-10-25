import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { jobs } from '@/data/jobs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, MapPin, DollarSign, Calendar, ArrowLeft } from 'lucide-react';

const JobBoardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const careerFilter = queryParams.get('career');

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(careerFilter || '');

  useEffect(() => {
    let filtered = jobs;

    if (selectedCareer) {
      filtered = filtered.filter(job => job.careerField === selectedCareer);
    }

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCareer]);

  const careerFields = [...new Set(jobs.map(job => job.careerField))];

  return (
    <>
      <Helmet>
        <title>Job Board - Career Guidance System</title>
        <meta name="description" content="Explore job opportunities tailored to your career interests." />
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
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold gradient-text">Job Board</span>
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
              Discover Your Next Opportunity
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Find jobs that match your skills and career aspirations. Filter by field and search for the perfect fit.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="search" className="text-white text-lg font-semibold mb-2 block">Search Jobs</Label>
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
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                >
                  <option value="" className="bg-gray-800">All Career Fields</option>
                  {careerFields.map(field => (
                    <option key={field} value={field} className="bg-gray-800">{field}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-effect rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                style={{ transformStyle: 'preserve-3d', perspective: 900 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{job.title}</h3>
                    <p className="text-gray-300 mb-2">{job.company}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {job.company.charAt(0)}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-sm font-medium text-green-300">{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="bg-blue-600/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="bg-gray-600/20 text-gray-400 text-xs px-3 py-1 rounded-full">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:scale-105">
                  Apply Now
                </Button>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <TrendingUp className="w-20 h-20 text-gray-500 mx-auto mb-6" />
              <p className="text-gray-400 text-xl">No jobs found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobBoardPage;
