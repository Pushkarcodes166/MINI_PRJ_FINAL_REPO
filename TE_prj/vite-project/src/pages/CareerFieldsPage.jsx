import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import scienceCareers from '../data/science_careers.js';
// Main headings for clubbing
const mainFields = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Professional engineering across multiple disciplines including Computer Science & IT, Mechanical, Chemical, Electrical, Electronic, Aerospace, Aeronautical, Biomedical.',
    route: '/careers/engineering'
  }
];

// All careers except those clubbed under Engineering
const engineeringIds = [
  'engineering_general',
  'computer_science_it',
  'mechanical_engineering',
  'chemical_engineering',
  'civil_engineering',
  'electrical_electronics',
  'aerospace_engineering',
  'biomedical_engineering'
];
const remainingCareers = scienceCareers.filter(c => !engineeringIds.includes(c.id));


const CareerFieldsPage = () => {
  const [openField, setOpenField] = useState(null);
  const [showPath, setShowPath] = useState({});

  return (
    <>
      <Helmet>
        <title>Explore Career Fields - Career Guidance System</title>
      </Helmet>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        <div className="relative z-10 container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">Explore Career Fields</h1>
          <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
            {/* Engineering main heading */}
            {mainFields.map(field => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-3xl card-hover shadow-lg border border-purple-700/30 w-full flex flex-col min-w-0"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0, boxSizing: 'border-box' }}
              >
                <div className="flex min-w-0">
                  <Button
                    variant="outline"
                    className="w-full text-left text-2xl font-bold mb-4 gradient-text py-4 px-2 rounded-xl whitespace-normal break-words min-w-0"
                    style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 0, boxSizing: 'border-box' }}
                  >
                    <span className="block min-w-0 break-words whitespace-normal">{field.title}</span>
                  </Button>
                </div>
                <p className="text-gray-300 mb-4 text-base whitespace-normal break-words min-w-0" style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 0 }}>{field.description}</p>
                <Button
                  variant="default"
                  className="mb-4 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
                  onClick={() => window.open(field.route, '_blank')}
                >
                  Explore path
                </Button>
              </motion.div>
            ))}

            {/* Remaining careers as before */}
            {remainingCareers.map(field => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-3xl card-hover shadow-lg border border-purple-700/30 w-full flex flex-col min-w-0"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0, boxSizing: 'border-box' }}
              >
                <div className="flex min-w-0">
                  <Button
                    variant="outline"
                    className="w-full text-left text-2xl font-bold mb-4 gradient-text py-4 px-2 rounded-xl whitespace-normal break-words min-w-0"
                    onClick={() => setOpenField(openField === field.id ? null : field.id)}
                    style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 0, boxSizing: 'border-box' }}
                  >
                    <span className="block min-w-0 break-words whitespace-normal">{field.title}</span>
                  </Button>
                </div>
                <p className="text-gray-300 mb-4 text-base whitespace-normal break-words min-w-0" style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 0 }}>{field.description}</p>
                {openField === field.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4"
                  >
                    <Button
                      variant="default"
                      className="mb-4 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
                      onClick={() => setShowPath(prev => ({ ...prev, [field.id]: !prev[field.id] }))}
                    >
                      {showPath[field.id] ? 'Hide detailed path' : 'Explore detailed path'}
                    </Button>
                    {showPath[field.id] && (
                      <div>
                        <h4 className="font-semibold mb-2 text-purple-400 text-lg">Pathway Steps:</h4>
                        <ul className="list-decimal ml-6 text-gray-300 text-base whitespace-normal break-words min-w-0" style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 0 }}>
                          {field.roadmap_steps.split('|').map((step, idx) => (
                            <li key={idx} className="mb-2 whitespace-normal break-words min-w-0" style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 0 }}>{step.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerFieldsPage;
