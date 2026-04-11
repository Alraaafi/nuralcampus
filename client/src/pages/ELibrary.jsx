// import React, { useState, useEffect } from 'react';
// import { FaSearch, FaFilter, FaThLarge, FaList, FaDownload } from 'react-icons/fa';
// import axios from 'axios';
// import ResourceCard from '../components/ResourceCard';
// import toast from 'react-hot-toast';

// const ELibrary = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResources, setTotalResources] = useState(0);
//   const [viewMode, setViewMode] = useState('grid');
//   const [filters, setFilters] = useState({
//     search: '',
//     department: '',
//     semester: '',
//     courseName: '',
//     type: '',
//     year: ''
//   });

//   const departments = ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology'];
//   const types = ['book', 'slide', 'note', 'others'];
//   const years = ['1st', '2nd', '3rd', '4th'];
//   const semesters = ['1st', '2nd'];

//   useEffect(() => {
//     fetchResources();
//   }, [currentPage, filters]);

//   const fetchResources = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: 12,
//         ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
//       });
//       const response = await axios.get(`/api/resources?${queryParams}`);
//       setResources(response.data.resources);
//       setTotalPages(response.data.totalPages);
//       setTotalResources(response.data.total);
//     } catch (error) {
//       toast.error('Error fetching resources');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setCurrentPage(1);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//     fetchResources();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       department: '',
//       semester: '',
//       courseName: '',
//       type: '',
//       year: ''
//     });
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">E-Library</h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">Browse and download academic resources</p>
//       </div>
      
//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               name="search"
//               value={filters.search}
//               onChange={handleFilterChange}
//               placeholder="Search by title, course, or topic..."
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors"
//             />
//           </div>
//           <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//             Search
//           </button>
//         </div>
//       </form>

//       {/* Filters and View Options */}
//       <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors duration-200">
//         <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
//           <div className="flex items-center">
//             <FaFilter className="mr-2 text-gray-600 dark:text-gray-400" />
//             <h3 className="font-semibold text-gray-800 dark:text-white">Filters</h3>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
//             >
//               <FaThLarge />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
//             >
//               <FaList />
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
//           <select
//             name="department"
//             value={filters.department}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Departments</option>
//             {departments.map(dept => (
//               <option key={dept} value={dept}>{dept}</option>
//             ))}
//           </select>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year} Year</option>
//             ))}
//           </select>
//           <select
//             name="semester"
//             value={filters.semester}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Semesters</option>
//             {semesters.map(sem => (
//               <option key={sem} value={sem}>{sem} Semester</option>
//             ))}
//           </select>
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Types</option>
//             {types.map(type => (
//               <option key={type} value={type}>{type.toUpperCase()}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="courseName"
//             value={filters.courseName}
//             onChange={handleFilterChange}
//             placeholder="Course Name"
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <button
//             onClick={clearFilters}
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//           >
//             Clear All
//           </button>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-4 flex justify-between items-center">
//         <p className="text-gray-600 dark:text-gray-400">
//           Found <span className="font-semibold text-gray-800 dark:text-white">{totalResources}</span> resources
//         </p>
//       </div>

//       {/* Resources Grid/List */}
//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resources...</p>
//         </div>
//       ) : resources.length > 0 ? (
//         <div className={viewMode === 'grid' 
//           ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
//           : "space-y-4"
//         }>
//           {resources.map(resource => (
//             viewMode === 'grid' ? (
//               <ResourceCard key={resource._id} resource={resource} />
//             ) : (
//               <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-all">
//                 <img 
//                   src={resource.coverPic} 
//                   alt={resource.title}
//                   className="w-24 h-24 object-cover rounded"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
//                   }}
//                 />
//                 <div className="flex-1">
//                   <Link to={`/resource/${resource._id}`}>
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600">{resource.title}</h3>
//                   </Link>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">By {resource.username}</p>
//                   <div className="flex gap-2 mt-2">
//                     <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">{resource.department}</span>
//                     <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">{resource.type}</span>
//                   </div>
//                 </div>
//                 <Link to={`/resource/${resource._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 h-fit">
//                   View
//                 </Link>
//               </div>
//             )
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
//           <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No resources found</h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
//           <button
//             onClick={clearFilters}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           <button
//             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-700 dark:text-white"
//           >
//             Previous
//           </button>
//           <div className="flex gap-1">
//             {[...Array(Math.min(5, totalPages))].map((_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`px-4 py-2 rounded-lg transition-colors ${
//                     currentPage === pageNum
//                       ? 'bg-blue-600 text-white'
//                       : 'border dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//           </div>
//           <button
//             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-700 dark:text-white"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ELibrary;
































//v1

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaFilter, FaThLarge, FaList, FaDownload } from 'react-icons/fa';
// import axios from 'axios';
// import ResourceCard from '../components/ResourceCard';
// import UploadCard from '../components/UploadCard';
// import toast from 'react-hot-toast';

// const ELibrary = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResources, setTotalResources] = useState(0);
//   const [viewMode, setViewMode] = useState('grid');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [filters, setFilters] = useState({
//     search: '',
//     department: '',
//     semester: '',
//     courseName: '',
//     type: '',
//     year: ''
//   });

//   const departments = ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology'];
//   const types = ['book', 'slide', 'note', 'others'];
//   const years = ['1st', '2nd', '3rd', '4th'];
//   const semesters = ['1st', '2nd'];

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//     fetchResources();
//   }, [currentPage, filters]);

//   const fetchResources = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: 12,
//         ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
//       });
//       const response = await axios.get(`/api/resources?${queryParams}`);
//       setResources(response.data.resources);
//       setTotalPages(response.data.totalPages);
//       setTotalResources(response.data.total);
//     } catch (error) {
//       toast.error('Error fetching resources');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setCurrentPage(1);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//     fetchResources();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       department: '',
//       semester: '',
//       courseName: '',
//       type: '',
//       year: ''
//     });
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">E-Library</h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">Browse and download academic resources</p>
//       </div>
      
//       {/* Upload Card for Logged-in Users */}
//       {isAuthenticated && (
//         <div className="mb-8">
//           <UploadCard />
//         </div>
//       )}
      
//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               name="search"
//               value={filters.search}
//               onChange={handleFilterChange}
//               placeholder="Search by title, course, or topic..."
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors"
//             />
//           </div>
//           <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//             Search
//           </button>
//         </div>
//       </form>

//       {/* Filters and View Options */}
//       <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors duration-200">
//         <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
//           <div className="flex items-center">
//             <FaFilter className="mr-2 text-gray-600 dark:text-gray-400" />
//             <h3 className="font-semibold text-gray-800 dark:text-white">Filters</h3>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
//             >
//               <FaThLarge />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
//             >
//               <FaList />
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
//           <select
//             name="department"
//             value={filters.department}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Departments</option>
//             {departments.map(dept => (
//               <option key={dept} value={dept}>{dept}</option>
//             ))}
//           </select>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year} Year</option>
//             ))}
//           </select>
//           <select
//             name="semester"
//             value={filters.semester}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Semesters</option>
//             {semesters.map(sem => (
//               <option key={sem} value={sem}>{sem} Semester</option>
//             ))}
//           </select>
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Types</option>
//             {types.map(type => (
//               <option key={type} value={type}>{type.toUpperCase()}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="courseName"
//             value={filters.courseName}
//             onChange={handleFilterChange}
//             placeholder="Course Name"
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <button
//             onClick={clearFilters}
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//           >
//             Clear All
//           </button>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-4 flex justify-between items-center">
//         <p className="text-gray-600 dark:text-gray-400">
//           Found <span className="font-semibold text-gray-800 dark:text-white">{totalResources}</span> resources
//         </p>
//       </div>

//       {/* Resources Grid/List */}
//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resources...</p>
//         </div>
//       ) : resources.length > 0 ? (
//         <div className={viewMode === 'grid' 
//           ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
//           : "space-y-4"
//         }>
//           {resources.map(resource => (
//             viewMode === 'grid' ? (
//               <ResourceCard key={resource._id} resource={resource} />
//             ) : (
//               <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-all">
//                 <img 
//                   src={resource.coverPic} 
//                   alt={resource.title}
//                   className="w-24 h-24 object-cover rounded"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
//                   }}
//                 />
//                 <div className="flex-1">
//                   <Link to={`/resource/${resource._id}`}>
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600">{resource.title}</h3>
//                   </Link>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">By {resource.username}</p>
//                   <div className="flex gap-2 mt-2">
//                     <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">{resource.department}</span>
//                     <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">{resource.type}</span>
//                   </div>
//                 </div>
//                 <Link to={`/resource/${resource._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 h-fit">
//                   View
//                 </Link>
//               </div>
//             )
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
//           <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No resources found</h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
//           <button
//             onClick={clearFilters}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           <button
//             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-700 dark:text-white"
//           >
//             Previous
//           </button>
//           <div className="flex gap-1">
//             {[...Array(Math.min(5, totalPages))].map((_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`px-4 py-2 rounded-lg transition-colors ${
//                     currentPage === pageNum
//                       ? 'bg-blue-600 text-white'
//                       : 'border dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//           </div>
//           <button
//             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-700 dark:text-white"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ELibrary;


























//v2
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaFilter, FaThLarge, FaList, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import axios from 'axios';
// import ResourceCard from '../components/ResourceCard';
// import UploadCard from '../components/UploadCard';
// import toast from 'react-hot-toast';

// const ELibrary = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResources, setTotalResources] = useState(0);
//   const [viewMode, setViewMode] = useState('grid');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [filters, setFilters] = useState({
//     search: '',
//     department: '',
//     semester: '',
//     courseName: '',
//     type: '',
//     year: ''
//   });

//   const departments = ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology'];
//   const types = ['book', 'slide', 'note', 'others'];
//   const years = ['1st', '2nd', '3rd', '4th'];
//   const semesters = ['1st', '2nd'];
//   const ITEMS_PER_PAGE = 10;

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//     fetchResources();
//   }, [currentPage, filters]);

//   const fetchResources = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: ITEMS_PER_PAGE,
//         ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
//       });
//       const response = await axios.get(`/api/resources?${queryParams}`);
//       setResources(response.data.resources);
//       setTotalPages(response.data.totalPages);
//       setTotalResources(response.data.total);
//     } catch (error) {
//       toast.error('Error fetching resources');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setCurrentPage(1);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//     fetchResources();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       department: '',
//       semester: '',
//       courseName: '',
//       type: '',
//       year: ''
//     });
//     setCurrentPage(1);
//   };

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pageNumbers.push(i);
//         }
//       } else if (currentPage >= totalPages - 2) {
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
//           pageNumbers.push(i);
//         }
//       }
//     }
//     return pageNumbers;
//   };

//   const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
//   const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalResources);

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">E-Library</h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">Browse and download academic resources</p>
//       </div>
      
//       {/* Upload Card for Logged-in Users */}
//       {isAuthenticated && (
//         <div className="mb-8">
//           <UploadCard />
//         </div>
//       )}
      
//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               name="search"
//               value={filters.search}
//               onChange={handleFilterChange}
//               placeholder="Search by title, course, or topic..."
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors"
//             />
//           </div>
//           <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//             Search
//           </button>
//         </div>
//       </form>

//       {/* Filters and View Options */}
//       <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors duration-200">
//         <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
//           <div className="flex items-center">
//             <FaFilter className="mr-2 text-gray-600 dark:text-gray-400" />
//             <h3 className="font-semibold text-gray-800 dark:text-white">Filters</h3>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
//             >
//               <FaThLarge />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
//             >
//               <FaList />
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
//           <select
//             name="department"
//             value={filters.department}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Departments</option>
//             {departments.map(dept => (
//               <option key={dept} value={dept}>{dept}</option>
//             ))}
//           </select>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year} Year</option>
//             ))}
//           </select>
//           <select
//             name="semester"
//             value={filters.semester}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Semesters</option>
//             {semesters.map(sem => (
//               <option key={sem} value={sem}>{sem} Semester</option>
//             ))}
//           </select>
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleFilterChange}
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">All Types</option>
//             {types.map(type => (
//               <option key={type} value={type}>{type.toUpperCase()}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="courseName"
//             value={filters.courseName}
//             onChange={handleFilterChange}
//             placeholder="Course Name"
//             className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <button
//             onClick={clearFilters}
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//           >
//             Clear All
//           </button>
//         </div>
//       </div>

//       {/* Results Count and Info */}
//       <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
//         <p className="text-gray-600 dark:text-gray-400">
//           Showing <span className="font-semibold text-gray-800 dark:text-white">{startItem}</span> to{' '}
//           <span className="font-semibold text-gray-800 dark:text-white">{endItem}</span> of{' '}
//           <span className="font-semibold text-gray-800 dark:text-white">{totalResources}</span> resources
//         </p>
//         <div className="text-sm text-gray-500 dark:text-gray-500">
//           {ITEMS_PER_PAGE} items per page
//         </div>
//       </div>

//       {/* Resources Grid/List */}
//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resources...</p>
//         </div>
//       ) : resources.length > 0 ? (
//         <>
//           <div className={viewMode === 'grid' 
//             ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
//             : "space-y-4"
//           }>
//             {resources.map(resource => (
//               viewMode === 'grid' ? (
//                 <ResourceCard key={resource._id} resource={resource} />
//               ) : (
//                 <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-all">
//                   <img 
//                     src={resource.coverPic} 
//                     alt={resource.title}
//                     className="w-24 h-24 object-cover rounded"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
//                     }}
//                   />
//                   <div className="flex-1">
//                     <Link to={`/resource/${resource._id}`}>
//                       <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600">{resource.title}</h3>
//                     </Link>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">By {resource.username}</p>
//                     <div className="flex gap-2 mt-2">
//                       <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">{resource.department}</span>
//                       <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs capitalize">{resource.type}</span>
//                       <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">{resource.year} Year</span>
//                     </div>
//                   </div>
//                   <Link to={`/resource/${resource._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 h-fit">
//                     View
//                   </Link>
//                 </div>
//               )
//             ))}
//           </div>

//           {/* Pagination Component */}
//           {totalPages > 1 && (
//             <div className="mt-8 flex justify-center">
//               <nav className="flex items-center gap-2 flex-wrap">
//                 {/* First Page Button */}
//                 <button
//                   onClick={() => goToPage(1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   First
//                 </button>
                
//                 {/* Previous Button */}
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <FaChevronLeft />
//                 </button>
                
//                 {/* Page Numbers */}
//                 <div className="flex gap-1">
//                   {getPageNumbers().map(pageNum => (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum)}
//                       className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
//                         currentPage === pageNum
//                           ? 'bg-blue-600 text-white'
//                           : 'border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   ))}
//                 </div>
                
//                 {/* Next Button */}
//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <FaChevronRight />
//                 </button>
                
//                 {/* Last Page Button */}
//                 <button
//                   onClick={() => goToPage(totalPages)}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Last
//                 </button>
//               </nav>
//             </div>
//           )}
          
//           {/* Page Info */}
//           {totalPages > 1 && (
//             <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-500">
//               Page {currentPage} of {totalPages}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
//           <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No resources found</h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
//           <button
//             onClick={clearFilters}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ELibrary;

























//v5
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaThLarge, FaList, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import ResourceCard from '../components/ResourceCard';
import UploadCard from '../components/UploadCard';
import toast from 'react-hot-toast';

// Working placeholder service - REPLACED via.placeholder.com
const DEFAULT_THUMBNAIL = 'https://placehold.co/100x100/3b82f6/white?text=No+Image';

const ELibrary = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResources, setTotalResources] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    semester: '',
    courseName: '',
    type: '',
    year: ''
  });

  const departments = ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology'];
  const types = ['book', 'slide', 'note', 'others'];
  const years = ['1st', '2nd', '3rd', '4th'];
  const semesters = ['1st', '2nd'];
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchResources();
  }, [currentPage, filters]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });
      const response = await axios.get(`/api/resources?${queryParams}`);
      setResources(response.data.resources);
      setTotalPages(response.data.totalPages);
      setTotalResources(response.data.total);
    } catch (error) {
      toast.error('Error fetching resources');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchResources();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      department: '',
      semester: '',
      courseName: '',
      type: '',
      year: ''
    });
    setCurrentPage(1);
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">E-Library</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Browse and download academic resources</p>
      </div>
      
      {/* Upload Card for Logged-in Users */}
      {isAuthenticated && (
        <div className="mb-8">
          <UploadCard />
        </div>
      )}
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by title, course, or topic..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </form>

      {/* Filters and View Options */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors duration-200">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center">
            <FaFilter className="mr-2 text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Filters</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year} Year</option>
            ))}
          </select>
          <select
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Semesters</option>
            {semesters.map(sem => (
              <option key={sem} value={sem}>{sem} Semester</option>
            ))}
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type.toUpperCase()}</option>
            ))}
          </select>
          <input
            type="text"
            name="courseName"
            value={filters.courseName}
            onChange={handleFilterChange}
            placeholder="Course Name"
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Count and Info */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
        <p className="text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-800 dark:text-white">{startItem}</span> to{' '}
          <span className="font-semibold text-gray-800 dark:text-white">{endItem}</span> of{' '}
          <span className="font-semibold text-gray-800 dark:text-white">{totalResources}</span> resources
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-500">
          {ITEMS_PER_PAGE} items per page
        </div>
      </div>

      {/* Resources Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resources...</p>
        </div>
      ) : resources.length > 0 ? (
        <>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {resources.map(resource => (
              viewMode === 'grid' ? (
                <ResourceCard key={resource._id} resource={resource} />
              ) : (
                <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-all">
                  <img 
                    src={resource.coverPic} 
                    alt={resource.title}
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      e.target.src = DEFAULT_THUMBNAIL;
                    }}
                  />
                  <div className="flex-1">
                    <Link to={`/resource/${resource._id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600">{resource.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">By {resource.username}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">{resource.department}</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs capitalize">{resource.type}</span>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">{resource.year} Year</span>
                    </div>
                  </div>
                  <Link to={`/resource/${resource._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 h-fit">
                    View
                  </Link>
                </div>
              )
            ))}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2 flex-wrap">
                {/* First Page Button */}
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  First
                </button>
                
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft />
                </button>
                
                {/* Page Numbers */}
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
                
                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronRight />
                </button>
                
                {/* Last Page Button */}
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ELibrary;