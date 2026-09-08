import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaCalendar, FaQuoteLeft, FaQuoteRight, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [topFeedbacks, setTopFeedbacks] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchFeedbacks();
    fetchTopFeedbacks();
    fetchStats();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback?limit=6');
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback/top?limit=10');
      setTopFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error('Error fetching top feedbacks:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/feedback/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Please login to submit feedback');
      return;
    }
    
    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setSubmitting(true);
    try {
      await axios.post('/api/feedback/submit', {
        userName: user.fullName,
        userEmail: user.email,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Thank you for your feedback!');
      setFormData({ rating: 0, title: '', comment: '' });
      setShowForm(false);
      fetchStats();
      fetchTopFeedbacks();
    } catch (error) {
      toast.error('Error submitting feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null, onHover = null, size = 'text-2xl') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            onMouseEnter={() => interactive && onHover && onHover(star)}
            onMouseLeave={() => interactive && onHover && onHover(0)}
            className={interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
            disabled={!interactive}
          >
            <FaStar
              className={`${size} ${
                (interactive ? hoverRating : rating) >= star
                  ? 'text-yellow-400'
                  : rating >= star
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              } transition-colors ${interactive ? 'hover:text-yellow-500' : ''}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Top 10 Reviews Section - Before the main feedback section */}
      {topFeedbacks.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              ⭐ Top Rated Reviews
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what our top contributors are saying about NuralCampus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topFeedbacks.slice(0, 6).map((feedback, index) => (
              <div
                key={feedback._id}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {feedback.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{feedback.userName}</h4>
                      <div className="flex">
                        {renderStars(feedback.rating, false, null, null, 'text-sm')}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaCalendar size={10} />
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 text-sm line-clamp-1">
                  {feedback.title}
                </h5>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {feedback.comment}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <FaThumbsUp className="group-hover:text-blue-500 transition-colors" />
                  <span>Helpful</span>
                </div>
              </div>
            ))}
          </div>

          {topFeedbacks.length > 6 && (
            <div className="text-center mt-6">
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                View All {topFeedbacks.length} Reviews →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Feedback Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mt-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of satisfied learners using NuralCampus
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-2xl ${
                      star <= Math.round(stats.averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              ({stats.totalReviews} reviews)
            </div>
          </div>
        </div>

        {/* Submit Feedback Button */}
        {!showForm ? (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Share Your Experience
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Write a Review</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Your Rating</label>
                {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }), setHoverRating)}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Review Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Summarize your experience"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Your Review</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Tell us about your experience with NuralCampus..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* All Feedbacks Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback, index) => (
              <div
                key={feedback._id}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 feedback-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {feedback.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{feedback.userName}</h4>
                      <div className="flex">
                        {renderStars(feedback.rating, false, null, null, 'text-sm')}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <FaCalendar className="inline mr-1 text-xs" />
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h5 className="font-bold text-gray-800 dark:text-white mb-2">{feedback.title}</h5>
                <div className="relative">
                  <FaQuoteLeft className="text-blue-300 dark:text-blue-600 text-xl absolute -top-1 -left-1 opacity-50" />
                  <p className="text-gray-600 dark:text-gray-300 pl-6 leading-relaxed">
                    {feedback.comment}
                  </p>
                  <FaQuoteRight className="text-blue-300 dark:text-blue-600 text-xl absolute -bottom-1 -right-1 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackSection;