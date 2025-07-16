import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiHeart, FiShare2, FiStar, FiFilter, FiSearch } from 'react-icons/fi';

const OrodhaYaVideo = () => {
  const [video, setVideo] = useState([]);
  const [inapakia, setInapakia] = useState(true);
  const [kosa, setKosa] = useState(null);
  const [vipendwa, setVipendwa] = useState(new Set());
  const [kategoriaChaguli, setKategoriaChaguli] = useState('zote');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('kilimo');

  useEffect(() => {
    const pataVideo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos/');
        setVideo(response.data);
      } catch (err) {
        setKosa('Imeshindikana kupata video. Tafadhali jaribu tena baadaye.');
        console.error('Kosa wakati wa kupata video:', err);
      } finally {
        setInapakia(false);
      }
    };

    pataVideo();
  }, []);

  const handleSearch = async () => {
    setInapakia(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/videos/youtube_search/?q=${searchQuery}`);
      setVideo(
        response.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          youtube_video_id: item.id.videoId,
          description: item.snippet.description,
          added_by: 'YouTube',
          category: item.snippet.category || { name: 'Zote' }, // Assuming category might be available
        }))
      );
      setKosa(null);
    } catch (err) {
      setKosa('Imeshindikana kutafuta video za YouTube. Tafadhali jaribu tena.');
      console.error('Kosa wakati wa kutafuta YouTube:', err);
    } finally {
      setInapakia(false);
    }
  };

  const badilishaVipendwa = (idYaVideo) => {
    const vipendwaVipya = new Set(vipendwa);
    vipendwaVipya.has(idYaVideo) ? vipendwaVipya.delete(idYaVideo) : vipendwaVipya.add(idYaVideo);
    setVipendwa(vipendwaVipya);
  };

  const kategoria = ['zote', ...new Set(video.map(v => v.category?.name).filter(Boolean))];
  const videoZilizochaguliwa = kategoriaChaguli === 'zote'
    ? video
    : video.filter(v => v.category?.name === kategoriaChaguli);

  if (inapakia) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
          <p className="text-gray-600">Inapakia video za kilimo...</p>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Video za Elimu ya Kilimo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pata video za elimu kuhusu kilimo moja kwa moja kutoka YouTube
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tafuta video za YouTube..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center transition duration-200"
          >
            <FiSearch className="mr-2" /> Tafuta
          </button>
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
              {videoZilizochaguliwa.length} video zilizopatikana
            </p>
            <button
              onClick={() => setKategoriaChaguli('zote')}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Safisha Vichujio
            </button>
          </div>
        </div>

        {videoZilizochaguliwa.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">Hakuna video zilizopatikana</h3>
            <p className="text-gray-500 mt-2">Badilisha kategoria au jaribu kutafuta tena</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoZilizochaguliwa.map(vid => (
              <div
                key={vid.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
              >
                {/* Video Embed */}
                <div className="relative">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${vid.youtube_video_id}`}
                    title={vid.title}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-t-xl"
                  ></iframe>
                  <button
                    onClick={() => badilishaVipendwa(vid.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow ${
                      vipendwa.has(vid.id) ? 'text-red-500 bg-white' : 'text-gray-400 bg-white'
                    }`}
                  >
                    <FiHeart className={`text-lg ${vipendwa.has(vid.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Maelezo ya Video */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{vid.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {vid.category?.name || 'Zote'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vid.description}</p>

                  <div className="mt-auto">
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`${i < 4 ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">(24)</span>
                    </div>

                    <p className="text-sm text-gray-500">Mtoa Huduma: {vid.added_by}</p>
                  </div>
                </div>

                {/* Vitendo vya Video */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <button className="text-gray-500 hover:text-green-600 flex items-center transition">
                      <FiShare2 className="mr-1" /> Shiriki
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${vid.youtube_video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium transition"
                    >
                      Angalia kwenye YouTube
                    </a>
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

export default OrodhaYaVideo;