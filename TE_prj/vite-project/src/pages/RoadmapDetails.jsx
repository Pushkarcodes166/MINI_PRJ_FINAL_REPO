
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RoadmapDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { career } = location.state || {};
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!career) return;
    setLoading(true);
    setError(null);
    fetch(`http://127.0.0.1:5000/roadmap-details?career=${encodeURIComponent(career)}`)
      .then(res => res.json())
      .then(data => {
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
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{details.title} Roadmap</h1>
      <p className="mb-4 text-gray-700">{details.description}</p>
      <div className="mb-4">
        <strong>Eligibility:</strong> {details.eligibility}
      </div>
      <div className="mb-4">
        <strong>Recommended Subjects:</strong> {details.recommended_12th_subjects}
      </div>
      <div className="mb-4">
        <strong>Entrance Exams:</strong> {details.entrance_exams}
      </div>
      <div className="mb-4">
        <strong>Roadmap Steps:</strong>
        <ul className="list-disc ml-6">
          {details.roadmap_steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Undergraduate Options:</strong> {details.undergraduate_options}
      </div>
      <div className="mb-4">
        <strong>Postgraduate Options:</strong> {details.postgraduate_options}
      </div>
      <div className="mb-4">
        <strong>Popular Specializations:</strong> {details.popular_specializations}
      </div>
      <div className="mb-8 p-6 rounded-xl bg-purple-100/30 border border-purple-400/30">
        <h2 className="text-2xl font-bold mb-2 text-purple-700">Career Path</h2>
        <div className="text-gray-900 font-semibold">{details.possible_career_paths}</div>
      </div>
      <div className="mb-4">
        <strong>Typical Timeline:</strong> {details.typical_timeline}
      </div>
      <div className="mb-4">
        <strong>Notes:</strong> {details.notes}
      </div>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
