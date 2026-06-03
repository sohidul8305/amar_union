import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Successor_certificate = () => {
    const [deceasedInfo, setDeceasedInfo] = useState({
        name: '',
        fatherHusband: '',
        deathDate: '',
        nid: '',
        village: '',
        ward: '',
        postCode: ''
    });

    const [successors, setSuccessors] = useState([
        { name: '', relation: '', age: '', maritalStatus: 'বিবাহিত', nidBirth: '' }
    ]);

    const [files, setFiles] = useState({
        deathCertificate: null,
        applicantNid: null
    });

    const [loading, setLoading] = useState(false);

    const handleDeceasedChange = (e) => {
        const { name, value } = e.target;
        setDeceasedInfo({ ...deceasedInfo, [name]: value });
    };

    const addSuccessorRow = () => {
        setSuccessors([...successors, { name: '', relation: '', age: '', maritalStatus: 'বিবাহিত', nidBirth: '' }]);
    };

    const removeSuccessorRow = (index) => {
        if (successors.length > 1) {
            const updated = successors.filter((_, i) => i !== index);
            setSuccessors(updated);
        }
    };

    const handleSuccessorChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...successors];
        updated[index][name] = value;
        setSuccessors(updated);
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'দুঃখিত!',
                    text: 'ফাইলের সাইজ ২ মেগাবাইটের বেশি হতে পারবে না।',
                    confirmButtonColor: '#000F9F'
                });
                e.target.value = '';
                return;
            }
            setFiles({ ...files, [fieldName]: file.name });
        }
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

                const applicationData = {
                    deceasedInfo,
                    successors,
                    attachedFiles: files
                };

                try {
                    const response = await fetch('http://localhost:5000/api/warish', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(applicationData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'উত্তরাধিকারী সনদের আবেদনটি সফল হয়েছে!',
                            html: `আপনার আবেদনটি সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে। <br><br> <strong>আবেদন আইডি: <span style="color:#000F9F">${data.warishId}</span></strong><br>চেয়ারম্যান মহোদয়ের কার্যালয় দ্বারা যাচাই করে দ্রুত সনদ প্রদান করা হবে।`,
                            confirmButtonText: 'ঠিক আছে',
                            confirmButtonColor: '#000F9F'
                        });

                        setDeceasedInfo({ name: '', fatherHusband: '', deathDate: '', nid: '', village: '', ward: '', postCode: '' });
                        setSuccessors([{ name: '', relation: '', age: '', maritalStatus: 'বিবাহিত', nidBirth: '' }]);
                        setFiles({ deathCertificate: null, applicantNid: null });
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
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৪ (খ)</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">উত্তরাধিকারী সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">মৃত ব্যক্তির আইনি উত্তরাধিকারীদের বিবরণ ও হিস্যা (অংশ) সঠিকভাবে পূরণ করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* Deceased Person Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🕯️</span> মৃত ব্যক্তির বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="name" value={deceasedInfo.name} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মরহুম আলহাজ্ব করিম উল্লাহ" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতা বা স্বামীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="fatherHusband" value={deceasedInfo.fatherHusband} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত্যুর তারিখ <span className="text-red-500">*</span></label>
                                <input required type="date" name="deathDate" value={deceasedInfo.deathDate} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র/মৃত্যু নিবন্ধন নম্বর <span className="text-red-500">*</span></label>
                                <input required type="number" name="nid" value={deceasedInfo.nid} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="এনআইডি বা জন্ম নিবন্ধন নং" />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📍</span> মৃত ব্যক্তির শেষ স্থায়ী ঠিকানা
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={deceasedInfo.village} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" name="ward" value={deceasedInfo.ward} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label>
                                <input required type="number" name="postCode" value={deceasedInfo.postCode} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                        </div>
                    </div>

                    {/* Successors Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-100 gap-2">
                            <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2">
                                <span>⚖️</span> আইনি উত্তরাধিকারী সমূহের তালিকা ও হিস্যা
                            </h3>
                            <button type="button" onClick={addSuccessorRow} className="text-xs bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer w-fit">
                                <span>➕</span> নতুন উত্তরাধিকারী যোগ করুন
                            </button>
                        </div>

                        <div className="space-y-3">
                            {successors.map((successor, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-3 rounded-xl border border-gray-200 relative items-end">
                                    <div className="sm:col-span-1 flex items-center justify-center font-bold text-gray-500 text-sm h-10">
                                        {index + 1}.
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">উত্তরাধিকারীর নাম</label>
                                        <input required type="text" name="name" value={successor.name} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="পূর্ণ নাম" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">মৃতের সাথে সম্পর্ক</label>
                                        <input required type="text" name="relation" value={successor.relation} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="উদা: স্ত্রী / পুত্র" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">বয়স</label>
                                        <input required type="number" name="age" value={successor.age} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="বয়স" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">বৈবাহিক অবস্থা</label>
                                        <select name="maritalStatus" value={successor.maritalStatus} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-1.5 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]">
                                            <option value="বিবাহিত">বিবাহিত</option>
                                            <option value="অবিবাহিত">অবিবাহিত</option>
                                            <option value="অন্যান্য">অন্যান্য</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">NID / জন্ম নিবন্ধন নং</label>
                                        <input required type="number" name="nidBirth" value={successor.nidBirth} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="আইডি নম্বর" />
                                    </div>
                                    <div className="sm:col-span-1 flex justify-center">
                                        <button type="button" disabled={successors.length === 1} onClick={() => removeSuccessorRow(index)} className={`p-2 rounded-lg text-white font-bold text-xs cursor-pointer transition-colors ${successors.length === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📎</span> প্রয়োজনীয় ফাইল আপলোড (PDF/Image, সর্বোচ্চ 2MB)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">মৃত ব্যক্তির ডিজিটাল মৃত্যু সনদপত্র</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">(বাধ্যতামূলক ডকুমেন্ট)</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, 'deathCertificate')} className="text-xs max-w-[175px]" />
                            </div>

                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">আবেদনকারী/প্রধান উত্তরাধিকারীর NID</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">(ভেরিফিকেশনের জন্য)</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, 'applicantNid')} className="text-xs max-w-[175px]" />
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="successor-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="successor-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে অঙ্গীকার করছি যে, উপরে বর্ণিত উত্তরাধিকারীগণের বিবরণ সম্পূর্ণ সঠিক এবং কোনো বৈধ উত্তরাধিকারীর নাম বাদ দেওয়া হয়নি। কোনো তথ্য গোপন বা জালিয়াতি প্রমাণিত হলে কর্তৃপক্ষ আমার লাইসেন্স/সনদ বাতিলসহ ফৌজদারি আইনে ব্যবস্থা নিতে পারবে।
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer disabled:opacity-50">
                            {loading ? 'সাবমিট হচ্ছে...' : 'উত্তরাধিকারী আবেদন সাবমিট করুন'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Successor_certificate;