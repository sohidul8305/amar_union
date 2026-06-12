import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Warish = () => {
    const [deceasedInfo, setDeceasedInfo] = useState({ deceasedName: '', fatherHusbandName: '', motherName: '', deathDate: '', nid: '', ward: '', village: '', holdingNo: '' });
    const [applicantInfo, setApplicantInfo] = useState({ applicantName: '', applicantNid: '', applicantMobile: '', relationWithDeceased: 'পুত্র', applicantEmail: '' });
    const [heirs, setHeirs] = useState([{ name: '', age: '', relation: '', nidBirthCert: '' }]);
    const [files, setFiles] = useState({ deathCertificateDoc: null, applicantNidDoc: null });

    const handleDeceasedChange = (e) => { const { name, value } = e.target; setDeceasedInfo({ ...deceasedInfo, [name]: value }); };
    const handleApplicantChange = (e) => { const { name, value } = e.target; setApplicantInfo({ ...applicantInfo, [name]: value }); };
    const addHeirRow = () => setHeirs([...heirs, { name: '', age: '', relation: '', nidBirthCert: '' }]);
    const removeHeirRow = (index) => { if (heirs.length > 1) setHeirs(heirs.filter((_, i) => i !== index)); };
    const handleHeirChange = (index, e) => { const { name, value } = e.target; const updated = [...heirs]; updated[index][name] = value; setHeirs(updated); };
    const handleFileChange = (e) => { const { name, files: f } = e.target; setFiles({ ...files, [name]: f[0] }); };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({ title: 'আপনি কি নিশ্চিত?', text: "আবেদনের সকল তথ্য সঠিক ও সত্য তো?", icon: 'warning', showCancelButton: true, confirmButtonColor: '#000F9F', cancelButtonColor: '#d33', confirmButtonText: 'হ্যাঁ, সাবমিট করুন!', cancelButtonText: 'বাতিল' })
        .then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({ title: 'আবেদন জমা হচ্ছে...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
                try {
                    // এখানে email ফিল্ডটি রুট লেভেলে যুক্ত করা হয়েছে যেন ড্যাশবোর্ড কুয়েরি ঠিকঠাক কাজ করে
                    const submissionData = { 
                        deceasedInfo, 
                        applicantInfo, 
                        heirs, 
                        email: applicantInfo.applicantEmail, 
                        deathCertificateDocName: files.deathCertificateDoc?.name || null, 
                        applicantNidDocName: files.applicantNidDoc?.name || null 
                    };
                    
                    const response = await fetch('https://amar-union-backend.vercel.app/api/warish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submissionData) });
                    const data = await response.json();
                    if (data.success) {
                        Swal.fire({ icon: 'success', title: 'আবেদনটি সফলভাবে গৃহীত হয়েছে!', text: `আপনার ওয়ারিশ ট্র্যাকিং আইডি: ${data.warishId}`, confirmButtonColor: '#000F9F' });
                        setDeceasedInfo({ deceasedName: '', fatherHusbandName: '', motherName: '', deathDate: '', nid: '', ward: '', village: '', holdingNo: '' });
                        setApplicantInfo({ applicantName: '', applicantNid: '', applicantMobile: '', relationWithDeceased: 'পুত্র', applicantEmail: '' });
                        setHeirs([{ name: '', age: '', relation: '', nidBirthCert: '' }]);
                        setFiles({ deathCertificateDoc: null, applicantNidDoc: null });
                        document.getElementById('warish-form').reset();
                    } else throw new Error();
                } catch (error) { Swal.fire({ icon: 'error', title: 'দুঃখিত!', text: 'সার্ভার বা নেটওয়ার্ক সমস্যা', confirmButtonColor: '#000F9F' }); }
            }
        });
    };

    return ( 
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-১</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">ওয়ারিশ সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">মৃত ব্যক্তির সঠিক তথ্য এবং সকল জীবিত উত্তরাধিকারীদের বিবরণ সাবধানে পূরণ করুন।</p>
                </div>
                <form id="warish-form" onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* মৃত ব্যক্তির বিবরণ */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>🕯️</span> মৃত ব্যক্তির বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির নাম <span className="text-red-500">*</span></label><input required type="text" name="deceasedName" value={deceasedInfo.deceasedName} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মরহুম আলহাজ্ব করিম উল্লাহ" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">পিতা/স্বামীর নাম <span className="text-red-500">*</span></label><input required type="text" name="fatherHusbandName" value={deceasedInfo.fatherHusbandName} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মাতার নাম <span className="text-red-500">*</span></label><input required type="text" name="motherName" value={deceasedInfo.motherName} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মৃত্যুর তারিখ <span className="text-red-500">*</span></label><input required type="date" name="deathDate" value={deceasedInfo.deathDate} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র/মৃত্যু নিবন্ধন নং <span className="text-red-500">*</span></label><input required type="number" name="nid" value={deceasedInfo.nid} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div className="grid grid-cols-3 gap-2"><div><label className="block text-[11px] font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label><input required type="number" name="ward" value={deceasedInfo.ward} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" /></div><div className="col-span-2"><label className="block text-[11px] font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label><input required type="text" name="village" value={deceasedInfo.village} onChange={handleDeceasedChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div></div>
                        </div>
                    </div>
                    {/* আবেদনকারীর বিবরণ */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>👤</span> আবেদনকারীর বিবরণ (যিনি ওয়ারিশদের পক্ষে ফরম পূরণ করছেন)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর নাম <span className="text-red-500">*</span></label><input required type="text" name="applicantName" value={applicantInfo.applicantName} onChange={handleApplicantChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: মোঃ শফিকুর রহমান" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মৃত ব্যক্তির সাথে সম্পর্ক <span className="text-red-500">*</span></label><select name="relationWithDeceased" value={applicantInfo.relationWithDeceased} onChange={handleApplicantChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#000F9F]"><option>পুত্র</option><option>কন্যা</option><option>স্ত্রী</option><option>স্বামী</option><option>অন্যান্য আত্মীয়</option></select></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর NID নম্বর <span className="text-red-500">*</span></label><input required type="number" name="applicantNid" value={applicantInfo.applicantNid} onChange={handleApplicantChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর মোবাইল নম্বর <span className="text-red-500">*</span></label><input required type="tel" name="applicantMobile" value={applicantInfo.applicantMobile} onChange={handleApplicantChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" /></div>
                            <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর ইমেইল <span className="text-red-500">*</span></label><input required type="email" name="applicantEmail" value={applicantInfo.applicantEmail} onChange={handleApplicantChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="example@mail.com" /></div>
                        </div>
                    </div>
                    {/* ওয়ারিশদের তালিকা (ডাইনামিক) */}
                    <div className="space-y-4"><div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 border-gray-100 gap-2"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2"><span>👨‍👩‍👧‍👦</span> জীবিত উত্তরাধিকারী (ওয়ারিশ) সমূহের তালিকা</h3><button type="button" onClick={addHeirRow} className="text-xs bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer w-fit"><span>➕</span> নতুন ওয়ারিশ যোগ করুন</button></div>
                        <div className="space-y-3">{heirs.map((heir, index) => (<div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-3 rounded-xl border border-gray-200 relative items-end"><div className="sm:col-span-1 flex items-center justify-center font-bold text-gray-500 text-sm h-10">{index + 1}.</div><div className="sm:col-span-3"><label className="block text-[11px] font-semibold text-gray-600 mb-1">ওয়ারিশের নাম</label><input required type="text" name="name" value={heir.name} onChange={(e) => handleHeirChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="নাম লিখুন" /></div><div className="sm:col-span-2"><label className="block text-[11px] font-semibold text-gray-600 mb-1">মৃতের সাথে সম্পর্ক</label><input required type="text" name="relation" value={heir.relation} onChange={(e) => handleHeirChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="উদা: স্ত্রী / পুত্র" /></div><div className="sm:col-span-1"><label className="block text-[11px] font-semibold text-gray-600 mb-1">বয়স</label><input required type="number" name="age" value={heir.age} onChange={(e) => handleHeirChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="বয়স" /></div><div className="sm:col-span-4"><label className="block text-[11px] font-semibold text-gray-600 mb-1">NID / জন্ম নিবন্ধন নম্বর</label><input required type="number" name="nidBirthCert" value={heir.nidBirthCert} onChange={(e) => handleHeirChange(index, e)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="আইডি নম্বর দিন" /></div><div className="sm:col-span-1 flex justify-center"><button type="button" disabled={heirs.length === 1} onClick={() => removeHeirRow(index)} className={`p-2 rounded-lg text-white font-bold text-xs cursor-pointer transition-colors ${heirs.length === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}>🗑️</button></div></div>))}</div>
                    </div>
                    {/* ফাইল আপলোড */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>📎</span> প্রয়োজনীয় ফাইল আপলোড (PDF/Image, সর্বোচ্চ 2MB)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between"><div><p className="text-xs font-bold text-gray-700 truncate">মৃত ব্যক্তির মৃত্যু সনদপত্র</p><p className="text-[10px] text-gray-400 mt-0.5 truncate">{files.deathCertificateDoc ? files.deathCertificateDoc.name : "বাধ্যতামূলক ডকুমেন্ট"}</p></div><input required type="file" name="deathCertificateDoc" onChange={handleFileChange} accept="image/*,application/pdf" className="text-xs max-w-[180px]" /></div><div className="border border-gray-200 p-4 rounded-xl bg-slate-50 flex items-center justify-between"><div><p className="text-xs font-bold text-gray-700 truncate">আবেদনকারীর জাতীয় পরিচয়পত্র (NID)</p><p className="text-[10px] text-gray-400 mt-0.5 truncate">{files.applicantNidDoc ? files.applicantNidDoc.name : "বাধ্যতামূলক ডকুমেন্ট"}</p></div><input required type="file" name="applicantNidDoc" onChange={handleFileChange} accept="image/*,application/pdf" className="text-xs max-w-[180px]" /></div></div>
                    </div>
                    {/* শর্তাবলী */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl"><input required type="checkbox" id="warish-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" /><label htmlFor="warish-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">আমি সজ্ঞানে ঘোষণা করছি যে, উপরে উল্লেখিত ওয়ারিশদের তালিকা সম্পূর্ণ সত্য এবং কোনো জীবিত উত্তরাধিকারীর নাম গোপন করা হয়নি। কোনো তথ্য গোপন করার ফলে ভবিষ্যতে কোনো আইনি জটিলতা তৈরি হলে তার সম্পূর্ণ দায় আমার।</label></div>
                    <div className="flex justify-end pt-4"><button type="submit" className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">ওয়ারিশ আবেদন সাবমিট করুন</button></div>
                </form>
            </div>
        </div>
    );
};

export default Warish;