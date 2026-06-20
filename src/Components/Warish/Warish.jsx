import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Warish = () => {
    // ----- মৃত ব্যক্তির তথ্য (ঠিকানা ও এনআইডি সহ) -----
    const [deceasedInfo, setDeceasedInfo] = useState({
        deceasedName: '',
        fatherName: '',
        motherName: '',
        deathDate: '',
        village: '',
        postOffice: '',
        upazila: '',
        district: '',
        ward: '',
        holdingNo: '',
        nid: ''
    });

    // ----- আবেদনকারীর তথ্য (নতুন ঠিকানা ও পিতা যোগ) -----
    const [applicantInfo, setApplicantInfo] = useState({
        applicantName: '',
        applicantFatherName: '',   // নতুন
        applicantNid: '',
        applicantMobile: '',
        applicantEmail: '',
        applicantVillage: '',      // নতুন
        applicantPostOffice: '',   // নতুন
        applicantUpazila: '',      // নতুন
        applicantDistrict: '',     // নতুন
        relationWithDeceased: 'পুত্র'
    });

    // ----- ইস্যুর তারিখ (নতুন) -----
    const [issueDate, setIssueDate] = useState(
        new Date().toISOString().split('T')[0] // আজকের তারিখ ডিফল্ট
    );

    // ----- ওয়ারিশদের তালিকা -----
    const [heirs, setHeirs] = useState([
        { name: '', age: '', relation: '', nidBirthCert: '' }
    ]);

    // ----- ফাইল -----
    const [files, setFiles] = useState({
        deathCertificateDoc: null,
        applicantNidDoc: null
    });

    // ----- হ্যান্ডলার -----
    const handleDeceasedChange = (e) => {
        const { name, value } = e.target;
        setDeceasedInfo({ ...deceasedInfo, [name]: value });
    };

    const handleApplicantChange = (e) => {
        const { name, value } = e.target;
        setApplicantInfo({ ...applicantInfo, [name]: value });
    };

    const addHeirRow = () => {
        setHeirs([...heirs, { name: '', age: '', relation: '', nidBirthCert: '' }]);
    };

    const removeHeirRow = (index) => {
        if (heirs.length > 1) {
            setHeirs(heirs.filter((_, i) => i !== index));
        }
    };

    const handleHeirChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...heirs];
        updated[index][name] = value;
        setHeirs(updated);
    };

    const handleFileChange = (e) => {
        const { name, files: f } = e.target;
        setFiles({ ...files, [name]: f[0] });
    };

    // ----- সাবমিট -----
    const handleSubmit = (e) => {
        e.preventDefault();

        // সব আবশ্যক ফিল্ড চেক (নতুন ফিল্ডসহ)
        const requiredDeceased = ['deceasedName', 'fatherName', 'motherName', 'deathDate', 'village', 'postOffice', 'upazila', 'district', 'ward', 'holdingNo', 'nid'];
        const missingDeceased = requiredDeceased.filter(field => !deceasedInfo[field]);

        const requiredApplicant = ['applicantName', 'applicantFatherName', 'applicantNid', 'applicantMobile', 'applicantEmail', 'applicantVillage', 'applicantPostOffice', 'applicantUpazila', 'applicantDistrict'];
        const missingApplicant = requiredApplicant.filter(field => !applicantInfo[field]);

        if (!issueDate) {
            Swal.fire('ত্রুটি', 'ইস্যুর তারিখ নির্বাচন করুন।', 'error');
            return;
        }

        if (missingDeceased.length > 0 || missingApplicant.length > 0) {
            Swal.fire('ত্রুটি', 'দয়া করে সকল আবশ্যক (*) চিহ্নিত ফিল্ড পূরণ করুন।', 'error');
            return;
        }

        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "আবেদনের সকল তথ্য সঠিক ও সত্য তো?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000F9F',
            cancelButtonText: 'বাতিল',
            confirmButtonText: 'হ্যাঁ, সাবমিট করুন!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const submissionData = {
                    deceasedInfo,
                    applicantInfo,
                    heirs,
                    files,
                    issueDate,
                    email: applicantInfo.applicantEmail
                };
                console.log('Submitting Data:', submissionData);
                // এখানে API কল করবেন
                Swal.fire('সফল!', 'আবেদনটি গৃহীত হয়েছে।', 'success');
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
                <h2 className="text-2xl font-extrabold text-center text-[#000F9F] mb-8">
                    ওয়ারিশ সনদপত্রের জন্য আবেদন
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* ===== মৃত ব্যক্তির বিবরণ ===== */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">মৃত ব্যক্তির বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold">নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="deceasedName" value={deceasedInfo.deceasedName} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">পিতা <span className="text-red-500">*</span></label>
                                <input required type="text" name="fatherName" value={deceasedInfo.fatherName} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">মাতা <span className="text-red-500">*</span></label>
                                <input required type="text" name="motherName" value={deceasedInfo.motherName} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">মৃত্যুর তারিখ <span className="text-red-500">*</span></label>
                                <input required type="date" name="deathDate" value={deceasedInfo.deathDate} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" name="village" value={deceasedInfo.village} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">ডাকঘর <span className="text-red-500">*</span></label>
                                <input required type="text" name="postOffice" value={deceasedInfo.postOffice} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">উপজেলা <span className="text-red-500">*</span></label>
                                <input required type="text" name="upazila" value={deceasedInfo.upazila} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">জেলা <span className="text-red-500">*</span></label>
                                <input required type="text" name="district" value={deceasedInfo.district} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">ওয়ার্ড <span className="text-red-500">*</span></label>
                                <input required type="text" name="ward" value={deceasedInfo.ward} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">হোল্ডিং নম্বর <span className="text-red-500">*</span></label>
                                <input required type="text" name="holdingNo" value={deceasedInfo.holdingNo} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold">এনআইডি <span className="text-red-500">*</span></label>
                                <input required type="number" name="nid" value={deceasedInfo.nid} onChange={handleDeceasedChange} className="w-full border p-2 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* ===== আবেদনকারীর তথ্য (সব ফিল্ডসহ) ===== */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">আবেদনকারীর বিবরণ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold">নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantName" value={applicantInfo.applicantName} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">পিতার নাম <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantFatherName" value={applicantInfo.applicantFatherName} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">এনআইডি <span className="text-red-500">*</span></label>
                                <input required type="number" name="applicantNid" value={applicantInfo.applicantNid} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">মোবাইল <span className="text-red-500">*</span></label>
                                <input required type="tel" name="applicantMobile" value={applicantInfo.applicantMobile} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">ইমেইল <span className="text-red-500">*</span></label>
                                <input required type="email" name="applicantEmail" value={applicantInfo.applicantEmail} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">মৃতের সাথে সম্পর্ক <span className="text-red-500">*</span></label>
                                <select required name="relationWithDeceased" value={applicantInfo.relationWithDeceased} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg">
                                    <option value="পুত্র">পুত্র</option>
                                    <option value="কন্যা">কন্যা</option>
                                    <option value="পিতা">পিতা</option>
                                    <option value="মাতা">মাতা</option>
                                    <option value="ভাই">ভাই</option>
                                    <option value="বোন">বোন</option>
                                    <option value="স্ত্রী">স্ত্রী</option>
                                    <option value="স্বামী">স্বামী</option>
                                    <option value="অন্যান্য">অন্যান্য</option>
                                </select>
                            </div>
                            {/* আবেদনকারীর ঠিকানা */}
                            <div>
                                <label className="block text-sm font-semibold">গ্রাম/মহল্লা <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantVillage" value={applicantInfo.applicantVillage} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">ডাকঘর <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantPostOffice" value={applicantInfo.applicantPostOffice} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">উপজেলা <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantUpazila" value={applicantInfo.applicantUpazila} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">জেলা <span className="text-red-500">*</span></label>
                                <input required type="text" name="applicantDistrict" value={applicantInfo.applicantDistrict} onChange={handleApplicantChange} className="w-full border p-2 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* ===== ইস্যুর তারিখ ===== */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">জন্ম তারিখ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold">জন্ম তারিখ <span className="text-red-500">*</span></label>
                                <input required type="date" name="issueDate" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="w-full border p-2 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* ===== ওয়ারিশদের তালিকা ===== */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">ওয়ারিশদের তালিকা</h3>
                        {heirs.map((heir, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-gray-50 p-3 rounded-lg mb-3">
                                <div>
                                    <label className="block text-sm font-semibold">নাম <span className="text-red-500">*</span></label>
                                    <input required type="text" name="name" value={heir.name} onChange={(e) => handleHeirChange(index, e)} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">বয়স <span className="text-red-500">*</span></label>
                                    <input required type="number" name="age" value={heir.age} onChange={(e) => handleHeirChange(index, e)} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">সম্পর্ক <span className="text-red-500">*</span></label>
                                    <input required type="text" name="relation" value={heir.relation} onChange={(e) => handleHeirChange(index, e)} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold">এনআইডি/জন্ম সনদ</label>
                                        <input type="text" name="nidBirthCert" value={heir.nidBirthCert} onChange={(e) => handleHeirChange(index, e)} className="w-full border p-2 rounded-lg" />
                                    </div>
                                    {heirs.length > 1 && (
                                        <button type="button" onClick={() => removeHeirRow(index)} className="mt-5 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addHeirRow} className="bg-[#000F9F] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                            + নতুন ওয়ারিশ যুক্ত করুন
                        </button>
                    </div>

                    {/* ===== ফাইল আপলোড ===== */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">প্রয়োজনীয় ডকুমেন্ট</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold">মৃত্যু সনদ (PDF/Image) <span className="text-red-500">*</span></label>
                                <input required type="file" name="deathCertificateDoc" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">আবেদনকারীর এনআইডি (PDF/Image) <span className="text-red-500">*</span></label>
                                <input required type="file" name="applicantNidDoc" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="w-full border p-2 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* ===== সাবমিট ===== */}
                    <button type="submit" className="w-full bg-[#000F9F] text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">
                        সাবমিট করুন
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Warish;