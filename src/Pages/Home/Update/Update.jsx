import React from 'react';

const Update = () => {
  // ডেমো আপডেট ও নোটিশ ডাটা
  const latestUpdates = [
    {
      id: 1,
      tag: 'জরুরি নোটিশ',
      tagColor: 'bg-red-500',
      date: '০৭ জুন, ২০২৬',
      title: '২০২৬-২০২৭ অর্থবছরের ভিডব্লিউবি (VWB) কার্ডের চাউল বিতরণ সংক্রান্ত বিজ্ঞপ্তি',
      description: 'আমাদের ইউনিয়নের সকল সুবিধাভোগীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ১০ই জুন থেকে ইউনিয়ন পরিষদ গোডাউন হতে চলতি মাসের চাউল বিতরণ করা হবে। জাতীয় পরিচয়পত্র সাথে আনার অনুরোধ রইল।',
      link: '#',
    },
    {
      id: 2,
      tag: 'ট্যাক্স আপডেট',
      tagColor: 'bg-blue-500',
      date: '০৪ জুন, ২০২৬',
      title: 'অনলাইনের মাধ্যমে হোল্ডিং ট্যাক্স বা গৃহকর পরিশোধের সুবিধা',
      description: 'এখন থেকে ঘরে বসেই ইউনিয়নের যেকোনো নাগরিক তাদের বাৎসরিক হোল্ডিং ট্যাক্স আমাদের ডিজিটাল পোর্টালের মাধ্যমে বিকাশ, রকেট বা নগদে পরিশোধ করতে পারবেন। রশিদটি অনলাইন থেকেই ডাউনলোড করা যাবে।',
      link: '#',
    },
    {
      id: 3,
      tag: 'স্বাস্থ্যসেবা',
      tagColor: 'bg-emerald-500',
      date: '২৮ মে, ২০২৬',
      title: 'বিনামূল্যে ৫ দিনব্যাপী শিশু ও মাতৃ স্বাস্থ্য ক্যাম্পেইন',
      description: 'আগামী ১৩ই জুন থেকে ইউনিয়ন স্বাস্থ্য কেন্দ্রে অভিজ্ঞ ডাক্তার দ্বারা মা ও শিশুদের বিনামূল্যে স্বাস্থ্য পরীক্ষা, পরামর্শ এবং প্রয়োজনীয় ওষুধ বিতরণ করা হবে। রেজিষ্ট্রেশন চলছে।',
      link: '#',
    },
    {
      id: 4,
      tag: 'উন্নয়ন প্রকল্প',
      tagColor: 'bg-amber-500',
      date: '১৫ মে, ২০২৬',
      title: '৩ নং ওয়ার্ডের প্রধান সড়ক সংস্কার কাজের শুভ উদ্বোধন',
      description: 'এলজিএসপি-৩ প্রকল্পের আওতায় ৩ নং ওয়ার্ডের প্রধান পাকা রাস্তাটি পুনর্নির্মাণের কাজ আনুষ্ঠানিকভাবে শুরু হয়েছে। সাময়িক যাতায়াত অসুবিধার জন্য ইউনিয়ন পরিষদ আন্তরিকভাবে দুঃখিত।',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            সর্বশেষ আপডেট ও নোটিশ
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            ইউনিয়ন পরিষদের সকল প্রকার সরকারি ঘোষণা, নোটিশ, উন্নয়নমূলক কর্মকাণ্ড এবং নাগরিক সেবার সর্বশেষ তথ্যাদি।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Emergency Ticker/Alert Bar */}
        <div className="mb-10 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 shadow-xs flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-3 w-full">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div className="text-xs sm:text-sm text-red-800 font-bold whitespace-nowrap">
              জরুরি ব্রেকিং:
            </div>
            {/* Smooth marquee texture using simple tailwind transition effect */}
            <p className="text-xs sm:text-sm text-red-700 font-medium truncate">
              স্মার্ট কার্ড ও জন্ম নিবন্ধনের সংশোধনী ক্যাম্প আগামী রবিবার থেকে শুরু হবে। বিস্তারিত জানতে নোটিশ বোর্ড লক্ষ্য করুন।
            </p>
          </div>
        </div>

        {/* Updates Feed Layout (Vertical Time-line Style) */}
        <div className="space-y-6">
          {latestUpdates.map((update) => (
            <div 
              key={update.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Meta Row (Tag & Date) */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold text-white px-2.5 py-0.5 rounded-md ${update.tagColor}`}>
                    {update.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    📅 {update.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-3">
                  {update.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {update.description}
                </p>
              </div>

              {/* Read More / Download Button Section */}
              <div className="pt-4 border-t border-gray-50 flex justify-end">
                <a 
                  href={update.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 transition-colors bg-green-50 hover:bg-green-100/70 px-3 py-1.5 rounded-lg"
                >
                  বিস্তারিত পড়ুন 
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Older Updates Pagination Placeholder Button */}
        <div className="mt-10 text-center">
          <button className="px-6 py-2.5 text-sm font-bold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-xs transition-colors">
            পুরানো নোটিশ আর্কাইভ দেখুন
          </button>
        </div>

      </div>
    </div>
  );
};

export default Update;