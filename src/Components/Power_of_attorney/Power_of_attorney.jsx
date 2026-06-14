import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Power_of_attorney = () => {
    const [formData, setFormData] = useState({
        deedNumber: '', deedDate: '', registryOffice: '', propertyDetails: '', purpose: 'সম্পত্তি রক্ষণাবেক্ষণ ও বিক্রয়',
        grantorName: '', grantorNid: '', grantorMobile: '', attorneyName: '', attorneyNid: '', attorneyMobile: '',
        village: '', ward: '', postCode: '', email: ''
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
                    const response = await fetch('http://localhost:5000/api/power-of-attorney', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
                    const data = await response.json();
                    if (data.success) { Swal.fire({ icon: 'success', title: 'পাওয়ার অব অ্যাটর্নি আবেদনটি সফল হয়েছে!', html: `<strong>আবেদন আইডি: ${data.poaId}</strong>`, confirmButtonColor: '#000F9F' });
                        setFormData({ deedNumber: '', deedDate: '', registryOffice: '', propertyDetails: '', purpose: 'সম্পত্তি রক্ষণাবেক্ষণ ও বিক্রয়', grantorName: '', grantorNid: '', grantorMobile: '', attorneyName: '', attorneyNid: '', attorneyMobile: '', village: '', ward: '', postCode: '', email: '' });
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
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ফরম নং-১২</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">পাওয়ার অব অ্যাটর্নি (মোক্তারনামা) আবেদন</h2>
                    <p className="text-sm text-blue-100 font-medium">নিবন্ধিত মোক্তারনামা দলিলের সঠিক তথ্য ও সংশ্লিষ্ট পক্ষসমূহের বিবরণ প্রদান করুন।</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                    {/* দলিলের বিবরণ */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>📜</span> মোক্তারনামা দলিলের সাধারণ বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-1">পাওয়ার অব অ্যাটর্নি দলিল নম্বর <span className="text-red-500">*</span></label><input required type="text" name="deedNumber" value={formData.deedNumber} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="দলিল নম্বরটি লিখুন" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">দলিল নিবন্ধনের তারিখ <span className="text-red-500">*</span></label><input required type="date" name="deedDate" value={formData.deedDate} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">সাব-রেজিস্ট্রি অফিসের নাম <span className="text-red-500">*</span></label><input required type="text" name="registryOffice" value={formData.registryOffice} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="উদা: তেজগাঁও সাব-রেজিস্ট্রি অফিস" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">পাওয়ার প্রদানের উদ্দেশ্য/ধরণ <span className="text-red-500">*</span></label><select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#000F9F]"><option>সম্পত্তি রক্ষণাবেক্ষণ ও বিক্রয় সংক্রান্ত</option><option>ব্যবসা পরিচালনা ও ব্যাংক হিসাব সংক্রান্ত</option><option>মামলা-মোকদ্দমা পরিচালনা সংক্রান্ত</option><option>সাধারণ মোক্তারনামা (General Power)</option></select></div></div>
                    </div>
                    {/* পক্ষদ্বয় */}
                    <div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-gray-200"><h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 border-b pb-1.5 border-gray-200"><span>👤</span> আম-মোক্তার দাতা (Principal)</h4><div><label className="block text-xs font-semibold text-gray-600 mb-1">দাতার নাম <span className="text-red-500">*</span></label><input required type="text" name="grantorName" value={formData.grantorName} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" /></div><div><label className="block text-xs font-semibold text-gray-600 mb-1">দাতার NID নম্বর <span className="text-red-500">*</span></label><input required type="number" name="grantorNid" value={formData.grantorNid} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" /></div><div><label className="block text-xs font-semibold text-gray-600 mb-1">দাতার মোবাইল নম্বর <span className="text-red-500">*</span></label><input required type="tel" name="grantorMobile" value={formData.grantorMobile} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" /></div></div><div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-gray-200"><h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 border-b pb-1.5 border-gray-200"><span>💼</span> আম-মোক্তার গ্রহীতা (Attorney)</h4><div><label className="block text-xs font-semibold text-gray-600 mb-1">গ্রহীতার নাম <span className="text-red-500">*</span></label><input required type="text" name="attorneyName" value={formData.attorneyName} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" /></div><div><label className="block text-xs font-semibold text-gray-600 mb-1">গ্রহীতার NID নম্বর <span className="text-red-500">*</span></label><input required type="number" name="attorneyNid" value={formData.attorneyNid} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" /></div><div><label className="block text-xs font-semibold text-gray-600 mb-1">গ্রহীতার মোবাইল নম্বর <span className="text-red-500">*</span></label><input required type="tel" name="attorneyMobile" value={formData.attorneyMobile} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#000F9F]" placeholder="01XXXXXXXXX" /></div></div></div></div>
                    {/* সম্পত্তির বিবরণ */}
                    <div className="space-y-4"><h3 className="text-lg font-bold text-[#000F9F] flex items-center gap-2 border-b pb-2 border-gray-100"><span>🏡</span> মোক্তারনামা ভুক্ত সম্পত্তির বিবরণ (তফসিল)</h3><div className="space-y-4"><div><label className="block text-sm font-semibold text-gray-700 mb-1">মৌজা, খতিয়ান ও দাগ নম্বরসহ সম্পত্তির বিবরণ <span className="text-red-500">*</span></label><textarea required name="propertyDetails" value={formData.propertyDetails} onChange={handleChange} rows="3" className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F] resize-none" placeholder="উদা: জে.এল নং-১২, মৌজা- চকবাজার, খতিয়ান নং-৪৫০, দাগ নং-২৮০১..."></textarea></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-1">গ্রাম/মহল্লা <span className="text-red-500">*</span></label><input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">ওয়ার্ড নং <span className="text-red-500">*</span></label><input required type="number" name="ward" value={formData.ward} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="১-৯" /></div><div><label className="block text-sm font-semibold text-gray-700 mb-1">পোস্ট কোড <span className="text-red-500">*</span></label><input required type="number" name="postCode" value={formData.postCode} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" /></div></div></div></div>
                    {/* ইমেইল ফিল্ড */}
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">আবেদনকারীর ইমেইল <span className="text-red-500">*</span></label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#000F9F]" placeholder="example@mail.com" /></div>
                    {/* শর্তাবলী */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-4 rounded-xl"><input required type="checkbox" id="poa-terms" className="mt-1 h-4 w-4 text-[#000F9F] border-gray-300 rounded cursor-pointer" /><label htmlFor="poa-terms" className="text-xs text-amber-900 font-medium leading-relaxed cursor-pointer">আমি এই মর্মে ঘোষণা করছি যে, উপরে বর্ণিত মোক্তারনামা দলিলের সকল তথ্য সম্পূর্ণ সত্য এবং বর্তমানে এই মোক্তারনামাটি আইনগতভাবে বহাল রয়েছে (বাতিল করা হয়নি)। কোনো অসত্য তথ্য পরিবেশন করলে তার জন্য আমি সম্পূর্ণ দায়ী থাকব।</label></div>
                    <div className="flex justify-end pt-4"><button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#000F9F] text-white font-bold px-10 py-3.5 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer disabled:opacity-50">{loading ? 'সাবমিট হচ্ছে...' : 'মোক্তারনামা আবেদন সাবমিট করুন'}</button></div>
                </form>
            </div>
        </div>
    );
};

export default Power_of_attorney;