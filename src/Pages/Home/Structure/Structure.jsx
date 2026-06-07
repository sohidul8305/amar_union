import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Structure = () => {
  const [liveStructure, setLiveStructure] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStructureData = async () => {
      try {
        const response = await axios.get('/api/structure');
        if (response.data && Object.keys(response.data).length > 0) {
          setLiveStructure(response.data);
        }
      } catch (error) {
        console.error("Structure API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStructureData();
  }, []);

  // ব্যাকআপ/ডিফল্ট প্রধান কর্তৃপক্ষ ডাটা
  const topManagement = liveStructure?.topManagement || [
    {
      id: 1,
      name: 'মোঃ আবদুর রহমান',
      role: 'ইউনিয়ন পরিষদ চেয়ারম্যান',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      phone: '+৮৮০ ১৭১১-২২৩৩৪৪',
      email: 'chairman@union.gov.bd'
    },
    {
      id: 2,
      name: 'জনাব সুকোমল বড়ুয়া',
      role: 'ইউনিয়ন পরিষদ সচিব',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      phone: '+৮৮০ ১৭১২-৫৫৬৬৭৭',
      email: 'secretary@union.gov.bd'
    }
  ];

  // ব্যাকআপ/ডিফল্ট মেম্বারদের ডাটা
  const members = liveStructure?.members || [
    { id: 1, ward: '১ নং ওয়ার্ড', name: 'মোঃ রফিকুল ইসলাম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০১_ _ _ _' },
    { id: 2, ward: '২ নং ওয়ার্ড', name: 'আব্দুল কুদ্দুস', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০২_ _ _ _' },
    { id: 3, ward: '৩ নং ওয়ার্ড', name: 'মোঃ জয়নাল আবেদীন', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৩_ _ _ _' },
    { id: 4, ward: '১, ২ ও ৩ নং ওয়ার্ড', name: 'মোছাঃ ফাতেমা বেগম', role: 'সংরক্ষিত মহিলা সদস্য', phone: '+৮৮০ ১৭১৩-০৪_ _ _ _' },
    { id: 5, ward: '৪ নং ওয়ার্ড', name: 'মোঃ আনোয়ার হোসেন', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৫_ _ _ _' },
    { id: 6, ward: '৫ নং ওয়ার্ড', name: 'মোঃ মোস্তফা কামাল', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৬_ _ _ _' },
    { id: 7, ward: '৬ নং ওয়ার্ড', name: 'মোঃ সিরাজুল ইসলাম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৭_ _ _ _' },
    { id: 8, ward: '৪, ৫ ও ৬ নং ওয়ার্ড', name: 'মোছাঃ রাশেদা আক্তার', role: 'সংরক্ষিত মহিলা সদস্য', phone: '+৮৮০ ১৭১৩-০৮_ _ _ _' },
    { id: 9, ward: '৭ নং ওয়ার্ড', name: 'মোঃ আবুল কাশেম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৯_ _ _ _' },
    { id: 10, ward: '৮ নং ওয়ার্ড', name: 'মোঃ আলী আকবর', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-১০_ _ _ _' },
    { id: 11, ward: '৯ নং ওয়ার্ড', name: 'মোঃ সফিকুল ইসলাম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-১১_ _ _ _' },
    { id: 12, ward: '৭, ৮ ও ৯ নং ওয়ার্ড', name: 'মোছাঃ পারভীন সুলতানা', role: 'সংরক্ষিত মহিলা সদস্য', phone: '+৮৮০ ১৭১৩-১২_ _ _ _' },
  ];

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
            সাংগঠনিক কাঠামো
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            জনগণের সেবায় নিয়োজিত আমাদের ইউনিয়ন পরিষদের সম্মানিত জনপ্রতিনিধি এবং কর্মকর্তাবৃন্দের তালিকা।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Top Management Section (Chairman & Secretary) */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
            <span className="w-2 h-5 bg-green-600 rounded-full inline-block"></span>
            প্রধান কর্তৃপক্ষ
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {topManagement.map((person) => (
              <div 
                key={person.id} 
                className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-green-500/20 mb-4">
                    <img 
                      src={person.image || 'https://via.placeholder.com/150'} 
                      alt={person.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold text-green-600 mt-1">{person.role}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 space-y-2">
                    <p className="flex items-center justify-center gap-2">
                      <span className="font-medium text-gray-800">মোবাইল:</span> {person.phone}
                    </p>
                    {person.email && (
                      <p className="flex items-center justify-center gap-2">
                        <span className="font-medium text-gray-800">ইমেইল:</span> {person.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members Section (Grid Layout) */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
            <span className="w-2 h-5 bg-green-600 rounded-full inline-block"></span>
            ইউপি সদস্য ও সংরক্ষিত মহিলা সদস্যবৃন্দ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-green-200 transition-colors duration-300"
              >
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-green-50 text-green-700 mb-3">
                  {member.ward}
                </span>
                
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mb-3">
                  {member.role}
                </p>
                
                <div className="pt-3 border-t border-dashed border-gray-100 flex items-center gap-1 text-xs text-gray-600">
                  <span className="font-semibold text-gray-700">যোগাযোগ:</span> 
                  {member.phone}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Structure;