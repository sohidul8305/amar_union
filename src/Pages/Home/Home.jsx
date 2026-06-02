import React from 'react';
import logo from '../../assets/image/amarunion.logo.jpeg';

import { 
  FaFileAlt, FaUserCheck, FaUsers, FaChild, FaCertificate, 
  FaPassport, FaHeart, FaHandHoldingHeart, FaPhoneAlt, FaLink, FaExternalLinkAlt
} from 'react-icons/fa'; // এখানে FaHandInHand পরিবর্তন করে FaHandHoldingHeart করা হয়েছে

const Home = () => {
  // নাগরিক সেবা সমূহের ডামি ডাটা (আইকন সহ)
  const services = [
    { id: 1, title: 'ট্রেড লাইসেন্স', icon: <FaFileAlt className="text-blue-600 text-2xl" /> },
    { id: 2, title: 'চারিত্রিক সনদ', icon: <FaUserCheck className="text-green-600 text-2xl" /> },
    { id: 3, title: 'নাগরিকত্ব সনদ', icon: <FaUsers className="text-orange-600 text-2xl" /> },
    { id: 4, title: 'জন্ম ও মৃত্যু নিবন্ধন', icon: <FaChild className="text-purple-600 text-2xl" /> },
    { id: 5, title: 'ওয়ারিশন সনদ', icon: <FaCertificate className="text-teal-600 text-2xl" /> },
    { id: 6, title: 'প্রত্যয়নপত্র', icon: <FaPassport className="text-red-600 text-2xl" /> },
    { id: 7, title: 'অবিবাহিত সনদ', icon: <FaHeart className="text-pink-600 text-2xl" /> },
    { id: 8, title: 'প্রতিবন্ধী ভাতা', icon: <FaHandHoldingHeart className="text-indigo-600 text-2xl" /> }, // এখানেও পরিবর্তন করা হয়েছে
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* ১. ব্যানার / হেডার সেকশন */}
      <header className="bg-gradient-to-r from-blue-900 to-sky-900 text-white py-8 px-4 text-center shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 mx-auto md:mx-0">
            {/* লোগোর জায়গা */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-xl shadow-inner">
               <img
                              src={logo}
                              alt="Amar Union Logo"
                              className="w-full h-full object-cover"
                            />
            </div>
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold">১৬ নং মোহনপুর ইউনিয়ন পরিষদ</h1>
              <p className="text-sm text-gray-200">দেবিদ্বার, কুমিল্লা</p>
            </div>
          </div>
          <div className="hidden lg:block bg-white/10 px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
            স্মার্ট ইউনিয়ন, SMART বাংলাদেশ
          </div>
        </div>
      </header>

      {/* ২. নোটিশ স্ক্রলার (Moving Notice) */}
      <div className="bg-amber-500 text-white py-2 px-4 shadow-inner flex items-center">
        <span className="bg-amber-700 text-xs uppercase font-bold px-3 py-1 rounded mr-3 whitespace-nowrap">নোটিশ:</span>
        <marquee className="text-sm font-medium" behavior="scroll" direction="left">
         ১৬ নং মোহনপুর ইউনিয়ন পরিষদ অনলাইন সেবা কার্যক্রমে আপনাকে স্বাগতম। যেকোনো সনদের জন্য অনলাইনে আবেদন করুন।
        </marquee>
      </div>

      {/* ৩. মেইন থ্রি-কলাম লেআউট (Responsive Grid) */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- বাম সাইডবার (Left Sidebar) --- */}
        <aside className="lg:col-span-3 space-y-6">
          {/* নোটিশ বোর্ড */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="bg-blue-900 text-white px-4 py-3 font-semibold text-center">নোটিশ বোর্ড</h3>
            <div className="p-4 space-y-3 text-sm">
              <div className="border-b pb-2 hover:text-blue-600 cursor-pointer transition">
                <p className="font-medium">ভিজিডি চক্রের চাল বিতরণ সংক্রান্ত নোটিশ</p>
                <span className="text-xs text-gray-400">২৬ মে, ২০২৬</span>
              </div>
              <div className="border-b pb-2 hover:text-blue-600 cursor-pointer transition">
                <p className="font-medium">২০২৬-২৭ অর্থ বছরের বাজেট ঘোষণা</p>
                <span className="text-xs text-gray-400">২০ মে, ২০২৬</span>
              </div>
            </div>
          </div>

          {/* জাতীয় হেল্পলাইন */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="bg-blue-900 text-white px-4 py-3 font-semibold text-center">জাতীয় হেল্পলাইন</h3>
            <div className="p-4 grid grid-cols-2 gap-3 text-center text-xs font-bold text-gray-700">
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex flex-col items-center gap-1">
                <FaPhoneAlt className="text-red-500 text-lg" />
                <span>জরুরী সেবা</span>
                <span className="text-red-600 text-sm">৯৯৯</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex flex-col items-center gap-1">
                <FaPhoneAlt className="text-green-500 text-lg" />
                <span>তথ্য সেবা</span>
                <span className="text-green-600 text-sm">৩৩৩</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col items-center gap-1 col-span-2">
                <span className="text-blue-600 text-sm">নারী ও শিশু নির্যাতন প্রতিরোধ: ১০৯</span>
              </div>
            </div>
          </div>
        </aside>

        {/* --- প্রধান কন্টেন্ট (Main Content / Center) --- */}
        <section className="lg:col-span-6 space-y-6">
          {/* নাগরিক সেবা সেকশন */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6 border-b pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">নাগরিক সেবা আবেদন</h2>
              <p className="text-gray-500 text-sm mt-1">আপনার প্রয়োজনীয় সেবার জন্য নিচের কার্ডে ক্লিক করে আবেদন করুন</p>
            </div>

            {/* সেবাসমূহের গ্রিড */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="group bg-gray-50 hover:bg-blue-50 p-4 rounded-xl text-center border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3"
                >
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-900 line-clamp-2">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ভিডিও গ্যালারি */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-blue-900 pl-2">ভিডিও চিত্রপট</h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-200 shadow-inner">
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-slate-800">
                <span className="text-sm">ইউটিউব ভিডিও প্লেয়ার / ডকুমেন্টারি</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- ডান সাইডবার (Right Sidebar) --- */}
        <aside className="lg:col-span-3 space-y-6">
          {/* আবেদন ভেরিফাই বা ট্র্যাকিং */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
            <h3 className="bg-blue-900 text-white px-4 py-2 font-semibold text-center rounded-lg text-sm">আবেদন ট্র্যাকিং</h3>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="আবেদন আইডি বা ট্র্যাকিং নম্বর লিখুন" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-lg transition shadow-sm">
                খুঁজুন
              </button>
            </div>
          </div>

          {/* গুরুত্বপূর্ণ লিংক সমূহ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="bg-blue-900 text-white px-4 py-3 font-semibold text-center">গুরুত্বপূর্ণ লিংক</h3>
            <div className="p-2 divide-y text-xs text-gray-700">
              {[
                'প্রধানমন্ত্রীর কার্যালয়',
                'জাতীয় তথ্য বাতায়ন',
                'জন্ম-মৃত্যু নিবন্ধন বাতায়ন',
                'স্থানীয় সরকার বিভাগ',
                'জেলা বাতায়ন (কুমিল্লা)'
              ].map((link, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  <span className="flex items-center gap-2">
                    <FaLink className="text-gray-400" />
                    {link}
                  </span>
                  <FaExternalLinkAlt className="text-gray-300 text-[10px]" />
                </a>
              ))}
            </div>
          </div>
        </aside>

      </main>

      {/* ৪. ফুটার সেকশন */}
      <footer className="bg-slate-900 text-gray-400 text-xs py-6 text-center border-t border-slate-800 mt-12">
        <p>© ২০২৬ ৪নং সুবিল ইউনিয়ন পরিষদ। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="mt-1 text-gray-500">কারিগরি সহযোগিতায়: আপনার টিম/কোম্পানির নাম</p>
      </footer>

    </div>
  );
};

export default Home;