import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Brain, User, Mail, Lock, ArrowLeft, Phone, GraduationCap } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    class: '',
    interests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);
      toast({
        title: "Signup Successful!",
        description: `A verification email has been sent to ${formData.email}. Please verify your email before logging in.`,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
    }

    toast({
      title: "Account Created! 🎉",
      description: "Welcome to CareerGuide AI. Let's find your perfect career path!",
    });

    navigate('/student-dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Student Career Guidance System</title>
        <meta name="description" content="Create your account to get personalized AI-powered career recommendations." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="glass-effect rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold gradient-text mb-2">Create Your Account</h1>
              <p className="text-gray-400">Start your journey to the perfect career</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pl-10 glass-effect"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 glass-effect"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="pl-10 glass-effect"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Current Class/Year</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="class"
                      type="text"
                      placeholder="B.E. Sem 5"
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value})}
                      className="pl-10 glass-effect"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 glass-effect"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="pl-10 glass-effect"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Your Interests (comma separated)</Label>
                <Input
                  id="interests"
                  type="text"
                  placeholder="Programming, Mathematics, Design, etc."
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  className="glass-effect"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                Create Account
              </Button>

              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;