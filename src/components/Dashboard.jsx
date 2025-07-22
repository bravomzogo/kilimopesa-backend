import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaPlus, FaTractor, FaSeedling, FaTools, FaServicestack, FaVideo, FaSpinner } from 'react-icons/fa';

// Set Axios base URL and default credentials
axios.defaults.baseURL = 'https://nyangi-market.onrender.com';
axios.defaults.withCredentials = true;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [lands, setLands] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [services, setServices] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf/');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        toast.error('Failed to initialize request. Please try again.');
      }
    };
    fetchCsrfToken();
  }, []);

  // Fetch user data and resources on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user details
        const userResponse = await axios.get('/api/user/', { withCredentials: true });
        setUser(userResponse.data);

        // Fetch user's resources
        const [productsResponse, landsResponse, inputsResponse, servicesResponse, videosResponse] = await Promise.all([
          axios.get('/api/products/', { withCredentials: true }),
          axios.get('/api/land/', { withCredentials: true }),
          axios.get('/api/inputs/', { withCredentials: true }),
          axios.get('/api/services/', { withCredentials: true }),
          axios.get('/api/videos/', { withCredentials: true }),
        ]);

        setProducts(productsResponse.data.filter(item => item.user === userResponse.data.username));
        setLands(landsResponse.data.filter(item => item.user === userResponse.data.username));
        setInputs(inputsResponse.data.filter(item => item.user === userResponse.data.username));
        setServices(servicesResponse.data.filter(item => item.user === userResponse.data.username));
        setVideos(videosResponse.data.filter(item => item.user === userResponse.data.username));
      } catch (error) {
        console.error('Error fetching data:', error);
        let errorMessage = error.response?.data?.error || 'Failed to load dashboard data';
        if (error.response?.status === 401 || error.response?.status === 403) {
          errorMessage = 'Session expired or invalid. Please log in again.';
          navigate('/');
        } else if (error.request) {
          errorMessage = 'No response from server. Check if the backend is running.';
        }
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/logout/', {}, {
        headers: { 'X-CSRFToken': csrfToken },
        withCredentials: true
      });
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      let errorMessage = error.response?.data?.error || 'Logout failed';
      if (error.response?.status === 403) {
        errorMessage = 'Invalid CSRF token. Please try again.';
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for adding new resources (to be implemented)
  const handleAddResource = (resourceType) => {
    toast.info(`Add ${resourceType} functionality coming soon!`);
    // Future implementation: Navigate to a form for creating new resource
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-green-50 min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <FaSpinner className="animate-spin text-4xl text-green-500" />
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-800">
          Welcome to Your KilimoPesa Dashboard
        </h1>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            disabled={isLoading || !csrfToken}
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </motion.div>

      {/* User Info */}
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
          <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Email Verified:</strong> {user.is_email_verified ? 'Yes' : 'No'}</p>
        </motion.div>
      )}

      {/* Resources Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">My Products</h3>
            <button
              onClick={() => handleAddResource('Product')}
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Product
            </button>
          </div>
          {products.length > 0 ? (
            <ul className="space-y-2">
              {products.map(product => (
                <li key={product.id} className="border-b py-2">
                  <p className="text-gray-700"><strong>{product.name}</strong> - {product.category.name}</p>
                  <p className="text-gray-600">Price: ${product.price} | Quantity: {product.quantity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No products added yet.</p>
          )}
        </motion.div>

        {/* Land */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">My Land</h3>
            <button
              onClick={() => handleAddResource('Land')}
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Land
            </button>
          </div>
          {lands.length > 0 ? (
            <ul className="space-y-2">
              {lands.map(land => (
                <li key={land.id} className="border-b py-2">
                  <p className="text-gray-700"><strong>{land.title}</strong> - {land.location}</p>
                  <p className="text-gray-600">Size: {land.size} acres | Price: ${land.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No land added yet.</p>
          )}
        </motion.div>

        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">My Inputs</h3>
            <button
              onClick={() => handleAddResource('Input')}
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Input
            </button>
          </div>
          {inputs.length > 0 ? (
            <ul className="space-y-2">
              {inputs.map(input => (
                <li key={input.id} className="border-b py-2">
                  <p className="text-gray-700"><strong>{input.name}</strong></p>
                  <p className="text-gray-600">Price: ${input.price} | Quantity: {input.quantity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No inputs added yet.</p>
          )}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">My Services</h3>
            <button
              onClick={() => handleAddResource('Service')}
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Service
            </button>
          </div>
          {services.length > 0 ? (
            <ul className="space-y-2">
              {services.map(service => (
                <li key={service.id} className="border-b py-2">
                  <p className="text-gray-700"><strong>{service.title}</strong> - {service.location}</p>
                  <p className="text-gray-600">Price: ${service.price || 'N/A'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No services added yet.</p>
          )}
        </motion.div>

        {/* Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">My Videos</h3>
            <button
              onClick={() => handleAddResource('Video')}
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Video
            </button>
          </div>
          {videos.length > 0 ? (
            <ul className="space-y-2">
              {videos.map(video => (
                <li key={video.id} className="border-b py-2">
                  <p className="text-gray-700"><strong>{video.title}</strong></p>
                  <p className="text-gray-600">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtube_video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch Video
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No videos added yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;