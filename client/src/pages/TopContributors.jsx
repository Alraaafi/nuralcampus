import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUser, FaUpload, FaMedal, FaStar, FaAward } from 'react-icons/fa';
import axios from 'axios';

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      const response = await axios.get('/api/resources/top-contributors');
      setContributors(response.data);
    } catch (error) {
      console.error('Error fetching contributors:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalColor = (position) => {
    switch(position) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-orange-500';
      default: return 'text-blue-500';
    }
  };

  const getMedalIcon = (position) => {
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return `${position + 1}`;
  };

  const getRankBadge = (position) => {
    if (position === 0) return <FaCrown className="text-yellow-500 text-2xl" />;
    if (position === 1) return <FaMedal className="text-gray-400 text-2xl" />;
    if (position === 2) return <FaMedal className="text-orange-500 text-2xl" />;
    return <span className="text-lg font-bold text-gray-500">{position + 1}</span>;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading top contributors...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Top Contributors</h1>
        <p className="text-gray-600 dark:text-gray-400">Meet our most active community members</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top 3 Contributors Highlight */}
        {contributors.slice(0, 3).map((contributor, index) => (
          <div key={contributor.username} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
              <div className="p-6 text-center">
                <div className="relative inline-block">
                  <img
                    src={contributor.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.username}`}
                    alt={contributor.fullName}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-500 object-cover"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.username}`;
                    }}
                  />
                  <div className="absolute -top-2 -right-2">
                    <div className={`text-3xl ${getMedalColor(index)}`}>
                      {getMedalIcon(index)}
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-4">{contributor.fullName}</h2>
                <p className="text-gray-600 dark:text-gray-400">@{contributor.username}</p>
                <div className="mt-3 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">{contributor.department}</span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <FaUpload className="text-green-600" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{contributor.uploadCount}</span>
                  <span className="text-gray-600 dark:text-gray-400">resources</span>
                </div>
                <Link
                  to={`/profile/${contributor.username}`}
                  className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-xl font-bold text-white">Complete Leaderboard</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Resources
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contributors.map((contributor, index) => (
                <tr key={contributor.username} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index < 3 ? (
                        <FaTrophy className={`${getMedalColor(index)} mr-2 text-xl`} />
                      ) : (
                        <span className="text-gray-400 mr-2">#{index + 1}</span>
                      )}
                      <span className="text-lg font-semibold">{getMedalIcon(index)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={contributor.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.username}`}
                        alt={contributor.fullName}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.username}`;
                        }}
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{contributor.fullName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">@{contributor.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                      {contributor.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaUpload className="mr-2 text-green-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">{contributor.uploadCount}</span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">uploads</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/profile/${contributor.username}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                    >
                      View Profile →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {contributors.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <FaUser className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No contributors yet</h3>
          <p className="text-gray-600 dark:text-gray-400">Be the first to upload resources and get featured!</p>
          <Link
            to="/upload"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopContributors;