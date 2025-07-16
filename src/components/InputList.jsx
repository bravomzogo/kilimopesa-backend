import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiFilter } from 'react-icons/fi';

const OrodhaYaVifaa = () => {
  const [vifaa, setVifaa] = useState([]);
  const [inapakia, setInapakia] = useState(true);
  const [kosa, setKosa] = useState(null);
  const [vipendwa, setVipendwa] = useState(new Set());
  const [kategoriaChaguli, setKategoriaChaguli] = useState('zote');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const pataVifaa = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/inputs/');
        setVifaa(response.data);
      } catch (err) {
        setKosa('Imeshindikana kupata vifaa vya kilimo. Tafadhali jaribu tena baadaye.');
        console.error('Kosa wakati wa kupata vifaa:', err);
      } finally {
        setInapakia(false);
      }
    };

    pataVifaa();
  }, []);

  const badilishaVipendwa = (idYaVifaa) => {
    const vipendwaVipya = new Set(vipendwa);
    vipendwaVipya.has(idYaVifaa) ? vipendwaVipya.delete(idYaVifaa) : vipendwaVipya.add(idYaVifaa);
    setVipendwa(vipendwaVipya);
  };

  const kategoria = ['zote', ...new Set(vifaa.map(v => v.category?.name).filter(Boolean))];
  const vifaaVilizochaguliwa = kategoriaChaguli === 'zote'
    ? vifaa
    : vifaa.filter(v => v.category?.name === kategoriaChaguli);

  if (inapakia) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
          <p className="text-gray-600">Inapakia vifaa vya kilimo...</p>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Soko la Vifaa vya Kilimo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vifaa vya hali ya juu vya kilimo kuimarisha mavuno na ufanisi wa shughuli zako
          </p>
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
              {vifaaVilizochaguliwa.length} vifaa vilivyopatikana
            </p>
            <button
              onClick={() => setKategoriaChaguli('zote')}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Safisha Vichujio
            </button>
          </div>
        </div>

        {vifaaVilizochaguliwa.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">Hakuna vifaa vilivyopatikana</h3>
            <p className="text-gray-500 mt-2">Badilisha kategoria au rudi baadaye</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vifaaVilizochaguliwa.map(vifaa => (
              <div
                key={vifaa.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
              >
                {/* Picha ya Vifaa */}
                <div className="relative">
                  {vifaa.image && (
                    <img
                      src={`http://localhost:8000${vifaa.image}`}
                      alt={vifaa.name}
                      className="w-full h-60 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80';
                      }}
                    />
                  )}
                  <button
                    onClick={() => badilishaVipendwa(vifaa.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow ${
                      vipendwa.has(vifaa.id) ? 'text-red-500 bg-white' : 'text-gray-400 bg-white'
                    }`}
                  >
                    <FiHeart className={`text-lg ${vipendwa.has(vifaa.id) ? 'fill-current' : ''}`} />
                  </button>
                  {vifaa.quantity < 5 && (
                    <span className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Inakaribia Kuisha
                    </span>
                  )}
                </div>

                {/* Maelezo ya Vifaa */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{vifaa.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {vifaa.category?.name || 'Zote'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vifaa.description}</p>

                  <div className="mt-auto">
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`${i < 4 ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">(24)</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-700">TZS {vifaa.price.toLocaleString()}</span>
                      <span className={`text-sm ${vifaa.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {vifaa.quantity > 0 ? `${vifaa.quantity} ${vifaa.quantity > 1 ? 'vipimo' : 'kipimo'} vinapatikana` : 'Vimeisha'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Muuzaji: {vifaa.seller}</p>
                  </div>
                </div>

                {/* Vitendo vya Vifaa */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-100">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-200 mb-3">
                    <FiShoppingCart className="mr-2" />
                    Weka kwenye Carti
                  </button>
                  <div className="flex justify-between text-sm">
                    <button className="text-gray-500 hover:text-green-600 flex items-center transition">
                      <FiShare2 className="mr-1" /> Shiriki
                    </button>
                    <button className="text-green-600 hover:text-green-700 font-medium transition">
                      Angalia Maelezo Zaidi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrodhaYaVifaa;