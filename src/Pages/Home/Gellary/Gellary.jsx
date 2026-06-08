import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('সব');
  const [categories, setCategories] = useState(['সব']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/gallery');
        if (res.data.success) {
          const items = res.data.items;
          setGalleryItems(items);
          // ইউনিক ক্যাটাগরি বের করা
          const uniqueCats = ['সব', ...new Set(items.map(item => item.category))];
          setCategories(uniqueCats);
        }
      } catch (err) {
        console.error('গ্যালারি ডাটা লোড ব্যর্থ:', err);
      }
    };
    fetchData();
  }, []);

  const filteredItems = activeFilter === 'সব'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full shadow-xs">
            ইউনিয়ন আর্কাইভ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            ছবি ও ভিডিও গ্যালারি
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
            আমাদের ইউনিয়নের চলমান উন্নয়ন, সেবামূলক ক্যাম্পেইন এবং গৌরবোজ্জ্বল মুহূর্তগুলোর বাস্তব চিত্রশালা।
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none snap-x">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`whitespace-nowrap px-5 py-2 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all duration-300 snap-center ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-600/20'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* গ্রিড সিস্টেম */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100/80 group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden bg-gray-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-green-700 text-[11px] font-black px-3 py-1 rounded-xl shadow-sm">
                  {item.category}
                </span>
                <span className="absolute bottom-4 right-4 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  📅 {item.date || new Date(item.createdAt).toLocaleDateString('bn-BD')}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <h3 className="text-base font-extrabold text-gray-800 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-green-600 transition-colors">
                  <span>চিত্রপট বিবরণ</span>
                  <span className="transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-lg">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-xs">
            <span className="text-4xl">📸</span>
            <p className="mt-4 text-sm font-bold text-gray-400">এই ক্যাটাগরিতে বর্তমানে কোনো ছবি পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;