import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Character_certificate = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
    nid: '',            // নতুন
    mobile: '',         // নতুন
    email: '',
    issueDate: ''       // নতুন
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // কনফার্মেশন ডায়ালগ
    const confirmResult = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'আপনার চারিত্রিক সনদের আবেদন জমা দিতে চান?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000F9F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'হ্যাঁ, জমা দিন',
      cancelButtonText: 'বাতিল'
    });
    if (!confirmResult.isConfirmed) return;

    // লোডিং শুরু
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
      const response = await fetch('http://localhost:5000/api/character-certificate', {
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">চারিত্রিক সনদপত্র ফরম</h1>

        {submitted ? (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
            ✅ আপনার আবেদন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <input type="text" name="name" placeholder="আপনার নাম" value={formData.name} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="fatherName" placeholder="পিতার নাম" value={formData.fatherName} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="village" placeholder="গ্রাম/মহল্লা" value={formData.village} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="postOffice" placeholder="ডাকঘর" value={formData.postOffice} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="upazila" placeholder="উপজেলা" value={formData.upazila} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="district" placeholder="জেলা" value={formData.district} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="number" name="nid" placeholder="জাতীয় পরিচয়পত্র (NID)" value={formData.nid} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="tel" name="mobile" placeholder="মোবাইল নম্বর" value={formData.mobile} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="email" name="email" placeholder="ইমেইল ঠিকানা" value={formData.email} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2" />
              <input type="date" name="issueDate" placeholder="ইস্যুর তারিখ" value={formData.issueDate} onChange={handleChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2" />
            </div>

            {/* Certificate Preview (আপডেটেড) */}
            <div className="text-gray-700 space-y-4 border-t pt-8">
              <p className="text-lg">
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, <strong>{formData.name || '........'}</strong>, পিতা: <strong>{formData.fatherName || '........'}</strong>, গ্রাম: <strong>{formData.village || '........'}</strong>, ডাকঘর: <strong>{formData.postOffice || '........'}</strong>, উপজেলা: <strong>{formData.upazila || '........'}</strong>, জেলা: <strong>{formData.district || '........'}</strong>।
              </p>
              <p className="text-lg">জাতীয় পরিচয়পত্র নং: <strong>{formData.nid || '........'}</strong></p>
              <p className="text-lg">মোবাইল: <strong>{formData.mobile || '........'}</strong></p>
              <p className="text-lg">ইমেইল: <strong>{formData.email || '........'}</strong></p>
              <p className="text-lg">ইস্যুর তারিখ: <strong>{formData.issueDate ? new Date(formData.issueDate).toLocaleDateString('bn-BD') : '........'}</strong></p>
              <p className="text-lg">আমি তাকে ব্যক্তিগতভাবে চিনি ও জানি। আমার জানামতে তিনি অত্র এলাকার একজন স্থায়ী বাসিন্দা। তার চরিত্র ও স্বভাব ভালো।</p>
            </div>

            <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition">
                আবেদন জমা দিন
              </button>
              <button 
                type="button"
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
              >
                সনদপত্র প্রিন্ট করুন
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Character_certificate;