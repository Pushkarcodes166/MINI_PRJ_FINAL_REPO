import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Brain, Mail, Lock, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      if (!userCredential.user.emailVerified) {
        toast({
          title: "Email Not Verified",
          description: "Please verify your email before logging in.",
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Login Successful! 🎉",
        description: `Welcome back!`,
      });
      navigate('/student-dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Student Career Guidance System</title>
        <meta name="description" content="Login to access your personalized career guidance dashboard and recommendations." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
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
              <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
              <p className="text-gray-400">Login to continue your career journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === 'student'}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                    className="w-4 h-4"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={formData.userType === 'admin'}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                    className="w-4 h-4"
                  />
                  <span>Admin</span>
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                Login
              </Button>

              <p className="text-center text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;