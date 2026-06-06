import React from 'react';

const Secretary = () => {
  // সচিবের তথ্য (প্রয়োজন অনুযায়ী চেঞ্জ করে নিবেন)
  const secretaryData = {
    name: 'জনাব সুকোমল বড়ুয়া',
    title: 'ইউনিয়ন পরিষদ সচিব',
    department: 'স্থানীয় সরকার বিভাগ (এলজিডি)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600', // ডেমো ছবি
    joiningDate: '১৫ মে, ২০২০',
    phone: '+৮৮০ ১৭১২-৫৫৬৬৭৭',
    email: 'secretary@union.gov.bd',
    officeTime: 'সকাল ৯:০০ - বিকেল ৫:০০ (রবি - বৃহস্পতিবার)',
    education: 'স্নাতকোত্তর (লোক প্রশাসন), ঢাকা বিশ্ববিদ্যালয়',
    
    // সচিবের মূল দায়িত্বসমূহ
    responsibilities: [
      'ইউনিয়ন পরিষদের যাবতীয় প্রশাসনিক ও দাপ্তরিক কার্য পরিচালনা।',
      'পরিষদের বাজেট প্রণয়ন, হিসাব সংরক্ষণ এবং আর্থিক বিবরণী প্রস্তুতকরণ।',
      'জন্ম-মৃত্যু নিবন্ধন, নাগরিক সনদ ও বিভিন্ন লাইসেন্স ইস্যুকরণে সমন্বয়।',
      'ইউনিয়ন পরিষদের সাধারণ ও বিশেষ সভার কার্যবিবরণী লিপিবদ্ধকরণ ও বাস্তবায়ন।',
      'সরকারি বিভিন্ন অনুদান ও উন্নয়নমূলক প্রকল্পের সঠিক তদারকি ও হিসাব রাখা।'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            ইউনিয়ন পরিষদ সচিব প্রোফাইল
          </h1>
          <div className="mt-3 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Grid: Mobile-e 1 column, Desktop-e 3 columns (1:2 ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Profile Card & Contacts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center h-fit">
            <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden ring-4 ring-green-500/10 mb-6 shadow-md">
              <img 
                src={secretaryData.image} 
                alt={secretaryData.name} 
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">{secretaryData.name}</h2>
            <p className="text-sm font-semibold text-green-600 mt-1">{secretaryData.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{secretaryData.department}</p>

            {/* Contact & Office Info */}
            <div className="w-full mt-6 pt-6 border-t border-gray-100 space-y-4 text-left text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600 font-bold">📱</span>
                <div>
                  <p className="text-xs text-gray-400 font-bold">মোবাইল নম্বর</p>
                  <p className="text-gray-800 font-medium">{secretaryData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600 font-bold">✉️</span>
                <div>
                  <p className="text-xs text-gray-400 font-bold">ইমেইল ঠিকানা</p>
                  <p className="text-gray-800 font-medium break-all">{secretaryData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600 font-bold">🕒</span>
                <div>
                  <p className="text-xs text-gray-400 font-bold">কার্যালয়ের সময়</p>
                  <p className="text-gray-800 font-medium">{secretaryData.officeTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Qualifications & Responsibilities */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Info Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
                ব্যক্তিগত পরিচিতি
              </h3>
              
              <div className="divide-y divide-gray-100 text-sm sm:text-base">
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="font-bold text-gray-500">শিক্ষাগত যোগ্যতা:</span>
                  <span className="text-gray-800 sm:col-span-2">{secretaryData.education}</span>
                </div>
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="font-bold text-gray-500">বর্তমানে কর্মরত:</span>
                  <span className="text-gray-800 sm:col-span-2">এই ইউনিয়নে {secretaryData.joiningDate} থেকে চলমান।</span>
                </div>
              </div>
            </div>

            {/* Responsibilities Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
                প্রধান কার্যাবলী ও দায়িত্বসমূহ
              </h3>
              
              <ul className="space-y-3.5">
                {secretaryData.responsibilities.map((duty, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600 text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Secretary;