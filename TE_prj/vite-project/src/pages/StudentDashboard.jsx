import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Brain, Target, BookOpen, TrendingUp, LogOut, User, Award } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [testResults, setTestResults] = useState(null);

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

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, <span className="gradient-text">{user.name}</span>! 👋
            </h1>
            <p className="text-xl text-gray-300">
              Ready to discover your perfect career path?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <User className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Profile</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-gray-400">Email:</span> {user.email}</p>
                <p><span className="text-gray-400">Class:</span> {user.class}</p>
                <p><span className="text-gray-400">Interests:</span> {user.interests}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <Target className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Test Status</h3>
              {testResults ? (
                <div className="space-y-2">
                  <p className="text-green-400 font-semibold">✓ Test Completed</p>
                  <p className="text-gray-300">Score: {testResults.score}/20</p>
                  <Button 
                    onClick={() => navigate('/test-results')}
                    className="mt-4 w-full"
                    variant="outline"
                  >
                    View Results
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-yellow-400 font-semibold">⚠ Test Pending</p>
                  <p className="text-gray-300">Take the aptitude test to get recommendations</p>
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
                  <p className="text-gray-300">Top Career: <span className="text-purple-400 font-semibold">{testResults.topCareer}</span></p>
                  <Button 
                    onClick={() => navigate(`/career-roadmap/${testResults.topCareer}`)}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    View Roadmap
                  </Button>
                </div>
              ) : (
                <p className="text-gray-400">Complete the test to see recommendations</p>
              )}
            </motion.div>
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
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;