import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Landless_certificate = () => {
    const [formData, setFormData] = useState({
        applicantName: '',
        fatherHusbandName: '',
        motherName: '',
        gender: 'পুরুষ',
        dateOfBirth: '',
        nidOrBrn: '',
        mobileNumber: '',
        profession: '',
        yearlyIncome: '',
        familyMembers: '',
        village: '',
        ward: '',
        postCode: '',
        currentAddress: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // সফল সাবমিশন অ্যালার্ট
        Swal.fire({
            icon: 'success',
            title: 'ভূমিহীন সনদের আবেদনটি সফলভাবে জমা হয়েছে!',
            text: 'আপনার ইউনিয়ন/পৌর এলাকার দায়িত্বপ্রাপ্ত ভূমি উপ-সহকারী কর্মকর্তা (নায়েব) এবং চেয়ারম্যান মহোদয়ের যৌথ তদন্তের পর সনদটি প্রদান করা হবে।',
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#000F9F'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                
                {/* ফর্ম হেডার */}
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৭ (গ)</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">ভূমিহীন সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">আবেদনকারী এবং তার পরিবারের কোনো সদস্যের নামে কোনো নিজস্ব আবাদি বা বসতভিটা জমি না থাকার প্রত্যয়ন ফর্ম।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    
                    {/* সেকশন ১: আবেদনকারীর ব্যক্তিগত বিবরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>👤</span> আবেদনকারীর ব্যক্তিগত বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="জাতীয় পরিচয়পত্র অনুযায়ী" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতা বা স্বামীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মাতার নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" />
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর <span className="text-red-500">*</span></label>
                                <input required type="number" name="nidOrBrn" value={formData.nidOrBrn} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="NID অথবা BRN নম্বর" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ২: আর্থ-সামাজিক অবস্থা */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🌾</span> পেশা ও অর্থনৈতিক বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">বর্তমান পেশা <span className="text-red-500">*</span></label>
                                <input required type="text" name="profession" value={formData.profession} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: দিনমজুর / রিকশাচালক" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পরিবারের বার্ষিক আয় (টাকা) <span className="text-red-500">*</span></label>
                                <input required type="number" name="yearlyIncome" value={formData.yearlyIncome} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: ৮৪০০০" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পরিবারের সদস্য সংখ্যা <span className="text-red-500">*</span></label>
                                <input required type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="মোট সংখ্যা" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ৩: স্থায়ী ও বর্তমান ঠিকানা */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📍</span> ঠিকানার বিবরণ (যেখানে ভূমিহীন হিসেবে স্থায়ী বসবাস)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহл্লা/আশ্রয়ণ প্রকল্প <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="গ্রাম বা প্রকল্পের নাম" />
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
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">বর্তমান বাসস্থান/ঠিকানার সংক্ষিপ্ত বিবরণ</label>
                            <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} rows="2" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F] resize-none" placeholder="বর্তমানে যেখানে বসবাস করছেন (উদা: ভাড়া বাসা বা খাস জমিতে অস্থায়ী চালা)..."></textarea>
                        </div>
                    </div>

                    {/* সেকশন ৪: প্রয়োজনীয় ফাইল আপলোড */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📎</span> প্রয়োজনীয় ডকুমেন্ট সংযুক্তি (PDF/Image, সর্বোচ্চ 2MB)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">আবেদনকারীর জাতীয় পরিচয়পত্র (NID)</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">অথবা অনলাইন জন্ম নিবন্ধন কপি</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" className="text-xs max-w-[170px]" />
                            </div>

                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">ওয়ার্ড মেম্বার/কাউন্সিলরের প্রত্যয়নপত্র</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">ভূমিহীনতার সপক্ষে মেম্বারের সুপারিশপত্র</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" className="text-xs max-w-[170px]" />
                            </div>
                        </div>
                    </div>

                    {/* শর্তাবলী ও সাকেন্দ অঙ্গীকারনামা */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="landless-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="landless-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে হলফপূর্বক ঘোষণা করছি যে, আমার নিজের অথবা আমার উপর নির্ভরশীল পরিবারের কোনো সদস্যের নামে এই ইউনিয়ন/পৌরসভা বা বাংলাদেশের কোথাও কোনো আবাদি জমি বা বসতভিটা নেই। এই তথ্য মিথ্যা প্রমাণিত হলে আমি আইনগত যেকোনো শাস্তি ভোগ করতে বাধ্য থাকব।
                        </label>
                    </div>

                    {/* সাবমিট বাটন */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                            ভূমিহীন সনদের আবেদন জমা দিন
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Landless_certificate;