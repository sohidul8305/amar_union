import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breakingNews, setBreakingNews] = useState('');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await axios.get('/api/updates');
        if (res.data.success) {
          setUpdates(res.data.updates);
          // ব্রেকিং নিউজ হিসেবে সর্বশেষ জরুরি নোটিশ (প্রথমটি)
          const urgent = res.data.updates.find(u => u.tag === 'জরুরি নোটিশ');
          if (urgent) setBreakingNews(urgent.title);
        }
      } catch (err) {
        console.error('আপডেট লোড ব্যর্থ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            সর্বশেষ আপডেট ও নোটিশ
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            ইউনিয়ন পরিষদের সকল প্রকার সরকারি ঘোষণা, নোটিশ, উন্নয়নমূলক কর্মকাণ্ড এবং নাগরিক সেবার সর্বশেষ তথ্যাদি।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* ব্রেকিং নিউজ (যদি থাকে) */}
        {breakingNews && (
          <div className="mb-10 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 shadow-xs flex items-center justify-between gap-4 overflow-hidden">
            <div className="flex items-center gap-3 w-full">
              <span className="flex h-3 w-3 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <div className="text-xs sm:text-sm text-red-800 font-bold whitespace-nowrap">জরুরি ব্রেকিং:</div>
              <p className="text-xs sm:text-sm text-red-700 font-medium truncate">{breakingNews}</p>
            </div>
          </div>
        )}

        {/* আপডেট ফিড */}
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update._id} className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6 hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold text-white px-2.5 py-0.5 rounded-md ${update.tagColor}`}>
                    {update.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">📅 {update.date || 'তারিখ নেই'}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-3">
                  {update.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {update.description}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-end">
                <a href={update.link} className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 transition-colors bg-green-50 hover:bg-green-100/70 px-3 py-1.5 rounded-lg">
                  বিস্তারিত পড়ুন
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          {updates.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border">
              <p className="text-gray-400">কোনো আপডেট পাওয়া যায়নি।</p>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <button className="px-6 py-2.5 text-sm font-bold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-xs transition-colors">
            পুরানো নোটিশ আর্কাইভ দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;