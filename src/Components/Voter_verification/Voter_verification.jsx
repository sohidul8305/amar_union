import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Voter_verification = () => {
  const [formData, setFormData] = useState({
    name: '',
    nidNumber: '',
    voterNumber: '',
    area: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!formData.name || !formData.nidNumber || !formData.voterNumber || 
        !formData.area || !formData.email) {
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
      text: 'আপনার ভোটার যাচাইকরণের আবেদন জমা দিতে চান?',
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
      const response = await fetch('http://localhost:5000/api/voter-verification-certificate', {
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
          nidNumber: '',
          voterNumber: '',
          area: '',
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">ভোটার যাচাইকরণ ফরম</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input type="text" name="name" placeholder="ভোটারের নাম" value={formData.name} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="nidNumber" placeholder="এনআইডি (NID) নম্বর" value={formData.nidNumber} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="voterNumber" placeholder="ভোটার নম্বর" value={formData.voterNumber} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="area" placeholder="এলাকা/ওয়ার্ড নম্বর" value={formData.area} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="email" name="email" placeholder="ইমেইল ঠিকানা" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" required />
          </div>

          {/* Certificate/Result Preview */}
          <div className="text-gray-700 space-y-4 border-t pt-8">
            <p className="text-lg">
              এই মর্মে যাচাই করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong> অত্র এলাকার ভোটার তালিকার একজন অন্তর্ভুক্ত ব্যক্তি। 
            </p>
            <p className="text-lg">
              তার এনআইডি নম্বর: <strong>{formData.nidNumber || '........'}</strong> এবং ভোটার নম্বর: <strong>{formData.voterNumber || '........'}</strong>। তিনি <strong>{formData.area || '........'}</strong> এলাকার ভোটার।
            </p>
            <p className="text-sm text-gray-500">যাচাইকারীর ইমেইল: {formData.email || '........'}</p>
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
              যাচাইকরণ ফলাফল প্রিন্ট করুন
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

export default Voter_verification;