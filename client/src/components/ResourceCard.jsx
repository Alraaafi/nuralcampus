// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaDownload, FaThumbsUp, FaCalendar, FaUser, FaBook, FaFilePdf, FaVideo } from 'react-icons/fa';

// const ResourceCard = ({ resource }) => {
//   const getTypeIcon = () => {
//     switch(resource.type) {
//       case 'book': return <FaBook className="text-blue-600" />;
//       case 'slide': return <FaFilePdf className="text-red-600" />;
//       case 'note': return <FaFilePdf className="text-green-600" />;
//       default: return <FaVideo className="text-purple-600" />;
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       <Link to={`/resource/${resource._id}`}>
//         <img 
//           src={resource.coverPic} 
//           alt={resource.title}
//           className="w-full h-48 object-cover"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
//           }}
//         />
//       </Link>
//       <div className="p-4">
//         <Link to={`/resource/${resource._id}`}>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600">
//             {resource.title}
//           </h3>
//         </Link>
//         <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//           <div className="flex items-center space-x-2">
//             {getTypeIcon()}
//             <span className="capitalize">{resource.type}</span>
//             <span className="mx-2">•</span>
//             <FaThumbsUp className="text-green-600" />
//             <span>{resource.reactionCount} reactions</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <FaCalendar />
//             <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <FaUser />
//             <span>{resource.username}</span>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
//               {resource.department}
//             </span>
//             <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
//               {resource.year} Year
//             </span>
//             <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
//               Semester {resource.semester}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResourceCard;






























//v4
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaThumbsUp, FaCalendar, FaUser, FaBook, FaFilePdf, FaVideo } from 'react-icons/fa';
// import axios from 'axios';

// const ResourceCard = ({ resource }) => {
//   const [userReacted, setUserReacted] = useState(false);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (token) {
//       checkUserReaction();
//     }
//   }, [resource._id]);

//   const checkUserReaction = async () => {
//     try {
//       const response = await axios.get(`/api/resources/${resource._id}/check-reaction`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserReacted(response.data.hasReacted);
//     } catch (error) {
//       // User not logged in or error
//     }
//   };

//   const getTypeIcon = () => {
//     switch(resource.type) {
//       case 'book': return <FaBook className="text-blue-600 dark:text-blue-400" />;
//       case 'slide': return <FaFilePdf className="text-red-600 dark:text-red-400" />;
//       case 'note': return <FaFilePdf className="text-green-600 dark:text-green-400" />;
//       default: return <FaVideo className="text-purple-600 dark:text-purple-400" />;
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
//       <Link to={`/resource/${resource._id}`}>
//         <img 
//           src={resource.coverPic} 
//           alt={resource.title}
//           className="w-full h-48 object-cover"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
//           }}
//         />
//       </Link>
//       <div className="p-4">
//         <Link to={`/resource/${resource._id}`}>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
//             {resource.title}
//           </h3>
//         </Link>
//         <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               {getTypeIcon()}
//               <span className="capitalize">{resource.type}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <FaThumbsUp className={`text-sm ${userReacted ? 'text-green-600' : 'text-gray-400'}`} />
//               <span>{resource.reactionCount}</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <FaCalendar className="text-xs" />
//             <span className="text-xs">{new Date(resource.uploadDate).toLocaleDateString()}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <FaUser className="text-xs" />
//             <span className="text-xs truncate">{resource.username}</span>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
//               {resource.department}
//             </span>
//             <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">
//               {resource.year} Year
//             </span>
//             <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs">
//               Sem {resource.semester}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResourceCard;



































//v5
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaCalendar, FaUser, FaBook, FaFilePdf, FaVideo } from 'react-icons/fa';
import axios from 'axios';

// Working placeholder service
const DEFAULT_IMAGE = 'https://placehold.co/400x300/3b82f6/white?text=No+Image';

const ResourceCard = ({ resource }) => {
  const [userReacted, setUserReacted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      checkUserReaction();
    }
  }, [resource._id]);

  const checkUserReaction = async () => {
    try {
      const response = await axios.get(`/api/resources/${resource._id}/check-reaction`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserReacted(response.data.hasReacted);
    } catch (error) {
      // User not logged in or error
    }
  };

  const getTypeIcon = () => {
    switch(resource.type) {
      case 'book': return <FaBook className="text-blue-600" />;
      case 'slide': return <FaFilePdf className="text-red-600" />;
      case 'note': return <FaFilePdf className="text-green-600" />;
      default: return <FaVideo className="text-purple-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/resource/${resource._id}`}>
        <img 
          src={imgError ? DEFAULT_IMAGE : (resource.coverPic || DEFAULT_IMAGE)} 
          alt={resource.title}
          className="w-full h-48 object-cover"
          onError={() => setImgError(true)}
        />
      </Link>
      <div className="p-4">
        <Link to={`/resource/${resource._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {resource.title}
          </h3>
        </Link>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getTypeIcon()}
              <span className="capitalize text-gray-700">{resource.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaThumbsUp className={`text-sm ${userReacted ? 'text-green-600' : 'text-gray-500'}`} />
              <span className="text-gray-700">{resource.reactionCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaCalendar className="text-xs" />
            <span className="text-xs">{new Date(resource.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaUser className="text-xs" />
            <span className="text-xs truncate">{resource.username}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
              {resource.department}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
              {resource.year} Year
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
              Sem {resource.semester}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;