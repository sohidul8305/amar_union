import React, { useState } from 'react';

const New_voter = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    birthRegNo: '',
    address: '',
    mobile: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">নতুন ভোটার সুপারিশ ফরম</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="name" placeholder="পুরো নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="motherName" placeholder="মাতার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="date" name="dob" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="birthRegNo" placeholder="জন্ম নিবন্ধন নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
          <input type="text" name="address" placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
          <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="email" name="email" placeholder="ইমেইল ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
        </div>

        {/* Certificate Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            এই মর্মে সুপারিশ করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong> এবং মাতা: <strong>{formData.motherName || '........'}</strong>, অত্র এলাকার একজন স্থায়ী বাসিন্দা। তার জন্ম তারিখ: <strong>{formData.dob || '........'}</strong> এবং জন্ম নিবন্ধন নম্বর: <strong>{formData.birthRegNo || '........'}</strong>।
          </p>
          <p className="text-lg">
            তিনি একজন নতুন ভোটার হিসেবে নিবন্ধিত হতে ইচ্ছুক। আমি তার ভোটার হওয়ার সুপারিশ করছি।
          </p>
          <p className="text-sm text-gray-500">
            মোবাইল: {formData.mobile || '........'} | ইমেইল: {formData.email || '........'}
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

export default New_voter;