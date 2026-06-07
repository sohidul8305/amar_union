import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Current_chairman = () => {
  const [liveChairman, setLiveChairman] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChairmanData = async () => {
      try {
        const response = await axios.get('/api/chairman');
        // ডাটাবেজে ডাটা পাওয়া গেলে স্টেট সেট হবে
        if (response.data && Object.keys(response.data).length > 0) {
          setLiveChairman(response.data);
        }
      } catch (error) {
        console.error("Chairman API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChairmanData();
  }, []);

  // ব্যাকআপ এবং ডিফল্ট চেয়ারম্যান তথ্য
  const chairmanData = liveChairman || {
    name: 'মোঃ আবদুর রহমান',
    title: 'সম্মানিত চেয়ারম্যান',
    union: '৫ নং মডেল ইউনিয়ন পরিষদ',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    joiningDate: '১০ জানুয়ারি, ২০২২',
    phone: '+৮৮০ ১৭১১-২২৩৩৪৪',
    email: 'chairman@union.gov.bd',
    address: 'চেয়ারম্যান বাসভবন, ইউনিয়ন পরিষদ কমপ্লেক্স।',
    message: 'আসসালামু আলাইকুম। আমাদের ইউনিয়নকে একটি আদর্শ, ডিজিটাল এবং দুর্নীতিমুক্ত ইউনিয়ন হিসেবে গড়ে তোলাই আমার প্রধান লক্ষ্য। ইউনিয়ন পরিষদের সকল সেবা জনগণের দোরগোড়ায় সহজে ও স্বচ্ছতার সাথে পৌঁছে দিতে আমরা নিরলসভাবে কাজ করে যাচ্ছি। আপনাদের যেকোনো মতামত বা সুপরামর্শ আমাদের এই পথচলাকে আরও বেগবান করবে। ধন্যবাদ।',
    bio: [
      { label: 'পিতার নাম', value: 'মরহুম আলহাজ্ব আলী আহমেদ' },
      { label: 'শিক্ষাগত যোগ্যতা', value: 'স্নাতকোত্তর (এম.এ)' },
      { label: 'রাজনৈতিক পদবী', value: 'সভাপতি, ইউনিয়ন আওয়ামী লীগ / বিএনপি / স্বতন্ত্র' },
      { label: 'সামাজিক অবদান', value: 'প্রধান উপদেষ্টা, স্থানীয় আলহাজ্ব আলী আহমেদ এতিমখানা ও সমাজকল্যাণ সংস্থা।' }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            বর্তমান চেয়ারম্যান প্রোফাইল
          </h1>
          <div className="mt-3 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image & Direct Contacts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center h-fit">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden ring-4 ring-green-500/10 mb-6 shadow-inner">
              <img 
                src={chairmanData.image || 'https://via.placeholder.com/300'} 
                alt={chairmanData.name} 
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">{chairmanData.name}</h2>
            <p className="text-sm font-semibold text-green-600 mt-1">{chairmanData.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{chairmanData.union}</p>

            {/* Quick Contact Info */}
            <div className="w-full mt-6 pt-6 border-t border-gray-100 space-y-3 text-left text-sm text-gray-600">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">দায়িত্ব গ্রহণ</span>
                <span className="text-gray-800 font-medium">{chairmanData.joiningDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">মোবাইল নম্বর</span>
                <span className="text-gray-800 font-medium">{chairmanData.phone}</span>
              </div>
              {chairmanData.email && (
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ইমেইল ঠিকানা</span>
                  <span className="text-gray-800 font-medium break-all">{chairmanData.email}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">কার্যালয়</span>
                <span className="text-gray-800 font-medium">{chairmanData.address}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Message & Detailed Bio */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Chairman's Message Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <span className="absolute -top-2 -right-2 text-9xl text-green-100 font-serif select-none pointer-events-none leading-none">“</span>
              
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 relative z-10">
                <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
                চেয়ারম্যানের বাণী
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base italic relative z-10">
                "{chairmanData.message}"
              </p>
            </div>

            {/* Detailed Biography / Information Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
                ব্যক্তিগত ও সামাজিক পরিচিতি
              </h3>
              
              <div className="divide-y divide-gray-100">
                {chairmanData.bio && chairmanData.bio.map((info, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <span className="text-sm font-bold text-gray-500 sm:col-span-1">
                      {info.label}
                    </span>
                    <span className="text-sm text-gray-800 sm:col-span-2">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Current_chairman;