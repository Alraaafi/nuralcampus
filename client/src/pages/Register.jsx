import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaBook } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = ({ onLogin }) => {  // Add onLogin prop
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    institute: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const departments = ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await axios.post('/api/auth/register', formData);
    
    if (response.data.token && response.data.user) {
      onLogin(response.data.token, response.data.user);
      toast.success('Registration successful! Welcome to NuralCampus!');
      navigate('/');
    } else {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Institute</label>
          <div className="relative">
            <FaUniversity className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Department</label>
          <div className="relative">
            <FaBook className="absolute left-3 top-3 text-gray-400" />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;