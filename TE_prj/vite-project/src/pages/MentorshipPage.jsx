import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Users, Calendar, MessageCircle, ArrowLeft } from 'lucide-react';

const MentorshipPage = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('student1'); // Mock user ID, replace with actual auth

  useEffect(() => {
    // Fetch mentors from backend
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:5000/mentors');
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        // Fallback to mock data
        const mockMentors = [
          { id: 1, name: 'John Doe', career: 'Software Engineer', experience: '10 years', availability: 'Weekends' },
          { id: 2, name: 'Jane Smith', career: 'Data Scientist', experience: '8 years', availability: 'Evenings' },
        ];
        setMentors(mockMentors);
      }
    };
    fetchMentors();
  }, []);

  const selectMentor = (mentor) => {
    setSelectedMentor(mentor);
    // For now, use local state for messages (Firebase integration can be added later)
    setMessages([]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const message = {
      text: newMessage,
      sender: userId,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const scheduleSession = () => {
    // Placeholder for scheduling logic, e.g., open calendar or form
    alert('Scheduling feature coming soon!');
  };

  const startVideoCall = () => {
    // Placeholder for video call integration
    alert('Video call feature coming soon!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button
            onClick={() => navigate('/student-dashboard')}
            className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold mb-4 gradient-text">Mentorship Platform</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with experienced professionals in your field of interest and get personalized guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Available Mentors</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mentors.map(mentor => (
                <motion.div
                  key={mentor.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMentor?.id === mentor.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'glass-effect hover:bg-white/10'
                  }`}
                  onClick={() => selectMentor(mentor)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm opacity-80">{mentor.career}</p>
                      <p className="text-sm opacity-80">{mentor.experience} experience</p>
                      <p className="text-sm opacity-80">Available: {mentor.availability}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {selectedMentor && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold">
                  {selectedMentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Chat with {selectedMentor.name}</h2>
                  <p className="text-gray-300">{selectedMentor.career} • {selectedMentor.experience}</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 h-80 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <p className="text-gray-400 text-center mt-8">Start a conversation with your mentor!</p>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-3 ${msg.sender === userId ? 'text-right' : 'text-left'}`}
                    >
                      <span className={`inline-block p-3 rounded-lg max-w-xs ${
                        msg.sender === userId
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 text-gray-200'
                      }`}>
                        {msg.text}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Button onClick={sendMessage} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={scheduleSession}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
