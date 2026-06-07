import React, { useState } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaBullhorn, FaCogs, FaArrowLeft, FaInfoCircle, FaSave, FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // ১. নোটিশ ও নাগরিক সেবা স্টেটসমূহ
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [serviceTitle, setServiceTitle] = useState('');
  const [servicePath, setServicePath] = useState('');
  const [iconName, setIconName] = useState('FaFileAlt');
  const [iconColor, setIconColor] = useState('text-blue-600');

  // ২. ইউনিয়ন পরিচিতি (Intro) স্টেটসমূহ
  const [introTitle, setIntroTitle] = useState('১৬ নং মোহনপুর ইউনিয়ন পরিষদ');
  const [introSubtitle, setIntroSubtitle] = useState('এক নজরে আমাদের গৌরব ও ঐতিহ্য');
  const [introHistory, setIntroHistory] = useState('');
  const [establishedIntro, setEstablishedIntro] = useState('');
  const [areaIntro, setAreaIntro] = useState('');
  const [totalVillagesIntro, setTotalVillagesIntro] = useState('');
  const [totalPopulationIntro, setTotalPopulationIntro] = useState('');
  const [literacyRateIntro, setLiteracyRateIntro] = useState('');
  const [college, setCollege] = useState('');
  const [highSchool, setHighSchool] = useState('');
  const [primarySchool, setPrimarySchool] = useState('');
  const [madrasah, setMadrasah] = useState('');
  const [landmarks, setLandmarks] = useState('');

  // 🌟 ৩. এক নজরে ইউনিয়ন (Glance) স্টেটসমূহ
  const [glancePop, setGlancePop] = useState('');
  const [glanceVoters, setGlanceVoters] = useState('');
  const [glanceArea, setGlanceArea] = useState('');
  const [glanceLiteracy, setGlanceLiteracy] = useState('');
  const [glanceVillages, setGlanceVillages] = useState('');
  const [glanceSchools, setGlanceSchools] = useState('');
  const [glanceHealth, setGlanceHealth] = useState('');
  const [glanceEst, setGlanceEst] = useState('');

  // গ্লোবাল মেসেজ ও লোডিং স্টেট
  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  // নোটিশ সাবমিট হ্যান্ডলার
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    try {
      const res = await axios.post('/api/notices', { title: noticeTitle, date: noticeDate });
      setMessage({ text: res.data.message || 'নোটিশ সফলভাবে যোগ হয়েছে!', isError: false });
      setNoticeTitle(''); setNoticeDate('');
    } catch (err) { setMessage({ text: 'নোটিশ যোগ করতে সমস্যা হয়েছে!', isError: true }); }
    finally { setLoading(false); }
  };

  // নাগরিক সেবা সাবমিট হ্যান্ডলার
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    try {
      const res = await axios.post('/api/services', { title: serviceTitle, path: servicePath, iconName, iconColor });
      setMessage({ text: res.data.message || 'সেবাটি সফলভাবে যোগ হয়েছে!', isError: false });
      setServiceTitle(''); setServicePath('');
    } catch (err) { setMessage({ text: 'সেবা যোগ করতে সমস্যা হয়েছে!', isError: true }); }
    finally { setLoading(false); }
  };

  // ইউনিয়ন পরিচিতি সাবমিট হ্যান্ডলার
  const handleIntroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    const finalIntroData = {
      title: introTitle, subtitle: introSubtitle, history: introHistory, established: establishedIntro,
      area: areaIntro, totalVillages: totalVillagesIntro, totalPopulation: totalPopulationIntro, literacyRate: literacyRateIntro,
      college, highSchool, primarySchool, madrasah, landmarks
    };
    try {
      const response = await axios.post('/api/intro', finalIntroData);
      setMessage({ text: response.data.message || 'ইউনিয়ন পরিচিতি সফলভাবে আপডেট করা হয়েছে!', isError: false });
    } catch (error) { setMessage({ text: 'পরিচিতি তথ্য আপডেট করতে ব্যর্থ হয়েছে!', isError: true }); }
    finally { setLoading(false); }
  };

  // 🌟 এক নজরে ইউনিয়ন (Glance) সাবমিট হ্যান্ডলার
  const handleGlanceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    const finalGlanceData = {
      totalPopulation: glancePop,
      totalVoters: glanceVoters,
      area: glanceArea,
      literacyRate: glanceLiteracy,
      totalVillages: glanceVillages,
      primarySchools: glanceSchools,
      healthCenters: glanceHealth,
      established: glanceEst
    };

    try {
      const response = await axios.post('/api/glance', finalGlanceData);
      setMessage({ text: response.data.message || 'এক নজরে ইউনিয়নের তথ্য আপডেট হয়েছে!', isError: false });
    } catch (error) {
      setMessage({ text: 'এক নজরে তথ্য আপডেট করতে ব্যর্থ!', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-slate-900 text-white py-5 px-6 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded text-slate-900 font-bold text-xs sm:text-sm">ADMIN</div>
          <h1 className="text-base sm:text-xl font-bold tracking-wide">ইউনিয়ন পরিষদ কন্ট্রোল প্যানেল</h1>
        </div>
        <Link to="/" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-lg border border-slate-700 transition">
          <FaArrowLeft /> মূল ওয়েবসাইট
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {message.text && (
          <div className={`p-4 rounded-xl text-sm font-semibold text-center border shadow-sm ${
            message.isError ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* সেকশন ১: নোটিশ এবং সার্ভিস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* নোটিশ ফর্ম */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-4">
              <FaBullhorn className="text-amber-500" />
              <h2>নতুন নোটিশ জারি করুন</h2>
            </div>
            <form onSubmit={handleNoticeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">নোটিশের শিরোনাম *</label>
                <textarea required rows="2" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">তারিখ</label>
                <input type="text" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} placeholder="যেমন: ০৭ জুন, ২০২৬" className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-sm">নোটিশ আপডেট করুন</button>
            </form>
          </div>

          {/* নাগরিক সেবা ফরম */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-4">
              <FaCogs className="text-emerald-500" />
              <h2>নতুন নাগরিক সেবা যোগ করুন</h2>
            </div>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সেবার নাম *</label>
                <input type="text" required value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">রাউট লিংক / পাথ *</label>
                <input type="text" required value={servicePath} onChange={(e) => setServicePath(e.target.value)} placeholder="/service/trade-license" className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-sm">সেবা গ্রিডে যোগ করুন</button>
            </form>
          </div>
        </div>

        {/* 🌟 সেকশন ২: এক নজরে ইউনিয়ন (Glance) আপডেট ফর্ম */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6">
            <FaListAlt className="text-green-600" />
            <h2>"এক নজরে ইউনিয়ন" তথ্য আপডেট ফরম</h2>
          </div>

          <form onSubmit={handleGlanceSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">মোট জনসংখ্যা</label>
              <input type="text" placeholder="যেমন: ৪৫,২৫০ জন" value={glancePop} onChange={(e) => setGlancePop(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">মোট ভোটার</label>
              <input type="text" placeholder="যেমন: ২৮,২০০ জন" value={glanceVoters} onChange={(e) => setGlanceVoters(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">আয়তন</label>
              <input type="text" placeholder="যেমন: ২৫.৪ বর্গ কি.মি." value={glanceArea} onChange={(e) => setGlanceArea(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষার হার</label>
              <input type="text" placeholder="যেমন: ৭২.৫%" value={glanceLiteracy} onChange={(e) => setGlanceLiteracy(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">গ্রামের সংখ্যা</label>
              <input type="text" placeholder="যেমন: ১৮ টি" value={glanceVillages} onChange={(e) => setGlanceVillages(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">প্রাথমিক বিদ্যালয়</label>
              <input type="text" placeholder="যেমন: ১২ টি" value={glanceSchools} onChange={(e) => setGlanceSchools(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">স্বাস্থ্য কেন্দ্র</label>
              <input type="text" placeholder="যেমন: ২ টি" value={glanceHealth} onChange={(e) => setGlanceHealth(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">স্থাপিত সাল</label>
              <input type="text" placeholder="যেমন: ১৯৬০ খ্রিস্টাব্দ" value={glanceEst} onChange={(e) => setGlanceEst(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div className="col-span-2 md:col-span-4 pt-2">
              <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2">
                <FaSave /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'এক নজরে পেজের তথ্য আপডেট করুন'}
              </button>
            </div>
          </form>
        </div>

        {/* সেকশন ৩: ইউনিয়ন পরিচিতি (Intro) ফর্ম */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6">
            <FaInfoCircle className="text-blue-600" />
            <h2>ইউনিয়ন পরিচিতি ও ইতিহাস আপডেট ফরম</h2>
          </div>
          <form onSubmit={handleIntroSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পেইজের মূল শিরোনাম *</label>
                <input type="text" required value={introTitle} onChange={(e) => setIntroTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">উপ-শিরোনাম *</label>
                <input type="text" required value={introSubtitle} onChange={(e) => setIntroSubtitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Detailed History *</label>
              <textarea required rows="4" value={introHistory} onChange={(e) => setIntroHistory(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-950 hover:bg-sky-950 text-white font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2">
              <FaSave /> {loading ? 'তথ্য সংরক্ষণ করা হচ্ছে...' : 'ইউনিয়ন পরিচিতি পেজ আপডেট করুন'}
            </button>
          </form>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;