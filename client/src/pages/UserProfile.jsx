// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaUniversity, FaBook, FaCalendar, FaEdit, FaSave, FaTimes, FaUpload } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const UserProfile = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
  
//   // Get current user from localStorage
//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       toast.error('Please login to view profile');
//       navigate('/login');
//       return;
//     }
//     fetchProfile();
//   }, [username, token]);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get(`/api/users/profile/${username}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setEditForm(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//         navigate('/login');
//       } else {
//         toast.error('Error fetching profile');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditForm(profile);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put('/api/auth/profile', editForm, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
      
//       // Update local storage if it's the current user
//       if (currentUser.username === username) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//     } catch (error) {
//       toast.error('Error updating profile');
//     }
//   };

//   const handleChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600 dark:text-gray-400">User not found</p>
//       </div>
//     );
//   }

//   const isOwnProfile = currentUser?.username === username;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//         {/* Profile Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={profile.profilePic}
//                 alt={profile.fullName}
//                 className="w-24 h-24 rounded-full border-4 border-white"
//                 onError={(e) => {
//                   e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.username;
//                 }}
//               />
//               <div>
//                 <h1 className="text-2xl font-bold">{profile.fullName}</h1>
//                 <p className="text-blue-100">@{profile.username}</p>
//               </div>
//             </div>
//             {isOwnProfile && !isEditing && (
//               <button
//                 onClick={handleEdit}
//                 className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
//               >
//                 <FaEdit /> Edit Profile
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Profile Info */}
//         <div className="p-6">
//           {isEditing ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={editForm.fullName}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editForm.email}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">Institute</label>
//                 <input
//                   type="text"
//                   name="institute"
//                   value={editForm.institute}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">Department</label>
//                 <select
//                   name="department"
//                   value={editForm.department}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 >
//                   <option value="CSE">CSE</option>
//                   <option value="EEE">EEE</option>
//                   <option value="MATH">MATH</option>
//                   <option value="Fisheries">Fisheries</option>
//                   <option value="Social Work">Social Work</option>
//                   <option value="Management">Management</option>
//                   <option value="Geology">Geology</option>
//                 </select>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleSave}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
//                 >
//                   <FaSave /> Save
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
//                 >
//                   <FaTimes /> Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-3">
//                 <div className="flex items-center text-gray-600 dark:text-gray-400">
//                   <FaUser className="mr-3 text-blue-600" />
//                   <span className="font-semibold mr-2">Name:</span> {profile.fullName}
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-400">
//                   <FaEnvelope className="mr-3 text-blue-600" />
//                   <span className="font-semibold mr-2">Email:</span> {profile.email}
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-400">
//                   <FaUniversity className="mr-3 text-blue-600" />
//                   <span className="font-semibold mr-2">Institute:</span> {profile.institute}
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center text-gray-600 dark:text-gray-400">
//                   <FaBook className="mr-3 text-blue-600" />
//                   <span className="font-semibold mr-2">Department:</span> {profile.department}
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-400">
//                   <FaUpload className="mr-3 text-green-600" />
//                   <span className="font-semibold mr-2">Total Uploads:</span> {profile.uploadCount}
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-400">
//                   <FaCalendar className="mr-3 text-blue-600" />
//                   <span className="font-semibold mr-2">Member Since:</span> {new Date(profile.createdAt).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;






























//v0
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaUniversity, FaBook, FaCalendar, FaEdit, FaSave, FaTimes, FaUpload, FaPlus } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UploadCard from '../components/UploadCard';

// const UserProfile = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [userResources, setUserResources] = useState([]);
//   const [loadingResources, setLoadingResources] = useState(false);
  
//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       toast.error('Please login to view profile');
//       navigate('/login');
//       return;
//     }
//     fetchProfile();
//     fetchUserResources();
//   }, [username, token]);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get(`/api/users/profile/${username}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setEditForm(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//         navigate('/login');
//       } else {
//         toast.error('Error fetching profile');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserResources = async () => {
//     setLoadingResources(true);
//     try {
//       const response = await axios.get(`/api/resources?username=${username}&limit=6`);
//       setUserResources(response.data.resources);
//     } catch (error) {
//       console.error('Error fetching user resources:', error);
//     } finally {
//       setLoadingResources(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditForm(profile);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put('/api/auth/profile', editForm, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
      
//       if (currentUser.username === username) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//     } catch (error) {
//       toast.error('Error updating profile');
//     }
//   };

//   const handleChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600 dark:text-gray-400">User not found</p>
//       </div>
//     );
//   }

//   const isOwnProfile = currentUser?.username === username;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Profile Info */}
//         <div className="lg:col-span-2">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//             {/* Profile Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={profile.profilePic}
//                     alt={profile.fullName}
//                     className="w-24 h-24 rounded-full border-4 border-white"
//                     onError={(e) => {
//                       e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.username;
//                     }}
//                   />
//                   <div>
//                     <h1 className="text-2xl font-bold">{profile.fullName}</h1>
//                     <p className="text-blue-100">@{profile.username}</p>
//                   </div>
//                 </div>
//                 {isOwnProfile && !isEditing && (
//                   <button
//                     onClick={handleEdit}
//                     className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <FaEdit /> Edit Profile
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Profile Info */}
//             <div className="p-6">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={editForm.fullName}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Institute</label>
//                     <input
//                       type="text"
//                       name="institute"
//                       value={editForm.institute}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Department</label>
//                     <select
//                       name="department"
//                       value={editForm.department}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     >
//                       <option value="CSE">CSE</option>
//                       <option value="EEE">EEE</option>
//                       <option value="MATH">MATH</option>
//                       <option value="Fisheries">Fisheries</option>
//                       <option value="Social Work">Social Work</option>
//                       <option value="Management">Management</option>
//                       <option value="Geology">Geology</option>
//                     </select>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSave}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
//                     >
//                       <FaSave /> Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
//                     >
//                       <FaTimes /> Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-3">
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaUser className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Name:</span> {profile.fullName}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaEnvelope className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Email:</span> {profile.email}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaUniversity className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Institute:</span> {profile.institute}
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaBook className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Department:</span> {profile.department}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaUpload className="mr-3 text-green-600" />
//                       <span className="font-semibold mr-2">Total Uploads:</span> {profile.uploadCount}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaCalendar className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Member Since:</span> {new Date(profile.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Upload Card & Stats */}
//         <div className="space-y-6">
//           {/* Upload Card - Only for own profile */}
//           {isOwnProfile && <UploadCard />}
          
//           {/* Stats Card */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contributor Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 dark:text-gray-400">Total Uploads</span>
//                 <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.uploadCount}</span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className="bg-blue-600 rounded-full h-2" 
//                   style={{ width: `${Math.min(100, (profile.uploadCount / 50) * 100)}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
//                 {profile.uploadCount < 10 ? 'Keep uploading to reach Contributor status!' : 'Great job! You\'re a valuable contributor!'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* User's Recent Resources */}
//       {userResources.length > 0 && (
//         <div className="mt-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Uploads by {profile.fullName}</h2>
//             <Link to="/e-library" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
//               View All Resources →
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {userResources.map(resource => (
//               <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
//                 <Link to={`/resource/${resource._id}`}>
//                   <img 
//                     src={resource.coverPic} 
//                     alt={resource.title}
//                     className="w-full h-40 object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
//                     }}
//                   />
//                 </Link>
//                 <div className="p-4">
//                   <Link to={`/resource/${resource._id}`}>
//                     <h3 className="font-semibold text-gray-800 dark:text-white hover:text-blue-600">{resource.title}</h3>
//                   </Link>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.type}</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-xs text-gray-500 dark:text-gray-500">{new Date(resource.uploadDate).toLocaleDateString()}</span>
//                     <Link to={`/resource/${resource._id}`} className="text-blue-600 text-sm hover:underline">
//                       View Details →
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;



























//v1
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaUniversity, FaBook, FaCalendar, FaEdit, FaSave, FaTimes, FaUpload, FaPlus, FaCamera, FaTrash } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UploadCard from '../components/UploadCard';

// const UserProfile = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [userResources, setUserResources] = useState([]);
//   const [loadingResources, setLoadingResources] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const fileInputRef = useRef(null);
  
//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       toast.error('Please login to view profile');
//       navigate('/login');
//       return;
//     }
//     fetchProfile();
//     fetchUserResources();
//   }, [username, token]);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get(`/api/users/profile/${username}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setEditForm(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//         navigate('/login');
//       } else {
//         toast.error('Error fetching profile');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserResources = async () => {
//     setLoadingResources(true);
//     try {
//       const response = await axios.get(`/api/resources?username=${username}&limit=6`);
//       setUserResources(response.data.resources);
//     } catch (error) {
//       console.error('Error fetching user resources:', error);
//     } finally {
//       setLoadingResources(false);
//     }
//   };

//   const handleProfilePictureUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File size should be less than 5MB');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('profilePic', file);

//     setUploadingImage(true);
//     try {
//       const response = await axios.post('/api/upload-profile-pic', formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       setProfile(response.data.user);
//       toast.success('Profile picture updated successfully!');
      
//       // Update local storage
//       if (currentUser.username === username) {
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error uploading image');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditForm(profile);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put('/api/auth/profile', editForm, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
      
//       if (currentUser.username === username) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//     } catch (error) {
//       toast.error('Error updating profile');
//     }
//   };

//   const handleChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600 dark:text-gray-400">User not found</p>
//       </div>
//     );
//   }

//   const isOwnProfile = currentUser?.username === username;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Profile Info */}
//         <div className="lg:col-span-2">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//             {/* Profile Header with Editable Picture */}
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   {/* Profile Picture with Upload Option */}
//                   <div className="relative group">
//                     <img
//                       src={profile.profilePic}
//                       alt={profile.fullName}
//                       className="w-24 h-24 rounded-full border-4 border-white object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.username;
//                       }}
//                     />
//                     {isOwnProfile && (
//                       <>
//                         <button
//                           onClick={() => fileInputRef.current.click()}
//                           className="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
//                           disabled={uploadingImage}
//                         >
//                           <FaCamera size={14} />
//                         </button>
//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           onChange={handleProfilePictureUpload}
//                           accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//                           className="hidden"
//                         />
//                       </>
//                     )}
//                   </div>
//                   <div>
//                     <h1 className="text-2xl font-bold">{profile.fullName}</h1>
//                     <p className="text-blue-100">@{profile.username}</p>
//                   </div>
//                 </div>
//                 {isOwnProfile && !isEditing && (
//                   <button
//                     onClick={handleEdit}
//                     className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 transition-colors"
//                   >
//                     <FaEdit /> Edit Profile
//                   </button>
//                 )}
//               </div>
              
//               {/* Uploading indicator */}
//               {uploadingImage && (
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
//                   <div className="bg-white rounded-lg p-3 flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//                     <span className="text-gray-800">Uploading...</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Profile Info */}
//             <div className="p-6">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={editForm.fullName}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Institute</label>
//                     <input
//                       type="text"
//                       name="institute"
//                       value={editForm.institute}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Department</label>
//                     <select
//                       name="department"
//                       value={editForm.department}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500"
//                     >
//                       <option value="CSE">CSE</option>
//                       <option value="EEE">EEE</option>
//                       <option value="MATH">MATH</option>
//                       <option value="Fisheries">Fisheries</option>
//                       <option value="Social Work">Social Work</option>
//                       <option value="Management">Management</option>
//                       <option value="Geology">Geology</option>
//                     </select>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSave}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
//                     >
//                       <FaSave /> Save Changes
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2 transition-colors"
//                     >
//                       <FaTimes /> Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-3">
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaUser className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Name:</span> {profile.fullName}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaEnvelope className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Email:</span> {profile.email}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaUniversity className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Institute:</span> {profile.institute}
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaBook className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Department:</span> {profile.department}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaUpload className="mr-3 text-green-600" />
//                       <span className="font-semibold mr-2">Total Uploads:</span> {profile.uploadCount}
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <FaCalendar className="mr-3 text-blue-600" />
//                       <span className="font-semibold mr-2">Member Since:</span> {new Date(profile.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Upload Card & Stats */}
//         <div className="space-y-6">
//           {/* Upload Card - Only for own profile */}
//           {isOwnProfile && <UploadCard />}
          
//           {/* Stats Card */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contributor Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 dark:text-gray-400">Total Uploads</span>
//                 <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.uploadCount}</span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className="bg-blue-600 rounded-full h-2 transition-all duration-500" 
//                   style={{ width: `${Math.min(100, (profile.uploadCount / 50) * 100)}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
//                 {profile.uploadCount < 10 
//                   ? '📚 Keep uploading to reach Contributor status!' 
//                   : profile.uploadCount < 30 
//                   ? '⭐ Great job! You\'re a valuable contributor!' 
//                   : '🏆 Excellent! You\'re a top contributor!'}
//               </p>
//             </div>
//           </div>

//           {/* Profile Tips Card */}
//           {isOwnProfile && (
//             <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-4 border border-blue-200 dark:border-blue-800">
//               <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Profile Tips</h4>
//               <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
//                 <li>• Click the camera icon to update your profile picture</li>
//                 <li>• Keep your information up to date</li>
//                 <li>• Share resources to increase your upload count</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* User's Recent Resources */}
//       {userResources.length > 0 && (
//         <div className="mt-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Uploads by {profile.fullName}</h2>
//             <Link to="/e-library" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
//               View All Resources →
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {userResources.map(resource => (
//               <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
//                 <Link to={`/resource/${resource._id}`}>
//                   <img 
//                     src={resource.coverPic} 
//                     alt={resource.title}
//                     className="w-full h-40 object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
//                     }}
//                   />
//                 </Link>
//                 <div className="p-4">
//                   <Link to={`/resource/${resource._id}`}>
//                     <h3 className="font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition-colors">
//                       {resource.title}
//                     </h3>
//                   </Link>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">{resource.type}</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-xs text-gray-500 dark:text-gray-500">
//                       {new Date(resource.uploadDate).toLocaleDateString()}
//                     </span>
//                     <Link to={`/resource/${resource._id}`} className="text-blue-600 text-sm hover:underline">
//                       View Details →
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


































//v5
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaUniversity, FaBook, FaCalendar, FaEdit, FaSave, FaTimes, FaUpload, FaCamera, FaChartLine, FaAward, FaHeart, FaDownload } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UploadCard from '../components/UploadCard';

// const UserProfile = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [userResources, setUserResources] = useState([]);
//   const [loadingResources, setLoadingResources] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const fileInputRef = useRef(null);
  
//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       toast.error('Please login to view profile');
//       navigate('/login');
//       return;
//     }
//     fetchProfile();
//     fetchUserResources();
//   }, [username, token]);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get(`/api/users/profile/${username}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setEditForm(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//         navigate('/login');
//       } else {
//         toast.error('Error fetching profile');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserResources = async () => {
//     setLoadingResources(true);
//     try {
//       const response = await axios.get(`/api/resources?username=${username}&limit=6`);
//       setUserResources(response.data.resources);
//     } catch (error) {
//       console.error('Error fetching user resources:', error);
//     } finally {
//       setLoadingResources(false);
//     }
//   };

//   const handleProfilePictureUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File size should be less than 5MB');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('profilePic', file);

//     setUploadingImage(true);
//     try {
//       const response = await axios.post('/api/upload-profile-pic', formData, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       if (response.data.success) {
//         setProfile(response.data.user);
        
//         const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//         if (currentUser.username === username) {
//           localStorage.setItem('user', JSON.stringify(response.data.user));
//         }
        
//         toast.success('Profile picture updated successfully!');
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error(error.response?.data?.message || 'Error uploading image');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditForm(profile);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put('/api/auth/profile', editForm, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
      
//       if (currentUser.username === username) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//     } catch (error) {
//       toast.error('Error updating profile');
//     }
//   };

//   const handleChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 dark:border-blue-500"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <FaUser className="text-blue-600 dark:text-blue-500 text-3xl" />
//             </div>
//           </div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
//           <FaUser className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">User not found</p>
//           <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//             Go Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const isOwnProfile = currentUser?.username === username;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         {/* Profile Header Card */}
//         <div className="relative mb-8">
//           {/* Background Cover */}
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 rounded-3xl overflow-hidden">
//             <div className="absolute inset-0 opacity-10" style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundRepeat: 'repeat'
//             }}></div>
//           </div>
          
//           {/* Profile Content */}
//           <div className="relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20 dark:border-gray-700">
//             <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
//               {/* Profile Picture */}
//               <div className="relative group">
//                 <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white dark:bg-gray-900 p-1 shadow-2xl">
//                   <img
//                     src={profile.profilePic || 'https://placehold.co/200x200/8b5cf6/white?text=User'}
//                     alt={profile.fullName}
//                     className="w-full h-full rounded-xl object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://placehold.co/200x200/8b5cf6/white?text=User';
//                     }}
//                   />
//                 </div>
//                 {isOwnProfile && (
//                   <>
//                     <button
//                       onClick={() => fileInputRef.current.click()}
//                       className="absolute bottom-1 right-1 bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
//                       disabled={uploadingImage}
//                     >
//                       <FaCamera size={14} />
//                     </button>
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       onChange={handleProfilePictureUpload}
//                       accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//                       className="hidden"
//                     />
//                   </>
//                 )}
//               </div>
              
//               {/* User Info */}
//               <div className="flex-1">
//                 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{profile.fullName}</h1>
//                 <p className="text-blue-100 dark:text-blue-300 mb-3 text-lg">@{profile.username}</p>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-300 rounded-full text-sm font-medium">
//                     <FaBook size={12} />
//                     {profile.department}
//                   </span>
//                   <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-300 rounded-full text-sm font-medium">
//                     <FaUniversity size={12} />
//                     {profile.institute}
//                   </span>
//                   <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-300 rounded-full text-sm font-medium">
//                     <FaCalendar size={12} />
//                     Joined {new Date(profile.createdAt).getFullYear()}
//                   </span>
//                 </div>
//               </div>
              
//               {/* Edit Button */}
//               {isOwnProfile && !isEditing && (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   <FaEdit size={16} /> Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Profile Information Card */}
//             <div className="bg-white dark:bg-white rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-200 hover:shadow-2xl transition-all duration-300">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
//                   <FaUser className="text-white text-lg" />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800">Profile Information</h2>
//               </div>
              
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Full Name</label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={editForm.fullName}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Institute</label>
//                     <input
//                       type="text"
//                       name="institute"
//                       value={editForm.institute}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Department</label>
//                     <select
//                       name="department"
//                       value={editForm.department}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
//                     >
//                       <option value="CSE">CSE</option>
//                       <option value="EEE">EEE</option>
//                       <option value="MATH">MATH</option>
//                       <option value="Fisheries">Fisheries</option>
//                       <option value="Social Work">Social Work</option>
//                       <option value="Management">Management</option>
//                       <option value="Geology">Geology</option>
//                     </select>
//                   </div>
//                   <div className="flex gap-3 pt-3">
//                     <button
//                       onClick={handleSave}
//                       className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md"
//                     >
//                       <FaSave size={14} /> Save Changes
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
//                     >
//                       <FaTimes size={14} /> Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <FaUser className="text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
//                         <p className="font-semibold text-gray-800">{profile.fullName}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
//                       <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                         <FaEnvelope className="text-purple-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
//                         <p className="font-semibold text-gray-800">{profile.email}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
//                       <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                         <FaUniversity className="text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Institute</p>
//                         <p className="font-semibold text-gray-800">{profile.institute}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
//                       <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                         <FaBook className="text-orange-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Department</p>
//                         <p className="font-semibold text-gray-800">{profile.department}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Recent Resources Card */}
//             {userResources.length > 0 && (
//               <div className="bg-white dark:bg-white rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-200 hover:shadow-2xl transition-all duration-300">
//                 <div className="flex justify-between items-center mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
//                       <FaUpload className="text-white text-lg" />
//                     </div>
//                     <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800">Recent Uploads</h2>
//                   </div>
//                   <Link to="/e-library" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
//                     View All <span className="group-hover:translate-x-1 transition-transform">→</span>
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {userResources.slice(0, 4).map(resource => (
//                     <Link key={resource._id} to={`/resource/${resource._id}`} className="group">
//                       <div className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-100 transition-all duration-300">
//                         <img 
//                           src={resource.coverPic} 
//                           alt={resource.title}
//                           className="w-16 h-16 rounded-lg object-cover"
//                           onError={(e) => {
//                             e.target.src = 'https://placehold.co/400x200/3b82f6/white?text=No+Image';
//                           }}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
//                             {resource.title}
//                           </h4>
//                           <p className="text-xs text-gray-500 mt-1 capitalize">{resource.type}</p>
//                           <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                             <FaCalendar size={10} /> {new Date(resource.uploadDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <FaDownload className="text-gray-400 group-hover:text-blue-600 transition-colors" />
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Stats & Actions */}
//           <div className="space-y-6">
//             {/* Stats Card */}
//             <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                   <FaChartLine className="text-white text-lg" />
//                 </div>
//                 <h3 className="text-lg font-bold">Contributor Stats</h3>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm opacity-90">Total Uploads</p>
//                   <p className="text-4xl font-bold">{profile.uploadCount}</p>
//                 </div>
//                 <div className="w-full bg-white/30 rounded-full h-2">
//                   <div 
//                     className="bg-white rounded-full h-2 transition-all duration-1000" 
//                     style={{ width: `${Math.min(100, (profile.uploadCount / 50) * 100)}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-sm opacity-90">
//                   {profile.uploadCount < 10 
//                     ? '📚 Upload 10+ resources to become a Contributor' 
//                     : profile.uploadCount < 30 
//                     ? '⭐ Great job! You\'re a valuable contributor!' 
//                     : '🏆 Excellent! You\'re a top contributor!'}
//                 </p>
//               </div>
//             </div>

//             {/* Upload Card */}
//             {isOwnProfile && <UploadCard />}

//             {/* Achievement Badges */}
//             {profile.uploadCount > 0 && (
//               <div className="bg-white dark:bg-white rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
//                     <FaAward className="text-yellow-600 text-lg" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 dark:text-gray-800">Achievements</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {profile.uploadCount >= 1 && (
//                     <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-1">
//                       🎓 First Upload
//                     </span>
//                   )}
//                   {profile.uploadCount >= 10 && (
//                     <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
//                       ⭐ Rising Star
//                     </span>
//                   )}
//                   {profile.uploadCount >= 30 && (
//                     <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center gap-1">
//                       🏆 Top Contributor
//                     </span>
//                   )}
//                   {profile.uploadCount >= 50 && (
//                     <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium flex items-center gap-1">
//                       👑 Legend
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Profile Tips */}
//             {isOwnProfile && (
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-50 dark:to-purple-50 rounded-2xl shadow-xl p-5 border border-blue-100 dark:border-blue-100">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//                     <FaHeart className="text-red-500" />
//                   </div>
//                   <h4 className="font-semibold text-gray-800 dark:text-gray-800">Pro Tips</h4>
//                 </div>
//                 <ul className="text-sm text-gray-700 dark:text-gray-700 space-y-2">
//                   <li className="flex items-center gap-2">📸 Click the camera icon to update your profile picture</li>
//                   <li className="flex items-center gap-2">✏️ Keep your information up to date</li>
//                   <li className="flex items-center gap-2">📤 Share resources to increase your upload count</li>
//                   <li className="flex items-center gap-2">❤️ React to resources to help the community</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;




































//v6
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUniversity, FaBook, FaCalendar, FaEdit, FaSave, FaTimes, FaUpload, FaCamera, FaChartLine, FaAward, FaHeart, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import UploadCard from '../components/UploadCard';

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [userResources, setUserResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResources, setTotalResources] = useState(0);
  const fileInputRef = useRef(null);
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (!token) {
      toast.error('Please login to view profile');
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [username, token]);

useEffect(() => {
    if (profile && username) {
        fetchUserResources();
    }
}, [username, currentPage, profile]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/users/profile/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setEditForm(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error('Error fetching profile');
      }
    } finally {
      setLoading(false);
    }
  };

const fetchUserResources = async () => {
    setLoadingResources(true);
    try {
        if (!username) {
            console.error('No username provided');
            setLoadingResources(false);
            return;
        }
        
        console.log('Fetching resources for username:', username);
        console.log('Current page:', currentPage);
        
        const response = await axios.get(`/api/resources/user/${username}`, {
            params: {
                page: currentPage,
                limit: ITEMS_PER_PAGE
            }
        });
        
        console.log('Resources response:', response.data);
        
        if (response.data && response.data.resources) {
            setUserResources(response.data.resources);
            setTotalPages(response.data.totalPages || 1);
            setTotalResources(response.data.total || 0);
        } else {
            setUserResources([]);
            setTotalPages(1);
            setTotalResources(0);
        }
    } catch (error) {
        console.error('Error fetching user resources:', error);
        console.error('Error details:', error.response?.data);
        setUserResources([]);
        setTotalPages(1);
        setTotalResources(0);
        toast.error('Error loading resources');
    } finally {
        setLoadingResources(false);
    }
};

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', file);

    setUploadingImage(true);
    try {
      const response = await axios.post('/api/upload-profile-pic', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setProfile(response.data.user);
        
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (currentUser.username === username) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        toast.success('Profile picture updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response?.status === 401) {
        toast.error('Your session expired. Please log in again.');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Error uploading image');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/auth/profile', editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      
      if (currentUser.username === username) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalResources);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 dark:border-blue-500"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FaUser className="text-blue-600 dark:text-blue-500 text-3xl" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
          <FaUser className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">User not found</p>
          <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.username === username;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative group">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white dark:bg-gray-900 p-1 shadow-2xl">
                  <img
                    src={profile.profilePic || 'https://placehold.co/200x200/8b5cf6/white?text=User'}
                    alt={profile.fullName}
                    className="w-full h-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/200x200/8b5cf6/white?text=User';
                    }}
                  />
                </div>
                {isOwnProfile && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-1 right-1 bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                      disabled={uploadingImage}
                    >
                      <FaCamera size={14} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfilePictureUpload}
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      className="hidden"
                    />
                  </>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{profile.fullName}</h1>
                <p className="text-blue-100 dark:text-blue-300 mb-3 text-lg">@{profile.username}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-300 rounded-full text-sm font-medium">
                    <FaBook size={12} />
                    {profile.department}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-300 rounded-full text-sm font-medium">
                    <FaUniversity size={12} />
                    {profile.institute}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-300 rounded-full text-sm font-medium">
                    <FaCalendar size={12} />
                    Joined {new Date(profile.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
              
              {isOwnProfile && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaEdit size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white dark:bg-white rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaUser className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800">Profile Information</h2>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editForm.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Institute</label>
                    <input
                      type="text"
                      name="institute"
                      value={editForm.institute}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-700 mb-2 font-medium">Department</label>
                    <select
                      name="department"
                      value={editForm.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-900 transition-all"
                    >
                      <option value="CSE">CSE</option>
                      <option value="EEE">EEE</option>
                      <option value="MATH">MATH</option>
                      <option value="Fisheries">Fisheries</option>
                      <option value="Social Work">Social Work</option>
                      <option value="Management">Management</option>
                      <option value="Geology">Geology</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md"
                    >
                      <FaSave size={14} /> Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
                    >
                      <FaTimes size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                        <p className="font-semibold text-gray-800">{profile.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                        <p className="font-semibold text-gray-800">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaUniversity className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Institute</p>
                        <p className="font-semibold text-gray-800">{profile.institute}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-100 dark:border-gray-100">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaBook className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Department</p>
                        <p className="font-semibold text-gray-800">{profile.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaChartLine className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-bold">Contributor Stats</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-90">Total Uploads</p>
                  <p className="text-4xl font-bold">{profile.uploadCount}</p>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (profile.uploadCount / 50) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm opacity-90">
                  {profile.uploadCount < 10 
                    ? '📚 Upload 10+ resources to become a Contributor' 
                    : profile.uploadCount < 30 
                    ? '⭐ Great job! You\'re a valuable contributor!' 
                    : '🏆 Excellent! You\'re a top contributor!'}
                </p>
              </div>
            </div>

            {/* Upload Card for Own Profile */}
            {isOwnProfile && <UploadCard />}

            {/* Achievement Badges */}
            {profile.uploadCount > 0 && (
              <div className="bg-white dark:bg-white rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <FaAward className="text-yellow-600 text-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-800">Achievements</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.uploadCount >= 1 && (
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      🎓 First Upload
                    </span>
                  )}
                  {profile.uploadCount >= 10 && (
                    <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      ⭐ Rising Star
                    </span>
                  )}
                  {profile.uploadCount >= 30 && (
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                      🏆 Top Contributor
                    </span>
                  )}
                  {profile.uploadCount >= 50 && (
                    <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                      👑 Legend
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tips */}
            {isOwnProfile && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-50 dark:to-purple-50 rounded-2xl shadow-xl p-5 border border-blue-100 dark:border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaHeart className="text-red-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-800">Pro Tips</h4>
                </div>
                <ul className="text-sm text-gray-700 dark:text-gray-700 space-y-2">
                  <li>📸 Click the camera icon to update your profile picture</li>
                  <li>✏️ Keep your information up to date</li>
                  <li>📤 Share resources to increase your upload count</li>
                  <li>❤️ React to resources to help the community</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* User's Resources Section - With Pagination */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Resources by {profile.fullName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {totalResources} resource{totalResources !== 1 ? 's' : ''} shared
              </p>
            </div>
            <Link to="/e-library" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              Browse All Resources →
            </Link>
          </div>

          {loadingResources ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading resources...</p>
            </div>
          ) : userResources.length > 0 ? (
            <>
              {/* Results Info */}
              <div className="mb-4 text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {startItem} to {endItem} of {totalResources} resources
                </p>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userResources.map(resource => (
                  <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                    <Link to={`/resource/${resource._id}`}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={resource.coverPic} 
                          alt={resource.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/400x200/3b82f6/white?text=No+Image';
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            resource.type === 'book' ? 'bg-blue-600' :
                            resource.type === 'slide' ? 'bg-orange-600' :
                            resource.type === 'note' ? 'bg-green-600' :
                            'bg-purple-600'
                          } text-white`}>
                            {resource.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={`/resource/${resource._id}`}>
                        <h3 className="font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                          {resource.title}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-gray-400 text-xs" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(resource.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaHeart className="text-red-400 text-xs" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {resource.reactionCount || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                          {resource.department}
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">
                          {resource.year} Year
                        </span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
                          Sem {resource.semester}
                        </span>
                      </div>
                      <Link 
                        to={`/resource/${resource._id}`}
                        className="mt-3 inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                      >
                        View Details <FaDownload size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Component */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      First
                    </button>
                    
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <div className="flex gap-1">
                      {getPageNumbers().map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronRight />
                    </button>
                    
                    <button
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Last
                    </button>
                  </nav>
                </div>
              )}
              
              {/* Page Info */}
              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
              <FaUpload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No resources yet</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {isOwnProfile 
                  ? "You haven't uploaded any resources yet. Start sharing your knowledge!" 
                  : `${profile.fullName} hasn't uploaded any resources yet.`}
              </p>
              {isOwnProfile && (
                <Link to="/upload" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Upload Your First Resource
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;