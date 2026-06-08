import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Other_staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get('/api/other-staff');
        if (res.data.success) setStaffList(res.data.staff);
        else setStaffList([]);
      } catch (err) {
        console.error('স্টাফ লোড ব্যর্থ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            অন্যান্য কর্মচারীবৃন্দ
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            ইউনিয়ন পরিষদের আইন-শৃঙ্খলা রক্ষা, দাপ্তরিক কাজ ও পরিচ্ছন্নতা বজায় রাখতে নিয়োজিত সকল স্তরের কর্মচারীবৃন্দ।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffList.map((staff) => (
            <div key={staff._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img src={staff.image || 'https://via.placeholder.com/300'} alt={staff.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  {staff.area && <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-xs">📍 {staff.area}</span>}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors">{staff.name}</h3>
                  <p className="text-xs font-semibold text-green-600 mt-1">{staff.role}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="font-semibold">{staff.phone || 'নেই'}</span>
                </div>
              </div>
            </div>
          ))}
          {staffList.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">কোনো কর্মচারী পাওয়া যায়নি।</div>}
        </div>

        <div className="mt-12 bg-white rounded-xl p-5 border border-gray-100 text-center text-xs sm:text-sm text-gray-500">
          📌 যেকোনো ধরণের জরুরী আইন-শৃঙ্খলা পরিস্থিতি অথবা গ্রাম্য সালিশি নোটিশের জন্য স্ব-স্ব ওয়ার্ডের গ্রাম পুলিশের সাথে যোগাযোগ করার অনুরোধ রইল।
        </div>
      </div>
    </div>
  );
};

export default Other_staff;