
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
        setError('Failed to load roadmap details.');
        setLoading(false);
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
              <h2 className="text-2xl font-bold mb-4">Roadmap Timeline</h2>
              <div className="relative ml-4">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded" />
                <div className="space-y-6 pl-8">
                  {details.roadmap_steps && details.roadmap_steps.length > 0 ? details.roadmap_steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-purple-600 font-bold">{idx+1}</div>
                      <div className="p-4 bg-gray-900/60 rounded-lg">
                        <div className="font-semibold">{step}</div>
                        <div className="text-sm text-gray-300 mt-1">{/* optional short description could go here */}</div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-gray-400">No structured steps available.</div>
                  )}
                </div>
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
                  {(details.popular_specializations || details.popular_specializations === '' ? (details.popular_specializations.split ? details.popular_specializations.split(',').slice(0,8) : []) : []).map((s, i) => (
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
