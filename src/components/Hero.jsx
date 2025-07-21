import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaPlayCircle, FaTimes, FaCheck, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [verificationData, setVerificationData] = useState({
    email: '',
    code: ''
  });

  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/register/', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password
      }, {
        withCredentials: true
      });
      
      setVerificationData({
        email: registerData.email,
        code: ''
      });
      setShowRegisterModal(false);
      setShowVerificationModal(true);
      toast.success('Verification code sent to your email');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/login/', {
        email: loginData.email,
        password: loginData.password
      }, {
        withCredentials: true
      });
      
      setShowLoginModal(false);
      toast.success('Login successful');
      navigate('/dashboard'); // Redirect to dashboard or home page
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/verify-email/', verificationData, {
        withCredentials: true
      });
      
      setShowVerificationModal(false);
      toast.success('Email verified successfully!');
      navigate('/dashboard'); // Redirect to dashboard or home page
    } catch (error) {
      console.error('Verification error:', error);
      toast.error(error.response?.data?.error || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/resend-verification/', { email: verificationData.email }, {
        withCredentials: true
      });
      toast.success('Verification code resent successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resend verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-green-50 overflow-hidden">
      <div className="relative h-screen max-h-[800px]">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
          aria-label="Farm landscape with crops"
        >
          <div className="absolute inset-0 bg-green-800 bg-opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-6 leading-tight">
              <span className="block">Kuza Biashara Yako</span>
              <span className="text-yellow-300">Kwa Kilimo cha Kisasa</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 mb-8 opacity-90">
              KilimoPesa inakupa fursa ya kufikia soko pana, kupata mafunzo, na kuungana na wakulima wengine kupitia teknolojia.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowRegisterModal(true)}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg flex items-center gap-2 transition-colors duration-300"
                aria-label="Register now"
              >
                Jiunge Sasa <FaArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDemoModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white flex items-center gap-2 transition-colors duration-300"
                aria-label="Watch demo"
              >
                <FaPlayCircle className="text-xl" /> Kilimopesa ni nini?
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-green-800 bg-opacity-80 py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "10,000+", label: "Wakulima" },
                { value: "50,000+", label: "Bidhaa" },
                { value: "5,000+", label: "Acre za Ardhi" }
              ].map((stat, index) => (
                <div key={index} className="p-2">
                  <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
                  <p className="text-sm text-gray-100 opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Jiunge na KilimoPesa</h2>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-gray-700 mb-2">Jina la Mtumiaji</label>
                <input 
                  type="text" 
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Weka jina lako"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Barua Pepe</label>
                <input 
                  type="email" 
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nenosiri</label>
                <input 
                  type="password" 
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Weka nenosiri"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Thibitisha Nenosiri</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Andika nenosiri tena"
                  required
                />
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
              
              <p className="text-center text-gray-600 mt-4">
                Tayari una akaunti?{' '}
                <button 
                  type="button"
                  onClick={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                  }}
                  className="text-green-600 hover:underline"
                >
                  Ingia
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Ingia kwenye Akaunti Yako</h2>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-700 mb-2">Barua Pepe</label>
                <input 
                  type="email" 
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nenosiri</label>
                <input 
                  type="password" 
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Weka nenosiri"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold mt-4 flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Inaingia...
                  </>
                ) : 'Ingia'}
              </button>
              
              <p className="text-center text-gray-600 mt-4">
                Huna akaunti?{' '}
                <button 
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                  }}
                  className="text-green-600 hover:underline"
                >
                  Jisajili
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Thibitisha Barua Pepe</h2>
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Tumepeleka nambari ya uthibitisho kwenye barua pepe: <span className="font-semibold">{verificationData.email}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Ikiwa haujaipokea, angalia kwenye spam au{' '}
                <button 
                  onClick={handleResendVerification}
                  className="text-green-600 hover:underline"
                  disabled={isLoading}
                >
                  bonyeza hapa
                </button> kutuma tena.
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={handleVerify}>
              <div>
                <label className="block text-gray-700 mb-2">Nambari ya Uthibitisho</label>
                <input 
                  type="text" 
                  name="code"
                  value={verificationData.code}
                  onChange={handleVerificationChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Weka nambari 6"
                  maxLength="6"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold mt-4 flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Inathibitisha...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" /> Thibitisha
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Demo Video Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">KilimoPesa ni nini?</h2>
              <button 
                onClick={() => setShowDemoModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-96 rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700">
                KilimoPesa ni jukwaa la kidijitali linalowawezesha wakulima kufanya biashara, kupata mafunzo,
                na kuungana na wadau mbalimbali wa sekta ya kilimo.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Hero;