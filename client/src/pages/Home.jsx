

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import { FaBook, FaTrophy, FaVideo, FaFileAlt, FaUsers, FaFilePdf, FaSlideshare, FaChartLine, FaDownload } from 'react-icons/fa';
// import axios from 'axios';
// import ResourceCard from '../components/ResourceCard';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const Home = () => {
//   const [stats, setStats] = useState({
//     totalParticipants: 0,
//     totalBooks: 0,
//     totalSlides: 0,
//     totalNotes: 0,
//     totalResources: 0
//   });
//   const [recentResources, setRecentResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStats();
//     fetchRecentResources();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get('/api/analytics/stats');
//       setStats(response.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const fetchRecentResources = async () => {
//     try {
//       const response = await axios.get('/api/resources?page=1&limit=8');
//       setRecentResources(response.data.resources);
//     } catch (error) {
//       console.error('Error fetching recent resources:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const carouselItems = [
//     { title: 'Access thousands of academic resources', color: 'from-blue-600 to-purple-600' },
//     { title: 'Upload and share your study materials', color: 'from-green-600 to-teal-600' },
//     { title: 'Connect with top contributors', color: 'from-orange-600 to-red-600' },
//     { title: 'Download books, notes, and slides', color: 'from-pink-600 to-rose-600' },
//     { title: 'Track your learning progress', color: 'from-indigo-600 to-blue-600' }
//   ];

//   const sections = [
//     { title: 'E-Library', icon: <FaBook size={32} />, color: 'bg-blue-500', link: '/e-library', desc: 'Access books, notes, and slides' },
//     { title: 'Top Contributor', icon: <FaTrophy size={32} />, color: 'bg-yellow-500', link: '/top-contributors', desc: 'See who contributes the most' },
//     { title: 'Smart Video Hub', icon: <FaVideo size={32} />, color: 'bg-red-500', link: '#', desc: 'Coming Soon!' },
//     { title: 'Software and File', icon: <FaFileAlt size={32} />, color: 'bg-green-500', link: '#', desc: 'Coming Soon!' }
//   ];

//   return (
//     <div>
//       {/* Carousel */}
//       <div className="mb-12">
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           autoplay={{ delay: 3000 }}
//           pagination={{ clickable: true }}
//           className="rounded-lg overflow-hidden"
//         >
//           {carouselItems.map((item, index) => (
//             <SwiperSlide key={index}>
//               <div className={`bg-gradient-to-r ${item.color} text-white p-12 text-center`}>
//                 <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Introduction Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12 transition-colors duration-200">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Welcome to NuralCampus</h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-4">
//           NuralCampus is an intelligent academic ecosystem designed to streamline access to educational resources. 
//           Our platform connects students and educators, providing a centralized hub for learning materials.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="border-l-4 border-blue-500 pl-4">
//             <h3 className="font-semibold text-gray-800 dark:text-white">For Students</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">Access resources, download materials, and track progress</p>
//           </div>
//           <div className="border-l-4 border-green-500 pl-4">
//             <h3 className="font-semibold text-gray-800 dark:text-white">For Educators</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">Share knowledge and upload course materials</p>
//           </div>
//           <div className="border-l-4 border-purple-500 pl-4">
//             <h3 className="font-semibold text-gray-800 dark:text-white">Community Driven</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">Learn from top contributors and collaborate</p>
//           </div>
//         </div>
//       </div>

//       {/* Card Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         {sections.map((section, index) => (
//           <Link to={section.link} key={index}>
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
//               <div className={`${section.color} p-4 text-white flex items-center justify-center`}>
//                 {section.icon}
//               </div>
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{section.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{section.desc}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Recent Resources Section */}
//       <div className="mb-12">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Resources</h2>
//           <Link to="/e-library" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
//             View All <span>→</span>
//           </Link>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           </div>
//         ) : recentResources.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {recentResources.map(resource => (
//               <ResourceCard key={resource._id} resource={resource} />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
//             <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//             <p className="text-gray-600 dark:text-gray-400">No resources uploaded yet.</p>
//             <Link to="/upload" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Be the first to upload!
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Analytics Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-200">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Platform Statistics</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <div className="text-center p-4">
//             <FaUsers className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalParticipants}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
//           </div>
//           <div className="text-center p-4">
//             <FaBook className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalBooks}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Total Books</div>
//           </div>
//           <div className="text-center p-4">
//             <FaFilePdf className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalNotes}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Total Notes</div>
//           </div>
//           <div className="text-center p-4">
//             <FaSlideshare className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalSlides}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Total Slides</div>
//           </div>
//           <div className="text-center p-4">
//             <FaChartLine className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalResources}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Total Resources</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


















//v3
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
// import { FaBook, FaTrophy, FaVideo, FaFileAlt, FaUsers, FaFilePdf, FaSlideshare, FaChartLine, FaDownload, FaArrowRight, FaGraduationCap, FaCloudUploadAlt, FaSearch } from 'react-icons/fa';
// import axios from 'axios';
// import ResourceCard from '../components/ResourceCard';
// import AnimatedNumber from '../components/AnimatedNumber';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';

// const Home = () => {
//   const [stats, setStats] = useState({
//     totalParticipants: 0,
//     totalBooks: 0,
//     totalSlides: 0,
//     totalNotes: 0,
//     totalResources: 0
//   });
//   const [recentResources, setRecentResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statsLoaded, setStatsLoaded] = useState(false);

//   useEffect(() => {
//     fetchStats();
//     fetchRecentResources();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get('/api/analytics/stats');
//       setStats(response.data);
//       setStatsLoaded(true);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const fetchRecentResources = async () => {
//     try {
//       const response = await axios.get('/api/resources?page=1&limit=8');
//       setRecentResources(response.data.resources);
//     } catch (error) {
//       console.error('Error fetching recent resources:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enhanced carousel items with images and detailed content
//   const carouselItems = [
//     {
//       title: 'Welcome to NuralCampus',
//       subtitle: 'The Intelligent Academic Ecosystem',
//       description: 'Your one-stop platform for accessing quality educational resources, connecting with peers, and advancing your academic journey.',
//       icon: <FaGraduationCap className="text-6xl mb-4" />,
//       color: 'from-blue-600 to-purple-600',
//       image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=400&fit=crop',
//       buttonText: 'Get Started',
//       buttonLink: '/register',
//       stats: 'Join 1000+ Students'
//     },
//     {
//       title: 'Digital Library',
//       subtitle: 'Access Thousands of Resources',
//       description: 'Browse through our extensive collection of books, notes, slides, and academic materials from various departments.',
//       icon: <FaBook className="text-6xl mb-4" />,
//       color: 'from-green-600 to-teal-600',
//       image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop',
//       buttonText: 'Explore Library',
//       buttonLink: '/e-library',
//       stats: '5000+ Resources Available'
//     },
//     {
//       title: 'Share Knowledge',
//       subtitle: 'Upload Your Study Materials',
//       description: 'Contribute to the community by sharing your notes, presentations, and study guides. Help fellow students learn better.',
//       icon: <FaCloudUploadAlt className="text-6xl mb-4" />,
//       color: 'from-orange-600 to-red-600',
//       image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop',
//       buttonText: 'Upload Now',
//       buttonLink: '/upload',
//       stats: 'Join Top Contributors'
//     },
//     {
//       title: 'Smart Search',
//       subtitle: 'Find What You Need Fast',
//       description: 'Advanced search and filtering system helps you discover the right resources by department, course, semester, and more.',
//       icon: <FaSearch className="text-6xl mb-4" />,
//       color: 'from-pink-600 to-rose-600',
//       image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&h=400&fit=crop',
//       buttonText: 'Search Resources',
//       buttonLink: '/e-library',
//       stats: 'Smart Filtering System'
//     },
//     {
//       title: 'Top Contributors',
//       subtitle: 'Recognizing Excellence',
//       description: 'Get recognized for your contributions! Climb the leaderboard by sharing valuable resources with the community.',
//       icon: <FaTrophy className="text-6xl mb-4" />,
//       color: 'from-yellow-600 to-amber-600',
//       image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
//       buttonText: 'View Leaderboard',
//       buttonLink: '/top-contributors',
//       stats: 'Compete & Win'
//     }
//   ];

//   const sections = [
//     { title: 'E-Library', icon: <FaBook size={32} />, color: 'bg-blue-500', link: '/e-library', desc: 'Access books, notes, and slides' },
//     { title: 'Top Contributor', icon: <FaTrophy size={32} />, color: 'bg-yellow-500', link: '/top-contributors', desc: 'See who contributes the most' },
//     { title: 'Smart Video Hub', icon: <FaVideo size={32} />, color: 'bg-red-500', link: '#', desc: 'Coming Soon!' },
//     { title: 'Software and File', icon: <FaFileAlt size={32} />, color: 'bg-green-500', link: '#', desc: 'Coming Soon!' }
//   ];

//   const statItems = [
//     { key: 'totalParticipants', icon: <FaUsers className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Users', color: 'from-blue-500 to-blue-600' },
//     { key: 'totalBooks', icon: <FaBook className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Books', color: 'from-green-500 to-green-600' },
//     { key: 'totalNotes', icon: <FaFilePdf className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Notes', color: 'from-purple-500 to-purple-600' },
//     { key: 'totalSlides', icon: <FaSlideshare className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Slides', color: 'from-orange-500 to-orange-600' },
//     { key: 'totalResources', icon: <FaChartLine className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Resources', color: 'from-red-500 to-red-600' }
//   ];

//   return (
//     <div>
//       {/* Enhanced Carousel with Images */}
//       <div className="mb-12 -mt-8">
//         <Swiper
//           modules={[Autoplay, Pagination, Navigation, EffectFade]}
//           autoplay={{ delay: 5000, disableOnInteraction: false }}
//           pagination={{ clickable: true, dynamicBullets: true }}
//           navigation={true}
//           effect="fade"
//           fadeEffect={{ crossFade: true }}
//           loop={true}
//           className="rounded-xl overflow-hidden shadow-2xl"
//           style={{ height: '500px' }}
//         >
//           {carouselItems.map((item, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative w-full h-full">
//                 {/* Background Image with Overlay */}
//                 <div 
//                   className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                   style={{ backgroundImage: `url(${item.image})` }}
//                 >
//                   <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-90`}></div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="relative h-full flex items-center justify-center px-4">
//                   <div className="text-center text-white max-w-4xl mx-auto">
//                     <div className="transform hover:scale-110 transition-transform duration-300">
//                       {item.icon}
//                     </div>
//                     <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
//                       {item.title}
//                     </h1>
//                     <p className="text-xl md:text-2xl mb-4 text-blue-100">
//                       {item.subtitle}
//                     </p>
//                     <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
//                       {item.description}
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                       <Link
//                         to={item.buttonLink}
//                         className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
//                       >
//                         {item.buttonText}
//                         <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//                       </Link>
//                       <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                         <span className="text-sm font-medium">{item.stats}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Quick Stats Bar */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 -mt-8 relative z-10">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
//           <div className="text-blue-600 text-2xl mb-2">📚</div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">Active Resources</div>
//           <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalResources}</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
//           <div className="text-green-600 text-2xl mb-2">👥</div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">Community Members</div>
//           <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalParticipants}</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
//           <div className="text-purple-600 text-2xl mb-2">📖</div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">Total Books</div>
//           <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalBooks}</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
//           <div className="text-orange-600 text-2xl mb-2">📝</div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">Study Notes</div>
//           <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalNotes}</div>
//         </div>
//       </div>

//       {/* Introduction Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12 transition-colors duration-200 transform hover:shadow-lg transition-all">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome to NuralCampus</h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
//         </div>
//         <p className="text-gray-600 dark:text-gray-400 mb-4 text-center max-w-3xl mx-auto">
//           NuralCampus is an intelligent academic ecosystem designed to streamline access to educational resources. 
//           Our platform connects students and educators, providing a centralized hub for learning materials.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="border-l-4 border-blue-500 pl-4 transform hover:translate-x-2 transition-transform">
//             <h3 className="font-semibold text-gray-800 dark:text-white">For Students</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">Access resources, download materials, and track progress</p>
//           </div>
//           <div className="border-l-4 border-green-500 pl-4 transform hover:translate-x-2 transition-transform">
//             <h3 className="font-semibold text-gray-800 dark:text-white">For Educators</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">Share knowledge and upload course materials</p>
//           </div>
//           <div className="border-l-4 border-purple-500 pl-4 transform hover:translate-x-2 transition-transform">
//             <h3 className="font-semibold text-gray-800 dark:text-white">Community Driven</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">Learn from top contributors and collaborate</p>
//           </div>
//         </div>
//       </div>

//       {/* Card Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         {sections.map((section, index) => (
//           <Link to={section.link} key={index}>
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
//               <div className={`${section.color} p-4 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
//                 {section.icon}
//               </div>
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{section.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{section.desc}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Recent Resources Section */}
//       <div className="mb-12">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Resources</h2>
//             <p className="text-gray-600 dark:text-gray-400">Latest additions to our library</p>
//           </div>
//           <Link to="/e-library" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 group">
//             View All <span className="group-hover:translate-x-1 transition-transform">→</span>
//           </Link>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           </div>
//         ) : recentResources.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {recentResources.map(resource => (
//               <ResourceCard key={resource._id} resource={resource} />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
//             <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//             <p className="text-gray-600 dark:text-gray-400">No resources uploaded yet.</p>
//             <Link to="/upload" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Be the first to upload!
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Animated Statistics Section */}
//       <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md p-8 transition-colors duration-200">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Platform Statistics</h2>
//           <p className="text-gray-600 dark:text-gray-400">Real-time analytics of our growing community</p>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-2"></div>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {statItems.map((item, index) => (
//             <div 
//               key={item.key} 
//               className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="mb-3 transform hover:scale-110 transition-transform duration-300">
//                 {item.icon}
//               </div>
//               {statsLoaded ? (
//                 <AnimatedNumber 
//                   targetValue={stats[item.key]} 
//                   duration={2000}
//                   startValue={0}
//                 />
//               ) : (
//                 <div className="text-2xl font-bold text-gray-800 dark:text-white">0</div>
//               )}
//               <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">{item.label}</div>
//               <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r rounded-full animate-pulse"
//                   style={{ 
//                     width: statsLoaded ? '100%' : '0%',
//                     backgroundImage: `linear-gradient(90deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[2]})`
//                   }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Total Resources Highlight */}
//         <div className="mt-8 text-center">
//           <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
//             <p className="text-white font-semibold">
//               Total Resources Available: {' '}
//               {statsLoaded ? (
//                 <span className="text-2xl font-bold">
//                   <AnimatedNumber targetValue={stats.totalResources} duration={2500} />
//                 </span>
//               ) : (
//                 '0'
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;





































//v5
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { FaBook, FaTrophy, FaVideo, FaFileAlt, FaUsers, FaFilePdf, FaSlideshare, FaChartLine, FaDownload, FaArrowRight, FaGraduationCap, FaCloudUploadAlt, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ResourceCard from '../components/ResourceCard';
import AnimatedNumber from '../components/AnimatedNumber';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Home = () => {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalBooks: 0,
    totalSlides: 0,
    totalNotes: 0,
    totalResources: 0
  });
  const [recentResources, setRecentResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchRecentResources();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/analytics/stats');
      setStats(response.data);
      setStatsLoaded(true);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentResources = async () => {
    try {
      const response = await axios.get('/api/resources?page=1&limit=8');
      setRecentResources(response.data.resources);
    } catch (error) {
      console.error('Error fetching recent resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced carousel items with images and detailed content
  const carouselItems = [
    {
      title: 'Welcome to NuralCampus',
      subtitle: 'The Intelligent Academic Ecosystem',
      description: 'Your one-stop platform for accessing quality educational resources, connecting with peers, and advancing your academic journey.',
      icon: <FaGraduationCap className="text-6xl mb-4" />,
      color: 'from-blue-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=400&fit=crop',
      buttonText: 'Get Started',
      buttonLink: '/register',
      stats: 'Join 1000+ Students'
    },
    {
      title: 'Digital Library',
      subtitle: 'Access Thousands of Resources',
      description: 'Browse through our extensive collection of books, notes, slides, and academic materials from various departments.',
      icon: <FaBook className="text-6xl mb-4" />,
      color: 'from-green-600 to-teal-600',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop',
      buttonText: 'Explore Library',
      buttonLink: '/e-library',
      stats: '5000+ Resources Available'
    },
    {
      title: 'Share Knowledge',
      subtitle: 'Upload Your Study Materials',
      description: 'Contribute to the community by sharing your notes, presentations, and study guides. Help fellow students learn better.',
      icon: <FaCloudUploadAlt className="text-6xl mb-4" />,
      color: 'from-orange-600 to-red-600',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop',
      buttonText: 'Upload Now',
      buttonLink: '/upload',
      stats: 'Join Top Contributors'
    },
    {
      title: 'Smart Search',
      subtitle: 'Find What You Need Fast',
      description: 'Advanced search and filtering system helps you discover the right resources by department, course, semester, and more.',
      icon: <FaSearch className="text-6xl mb-4" />,
      color: 'from-pink-600 to-rose-600',
      image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&h=400&fit=crop',
      buttonText: 'Search Resources',
      buttonLink: '/e-library',
      stats: 'Smart Filtering System'
    },
    {
      title: 'Top Contributors',
      subtitle: 'Recognizing Excellence',
      description: 'Get recognized for your contributions! Climb the leaderboard by sharing valuable resources with the community.',
      icon: <FaTrophy className="text-6xl mb-4" />,
      color: 'from-yellow-600 to-amber-600',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
      buttonText: 'View Leaderboard',
      buttonLink: '/top-contributors',
      stats: 'Compete & Win'
    }
  ];

  const sections = [
    { title: 'E-Library', icon: <FaBook size={32} />, color: 'from-blue-500 to-blue-600', bgColor: 'bg-gradient-to-r', link: '/e-library', desc: 'Access books, notes, and slides' },
    { title: 'Top Contributor', icon: <FaTrophy size={32} />, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-gradient-to-r', link: '/top-contributors', desc: 'See who contributes the most' },
    { title: 'Smart Video Hub', icon: <FaVideo size={32} />, color: 'from-red-500 to-red-600', bgColor: 'bg-gradient-to-r', link: '#', desc: 'Coming Soon!' },
    { title: 'Software and File', icon: <FaFileAlt size={32} />, color: 'from-green-500 to-green-600', bgColor: 'bg-gradient-to-r', link: '#', desc: 'Coming Soon!' }
  ];

  const statItems = [
    { key: 'totalParticipants', icon: <FaUsers className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Users', color: 'from-blue-500 to-blue-600' },
    { key: 'totalBooks', icon: <FaBook className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Books', color: 'from-green-500 to-green-600' },
    { key: 'totalNotes', icon: <FaFilePdf className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Notes', color: 'from-purple-500 to-purple-600' },
    { key: 'totalSlides', icon: <FaSlideshare className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Slides', color: 'from-orange-500 to-orange-600' },
    { key: 'totalResources', icon: <FaChartLine className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-2" />, label: 'Total Resources', color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="home-container">
      {/* Enhanced Carousel with Images */}
      <div className="mb-12 -mt-8">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="rounded-xl overflow-hidden shadow-2xl carousel-wrapper"
          style={{ height: '500px' }}
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-90 dark:opacity-95`}></div>
                </div>
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-center px-4">
                  <div className="text-center text-white max-w-4xl mx-auto">
                    <div className="transform hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
                      {item.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-4 text-blue-100">
                      {item.subtitle}
                    </p>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                      {item.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        to={item.buttonLink}
                        className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        {item.buttonText}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-medium">{item.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 -mt-8 relative z-10">
        <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-blue-600 dark:text-blue-400 text-2xl mb-2">📚</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Resources</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalResources}</div>
        </div>
        <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-green-600 dark:text-green-400 text-2xl mb-2">👥</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Community Members</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalParticipants}</div>
        </div>
        <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-purple-600 dark:text-purple-400 text-2xl mb-2">📖</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Books</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalBooks}</div>
        </div>
        <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-orange-600 dark:text-orange-400 text-2xl mb-2">📝</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Study Notes</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalNotes}</div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="intro-section bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12 transition-colors duration-200 transform hover:shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome to NuralCampus</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center max-w-3xl mx-auto">
          NuralCampus is an intelligent academic ecosystem designed to streamline access to educational resources. 
          Our platform connects students and educators, providing a centralized hub for learning materials.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="border-l-4 border-blue-500 pl-4 transform hover:translate-x-2 transition-transform">
            <h3 className="font-semibold text-gray-800 dark:text-white">For Students</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Access resources, download materials, and track progress</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 transform hover:translate-x-2 transition-transform">
            <h3 className="font-semibold text-gray-800 dark:text-white">For Educators</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Share knowledge and upload course materials</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 transform hover:translate-x-2 transition-transform">
            <h3 className="font-semibold text-gray-800 dark:text-white">Community Driven</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn from top contributors and collaborate</p>
          </div>
        </div>
      </div>

      {/* Card Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {sections.map((section, index) => (
          <Link to={section.link} key={index}>
            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className={`${section.bgColor} ${section.color} p-4 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                {section.icon}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{section.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Resources Section */}
      <div className="recent-section mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Resources</h2>
            <p className="text-gray-600 dark:text-gray-400">Latest additions to our library</p>
          </div>
          <Link to="/e-library" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 group">
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : recentResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentResources.map(resource => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="empty-state bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <FaDownload className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No resources uploaded yet.</p>
            <Link to="/upload" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Be the first to upload!
            </Link>
          </div>
        )}
      </div>

      {/* Animated Statistics Section */}
      <div className="stats-section bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md p-8 transition-colors duration-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Platform Statistics</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time analytics of our growing community</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {statItems.map((item, index) => (
            <div 
              key={item.key} 
              className="stat-item text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-3 transform hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              {statsLoaded ? (
                <AnimatedNumber 
                  targetValue={stats[item.key]} 
                  duration={2000}
                  startValue={0}
                />
              ) : (
                <div className="text-2xl font-bold text-gray-800 dark:text-white">0</div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">{item.label}</div>
              <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r rounded-full animate-pulse"
                  style={{ 
                    width: statsLoaded ? '100%' : '0%',
                    backgroundImage: `linear-gradient(90deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[2]})`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Total Resources Highlight */}
        <div className="mt-8 text-center">
          <div className="total-resources-badge inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-white font-semibold">
              Total Resources Available: {' '}
              {statsLoaded ? (
                <span className="text-2xl font-bold">
                  <AnimatedNumber targetValue={stats.totalResources} duration={2500} />
                </span>
              ) : (
                '0'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Add global styles for dark mode */}
      <style jsx>{`
        /* Dark mode specific styles */
        .dark .stat-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }
        
        .dark .feature-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }
        
        .dark .intro-section {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }
        
        .dark .empty-state {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }
        
        .dark .stat-item {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }
        
        .dark .recent-section .resource-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }
        
        /* Animation for cards */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Carousel wrapper styles */
        .carousel-wrapper :global(.swiper-button-next),
        .carousel-wrapper :global(.swiper-button-prev) {
          color: white !important;
          background: rgba(0, 0, 0, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .carousel-wrapper :global(.swiper-button-next:hover),
        .carousel-wrapper :global(.swiper-button-prev:hover) {
          background: rgba(0, 0, 0, 0.6);
        }
        
        .carousel-wrapper :global(.swiper-pagination-bullet) {
          background: white !important;
          opacity: 0.7;
        }
        
        .carousel-wrapper :global(.swiper-pagination-bullet-active) {
          background: white !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Home;