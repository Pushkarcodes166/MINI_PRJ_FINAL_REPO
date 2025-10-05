import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Brain, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { careerTestQuestions } from '@/data/testQuestions';

const CareerTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      toast({
        title: "Please select an answer",
        description: "You must select an option before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion < careerTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const careerScores = {
      'Computer Engineering': 0,
      'Mechanical Engineering': 0,
      'Civil Engineering': 0,
      'Electrical Engineering': 0,
      'Medical Sciences': 0,
      'Architecture': 0,
      'Pure Sciences': 0,
      'Commerce & Business': 0,
      'Arts & Humanities': 0
    };

    careerTestQuestions.forEach((question, index) => {
      const selectedOption = answers[index];
      if (selectedOption !== undefined) {
        const career = question.options[selectedOption].career;
        careerScores[career] = (careerScores[career] || 0) + 1;
      }
    });

    const sortedCareers = Object.entries(careerScores)
      .sort(([, a], [, b]) => b - a)
      .map(([career, score]) => ({ career, score }));

    return {
      topCareer: sortedCareers[0].career,
      recommendations: sortedCareers.slice(0, 3),
      score: Object.keys(answers).length,
      totalQuestions: careerTestQuestions.length,
      detailedScores: careerScores
    };
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < careerTestQuestions.length) {
      toast({
        title: "Incomplete Test",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }

    const results = calculateResults();
    localStorage.setItem(`testResults_${user.id}`, JSON.stringify(results));

    toast({
      title: "Test Completed! 🎉",
      description: "Your results are ready. Analyzing your career path...",
    });

    setTimeout(() => {
      navigate('/test-results');
    }, 1500);
  };

  if (!user) return null;

  const progress = ((currentQuestion + 1) / careerTestQuestions.length) * 100;
  const question = careerTestQuestions[currentQuestion];

  return (
    <>
      <Helmet>
        <title>Career Aptitude Test - Student Career Guidance</title>
        <meta name="description" content="Take our comprehensive 20-question aptitude test to discover your ideal career path." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">Career Aptitude Test</span>
              </div>
              <Button variant="ghost" onClick={() => navigate('/student-dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">
                Question {currentQuestion + 1} of {careerTestQuestions.length}
              </span>
              <span className="text-lg font-semibold text-purple-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-effect rounded-3xl p-8 mb-8"
            >
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">{currentQuestion + 1}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{question.question}</h2>
                </div>
              </div>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-6 rounded-xl text-left transition-all ${
                      answers[currentQuestion] === index
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-purple-400'
                        : 'glass-effect hover:border-purple-400/50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option.text}</span>
                      {answers[currentQuestion] === index && (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              size="lg"
              className="px-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentQuestion === careerTestQuestions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
              >
                Submit Test
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerTest;