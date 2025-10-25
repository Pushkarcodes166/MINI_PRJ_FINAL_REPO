import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { FileText, Plus, Tag, User, Trophy, Lightbulb, Map, ArrowLeft } from 'lucide-react';

const UserContentPage = () => {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState('successStory');
  const [userContent, setUserContent] = useState([]);
  const [newContent, setNewContent] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    // Fetch user-generated content from backend
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-content?type=${contentType}`);
        const data = await response.json();
        setUserContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
        // Fallback to mock data
        const mockContent = [
          { id: 1, type: 'successStory', title: 'From Intern to Engineer', content: 'My journey...', author: 'User1', tags: ['engineering', 'internship'] },
          { id: 2, type: 'tip', title: 'Resume Tips', content: 'Always customize...', author: 'User2', tags: ['resume', 'job'] },
        ];
        setUserContent(mockContent.filter(item => item.type === contentType));
      }
    };
    fetchContent();
  }, [contentType]);

  const submitContent = async () => {
    if (!newContent.title || !newContent.content) return;
    try {
      const response = await fetch('http://localhost:5000/user-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          title: newContent.title,
          content: newContent.content,
          author: 'CurrentUser', // Replace with actual user
          tags: newContent.tags.split(',').map(tag => tag.trim()),
        }),
      });
      if (response.ok) {
        const newItem = {
          id: Date.now(),
          type: contentType,
          title: newContent.title,
          content: newContent.content,
          author: 'CurrentUser',
          tags: newContent.tags.split(',').map(tag => tag.trim()),
        };
        setUserContent([...userContent, newItem]);
        setNewContent({ title: '', content: '', tags: '' });
      }
    } catch (error) {
      console.error('Error submitting content:', error);
    }
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'successStory': return <Trophy className="w-5 h-5" />;
      case 'tip': return <Lightbulb className="w-5 h-5" />;
      case 'customRoadmap': return <Map className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getContentTypeLabel = (type) => {
    switch (type) {
      case 'successStory': return 'Success Stories';
      case 'tip': return 'Tips';
      case 'customRoadmap': return 'Custom Roadmaps';
      default: return type;
    }
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
          <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold mb-4 gradient-text">User-Generated Content</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share your experiences, tips, and insights with the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Content Types</h2>
            <div className="space-y-3">
              {['successStory', 'tip', 'customRoadmap'].map(type => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={contentType === type ? 'default' : 'outline'}
                    onClick={() => setContentType(type)}
                    className={`w-full justify-start ${
                      contentType === type
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-none'
                        : 'glass-effect hover:bg-white/10'
                    }`}
                  >
                    {getContentIcon(type)}
                    <span className="ml-2">{getContentTypeLabel(type)}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-effect rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                {getContentIcon(contentType)}
                <h2 className="text-2xl font-bold gradient-text">
                  Share Your {getContentTypeLabel(contentType).slice(0, -1)}
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newContent.title}
                  onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Textarea
                  placeholder="Share your story, tip, or roadmap..."
                  value={newContent.content}
                  onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-32"
                />
                <Input
                  placeholder="Tags (comma-separated)"
                  value={newContent.tags}
                  onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Button onClick={submitContent} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Content
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {userContent.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-3xl p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {item.author[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getContentIcon(item.type)}
                        <h4 className="text-xl font-semibold gradient-text">{item.title}</h4>
                      </div>
                      <p className="text-gray-300 mb-3 leading-relaxed">{item.content}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <User className="w-4 h-4" />
                        <span>By {item.author}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tags?.map(tag => (
                          <motion.span
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-400/30 flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserContentPage;
