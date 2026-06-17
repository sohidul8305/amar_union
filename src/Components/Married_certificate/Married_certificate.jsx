import React, { useState } from 'react';

const Married_certificate = () => {
  const [formData, setFormData] = useState({
    name: '',
    spouseName: '',
    marriageDate: '',
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">বিবাহিত সনদপত্র ফরম</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="name" placeholder="আপনার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="spouseName" placeholder="স্বামী/স্ত্রীর নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="date" name="marriageDate" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="village" placeholder="গ্রাম/মহল্লা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="postOffice" placeholder="ডাকঘর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="upazila" placeholder="উপজেলা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="district" placeholder="জেলা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="email" name="email" placeholder="ইমেইল ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
        </div>

        {/* Certificate Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong> এবং <strong>{formData.spouseName || '........'}</strong> বিবাহবন্ধনে আবদ্ধ হয়েছেন। তাদের বিয়ের তারিখ: <strong>{formData.marriageDate || '........'}</strong>।
          </p>
          <p className="text-lg">
            তারা বর্তমান ঠিকানা—গ্রাম: {formData.village || '........'}, ডাকঘর: {formData.postOffice || '........'}, উপজেলা: {formData.upazila || '........'}, জেলা: {formData.district || '........'} এ বসবাসরত।
          </p>
          <p className="text-sm text-gray-500">
            ইমেইল: {formData.email || '........'}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
          >
            আবেদন করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Married_certificate;