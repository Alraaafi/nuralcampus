import React from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaFileAlt, FaBook, FaSlideshare, FaFilePdf, FaPlus } from 'react-icons/fa';

const UploadCard = () => {
  const resourceTypes = [
    { icon: <FaBook size={24} />, name: 'Book', color: 'bg-blue-500', type: 'book' },
    { icon: <FaSlideshare size={24} />, name: 'Slide', color: 'bg-green-500', type: 'slide' },
    { icon: <FaFilePdf size={24} />, name: 'Note', color: 'bg-purple-500', type: 'note' },
    { icon: <FaFileAlt size={24} />, name: 'Others', color: 'bg-orange-500', type: 'others' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border-2 border-dashed border-blue-300 dark:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-full">
              <FaUpload className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Upload Resource</h3>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold">+ New</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Share your knowledge with the community! Upload books, notes, slides, and other academic resources.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {resourceTypes.map((type, index) => (
            <div key={index} className="text-center">
              <div className={`${type.color} p-2 rounded-lg mb-1 text-white`}>
                {type.icon}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{type.name}</span>
            </div>
          ))}
        </div>
        
        <Link
          to="/upload"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform duration-200" />
          Upload Now
        </Link>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 text-center">
          Support: PDF, DOC, PPT, and more
        </p>
      </div>
    </div>
  );
};

export default UploadCard;