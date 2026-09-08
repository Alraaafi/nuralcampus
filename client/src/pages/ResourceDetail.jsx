// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaDownload, FaThumbsUp, FaCalendar, FaUser, FaBook, FaArrowLeft } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ResourceDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [resource, setResource] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchResource();
//   }, [id]);

//   const fetchResource = async () => {
//     try {
//       const response = await axios.get(`/api/resources/${id}`);
//       setResource(response.data);
//     } catch (error) {
//       toast.error('Error fetching resource');
//       navigate('/e-library');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (resource?.downloadLink) {
//       window.open(resource.downloadLink, '_blank');
//       toast.success('Opening download link...');
//     }
//   };

//   const handleReaction = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please login to react');
//         navigate('/login');
//         return;
//       }
//       await axios.put(`/api/resources/${id}/reaction`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setResource({ ...resource, reactionCount: resource.reactionCount + 1 });
//       toast.success('Thanks for your reaction!');
//     } catch (error) {
//       toast.error('Error adding reaction');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!resource) return null;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <button
//         onClick={() => navigate('/e-library')}
//         className="flex items-center text-blue-600 mb-4 hover:underline"
//       >
//         <FaArrowLeft className="mr-2" /> Back to Library
//       </button>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//         <img
//           src={resource.coverPic}
//           alt={resource.title}
//           className="w-full h-96 object-cover"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/1200x400?text=Resource+Cover';
//           }}
//         />
        
//         <div className="p-6">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{resource.title}</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="space-y-2">
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <FaCalendar className="mr-2" />
//                 <span>Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <FaUser className="mr-2" />
//                 <span>Uploader: {resource.username}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <FaBook className="mr-2" />
//                 <span>Type: {resource.type}</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Department:</span> {resource.department}
//               </div>
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Year:</span> {resource.year} Year
//               </div>
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Semester:</span> {resource.semester} Semester
//               </div>
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Course:</span> {resource.courseName}
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={handleDownload}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//             >
//               <FaDownload /> Download Resource
//             </button>
//             <button
//               onClick={handleReaction}
//               className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//             >
//               <FaThumbsUp /> React ({resource.reactionCount})
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResourceDetail;


























//v4
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaDownload, FaThumbsUp, FaCalendar, FaUser, FaBook, FaArrowLeft, FaThumbsDown } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';


// const ResourceDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [resource, setResource] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasReacted, setHasReacted] = useState(false);
//   const [reactionLoading, setReactionLoading] = useState(false);
//   const token = localStorage.getItem('token');
//   const isLoggedIn = !!token;

//   useEffect(() => {
//     fetchResource();
//     if (isLoggedIn) {
//       checkUserReaction();
//     }
//   }, [id, isLoggedIn]);

//   const fetchResource = async () => {
//     try {
//       const response = await axios.get(`/api/resources/${id}`);
//       setResource(response.data);
//     } catch (error) {
//       toast.error('Error fetching resource');
//       navigate('/e-library');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkUserReaction = async () => {
//     try {
//       const response = await axios.get(`/api/resources/${id}/check-reaction`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setHasReacted(response.data.hasReacted);
//     } catch (error) {
//       console.error('Error checking reaction:', error);
//     }
//   };

//   const handleDownload = () => {
//     if (resource?.downloadLink) {
//       window.open(resource.downloadLink, '_blank');
//       toast.success('Opening download link...');
//     }
//   };

//   const handleReaction = async () => {
//     if (!isLoggedIn) {
//       toast.error('Please login to react to resources');
//       navigate('/login');
//       return;
//     }

//     setReactionLoading(true);
//     try {
//       const response = await axios.put(`/api/resources/${id}/reaction`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setHasReacted(response.data.hasReacted);
//         setResource({
//           ...resource,
//           reactionCount: response.data.reactionCount
//         });
        
//         if (response.data.hasReacted) {
//           toast.success('Thanks for your reaction!');
//         } else {
//           toast.success('Reaction removed');
//         }
//       }
//     } catch (error) {
//       toast.error('Error processing reaction');
//     } finally {
//       setReactionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!resource) return null;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <button
//         onClick={() => navigate('/e-library')}
//         className="flex items-center text-blue-600 mb-4 hover:underline group"
//       >
//         <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Library
//       </button>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//         <img
//           src={resource.coverPic}
//           alt={resource.title}
//           className="w-full h-96 object-cover"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/1200x400?text=Resource+Cover';
//           }}
//         />
//         <div className="p-6">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{resource.title}</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="space-y-2">
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <FaCalendar className="mr-2" />
//                 <span>Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <FaUser className="mr-2" />
//                 <span>Uploader: {resource.username}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <FaBook className="mr-2" />
//                 <span>Type: {resource.type}</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Department:</span> {resource.department}
//               </div>
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Year:</span> {resource.year} Year
//               </div>
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Semester:</span> {resource.semester} Semester
//               </div>
//               <div className="text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Course:</span> {resource.courseName}
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={handleDownload}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
//             >
//               <FaDownload className="group-hover:translate-y-1 transition-transform" /> Download Resource
//             </button>
            
//             <button
//               onClick={handleReaction}
//               disabled={reactionLoading}
//               className={`flex-1 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//                 hasReacted 
//                   ? 'bg-green-600 text-white hover:bg-green-700' 
//                   : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
//               } disabled:opacity-50`}
//             >
//               {reactionLoading ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               ) : (
//                 <>
//                   {hasReacted ? <FaThumbsDown /> : <FaThumbsUp />}
//                   {hasReacted ? 'Reacted' : 'React'} ({resource.reactionCount})
//                 </>
//               )}
//             </button>
//           </div>
          
//           {/* Reaction info message */}
//           {isLoggedIn && (
//             <p className="text-sm text-gray-500 dark:text-gray-500 mt-3 text-center">
//               {hasReacted 
//                 ? '✓ You have reacted to this resource. Click again to withdraw.' 
//                 : 'Click the reaction button to show your appreciation!'}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResourceDetail;































//v5.1
import CommentSection from '../components/CommentSection';

//v5
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaThumbsUp, FaCalendar, FaUser, FaBook, FaArrowLeft, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

// Working placeholder service
const DEFAULT_IMAGE = 'https://placehold.co/1200x400/3b82f6/white?text=Resource+Cover';

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionLoading, setReactionLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchResource();
    if (isLoggedIn) {
      checkUserReaction();
    }
  }, [id, isLoggedIn]);

  const fetchResource = async () => {
    try {
      const response = await axios.get(`/api/resources/${id}`);
      setResource(response.data);
    } catch (error) {
      toast.error('Error fetching resource');
      navigate('/e-library');
    } finally {
      setLoading(false);
    }
  };

  const checkUserReaction = async () => {
    try {
      const response = await axios.get(`/api/resources/${id}/check-reaction`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHasReacted(response.data.hasReacted);
    } catch (error) {
      console.error('Error checking reaction:', error);
    }
  };

  const handleDownload = () => {
    if (resource?.downloadLink) {
      window.open(resource.downloadLink, '_blank');
      toast.success('Opening download link...');
    }
  };

  const handleReaction = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to react to resources');
      navigate('/login');
      return;
    }

    setReactionLoading(true);
    try {
      const response = await axios.put(`/api/resources/${id}/reaction`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setHasReacted(response.data.hasReacted);
        setResource({
          ...resource,
          reactionCount: response.data.reactionCount
        });
        
        if (response.data.hasReacted) {
          toast.success('Thanks for your reaction!');
        } else {
          toast.success('Reaction removed');
        }
      }
    } catch (error) {
      toast.error('Error processing reaction');
    } finally {
      setReactionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/e-library')}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-all duration-300 bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 border border-blue-200 dark:border-gray-700"
      >
        <FaArrowLeft className="transition-transform group-hover:-translate-x-1" /> 
        <span>Back to Library</span>
      </button>

      {/* Main Card - Complete Dark Mode Support */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
        
        {/* Image Section */}
        <div className="relative bg-gray-100 dark:bg-gray-700">
          <img
            src={imgError ? DEFAULT_IMAGE : (resource.coverPic || DEFAULT_IMAGE)}
            alt={resource.title}
            className="w-full h-80 md:h-96 object-cover"
            onError={() => setImgError(true)}
          />
          
          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg ${
              resource.type === 'book' ? 'bg-blue-600 dark:bg-blue-500 text-white' :
              resource.type === 'slide' ? 'bg-orange-600 dark:bg-orange-500 text-white' :
              resource.type === 'note' ? 'bg-green-600 dark:bg-green-500 text-white' :
              'bg-purple-600 dark:bg-purple-500 text-white'
            }`}>
              {resource.type.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Content Section - Complete Dark Mode */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {resource.title}
          </h1>
          
          {/* Info Grid - Dark Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Left Column Info Cards */}
            <div className="space-y-3">
              {/* Upload Date Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <FaCalendar className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Upload Date</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{new Date(resource.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Uploader Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <FaUser className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded By</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{resource.username}</p>
                </div>
              </div>
              
              {/* Type Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <FaBook className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Resource Type</p>
                  <p className="font-semibold text-gray-800 dark:text-white capitalize">{resource.type}</p>
                </div>
              </div>
            </div>
            
            {/* Right Column Info Cards */}
            <div className="space-y-3">
              {/* Department Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-orange-500"></div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{resource.department}</p>
                </div>
              </div>
              
              {/* Year & Semester Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-teal-500"></div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Academic Year</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{resource.year} Year - {resource.semester} Semester</p>
                </div>
              </div>
              
              {/* Course Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-pink-500"></div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Course Name</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{resource.courseName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Dark Mode */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <FaDownload /> Download Resource
            </button>
            
            <button
              onClick={handleReaction}
              disabled={reactionLoading}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                hasReacted 
                  ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {reactionLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  {hasReacted ? <FaThumbsDown /> : <FaThumbsUp />}
                  {hasReacted ? 'Reacted' : 'React'} ({resource.reactionCount})
                </>
              )}
            </button>
          </div>
          
          {/* Reaction Info Message - Dark Mode */}
          {isLoggedIn && (
            <div className={`text-center p-3 rounded-lg ${
              hasReacted 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
            }`}>
              <p className={`text-sm ${
                hasReacted 
                  ? 'text-green-700 dark:text-green-400' 
                  : 'text-blue-700 dark:text-blue-400'
              }`}>
                {hasReacted 
                  ? '✓ You have reacted to this resource. Click again to withdraw.' 
                  : '💡 Click the reaction button to show your appreciation!'}
              </p>
            </div>
          )}
          
          {/* Not Logged In Message - Dark Mode */}
          {!isLoggedIn && (
            <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🔒 Please <button onClick={() => navigate('/login')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">login</button> to react to this resource
              </p>
            </div>
          )}
        </div>
      </div>

          
<CommentSection resourceId={id} />

    </div>
  );
};

export default ResourceDetail;