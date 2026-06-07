import React, { useEffect, useState } from 'react';

const Councillors = () => {
  // কাউন্সিলর/সদস্যদের ডেমো ডাটা (ডাটাবেজে ডাটা না থাকলে এটি দেখাবে)
  const defaultCouncillors = [
    {
      id: 1,
      name: 'মোঃ রফিকুল ইসলাম',
      role: 'ইউপি সদস্য / কাউন্সিলর',
      ward: '১ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৩-০১_ _ _ _',
      email: 'ward1@union.gov.bd'
    },
    {
      id: 2,
      name: 'আব্দুল কুদ্দুস',
      role: 'ইউপি সদস্য / কাউন্সিলর',
      ward: '২ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৩-০২_ _ _ _',
      email: 'ward2@union.gov.bd'
    },
    {
      id: 3,
      name: 'মোঃ জয়নাল আবেদীন',
      role: 'ইউপি সদস্য / কাউন্সিলর',
      ward: '৩ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৩-০৩_ _ _ _',
      email: 'ward3@union.gov.bd'
    },
    {
      id: 4,
      name: 'মোছাঃ ফাতেমা বেগম',
      role: 'সংরক্ষিত মহিলা সদস্য',
      ward: '১, ২ ও ৩ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৩-০৪_ _ _ _',
      email: 'female.ward1@union.gov.bd'
    },
    {
      id: 5,
      name: 'মোঃ আনোয়ার হোসেন',
      role: 'ইউপি সদস্য / কাউন্সিলর',
      ward: '৪ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৩-০৫_ _ _ _',
      email: 'ward4@union.gov.bd'
    },
    {
      id: 6,
      name: 'মোঃ মোস্তফা কামাল',
      role: 'ইউপি সদস্য / কাউন্সিলর',
      ward: '৫ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৩-০৬_ _ _ _',
      email: 'ward5@union.gov.bd'
    },
  ];

  const [councillorsList, setCouncillorsList] = useState(defaultCouncillors);
  const [loading, setLoading] = useState(true);

  // API থেকে ডাটা ফেচ করা
  useEffect(() => {
    fetch('http://localhost:5000/api/councillors')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.councillors && data.councillors.length > 0) {
          setCouncillorsList(data.councillors);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching councillors:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            কাউন্সিলর / সদস্যবৃন্দ
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            আপনাদের স্ব-স্ব ওয়ার্ডের উন্নয়ন ও নাগরিক সেবা নিশ্চিতকরণে নিয়োজিত জনপ্রতিনিধিবৃন্দ।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {councillorsList.map((member, index) => (
            <div 
              key={member._id || member.id || index} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              {/* Image Box */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Ward Badge */}
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {member.ward}
                </span>
              </div>

              {/* Info Box */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">
                  {member.role}
                </p>

                {/* Contact List */}
                <div className="mt-4 pt-4 border-t border-gray-50 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Councillors;