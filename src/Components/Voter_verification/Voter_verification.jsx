import React, { useState } from 'react';

const Voter_verification = () => {
  const [formData, setFormData] = useState({
    name: '',
    nidNumber: '',
    voterNumber: '',
    area: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">ভোটার যাচাইকরণ ফরম</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="name" placeholder="ভোটারের নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="nidNumber" placeholder="এনআইডি (NID) নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="voterNumber" placeholder="ভোটার নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="area" placeholder="এলাকা/ওয়ার্ড নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="email" name="email" placeholder="ইমেইল ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
        </div>

        {/* Certificate/Result Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            এই মর্মে যাচাই করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong> অত্র এলাকার ভোটার তালিকার একজন অন্তর্ভুক্ত ব্যক্তি। 
          </p>
          <p className="text-lg">
            তার এনআইডি নম্বর: <strong>{formData.nidNumber || '........'}</strong> এবং ভোটার নম্বর: <strong>{formData.voterNumber || '........'}</strong>। তিনি <strong>{formData.area || '........'}</strong> এলাকার ভোটার।
          </p>
          <p className="text-sm text-gray-500">
            যাচাইকারীর ইমেইল: {formData.email || '........'}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
          >
            যাচাই করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voter_verification;