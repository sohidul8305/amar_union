// src/pages/services/Trade_renewal.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaRupeeSign, FaClock, FaCheckCircle, FaRegListAlt, FaUpload, FaCreditCard, FaEnvelope } from 'react-icons/fa';

const Trade_renewal = () => {
  const [formData, setFormData] = useState({
    tradeLicenseNo: '',
    ownerName: '',
    mobile: '',
    email: '',
    renewalYear: new Date().getFullYear().toString()
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = (e) => {
  e.preventDefault();
  
  // বিদ্যমান ডাটাগুলো আনুন অথবা খালি অ্যারে নিন
  const existingApps = JSON.parse(localStorage.getItem('myApplications') || '[]');
  
  // নতুন আবেদনটি যোগ করুন
  const newApp = {
    id: Date.now(), // ইউনিক আইডি
    type: 'ট্রেড লাইসেন্স নবায়ন',
    status: 'পেন্ডিং',
    date: new Date().toISOString(),
    ...formData
  };

  existingApps.push(newApp);
  
  // লোকাল স্টোরেজে সেভ করুন
  localStorage.setItem('myApplications', JSON.stringify(existingApps));
  
  console.log('আবেদন সেভ হয়েছে:', newApp);
  setSubmitted(true);
  setTimeout(() => setSubmitted(false), 5000);
};
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 inline-block border-b-4 border-amber-500 pb-2">
            ট্রেড লাইসেন্স নবায়ন
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            আপনার ট্রেড লাইসেন্স নির্ধারিত সময়ের মধ্যে অনলাইনে নবায়ন করুন। নিচের ধাপগুলো অনুসরণ করুন।
          </p>
        </div>

        {/* তথ্য ও নির্দেশনা গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center gap-2 text-blue-800 border-b pb-2 mb-3">
              <FaRegListAlt className="text-xl" />
              <h2 className="text-lg font-bold">প্রয়োজনীয় ডকুমেন্ট</h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">✓ পুরাতন ট্রেড লাইসেন্সের কপি</li>
              <li className="flex items-start gap-2">✓ গত বছরের কর প্রদানের রশিদ</li>
              <li className="flex items-start gap-2">✓ ব্যবসায় প্রতিষ্ঠানের ছবি</li>
              <li className="flex items-start gap-2">✓ মালিকের জাতীয় পরিচয়পত্র</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center gap-2 text-green-700 border-b pb-2 mb-3">
              <FaRupeeSign className="text-xl" />
              <h2 className="text-lg font-bold">নবায়ন ফি কাঠামো</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>ছোট ব্যবসা (≤ ৫ লক্ষ)</span>
                <span className="font-semibold">৫০০ টাকা</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>মাঝারি ব্যবসা (৫-২৫ লক্ষ)</span>
                <span className="font-semibold">১,৫০০ টাকা</span>
              </div>
              <div className="flex justify-between border-b pb-1">
<span>{"বড় ব্যবসা (> ২৫ লক্ষ)"}</span>                <span className="font-semibold">৩,০০০ টাকা</span>
              </div>
            </div>
          </div>
        </div>

        {/* অনলাইন আবেদন ফরম */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 text-blue-800 border-b pb-2 mb-5">
            <FaFileAlt className="text-xl" />
            <h2 className="text-lg font-bold">অনলাইন নবায়ন আবেদন ফরম</h2>
          </div>
          {submitted ? (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded flex items-center gap-2">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span>আপনার আবেদন সফলভাবে জমা হয়েছে। রেফারেন্স আইডি আপনার মোবাইলে ও ইমেইলে পাঠানো হবে।</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">ট্রেড লাইসেন্স নম্বর *</label>
                  <input type="text" name="tradeLicenseNo" value={formData.tradeLicenseNo} onChange={handleChange} placeholder="যেমন: ১২৩/২০২৪" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">মালিকের নাম *</label>
                  <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400"><FaEnvelope /></span>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">নবায়নের বছর *</label>
                  <select name="renewalYear" value={formData.renewalYear} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="2025">২০২৫</option>
                    <option value="2026">২০২৬</option>
                    <option value="2027">২০২৭</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUpload className="text-blue-500" /> ডকুমেন্ট আপলোড (ঐচ্ছিক)
                </p>
                <input type="file" className="text-sm w-full mt-2 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCreditCard />
                  <span>পরিশোধযোগ্য ফি: <strong className="text-red-600">১,৫০০ টাকা</strong></span>
                </div>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
                  আবেদন জমা দিন
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade_renewal;