import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Voter_update = () => {
  const [formData, setFormData] = useState({
    name: '',
    nidNumber: '',
    updateField: '',
    oldInfo: '',
    newInfo: '',
    email: '',
    mobile: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!formData.name || !formData.nidNumber || !formData.updateField || 
        !formData.oldInfo || !formData.newInfo || !formData.email || !formData.mobile) {
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
      text: 'আপনার ভোটার তথ্য সংশোধনের আবেদন জমা দিতে চান?',
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
      const response = await fetch('http://localhost:5000/api/voter-update-certificate', {
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
          updateField: '',
          oldInfo: '',
          newInfo: '',
          email: '',
          mobile: ''
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">ভোটার তথ্য সংশোধন আবেদন</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input type="text" name="name" placeholder="ভোটারের নাম" value={formData.name} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="nidNumber" placeholder="এনআইডি (NID) নম্বর" value={formData.nidNumber} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="updateField" placeholder="কী সংশোধন করতে চান (যেমন: নাম, ঠিকানা)" value={formData.updateField} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2" required />
            <input type="text" name="oldInfo" placeholder="ভুল তথ্য" value={formData.oldInfo} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="text" name="newInfo" placeholder="সঠিক তথ্য" value={formData.newInfo} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" value={formData.mobile} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input type="email" name="email" placeholder="ইমেইল ঠিকানা" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>

          {/* Certificate Preview */}
          <div className="text-gray-700 space-y-4 border-t pt-8">
            <p className="text-lg">
              আমি <strong>{formData.name || '........'}</strong>, এনআইডি নম্বর: <strong>{formData.nidNumber || '........'}</strong>, অত্র আবেদনের মাধ্যমে আমার তথ্যে বিদ্যমান ভুল সংশোধনের অনুরোধ জানাচ্ছি।
            </p>
            <p className="text-lg">
              সংশোধনের বিষয়: <strong>{formData.updateField || '........'}</strong>। ভুল তথ্যটি ছিল: <strong>{formData.oldInfo || '........'}</strong> এবং সঠিক তথ্যটি হবে: <strong>{formData.newInfo || '........'}</strong>।
            </p>
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

export default Voter_update;