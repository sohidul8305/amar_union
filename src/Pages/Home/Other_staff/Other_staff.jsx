import React from 'react';

const Other_staff = () => {
  // অন্যান্য কর্মচারীদের ডেমো ডাটা (পদবী ভিত্তিক)
  const staffList = [
    {
      id: 1,
      name: 'মোঃ আমজাদ হোসেন',
      role: 'দফাদার (গ্রাম পুলিশ প্রধান)',
      area: 'সমগ্র ইউনিয়ন ওয়ার্ড ১-৯',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', // ডেমো ছবি
      phone: '+৮৮০ ১৭১৫-১১_ _ _ _',
    },
    {
      id: 2,
      name: 'শ্রী রতন কুমার দাস',
      role: 'মহল্লাদার / গ্রাম পুলিশ',
      area: '১ নং ও ২ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৫-২২_ _ _ _',
    },
    {
      id: 3,
      name: 'মোঃ খোরশেদ আলম',
      role: 'মহল্লাদার / গ্রাম পুলিশ',
      area: '৩ নং ও ৪ নং ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৫-৩৩_ _ _ _',
    },
    {
      id: 4,
      name: 'মোছাঃ ছায়েরা বানু',
      role: 'মহল্লাদার / গ্রাম পুলিশ (মহিলা)',
      area: 'সংরক্ষিত মহিলা ওয়ার্ড',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৫-৪৪_ _ _ _',
    },
    {
      id: 5,
      name: 'মোঃ বছির উদ্দিন',
      role: 'অফিস সহায়ক (পিয়ন)',
      area: 'ইউনিয়ন পরিষদ কার্যালয়',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৫-৫৫_ _ _ _',
    },
    {
      id: 6,
      name: 'মোছাঃ রহিমা খাতুন',
      role: 'পরিচ্ছন্নতা কর্মী',
      area: 'ইউনিয়ন পরিষদ কমপ্লেক্স',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      phone: '+৮৮০ ১৭১৫-৬৬_ _ _ _',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            অন্যান্য কর্মচারীবৃন্দ
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            ইউনিয়ন পরিষদের আইন-শৃঙ্খলা রক্ষা, দাপ্তরিক কাজ ও পরিচ্ছন্নতা বজায় রাখতে নিয়োজিত সকল স্তরের কর্মচারীবৃন্দ।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Responsive Grid Layout */}
        {/* Mobile: 1 col, Tablet: 2 cols, Laptop: 3 cols, Large Desktop: 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffList.map((staff) => (
            <div 
              key={staff.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image & Overlay Area */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img 
                    src={staff.image} 
                    alt={staff.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge showing responsibility zone */}
                  <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-xs">
                    📍 {staff.area}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {staff.name}
                  </h3>
                  <p className="text-xs font-semibold text-green-600 mt-1">
                    {staff.role}
                  </p>
                </div>
              </div>

              {/* Contact Area Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
                  {/* Native Phone Icon SVG */}
                  <svg 
                    className="w-4 h-4 text-gray-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="font-semibold">{staff.phone}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-white rounded-xl p-5 border border-gray-100 text-center text-xs sm:text-sm text-gray-500">
          📌 যেকোনো ধরণের জরুরী আইন-শৃঙ্খলা পরিস্থিতি অথবা গ্রাম্য সালিশি নোটিশের জন্য স্ব-স্ব ওয়ার্ডের গ্রাম পুলিশের সাথে যোগাযোগ করার অনুরোধ রইল।
        </div>

      </div>
    </div>
  );
};

export default Other_staff;