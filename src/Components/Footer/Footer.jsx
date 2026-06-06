import React from 'react';
import { Link } from 'react-router-dom'; // রাউটিং এর জন্য Link ইম্পোর্ট করা হলো
import logo from '../../assets/image/amarunion.logo.jpeg';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, 
  FaYoutube, FaArrowRight 
} from 'react-icons/fa';

const Footer = () => {
  // রাউটার ফাইলের পাথ অনুযায়ী গুরুত্বপূর্ণ সেবার একটি অ্যারে তৈরি করা হলো
  const quickLinks = [
    { title: 'ট্রেড লাইসেন্স আবেদন', path: '/service/trade-license' },
    { title: 'নাগরিকত্ব সনদের আবেদন', path: '/service/citizenship-certificate' },
    { title: 'জন্ম ও মৃত্যু নিবন্ধন', path: '/service/death-certificate' }, // রাউটারের পাথ অনুযায়ী
    { title: 'চারিত্রিক সনদ আবেদন', path: '/service/premises-license' }, // রাউটারের পাথ অনুযায়ী
    { title: 'ওয়ারিশন সনদ আবেদন', path: '/service/warish-certificate' }
  ];

  return (
    <footer className="bg-slate-950 text-gray-300 font-sans mt-16 border-t-4 border-emerald-600">
      
      {/* প্রধান ফুটার কন্টেন্ট (৪টি কলাম বিশিষ্ট গ্রিড) */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* কলাম ১: ইউনিয়ন পরিষদের পরিচিতি */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* লোগো সেকশন - <img> ট্যাগ দিয়ে ঠিক করা হয়েছে */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow overflow-hidden">
              <img
                src={logo}
                alt="Amar Union Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              ৪নং সুবিল ইউনিয়ন পরিষদ
            </h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            স্মার্ট প্রযুক্তি ব্যবহারের মাধ্যমে সুবিল ইউনিয়নের নাগরিকদের দোরগোড়ায় দ্রুত ও স্বচ্ছ ডিজিটাল সেবা পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।
          </p>
          {/* সোশ্যাল লিংক */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition duration-300">
              <FaFacebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition duration-300">
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

        {/* কলাম ২: জরুরি যোগাযোগ (ঠিকানা ও ফোন) */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">
            যোগাযোগ করুন
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0" />
              <span>ইউনিয়ন পরিষদ ভবন, সুবিল, দেবিদ্বার, কুমিল্লা।</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-emerald-500 flex-shrink-0" />
              <span>+৮৮০১XXXXXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-emerald-500 flex-shrink-0" />
              <span>info@subilup.gov.bd</span>
            </li>
          </ul>
        </div>

        {/* কলাম ৩: দ্রুত লিংক সমূহ (Quick Links) - এখানে <Link> সেট করা হয়েছে */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">
            গুরুত্বপূর্ণ সেবা
          </h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="hover:text-emerald-400 flex items-center gap-2 group transition duration-200 text-gray-400"
                >
                  <FaArrowRight size={10} className="text-slate-600 group-hover:text-emerald-400 transition duration-200" />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* কলাম ৪: সরকারি হটлайн (Government e-Services) */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">
            কেন্দ্রীয় ই-সেবা
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-center">
            <a href="https://bangladesh.gov.bd" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-emerald-800 border border-slate-800 hover:border-emerald-600 p-2.5 rounded-lg transition text-gray-300">
              জাতীয় তথ্য বাতায়ন
            </a>
            <a href="https://bdris.gov.bd" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-emerald-800 border border-slate-800 hover:border-emerald-600 p-2.5 rounded-lg transition text-gray-300">
              জন্ম-মৃত্যু নিবন্ধন
            </a>
            <a href="https://services.nidw.gov.bd" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-emerald-800 border border-slate-800 hover:border-emerald-600 p-2.5 rounded-lg transition text-gray-300">
              এনআইডি পোর্টাল
            </a>
            <a href="https://eporcha.gov.bd" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-emerald-800 border border-slate-800 hover:border-emerald-600 p-2.5 rounded-lg transition text-gray-300">
              ই-পর্চা বাতায়ন
            </a>
          </div>
        </div>

      </div>

      {/* নিচের কপিরাইট এবং ক্রেডিট সেকশন */}
      <div className="bg-slate-950 border-t border-slate-900/60 py-6 px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© ২০২৬ ৪নং সুবিল应用 ইউনিয়ন পরিষদ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>
            কারিগরি সহযোগিতায়: <span className="text-gray-400 hover:text-emerald-400 cursor-pointer font-medium">Sohidul Islam</span>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;