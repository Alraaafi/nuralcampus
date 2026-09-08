import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaThumbsUp, FaTrash, FaEdit, FaReply, FaSave, FaTimes, FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const CommentSection = ({ resourceId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchComments();
  }, [resourceId, currentPage]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/comments/${resourceId}?page=${currentPage}&limit=10`);
      setComments(response.data.comments);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Error loading comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please login to comment');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('/api/comments/add', {
        resourceId,
        comment: newComment
      }, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Comment added successfully');
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error adding comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Comment deleted');
      fetchComments();
    } catch (error) {
      toast.error('Error deleting comment');
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!isLoggedIn) {
      toast.error('Please login to like comments');
      return;
    }

    try {
      await axios.put(`/api/comments/${commentId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments();
    } catch (error) {
      toast.error('Error liking comment');
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) {
      toast.error('Please enter comment text');
      return;
    }

    try {
      await axios.put(`/api/comments/${commentId}/edit`, {
        comment: editText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Comment updated');
      setEditingCommentId(null);
      setEditText('');
      fetchComments();
    } catch (error) {
      toast.error('Error updating comment');
    }
  };

  const handleAddReply = async (commentId) => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    try {
      await axios.post(`/api/comments/${commentId}/reply`, {
        reply: replyText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Reply added');
      setReplyToId(null);
      setReplyText('');
      fetchComments();
    } catch (error) {
      toast.error('Error adding reply');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user profile link
  const getUserProfileLink = (username) => {
    return `/profile/${username}`;
  };

  // Get user avatar URL
  const getUserAvatar = (comment) => {
    if (comment.userAvatar) {
      return comment.userAvatar;
    }
    if (comment.userId?.profilePic) {
      return comment.userId.profilePic;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userName}`;
  };

  // Get username from comment
  const getUsername = (comment) => {
    if (comment.userId?.username) {
      return comment.userId.username;
    }
    return comment.userName?.toLowerCase().replace(/\s/g, '') || 'user';
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaReply className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              <img
                src={user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                alt={user?.fullName}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`;
                }}
              />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this resource..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Please <button onClick={() => window.location.href='/login'} className="text-blue-600 hover:underline">login</button> to join the discussion
          </p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
              <div className="flex gap-3">
                {/* Clickable Profile Picture */}
                <Link to={getUserProfileLink(getUsername(comment))} className="flex-shrink-0 group">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300">
                    <img
                      src={getUserAvatar(comment)}
                      alt={comment.userName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userName}`;
                      }}
                    />
                  </div>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <div>
                      {/* Clickable Username */}
                      <Link 
                        to={getUserProfileLink(getUsername(comment))}
                        className="font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {comment.userName}
                      </Link>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        <FaCalendar className="inline mr-1" size={10} />
                        {formatDate(comment.createdAt)}
                      </span>
                      {comment.isEdited && (
                        <span className="text-xs text-gray-400 ml-2">(edited)</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLikeComment(comment._id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        {comment.likes?.includes(user?._id) ? (
                          <FaThumbsUp className="text-blue-600" size={14} />
                        ) : (
                          <FaRegThumbsUp size={14} />
                        )}
                        <span className="text-sm">{comment.likes?.length || 0}</span>
                      </button>
                      {isLoggedIn && comment.userId?._id === user?._id && (
                        <>
                          <button
                            onClick={() => {
                              setEditingCommentId(comment._id);
                              setEditText(comment.comment);
                            }}
                            className="text-gray-500 hover:text-green-600 transition-colors"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <FaTrash size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setReplyToId(replyToId === comment._id ? null : comment._id)}
                        className="text-gray-500 hover:text-purple-600 transition-colors"
                      >
                        <FaReply size={14} />
                      </button>
                    </div>
                  </div>

                  {editingCommentId === comment._id ? (
                    <div className="mt-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        rows="3"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          <FaSave className="inline mr-1" size={12} /> Save
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          <FaTimes className="inline mr-1" size={12} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.comment}
                    </p>
                  )}

                  {/* Replies Section */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-8 mt-3 space-y-3">
                      {comment.replies.map((reply, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-gray-800 dark:text-white">
                              {reply.userName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(reply.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                {reply.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                  {/* Reply Form */}
                  {replyToId === comment._id && (
                    <div className="ml-8 mt-3">
                      <div className="flex gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          rows="2"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleAddReply(comment._id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => setReplyToId(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 dark:border-gray-700"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 dark:border-gray-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to start the discussion!
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;