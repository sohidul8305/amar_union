import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const TradeLicense = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        institutionName: '',
        ownerName: '',
        fatherName: '',                 // নতুন: পিতার নাম
        ownerType: 'একক মালিকানা (Sole Proprietor)',
        businessType: '',
        capital: '',
        nid: '',
        mobile: '',
        email: '',
        village: '',
        postOffice: '',                 // নতুন: ডাকঘর
        upazila: '',                    // নতুন: উপজেলা
        district: '',                   // নতুন: জেলা
        ward: '',
        holdingNo: '',
        postCode: '',
        issueDate: '',                  // নতুন: ইস্যুর তারিখ
        tinCertificate: null,
        nidCopy: null,
        holdingTax: null
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "আপনার দেওয়া তথ্যগুলো সঠিকভাবে যাচাই করে সাবমিট করুন।",
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
                    title: 'প্রসেসিং হচ্ছে...',
                    text: 'অনুগ্রহ করে অপেক্ষা করুন।',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });

                try {
                    // ব্যাকএন্ডে পাঠানোর জন্য ডেটা সাজানো
                    const submissionData = {
                        institutionName: formData.institutionName,
                        ownerName: formData.ownerName,
                        fatherName: formData.fatherName,           // নতুন
                        ownerType: formData.ownerType,
                        businessType: formData.businessType,
                        capital: formData.capital,
                        nid: formData.nid,
                        mobile: formData.mobile,
                        email: user?.email || formData.email || 'N/A',
                        village: formData.village,
                        postOffice: formData.postOffice,           // নতুন
                        upazila: formData.upazila,                 // নতুন
                        district: formData.district,               // নতুন
                        ward: formData.ward,
                        holdingNo: formData.holdingNo,
                        postCode: formData.postCode,
                        issueDate: formData.issueDate,             // নতুন
                        nidCopy: formData.nidCopy ? formData.nidCopy.name : null,
                        holdingTax: formData.holdingTax ? formData.holdingTax.name : null,
                        tinCertificate: formData.tinCertificate ? formData.tinCertificate.name : null,
                    };

                    const response = await fetch('http://localhost:5000/api/trade-license', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(submissionData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'আবেদনটি সফলভাবে জমা হয়েছে!',
                            text: `আপনার আবেদন আইডি: ${data.applicationId}। খুব শীঘ্রই আপনার মোবাইল নম্বরে পরবর্তী আপডেট জানানো হবে।`,
                            confirmButtonText: 'ঠিক আছে',
                            confirmButtonColor: '#000F9F'
                        });

                        // ফর্ম রিসেট
                        setFormData({
                            institutionName: '',
                            ownerName: '',
                            fatherName: '',
                            ownerType: 'একক মালিকানা (Sole Proprietor)',
                            businessType: '',
                            capital: '',
                            nid: '',
                            mobile: '',
                            email: '',
                            village: '',
                            postOffice: '',
                            upazila: '',
                            district: '',
                            ward: '',
                            holdingNo: '',
                            postCode: '',
                            issueDate: '',
                            tinCertificate: null,
                            nidCopy: null,
                            holdingTax: null
                        });
                        e.target.reset();
                    } else {
                        throw new Error(data.message || 'Submission failed');
                    }
                } catch (error) {
                    console.error("Submission Error: ", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'দুঃখিত!',
                        text: 'সার্ভার সমস্যার কারণে আবেদনটি জমা নেওয়া যায়নি। আবার চেষ্টা করুন।',
                        confirmButtonText: 'ঠিক আছে',
                        confirmButtonColor: '#000F9F'
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
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৭</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">নতুন ট্রেড লাইসেন্স এর জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">অনুগ্রহ করে নিচের তথ্যগুলো সঠিকভাবে বাংলায় পূরণ করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* প্রতিষ্ঠানের সাধারণ বিবরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">🏢 প্রতিষ্ঠানের সাধারণ বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ব্যবসা/প্রতিষ্ঠানের নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মালিকানার ধরন <span className="text-red-500">*</span></label>
                                <select name="ownerType" value={formData.ownerType} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm bg-white">
                                    <option>একক মালিকানা (Sole Proprietor)</option>
                                    <option>অংশীদারী ব্যবসা (Partnership)</option>
                                    <option>লিমিটেড কোম্পানি (Private/Public Ltd)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ব্যবসার ধরন/ক্যাটাগরি <span className="text-red-500">*</span></label>
                                <input required type="text" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">আনুমানিক মূলধন (টাকা) <span className="text-red-500">*</span></label>
                                <input required type="number" name="capital" value={formData.capital} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* মালিকের ব্যক্তিগত তথ্য (নতুন ফিল্ডসহ) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">👤 মালিকের ব্যক্তিগত বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মালিকের নাম (পূর্ণ নাম) <span className="text-red-500">*</span></label>
                                <input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতার নাম</label>
                                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID) <span className="text-red-500">*</span></label>
                                <input required type="number" name="nid" autoComplete="off"   value={formData.nid} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জন্ম তারিখ (দিন/মাস/বছর)</label>
                                <input type="text" name="issueDate" value={formData.issueDate} onChange={handleChange} placeholder="যেমন: ১৯/৬/২০২৬" className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* ব্যবসার ঠিকানা (নতুন ফিল্ডসহ) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">📍 ব্যবসা প্রতিষ্ঠানের ঠিকানা (ইউনিয়নের আওতাধীন)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ডাকঘর</label>
                                <input type="text" name="postOffice" value={formData.postOffice} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">উপজেলা</label>
                                <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জেলা</label>
                                <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" name="ward" value={formData.ward} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
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

                    {/* ফাইল আপলোড */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">📎 প্রয়োজনীয় কাগজপত্র আপলোড (PDF/Image, সর্বোচ্চ 2MB)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">🪪</span>
                                    <p className="text-xs font-bold text-gray-700">মালিকের NID কপি <span className="text-red-500">*</span></p>
                                    <input required type="file" name="nidCopy" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400 truncate">{formData.nidCopy ? formData.nidCopy.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">📄</span>
                                    <p className="text-xs font-bold text-gray-700">হোল্ডিং ট্যাক্স রসিদ <span className="text-red-500">*</span></p>
                                    <input required type="file" name="holdingTax" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400 truncate">{formData.holdingTax ? formData.holdingTax.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                            <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center bg-slate-50">
                                <label className="cursor-pointer block space-y-2">
                                    <span className="text-2xl">🧾</span>
                                    <p className="text-xs font-bold text-gray-700">TIN সার্টিফিকেট (যদি থাকে)</p>
                                    <input type="file" name="tinCertificate" onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                                    <p className="text-[11px] text-gray-400 truncate">{formData.tinCertificate ? formData.tinCertificate.name : "ফাইল সিলেক্ট করুন"}</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* শর্তাবলী */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে অঙ্গীকার করছি যে, উপরে বর্ণিত সব তথ্য সম্পূর্ণ সত্য ও সঠিক। কোনো তথ্য মিথ্যা বা ভুল প্রমাণিত হলে আমার আবেদন বাতিলসহ আইনি ব্যবস্থা গ্রহণ করা যাবে।
                        </label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer disabled:opacity-50">
                            {loading ? 'সাবমিট হচ্ছে...' : 'আবেদন জমা দিন (Submit)'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TradeLicense;