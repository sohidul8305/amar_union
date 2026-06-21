import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Guardian_consent = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    fatherName: '',        // নতুন
    relationship: '',
    consentFor: '',
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
    nid: '',               // নতুন
    mobile: '',            // নতুন
    email: '',
    issueDate: ''          // নতুন
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন - সব ফিল্ড চেক
    const required = ['studentName', 'guardianName', 'fatherName', 'relationship', 'consentFor', 'village', 'postOffice', 'upazila', 'district', 'nid', 'mobile', 'email', 'issueDate'];
    const missing = required.filter(f => !formData[f]);
    if (missing.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'তথ্য অসম্পূর্ণ!',
        text: 'দয়া করে সব তথ্য পূরণ করুন।',
        confirmButtonColor: '#000F9F'
      });
      return;
    }

    // কনফার্মেশন ডায়ালগ
    const confirmResult = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'আপনার অভিভাবকের সম্মতিপত্রের আবেদন জমা দিতে চান?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000F9F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'হ্যাঁ, জমা দিন',
      cancelButtonText: 'বাতিল'
    });
    if (!confirmResult.isConfirmed) return;

    Swal.fire({
      title: 'আবেদন জমা হচ্ছে...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const submissionData = {
      ...formData,
      submittedAt: new Date(),
      status: 'Pending'
    };

    try {
      const response = await fetch('https://amar-union-backend.vercel.app/api/guardian-consent-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'আবেদন সফলভাবে গৃহীত হয়েছে!',
          text: `আপনার ট্র্যাকিং আইডি: ${data.certificateId}`,
          confirmButtonColor: '#000F9F'
        });
        setSubmitted(true);
        setFormData({
          studentName: '',
          guardianName: '',
          fatherName: '',
          relationship: '',
          consentFor: '',
          village: '',
          postOffice: '',
          upazila: '',
          district: '',
          nid: '',
          mobile: '',
          email: '',
          issueDate: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(data.message || 'সাবমিট ব্যর্থ');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'দুঃখিত!',
        text: 'সার্ভার বা নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।',
        confirmButtonColor: '#000F9F'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-2xl rounded-lg border-t-8 border-blue-600">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 uppercase">অভিভাবকের সম্মতিপত্র ফরম</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
            {/* শিক্ষার্থীর নাম, অভিভাবকের নাম, পিতা, সম্পর্ক */}
            <input type="text" name="studentName" placeholder="শিক্ষার্থীর নাম" value={formData.studentName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="guardianName" placeholder="অভিভাবকের নাম" value={formData.guardianName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="fatherName" placeholder="পিতার নাম" value={formData.fatherName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="relationship" placeholder="অভিভাবকের সাথে সম্পর্ক" value={formData.relationship} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            
            {/* সম্মতির বিষয় */}
            <input type="text" name="consentFor" placeholder="সম্মতির বিষয় (যেমন: শিক্ষাসফর/পরীক্ষা)" value={formData.consentFor} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
            
            {/* ঠিকানা - গ্রাম, ডাকঘর, উপজেলা, জেলা */}
            <input type="text" name="village" placeholder="গ্রাম/মহল্লা" value={formData.village} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="postOffice" placeholder="ডাকঘর" value={formData.postOffice} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="upazila" placeholder="উপজেলা" value={formData.upazila} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="district" placeholder="জেলা" value={formData.district} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            
            {/* এনআইডি, মোবাইল, ইমেইল, ইস্যুর তারিখ */}
            <input type="text" name="nid" placeholder="এনআইডি (NID) নম্বর" value={formData.nid} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" value={formData.mobile} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="email" name="email" placeholder="ইমেইল ঠিকানা" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
          </div>

          {/* Certificate Preview - সম্পূর্ণ আপডেট */}
          <div className="text-gray-700 space-y-4 border-t pt-8">
            <p className="text-base sm:text-lg">
              আমি <strong>{formData.guardianName || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong>, <strong>{formData.studentName || '........'}</strong> এর <strong>{formData.relationship || '........'}</strong> হিসেবে ঘোষণা করছি যে, <strong>{formData.consentFor || '........'}</strong> এর জন্য আমার পূর্ণ সম্মতি রয়েছে।
            </p>
            <p className="text-base sm:text-lg">
              ঠিকানা: গ্রাম- <strong>{formData.village || '........'}</strong>, ডাকঘর- <strong>{formData.postOffice || '........'}</strong>, উপজেলা- <strong>{formData.upazila || '........'}</strong>, জেলা- <strong>{formData.district || '........'}</strong>।
            </p>
            <p className="text-base sm:text-lg">এনআইডি নম্বর: <strong>{formData.nid || '........'}</strong></p>
            <p className="text-base sm:text-lg">মোবাইল: <strong>{formData.mobile || '........'}</strong></p>
            <p className="text-base sm:text-lg">ইমেইল: <strong>{formData.email || '........'}</strong></p>
            <p className="text-base sm:text-lg">জন্ম তারিখ: <strong>{formData.issueDate ? new Date(formData.issueDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : '........'}</strong></p>
          </div>

          {/* Buttons */}
          <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition text-sm sm:text-base">
              আবেদন জমা দিন
            </button>
            <button 
              type="button"
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition text-sm sm:text-base"
            >
              সম্মতিপত্র প্রিন্ট করুন
            </button>
          </div>
          {submitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center text-sm sm:text-base">
              ✅ আপনার আবেদন সফলভাবে জমা হয়েছে!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Guardian_consent;