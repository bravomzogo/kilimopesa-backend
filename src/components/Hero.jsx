import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';

// Color options - customize these as needed
const colorOptions = {
  primary: 'bg-green-600',       // Main brand color
  secondary: 'bg-yellow-500',    // Accent color
  light: 'bg-green-50',          // Light background
  dark: 'bg-green-800',          // Dark background
  text: 'text-gray-800',         // Main text color
  textLight: 'text-gray-100',    // Light text color
  buttonPrimary: 'bg-green-700 hover:bg-green-800',  // Primary button
  buttonSecondary: 'bg-yellow-500 hover:bg-yellow-600' // Secondary button
};

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Sample registration function
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      await axios.post('/api/register');
      setShowModal(false);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`relative ${colorOptions.light} overflow-hidden`}>
      {/* Full-width hero image with overlay */}
      <div className="relative h-screen max-h-[800px]">
        {/* Background image - replace with your actual image */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
          aria-label="Farm landscape with crops"
        >
          {/* Dark overlay for better text contrast */}
          <div className={`absolute inset-0 ${colorOptions.dark} bg-opacity-40`}></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colorOptions.textLight} mb-6 leading-tight`}>
              <span className="block">Kuza Biashara Yako</span>
              <span className="text-yellow-300">Kwa Kilimo cha Kisasa</span>
            </h1>
            
            <p className={`text-lg md:text-xl ${colorOptions.textLight} mb-8 opacity-90`}>
              KilimoPesa inakupa fursa ya kufikia soko pana, kupata mafunzo, na kuwaungana na wakulima wengine kupitia teknolojia.
            </p>

            {/* Button group with proper spacing and hierarchy */}
            <div className="flex flex-wrap gap-4">
              {/* Primary CTA button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowModal(true)}
                className={`${colorOptions.buttonPrimary} text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg flex items-center gap-2 transition-colors duration-300`}
                aria-label="Register now"
              >
                {isLoading ? (
                  'Subiri...'
                ) : (
                  <>
                    Jiunge Sasa <FaArrowRight />
                  </>
                )}
              </motion.button>

              {/* Secondary CTA button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`${colorOptions.buttonSecondary} text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white flex items-center gap-2 transition-colors duration-300`}
                aria-label="Watch demo"
              >
                <FaPlayCircle className="text-xl" /> Tazama Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats bar at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 ${colorOptions.dark} bg-opacity-80 py-4`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "10,000+", label: "Wakulima" },
                { value: "50,000+", label: "Bidhaa" },
                { value: "5,000+", label: "Acre za Ardhi" }
              ].map((stat, index) => (
                <div key={index} className="p-2">
                  <p className={`text-2xl font-bold ${colorOptions.textLight}`}>{stat.value}</p>
                  <p className={`text-sm ${colorOptions.textLight} opacity-80`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${colorOptions.light} rounded-xl p-8 max-w-md w-full shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Jiunge na KilimoPesa</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Jina la Mtumiaji</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Weka jina lako"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Barua Pepe</label>
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nenosiri</label>
                <input 
                  type="password" 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Weka nenosiri"
                />
              </div>
              
              <button
                type="button"
                onClick={handleRegister}
                className={`w-full ${colorOptions.buttonPrimary} text-white py-3 rounded-lg font-bold mt-4`}
              >
                {isLoading ? 'Inasajili...' : 'Sajili Sasa'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Hero;