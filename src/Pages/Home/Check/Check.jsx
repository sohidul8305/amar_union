import React, { useState } from 'react';

const Check = () => {
  // Form State Management
  const [certificateType, setCertificateType] = useState('');
  const [certificateNo, setCertificateNo] = useState('');
  const [nidNo, setNidNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনার ব্যাকএন্ড এপিআই কল বা ভ্যালিডেশন লজিক বসাতে পারবেন
    alert(`যাচাই করা হচ্ছে: ${certificateType}, নম্বর: ${certificateNo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header Section */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full shadow-xs">
            ডিজিটাল সেবা পোর্টাল
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            অনলাইন সনদ যাচাইকরণ
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
            ইউনিয়ন পরিষদ কর্তৃক প্রদত্ত যেকোনো ডিজিটাল সনদ বা প্রত্যয়নপত্রের সত্যতা তাৎক্ষণিকভাবে যাচাই করুন।
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid: Form + Instructions */}
        {/* Mobile: 1 col, Desktop: 2 cols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Verification Form Card (Takes 7 columns on desktop) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl p-2 bg-blue-50 text-blue-600 rounded-xl">🔒</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">সনদ অনুসন্ধান ফরম</h2>
                <p className="text-xs text-gray-400">সঠিক তথ্য দিয়ে নিচের ঘরগুলো পূরণ করুন</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Certificate Type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  সনদের ধরণ <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium text-gray-800"
                >
                  <option value="">-- নির্বাচন করুন --</option>
                  <option value="birth">জন্ম নিবন্ধন প্রত্যয়নপত্র</option>
                  <option value="character">নাগরিকত্ব / চারিত্রیک সনদ</option>
                  <option value="warish">ওয়ারিশ সনদপত্র</option>
                  <option value="trade">ট্রেড লাইসেন্স</option>
                  <option value="income">বাৎসরিক আয় বা বিবিধ প্রত্যয়ন</option>
                </select>
              </div>

              {/* Certificate ID/Number Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  সনদ / লাইসেন্স নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="উদা: UP-2026-XXXX"
                  value={certificateNo}
                  onChange={(e) => setCertificateNo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800"
                />
              </div>

              {/* Optional: NID / Mobile input for extra security */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  আবেদনকারীর এনআইডি / জন্ম নিবন্ধন নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="জাতীয় পরিচয়পত্র নম্বর দিন"
                  value={nidNo}
                  onChange={(e) => setNidNo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] transition-all duration-150 text-sm flex items-center justify-center gap-2"
              >
                <span>🔍</span> সনদ যাচাই করুন
              </button>
            </form>
          </div>

          {/* Quick Help / Instruction Box (Takes 5 columns on desktop) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <span className="text-lg">💡</span> জরুরি নির্দেশনাবলী
              </h3>
              
              <ul className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                <li className="flex gap-2.5">
                  <span className="text-blue-400 font-bold">১.</span>
                  <span>আপনার হাতে থাকা সনদের ওপরের ডানদিকের কোণায় প্রিন্ট করা সনদ নম্বরটি সঠিকভাবে বসান।</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-blue-400 font-bold">২.</span>
                  <span>সনদের ধরণ ড্রপডাউন মেনু থেকে নির্বাচন করা আবশ্যিক।</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-blue-400 font-bold">৩.</span>
                  <span>অনলাইন কপিতে থাকা কিউআর (QR) কোডটি স্ক্যান করেও সরাসরি এই ভেরিফিকেশন সম্পন্ন করা সম্ভব।</span>
                </li>
              </ul>

              {/* Decorative Subtle Background Badge */}
              <div className="absolute -bottom-6 -right-6 text-slate-700 text-7xl opacity-20 pointer-events-none select-none">
                ✓
              </div>
            </div>

            {/* Helpline Minimal Widget */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase">যেকোনো সমস্যায় হেল্পলাইন</p>
                <p className="text-sm font-extrabold text-blue-700">০৯৬১২-XXXXXX (সকাল ৯টা - বিকাল ৫টা)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Security Trust Mark */}
        <div className="mt-12 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
          <span>🛡️</span>
          <span>এই সিস্টেমটি সম্পূর্ণ এনক্রিপ্টেড এবং সরকারি ডাটা প্রাইভেসী আইন মেনে পরিচালিত।</span>
        </div>

      </div>
    </div>
  );
};

export default Check;