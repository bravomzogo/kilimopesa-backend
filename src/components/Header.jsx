import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Determine if current page has light background
  const lightPages = ['/products', '/land', '/inputs', '/services', '/videos'];
  const isLightPage = lightPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', name: 'Nyumbani' },
    { path: '/products', name: 'Bidhaa' },
    { path: '/land', name: 'Ardhi' },
    { path: '/inputs', name: 'Pembejeo' },
    { path: '/services', name: 'Huduma' },
    { path: '/videos', name: 'Kilimo TV' },
  ];

  // Header background and text colors based on state
  const headerBg = scrolled || isLightPage ? 'bg-white' : 'bg-transparent';
  const textColor = scrolled || isLightPage ? 'text-gray-800' : 'text-white';
  const logoBg = scrolled || isLightPage ? 'bg-green-600' : 'bg-white';
  const logoText = scrolled || isLightPage ? 'text-green-700' : 'text-white';
  const logoIcon = scrolled || isLightPage ? 'text-white' : 'text-green-600';
  const navHover = scrolled || isLightPage ? 'hover:text-green-600' : 'hover:text-green-200';
  const activeNav = scrolled || isLightPage ? 'text-green-600' : 'text-white';
  const mobileMenuBg = scrolled || isLightPage ? 'bg-white' : 'bg-green-700';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${headerBg} ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className={`w-12 h-12 rounded-full ${logoBg} flex items-center justify-center shadow-md`}>
                <FaLeaf className={`text-xl ${logoIcon}`} />
              </div>
              <span className={`text-2xl font-bold ${logoText} hidden sm:block`}>KilimoPesa</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`relative px-3 py-2 font-medium transition-colors ${location.pathname === link.path 
                    ? activeNav 
                    : `${textColor} ${navHover}`}`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-1/2 bottom-0 block h-1 w-6 -translate-x-1/2 bg-green-400 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg focus:outline-none"
            aria-label="Menu"
          >
            {isOpen ? (
              <FiX className={`text-2xl ${textColor}`} />
            ) : (
              <FiMenu className={`text-2xl ${textColor}`} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden mt-4 pb-6 ${mobileMenuBg} rounded-lg shadow-lg`}
            >
              <nav className="flex flex-col space-y-2 p-4">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium ${location.pathname === link.path 
                        ? 'bg-green-600 text-white' 
                        : scrolled || isLightPage 
                          ? 'text-gray-700 hover:bg-gray-100' 
                          : 'text-white hover:bg-green-600'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;