import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    { path: 'api/products', name: 'Bidhaa' },
    { path: '/api/land', name: 'Ardhi' },
    { path: 'api/inputs', name: 'Pembejeo' },
    { path: 'api/services', name: 'Huduma' },
    { path: 'api/videos', name: 'Mafunzo' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
  };

  // Header background and text colors based on state
  const headerBg = scrolled || isLightPage ? 'bg-white' : 'bg-transparent';
  const textColor = scrolled || isLightPage ? 'text-gray-800' : 'text-white';
  const logoBg = scrolled || isLightPage ? 'bg-green-600' : 'bg-white';
  const logoText = scrolled || isLightPage ? 'text-green-700' : 'text-white';
  const logoIcon = scrolled || isLightPage ? 'text-white' : 'text-green-600';
  const navHover = scrolled || isLightPage ? 'hover:text-green-600' : 'hover:text-green-200';
  const activeNav = scrolled || isLightPage ? 'text-green-600' : 'text-white';
  const iconBg = scrolled || isLightPage ? 'bg-gray-100' : 'bg-white bg-opacity-20';
  const iconColor = scrolled || isLightPage ? 'text-gray-700' : 'text-white';
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full ${iconBg} ${iconColor}`}
              aria-label="Search"
            >
              <FiSearch className="text-xl" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full relative ${iconBg} ${iconColor}`}
              aria-label="Cart"
            >
              <FiShoppingCart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${iconBg} ${iconColor}`}
              aria-label="Account"
            >
              <FiUser className="text-xl" />
            </motion.button>
          </div>

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

        {/* Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl relative">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Tafuta bidhaa, ardhi, nk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 pl-16 pr-4 rounded-full bg-gray-100 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    autoFocus
                  />
                  <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                </form>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Close search"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

              <div className="flex justify-center space-x-4 p-4 border-t border-gray-200">
                <button className={`p-3 rounded-full ${scrolled || isLightPage ? 'bg-gray-100 text-gray-700' : 'bg-green-600 text-white'}`}>
                  <FiShoppingCart className="text-xl" />
                </button>
                <button className={`p-3 rounded-full ${scrolled || isLightPage ? 'bg-gray-100 text-gray-700' : 'bg-green-600 text-white'}`}>
                  <FiUser className="text-xl" />
                </button>
                <button 
                  onClick={() => setSearchOpen(true)}
                  className={`p-3 rounded-full ${scrolled || isLightPage ? 'bg-gray-100 text-gray-700' : 'bg-green-600 text-white'}`}
                >
                  <FiSearch className="text-xl" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;