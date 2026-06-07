import React, { useState } from 'react';

const Gellary = () => {
  // Category State
  const [activeFilter, setActiveFilter] = useState('সব');

  // Static Filter Categories
  const categories = ['সব', 'উন্নয়ন প্রকল্প', 'স্বাস্থ্যসেবা', 'নাগরিক সেবা', 'অনুষ্ঠান'];

  // Gallery Data
  const galleryItems = [
    {
      id: 1,
      title: 'বিনামূল্যে চিকিৎসা ও ফ্রি হেলথ ক্যাম্পেইন',
      category: 'স্বাস্থ্যসেবা',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      date: '০৭ জুন, ২০২৬'
    },
    {
      id: 2,
      title: 'নতুন পাকা রাস্তা নির্মাণ কাজের শুভ উদ্বোধন',
      category: 'উন্নয়ন প্রকল্প',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
      date: '০২ জুন, ২০২৬'
    },
    {
      id: 3,
      title: 'জাতীয় দিবসে বীর মুক্তিযোদ্ধাদের বিশেষ সংবর্ধনা',
      category: 'অনুষ্ঠান',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      date: '২৬ মার্চ, ২০২৬'
    },
    {
      id: 4,
      title: 'ভিজিডি (VGD) চাউল ও ত্রাণ বিতরণ কার্যক্রম',
      category: 'নাগরিক সেবা',
      image: 'https://images.unsplash.com/photo-1593113503873-e4b41224a6d5?auto=format&fit=crop&q=80&w=600',
      date: '১৮ মে, ২০২৬'
    },
    {
      id: 5,
      title: 'পরিষদের মাসিক সাধারণ সমন্বয় ও বাজেট সভা',
      category: 'অনুষ্ঠান',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      date: '১০ মে, ২০২৬'
    },
    {
      id: 6,
      title: 'স্মার্ট ডিজিটাল সেন্টারে ফ্রি ফ্রিল্যান্সিং ও কম্পিউটার প্রশিক্ষণ',
      category: 'নাগরিক সেবা',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      date: '০১ মে, ২০২৬'
    }
  ];

  // Filtering Logic
  const filteredItems = activeFilter === 'সব' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Centered Header */}
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

        {/* Dynamic Category Tabs / Filters */}
        {/* Mobile-e horizontal scroll korbe ebong desktop-e perfectly align thakbe */}
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

        {/* Photo Grid System */}
        {/* Columns: Mobile-e 1, Tablet-e 2, Desktop-e 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100/80 group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-gray-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                />
                
                {/* Floating Tags Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Top Category Badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-green-700 text-[11px] font-black px-3 py-1 rounded-xl shadow-sm">
                  {item.category}
                </span>

                {/* Floating Date Badge */}
                <span className="absolute bottom-4 right-4 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  📅 {item.date}
                </span>
              </div>

              {/* Card Footer Content */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <h3 className="text-base font-extrabold text-gray-800 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* Zoom Interactive Accent */}
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

        {/* Empty State handler (Filter e data na thakle) */}
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

export default Gellary;