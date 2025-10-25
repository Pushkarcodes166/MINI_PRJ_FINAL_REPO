
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Briefcase, Award, Target, CheckCircle, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { careerRoadmaps } from '@/data/careerRoadmaps';

export default function RoadmapDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateCareer = (location.state && location.state.career) || null;
  const [searchParams] = useSearchParams();
  const career = stateCareer || searchParams.get('career');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const getIcon = (stepIndex) => {
    const icons = [BookOpen, GraduationCap, Briefcase, Award, Target, CheckCircle];
    return icons[stepIndex % icons.length];
  };

  const getStepColor = (stepIndex) => {
    const colors = ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-indigo-500', 'from-pink-500 to-rose-500', 'from-yellow-500 to-orange-500', 'from-teal-500 to-blue-500'];
    return colors[stepIndex % colors.length];
  };

  useEffect(() => {
    if (!career) return;
    setLoading(true);
    setError(null);
    fetch(`http://127.0.0.1:5000/roadmap-details?career=${encodeURIComponent(career)}`)
      .then(async res => {
        if (!res.ok) {
          // try fallback to local data
          const fallbackKey = Object.keys(careerRoadmaps).find(k => k.toLowerCase() === career.toLowerCase() || k.toLowerCase().includes(career.toLowerCase()) || career.toLowerCase().includes(k.toLowerCase()));
          if (fallbackKey) {
            const local = careerRoadmaps[fallbackKey];
            const detailsFromLocal = {
              title: fallbackKey,
              description: local.description || '',
              eligibility: local.education ? local.education.join('; ') : '',
              recommended_12th_subjects: local.education ? local.education.join('|') : '',
              entrance_exams: '',
              roadmap_steps: local.education || [],
              undergraduate_options: local.courses ? local.courses.map(c => c.name).join(', ') : '',
              postgraduate_options: '',
              popular_specializations: local.skills ? local.skills.join(', ') : '',
              possible_career_paths: local.careers ? local.careers.map(c => c.title).join(', ') : '',
              typical_timeline: '',
              notes: ''
            };
            setDetails(detailsFromLocal);
            setLoading(false);
            return;
          }
          const json = await res.json().catch(() => ({}));
          setError(json.error || 'Failed to load roadmap details.');
          setLoading(false);
          return;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        if (data.error) setError(data.error);
        else setDetails(data);
        setLoading(false);
      })
      .catch(() => {
        // try fallback to local data
        const fallbackKey = Object.keys(careerRoadmaps).find(k => k.toLowerCase() === career.toLowerCase() || k.toLowerCase().includes(career.toLowerCase()) || career.toLowerCase().includes(k.toLowerCase()));
        if (fallbackKey) {
          const local = careerRoadmaps[fallbackKey];
          const detailsFromLocal = {
            title: fallbackKey,
            description: local.description || '',
            eligibility: local.education ? local.education.join('; ') : '',
            recommended_12th_subjects: local.education ? local.education.join('|') : '',
            entrance_exams: '',
            roadmap_steps: local.education || [],
            undergraduate_options: local.courses ? local.courses.map(c => c.name).join(', ') : '',
            postgraduate_options: '',
            popular_specializations: local.skills ? local.skills.join(', ') : '',
            possible_career_paths: local.careers ? local.careers.map(c => c.title).join(', ') : '',
            typical_timeline: '',
            notes: ''
          };
          setDetails(detailsFromLocal);
          setLoading(false);
        } else {
          setError('Failed to load roadmap details.');
          setLoading(false);
        }
      });
  }, [career]);

  if (!career) {
    return <div className="p-8 text-center">No career selected.</div>;
  }
  if (loading) {
    return <div className="p-8 text-center">Loading roadmap for {career}...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  if (!details) {
    return <div className="p-8 text-center">No roadmap found for {career}</div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 animate-gradient" />
      <div className="relative z-10 max-w-5xl mx-auto p-8">
        <div className="flex items-start gap-8 mb-8">
          <div className="flex-1">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-xl">
              <h1 className="text-3xl font-extrabold">{details.title} Roadmap</h1>
              <p className="mt-2 text-sm opacity-90">{details.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/20">Eligibility</span>
                <span className="text-sm font-medium">{details.eligibility || 'Check college requirements'}</span>
              </div>
            </div>

          <div className="mt-8 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Roadmap Timeline</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="flex items-center gap-2 bg-gray-800/50 border-gray-600 hover:bg-gray-700/50"
                >
                  <List className="w-4 h-4" />
                  {showSidebar ? 'Hide' : 'Show'} All Steps
                </Button>
              </div>
              <div className="relative flex">
                {/* Progress Line */}
                <div className="relative w-1 bg-gray-600 rounded-full mr-8">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${((currentStep + 1) / details.roadmap_steps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  {/* Milestone Dots */}
                  {details.roadmap_steps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`absolute w-6 h-6 rounded-full border-2 shadow-lg cursor-pointer transition-all duration-300 ${
                        index <= currentStep ? `bg-gradient-to-r ${getStepColor(index)} border-white` : 'bg-gray-500 border-gray-400'
                      }`}
                      style={{ top: `${(index / (details.roadmap_steps.length - 1)) * 100}%`, left: '50%', transform: 'translateX(-50%)' }}
                      whileHover={{
                        borderColor: index <= currentStep ? '#a855f7' : '#9ca3af',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => setCurrentStep(index)}
                    >
                      {index <= currentStep && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                          {React.createElement(getIcon(index), { className: "w-4 h-4" })}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {/* Current Step Display */}
                <div className="flex-1">
                  {details.roadmap_steps && details.roadmap_steps.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="relative"
                        >
                          <div className="p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getStepColor(currentStep)} flex items-center justify-center text-white font-bold shadow-lg`}>
                                {currentStep + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-bold text-lg text-white mb-2">{details.roadmap_steps[currentStep]}</div>
                                <div className="text-sm text-gray-300 bg-black/20 px-3 py-1 rounded-full inline-block">
                                  Step {currentStep + 1} of {details.roadmap_steps.length}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                      <div className="flex justify-between items-center mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                          disabled={currentStep === 0}
                          className="flex items-center gap-2 bg-gray-800/50 border-gray-600 hover:bg-gray-700/50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        <div className="text-sm text-gray-400">
                          {currentStep + 1} / {details.roadmap_steps.length}
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(Math.min(details.roadmap_steps.length - 1, currentStep + 1))}
                          disabled={currentStep === details.roadmap_steps.length - 1}
                          className="flex items-center gap-2 bg-gray-800/50 border-gray-600 hover:bg-gray-700/50"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-400">No structured steps available.</div>
                  )}
                </div>
                {/* Mini-Preview Sidebar */}
                {showSidebar && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="ml-8 w-80 bg-gray-900/50 rounded-xl p-4 border border-white/5"
                  >
                    <h3 className="text-lg font-bold mb-4">All Steps</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {details.roadmap_steps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                            index === currentStep ? 'bg-purple-600/50 border border-purple-400' : 'bg-gray-800/30 hover:bg-gray-700/50'
                          }`}
                          onClick={() => setCurrentStep(index)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getStepColor(index)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                              {index + 1}
                            </div>
                            <div className="text-sm font-medium break-words">{step}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Recommended Courses & Certifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {(
                  (details.courses && details.courses.length && details.courses) ||
                  (details.undergraduate_options && details.undergraduate_options.split ? details.undergraduate_options.split(',').map(s => ({ name: s.trim(), description: '' })) : []) ||
                  []
                ).slice(0,6).map((course, i) => (
                  <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{course.name || course}</div>
                        <div className="text-sm text-gray-300 mt-1">{course.description || ''}</div>
                      </div>
                      <div className="text-sm text-pink-300">{course.duration || ''}</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-400">Platform: {course.platform || 'Various'}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="md:col-span-4">
              <div className="p-4 rounded-xl bg-gray-900/50 border border-white/5 mb-4">
                <h3 className="text-lg font-bold mb-2">Key Skills</h3>
                <ul className="space-y-1">
                  {(details.popular_specializations || details.popular_specializations === '' ? (details.popular_specializations.split ? details.popular_specializations.split('|').slice(0,8) : []) : []).map((s, i) => (
                    <li key={i} className="text-sm text-gray-300">• {s.trim()}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-tr from-green-700/20 to-blue-700/10 border border-white/5">
                <h3 className="text-lg font-bold mb-2">Career Opportunities</h3>
                <div className="text-sm text-gray-200">{details.possible_career_paths || 'See typical roles listed in the roadmap.'}</div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-purple-900/20 border border-purple-400/20">
                <h3 className="font-bold mb-2">Timeline</h3>
                <div className="text-sm">{details.typical_timeline || 'UG 3-4 years → PG (optional) → Industry/Research'}</div>
              </div>
            </aside>
          </div>
        </div>
      </div>

        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-white text-purple-700 rounded-full font-bold shadow" onClick={() => navigate(-1)}>Back to Results</button>
        </div>
      </div>
    </div>
  );
}
