import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Councillors = () => {
  const [councillorsList, setCouncillorsList] = useState([]);
  const [pageConfig, setPageConfig] = useState({
    pageTitle: 'কাউন্সিলর / সদস্যবৃন্দ',
    pageSubtitle: 'আপনাদের স্ব-স্ব ওয়ার্ডের উন্নয়ন ও নাগরিক সেবা নিশ্চিতকরণে নিয়োজিত জনপ্রতিনিধিবৃন্দ।',
    showPhone: true,
    showEmail: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const configRes = await axios.get('/api/councillors-page-config');
      if (configRes.data && Object.keys(configRes.data).length) {
        setPageConfig(prev => ({ ...prev, ...configRes.data }));
      }
      const councillorsRes = await axios.get('/api/councillors');
      if (councillorsRes.data.success && Array.isArray(councillorsRes.data.councillors)) {
        setCouncillorsList(councillorsRes.data.councillors);
      } else {
        setCouncillorsList([]);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold">{pageConfig.pageTitle}</h1>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">{pageConfig.pageSubtitle}</p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>
        {councillorsList.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            {error ? 'সার্ভারে সমস্যা, পরে আবার চেষ্টা করুন।' : 'কোনো কাউন্সিলর যোগ করা হয়নি।'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {councillorsList.map((member) => (
              <div key={member._id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="relative h-64 bg-gray-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">{member.ward}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                  <div className="mt-4 pt-4 border-t space-y-2 text-xs text-gray-600">
                    {pageConfig.showPhone && member.phone && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        <span>{member.phone}</span>
                      </div>
                    )}
                    {pageConfig.showEmail && member.email && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span className="truncate">{member.email}</span>
                      </div>
                    )}
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

export default Councillors;