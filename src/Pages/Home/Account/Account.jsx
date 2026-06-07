import React from 'react';

const Account = () => {
  // হিসাব ও বাজেট সংক্রান্ত ডেমো ডাটা
  const financialYear = "২০২৫ - ২০২৬";
  
  const accountStats = [
    { id: 1, label: 'মোট বরাদ্দ / বাজেট', value: '১,২৫,৫০,০০০ টাকা', detail: 'চলতি অর্থবছর', color: 'bg-emerald-500', icon: '💰' },
    { id: 2, label: 'রাজস্ব আয় (ট্যাক্স/ফি)', value: '৪৫,২০,০০০ টাকা', detail: 'লক্ষ্যমাত্রা: ৮০%', color: 'bg-blue-500', icon: '📈' },
    { id: 3, label: 'উন্নয়নমূলক ব্যয়', value: '৬৮,৩০,০০০ টাকা', detail: 'রাস্তা ও অবকাঠামো', color: 'bg-amber-500', icon: '🏗️' },
    { id: 4, label: 'সংরক্ষিত তহবিল', value: '১১,system০,০০০ টাকা', detail: 'জরুরী আপদকালীন', color: 'bg-purple-500', icon: '🏦' },
  ];

  const budgetSectors = [
    { id: 1, sector: 'অবকাঠামো ও রাস্তাঘাট উন্নয়ন', allocation: '৪০%', amount: '৫০,২০,০০০ টাকা', status: 'চলমান' },
    { id: 2, sector: 'শিক্ষা, সংস্কৃতি ও ক্রীড়া', allocation: '২০%', amount: '২৫,১০,০০০ টাকা', status: 'অনুমোদিত' },
    { id: 3, sector: 'স্বাস্থ্য ও সমাজকল্যাণ', allocation: '১৫%', amount: '১৮,৮২,৫০০ টাকা', status: 'চলমান' },
    { id: 4, sector: 'কৃষি ও মৎস্য সম্পদ উন্নয়ন', allocation: '১৫%', amount: '১৮,৮২,৫০০ টাকা', status: 'অনুমোদিত' },
    { id: 5, sector: 'দুর্যোগ ব্যবস্থাপনা ও ত্রাণ', allocation: '১০%', amount: '১২,৫৫,০০০ টাকা', status: 'সংরক্ষিত' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            অর্থ ও হিসাব শাখা
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
            অর্থবছর: <span className="font-bold text-green-600">{financialYear}</span> - ইউনিয়ন পরিষদের বাজেট বরাদ্দ, আয়-ব্যয় এবং আর্থিক তহবিলের বিবরণী।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Overview Widgets Grid */}
        {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {accountStats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <span className="text-2xl p-2 bg-gray-50 rounded-xl">{stat.icon}</span>
              </div>
              
              <div className="mt-4 flex items-center text-xs text-gray-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 inline-block"></span>
                {stat.detail}
              </div>
              
              {/* Top Accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${stat.color}`} />
            </div>
          ))}
        </div>

        {/* Budget Allocation Breakdown Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
            খাতওয়ারী বাজেট বরাদ্দ ও অগ্রগতি
          </h3>

          {/* Budget List (Highly Responsive alternative to tables) */}
          <div className="space-y-4">
            {budgetSectors.map((sector) => (
              <div 
                key={sector.id} 
                className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-green-100 transition-colors"
              >
                {/* Sector Title & Progress Bar */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-800">{sector.sector}</span>
                    <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      {sector.allocation}
                    </span>
                  </div>
                  {/* Fake Progress Bar to look modern */}
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-600 h-full rounded-full" 
                      style={{ width: sector.allocation.replace('%', '') + '%' }}
                    />
                  </div>
                </div>

                {/* Amount and Status */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-400 font-semibold">বরাদ্দকৃত অর্থ</p>
                    <p className="text-sm font-bold text-gray-900">{sector.amount}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    sector.status === 'চলমান' ? 'bg-amber-50 text-amber-700' : 
                    sector.status === 'অনুমোদিত' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sector.status}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Notice/Alert Footer */}
        <div className="mt-8 bg-green-50/50 border border-green-100 rounded-xl p-4 text-xs sm:text-sm text-green-800 flex items-start gap-2.5">
          <span>📢</span>
          <p><strong>নাগরিক অবগতি:</strong> ইউনিয়ন পরিষদের যাবতীয় কর (ট্যাক্স), ট্রেড লাইসেন্স ফি এবং বিবিধ ফি ডিজিটাল ক্যাশ কাউন্টারে জমা দিয়ে রশিদ সংগ্রহ করার জন্য অনুরোধ করা হলো। অর্থ সংক্রান্ত স্বচ্ছতা রক্ষায় আমরা প্রতিশ্রুতিবদ্ধ।</p>
        </div>

      </div>
    </div>
  );
};

export default Account;