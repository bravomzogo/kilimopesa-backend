import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, 
  FiInstagram, FiLinkedin, FiYoutube 
} from 'react-icons/fi';
import { FaWhatsapp, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const footerLinks = [
    {
      title: 'Bidhaa',
      links: [
        { name: 'Mazao', url: '/products/crops' },
        { name: 'Mifugo', url: '/products/livestock' },
        { name: 'Pembejeo', url: '/inputs' },
      ],
    },
    {
      title: 'Huduma',
      links: [
        { name: 'Kukodisha Ardhi', url: '/services/land' },
        { name: 'Ushauri wa Kilimo', url: '/services/consultation' },
        { name: 'Vifaa vya Kilimo', url: '/services/equipment' },
      ],
    },
    {
      title: 'Kampuni',
      links: [
        { name: 'Kuhusu Sisi', url: '/about' },
        { name: 'Kazi Zetu', url: '/careers' },
        { name: 'Blogu', url: '/blog' },
      ],
    },
  ];

  const socialIcons = [
    { icon: <FiFacebook />, url: 'https://facebook.com/kilimopesa' },
    { icon: <FiTwitter />, url: 'https://twitter.com/kilimopesa' },
    { icon: <FiInstagram />, url: 'https://instagram.com/kilimopesa' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/company/kilimopesa' },
    { icon: <FiYoutube />, url: 'https://youtube.com/kilimopesa' },
  ];

  return (
    <footer className="bg-gradient-to-b from-green-700 to-green-800 text-white">
      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-green-500 to-yellow-400"></div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-4">
              <FaLeaf className="text-3xl text-green-300 mr-2" />
              <h2 className="text-2xl font-bold">KilimoPesa</h2>
            </div>
            <p className="text-green-100 mb-6">
              Jukwaa la kilimo digital linalowaunganisha wakulima na wafanyabiashara kwa urahisi.
            </p>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Jiandikishe kwa Barua pepe</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Barua yako ya pepe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 rounded-lg bg-white bg-opacity-10 focus:bg-opacity-20 focus:outline-none text-white placeholder-green-200 border border-green-600"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  {subscribed ? 'Asante!' : 'Jiandikishe'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 border-b border-green-600 pb-2">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a 
                      href={link.url} 
                      className="text-green-100 hover:text-white transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact and social */}
        <div className="border-t border-green-700 pt-8">
          {/* Contact info */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="flex items-center justify-center md:justify-start">
              <FiMail className="text-xl mr-3 text-green-300" />
              <a href="mailto:msaada@kilimopesa.com" className="hover:text-green-300 transition-colors">
                msaada@kilimopesa.com
              </a>
            </div>
            <div className="flex items-center justify-center">
              <FiPhone className="text-xl mr-3 text-green-300" />
              <a href="tel:+255123456789" className="hover:text-green-300 transition-colors">
                +255 123 456 789
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <FaWhatsapp className="text-xl mr-3 text-green-300" />
              <a href="https://wa.me/255123456789" className="hover:text-green-300 transition-colors">
                Wasiliana kupitia WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Social media */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h4 className="text-sm text-green-300 mb-4">Tufuate kwenye mitandao ya kijamii</h4>
            <div className="flex space-x-6">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl text-white hover:text-green-300 transition-colors bg-green-700 bg-opacity-50 p-2 rounded-full"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-8 border-t border-green-700"
        >
          <p className="text-green-300 text-sm">
            &copy; {new Date().getFullYear()} KilimoPesa. Haki zote zimehifadhiwa.
          </p>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-green-400">
            <a href="/privacy" className="hover:text-white">Sera ya Faragha</a>
            <span>•</span>
            <a href="/terms" className="hover:text-white">Sheria na Masharti</a>
            <span>•</span>
            <a href="/cookies" className="hover:text-white">Sera ya Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;