import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Landless_certificate = () => {
    const [formData, setFormData] = useState({
        applicantName: '', fatherHusbandName: '', motherName: '', gender: 'পুরুষ', dateOfBirth: '', nidOrBrn: '', mobileNumber: '', profession: '', yearlyIncome: '', familyMembers: '',
        village: '', ward: '', postCode: '', currentAddress: '', email: ''
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({ title: 'আপনি কি নিশ্চিত?', text: "আবেদনটি সাবমিট করার পর তথ্য পরিবর্তন করা যাবে না!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#000F9F', cancelButtonColor: '#d33', confirmButtonText: 'হ্যাঁ, সাবমিট করুন!', cancelButtonText: 'বাতিল করুন' })
        .then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                Swal.fire({ title: 'প্রসেস করা হচ্ছে...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
                try {
                    const response = await fetch('https://amar-union-backend.vercel.app/api/landless-certificate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
                    const data = await response.json();
                    if (data.success) { Swal.fire({ icon: 'success', title: 'ভূমিহীন সনদের আবেদনটি সফল হয়েছে!', html: `<strong>আবেদন আইডি: ${data.landlessId}</strong>`, confirmButtonColor: '#000F9F' });
                        setFormData({ applicantName: '', fatherHusbandName: '', motherName: '', gender: 'পুরুষ', dateOfBirth: '', nidOrBrn: '', mobileNumber: '', profession: '', yearlyIncome: '', familyMembers: '', village: '', ward: '', postCode: '', currentAddress: '', email: '' });
                        e.target.reset();
                    } else throw new Error();
                } catch (error) { Swal.fire({ icon: 'error', title: 'দুঃখিত!', text: 'আবেদনটি সাবমিট করা যায়নি।', confirmButtonColor: '#d33' }); } finally { setLoading(false); }
            }
        });
    };

    return ( /* JSX ঠিক রাখুন, নিচে ইমেইল ফিল্ড যোগ করুন */ 
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white p-6 md:p-8 text-center space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-৭ (গ)</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">ভূমিহীন সনদপত্রের জন্য আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">আবেদনকারী এবং তার পরিবারের কোনো সদস্যের নামে কোনো নিজস্ব আবাদি বা বসতভিটা জমি না থাকার প্রত্যয়ন ফর্ম।</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* ব্যক্তিগত বিবরণ */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>👤</span> আবেদনকারীর ব্যক্তিগত বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর নাম <span className="text-red-500">*</span></label><input required type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="জাতীয় পরিচয়পত্র অনুযায়ী" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">পিতা বা স্বামীর নাম <span className="text-red-500">*</span></label><input required type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মাতার নাম <span className="text-red-500">*</span></label><input required type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label><input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">লিঙ্গ <span className="text-red-500">*</span></label><select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#000F9F]"><option>পুরুষ</option><option>মহিলা</option><option>অন্যান্য</option></select></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর <span className="text-red-500">*</span></label><input required type="number" name="nidOrBrn" value={formData.nidOrBrn} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="NID অথবা BRN নম্বর" /></div>
                        </div>
                    </div>
                    {/* পেশা ও অর্থনৈতিক বিবরণ */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>🌾</span> পেশা ও অর্থনৈতিক বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-1">বর্তমান পেশা <span className="text-red-500">*</span></label><input required type="text" name="profession" value={formData.profession} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: দিনমজুর / রিকশাচালক" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">পরিবারের বার্ষিক আয় (টাকা) <span className="text-red-500">*</span></label><input required type="number" name="yearlyIncome" value={formData.yearlyIncome} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: ৮৪০০০" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">পরিবারের সদস্য সংখ্যা <span className="text-red-500">*</span></label><input required type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="মোট সংখ্যা" /></div></div>
                    </div>
                    {/* ঠিকানা */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>📍</span> ঠিকানার বিবরণ (যেখানে ভূমিহীন হিসেবে স্থায়ী বসবাস)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা/আশ্রয়ণ প্রকল্প <span className="text-red-500">*</span></label><input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="গ্রাম বা প্রকল্পের নাম" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label><input required type="number" name="ward" value={formData.ward} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label><input required type="number" name="postCode" value={formData.postCode} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div></div>
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">বর্তমান বাসস্থান/ঠিকানার সংক্ষিপ্ত বিবরণ</label><textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} rows="2" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F] resize-none" placeholder="বর্তমানে যেখানে বসবাস করছেন (উদা: ভাড়া বাসা বা খাস জমিতে অস্থায়ী চালা)..."></textarea></div>
                    </div>
                    {/* ইমেইল ফিল্ড */}
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর ইমেইল <span className="text-red-500">*</span></label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="example@mail.com" /></div>
                    {/* শর্তাবলী */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl"><input required type="checkbox" id="landless-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" /><label htmlFor="landless-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">আমি এই মর্মে হলফপূর্বক ঘোষণা করছি যে, আমার নিজের অথবা আমার উপর নির্ভরশীল পরিবারের কোনো সদস্যের নামে এই ইউনিয়ন/পৌরসভা বা বাংলাদেশের কোথাও কোনো আবাদি জমি বা বসতভিটা নেই। এই তথ্য মিথ্যা প্রমাণিত হলে আমি আইনগত যেকোনো শাস্তি ভোগ করতে বাধ্য থাকব।</label></div>
                    <div className="flex justify-end pt-4"><button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer disabled:opacity-50">{loading ? 'সাবমিট হচ্ছে...' : 'ভূমিহীন সনদের আবেদন জমা দিন'}</button></div>
                </form>
            </div>
        </div>
    );
};

export default Landless_certificate;