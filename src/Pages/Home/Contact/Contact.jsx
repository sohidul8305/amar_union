import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [contact, setContact] = useState({
    addressLine1: '১নং মডেল ইউনিয়ন পরিষদ কমপ্লেক্স',
    addressLine2: 'ঢাকা, বাংলাদেশ',
    phone1: '+৮৮০ ১৭০০-XXXXXX (সচিব)',
    phone2: 'জাতীয় সেবা নং: ৩৩৩, ৯৯৯',
    email: 'info@yourunionup.gov.bd',
    mapEmbedUrl: '',
    facebook: '#',
    twitter: '#',
    youtube: '#'
  });
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get('/api/contact-info');
        if (res.data && Object.keys(res.data).length) {
          setContact(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('কন্টাক্ট তথ্য লোড ব্যর্থ:', err);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('/api/contact-message', formData);
    alert(`ধন্যবাদ ${formData.name}! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    alert('বার্তা পাঠাতে ব্যর্থ। পরে আবার চেষ্টা করুন।');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* হেডার সেকশন */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* বাম পাশে ঠিকানা, ফোন, ইমেইল, ম্যাপ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100/80 space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
                কার্যালয়ের ঠিকানা
              </h3>
              <div className="flex items-start gap-4">
                <span className="text-2xl p-2.5 bg-green-50 text-green-600 rounded-2xl">📍</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">পরিষদ ভবন</h4>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">{contact.addressLine1}</p>
                  <p className="text-xs text-gray-500">{contact.addressLine2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl p-2.5 bg-blue-50 text-blue-600 rounded-2xl">📞</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">জরুরি হটলাইন ও তথ্য কেন্দ্র</h4>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">{contact.phone1}</p>
                  <p className="text-xs text-blue-600 font-medium">{contact.phone2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl p-2.5 bg-purple-50 text-purple-600 rounded-2xl">✉️</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase">ইমেইল করুন</h4>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">{contact.email}</p>
                  <p className="text-xs text-gray-500">যেকোনো দাপ্তরিক নোটিশের জন্য</p>
                </div>
              </div>
            </div>

            {/* ম্যাপ দেখানো (যদি এম্বেড URL থাকে) */}
            {contact.mapEmbedUrl && (
              <div className="bg-gray-200 rounded-3xl h-64 shadow-lg overflow-hidden border-4 border-white relative group">
                <iframe
                  src={contact.mapEmbedUrl}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Union Map"
                ></iframe>
              </div>
            )}
          </div>

          {/* ডান পাশে ফর্ম */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100/80">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">ডিজিটাল অভিযোগ ও মতামত বক্স</h2>
              <p className="text-xs text-gray-400 mt-1">আপনার যেকোনো অভিযোগ বা পরামর্শ সরাসরি কর্তৃপক্ষের কাছে গোপনীয়ভাবে পৌঁছে যাবে।</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">আপনার নাম <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">ইমেইল / মোবাইল <span className="text-red-500">*</span></label>
                  <input type="text" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">বিষয় <span className="text-red-500">*</span></label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">বার্তা <span className="text-red-500">*</span></label>
                <textarea name="message" required rows="4" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm resize-none focus:outline-none focus:border-green-500 transition-all"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                <span>🚀</span> বার্তা পাঠান
              </button>
            </form>
          </div>
        </div>

        {/* সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক) - যদি থাকে */}
        {(contact.facebook !== '#' || contact.twitter !== '#' || contact.youtube !== '#') && (
          <div className="mt-12 text-center">
            <h3 className="text-sm font-bold text-gray-600">সামাজিক মাধ্যমে যুক্ত থাকুন</h3>
            <div className="flex justify-center gap-6 mt-3">
              {contact.facebook && contact.facebook !== '#' && (
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-2xl hover:scale-110 transition">📘 ফেসবুক</a>
              )}
              {contact.twitter && contact.twitter !== '#' && (
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 text-2xl hover:scale-110 transition">🐦 টুইটার</a>
              )}
              {contact.youtube && contact.youtube !== '#' && (
                <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 text-2xl hover:scale-110 transition">📺 ইউটিউব</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;