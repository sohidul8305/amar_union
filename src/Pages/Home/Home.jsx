import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/image/amarunion.logo.jpeg';

// react-icons এর সব আইকন ডাইনামিক ব্যবহারের জন্য ইম্পোর্ট করা হলো
import * as FaIcons from 'react-icons/fa'; 

const Home = () => {
  // ----------------------------------------------------
  // ১. ডাইনামিক স্টেট ম্যানেজমেন্ট (ডিফল্ট ডাটা সহ)
  // ----------------------------------------------------
  const [unionInfo, setUnionInfo] = useState({
    name: '১৬ নং মোহনপুর ইউনিয়ন পরিষদ',
    subTitle: 'দেবিদ্বার, কুমিল্লা',
    tagline: 'স্মার্ট ইউনিয়ন, SMART বাংলাদেশ',
    logoUrl: logo,
    copyright: '© ২০২৬ ১৬ নং মোহনপুর ইউনিয়ন পরিষদ। সর্বস্বত্ব সংরক্ষিত।',
    developer: 'Sohidul Islam'
  });

  const [scrollingNotice, setScrollingNotice] = useState('১৬ নং মোহনপুর ইউনিয়ন পরিষদ অনলাইন সেবা কার্যক্রমে আপনাকে স্বাগতম। যেকোনো সনদের জন্য অনলাইনে আবেদন করুন।');

  const [notices, setNotices] = useState([
    { _id: '1', title: 'ভিজিডি চক্রের চাল বিতরণ সংক্রান্ত নোটিশ', date: '২৬ মে, ২০২৬' },
    { _id: '2', title: '২০২৬-২৭ অর্থ বছরের বাজেট ঘোষণা', date: '২০ মে, ২০২৬' }
  ]);

const [services, setServices] = useState([
    { _id: '1', title: 'ট্রেড লাইসেন্স', path: '/service/trade-license', iconName: 'FaFileAlt', iconColor: 'text-blue-600' },
    { _id: '2', title: 'প্রিমিেসস লাইসেন্স', path: '/service/premises-license', iconName: 'FaFileContract', iconColor: 'text-blue-500' },
    { _id: '3', title: 'ওয়ারিশন সনদ', path: '/service/warish-certificate', iconName: 'FaUsers', iconColor: 'text-teal-600' },
    { _id: '4', title: 'পারিবারিক সনদ', path: '/service/family-certificate', iconName: 'FaHome', iconColor: 'text-emerald-600' },
    { _id: '5', title: 'ক্ষমতা অর্পণের প্রত্যয়নপত্র', path: '/service/power-of-attorney', iconName: 'FaGavel', iconColor: 'text-purple-600' },
    { _id: '6', title: 'উত্তরাধিকারী সনদ', path: '/service/successor', iconName: 'FaUserTie', iconColor: 'text-indigo-600' },
    { _id: '7', title: 'নাগরিকত্ব সনদ', path: '/service/citizenship', iconName: 'FaIdCard', iconColor: 'text-orange-600' },
    { _id: '8', title: 'মৃত্যু সনদ', path: '/service/death-certificate', iconName: 'FaSkull', iconColor: 'text-gray-600' },
    { _id: '9', title: 'চারিত্রিক সনদ', path: '/service/premises-license', iconName: 'FaUserCheck', iconColor: 'text-green-600' },
    { _id: '10', title: 'অবিবাহিত সনদ', path: '/service/unmarried-certificate', iconName: 'FaHeart', iconColor: 'text-pink-600' },
    { _id: '11', title: 'ভূমিহীন সনদ', path: '/service/landless-certificate', iconName: 'FaTree', iconColor: 'text-green-700' },
    { _id: '12', title: 'পুনঃ বিবাহ না হওয়া সনদ', path: '/service/remarriage-not-happened', iconName: 'FaRing', iconColor: 'text-red-500' },
    { _id: '13', title: 'বার্ষিক আয়ের প্রত্যয়ন', path: '/service/annual-income', iconName: 'FaChartLine', iconColor: 'text-blue-700' },
    { _id: '14', title: 'একই নামের প্রত্যয়ন', path: '/service/same-name', iconName: 'FaUserTag', iconColor: 'text-cyan-600' },
    { _id: '15', title: 'প্রকৃত বাক ও শ্রবণ প্রতিবন্ধী', path: '/service/disability', iconName: 'FaWheelchair', iconColor: 'text-yellow-600' },
    { _id: '16', title: 'সনাতন ধর্ম অবলম্বী', path: '/service/religion-cert', iconName: 'FaPrayingHands', iconColor: 'text-orange-700' },
    { _id: '17', title: 'অনুমতি পত্র', path: '/service/permission', iconName: 'FaFileSignature', iconColor: 'text-slate-600' },
    { _id: '18', title: 'প্রত্যয়ন পত্র', path: '/service/certification', iconName: 'FaStamp', iconColor: 'text-indigo-500' },
    { _id: '19', title: 'ভোটার আইডি স্থানান্তর', path: '/service/voter-transfer', iconName: 'FaExchangeAlt', iconColor: 'text-blue-400' },
    { _id: '20', title: 'নদী ভাঙনের সনদ', path: '/service/river-erosion', iconName: 'FaWater', iconColor: 'text-blue-800' },
    { _id: '21', title: 'নতুন ভোটার সুপারিশ', path: '/service/new-voter', iconName: 'FaUserPlus', iconColor: 'text-green-500' },
    { _id: '22', title: 'পাসপোর্ট সুপারিশ পত্র', path: '/service/passport-recommendation', iconName: 'FaPassport', iconColor: 'text-red-700' },
    { _id: '23', title: 'বিবাহিত সনদ', path: '/service/married-certificate', iconName: 'FaVenusMars', iconColor: 'text-rose-500' },
    { _id: '24', title: 'ভোটার তথ্য সংশোধন', path: '/service/voter-update', iconName: 'FaUserEdit', iconColor: 'text-sky-600' },
    { _id: '25', title: 'অভিভাবকের সম্মতিপত্র', path: '/service/guardian-consent', iconName: 'FaUserShield', iconColor: 'text-teal-700' },
    { _id: '26', title: 'জাতীয়তা সনদপত্র', path: '/service/nationality', iconName: 'FaFlag', iconColor: 'text-green-600' },
    { _id: '27', title: 'ভিন্ন দেশের নাগরিক নয়', path: '/service/non-citizen', iconName: 'FaGlobe', iconColor: 'text-amber-600' },
    { _id: '28', title: 'পাসপোর্ট সংক্রান্ত প্রত্যয়ন', path: '/service/passport-cert', iconName: 'FaFileContract', iconColor: 'text-purple-700' },
    { _id: '29', title: 'অনাপত্তি সনদ', path: '/service/noc', iconName: 'FaFileMedicalAlt', iconColor: 'text-blue-500' },
    { _id: '30', title: 'ভোটার তথ্য যাচাই', path: '/service/voter-verification', iconName: 'FaAddressCard', iconColor: 'text-emerald-700' },

  ]);

  const [importantLinks, setImportantLinks] = useState([
    { title: 'প্রধানমন্ত্রীর কার্যালয়', url: 'https://pmo.gov.bd' },
    { title: 'জাতীয় তথ্য বাতায়ন', url: 'https://bangladesh.gov.bd' },
    { title: 'জন্ম-মৃত্যু নিবন্ধন বাতায়ন', url: 'https://bdris.gov.bd' },
    { title: 'স্থানীয় সরকার বিভাগ', url: 'https://lgd.gov.bd' },
    { title: 'জেলা বাতায়ন (কুমিল্লা)', url: 'https://www.comilla.gov.bd' }
  ]);

  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/PAtvAn0GvBw');

  // ২. ইউজার ইন্টারঅ্যাকশন স্টেটসমূহ
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nidNumber, setNidNumber] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);

  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);

  // ----------------------------------------------------
  // ৩. ডাটাবেজ থেকে ডাটা লোড করার মেকানিজম (সুরক্ষিত চেক সহ)
  // ----------------------------------------------------
  useEffect(() => {
    const loadDatabaseData = async () => {
      try {
        const infoRes = await axios.get('/api/union-info').catch(() => null);
        const noticeRes = await axios.get('/api/notices').catch(() => null);
        const serviceRes = await axios.get('/api/services').catch(() => null);
        const linkRes = await axios.get('/api/important-links').catch(() => null);
        
        if (infoRes && infoRes.data) setUnionInfo(infoRes.data);
        if (noticeRes && noticeRes.data) {
          if (noticeRes.data.scrolling) setScrollingNotice(noticeRes.data.scrolling);
          if (Array.isArray(noticeRes.data.list)) setNotices(noticeRes.data.list);
        }
        if (serviceRes && Array.isArray(serviceRes.data)) setServices(serviceRes.data);
        if (linkRes && Array.isArray(linkRes.data)) setImportantLinks(linkRes.data);
      } catch (error) {
        console.log("কোড সুরক্ষিত আছে, ডিফল্ট ডেটা প্রদর্শিত হচ্ছে।");
      }
    };

    loadDatabaseData();
  }, []);

  // আইকন জেনারেটর ফাংশন
  const renderDynamicIcon = (iconName, colorClass) => {
    const SelectedIcon = FaIcons[iconName];
    return SelectedIcon ? <SelectedIcon className={`${colorClass} text-2xl`} /> : <FaIcons.FaFileAlt className={`${colorClass} text-2xl`} />;
  };

  // ৪. হ্যান্ডলার ফাংশন সমূহ
  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setVerifiedData(null);

    setTimeout(() => {
      setIsLoading(false);
      setVerifiedData({
        nameBangla: 'মোঃ আব্দুল মজিদ',
        nameEnglish: 'MD. ABDUL MAJID',
        fatherName: 'মৃত আবুল কাশেম',
        motherName: 'মোসাম্মৎ রহিমা বেগম',
        nidNo: nidNumber,
        birthDate: dob,
        address: 'গ্রাম: মোহনপুর, ডাকঘর: মোহনপুর, দেবিদ্বার, কুমিল্লা।',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      });
    }, 1500);
  };

  const handleTracking = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsTrackingLoading(true);
    setTrackingResult(null);

    setTimeout(() => {
      setIsTrackingLoading(false);
      setTrackingResult({
        id: trackingId,
        status: 'অনুমোদিত (Approved)',
        serviceName: 'নাগরিকত্ব সনদ',
        date: '০৫ জুন, ২০২৬',
        message: 'আপনার সনদটি তৈরি হয়েছে। ইউনিয়ন পরিষদ কার্যালয় থেকে মূল কপি সংগ্রহ করুন।'
      });
    }, 1200);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVerifiedData(null);
    setNidNumber('');
    setDob('');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">

      {/* ১. ব্যানার / হেডার সেকশন */}
      <header className="bg-gradient-to-r from-blue-900 to-sky-900 text-white py-8 px-4 text-center shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 mx-auto md:mx-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
              <img
                src={unionInfo.logoUrl}
                alt="Union Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{unionInfo.name}</h1>
              <p className="text-sm text-gray-200">{unionInfo.subTitle}</p>
            </div>
          </div>
          <div className="hidden lg:block bg-white/10 px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
            {unionInfo.tagline}
          </div>
        </div>
      </header>

      {/* ২. নোটিশ স্ক্রলার */}
      <div className="bg-amber-500 text-white py-2 px-4 shadow-inner flex items-center">
        <span className="bg-amber-700 text-xs uppercase font-bold px-3 py-1 rounded mr-3 whitespace-nowrap">নোটিশ:</span>
        <marquee className="text-sm font-medium" behavior="scroll" direction="left">
          {scrollingNotice}
        </marquee>
      </div>

      {/* ৩. মেইন লেআউট */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- বাম সাইডবার --- */}
        <aside className="lg:col-span-3 space-y-6">
          {/* নোটিশ বোর্ড */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="bg-blue-900 text-white px-4 py-3 font-semibold text-center">নোটিশ বোর্ড</h3>
            <div className="p-4 space-y-3 text-sm">
              {Array.isArray(notices) && notices.map((notice) => (
                <div key={notice._id} className="border-b pb-2 hover:text-blue-600 cursor-pointer transition">
                  <p className="font-medium">{notice.title}</p>
                  <span className="text-xs text-gray-400">{notice.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ভোটার আইডি কার্ড যাচাই */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-sm border border-blue-100 overflow-hidden p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-blue-600 text-white rounded-full shadow-md">
                <FaIcons.FaIdCard className="text-2xl" />
              </div>
            </div>
            <h4 className="font-bold text-gray-800 text-base mb-1">ভোটার আইডি কার্ড যাচাই</h4>
            <p className="text-xs text-gray-500 mb-4">আপনার জাতীয় পরিচয়পত্রের সত্যতা অনলাইনে যাচাই করুন</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-2"
            >
              <FaIcons.FaCheckCircle /> এনআইডি ভেরিফাই করুন
            </button>
          </div>

          {/* জাতীয় হেল্পライン */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="bg-blue-900 text-white px-4 py-3 font-semibold text-center">জাতীয় হেল্পলাইন</h3>
            <div className="p-4 grid grid-cols-2 gap-3 text-center text-xs font-bold text-gray-700">
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex flex-col items-center gap-1">
                <FaIcons.FaPhoneAlt className="text-red-500 text-lg" />
                <span>জরুরী সেবা</span>
                <span className="text-red-600 text-sm">৯৯৯</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex flex-col items-center gap-1">
                <FaIcons.FaPhoneAlt className="text-green-500 text-lg" />
                <span>তথ্য সেবা</span>
                <span className="text-green-600 text-sm">৩৩৩</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col items-center gap-1 col-span-2">
                <span className="text-blue-600 text-sm">নারী ও শিশু নির্যাতন প্রতিরোধ: ১০৯</span>
              </div>
            </div>
          </div>
        </aside>

        {/* --- প্রধান কন্টেন্ট (Center) --- */}
        <section className="lg:col-span-6 space-y-6">
          {/* নাগরিক সেবা সেকশন */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6 border-b pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">নাগরিক সেবা আবেদন</h2>
              <p className="text-gray-500 text-sm mt-1">আপনার প্রয়োজনীয় সেবার জন্য নিচের কার্ডে ক্লিক করে আবেদন করুন</p>
            </div>

            {/* সেবাসমূহের গ্রিড */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.isArray(services) && services.map((service) => (
                <Link 
                  to={service.path}
                  key={service._id} 
                  className="group bg-gray-50 hover:bg-blue-50 p-4 rounded-xl text-center border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3"
                >
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {renderDynamicIcon(service.iconName, service.iconColor)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-900 line-clamp-2">
                    {service.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ভিডিও গ্যালারি */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-blue-900 pl-2">ভিডিও চিত্রপট</h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-200 shadow-md">
              <iframe 
                className="w-full h-full border-0"
                src={videoUrl} 
                title="Smart Bangladesh Documentary" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* --- ডান সাইডবার --- */}
        <aside className="lg:col-span-3 space-y-6">
          {/* আবেদন ট্র্যাকিং সেকশন */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
            <h3 className="bg-blue-900 text-white px-4 py-2 font-semibold text-center rounded-lg text-sm">আবেদন ট্র্যাকিং</h3>
            <form onSubmit={handleTracking} className="space-y-2">
              <input 
                type="text" 
                required
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="আবেদন আইডি বা ট্র্যাকিং নম্বর" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button 
                type="submit"
                disabled={isTrackingLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-lg transition shadow-sm flex items-center justify-center gap-2"
              >
                <FaIcons.FaSearch size={12} /> {isTrackingLoading ? 'অনুসন্ধান করা হচ্ছে...' : 'খুঁজুন'}
              </button>
            </form>

            {trackingResult && (
              <div className="p-3 bg-slate-50 border rounded-lg text-xs space-y-1.5">
                <p><span className="font-bold text-gray-600">সেবা:</span> {trackingResult.serviceName}</p>
                <p>
                  <span className="font-bold text-gray-600">অবস্থা:</span> 
                  <span className="ml-1 font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {trackingResult.status}
                  </span>
                </p>
                <p><span className="font-bold text-gray-600">তারিখ:</span> {trackingResult.date}</p>
                <p className="text-gray-500 border-t pt-1 mt-1 leading-relaxed">{trackingResult.message}</p>
              </div>
            )}
          </div>

          {/* গুরুত্বপূর্ণ লিংক সমূহ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="bg-blue-900 text-white px-4 py-3 font-semibold text-center">গুরুত্বপূর্ণ লিংক</h3>
            <div className="p-2 divide-y text-xs text-gray-700">
              {Array.isArray(importantLinks) && importantLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noreferrer" 
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  <span className="flex items-center gap-2">
                    <FaIcons.FaLink className="text-gray-400" />
                    {link.title}
                  </span>
                  <FaIcons.FaExternalLinkAlt className="text-gray-300 text-[10px]" />
                </a>
              ))}
            </div>
          </div>
        </aside>

      </main>

      {/* ৪. ভোটার আইডি যাচাই মডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden transform transition-all scale-100 my-8">
            <div className="bg-blue-900 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <FaIcons.FaIdCard className="text-xl text-amber-400" />
                <span>জাতীয় পরিচয়পত্র অনলাইন যাচাইকরণ</span>
              </div>
              <button onClick={handleCloseModal} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition">
                <FaIcons.FaTimes className="text-lg" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <form onSubmit={handleVerify} className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">এনআইডি নম্বর (১০/১৩/১৭ ডিজিট) *</label>
                    <input 
                      type="text" required pattern="\d{10}|\d{13}|\d{17}" placeholder="যেমন: ১৯৮XXXXXXXXXX"
                      value={nidNumber} onChange={(e) => setNidNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">জন্ম তারিখ *</label>
                    <input 
                      type="date" required value={dob} onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>
                <button 
                  type="submit" disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? 'যাচাই করা হচ্ছে...' : 'ডাটাবেজে খুঁজুন'}
                </button>
              </form>

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-6 space-y-2">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-gray-500 font-medium">জাতীয় ডাটাবেজ যাচাই করা হচ্ছে...</p>
                </div>
              )}

              {verifiedData && !isLoading && (
                <div className="border-2 border-emerald-500 rounded-2xl p-4 bg-emerald-50/30 shadow-md space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm border-b border-emerald-200 pb-2">
                    <FaIcons.FaCheckCircle className="text-lg" />
                    <span>সফলভাবে যাচাইকৃত পরিচয়পত্র (অনলাইন কপি)</span>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-emerald-200 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-xs text-gray-800">
                    <img src={verifiedData.photo} alt="NID Holder" className="w-24 h-28 object-cover rounded-md border-2 border-slate-300 shadow-sm bg-white" />
                    
                    <div className="space-y-1.5 w-full">
                      <p><span className="font-bold text-gray-500 inline-block w-24">নাম (বাংলা):</span> <span className="font-bold text-gray-900 text-sm">{verifiedData.nameBangla}</span></p>
                      <p><span className="font-bold text-gray-500 inline-block w-24">Name (ENG):</span> <span className="font-medium">{verifiedData.nameEnglish}</span></p>
                      <p><span className="font-bold text-gray-500 inline-block w-24">পিতা:</span> <span>{verifiedData.fatherName}</span></p>
                      <p><span className="font-bold text-gray-500 inline-block w-24">মাতা:</span> <span>{verifiedData.motherName}</span></p>
                      <p><span className="font-bold text-gray-500 inline-block w-24">জন্ম তারিখ:</span> <span className="text-blue-700 font-semibold">{verifiedData.birthDate}</span></p>
                      <p className="border-t pt-1.5 mt-1"><span className="font-bold text-red-600 inline-block w-24">NID NO:</span> <span className="text-red-600 font-bold text-sm tracking-wider">{verifiedData.nidNo}</span></p>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-600 bg-white p-2 rounded-lg border flex items-start gap-2">
                    <FaIcons.FaMapMarkerAlt className="text-gray-400 mt-0.5 shrink-0" />
                    <p><span className="font-bold text-gray-700">ঠিকানা:</span> {verifiedData.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ৫. ফুটার সেকশন */}
      <footer className="bg-slate-950 text-gray-400 text-xs py-6 text-center border-t border-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{unionInfo.copyright}</p>
          <p>
            কারিগরি সহযোগিতায়: <span className="text-gray-300 hover:text-emerald-400 font-medium cursor-pointer">{unionInfo.developer}</span>
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;