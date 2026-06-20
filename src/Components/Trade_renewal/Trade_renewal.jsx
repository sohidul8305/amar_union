import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Premises = () => {
    const [formData, setFormData] = useState({
        // আবেদনকারীর ব্যক্তিগত তথ্য
        applicantName: '',
        fatherHusbandName: '',
        nid: '',
        mobile: '',
        email: '',
        // নতুন ফিল্ড: ইস্যুর তারিখ
        issueDate: '',
        // প্রতিষ্ঠানের তথ্য
        establishmentName: '',
        establishmentType: 'বাণিজ্যিক দোকান / শোরুম',
        spaceArea: '',
        // ঠিকানা
        village: '',
        postOffice: '',      // নতুন: ডাকঘর
        upazila: '',         // নতুন: উপজেলা
        district: '',        // নতুন: জেলা
        ward: '',
        holdingNo: '',
        postCode: '',
        tradeLicenseNo: '',
        // ফাইল
        rentDeed: null,
        nidCopy: null,
        fireSafetyDoc: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "প্রাঙ্গণ লাইসেন্সের জন্য আপনার দেওয়া তথ্যগুলো সঠিক আছে তো?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#000F9F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, সাবমিট করুন!',
            cancelButtonText: 'বাতিল'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'আবেদন প্রসেস হচ্ছে...',
                    text: 'অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });

                try {
                    const submissionData = {
                        ...formData,
                        rentDeed: formData.rentDeed ? formData.rentDeed.name : null,
                        nidCopy: formData.nidCopy ? formData.nidCopy.name : null,
                        fireSafetyDoc: formData.fireSafetyDoc ? formData.fireSafetyDoc.name : null,
                    };

                    const response = await fetch('http://localhost:5000/api/premises', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(submissionData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'প্রিমিসেস লাইসেন্স আবেদন সফল!',
                            text: `আপনার প্রাঙ্গণ আইডি: ${data.premisesId}। ভেরিফিকেশনের পর ইউনিয়ন পরিষদ থেকে পরবর্তী সিদ্ধান্ত জানিয়ে দেওয়া হবে।`,
                            confirmButtonText: 'ঠিক আছে',
                            confirmButtonColor: '#000F9F'
                        });

                        // ফর্ম রিসেট
                        setFormData({
                            applicantName: '',
                            fatherHusbandName: '',
                            nid: '',
                            mobile: '',
                            email: '',
                            issueDate: '',
                            establishmentName: '',
                            establishmentType: 'বাণিজ্যিক দোকান / শোরুম',
                            spaceArea: '',
                            village: '',
                            postOffice: '',
                            upazila: '',
                            district: '',
                            ward: '',
                            holdingNo: '',
                            postCode: '',
                            tradeLicenseNo: '',
                            rentDeed: null,
                            nidCopy: null,
                            fireSafetyDoc: null
                        });
                        document.getElementById('agree').checked = false;
                    } else {
                        throw new Error('Submission Failed');
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'দুঃখিত!',
                        text: 'সার্ভার ত্রুটির কারণে আবেদনটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।',
                        confirmButtonText: 'ঠিক আছে',
                        confirmButtonColor: '#000F9F'
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                {/* হেডার */}
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৯ (ক)</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">প্রিমিসেস (প্রাঙ্গণ) লাইসেন্স আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">ব্যবসা বা ফ্যাক্টরি প্রাঙ্গণ বৈধকরণের জন্য নিচের তথ্যগুলো সঠিকভাবে প্রদান করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* সেকশন ১: আবেদনকারীর বিবরণ (নতুন ফিল্ডসহ) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>👤</span> আবেদনকারীর ব্যক্তিগত বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতা/স্বামীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID) <span className="text-red-500">*</span></label>
                                <input required type="number" name="nid" value={formData.nid} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা <span className="text-red-500">*</span></label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জন্ম তারিখ (দিন/মাস/বছর)</label>
                                <input type="text" name="issueDate" value={formData.issueDate} onChange={handleChange} placeholder="যেমন: ২০/৬/২০২৬" className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ২: প্রাঙ্গণ ও প্রতিষ্ঠানের বিবরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🏢</span> প্রাঙ্গণ ও প্রতিষ্ঠানের বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">প্রতিষ্ঠানের নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="establishmentName" value={formData.establishmentName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">প্রাঙ্গণের ধরন <span className="text-red-500">*</span></label>
                                <select name="establishmentType" value={formData.establishmentType} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm bg-white">
                                    <option>বাণিজ্যিক দোকান / শোরুম</option>
                                    <option>কারখানা / ম্যানুফ্যাকচারিং প্ল্যান্ট</option>
                                    <option>গুদামঘর / ওয়ারহাউজ</option>
                                    <option>হোটেল / রেস্টুরেন্ট প্রাঙ্গণ</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ট্রেড লাইসেন্স নম্বর (যদি থাকে)</label>
                                <input type="text" name="tradeLicenseNo" value={formData.tradeLicenseNo} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মোট আয়তন (বর্গফুট) <span className="text-red-500">*</span></label>
                                <input required type="number" name="spaceArea" value={formData.spaceArea} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ৩: প্রাঙ্গণের সঠিক ঠিকানা (নতুন ফিল্ডসহ) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📍</span> প্রাঙ্গণের সঠিক অবস্থান / ঠিকানা
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ডাকঘর</label>
                                <input type="text" name="postOffice" value={formData.postOffice} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">উপজেলা</label>
                                <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জেলা</label>
                                <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" name="ward" value={formData.ward} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">হোল্ডিং নং <span className="text-red-500">*</span></label>
                                <input required type="text" name="holdingNo" value={formData.holdingNo} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label>
                                <input required type="number" name="postCode" value={formData.postCode} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* ফাইল আপলোড */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📎</span> প্রয়োজনীয় সংযুক্তিসমূহ (সর্বোচ্চ 2MB)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">📜</span>
                                    <p className="text-xs font-bold text-gray-700">ভাড়া চুক্তি / মালিকানার দলিল <span className="text-red-500">*</span></p>
                                    <input required type="file" name="rentDeed" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400 truncate">{formData.rentDeed ? formData.rentDeed.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">🪪</span>
                                    <p className="text-xs font-bold text-gray-700">আবেদনকারীর NID কপি <span className="text-red-500">*</span></p>
                                    <input required type="file" name="nidCopy" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400 truncate">{formData.nidCopy ? formData.nidCopy.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">🧯</span>
                                    <p className="text-xs font-bold text-gray-700">ফায়ার সার্ভিস ছাড়পত্র (যদি থাকে)</p>
                                    <input type="file" name="fireSafetyDoc" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400 truncate">{formData.fireSafetyDoc ? formData.fireSafetyDoc.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* অঙ্গীকার */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="agree" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="agree" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি ঘোষণা করছি যে, উক্ত প্রাঙ্গণে কোনো অবৈধ বা পরিবেশের জন্য ক্ষতিকর ব্যবসা পরিচালনা করা হবে না এবং ইউনিয়ন পরিষদের সকল নিয়ম কানুন মেনে চলা হবে।
                        </label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                            লাইসেন্সের আবেদন জানাচ্ছি
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Premises;