import React, { useState } from 'react';
import Swal from 'sweetalert2';

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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!formData.name || !formData.fatherName || !formData.motherName || 
        !formData.dob || !formData.birthRegNo || !formData.address || 
        !formData.mobile || !formData.email) {
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
      text: 'আপনার নতুন ভোটার সুপারিশের আবেদন জমা দিতে চান?',
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
      const response = await fetch('http://localhost:5000/api/new-voter-certificate', {
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
          motherName: '',
          dob: '',
          birthRegNo: '',
          address: '',
          mobile: '',
          email: ''
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">নতুন ভোটার সুপারিশ ফরম</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input type="text" name="name" placeholder="পুরো নাম" value={formData.name} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="fatherName" placeholder="পিতার নাম" value={formData.fatherName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="motherName" placeholder="মাতার নাম" value={formData.motherName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="birthRegNo" placeholder="জন্ম নিবন্ধন নম্বর" value={formData.birthRegNo} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" required />
            <input type="text" name="address" placeholder="বর্তমান ঠিকানা" value={formData.address} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" required />
            <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" value={formData.mobile} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="email" name="email" placeholder="ইমেইল ঠিকানা" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>

          {/* Certificate Preview */}
          <div className="text-gray-700 space-y-4 border-t pt-8">
            <p className="text-lg">
              এই মর্মে সুপারিশ করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong> এবং মাতা: <strong>{formData.motherName || '........'}</strong>, অত্র এলাকার একজন স্থায়ী বাসিন্দা। তার জন্ম তারিখ: <strong>{formData.dob || '........'}</strong> এবং জন্ম নিবন্ধন নম্বর: <strong>{formData.birthRegNo || '........'}</strong>।
            </p>
            <p className="text-lg">তিনি একজন নতুন ভোটার হিসেবে নিবন্ধিত হতে ইচ্ছুক। আমি তার ভোটার হওয়ার সুপারিশ করছি।</p>
            <p className="text-sm text-gray-500">মোবাইল: {formData.mobile || '........'} | ইমেইল: {formData.email || '........'}</p>
          </div>

          {/* Buttons */}
          <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition">
              আবেদন জমা দিন
            </button>
            <button 
              type="button"
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
            >
              আবেদনপত্র প্রিন্ট করুন
            </button>
          </div>
          {submitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              ✅ আপনার আবেদন সফলভাবে জমা হয়েছে!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default New_voter;