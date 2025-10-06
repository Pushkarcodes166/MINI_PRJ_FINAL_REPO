import React from 'react';
import careerMentoringImg from '../assets/career-mentoring-blue-gradient-concept-600nw-2494148539.webp';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Target, TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import scienceCareers from '../data/science_careers.js';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced ML algorithms analyze your aptitude and interests'
    },
    {
      icon: Target,
      title: 'Personalized Guidance',
      description: 'Get career recommendations tailored to your unique profile'
    },
    {
      icon: TrendingUp,
      title: 'Career Roadmaps',
      description: 'Detailed pathways with courses and opportunities'
    },
    {
      icon: Users,
      title: 'Expert Insights',
      description: 'Psychology-based aptitude testing for accurate results'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Student Career Guidance - AI-Powered Career Recommendations</title>
        <meta name="description" content="Discover your ideal career path with our AI-powered career guidance system. Get personalized recommendations based on your interests and aptitude." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">CareerGuide AI</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <Button variant="ghost" onClick={() => navigate('/documentation')}>
                  Documentation
                </Button>
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </nav>

        <section className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover Your
                <span className="gradient-text block">Perfect Career Path</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                AI-powered career guidance system that analyzes your interests, academic performance, and aptitude to recommend the best career path for your future.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
                >
                  Start Your Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/documentation')}
                  className="text-lg px-8"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="floating">
                <img alt="AI Career Guidance Illustration" className="w-full rounded-2xl shadow-2xl" src={careerMentoringImg} />
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default LandingPage;