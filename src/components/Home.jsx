import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, 
  FaTractor, 
  FaVideo, 
  FaSeedling, 
  FaHandsHelping, 
  FaChartLine,
  FaQuoteLeft
} from 'react-icons/fa';
import Hero from './Hero';

const Home = () => {
  const services = [
    {
      title: "Soko la Mazao",
      description: "Uza na nunua mazao kwa urahisi kutoka kwa wakulima wa karibu nawe",
      icon: <FaLeaf className="text-3xl" />,
      link: "/products",
      color: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Ardhi ya Kilimo",
      description: "Pata au uweke ardhi yako kwa ajili ya kilimo na ufugaji",
      icon: <FaTractor className="text-3xl" />,
      link: "/land",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600"
    },
    {
      title: "Mafunzo ya Kilimo",
      description: "Jifunze mbinu mpya za kilimo kupitia video na makala",
      icon: <FaVideo className="text-3xl" />,
      link: "/videos",
      color: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Pembejeo na Vifaa",
      description: "Nunua mbegu, mbolea na vifaa vya kilimo kwa bei nafuu",
      icon: <FaSeedling className="text-3xl" />,
      link: "/inputs",
      color: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Huduma za Shambani",
      description: "Pata wataalam wa kilimo, ufugaji na usimamizi wa shamba",
      icon: <FaHandsHelping className="text-3xl" />,
      link: "/services",
      color: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      title: "Uchambuzi wa Soko",
      description: "Pata taarifa za soko na mienendo ya bei za mazao",
      icon: <FaChartLine className="text-3xl" />,
      link: "/market",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600"
    }
  ];

  const testimonials = [
    {
      quote: "Nimeongeza mapato yangu kwa 60% kwa kutumia KilimoPesa kupata soko la mazao yangu",
      name: "Juma Mwangi",
      location: "Mkulima wa Kahawa, Nyeri"
    },
    {
      quote: "Kupata ardhi ya kilimo kupitia KilimoPesa kulikuwa rahisi zaidi kuliko mfumo wa kawaida",
      name: "Asha Hassan",
      location: "Mfugaji wa Mbuzi, Taita"
    },
    {
      quote: "Mafunzo ya KilimoPesa yamenisaidia kuboresha mavuno yangu kwa zaidi ya mara mbili",
      name: "Pauline Wambui",
      location: "Mkulima wa Mboga, Kiambu"
    }
  ];

  return (
    <div className="bg-white">
      <Hero />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Huduma Zetu Za Kilimo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              KilimoPesa inakupa suluhisho zote za kilimo kwenye jukwaa moja
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={service.link} className="block h-full">
                  <div className={`${service.color} rounded-xl p-8 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg border border-gray-100`}>
                    <div className={`w-16 h-16 ${service.iconColor} bg-white rounded-full flex items-center justify-center shadow-sm mb-6`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    <div className="text-green-600 font-medium flex items-center">
                      Soma zaidi
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Wakulima Wanachosema
            </h2>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              Maoni ya wakulima waliotumia mfumo wetu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
              >
                <FaQuoteLeft className="text-green-300 text-3xl mb-4" />
                <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                <div className="border-t border-green-400/20 pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-green-200">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Jiunge na Jukwaa Letu Leo
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Fungua fursa mpya za kilimo na biashara ya mazao kwa kutumia teknolojia
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-block bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition duration-300"
                >
                  Jiunge Sasa - Ni Bure
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:bg-opacity-10 transition duration-300"
                >
                  Jifunze Zaidi
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;