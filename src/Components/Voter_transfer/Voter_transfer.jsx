import React, { useState } from 'react';

const Voter_transfer = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    currentAddress: '',
    newAddress: '',
    nidNumber: '',
    email: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">ভোটার আইডি স্থানান্তর আবেদন</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="name" placeholder="আপনার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="nidNumber" placeholder="জাতীয় পরিচয়পত্র নম্বর (NID)" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
          <input type="text" name="currentAddress" placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="newAddress" placeholder="যে ঠিকানায় স্থানান্তর করবেন" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="reason" placeholder="স্থানান্তরের কারণ" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
          <input type="email" name="email" placeholder="আপনার ইমেইল" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
        </div>

        {/* Certificate Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            আমি <strong>{formData.name || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong>, অত্র আবেদনপত্রের মাধ্যমে আমার ভোটার আইডি কার্ডটি <strong>{formData.currentAddress || '........'}</strong> থেকে <strong>{formData.newAddress || '........'}</strong> ঠিকানায় স্থানান্তর করার জন্য অনুরোধ জানাচ্ছি।
          </p>
          <p className="text-lg">
            আমার এনআইডি নম্বর: <strong>{formData.nidNumber || '........'}</strong>। স্থানান্তরের কারণ: <strong>{formData.reason || '........'}</strong>।
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
            আবেদনপত্র প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voter_transfer;