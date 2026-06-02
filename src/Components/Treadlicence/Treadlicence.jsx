import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Treadlicence = () => {
    const [formData, setFormData] = useState({
        institutionName: '',
        ownerName: '',
        ownerType: 'পাবলিক লিমিটেড',
        businessType: '',
        capital: '',
        nid: '',
        mobile: '',
        email: '',
        village: '',
        ward: '',
        holdingNo: '',
        postCode: '',
        tinCertificate: null,
        nidCopy: null,
        holdingTax: null
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
        
        // ফর্ম সাবমিট অ্যালার্ট (আপনার ব্যাকএন্ড এপিআই এখানে যুক্ত হবে)
        Swal.fire({
            icon: 'success',
            title: 'আবেদনটি সফলভাবে জমা হয়েছে!',
            text: 'আপনার আবেদন আইডিটি সংরক্ষণ করুন। খুব শীঘ্রই আপনার মোবাইল নম্বরে এসএমএস এর মাধ্যমে পরবর্তী আপডেট জানানো হবে।',
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#000F9F'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                
                {/* ফর্ম হেডার */}
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৭</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">নতুন ট্রেড লাইসেন্স এর জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">অনুগ্রহ করে নিচের তথ্যগুলো সঠিকভাবে বাংলায় পূরণ করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    
                    {/* সেকশন ১: প্রতিষ্ঠানের সাধারণ বিবরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🏢</span> প্রতিষ্ঠানের সাধারণ বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ব্যবসা/প্রতিষ্ঠানের নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="উদা: রহমান ট্রেডার্স" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মালিকানার ধরন <span className="text-red-500">*</span></label>
                                <select name="ownerType" value={formData.ownerType} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm bg-white transition-all">
                                    <option>একক মালিকানা (Sole Proprietor)</option>
                                    <option>অংশীদারী ব্যবসা (Partnership)</option>
                                    <option>লিমিটেড কোম্পানি (Private/Public Ltd)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ব্যবসার ধরন/ক্যাটাগরি <span className="text-red-500">*</span></label>
                                <input required type="text" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="উদা: মুদি দোকান, ঔষধের দোকান, ইত্যাদি" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">আনুমানিক মূলধন (টাকা) <span className="text-red-500">*</span></label>
                                <input required type="number" name="capital" value={formData.capital} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="উদা: ৫০০০০০" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ২: মালিকের ব্যক্তিগত তথ্য */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>👤</span> মালিকের ব্যক্তিগত বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মালিকের নাম (পূর্ণ নাম) <span className="text-red-500">*</span></label>
                                <input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="উদা: মোঃ আব্দুর রহমান" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID) <span className="text-red-500">*</span></label>
                                <input required type="number" name="nid" value={formData.nid} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="১০ বা ১৭ ডিজিটের এনআইডি দিন" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="উদা: 017XXXXXXXX" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] focus:border-transparent outline-none text-sm transition-all" placeholder="example@mail.com" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ৩: ব্যবসা প্রতিষ্ঠানের ঠিকানা */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📍</span> ব্যবসা প্রতিষ্ঠানের ঠিকানা (ইউনিয়নের আওতাধীন)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" name="ward" value={formData.ward} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">হোল্ডিং নং (যদি থাকে)</label>
                                <input type="text" name="holdingNo" value={formData.holdingNo} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label>
                                <input required type="number" name="postCode" value={formData.postCode} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ৪: প্রয়োজনীয় কাগজপত্র সংযুক্তিকরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📎</span> প্রয়োজনীয় কাগজপত্র আপলোড (PDF/Image, সর্বোচ্চ 2MB)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50 hover:bg-blue-50/40 transition-colors">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">🪪</span>
                                    <p className="text-xs font-bold text-gray-700">মালিকের NID কপি <span className="text-red-500">*</span></p>
                                    <input required type="file" name="nidCopy" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400">{formData.nidCopy ? formData.nidCopy.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>

                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50 hover:bg-blue-50/40 transition-colors">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">📄</span>
                                    <p className="text-xs font-bold text-gray-700">হোল্ডিং ট্যাক্স রসিদ <span className="text-red-500">*</span></p>
                                    <input required type="file" name="holdingTax" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400">{formData.holdingTax ? formData.holdingTax.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>

                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50 hover:bg-blue-50/40 transition-colors">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">🧾</span>
                                    <p className="text-xs font-bold text-gray-700">TIN সার্টিফিকেট (যদি থাকে)</p>
                                    <input type="file" name="tinCertificate" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400">{formData.tinCertificate ? formData.tinCertificate.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* শর্তাবলী সম্মতি */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="terms" className="mt-1 h-4 w-4 text-[#000F9F] focus:ring-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে অঙ্গীকার করছি যে, উপরে বর্ণিত সব তথ্য সম্পূর্ণ সত্য ও সঠিক। কোনো তথ্য মিথ্যা বা ভুল প্রমাণিত হলে আমার আবেদন বাতিলসহ আইনি ব্যবস্থা গ্রহণ করা যাবে।
                        </label>
                    </div>

                    {/* সাবমিট বাটন */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                            আবেদন জমা দিন (Submit)
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Treadlicence;