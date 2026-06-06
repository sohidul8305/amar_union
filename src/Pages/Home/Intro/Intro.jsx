import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaMapMarkerAlt, FaUsers, FaGraduationCap, FaBuilding, 
  FaHistory, FaGlobe, FaAward, FaChartLine 
} from 'react-icons/fa';

// 🔥 Vite এবং CRA দুই জায়গাতেই কাজ করবে এমনভাবে API বেস URL নির্ধারণ
const getApiBaseUrl = () => {
  // প্রোডাকশনে (Netlify, Vercel) আপনি .env এ ভেরিয়েবল সেট করবেন
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL; // Vite
  }
  if (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL; // Create React App
  }
  return 'http://localhost:5000'; // ডিফল্ট লোকাল
};

const Intro = () => {
  const [introData, setIntroData] = useState({
    title: "১৬ নং মোহনপুর ইউনিয়ন পরিষদ",
    subtitle: "এক নজরে আমাদের গৌরব ও ঐতিহ্য",
    history: "১৬ নং মোহনপুর ইউনিয়ন পরিষদটি কুমিল্লা জেলার দেবিদ্বার উপজেলায় অবস্থিত। এটি একটি ঐতিহ্যবাহী ও আদর্শ ইউনিয়ন। গোমতী নদীর তীরে গড়ে ওঠা এই ইউনিয়ন শিক্ষা, সংস্কৃতি ও কৃষিতে অগ্রণী।",
    established: "১৯৬০ খ্রিঃ",
    area: "১৮.৫০ বর্গ কিলোমিটার",
    totalVillages: "১৪ টি",
    totalPopulation: "৪৫,২৫০ জন (প্রায়)",
    literacyRate: "৬৫.৫%",
    educationalInstitutions: {
      college: "১ টি",
      highSchool: "৪ টি",
      primarySchool: "১২ টি",
      madrasah: "৬ টি"
    },
    landmarks: [
      "মোহনপুর কেন্দ্রীয় শাহী জামে মসজিদ",
      "ঐতিহাসিক মোহনপুর খেলার মাঠ",
      "গোমতী নদীর মনোরম পাড়",
      "মোহনপুর আদর্শ উচ্চ বিদ্যালয়"
    ]
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const response = await axios.get(`${baseUrl}/api/intro`);
        
        if (isMounted && response.data) {
          const fetchedData = Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : response.data;
          setIntroData(prev => ({ ...prev, ...fetchedData }));
          setError(null);
        }
      } catch (err) {
        console.error("API কল ব্যর্থ:", err);
        if (isMounted) setError("সার্ভার থেকে তথ্য আনা সম্ভব হয়নি। ডিফল্ট তথ্য দেখানো হচ্ছে।");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* হেডার */}
        <div className="text-center bg-gradient-to-r from-blue-900 to-sky-950 text-white p-8 rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase">ইউনিয়ন পরিচিতি</span>
          <h1 className="text-2xl md:text-4xl font-extrabold mt-2">{introData.title}</h1>
          <p className="text-sm md:text-base text-gray-300">{introData.subtitle}</p>
        </div>

        {/* ইতিহাস */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 border-b pb-3 mb-4">
            <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg"><FaHistory className="text-xl" /></div>
            <h2 className="text-xl font-bold text-gray-800">পটভূমি ও ইতিহাস</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-justify">{introData.history}</p>
        </div>

        {/* পরিসংখ্যান গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FaBuilding />} bg="emerald" label="মোট আয়তন" value={introData.area} />
          <StatCard icon={<FaUsers />} bg="blue" label="মোট জনসংখ্যা" value={introData.totalPopulation} />
          <StatCard icon={<FaMapMarkerAlt />} bg="amber" label="গ্রামের সংখ্যা" value={introData.totalVillages} />
          <StatCard icon={<FaGraduationCap />} bg="purple" label="শিক্ষার হার" value={introData.literacyRate} />
        </div>

        {/* দুই কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* শিক্ষা প্রতিষ্ঠান */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 border-b pb-3 mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FaAward className="text-lg" /></div>
              <h3 className="text-lg font-bold">শিক্ষা প্রতিষ্ঠান</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InfoTile label="কলেজ" value={introData.educationalInstitutions?.college} />
              <InfoTile label="উচ্চ বিদ্যালয়" value={introData.educationalInstitutions?.highSchool} />
              <InfoTile label="প্রাথমিক বিদ্যালয়" value={introData.educationalInstitutions?.primarySchool} />
              <InfoTile label="মাদরাসা" value={introData.educationalInstitutions?.madrasah} />
            </div>
          </div>

          {/* দর্শনীয় স্থান */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 border-b pb-3 mb-4">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><FaGlobe className="text-lg" /></div>
              <h3 className="text-lg font-bold">দর্শনীয় স্থান</h3>
            </div>
            <ul className="space-y-2">
              {introData.landmarks?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-sky-600 rounded-full"></div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ইনফো বক্স */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex flex-col sm:flex-row justify-between items-center text-amber-900 text-sm">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-amber-600" />
            <span>প্রতিষ্ঠাকাল থেকে আজ পর্যন্ত সফলভাবে সেবা প্রদান করে আসছে।</span>
          </div>
          <span className="font-bold bg-amber-200 px-3 py-1 rounded mt-2 sm:mt-0">স্থাপিত: {introData.established}</span>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};

// হেল্পার কম্পোনেন্ট
const StatCard = ({ icon, bg, label, value }) => {
  const bgColors = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bgColors[bg]}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-400 uppercase">{label}</p>
        <p className="text-base font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const InfoTile = ({ label, value }) => (
  <div className="bg-slate-50 p-3 rounded-lg border">
    <span className="text-gray-500 text-xs block">{label}</span>
    <span className="font-bold text-gray-800">{value || '—'}</span>
  </div>
);

export default Intro;