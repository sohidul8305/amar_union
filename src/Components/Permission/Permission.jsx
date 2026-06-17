import React, { useState } from 'react';

const Permission = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
    email: '',
    subject: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">অনুমতি পত্র ফরম</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="name" placeholder="আপনার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="village" placeholder="গ্রাম/মহল্লা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="postOffice" placeholder="ডাকঘর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="upazila" placeholder="উপজেলা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="district" placeholder="জেলা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="subject" placeholder="অনুমতির বিষয়" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
          <input type="email" name="email" placeholder="আপনার ইমেইল" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
        </div>

        {/* Certificate Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong>, গ্রাম: <strong>{formData.village || '........'}</strong>, ডাকঘর: <strong>{formData.postOffice || '........'}</strong>, উপজেলা: <strong>{formData.upazila || '........'}</strong>, জেলা: <strong>{formData.district || '........'}</strong> কে অত্র এলাকার পক্ষ থেকে <strong>{formData.subject || '........'}</strong> এর জন্য অনুমতি প্রদান করা হলো।
          </p>
          <p className="text-sm text-gray-500">
            ইমেইল: {formData.email || '........'}
          </p>
        </div>

        {/* Print Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
          >
            অনুমতি পত্র প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permission;