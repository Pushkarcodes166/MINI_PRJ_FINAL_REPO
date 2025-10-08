import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Brain, Target, BookOpen, TrendingUp, LogOut, User, Award } from 'lucide-react';
import scienceCareers from '../data/science_careers.js';
import ProfileEditModal from '@/components/ProfileEditModal';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    const results = JSON.parse(localStorage.getItem(`testResults_${currentUser.id}`) || 'null');
    setTestResults(results);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out Successfully",
      description: "See you soon!",
    });
    navigate('/');
  };

  const handleStartTest = () => {
    navigate('/career-test');
  };

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Student Dashboard - Career Guidance System</title>
        <meta name="description" content="Access your personalized career guidance dashboard and take aptitude tests." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">CareerGuide AI</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 glass-effect rounded-full">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">{user.name}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-12 text-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold mb-4">
              Hello, <span className="gradient-text">{user.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Personalized guidance, curated roadmaps and tailored next steps for your goals.
            </p>
          </motion.div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-white/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {user.name ? user.name.split(' ').map(n => n[0]).slice(0,2).join('') : 'U'}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{user.email}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-700/10 text-sm">Class: {user.class || 'N/A'}</span>
                    <span className="px-3 py-1 rounded-full bg-pink-700/10 text-sm">Interests: {user.interests || '—'}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-300">Complete your profile to get personalized roadmap suggestions and notifications about relevant courses.</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6"
            >
              {testResults ? (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-600 to-teal-500 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm uppercase opacity-90">Test Status</div>
                      <div className="text-2xl md:text-3xl font-serif font-bold">Completed ✓</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Score</div>
                      <div className="text-3xl font-bold">{testResults.score}/{testResults.totalQuestions}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm opacity-90">Great job! Your personalized recommendations are ready. Explore roadmaps for each match to plan next steps.</div>
                  <div className="mt-6">
                    <Button
                      onClick={() => navigate('/test-results')}
                      className="w-full bg-white text-green-700 font-serif font-bold px-6 py-3 rounded-full shadow-lg hover:scale-[1.01]"
                    >
                      View Results
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-yellow-600/10 border border-yellow-400/10">
                  <div className="text-sm uppercase text-yellow-400">Test Status</div>
                  <div className="text-2xl md:text-3xl font-serif font-bold text-yellow-300">Pending</div>
                  <p className="mt-2 text-gray-300">Take the aptitude test to receive tailored career recommendations and roadmaps.</p>
                  <div className="mt-4">
                    <Button size="lg" onClick={handleStartTest} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-6 py-2 rounded-full">
                      Start Test Now
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <Award className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Recommendations</h3>
              {testResults ? (
                <div className="space-y-2">
                  <motion.div className="p-4 rounded-lg bg-gradient-to-br from-purple-700 to-pink-600 text-white cursor-pointer hover:scale-102 transform transition"
                    onClick={() => navigate(`/roadmap-details?career=${encodeURIComponent(testResults.topCareer)}`, { state: { career: testResults.topCareer } })}
                    whileHover={{ scale: 1.03, rotateX: 3 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 900 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white/90">Top Career</div>
                        <div className="text-2xl font-serif font-bold">{testResults.topCareer}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Score</div>
                        <div className="text-xl font-bold">{testResults.score}/{testResults.totalQuestions}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-white/80">Click card to open full roadmap and recommended courses.</div>
                  </motion.div>
                </div>
              ) : (
                <p className="text-gray-400">Complete the test to see recommendations</p>
              )}
              <div className="mt-4">
                <Button variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
              </div>
            </motion.div>
          </div>

          {/* Explore Career Paths Button */}
          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12"
              onClick={() => navigate('/career-fields')}
            >
              Explore Career Paths
            </Button>
          </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-3xl p-12 text-center"
      >
        <Brain className="w-20 h-20 text-purple-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          {testResults ? 'Retake Career Aptitude Test' : 'Take Career Aptitude Test'}
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Our AI-powered 20-question aptitude test analyzes your interests, skills, and personality to recommend the perfect career path for you.
        </p>
        <Button 
          size="lg"
          onClick={handleStartTest}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12"
        >
          {testResults ? 'Retake Test' : 'Start Test Now'}
        </Button>
      </motion.div>
        <ProfileEditModal open={editing} onClose={() => setEditing(false)} user={user} onSave={(u) => setUser(u)} />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;