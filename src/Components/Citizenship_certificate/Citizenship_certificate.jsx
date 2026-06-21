import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Family_certificate = () => {
    const [headInfo, setHeadInfo] = useState({
        headName: '',
        fatherHusbandName: '',
        motherName: '',
        nid: '',
        mobile: '',
        email: '',
        village: '',
        postOffice: '',      // নতুন
        upazila: '',         // নতুন
        district: '',        // নতুন
        ward: '',
        holdingNo: '',
        postCode: '',
        issueDate: ''        // নতুন
    });
    const [members, setMembers] = useState([{ name: '', age: '', relation: '', nidBirthCert: '', occupation: '' }]);
    const [files, setFiles] = useState({ headNidDoc: null, taxReceiptDoc: null });

    const handleHeadChange = (e) => { const { name, value } = e.target; setHeadInfo({ ...headInfo, [name]: value }); };
    const addMemberRow = () => setMembers([...members, { name: '', age: '', relation: '', nidBirthCert: '', occupation: '' }]);
    const removeMemberRow = (index) => { if (members.length > 1) setMembers(members.filter((_, i) => i !== index)); };
    const handleMemberChange = (index, e) => { const { name, value } = e.target; const updated = [...members]; updated[index][name] = value; setMembers(updated); };
    const handleFileChange = (e) => { const { name, files: f } = e.target; setFiles({ ...files, [name]: f[0] }); };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "আবেদনের সকল তথ্য সঠিক ও সত্য তো?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000F9F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, সাবমিট করুন!',
            cancelButtonText: 'বাতিল'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({ title: 'আবেদন জমা হচ্ছে...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
                try {
                    const submissionData = {
                        ...headInfo,
                        members,
                        headNidDocName: files.headNidDoc?.name || null,
                        taxReceiptDocName: files.taxReceiptDoc?.name || null
                    };
                    const response = await fetch('https://amar-union-backend.vercel.app/api/family-certificate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(submissionData)
                    });
                    const data = await response.json();
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'পারিবারিক সনদের আবেদন জমা হয়েছে!',
                            text: `আপনার ট্র্যাকিং আইডি: ${data.familyCertificateId}`,
                            confirmButtonColor: '#000F9F'
                        });
                        setHeadInfo({
                            headName: '',
                            fatherHusbandName: '',
                            motherName: '',
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
                            issueDate: ''
                        });
                        setMembers([{ name: '', age: '', relation: '', nidBirthCert: '', occupation: '' }]);
                        setFiles({ headNidDoc: null, taxReceiptDoc: null });
                        document.getElementById('family-form').reset();
                    } else throw new Error();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'দুঃখিত!',
                        text: 'সার্ভার বা নেটওয়ার্ক সমস্যা',
                        confirmButtonColor: '#000F9F'
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৫</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">পারিবারিক সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">পরিবারের প্রধান এবং পরিবারের সকল জীবিত সদস্যদের বিবরণ সঠিকভাবে বাংলায় পূরণ করুন।</p>
                </div>
                <form id="family-form" onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* সেকশন ১: পরিবারের প্রধানের বিবরণ (নতুন ফিল্ডসহ) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>🏠</span> পরিবারের প্রধানের বিবরণ (পিতা/মাতা/অভিভাবক)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">পরিবারের প্রধানের নাম <span className="text-red-500">*</span></label><input required type="text" name="headName" value={headInfo.headName} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মোঃ আবদুর রউফ" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">পিতা/স্বামীর নাম <span className="text-red-500">*</span></label><input required type="text" name="fatherHusbandName" value={headInfo.fatherHusbandName} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মাতার নাম <span className="text-red-500">*</span></label><input required type="text" name="motherName" value={headInfo.motherName} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID) <span className="text-red-500">*</span></label><input required type="number" name="nid" value={headInfo.nid} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১০ বা ১৭ ডিজিটের এনআইডি" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label><input required type="tel" name="mobile" value={headInfo.mobile} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা <span className="text-red-500">*</span></label><input required type="email" name="email" value={headInfo.email} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="example@mail.com" /></div>
                            {/* নতুন ফিল্ড: ডাকঘর, উপজেলা, জেলা, ইস্যুর তারিখ */}
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">ডাকঘর <span className="text-red-500">*</span></label><input required type="text" name="postOffice" value={headInfo.postOffice} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">উপজেলা <span className="text-red-500">*</span></label><input required type="text" name="upazila" value={headInfo.upazila} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">জেলা <span className="text-red-500">*</span></label><input required type="text" name="district" value={headInfo.district} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">জন্ম তারিখ</label><input type="date" name="issueDate" value={headInfo.issueDate} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                        </div>
                    </div>
                    {/* সেকশন ২: স্থায়ী/বর্তমান ঠিকানা (গ্রাম/মহল্লা, ওয়ার্ড, হোল্ডিং, পোস্ট কোড) */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>📍</span> বর্তমান ও স্থায়ী ঠিকানা</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label><input required type="text" name="village" value={headInfo.village} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label><input required type="number" name="ward" value={headInfo.ward} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">হোল্ডিং নং</label><input type="text" name="holdingNo" value={headInfo.holdingNo} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="যদি থাকে" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label><input required type="number" name="postCode" value={headInfo.postCode} onChange={handleHeadChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                        </div>
                    </div>
                    {/* সেকশন ৩: পরিবারের সদস্যদের ডাইনামিক তালিকা (অপরিবর্তিত) */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-100 gap-2">
                            <h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2"><span>👨‍👩‍👧‍👦</span> পরিবারের সদস্যবৃন্দের বিবরণ (প্রধান ব্যতীত অন্য সদস্য)</h3>
                            <button type="button" onClick={addMemberRow} className="text-xs bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer w-fit"><span>➕</span> নতুন সদস্য যোগ করুন</button>
                        </div>
                        <div className="space-y-3">
                            {members.map((member, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-3 rounded-xl border border-gray-200 relative items-end">
                                    <div className="sm:col-span-1 flex items-center justify-center font-bold text-gray-500 text-sm h-10">{index + 1}.</div>
                                    <div className="sm:col-span-3"><label className="block text-[11px] font-semibold text-gray-600 mb-1">সদস্যের নাম</label><input required type="text" name="name" value={member.name} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="নাম লিখুন" /></div>
                                    <div className="sm:col-span-2"><label className="block text-[11px] font-semibold text-gray-600 mb-1">প্রধানের সাথে সম্পর্ক</label><input required type="text" name="relation" value={member.relation} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="উদা: স্ত্রী / পুত্র / কন্যা" /></div>
                                    <div className="sm:col-span-1"><label className="block text-[11px] font-semibold text-gray-600 mb-1">বয়স</label><input required type="number" name="age" value={member.age} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="বয়স" /></div>
                                    <div className="sm:col-span-2"><label className="block text-[11px] font-semibold text-gray-600 mb-1">পেশা</label><input required type="text" name="occupation" value={member.occupation} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="পেশা" /></div>
                                    <div className="sm:col-span-2"><label className="block text-[11px] font-semibold text-gray-600 mb-1">NID / জন্ম নিবন্ধন নং</label><input required type="number" name="nidBirthCert" value={member.nidBirthCert} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="আইডি দিন" /></div>
                                    <div className="sm:col-span-1 flex justify-center"><button type="button" disabled={members.length === 1} onClick={() => removeMemberRow(index)} className={`p-2 rounded-lg text-white font-bold text-xs cursor-pointer transition-colors ${members.length === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}>🗑️</button></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* সেকশন ৪: প্রয়োজনীয় ফাইল আপলোড (অপরিবর্তিত) */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>📎</span> প্রয়োজনীয় ফাইল আপলোড (PDF/Image, সর্বোচ্চ 2MB)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between"><div className="max-w-[60%]"><p className="text-xs font-bold text-gray-700 truncate">পরিবার প্রধানের NID কপি</p><p className="text-[10px] text-gray-400 mt-0.5 truncate">{files.headNidDoc ? files.headNidDoc.name : "বাধ্যতামূলক ডকুমেন্ট"}</p></div><input required type="file" name="headNidDoc" onChange={handleFileChange} accept="image/*,application/pdf" className="text-xs max-w-[180px]" /></div>
                            <div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between"><div className="max-w-[60%]"><p className="text-xs font-bold text-gray-700 truncate">রেশন কার্ড / প্রত্যয়নপত্র বা ঘরের ট্যাক্স রসি</p><p className="text-[10px] text-gray-400 mt-0.5 truncate">{files.taxReceiptDoc ? files.taxReceiptDoc.name : "যাচাইকরণের সুবিধার জন্য"}</p></div><input type="file" name="taxReceiptDoc" onChange={handleFileChange} accept="image/*,application/pdf" className="text-xs max-w-[180px]" /></div>
                        </div>
                    </div>
                    {/* শর্তাবলী (অপরিবর্তিত) */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl"><input required type="checkbox" id="family-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" /><label htmlFor="family-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">আমি এই মর্মে ঘোষণা করছি যে, উপরে বর্ণিত বিবরণ ও আমার পরিবারের সদস্য তালিকা সম্পূর্ণ সঠিক এবং সত্য। কোনো সদস্যের নাম বাদ দেওয়া হয়নি বা ভুল তথ্য দেওয়া হয়নি। পরবর্তীতে কোনো ভুল ধরা পড়লে কর্তৃপক্ষ আমার সনদ বাতিল করতে পারবে।</label></div>
                    <div className="flex justify-end pt-4"><button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">পারিবারিক সনদ আবেদন সাবমিট করুন</button></div>
                </form>
            </div>
        </div>
    );
};

export default Family_certificate;