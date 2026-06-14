import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { FaDownload, FaTimes, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CertificateModal = ({ isOpen, onClose, application }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const certificateRef = useRef(null);

  if (!isOpen || !application) return null;

  // আবেদনের তথ্য থেকে প্রয়োজনীয় ডাটা বের করা
  const fullData = application.fullData || {};
  
  // ইউজার ইনফরমেশন (fullData থেকে নেয়া, না থাকলে application থেকে)
  const userName = fullData.userFullName || application.userName || 'N/A';
  const fatherName = fullData.fatherName || 'N/A';
  const motherName = fullData.motherName || 'N/A';
  const dateOfBirth = fullData.dateOfBirth || 'N/A';
  const address = fullData.address || fullData.permanentAddress || 'N/A';
  const unionName = fullData.unionName || 'N/A';
  const upazilaCode = fullData.upazilaCode || '0000';
  const unionCode = fullData.unionCode || '0000';
  
  // সাল নির্ধারণ (আবেদনের সাল অথবা বর্তমান বছর)
  const year = application.submittedAt 
    ? new Date(application.submittedAt).getFullYear().toString()
    : new Date().getFullYear().toString();

  // সনদ নাম্বার জেনারেট
  const generateCertificateNumber = (serial) => {
    const paddedSerial = serial.padStart(5, '0');
    return `${year}${upazilaCode}${unionCode}${paddedSerial}`;
  };

  const handleGenerate = () => {
    if (!serialNumber || serialNumber.length > 5 || !/^\d+$/.test(serialNumber)) {
      toast.error('অনুগ্রহ করে ৫ ডিজিটের একটি সিরিয়াল নম্বর দিন (শুধু সংখ্যা)');
      return;
    }
    const certNum = generateCertificateNumber(serialNumber);
    setCertificateNumber(certNum);
    setGenerated(true);
    toast.success('সনদ প্রস্তুত!');
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // উচ্চ রেজোলিউশনের জন্য
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `certificate_${certificateNumber}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success('সনদ ডাউনলোড শুরু হয়েছে');
    } catch (error) {
      console.error(error);
      toast.error('ডাউনলোড ব্যর্থ, আবার চেষ্টা করুন');
    } finally {
      setDownloading(false);
    }
  };

  // QR কোডের লিংক (itvillage পেজে নেবে)
  const qrUrl = 'https://itvillage.com.bd';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* হেডার */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">নাগরিক সনদ</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        {/* কন্টেন্ট */}
        <div className="p-6">
          {/* সিরিয়াল ইনপুট সেকশন (যদি জেনারেট না করা হয়) */}
          {!generated ? (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                সনদ সিরিয়াল নম্বর (৫ ডিজিট) দিন:
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  maxLength="5"
                  pattern="\d*"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="যেমন: 00001"
                />
                <button
                  onClick={handleGenerate}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  সনদ তৈরি করুন
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                নোট: সিরিয়াল নম্বর আপনার ইচ্ছামত বসাতে পারবেন। এটি সনদ নম্বরের শেষ ৫ ডিজিট হবে।
              </p>
            </div>
          ) : (
            <div className="mb-4 flex justify-end">
              <button
                onClick={downloadCertificate}
                disabled={downloading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {downloading ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                ডাউনলোড (PNG)
              </button>
            </div>
          )}

          {/* সনদ ডিজাইন */}
          {generated && (
            <div ref={certificateRef} className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md">
              {/* হেডার */}
              <div className="text-center border-b pb-4 mb-4">
                <h1 className="text-3xl font-bold text-green-800">গণপ্রজাতন্ত্রী বাংলাদেশ</h1>
                <h2 className="text-xl font-semibold mt-1">নাগরিক সনদ</h2>
                <p className="text-sm text-gray-600">Citizenship Certificate</p>
              </div>

              {/* ইউনিয়ন পরিষদের নাম */}
              <div className="text-center mb-6">
                <p className="text-lg font-medium">ইউনিয়ন পরিষদ: {unionName}</p>
                <p className="text-sm text-gray-500">সরকারি নিবন্ধন সনদ</p>
              </div>

              {/* তথ্য */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-semibold">আবেদনকারীর নাম :</span>
                  <span>{userName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-semibold">পিতার নাম :</span>
                  <span>{fatherName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-semibold">মাতার নাম :</span>
                  <span>{motherName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-semibold">জন্ম তারিখ :</span>
                  <span>{dateOfBirth}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-semibold">স্থায়ী ঠিকানা :</span>
                  <span>{address}</span>
                </div>
              </div>

              {/* সনদ নম্বর ও QR */}
              <div className="grid grid-cols-2 gap-4 items-center mt-6 pt-4 border-t">
                <div>
                  <p className="text-sm font-bold text-gray-700">সনদ নম্বর :</p>
                  <p className="text-lg font-mono font-bold text-green-700">{certificateNumber}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    [ সাল {year} | উপজেলা কোড {upazilaCode} | ইউনিয়ন কোড {unionCode} | সিরিয়াল {serialNumber.padStart(5,'0')} ]
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="text-center">
                    <QRCodeSVG value={qrUrl} size={80} />
                    <p className="text-xs mt-1">Scan me</p>
                  </div>
                </div>
              </div>

              {/* ফুটার */}
              <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm text-gray-600">
                <div>
                  <p>ইউনিয়ন পরিষদ চেয়ারম্যান</p>
                  <p className="text-xs">স্বাক্ষর ও সিল সহ</p>
                </div>
                <div>
                  <p>তারিখ: {new Date().toLocaleDateString('bn-BD')}</p>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 mt-4">
                * এই সনদটি কম্পিউটার দ্বারা জারিকৃত, স্বাক্ষর ছাড়াই বৈধ *
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;