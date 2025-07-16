import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch, FiShare2, FiPlay, FiExternalLink } from 'react-icons/fi';

const OrodhaYaVideo = () => {
  const [video, setVideo] = useState([]);
  const [inapakia, setInapakia] = useState(true);
  const [kosa, setKosa] = useState(null);
  const [kategoriaChaguli, setKategoriaChaguli] = useState('zote');
  const [searchQuery, setSearchQuery] = useState('kilimo');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const pataVideo = async () => {
      try {
        const response = await axios.get('https://nyangi-market.onrender.com/api/videos/');
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
      const response = await axios.get(`https://nyangi-market.onrender.com/api/videos/youtube_search/?q=${searchQuery}`);
      setVideo(
        response.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          youtube_video_id: item.id.videoId,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          added_by: 'YouTube',
          category: item.snippet.category || { name: 'Zote' },
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

  const kategoria = ['zote', ...new Set(video.map(v => v.category?.name).filter(Boolean))];
  const videoZilizochaguliwa = kategoriaChaguli === 'zote'
    ? video
    : video.filter(v => v.category?.name === kategoriaChaguli);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

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
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Maktaba ya Video za Kilimo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jifunze mbinu mpya za kilimo kupitia video bora kutoka kwa wataalamu
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tafuta video za kilimo..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition duration-200"
            >
              <FiSearch className="mr-2" /> Tafuta
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {kategoria.map(kat => (
              <button
                key={kat}
                onClick={() => setKategoriaChaguli(kat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  kategoriaChaguli === kat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {kat === 'zote' ? 'Zote' : kat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {videoZilizochaguliwa.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">Hakuna video zilizopatikana</h3>
            <p className="text-gray-500 mt-2">Badilisha maneno ya utafutaji au kategoria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoZilizochaguliwa.map(vid => (
              <div
                key={vid.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                {/* Video Thumbnail with Play Button */}
                <div className="relative cursor-pointer" onClick={() => openVideoModal(vid)}>
                  <img
                    src={vid.thumbnail || `https://img.youtube.com/vi/${vid.youtube_video_id}/maxresdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <FiPlay className="text-green-600 text-xl" />
                    </div>
                  </div>
                </div>

                {/* Video Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{vid.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{vid.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">Mtoa huduma: {vid.added_by}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {vid.category?.name || 'Zote'}
                    </span>
                  </div>
                </div>

                {/* Video Actions */}
                <div className="px-6 pb-6 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${vid.youtube_video_id}`);
                        alert('Kiungo kimepakuliwa!');
                      }}
                      className="text-gray-500 hover:text-green-600 flex items-center transition"
                    >
                      <FiShare2 className="mr-1" /> Shiriki
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${vid.youtube_video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium flex items-center transition"
                    >
                      Fungua YouTube <FiExternalLink className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden">
            <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Mtoa huduma: {selectedVideo.added_by}</span>
                <button
                  onClick={closeVideoModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                >
                  Funga
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrodhaYaVideo;