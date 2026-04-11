// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBook, FaMoon, FaSun, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

// const Header = ({ isAuthenticated, user, onLogout, darkMode, setDarkMode }) => {
//   const navigate = useNavigate();

//   return (
//     <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo - Clickable to homepage */}
//           <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
//             <FaBook className="text-blue-600 text-2xl" />
//             <span className="text-xl font-bold text-gray-800 dark:text-white">NC</span>
//           </Link>

//           {/* Title - Also clickable to homepage */}
//           <Link to="/" className="text-center flex-1 hover:opacity-80 transition-opacity">
//             <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
//               NuralCampus: The Intelligent Academic Ecosystem
//             </h1>
//           </Link>

//           {/* Right Section */}
//           <div className="flex items-center space-x-4">
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             >
//               {darkMode ? <FaSun /> : <FaMoon />}
//             </button>

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   to={`/profile/${user?.username}`}
//                   className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
//                 >
//                   <img
//                     src={user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <span className="hidden md:inline">{user?.fullName}</span>
//                 </Link>
//                 <button
//                   onClick={onLogout}
//                   className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
//                 >
//                   <FaSignOutAlt />
//                   <span className="hidden md:inline">Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
//                 >
//                   <FaSignInAlt />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <FaUserPlus />
//                   <span>Register</span>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


































// //v5
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBook, FaMoon, FaSun, FaSignOutAlt, FaSignInAlt, 
  FaUserPlus, FaHome, FaBookOpen, FaTrophy, FaUpload,
  FaBars, FaTimes, FaGraduationCap, FaUserGraduate
} from 'react-icons/fa';

const Header = ({ isAuthenticated, user, onLogout, darkMode, setDarkMode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-wrapper">
            {/* Logo Section */}
            <Link to="/" className="logo">
              <div className="logo-icon">
                <FaGraduationCap />
              </div>
              <div className="logo-text">
                <span className="logo-name">Nural<span>Campus</span></span>
                <span className="logo-tag">Intelligent Ecosystem</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="nav-menu">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                <FaHome />
                <span>Home</span>
              </Link>
              <Link to="/e-library" className={`nav-link ${isActive('/e-library') ? 'active' : ''}`}>
                <FaBookOpen />
                <span>Library</span>
              </Link>
              <Link to="/top-contributors" className={`nav-link ${isActive('/top-contributors') ? 'active' : ''}`}>
                <FaTrophy />
                <span>Leaders</span>
              </Link>
              {isAuthenticated && (
                <Link to="/upload" className={`nav-link upload-link ${isActive('/upload') ? 'active' : ''}`}>
                  <FaUpload />
                  <span>Upload</span>
                </Link>
              )}
            </nav>

            {/* Right Section */}
            <div className="header-actions">
              {/* Dark Mode Toggle */}
              <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {/* Desktop User Section */}
              {isAuthenticated ? (
                <div className="user-area">
                  <Link to={`/profile/${user?.username}`} className="user-info">
                    <div className="user-avatar">
                      <img
                        src={user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                        alt={user?.fullName}
                      />
                      <span className="user-status"></span>
                    </div>
                    <div className="user-detail">
                      <span className="user-name">{user?.fullName?.split(' ')[0] || user?.fullName}</span>
                      <span className="user-email">{user?.email?.split('@')[0]}</span>
                    </div>
                  </Link>
                  <button onClick={onLogout} className="logout-btn">
                    <FaSignOutAlt />
                    <span>Exit</span>
                  </button>
                </div>
              ) : (
                <div className="auth-area">
                  <Link to="/login" className="login-btn">
                    <FaSignInAlt />
                    <span>Sign In</span>
                  </Link>
                  <Link to="/register" className="register-btn">
                    <FaUserPlus />
                    <span>Join Free</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="mobile-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <div className="mobile-logo">
            <FaGraduationCap />
            <span>NuralCampus</span>
          </div>
          <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
            <FaTimes />
          </button>
        </div>
        
        {isAuthenticated && (
          <div className="mobile-user">
            <img src={user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt={user?.fullName} />
            <div>
              <h4>{user?.fullName}</h4>
              <p>@{user?.username}</p>
            </div>
          </div>
        )}
        
        <nav className="mobile-nav">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`mobile-link ${isActive('/') ? 'active' : ''}`}>
            <FaHome /> Home
          </Link>
          <Link to="/e-library" onClick={() => setMobileMenuOpen(false)} className={`mobile-link ${isActive('/e-library') ? 'active' : ''}`}>
            <FaBookOpen /> E-Library
          </Link>
          <Link to="/top-contributors" onClick={() => setMobileMenuOpen(false)} className={`mobile-link ${isActive('/top-contributors') ? 'active' : ''}`}>
            <FaTrophy /> Top Contributors
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/upload" onClick={() => setMobileMenuOpen(false)} className="mobile-link upload-mobile">
                <FaUpload /> Upload Resource
              </Link>
              <Link to={`/profile/${user?.username}`} onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <FaUserGraduate /> My Profile
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="mobile-link logout-mobile">
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="mobile-link register-mobile">
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="header-spacer"></div>
    </>
  );
};

export default Header;