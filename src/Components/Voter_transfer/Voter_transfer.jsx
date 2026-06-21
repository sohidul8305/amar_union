import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Voter_transfer = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    village: '',           // নতুন (গ্রাম/মহল্লা)
    postOffice: '',        // নতুন (ডাকঘর)
    upazila: '',           // নতুন (উপজেলা)
    district: '',          // নতুন (জেলা)
    nidNumber: '',
    mobile: '',            // নতুন (মোবাইল)
    email: '',
    newAddress: '',
    reason: '',
    issueDate: ''          // নতুন (ইস্যুর তারিখ)
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন - সব ফিল্ড চেক
    const required = ['name', 'fatherName', 'village', 'postOffice', 'upazila', 'district', 'nidNumber', 'mobile', 'email', 'newAddress', 'reason', 'issueDate'];
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
      text: 'আপনার ভোটার আইডি স্থানান্তরের আবেদন জমা দিতে চান?',
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
      const response = await fetch('https://amar-union-backend.vercel.app/api/voter-transfer', {
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
          name: '',
          fatherName: '',
          village: '',
          postOffice: '',
          upazila: '',
          district: '',
          nidNumber: '',
          mobile: '',
          email: '',
          newAddress: '',
          reason: '',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 uppercase">ভোটার আইডি স্থানান্তর আবেদন</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
            {/* নাম ও পিতা */}
            <input type="text" name="name" placeholder="আপনার নাম" value={formData.name} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="fatherName" placeholder="পিতার নাম" value={formData.fatherName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            
            {/* গ্রাম, ডাকঘর, উপজেলা, জেলা (বর্তমান ঠিকানা) */}
            <input type="text" name="village" placeholder="গ্রাম/মহল্লা" value={formData.village} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="postOffice" placeholder="ডাকঘর" value={formData.postOffice} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="upazila" placeholder="উপজেলা" value={formData.upazila} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="district" placeholder="জেলা" value={formData.district} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            
            {/* এনআইডি, মোবাইল, ইমেইল */}
            <input type="text" name="nidNumber" placeholder="জাতীয় পরিচয়পত্র (NID)" value={formData.nidNumber} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" value={formData.mobile} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="email" name="email" placeholder="ইমেইল ঠিকানা" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
            
            {/* নতুন ঠিকানা, কারণ, ইস্যুর তারিখ */}
            <input type="text" name="newAddress" placeholder="যে ঠিকানায় স্থানান্তর করবেন" value={formData.newAddress} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
            <input type="text" name="reason" placeholder="স্থানান্তরের কারণ" value={formData.reason} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none sm:col-span-2" required />
          </div>

          {/* Certificate Preview - সম্পূর্ণ আপডেট */}
          <div className="text-gray-700 space-y-4 border-t pt-8">
            <p className="text-base sm:text-lg">
              আমি <strong>{formData.name || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong>, গ্রাম: <strong>{formData.village || '........'}</strong>, ডাকঘর: <strong>{formData.postOffice || '........'}</strong>, উপজেলা: <strong>{formData.upazila || '........'}</strong>, জেলা: <strong>{formData.district || '........'}</strong> অত্র আবেদনপত্রের মাধ্যমে আমার ভোটার আইডি কার্ডটি <strong>{formData.newAddress || '........'}</strong> ঠিকানায় স্থানান্তর করার জন্য অনুরোধ জানাচ্ছি।
            </p>
            <p className="text-base sm:text-lg">
              আমার এনআইডি নম্বর: <strong>{formData.nidNumber || '........'}</strong>, মোবাইল: <strong>{formData.mobile || '........'}</strong>। স্থানান্তরের কারণ: <strong>{formData.reason || '........'}</strong>।
            </p>
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
              আবেদনপত্র প্রিন্ট করুন
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

export default Voter_transfer;