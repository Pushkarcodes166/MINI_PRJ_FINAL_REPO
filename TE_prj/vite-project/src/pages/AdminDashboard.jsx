import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Brain, Users, FileText, TrendingUp, LogOut, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    testsCompleted: 0,
    avgScore: 0
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const students = users.filter(u => u.role === 'student');
    
    let completedTests = 0;
    let totalScore = 0;

    students.forEach(student => {
      const results = JSON.parse(localStorage.getItem(`testResults_${student.id}`) || 'null');
      if (results) {
        completedTests++;
        totalScore += results.score;
      }
    });

    setStats({
      totalStudents: students.length,
      testsCompleted: completedTests,
      avgScore: completedTests > 0 ? (totalScore / completedTests).toFixed(1) : 0
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out Successfully",
      description: "See you soon!",
    });
    navigate('/');
  };

  const careerDistribution = [
    { name: 'Computer Eng', value: 35, color: '#8B5CF6' },
    { name: 'Mechanical', value: 20, color: '#EC4899' },
    { name: 'Medical', value: 15, color: '#3B82F6' },
    { name: 'Civil', value: 12, color: '#10B981' },
    { name: 'Others', value: 18, color: '#F59E0B' }
  ];

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Career Guidance System</title>
        <meta name="description" content="Manage students, view analytics, and configure the career guidance system." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">Admin Dashboard</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 glass-effect rounded-full">
                  <Settings className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Admin</span>
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
              <span className="gradient-text">System Overview</span>
            </h1>
            <p className="text-xl text-gray-300">
              Monitor student performance and system analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <Users className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Total Students</h3>
              <div className="text-4xl font-bold gradient-text">{stats.totalStudents}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <FileText className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tests Completed</h3>
              <div className="text-4xl font-bold text-pink-400">{stats.testsCompleted}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Average Score</h3>
              <div className="text-4xl font-bold text-blue-400">{stats.avgScore}/20</div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 gradient-text">Career Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={careerDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {careerDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 gradient-text">Quick Actions</h2>
              <div className="space-y-4">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Manage Students
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Manage Test Questions
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <TrendingUp className="w-5 h-5 mr-3" />
                  View Detailed Analytics
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  System Settings
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">System Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-400">ML Algorithms Used</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Logistic Regression</li>
                  <li>• Decision Tree Classifier</li>
                  <li>• Random Forest Classifier</li>
                  <li>• Information Gain & Entropy Analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-pink-400">Evaluation Metrics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Accuracy Score</li>
                  <li>• Precision & Recall</li>
                  <li>• F1-Score</li>
                  <li>• Confusion Matrix</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;