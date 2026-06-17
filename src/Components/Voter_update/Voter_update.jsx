import React, { useState } from 'react';

const Voter_update = () => {
  const [formData, setFormData] = useState({
    name: '',
    nidNumber: '',
    updateField: '', // কি সংশোধন করতে চান
    oldInfo: '', // ভুল তথ্য
    newInfo: '', // সঠিক তথ্য
    email: '',
    mobile: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">ভোটার তথ্য সংশোধন আবেদন</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="text" name="name" placeholder="ভোটারের নাম" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="nidNumber" placeholder="এনআইডি (NID) নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="updateField" placeholder="কী সংশোধন করতে চান (যেমন: নাম, ঠিকানা)" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" />
          <input type="text" name="oldInfo" placeholder="ভুল তথ্য" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="text" name="newInfo" placeholder="সঠিক তথ্য" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
          <input type="email" name="email" placeholder="ইমেইল ঠিকানা" onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" />
        </div>

        {/* Certificate Display Area */}
        <div className="text-gray-700 space-y-4 border-t pt-8">
          <p className="text-lg">
            আমি <strong>{formData.name || '........'}</strong>, এনআইডি নম্বর: <strong>{formData.nidNumber || '........'}</strong>, অত্র আবেদনের মাধ্যমে আমার তথ্যে বিদ্যমান ভুল সংশোধনের অনুরোধ জানাচ্ছি।
          </p>
          <p className="text-lg">
            সংশোধনের বিষয়: <strong>{formData.updateField || '........'}</strong>। ভুল তথ্যটি ছিল: <strong>{formData.oldInfo || '........'}</strong> এবং সঠিক তথ্যটি হবে: <strong>{formData.newInfo || '........'}</strong>।
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

export default Voter_update;