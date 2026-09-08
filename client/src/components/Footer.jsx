import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Important Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li><a href="/e-library" className="hover:text-blue-400">E-Library</a></li>
              <li><a href="/top-contributors" className="hover:text-blue-400">Top Contributors</a></li>
              <li><a href="/upload" className="hover:text-blue-400">Upload Resources</a></li>
            </ul>
          </div>

          {/* Developer Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Developer Contact</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/alraaafi/" className="hover:text-blue-400"><FaGithub size={24} /></a>
              <a href="https://www.linkedin.com/in/alraafi/" className="hover:text-blue-400" target="_blank" rel="noreferrer"><FaLinkedin size={24} /></a>
              <a href="mailto:rafi122283pro@gmail.com" className="hover:text-blue-400"><FaEnvelope size={24} /></a>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-sm">
              NuralCampus provides intelligent academic resource management for students and educators.
            </p>
            <p className="text-sm mt-2">
              Made For <FaHeart className="inline text-red-500" /> Easy Learning.
            </p>
            <p className="text-sm mt-2">
              Project Owner: Md. Tanvir Ahmed (Alraaafi) - CSE, JSTU
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>&copy; 2026 NuralCampus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;