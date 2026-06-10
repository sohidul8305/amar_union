import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/amarunion.logo.jpeg';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaYoutube, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    logoUrl: '',
    unionName: '৪নং সুবিল ইউনিয়ন পরিষদ',
    aboutText: 'স্মার্ট প্রযুক্তি ব্যবহারের মাধ্যমে সুবিল ইউনিয়নের নাগরিকদের দোরগোড়ায় দ্রুত ও স্বচ্ছ ডিজিটাল সেবা পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।',
    address: 'ইউনিয়ন পরিষদ ভবন, সুবিল, দেবিদ্বার, কুমিল্লা।',
    phone: '+৮৮০১XXXXXXXXX',
    email: 'info@subilup.gov.bd',
    facebook: '',
    youtube: '',
    quickLinks: [],
    govLinks: [],
    copyrightText: '© ২০২৬ ৪নং সুবিল ইউনিয়ন পরিষদ। সর্বস্বত্ব সংরক্ষিত।',
    developerCredit: 'Sohidul Islam'
  });
  const [loading, setLoading] = useState(true);

  const fetchFooterData = async () => {
    try {
      const res = await axios.get('/api/footer');
      if (res.data && Object.keys(res.data).length) {
        setFooterData(prev => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error('ফুটার ডাটা লোড ব্যর্থ:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooterData();
    const interval = setInterval(fetchFooterData, 10000); // প্রতি ১০ সেকেন্ডে রিফ্রেশ
    return () => clearInterval(interval);
  }, []);

  if (loading) return <footer className="bg-slate-950 text-gray-300 py-4 text-center">লোড হচ্ছে...</footer>;

  return (
    <footer className="bg-slate-950 text-gray-300 font-sans mt-16 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* কলাম ১: ইউনিয়নের পরিচিতি */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow overflow-hidden">
              <img src={footerData.logoUrl || logo} alt="Amar Union Logo" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">{footerData.unionName}</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{footerData.aboutText}</p>
          <div className="flex items-center gap-3 pt-2">
            {footerData.facebook && (
              <a href={footerData.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition">
                <FaFacebook size={16} />
              </a>
            )}
            {footerData.youtube && (
              <a href={footerData.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition">
                <FaYoutube size={16} />
              </a>
            )}
          </div>
        </div>

        {/* কলাম ২: যোগাযোগ */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">যোগাযোগ করুন</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3"><FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0" /><span>{footerData.address}</span></li>
            <li className="flex items-center gap-3"><FaPhoneAlt className="text-emerald-500 flex-shrink-0" /><span>{footerData.phone}</span></li>
            <li className="flex items-center gap-3"><FaEnvelope className="text-emerald-500 flex-shrink-0" /><span>{footerData.email}</span></li>
          </ul>
        </div>

        {/* কলাম ৩: দ্রুত লিংক */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">গুরুত্বপূর্ণ সেবা</h4>
          <ul className="space-y-2 text-sm">
            {footerData.quickLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="hover:text-emerald-400 flex items-center gap-2 group transition duration-200 text-gray-400">
                  <FaArrowRight size={10} className="text-slate-600 group-hover:text-emerald-400 transition" />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* কলাম ৪: সরকারি ই-সেবা */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">কেন্দ্রীয় ই-সেবা</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-center">
            {footerData.govLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-emerald-800 border border-slate-800 hover:border-emerald-600 p-2.5 rounded-lg transition text-gray-300">
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* কপিরাইট ও ক্রেডিট */}
      <div className="bg-slate-950 border-t border-slate-900/60 py-6 px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{footerData.copyrightText}</p>
          <p>কারিগরি সহযোগিতায়: <span className="text-gray-400 hover:text-emerald-400 cursor-pointer font-medium">{footerData.developerCredit}</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;