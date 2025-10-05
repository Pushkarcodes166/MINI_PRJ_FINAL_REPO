import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, BookOpen, Target, Cpu, Database, BarChart3, FileText } from 'lucide-react';

const ProjectDocumentation = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Project Documentation - Student Career Guidance System</title>
        <meta name="description" content="Complete technical documentation for the Student Career Guidance ML project including objectives, methodology, and implementation details." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">Project Documentation</span>
              </div>
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Student Career Guidance</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Using Machine Learning</h2>
            <p className="text-xl text-gray-300">
              B.E. Computer Engineering | Semester 5 | Mumbai University
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold gradient-text">Abstract</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              The Student Career Guidance System is an AI-powered web application designed to help students discover their ideal career path through comprehensive aptitude testing and machine learning analysis. The system employs multiple ML algorithms including Logistic Regression, Decision Tree, and Random Forest to analyze student responses, academic performance, and interests. By utilizing Information Gain and Entropy calculations, the system provides personalized career recommendations across nine major fields including Engineering, Medical Sciences, Architecture, Pure Sciences, Commerce, and Arts. The platform features a modern, responsive interface built with React and includes detailed career roadmaps, course recommendations, and industry insights to guide students toward successful career choices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-pink-400" />
              <h2 className="text-3xl font-bold gradient-text">Objectives & Scope</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Primary Objectives</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Develop an intelligent career recommendation system using machine learning</li>
                  <li>• Create a comprehensive 20-question aptitude test based on psychology and IQ assessment</li>
                  <li>• Implement multiple ML algorithms and compare their performance</li>
                  <li>• Provide detailed career roadmaps with courses, skills, and opportunities</li>
                  <li>• Build a user-friendly web interface for students and administrators</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Project Scope</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Phase 1: Stream prediction (Science, Commerce, Arts)</li>
                  <li>• Phase 2: Sub-branch prediction with detailed roadmaps</li>
                  <li>• Coverage of 9 major career fields and their sub-branches</li>
                  <li>• Student and Admin modules with role-based access</li>
                  <li>• Analytics dashboard for performance tracking</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold gradient-text">Technical Stack</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Frontend Technologies</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• React 18.2.0 - UI Framework</li>
                  <li>• React Router 6.16.0 - Navigation</li>
                  <li>• TailwindCSS 3.3.2 - Styling</li>
                  <li>• Framer Motion 10.16.4 - Animations</li>
                  <li>• Recharts 2.8.0 - Data Visualization</li>
                  <li>• shadcn/ui - Component Library</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Backend & ML</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Python Flask - Backend Framework</li>
                  <li>• Scikit-learn - ML Algorithms</li>
                  <li>• Pandas & NumPy - Data Processing</li>
                  <li>• Matplotlib/Seaborn - Visualization</li>
                  <li>• MySQL - Database</li>
                  <li>• LocalStorage - Client-side Storage</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl font-bold gradient-text">Database Schema</h2>
            </div>
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Users Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-gray-300">
                    <thead className="border-b border-gray-700">
                      <tr>
                        <th className="pb-2">Field</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr><td>id</td><td>VARCHAR(50)</td><td>Primary Key</td></tr>
                      <tr><td>name</td><td>VARCHAR(100)</td><td>Student Name</td></tr>
                      <tr><td>email</td><td>VARCHAR(100)</td><td>Unique Email</td></tr>
                      <tr><td>password</td><td>VARCHAR(255)</td><td>Hashed Password</td></tr>
                      <tr><td>phone</td><td>VARCHAR(15)</td><td>Contact Number</td></tr>
                      <tr><td>class</td><td>VARCHAR(50)</td><td>Current Class/Year</td></tr>
                      <tr><td>interests</td><td>TEXT</td><td>Student Interests</td></tr>
                      <tr><td>role</td><td>ENUM</td><td>student/admin</td></tr>
                      <tr><td>created_at</td><td>TIMESTAMP</td><td>Registration Date</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Test Results Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-gray-300">
                    <thead className="border-b border-gray-700">
                      <tr>
                        <th className="pb-2">Field</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>id</td><td>VARCHAR(50)</td><td>Primary Key</td></tr>
                      <tr><td>user_id</td><td>VARCHAR(50)</td><td>Foreign Key</td></tr>
                      <tr><td>score</td><td>INT</td><td>Total Score</td></tr>
                      <tr><td>top_career</td><td>VARCHAR(100)</td><td>Recommended Career</td></tr>
                      <tr><td>detailed_scores</td><td>JSON</td><td>All Career Scores</td></tr>
                      <tr><td>test_date</td><td>TIMESTAMP</td><td>Test Completion Date</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl font-bold gradient-text">ML Methodology</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Algorithms Implemented</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="glass-effect p-4 rounded-xl">
                    <h4 className="font-bold mb-2">Logistic Regression</h4>
                    <p className="text-sm text-gray-400">Binary and multiclass classification for career prediction</p>
                  </div>
                  <div className="glass-effect p-4 rounded-xl">
                    <h4 className="font-bold mb-2">Decision Tree</h4>
                    <p className="text-sm text-gray-400">Tree-based classification using Information Gain</p>
                  </div>
                  <div className="glass-effect p-4 rounded-xl">
                    <h4 className="font-bold mb-2">Random Forest</h4>
                    <p className="text-sm text-gray-400">Ensemble method for improved accuracy</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Evaluation Metrics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="font-semibold">Confusion Matrix:</span> Visualizes true positives, false positives, true negatives, and false negatives</li>
                  <li>• <span className="font-semibold">Accuracy:</span> Overall correctness of predictions (TP+TN)/(TP+TN+FP+FN)</li>
                  <li>• <span className="font-semibold">Precision:</span> Accuracy of positive predictions TP/(TP+FP)</li>
                  <li>• <span className="font-semibold">Recall:</span> Coverage of actual positives TP/(TP+FN)</li>
                  <li>• <span className="font-semibold">F1-Score:</span> Harmonic mean of precision and recall 2*(Precision*Recall)/(Precision+Recall)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">Information Gain & Entropy</h3>
                <p className="text-gray-300 mb-3">
                  The system uses Information Gain to determine the most informative questions for career prediction:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="font-semibold">Entropy:</span> Measures uncertainty in the dataset H(S) = -Σ(p(x) * log₂(p(x)))</li>
                  <li>• <span className="font-semibold">Information Gain:</span> Reduction in entropy after splitting IG(S,A) = H(S) - Σ(|Sv|/|S| * H(Sv))</li>
                  <li>• Questions with highest Information Gain are prioritized in the decision tree</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-orange-400" />
              <h2 className="text-3xl font-bold gradient-text">Features & Modules</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Student Module</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• User registration and authentication</li>
                  <li>• Profile management with academic details</li>
                  <li>• 20-question aptitude test</li>
                  <li>• Personalized career recommendations</li>
                  <li>• Detailed career roadmaps</li>
                  <li>• Course and certification suggestions</li>
                  <li>• Industry insights and salary information</li>
                </ul>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Admin Module</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• System dashboard with analytics</li>
                  <li>• Student performance monitoring</li>
                  <li>• Test question management</li>
                  <li>• Career distribution visualization</li>
                  <li>• Statistical reports generation</li>
                  <li>• System configuration settings</li>
                  <li>• User management capabilities</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Implementation Phases</h2>
            <div className="space-y-4">
              <div className="glass-effect p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold mb-2 text-purple-400">Phase 1: Foundation (Weeks 1-2)</h3>
                <p className="text-gray-300">System design, database schema, UI/UX mockups, and basic authentication implementation</p>
              </div>
              <div className="glass-effect p-6 rounded-xl border-l-4 border-pink-500">
                <h3 className="text-xl font-bold mb-2 text-pink-400">Phase 2: Core Development (Weeks 3-5)</h3>
                <p className="text-gray-300">Aptitude test creation, ML model training, career recommendation engine, and frontend development</p>
              </div>
              <div className="glass-effect p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-2 text-blue-400">Phase 3: Integration (Weeks 6-7)</h3>
                <p className="text-gray-300">Backend-frontend integration, admin dashboard, analytics implementation, and testing</p>
              </div>
              <div className="glass-effect p-6 rounded-xl border-l-4 border-green-500">
                <h3 className="text-xl font-bold mb-2 text-green-400">Phase 4: Deployment (Week 8)</h3>
                <p className="text-gray-300">Final testing, documentation, deployment, and presentation preparation</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12"
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectDocumentation;