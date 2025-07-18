import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

const RegisterModal = ({ onClose, showVerification }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Jina la mtumiaji linahitajika';
    if (!formData.email.trim()) newErrors.email = 'Barua pepe inahitajika';
    if (!formData.password) newErrors.password = 'Nenosiri linahitajika';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Nenosiri halifanani';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success('Nambari ya uthibitisho imetumwa kwenye barua pepe yako');
      showVerification(formData.email);
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.error || 'Hitilafu katika usajili');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Jiunge na KilimoPesa</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Jina la Mtumiaji</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none ${errors.username ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="Weka jina lako"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Barua Pepe</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Nenosiri</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="Weka nenosiri"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Thibitisha Nenosiri</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="Andika nenosiri tena"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold mt-4 flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Inasajili...
              </>
            ) : 'Sajili Sasa'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;