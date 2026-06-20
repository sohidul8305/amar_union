import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';

const CertificateModal = ({ isOpen, onClose, application }) => {
  const certificateRef = useRef();
  const [certificateNo, setCertificateNo] = useState('');

  useEffect(() => {
    if (application?.certificateNo) {
      setCertificateNo(application.certificateNo);
    } else if (application) {
      // ব্যাকএন্ড থেকে certificateNo না এলে ফ্রন্টএন্ডে জেনারেট (টেম্পরারি)
      const year = new Date().getFullYear().toString();
      const upazilaCode = application.upazilaCode || '1234';
      const unionCode = application.unionCode || '5678';
      const serial = application.certificateSerial || '00001';
      setCertificateNo(`${year}${upazilaCode}${unionCode}${serial}`);
    }
  }, [application]);

  const handleDownloadPDF = async () => {
    const element = certificateRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`নাগরিক_সনদ_${certificateNo}.pdf`);
    } catch (error) {
      console.error(error);
      alert('পিডিএফ তৈরি ব্যর্থ হয়েছে');
    }
  };

  if (!isOpen || !application) return null;

  // ইউনিয়নের তথ্য (আবেদনকারীর ইউনিয়ন অনুযায়ী – আপনার ডাটাবেস থেকে আসবে)
  const unionName = application.unionName || '১৬ নং মোহলপুর ইউনিয়ন পরিষদ';
  const unionAddress = application.unionAddress || 'মোহলপুর, সিলিয়ার, কুড়িগ্রাম';
  const unionWebsite = 'https://mohanpurup.amarunion.com.bd';
  const unionEmail = 'feromito@gmail.com';
  const unionMobile = '০১৩১৮৩৭৭৯৩৩';

  // আবেদনকারীর তথ্য – সকল ফিল্ড নির্বাচন (fullData অথবা সরাসরি)
  const fullData = application.fullData || application;
  const applicantName = application.userName || fullData.applicantName || fullData.headName || fullData.ownerName || 'নাম নেই';
  const fatherName = fullData.fatherName || fullData.fatherHusbandName || fullData.applicantFatherName || 'N/A';
  const motherName = fullData.motherName || fullData.headInfo?.motherName || 'N/A';
  const village = fullData.village || fullData.currentVillage || fullData.applicantVillage || 'N/A';
  const ward = fullData.ward || fullData.currentWard || fullData.applicantWard || 'N/A';
  const postCode = fullData.postCode || fullData.currentPostCode || fullData.applicantPostCode || 'N/A';
  const postOffice = fullData.postOffice || fullData.currentPostOffice || fullData.applicantPostOffice || fullData.postOffice || 'N/A';
  const upazila = fullData.upazila || fullData.currentUpazila || fullData.applicantUpazila || 'N/A';
  const district = fullData.district || fullData.currentDistrict || fullData.applicantDistrict || 'N/A';
  const nid = fullData.nid || fullData.applicantNid || fullData.idNumber || 'N/A';
  const mobile = fullData.mobile || fullData.applicantMobile || 'N/A';
  const email = fullData.email || fullData.applicantEmail || 'N/A';
  const issueDate = fullData.issueDate || application.issueDate || new Date().toISOString().split('T')[0];

  const qrValue = `https://itvillage.gov.bd/verify?certificate=${certificateNo}`;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h3 className="text-xl font-bold">নাগরিক সনদপত্র</h3>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded">
              ⬇ পিডিএফ ডাউনলোড
            </button>
          </div>
          <div ref={certificateRef} className="bg-white border p-8 mx-auto" style={{ width: '800px', minHeight: '1100px' }}>
            {/* হেডার */}
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold text-green-900">{unionName}</h1>
              <p>{unionAddress}</p>
              <p>ওয়েব: {unionWebsite} | ইমেইল: {unionEmail} | মোবাইল: {unionMobile}</p>
              <h2 className="text-xl font-bold mt-3">নাগরিক সনদপত্র</h2>
            </div>

            {/* সনদ নং ও কিউআর */}
            <div className="flex justify-between items-start mt-6">
              <div>
                <p><strong>সনদ নং:</strong> {certificateNo}</p>
                <p><strong>জন্ম  তারিখ:</strong> {new Date(issueDate).toLocaleDateString('bn-BD')}</p>
              </div>
              <div className="border p-2 bg-gray-50 text-center">
                <QRCodeSVG value={qrValue} size={80} />
                <p className="text-xs mt-1">স্ক্যান করুন</p>
              </div>
            </div>

            {/* আবেদনকারীর সকল তথ্য */}
            <div className="mt-8">
              <h3 className="font-bold text-lg border-b inline-block">আবেদনকারীর বিবরণ</h3>
              <table className="w-full mt-4">
                <tbody>
                  <tr><td className="py-1 w-1/3"><strong>নাম</strong></td><td>: {applicantName}</td></tr>
                  <tr><td><strong>পিতার নাম</strong></td><td>: {fatherName}</td></tr>
                  <tr><td><strong>মাতার নাম</strong></td><td>: {motherName}</td></tr>
                  <tr><td><strong>গ্রাম/মহল্লা</strong></td><td>: {village}</td></tr>
                  <tr><td><strong>ডাকঘর</strong></td><td>: {postOffice}</td></tr>
                  <tr><td><strong>উপজেলা</strong></td><td>: {upazila}</td></tr>
                  <tr><td><strong>জেলা</strong></td><td>: {district}</td></tr>
                  <tr><td><strong>ওয়ার্ড নং</strong></td><td>: {ward}</td></tr>
                  <tr><td><strong>পোস্ট কোড</strong></td><td>: {postCode}</td></tr>
                  <tr><td><strong>জাতীয় পরিচয়পত্র (NID)</strong></td><td>: {nid}</td></tr>
                  <tr><td><strong>মোবাইল নম্বর</strong></td><td>: {mobile}</td></tr>
                  <tr><td><strong>ইমেইল ঠিকানা</strong></td><td>: {email}</td></tr>
                </tbody>
              </table>
            </div>

            {/* প্রত্যয়ন বার্তা */}
            <div className="mt-8 text-justify">
              <p>এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, উপর্যুক্ত ব্যক্তি {unionName}-এর {ward} নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। তাঁর প্রদত্ত তথ্য সঠিক বলে প্রমাণিত হয়েছে।</p>
            </div>

            {/* স্বাক্ষর */}
            <div className="mt-12 flex justify-end">
              <div className="text-center">
                <div className="w-40 h-16 border-b border-black"></div>
                <p>চেয়ারম্যান</p>
                <p>{unionName}</p>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-12 pt-4 border-t">
              এটি কম্পিউটার জেনারেটেড সনদ, স্বাক্ষর ছাড়াই বৈধ।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;