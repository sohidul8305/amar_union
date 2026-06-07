import React, { useState } from 'react';

const Contact = () => {
  // Form State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // আপনার ব্যাকএন্ড API বা ইমেইল সার্ভিস ইন্টিগ্রেশন এখানে হবে
    alert(`ধন্যবাদ ${formData.name}! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full shadow-xs">
            যোগাযোগ ও নাগরিক সহায়তা
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
            ইউনিয়ন পরিষদের কোনো সেবা সংক্রান্ত জিজ্ঞাসা, মতামত অথবা যেকোনো অভিযোগ সরাসরি চেয়ারম্যান বা সচিব বরাবর পাঠাতে নিচের মাধ্যমগুলো ব্যবহার করুন।
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Split Layout Grid */}
        {/* Mobile: 1 col, Tablet: 1 col, Desktop: 12-column grid system */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Contact Info & Map (Takes 5 columns on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards Row */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100/80 space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
                কার্যালয়ের ঠিকানা
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="text-2xl p-2.5 bg-green-50 text-green-600 rounded-2xl">📍</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">পরিষদ ভবন</h4>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">১নং মডেল ইউনিয়ন পরিষদ কমপ্লেক্স</p>
                  <p className="text-xs text-gray-500">ঢাকা, বাংলাদেশ</p>
                </div>
              </div>

              {/* Phone / Hotlines */}
              <div className="flex items-start gap-4">
                <span className="text-2xl p-2.5 bg-blue-50 text-blue-600 rounded-2xl">📞</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">জরুরি হটলাইন ও তথ্য কেন্দ্র</h4>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">+৮৮০ ১৭০০-XXXXXX (সচিব)</p>
                  <p className="text-xs text-blue-600 font-medium">জাতীয় সেবা নং: ৩৩৩, ৯৯৯</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="text-2xl p-2.5 bg-purple-50 text-purple-600 rounded-2xl">✉️</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">ইমেইল করুন</h4>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">info@yourunionup.gov.bd</p>
                  <p className="text-xs text-gray-500">যেকোনো দাপ্তরিক নোটিশের জন্য</p>
                </div>
              </div>
            </div>

            {/* Google Map Mock/Placeholder Box */}
            <div className="bg-gray-200 rounded-3xl h-64 shadow-lg overflow-hidden border-4 border-white relative group">
              {/* আপনি চাইলে এখানে সরাসরি <iframe> ম্যাপ কোড ঢুকিয়ে দিতে পারেন */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" 
                alt="Map placeholder" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white/95 backdrop-blur-md hover:bg-green-600 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md text-gray-800 transition-all duration-300"
                >
                  🗺️ গুগল ম্যাপে দেখুন
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact/Complaint Form (Takes 7 columns on desktop) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100/80">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">ডিজিটাল অভিযোগ ও মতামত বক্স</h2>
              <p className="text-xs text-gray-400 mt-1">আপনার যেকোনো অভিযোগ বা পরামর্শ সরাসরি কর্তৃপক্ষের কাছে গোপনীয়ভাবে পৌঁছে যাবে।</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email Group - Desktop-এ পাশাপাশি, মোবাইলে ওপর-নিচ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="নাম লিখুন"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    ইমেইল / মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    required
                    placeholder="যোগাযোগের মাধ্যম দিন"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-800"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  বিষয় <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="বার্তার মূল বিষয়"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-800"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  বিস্তারিত বার্তা বা অভিযোগ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="আপনার বক্তব্য পরিষ্কারভাবে এখানে লিখুন..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-800 resize-none"
                />
              </div>

              {/* Submit Button with Custom Click Scale Effect */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-600/20 hover:shadow-xl hover:from-green-700 hover:to-emerald-700 active:scale-[0.99] transition-all duration-150 text-sm flex items-center justify-center gap-2"
              >
                <span>🚀</span> বার্তা পাঠান
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;