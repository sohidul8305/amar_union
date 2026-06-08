import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Check = () => {
  const [config, setConfig] = useState({
    pageTitle: 'অনলাইন সনদ যাচাইকরণ',
    pageSubtitle: 'ইউনিয়ন পরিষদ কর্তৃক প্রদত্ত যেকোনো ডিজিটাল সনদ বা প্রত্যয়নপত্রের সত্যতা তাৎক্ষণিকভাবে যাচাই করুন।',
    badgeText: 'ডিজিটাল সেবা পোর্টাল',
    formTitle: 'সনদ অনুসন্ধান ফরম',
    formDescription: 'সঠিক তথ্য দিয়ে নিচের ঘরগুলো পূরণ করুন',
    certificateTypes: [],
    instructionsTitle: 'জরুরি নির্দেশনাবলী',
    instructionsList: [],
    helplineLabel: 'যেকোনো সমস্যায় হেল্পলাইন',
    helplineNumber: '০৯৬১২-XXXXXX (সকাল ৯টা - বিকাল ৫টা)',
    trustMessage: 'এই সিস্টেমটি সম্পূর্ণ এনক্রিপ্টেড এবং সরকারি ডাটা প্রাইভেসী আইন মেনে পরিচালিত।',
    submitButtonText: 'সনদ যাচাই করুন',
    placeholderCertNo: 'উদা: UP-2026-XXXX',
    placeholderNid: 'জাতীয় পরিচয়পত্র নম্বর দিন'
  });

  const [certificateType, setCertificateType] = useState('');
  const [certificateNo, setCertificateNo] = useState('');
  const [nidNo, setNidNo] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get('/api/verification-page');
        if (res.data && Object.keys(res.data).length) {
          setConfig(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('কনফিগ লোড ব্যর্থ:', err);
      }
    };
    fetchConfig();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`যাচাই করা হচ্ছে: ${certificateType}, নম্বর: ${certificateNo}`);
    // এখানে আপনার আসল এপিআই কল বসবে
  };

  // সনদের অপশন গুলো যদি ফাঁকা থাকে তবে ডিফল্ট দেখানো
  const certOptions = config.certificateTypes && config.certificateTypes.length ? config.certificateTypes : [
    { value: 'birth', label: 'জন্ম নিবন্ধন প্রত্যয়নপত্র' },
    { value: 'character', label: 'নাগরিকত্ব / চারিত্রিক সনদ' },
    { value: 'warish', label: 'ওয়ারিশ সনদপত্র' },
    { value: 'trade', label: 'ট্রেড লাইসেন্স' },
    { value: 'income', label: 'বাৎসরিক আয় বা বিবিধ প্রত্যয়ন' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full shadow-xs">
            {config.badgeText}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            {config.pageTitle}
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
            {config.pageSubtitle}
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* ফর্ম */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl p-2 bg-blue-50 text-blue-600 rounded-xl">🔒</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{config.formTitle}</h2>
                <p className="text-xs text-gray-400">{config.formDescription}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  সনদের ধরণ <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                >
                  <option value="">-- নির্বাচন করুন --</option>
                  {certOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  সনদ / লাইসেন্স নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={config.placeholderCertNo}
                  value={certificateNo}
                  onChange={(e) => setCertificateNo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  আবেদনকারীর এনআইডি / জন্ম নিবন্ধন নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder={config.placeholderNid}
                  value={nidNo}
                  onChange={(e) => setNidNo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] transition-all duration-150 text-sm flex items-center justify-center gap-2"
              >
                <span>🔍</span> {config.submitButtonText}
              </button>
            </form>
          </div>

          {/* নির্দেশনা বক্স */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <span className="text-lg">💡</span> {config.instructionsTitle}
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                {config.instructionsList.map((instruction, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-blue-400 font-bold">{idx+1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute -bottom-6 -right-6 text-slate-700 text-7xl opacity-20 pointer-events-none">✓</div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase">{config.helplineLabel}</p>
                <p className="text-sm font-extrabold text-blue-700">{config.helplineNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
          <span>🛡️</span>
          <span>{config.trustMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default Check;