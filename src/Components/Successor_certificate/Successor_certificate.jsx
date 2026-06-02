import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Successor_certificate = () => {
    // মৃত ব্যক্তির স্টেট
    const [deceasedInfo, setDeceasedInfo] = useState({
        name: '',
        fatherHusband: '',
        deathDate: '',
        nid: '',
        village: '',
        ward: '',
        postCode: ''
    });

    // উত্তরাধিকারীদের ডাইনামিক তালিকা হ্যান্ডেল করার স্টেট
    const [successors, setSuccessors] = useState([
        { name: '', relation: '', age: '', maritalStatus: 'বিবাহিত', share: '', nidBirth: '' }
    ]);

    // নতুন উত্তরাধিকারী যোগ করা
    const addSuccessorRow = () => {
        setSuccessors([...successors, { name: '', relation: '', age: '', maritalStatus: 'বিবাহিত', share: '', nidBirth: '' }]);
    };

    // উত্তরাধিকারী মুছে ফেলা
    const removeSuccessorRow = (index) => {
        if (successors.length > 1) {
            const updated = successors.filter((_, i) => i !== index);
            setSuccessors(updated);
        }
    };

    // ইনপুট চেঞ্জ হ্যান্ডেল করা
    const handleSuccessorChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...successors];
        updated[index][name] = value;
        setSuccessors(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // সফল সাবমিশন অ্যালার্ট
        Swal.fire({
            icon: 'success',
            title: 'উত্তরাধিকারী সনদের আবেদনটি সফল হয়েছে!',
            text: 'আপনার প্রদানকৃত উত্তরাধিকারীদের তথ্যসমূহ চেয়ারম্যান মহোদয়ের কার্যালয় দ্বারা যাচাই করে দ্রুত সনদ প্রদান করা হবে।',
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#000F9F'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                
                {/* ফর্ম হেডার */}
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৪ (খ)</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">উত্তরাধিকারী সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">মৃত ব্যক্তির আইনি উত্তরাধিকারীদের বিবরণ ও হিস্যা (অংশ) সঠিকভাবে পূরণ করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    
                    {/* সেকশন ১: মৃত ব্যক্তির বিবরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🕯️</span> মৃত ব্যক্তির বিবরণ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির নাম <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মরহুম আলহাজ্ব করিম উল্লাহ" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতা বা স্বামীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মৃত্যুর তারিখ <span className="text-red-500">*</span></label>
                                <input required type="date" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র/মৃত্যু নিবন্ধন নম্বর <span className="text-red-500">*</span></label>
                                <input required type="number" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="এনআইডি বা জন্ম নিবন্ধন নং" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ২: মৃত ব্যক্তির শেষ স্থায়ী ঠিকানা */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📍</span> মৃত ব্যক্তির শেষ স্থায়ী ঠিকানা
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label>
                                <input required type="number" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ৩: উত্তরাধিকারীদের ডাইনামিক তালিকা */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-100 gap-2">
                            <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2">
                                <span>⚖️</span> আইনি উত্তরাধিকারী (Successors) সমূহের তালিকা ও হিস্যা
                            </h3>
                            <button type="button" onClick={addSuccessorRow} className="text-xs bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer w-fit">
                                <span>➕</span> নতুন উত্তরাধিকারী যোগ করুন
                            </button>
                        </div>

                        {/* উত্তরাধিকারী ইনপুট লুপ */}
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
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">বয়স</label>
                                        <input required type="number" name="age" value={successor.age} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="বয়স" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">বৈবাহিক অবস্থা</label>
                                        <select name="maritalStatus" value={successor.maritalStatus} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-1.5 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]">
                                            <option>বিবাহিত</option>
                                            <option>অবিবাহিত</option>
                                            <option>অন্যান্য</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">NID / জন্ম নিবন্ধন নং</label>
                                        <input required type="number" name="nidBirth" value={successor.nidBirth} onChange={(e) => handleSuccessorChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="আইডি নম্বর" />
                                    </div>
                                    <div className="sm:col-span-1 flex justify-center">
                                        <button type="button" disabled={successors.length === 1} onClick={() => removeSuccessorRow(index)} className={`p-2 rounded-lg text-white font-bold text-xs cursor-pointer transition-colors ${successors.length === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`} title="মুছে ফেলুন">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* সেকশন ৪: প্রয়োজনীয় ফাইল আপলোড */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📎</span> প্রয়োজনীয় ফাইল আপলোড (PDF/Image, সর্বোচ্চ 2MB)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">মৃত ব্যক্তির ডিজিটাল মৃত্যু সনদপত্র</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">(বাধ্যতামূলক ডকুমেন্ট)</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" className="text-xs max-w-[175px]" />
                            </div>

                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">আবেদনকারী/প্রধান উত্তরাধিকারীর NID</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">(তথ্য ক্রস-চেক করার জন্য)</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" className="text-xs max-w-[175px]" />
                            </div>
                        </div>
                    </div>

                    {/* শর্তাবলী ও অঙ্গীকারনামা */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="successor-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="successor-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে অঙ্গীকার করছি যে, উপরে বর্ণিত উত্তরাধিকারীগণের বিবরণ সম্পূর্ণ সঠিক এবং কোনো বৈধ উত্তরাধিকারীর নাম বাদ দেওয়া হয়নি। কোনো তথ্য গোপন বা জালিয়াতি প্রমাণিত হলে কর্তৃপক্ষ আমার লাইসেন্স/সনদ বাতিলসহ ফৌজদারি আইনে ব্যবস্থা নিতে পারবে।
                        </label>
                    </div>

                    {/* সাবমিট বাটন */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                            উত্তরাধিকারী আবেদন সাবমিট করুন
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Successor_certificate;