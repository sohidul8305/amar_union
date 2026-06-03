import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Death_certificate = () => {
    const [formData, setFormData] = useState({
        deceasedName: '',
        fatherName: '',
        motherName: '',
        spouseName: '',
        gender: 'পুরুষ',
        deathDate: '',
        deathReason: '',
        deathPlace: 'বাসস্থান',
        nidOrBrn: '',
        village: '',
        ward: '',
        postCode: '',
        applicantName: '',
        applicantRelation: '',
        applicantMobile: '',
        applicantNid: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "আবেদনটি সাবমিট করার পর তথ্য পরিবর্তন করা যাবে না!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000F9F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, সাবমিট করুন!',
            cancelButtonText: 'বাতিল করুন'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                Swal.fire({
                    title: 'প্রসেস করা হচ্ছে...',
                    text: 'অনুগ্রহ করে অপেক্ষা করুন।',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                try {
                    const response = await fetch('http://localhost:5000/api/death-certificate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'মৃত্যু সনদের আবেদনটি সফল হয়েছে!',
                            html: `আপনার আবেদনটি সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে। <br><br> <strong>আবেদন আইডি: <span style="color:#000F9F">${data.deathCertId}</span></strong><br>যাচাইকরণের পর মৃত্যু সনদটি প্রস্তুত করা হবে এবং আপনাকে এসএমএস-এর মাধ্যমে জানানো হবে।`,
                            confirmButtonText: 'ঠিক আছে',
                            confirmButtonColor: '#000F9F'
                        });

                        // Reset form
                        setFormData({
                            deceasedName: '',
                            fatherName: '',
                            motherName: '',
                            spouseName: '',
                            gender: 'পুরুষ',
                            deathDate: '',
                            deathReason: '',
                            deathPlace: 'বাসস্থান',
                            nidOrBrn: '',
                            village: '',
                            ward: '',
                            postCode: '',
                            applicantName: '',
                            applicantRelation: '',
                            applicantMobile: '',
                            applicantNid: ''
                        });
                        e.target.reset();
                    } else {
                        throw new Error(data.message || "সার্ভারে সমস্যা হয়েছে");
                    }

                } catch (error) {
                    console.error("Error submitting form:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'দুঃখিত!',
                        text: error.message || 'আবেদনটি সাবমিট করা যায়নি। ব্যাকএন্ড সার্ভার বা ডাটাবেজ কানেকশন চেক করুন।',
                        confirmButtonColor: '#d33'
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-২ (ক)</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">মৃত্যু সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">অনুগগ্রহ করে মৃত ব্যক্তির সঠিক তথ্য এবং অনলাইন জন্ম নিবন্ধন/এনআইডি অনুযায়ী ফর্মটি পূরণ করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* Deceased Person Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🕯️</span> মৃত ব্যক্তির বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মরহুম আবদুর রহমান" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতার নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মাতার নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">স্বামী/স্ত্রীর নাম (প্রযোজ্য ক্ষেত্রে)</label>
                                <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">লিঙ্গ <span className="text-red-500">*</span></label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#000F9F]">
                                    <option>পুরুষ</option>
                                    <option>মহিলা</option>
                                    <option>অন্যান্য</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির NID / জন্ম নিবন্ধন নম্বর <span className="text-red-500">*</span></label>
                                <input required type="number" name="nidOrBrn" value={formData.nidOrBrn} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="এনআইডি বা জন্ম নিবন্ধন নম্বর দিন" />
                            </div>
                        </div>
                    </div>

                    {/* Death Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📅</span> মৃত্যু সংক্রান্ত বিবরণ ও স্থান
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত্যুর তারিখ <span className="text-red-500">*</span></label>
                                <input required type="date" name="deathDate" value={formData.deathDate} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত্যুর কারণ <span className="text-red-500">*</span></label>
                                <input required type="text" name="deathReason" value={formData.deathReason} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: বার্ধক্যজনিত / হৃদরোগ" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত্যুর স্থান <span className="text-red-500">*</span></label>
                                <select name="deathPlace" value={formData.deathPlace} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#000F9F]">
                                    <option>বাসস্থান (নিজ বাড়ি)</option>
                                    <option>হাসপাতাল / ক্লিনিক</option>
                                    <option>অন্যান্য</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা/রাস্তা <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" name="ward" value={formData.ward} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label>
                                <input required type="number" name="postCode" value={formData.postCode} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                        </div>
                    </div>

                    {/* Applicant Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🙋‍♂️</span> আবেদনকারীর বিবরণ (যে ব্যক্তি আবেদন করছেন)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="আবেদনকারীর পূর্ণ নাম" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির সাথে সম্পর্ক <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantRelation" value={formData.applicantRelation} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: পুত্র / কন্যা / ভাই" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">যোগাযোগের মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                <input required type="tel" name="applicantMobile" value={formData.applicantMobile} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর NID নম্বর <span className="text-red-500">*</span></label>
                                <input required type="number" name="applicantNid" value={formData.applicantNid} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="death-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="death-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে অঙ্গীকার করছি যে, প্রদত্ত সকল বিবরণ সম্পূর্ণ সত্য ও নির্ভুল। যদি কোনো তথ্য অসত্য বা জালিয়াতি বলে প্রমাণিত হয়, তবে তার জন্য আমি আইনত দায়ী থাকব এবং কর্তৃপক্ষ আমার আবেদন বাতিল করতে পারবে।
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer disabled:opacity-50">
                            {loading ? 'সাবমিট হচ্ছে...' : 'মৃত্যু সনদের আবেদন সাবমিট করুন'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Death_certificate;