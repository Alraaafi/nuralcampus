import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaImage, FaLink, FaBook, FaGraduationCap, FaCloudUploadAlt, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadResource = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    coverPic: '',
    department: '',
    year: '',
    semester: '',
    courseName: '',
    downloadLink: '',
    type: ''
  });

  const departments = ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology'];
  const types = ['book', 'slide', 'note', 'others'];
  const years = ['1st', '2nd', '3rd', '4th'];
  const semesters = ['1st', '2nd'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoverImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const uploadFormData = new FormData();
    uploadFormData.append('coverImage', file);

    setUploadingCover(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/upload-resource-cover', uploadFormData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setFormData({ ...formData, coverPic: response.data.coverUrl });
        toast.success('Cover image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Error uploading cover image');
      setCoverPreview(null);
    } finally {
      setUploadingCover(false);
    }
  };

  const removeCoverImage = () => {
    setFormData({ ...formData, coverPic: '' });
    setCoverPreview(null);
    toast.success('Cover image removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.coverPic) {
      toast.error('Please upload a cover image');
      return;
    }
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to upload');
        navigate('/login');
        return;
      }

      const response = await axios.post('/api/resources/upload', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Resource uploaded successfully!');
      navigate('/e-library');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Upload Resource</h1>
        <p className="text-gray-600 dark:text-gray-400">Share your knowledge with the community</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Cover Image Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Cover Image <span className="text-red-500">*</span>
          </label>
          
          {!coverPreview && !formData.coverPic ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                className="hidden"
                id="coverImageInput"
                disabled={uploadingCover}
              />
              <label htmlFor="coverImageInput" className="cursor-pointer block">
                <FaCloudUploadAlt className="text-5xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {uploadingCover ? 'Uploading...' : 'Click to upload cover image'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Supported formats: JPEG, PNG, GIF, WEBP (Max 5MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="relative group">
              <img 
                src={coverPreview || formData.coverPic} 
                alt="Cover Preview" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('coverImageInput').click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaImage /> Change
                </button>
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Remove
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                className="hidden"
                id="coverImageInput"
                disabled={uploadingCover}
              />
            </div>
          )}
          {uploadingCover && (
            <div className="mt-2 text-center text-blue-600">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Uploading...
            </div>
          )}
        </div>

        {/* Resource Title */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Resource Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaBook className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter resource title"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Resource Type */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Resource Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {types.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`p-3 rounded-lg border-2 transition-all capitalize ${
                  formData.type === type 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
              Year <span className="text-red-500">*</span>
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year} Year</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem} Semester</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Name */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Course Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaGraduationCap className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="e.g., Data Structures, Calculus, Physics"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Download Link */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Download Link <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaLink className="absolute left-3 top-3 text-gray-400" />
            <input
              type="url"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleChange}
              placeholder="Google Drive, Mega, Dropbox, or direct link"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Supported: Google Drive, Mega, MediaFire, or any direct download link
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploadingCover}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Uploading...
            </>
          ) : (
            <>
              <FaUpload /> Publish Resource
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadResource;