import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MessageSquare, Plus, Reply, User, ArrowLeft } from 'lucide-react';

const DiscussionForumsPage = () => {
  const navigate = useNavigate();
  const [forums, setForums] = useState({});
  const [selectedForum, setSelectedForum] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    // Fetch forums and posts from backend
    const fetchForums = async () => {
      try {
        const response = await fetch('http://localhost:5000/forums');
        const data = await response.json();
        setForums(data);
      } catch (error) {
        console.error('Error fetching forums:', error);
        // Fallback to mock data
        const mockForums = {
          engineering: { name: 'Engineering', posts: [] },
          biology: { name: 'Biology & Health', posts: [] },
          business: { name: 'Business & Finance', posts: [] },
        };
        setForums(mockForums);
      }
    };
    fetchForums();
  }, []);

  const selectForum = (forumKey) => {
    setSelectedForum(forumKey);
    setPosts(forums[forumKey] || []);
  };

  const submitPost = async () => {
    if (!newPost.title || !newPost.content) return;
    try {
      const response = await fetch('http://localhost:5000/forums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career: selectedForum,
          title: newPost.title,
          content: newPost.content,
          author: 'CurrentUser', // Replace with actual user
        }),
      });
      if (response.ok) {
        const updatedForums = { ...forums };
        if (!updatedForums[selectedForum]) updatedForums[selectedForum] = [];
        updatedForums[selectedForum].push({
          id: Date.now(),
          title: newPost.title,
          content: newPost.content,
          author: 'CurrentUser',
          replies: [],
        });
        setForums(updatedForums);
        setPosts(updatedForums[selectedForum]);
        setNewPost({ title: '', content: '' });
        setShowNewPostForm(false);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const submitReply = async (postId) => {
    if (!newReply) return;
    try {
      const response = await fetch(`http://localhost:5000/forums/${postId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career: selectedForum,
          content: newReply,
          author: 'CurrentUser', // Replace with actual user
        }),
      });
      if (response.ok) {
        const updatedPosts = posts.map(post =>
          post.id === postId ? { ...post, replies: [...post.replies, newReply] } : post
        );
        setPosts(updatedPosts);
        setNewReply('');
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
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
          <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold mb-4 gradient-text">Discussion Forums</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with peers, share experiences, and get answers to your career questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Career Fields</h2>
            <div className="space-y-3">
              {Object.keys(forums).map(key => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedForum === key ? 'default' : 'outline'}
                    onClick={() => selectForum(key)}
                    className={`w-full justify-start ${
                      selectedForum === key
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-none'
                        : 'glass-effect hover:bg-white/10'
                    }`}
                  >
                    {forums[key].name || key}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {selectedForum && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="glass-effect rounded-3xl p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold gradient-text">{forums[selectedForum]?.name || selectedForum} Forum</h2>
                  <Button
                    onClick={() => setShowNewPostForm(!showNewPostForm)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>

                {showNewPostForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <Input
                      placeholder="Post Title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-24"
                    />
                    <div className="flex gap-2">
                      <Button onClick={submitPost} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Submit Post
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                {posts.map(post => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-effect rounded-3xl p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {post.author[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2 gradient-text">{post.title}</h4>
                        <p className="text-gray-300 mb-3">{post.content}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <User className="w-4 h-4" />
                          <span>By {post.author}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-14">
                      <h5 className="font-semibold mb-3 text-gray-300">Replies ({post.replies?.length || 0})</h5>
                      <div className="space-y-3">
                        {post.replies?.map((reply, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/20 rounded-lg p-3 border-l-2 border-purple-400"
                          >
                            <p className="text-gray-300">{reply.content || reply}</p>
                          </motion.div>
                        ))}
                      </div>

                      {replyingTo === post.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-2"
                        >
                          <Textarea
                            placeholder="Add a reply..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => submitReply(post.id)} className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                              <Reply className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
                            <Button variant="outline" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => setReplyingTo(post.id)}
                          className="mt-3 text-purple-400 hover:text-purple-300"
                        >
                          <Reply className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForumsPage;
