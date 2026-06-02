import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Family_certificate = () => {
    // পরিবারের প্রধানের সাধারণ স্টেট
    const [headInfo, setHeadInfo] = useState({
        headName: '',
        fatherHusbandName: '',
        motherName: '',
        nid: '',
        mobile: '',
        email: '',
        village: '',
        ward: '',
        holdingNo: '',
        postCode: ''
    });

    // 💡 পরিবারের সদস্যদের ডাইনামিক তালিকা হ্যান্ডেল করার স্টেট
    const [members, setMembers] = useState([
        { name: '', age: '', relation: '', nidBirthCert: '', occupation: '' }
    ]);

    // নতুন সদস্যের সারি (Row) যোগ করা
    const addMemberRow = () => {
        setMembers([...members, { name: '', age: '', relation: '', nidBirthCert: '', occupation: '' }]);
    };

    // কোনো সদস্যের সারি মুছে ফেলা
    const removeMemberRow = (index) => {
        if (members.length > 1) {
            const updatedMembers = members.filter((_, i) => i !== index);
            setMembers(updatedMembers);
        }
    };

    // সদস্যদের ইনপুট চেঞ্জ হ্যান্ডেল করা
    const handleMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMembers = [...members];
        updatedMembers[index][name] = value;
        setMembers(updatedMembers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // সফল সাবমিশন অ্যালার্ট
        Swal.fire({
            icon: 'success',
            title: 'পারিবারিক সনদের আবেদনটি জমা হয়েছে!',
            text: 'আপনার প্রদানকৃত তথ্যসমূহ যাচাই করে খুব শীঘ্রই ডিজিটাল পারিবারিক সনদপত্রটি ইস্যু করা হবে।',
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#000F9F'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                
                {/* ফর্ম হেডার */}
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৫</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">পারিবারিক সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">পরিবারের প্রধান এবং পরিবারের সকল জীবিত সদস্যদের বিবরণ সঠিকভাবে বাংলায় পূরণ করুন।</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    
                    {/* সেকশন ১: পরিবারের প্রধানের বিবরণ */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>🏠</span> পরিবারের প্রধানের বিবরণ (পিতা/মাতা/অভিভাবক)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পরিবারের প্রধানের নাম <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মোঃ আবদুর রউফ" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পিতা/স্বামীর নাম <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মাতার নাম <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID) <span className="text-red-500">*</span></label>
                                <input required type="number" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১০ বা ১৭ ডিজিটের এনআইডি" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                <input required type="tel" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
                                <input type="email" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="example@mail.com" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ২: স্থায়ী/বর্তমান ঠিকানা */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100">
                            <span>📍</span> বর্তমান ও স্থায়ী ঠিকানা
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহл্লা <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label>
                                <input required type="number" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">হোল্ডিং নং</label>
                                <input type="text" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="যদি থাকে" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label>
                                <input required type="number" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" />
                            </div>
                        </div>
                    </div>

                    {/* সেকশন ৩: পরিবারের সদস্যদের ডাইনামিক তালিকা */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-100 gap-2">
                            <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2">
                                <span>👨‍👩‍👧‍👦</span> পরিবারের সদস্যবৃন্দের বিবরণ (প্রধান ব্যতীত অন্য সদস্য)
                            </h3>
                            <button type="button" onClick={addMemberRow} className="text-xs bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer w-fit">
                                <span>➕</span> নতুন সদস্য যোগ করুন
                            </button>
                        </div>

                        {/* সদস্যদের ইনপুট লুপ */}
                        <div className="space-y-3">
                            {members.map((member, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-3 rounded-xl border border-gray-200 relative items-end">
                                    <div className="sm:col-span-1 flex items-center justify-center font-bold text-gray-500 text-sm h-10">
                                        {index + 1}.
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">সদস্যের নাম</label>
                                        <input required type="text" name="name" value={member.name} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="নাম লিখুন" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">প্রধানের সাথে সম্পর্ক</label>
                                        <input required type="text" name="relation" value={member.relation} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="উদা: স্ত্রী / পুত্র / কন্যা" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">বয়স</label>
                                        <input required type="number" name="age" value={member.age} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="বয়স" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">পেশা</label>
                                        <input required type="text" name="occupation" value={member.occupation} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="পেশা" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">NID / জন্ম নিবন্ধন নং</label>
                                        <input required type="number" name="nidBirthCert" value={member.nidBirthCert} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="আইডি দিন" />
                                    </div>
                                    <div className="sm:col-span-1 flex justify-center">
                                        <button type="button" disabled={members.length === 1} onClick={() => removeMemberRow(index)} className={`p-2 rounded-lg text-white font-bold text-xs cursor-pointer transition-colors ${members.length === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`} title="মুছে ফেলুন">
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
                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">পরিবার প্রধানের NID কপি</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">বাধ্যতামূলক ডকুমেন্ট</p>
                                </div>
                                <input required type="file" accept="image/*,application/pdf" className="text-xs max-w-[180px]" />
                            </div>

                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">রেশন কার্ড / প্রত্যয়নপত্র বা ঘরের ট্যাক্স রসিদ</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">যাচাইকরণের সুবিধার জন্য</p>
                                </div>
                                <input type="file" accept="image/*,application/pdf" className="text-xs max-w-[180px]" />
                            </div>
                        </div>
                    </div>

                    {/* শর্তাবলী ও অঙ্গীকারনামা */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <input required type="checkbox" id="family-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="family-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">
                            আমি এই মর্মে ঘোষণা করছি যে, উপরে বর্ণিত বিবরণ ও আমার পরিবারের সদস্য তালিকা সম্পূর্ণ সঠিক এবং সত্য। কোনো সদস্যের নাম বাদ দেওয়া হয়নি বা ভুল তথ্য দেওয়া হয়নি। পরবর্তীতে কোনো ভুল ধরা পড়লে কর্তৃপক্ষ আমার সনদ বাতিল করতে পারবে।
                        </label>
                    </div>

                    {/* সাবমিট বাটন */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                            পারিবারিক সনদ আবেদন সাবমিট করুন
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Family_certificate;