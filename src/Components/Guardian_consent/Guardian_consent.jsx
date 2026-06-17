import React, { useState } from 'react';

const Guardian_consent = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    relationship: '',
    consentFor: '', // কিসের জন্য সম্মতি
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">অভিভাবকের সম্মতিপত্র ফরম</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="studentName" placeholder="শিক্ষার্থীর নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="guardianName" placeholder="অভিভাবকের নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="relationship" placeholder="অভিভাবকের সাথে সম্পর্ক" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="consentFor" placeholder="সম্মতির বিষয় (যেমন: শিক্ষাসফর/পরীক্ষা)" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="village" placeholder="গ্রাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="postOffice" placeholder="ডাকঘর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="upazila" placeholder="উপজেলা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="district" placeholder="জেলা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="email" name="email" placeholder="ইমেইল ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
        </div>

        {/* Certificate Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            আমি <strong>{formData.guardianName || '........'}</strong>, <strong>{formData.studentName || '........'}</strong> এর <strong>{formData.relationship || '........'}</strong> হিসেবে ঘোষণা করছি যে, <strong>{formData.consentFor || '........'}</strong> এর জন্য আমার পূর্ণ সম্মতি রয়েছে।
          </p>
          <p className="text-lg">
            ঠিকানা: গ্রাম- {formData.village || '........'}, ডাকঘর- {formData.postOffice || '........'}, উপজেলা- {formData.upazila || '........'}, জেলা- {formData.district || '........'}।
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

export default Guardian_consent;