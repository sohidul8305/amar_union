import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ex_chairmans = () => {
  // সাবেক চেয়ারম্যানদের ডাটাবেজ স্টেট (ডিফল্ট ব্যাকআপ সহ)
  const [exChairmansList, setExChairmansList] = useState([
    { id: 1, name: 'আলহাজ্ব মোঃ শামসুল হক', title: 'সাবেক চেয়ারম্যান', duration: '২০১৬ - ২০২২', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300', status: 'জীবিত', village: 'উত্তর পাড়া' },
    { id: 2, name: 'মরহুম আলতাফ আলী মিয়া', title: 'সাবেক চেয়ারম্যান', duration: '২০১১ - ২০১৬', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', status: 'প্রয়াত', village: 'দক্ষিণ বাজার' },
    { id: 3, name: 'মোঃ দেলোয়ার হোসেন (বিএ)', title: 'সাবেক চেয়ারম্যান', duration: '২০০৩ - ২০১১', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', status: 'জীবিত', village: 'পূর্ব ধলপুর' },
    { id: 4, name: 'মরহুম আলহাজ্ব মফিজ উদ্দিন', title: 'সাবেক চেয়ারম্যান', duration: '১৯稳৮ - ২০০৩', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300', status: 'প্রয়াত', village: 'পশ্চিম পাড়া' }
  ]);
  
  const [loading, setLoading] = useState(true);

  // লাইভ ডাটাবেজ থেকে সাবেক চেয়ারম্যানদের তালিকা রিড করা
  useEffect(() => {
    const fetchExChairmans = async () => {
      try {
        const res = await axios.get('/api/ex-chairmans');
        if (res.data && res.data.chairmans) {
          setExChairmansList(res.data.chairmans);
        }
      } catch (err) {
        console.error("সাবেক চেয়ারম্যান ডেটা লোড করতে ব্যর্থ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExChairmans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            পূর্বতন চেয়ারম্যানবৃন্দ (Ex-Chairmen)
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            যাঁদের বলিষ্ঠ নেতৃত্ব ও অক্লান্ত পরিশ্রমে আমাদের ইউনিয়ন আজ একটি আদেশ ইউনিয়ন হিসেবে রূপ লাভ করেছে।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {exChairmansList.map((chairman, index) => (
            <div 
              key={chairman.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group relative"
            >
              {/* Badge: Order/Chronology */}
              <span className="absolute top-4 left-4 z-10 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                {index + 1} ম চেয়ারম্যান
              </span>

              {/* Status Badge (Living/Deceased) */}
              <span className={`absolute top-4 right-4 z-10 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm ${
                chairman.status === 'জীবিত' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-600 text-white'
              }`}>
                {chairman.status}
              </span>

              {/* Image Section */}
              <div className="relative h-60 bg-gray-200 overflow-hidden">
                <img 
                  src={chairman.image} 
                  alt={chairman.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {chairman.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {chairman.title}
                  </p>
                </div>

                {/* Timeline and Details Box */}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-semibold">কার্যকাল:</span>
                    <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded">
                      {chairman.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-semibold">গ্রাম:</span>
                    <span className="text-xs text-gray-700 font-medium truncate max-w-[150px]">
                      {chairman.village || 'উল্লেখ নেই'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Line */}
              <div className="h-1 w-full bg-green-600/30 group-hover:bg-green-600 transition-colors" />
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-xs text-gray-400 italic">
          * এই তালিকাটি পরিষদের কার্যবিবরণী পঞ্জিকা অনুযায়ী ধারাবাহিকভাবে সাজানো হয়েছে।
        </div>

      </div>
    </div>
  );
};

export default Ex_chairmans;