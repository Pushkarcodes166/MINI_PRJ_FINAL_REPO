import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Trophy, TrendingUp, ArrowRight, Home } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TestResults = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    const testResults = JSON.parse(localStorage.getItem(`testResults_${currentUser.id}`) || 'null');
    if (!testResults) {
      navigate('/student-dashboard');
      return;
    }
    setResults(testResults);
  }, [navigate]);

  if (!user || !results) return null;

  const chartData = Object.entries(results.detailedScores).map(([career, score]) => ({
    career: career.split(' ')[0],
    score: score
  }));

  return (
    <>
      <Helmet>
        <title>Test Results - Career Guidance System</title>
        <meta name="description" content="View your career aptitude test results and personalized recommendations." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">Test Results</span>
              </div>
              <Button variant="ghost" onClick={() => navigate('/student-dashboard')}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Congratulations, <span className="gradient-text">{user.name}</span>! 🎉
            </h1>
            <p className="text-xl text-gray-300">
              You've completed the career aptitude test. Here are your personalized results!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-2">
                {results.score}/{results.totalQuestions}
              </div>
              <p className="text-gray-300">Questions Answered</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {results.recommendations.length}
              </div>
              <p className="text-gray-300">Career Matches</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <div className="text-4xl font-bold text-pink-400 mb-2">
                {Math.round((results.recommendations[0].score / results.totalQuestions) * 100)}%
              </div>
              <p className="text-gray-300">Top Match Score</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Your Top Career Recommendations</h2>
            <div className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    index === 0
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-400'
                      : 'glass-effect'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'
                      }`}>
                        <span className="text-xl font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{rec.career}</h3>
                        <p className="text-gray-400">Match Score: {rec.score}/{results.totalQuestions}</p>
                      </div>
                    </div>
                    {index === 0 && (
                      <Button
                        onClick={() => navigate(`/career-roadmap/${rec.career}`)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        View Roadmap
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        index === 0
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'bg-gray-500'
                      }`}
                      style={{ width: `${(rec.score / results.totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Detailed Analysis</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="career" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate(`/career-roadmap/${results.topCareer}`)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12"
            >
              Explore Your Career Roadmap
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TestResults;