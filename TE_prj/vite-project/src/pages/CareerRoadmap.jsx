import { getDecisionTreeMetrics } from '../lib/career_decision_tree_ml';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Briefcase, GraduationCap, TrendingUp, ArrowLeft, CheckCircle } from 'lucide-react';
import { careerRoadmaps } from '@/data/careerRoadmaps';
import { predictCareer, availableStreams, availableDegrees, availableInterests } from '../lib/career_decision_tree';
import { fetchScienceCareers } from '../lib/science_careers_loader';

const CareerRoadmap = () => {
  const navigate = useNavigate();
  const { career } = useParams();
  const [roadmap, setRoadmap] = useState(null);

  // ML metrics from backend
  const [mlMetrics, setMlMetrics] = useState(null);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState(null);
  const handleShowMLMetrics = async () => {
    setMlLoading(true);
    setMlError(null);
    try {
      const res = await fetch('http://127.0.0.1:5000/metrics');
      const data = await res.json();
      setMlMetrics(data);
    } catch (err) {
      setMlError('Failed to load ML metrics.');
    }
    setMlLoading(false);
  };

  // Science careers CSV demo
  const [scienceCareers, setScienceCareers] = useState([]);
  const [showCareer, setShowCareer] = useState(false);
  const handleLoadCareers = async () => {
    const careers = await fetchScienceCareers();
    setScienceCareers(careers);
    setShowCareer(true);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const careerData = careerRoadmaps[career];
    if (!careerData) {
      navigate('/student-dashboard');
      return;
    }
    setRoadmap(careerData);
  }, [career, navigate]);

  if (!roadmap) return null;

  // ML model state (for backend integration)
  const [marks, setMarks] = useState('');
  const [interest, setInterest] = useState('');
  const [skill, setSkill] = useState('');
  const [prediction, setPrediction] = useState('');
  const [predictLoading, setPredictLoading] = useState(false);
  const [predictError, setPredictError] = useState(null);

  // Backend API call for prediction
  const handlePredict = async () => {
    setPredictLoading(true);
    setPredictError(null);
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marks: Number(marks), interest, skill })
      });
      const data = await res.json();
      setPrediction(data.career);
    } catch (err) {
      setPredictError('Failed to get recommendation.');
    }
    setPredictLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{career} Roadmap - Career Guidance System</title>
        <meta name="description" content={`Explore the complete career roadmap for ${career} including courses, skills, and opportunities.`} />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">Career Roadmap</span>
              </div>
              <Button variant="ghost" onClick={() => navigate('/test-results')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
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
              <span className="gradient-text">{career}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {roadmap.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-8 rounded-2xl"
            >
              <GraduationCap className="w-12 h-12 text-purple-400 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Educational Path</h2>
              <div className="space-y-3">
                {roadmap.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{edu}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect p-8 rounded-2xl"
            >
              <BookOpen className="w-12 h-12 text-pink-400 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Key Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {roadmap.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-3xl p-8 mb-12"
          >
            <Briefcase className="w-12 h-12 text-blue-400 mb-4" />
            <h2 className="text-3xl font-bold mb-6 gradient-text">Career Opportunities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roadmap.careers.map((careerOption, index) => (
                <div
                  key={index}
                  className="p-4 glass-effect rounded-xl hover:border-purple-400/50 border border-transparent transition-all"
                >
                  <h3 className="font-semibold text-lg mb-2">{careerOption.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{careerOption.description}</p>
                  <p className="text-purple-400 font-semibold">{careerOption.salary}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-3xl p-8 mb-12"
          >
            <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
            <h2 className="text-3xl font-bold mb-6 gradient-text">Recommended Courses & Certifications</h2>
            <div className="space-y-4">
              {roadmap.courses.map((course, index) => (
                <div
                  key={index}
                  className="p-6 glass-effect rounded-xl"
                >
                  <h3 className="font-bold text-xl mb-2">{course.name}</h3>
                  <p className="text-gray-400 mb-3">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-purple-400">Duration: {course.duration}</span>
                    <span className="text-pink-400">Platform: {course.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Industry Insights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Growth Prospects</h3>
                <p className="text-gray-300">{roadmap.insights.growth}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Salary Range</h3>
                <p className="text-gray-300">{roadmap.insights.salary}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Future Trends</h3>
                <p className="text-gray-300">{roadmap.insights.trends}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/student-dashboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12"
            >
              Back to Dashboard
            </Button>
          </motion.div>
          {/* ML model UI */}
          <div className="relative z-10 container mx-auto px-6 py-8 max-w-3xl">
            <div className="glass-effect p-6 rounded-2xl mb-8">
              {/* ML Metrics from Backend */}
              <div className="mb-6">
                <Button size="sm" onClick={handleShowMLMetrics} className="bg-green-700 text-white">Show ML Metrics</Button>
                {mlLoading && <div className="text-green-300">Loading metrics...</div>}
                {mlError && <div className="text-red-400">{mlError}</div>}
                {mlMetrics && !mlLoading && (
                  <div className="mt-4 p-4 rounded-xl bg-green-900/30 border border-green-400/30">
                    <div className="font-bold text-lg text-green-300">ML Model Metrics</div>
                    <div className="text-gray-200 text-sm mb-2">Accuracy: {(mlMetrics.metrics.accuracy * 100).toFixed(2)}%</div>
                    <div className="text-xs text-green-200">Precision: {mlMetrics.metrics.precision.toFixed(2)}</div>
                    <div className="text-xs text-green-200">Recall: {mlMetrics.metrics.recall.toFixed(2)}</div>
                    <div className="text-xs text-green-200">F1 Score: {mlMetrics.metrics.f1_score.toFixed(2)}</div>
                    <div className="text-xs text-green-200">Confusion Matrix:</div>
                    <pre className="text-xs text-green-100 overflow-x-auto max-h-32">{JSON.stringify(mlMetrics.metrics.confusion_matrix, null, 2)}</pre>
                    <details className="mt-2">
                      <summary className="text-green-400 cursor-pointer">Show Decision Tree Rules</summary>
                      <pre className="text-xs text-green-100 overflow-x-auto max-h-64">{mlMetrics.tree}</pre>
                    </details>
                  </div>
                )}
              </div>
            {/* Science Careers CSV Demo */}
            <div className="mb-6">
              <Button size="sm" onClick={handleLoadCareers} className="bg-blue-700 text-white">Show Science Careers (CSV)</Button>
              {showCareer && scienceCareers.length > 0 && (
                <div className="mt-4 p-4 rounded-xl bg-blue-900/30 border border-blue-400/30">
                  <div className="font-bold text-lg text-blue-300">{scienceCareers[0].title}</div>
                  <div className="text-gray-200 text-sm mb-2">{scienceCareers[0].description}</div>
                  <div className="text-xs text-blue-200">Eligibility: {scienceCareers[0].eligibility}</div>
                </div>
              )}
            </div>
              <h2 className="text-2xl font-bold mb-4 gradient-text">Find Your Recommended Career (ML Backend)</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-purple-400 font-semibold">Marks (%)</label>
                  <input type="number" value={marks} onChange={e => setMarks(e.target.value)} className="w-full p-2 rounded bg-gray-900 text-white" placeholder="Enter marks" min="0" max="100" />
                </div>
                <div>
                  <label className="block mb-2 text-pink-400 font-semibold">Interest</label>
                  <select value={interest} onChange={e => setInterest(e.target.value)} className="w-full p-2 rounded bg-gray-900 text-white">
                    <option value="">Select Interest</option>
                    <option value="tech">Tech</option>
                    <option value="medicine">Medicine</option>
                    <option value="design">Design</option>
                    <option value="research">Research</option>
                    <option value="pharma">Pharma</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="biotech">Biotech</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-blue-400 font-semibold">Skill</label>
                  <select value={skill} onChange={e => setSkill(e.target.value)} className="w-full p-2 rounded bg-gray-900 text-white">
                    <option value="">Select Skill</option>
                    <option value="logical">Logical</option>
                    <option value="analytical">Analytical</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-lg px-8 w-full" onClick={handlePredict} disabled={predictLoading}>Get Recommendation</Button>
                </div>
              </div>
              {predictLoading && <div className="text-purple-300">Loading...</div>}
              {predictError && <div className="text-red-400">{predictError}</div>}
              {prediction && (
                <div className="mt-6 p-4 rounded-xl bg-purple-900/30 border border-purple-400/30 text-center">
                  <span className="text-xl font-bold text-purple-300">Recommended Career: </span>
                  <span className="text-2xl font-bold gradient-text">{prediction}</span>
                  <div className="mt-4">
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                      onClick={() => navigate('/roadmap-details', { state: { career: prediction } })}
                    >
                      Explore Roadmap
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerRoadmap;