import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShare2, FiFilter, FiSearch, FiArrowUp, FiArrowDown, FiX } from 'react-icons/fi';

const OrodhaYaBidhaa = () => {
  const [bidhaa, setBidhaa] = useState([]);
  const [inapakia, setInapakia] = useState(true);
  const [kosa, setKosa] = useState(null);
  const [kategoriaChaguli, setKategoriaChaguli] = useState('zote');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedBidhaa, setSelectedBidhaa] = useState(null);

  useEffect(() => {
    const pataBidhaa = async () => {
      try {
        const response = await axios.get('https://nyangi-market.onrender.com/api/products/');
        setBidhaa(response.data);
      } catch (err) {
        setKosa('Imeshindikana kupata bidhaa. Tafadhali jaribu tena baadaye.');
        console.error('Kosa wakati wa kupata bidhaa:', err);
      } finally {
        setInapakia(false);
      }
    };

    pataBidhaa();
  }, []);

  const kategoria = ['zote', ...new Set(bidhaa.map(b => b.category?.name).filter(Boolean))];

  const bidhaaZilizochaguliwa = bidhaa
    .filter(b => kategoriaChaguli === 'zote' || b.category?.name === kategoriaChaguli)
    .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - b.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

  const openModal = (bidhaa) => {
    setSelectedBidhaa(bidhaa);
  };

  const closeModal = () => {
    setSelectedBidhaa(null);
  };

  if (inapakia) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
          <p className="text-gray-600">Inapakia mazao ya kilimo...</p>
        </div>
      </div>
    );
  }

  if (kosa) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md rounded-lg">
          <h3 className="text-red-800 font-bold">Kosa</h3>
          <p className="text-red-600 mb-3">{kosa}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 transition"
          >
            Jaribu Tena
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Soko la Mazao ya Kilimo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Moja kwa moja kutoka kwa wakulima wa eneo lako - mazao mapya ya kilimo
          </p>
        </div>

        {/* Search and Sort Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tafuta mazao..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="default">Panga kwa: Chaguo la Msingi</option>
            <option value="price-asc">Bei: Chini hadi Juu</option>
            <option value="price-desc">Bei: Juu hadi Chini</option>
            <option value="name-asc">Jina: A hadi Z</option>
            <option value="name-desc">Jina: Z hadi A</option>
          </select>
        </div>

        {/* Mobile Filters Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white rounded-lg"
          >
            <FiFilter className="mr-2" />
            Chagua Kategoria
          </button>
        </div>

        {/* Filters Section */}
        <div className={`${filtersOpen ? 'block' : 'hidden'} md:block mb-8 bg-white p-4 rounded-xl shadow-sm`}>
          <div className="flex flex-wrap justify-center gap-2">
            {kategoria.map(kat => (
              <button
                key={kat}
                onClick={() => setKategoriaChaguli(kat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  kategoriaChaguli === kat
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {kat === 'zote' ? 'Zote' : kat.charAt(0).toUpperCase() + kat.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              {bidhaaZilizochaguliwa.length} mazao yaliyopatikana
            </p>
            <button
              onClick={() => {
                setKategoriaChaguli('zote');
                setSearchQuery('');
                setSortOption('default');
              }}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Safisha Vichujio
            </button>
          </div>
        </div>

        {bidhaaZilizochaguliwa.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">Hakuna mazao yaliyopatikana</h3>
            <p className="text-gray-500 mt-2">Badilisha kategoria, tafuta tena, au rudi baadaye</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bidhaaZilizochaguliwa.map(bidhaa => (
              <div
                key={bidhaa.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                {/* Picha ya Mazao */}
                <div className="relative group">
                  {bidhaa.image && (
                    <img
                      src={`https://nyangi-market.onrender.com/api${bidhaa.image}`}
                      alt={bidhaa.name}
                      className="w-full h-60 object-cover rounded-t-xl transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
                      }}
                    />
                  )}
                  {bidhaa.quantity < 5 && (
                    <span className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Inakaribia Kuisha
                    </span>
                  )}
                </div>

                {/* Maelezo ya Mazao */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{bidhaa.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {bidhaa.category?.name || 'Zote'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bidhaa.description}</p>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-700">TSh {Math.floor(bidhaa.price)}</span>
                      <span className={`text-sm ${bidhaa.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {bidhaa.quantity > 0 ? `${bidhaa.quantity} zinapatikana` : 'Zimeisha'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vitendo vya Mazao */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <button className="text-gray-500 hover:text-green-600 flex items-center transition">
                      <FiShare2 className="mr-1" /> Shiriki
                    </button>
                    <button
                      onClick={() => openModal(bidhaa)}
                      className="text-green-600 hover:text-green-700 font-medium transition"
                    >
                      Angalia Maelezo Zaidi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Product Details */}
        {selectedBidhaa && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FiX className="text-2xl" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedBidhaa.name}</h2>
              {selectedBidhaa.image && (
                <img
                  src={`https://nyangi-market.onrender.com/api${selectedBidhaa.image}`}
                  alt={selectedBidhaa.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
                  }}
                />
              )}
              <p className="text-gray-700 mb-4">{selectedBidhaa.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-green-700">TSh {Math.floor(selectedBidhaa.price)}</span>
                <span className={`text-sm ${selectedBidhaa.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedBidhaa.quantity > 0 ? `${selectedBidhaa.quantity} zinapatikana` : 'Zimeisha'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Kategoria: {selectedBidhaa.category?.name || 'Zote'}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  Funga
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrodhaYaBidhaa;