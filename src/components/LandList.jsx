import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShare2, FiFilter, FiSearch, FiArrowUp, FiArrowDown, FiX, FiMapPin, FiLayers, FiDollarSign } from 'react-icons/fi';

const OrodhaYaArdhi = () => {
  const [ardhi, setArdhi] = useState([]);
  const [inapakia, setInapakia] = useState(true);
  const [kosa, setKosa] = useState(null);
  const [haliChaguo, setHaliChaguo] = useState('zote');
  const [eneoChaguo, setEneoChaguo] = useState('zote');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedArdhi, setSelectedArdhi] = useState(null);

  useEffect(() => {
    const pataArdhi = async () => {
      try {
        const response = await axios.get('https://nyangi-market.onrender.com/api/land/');
        setArdhi(response.data);
      } catch (err) {
        setKosa('Imeshindikana kupata orodha ya ardhi. Tafadhali jaribu tena baadaye.');
        console.error('Kosa wakati wa kupata ardhi:', err);
      } finally {
        setInapakia(false);
      }
    };

    pataArdhi();
  }, []);

  const maeneo = ['zote', ...new Set(ardhi.map(a => a.location).filter(Boolean))];
  const hali = ['zote', 'inauzwa', 'haizuiliwi'];

  const ardhiZilizochaguliwa = ardhi
    .filter(a => {
      const kwaHali =
        haliChaguo === 'zote' ||
        (haliChaguo === 'inauzwa' && a.is_for_sale) ||
        (haliChaguo === 'haizuiliwi' && !a.is_for_sale);
      const kwaEneo = eneoChaguo === 'zote' || a.location === eneoChaguo;
      const kwaJina = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      return kwaHali && kwaEneo && kwaJina;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'size-asc') return a.size - b.size;
      if (sortOption === 'size-desc') return b.size - a.size;
      if (sortOption === 'title-asc') return a.title.localeCompare(b.title);
      if (sortOption === 'title-desc') return b.title.localeCompare(a.title);
      return 0;
    });

  const openModal = (ardhi) => {
    setSelectedArdhi(ardhi);
  };

  const closeModal = () => {
    setSelectedArdhi(null);
  };

  if (inapakia) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
          <p className="text-gray-600">Inapakia orodha ya ardhi...</p>
        </div>
      </div>
    );
  }

  if (kosa) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md rounded-lg">
          <h3 className="text-red-800 font-bold">Kosa Limetokea</h3>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Orodha ya Ardhi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tafuta ardhi bora kwa ajili ya kilimo, makazi au uwekezaji
          </p>
        </div>

        {/* Search and Sort Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tafuta ardhi kwa jina..."
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
            <option value="size-asc">Ukubwa: Mdogo hadi Mkubwa</option>
            <option value="size-desc">Ukubwa: Mkubwa hadi Mdogo</option>
            <option value="title-asc">Jina: A hadi Z</option>
            <option value="title-desc">Jina: Z hadi A</option>
          </select>
        </div>

        {/* Mobile Filters Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white rounded-lg"
          >
            <FiFilter className="mr-2" />
            Chagua Vichujio
          </button>
        </div>

        {/* Filters Section */}
        <div className={`${filtersOpen ? 'block' : 'hidden'} md:block mb-8 bg-white p-4 rounded-xl shadow-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chagua Eneo</label>
              <select
                value={eneoChaguo}
                onChange={(e) => setEneoChaguo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                {maeneo.map(eneo => (
                  <option key={eneo} value={eneo}>
                    {eneo === 'zote' ? 'Maeneo Yote' : eneo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hali ya Ardhi</label>
              <select
                value={haliChaguo}
                onChange={(e) => setHaliChaguo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                {hali.map(hal => (
                  <option key={hal} value={hal}>
                    {hal === 'zote' ? 'Hali Zote' : hal === 'inauzwa' ? 'Inauzwa' : 'Haizuiliwi'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{ardhiZilizochaguliwa.length} ardhi zilizopatikana</p>
            <button
              onClick={() => {
                setEneoChaguo('zote');
                setHaliChaguo('zote');
                setSearchQuery('');
                setSortOption('default');
              }}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Safisha Vichujio
            </button>
          </div>
        </div>

        {ardhiZilizochaguliwa.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">Hakuna ardhi zilizopatikana</h3>
            <p className="text-gray-500 mt-2">Badilisha vichujio vyako, tafuta tena, au rudi baadaye</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ardhiZilizochaguliwa.map(ardhi => (
              <div
                key={ardhi.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                {/* Picha ya Ardhi */}
                <div className="relative group">
                  {ardhi.image && (
                    <img
                      src={`https://nyangi-market.onrender.com${ardhi.image}`}
                      alt={ardhi.title}
                      className="w-full h-56 object-cover rounded-t-xl transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
                      }}
                    />
                  )}
                  <div
                    className={`absolute bottom-3 left-3 text-white text-xs font-medium px-2 py-1 rounded ${
                      ardhi.is_for_sale ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                  >
                    {ardhi.is_for_sale ? 'Inauzwa' : 'Haizuiliwi'}
                  </div>
                </div>

                {/* Maelezo ya Ardhi */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{ardhi.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{ardhi.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <FiDollarSign className="text-green-600 mr-2" />
                      <span className="font-bold text-lg text-green-700">TSh {Math.floor(ardhi.price).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiLayers className="text-green-600 mr-2" />
                      <span>{ardhi.size} ekari</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiMapPin className="text-green-600 mr-2" />
                      <span>{ardhi.location}</span>
                    </div>
                  </div>
                </div>

                {/* Vitendo */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <button className="text-gray-500 hover:text-green-600 flex items-center transition">
                      <FiShare2 className="mr-1" /> Shiriki
                    </button>
                    <button
                      onClick={() => openModal(ardhi)}
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

        {/* Modal for Land Details */}
        {selectedArdhi && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FiX className="text-2xl" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedArdhi.title}</h2>
              {selectedArdhi.image && (
                <img
                  src={`https://nyangi-market.onrender.com${selectedArdhi.image}`}
                  alt={selectedArdhi.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
                  }}
                />
              )}
              <p className="text-gray-700 mb-4">{selectedArdhi.description}</p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <FiDollarSign className="text-green-600 mr-2" />
                  <span className="font-bold text-lg text-green-700">TSh {Math.floor(selectedArdhi.price).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiLayers className="text-green-600 mr-2" />
                  <span>{selectedArdhi.size} ekari</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiMapPin className="text-green-600 mr-2" />
                  <span>{selectedArdhi.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">Hali:</span>
                  <span className={`ml-2 text-sm ${selectedArdhi.is_for_sale ? 'text-green-600' : 'text-blue-600'}`}>
                    {selectedArdhi.is_for_sale ? 'Inauzwa' : 'Haizuiliwi'}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
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

export default OrodhaYaArdhi;