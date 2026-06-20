// src/components/CertificateModal/CertificateModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const CertificateModal = ({ isOpen, onClose, collectionName, docId }) => {
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && collectionName && docId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/certificate/${collectionName}/${docId}`)
        .then((res) => {
          setCertData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('API Error:', err.response || err);
          setError(err.response?.data?.error || 'সনদ ডেটা লোড করতে ব্যর্থ');
          setLoading(false);
        });
    }
  }, [isOpen, collectionName, docId]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const renderCertificate = () => {
    if (loading) return <div className="text-center py-8 text-gray-600">লোড হচ্ছে...</div>;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
    if (!certData) return null;

    const { application, certificateNo, unionInfo } = certData;

    // ======== নাম সহ সব ফিল্ড ========
    const name = application.ownerName ||      // TradeLicense
                 application.name ||
                 application.fullName ||
                 application.applicantName ||
                 'N/A';

    const father = application.fatherName || application.father || 'N/A';
    const mother = application.motherName || application.mother || null;
    const village = application.village || application.address || 'N/A';
    const postOffice = application.postOffice || 'N/A';
    const upazila = application.upazila || 'N/A';
    const district = application.district || 'N/A';
    const nid = application.nid || application.nidNumber || 'N/A';
    const email = application.email || application.applicantInfo?.applicantEmail || 'N/A';
    const mobile = application.mobile || application.applicantInfo?.applicantMobile || 'N/A';

    return (
      <div id="certificate-content" className="certificate-wrapper">
        <div className="certificate-card">
          {/* ===== ইউনিয়ন হেডার ===== */}
          <div className="union-header">
            <h1 className="union-name">{unionInfo.name}</h1>
            <p className="union-address">{unionInfo.address}</p>
            <div className="union-contact">
              <span>📧 {unionInfo.email}</span>
              <span>📞 {unionInfo.mobile}</span>
              <span>🌐 {unionInfo.website}</span>
            </div>
          </div>

          {/* ===== সনদ শিরোনাম ও নম্বর ===== */}
          <div className="certificate-title">
            <h2>🗂️ নাগরিক সনদপত্র</h2>
            <div className="certificate-number">
              <span className="label">সনদ নং:</span>
              <span className="number">{certificateNo}</span>
            </div>
          </div>

          {/* ===== তথ্য তালিকা ===== */}
          <div className="info-section">
            <div className="info-row"><span className="info-label">নাম:</span><span className="info-value">{name}</span></div>
            <div className="info-row"><span className="info-label">পিতা:</span><span className="info-value">{father}</span></div>
            {mother && mother !== 'N/A' && (
              <div className="info-row"><span className="info-label">মাতা:</span><span className="info-value">{mother}</span></div>
            )}
            <div className="info-row"><span className="info-label">গ্রাম/মহল্লা:</span><span className="info-value">{village}</span></div>
            <div className="info-row"><span className="info-label">ডাকঘর:</span><span className="info-value">{postOffice}</span></div>
            <div className="info-row"><span className="info-label">উপজেলা:</span><span className="info-value">{upazila}</span></div>
            <div className="info-row"><span className="info-label">জেলা:</span><span className="info-value">{district}</span></div>
            <div className="info-row"><span className="info-label">এনআইডি:</span><span className="info-value">{nid}</span></div>
            <div className="info-row"><span className="info-label">মোবাইল:</span><span className="info-value">{mobile}</span></div>
            <div className="info-row"><span className="info-label">ইমেইল:</span><span className="info-value">{email}</span></div>
            <div className="info-row"><span className="info-label">ইস্যুর তারিখ:</span><span className="info-value">{new Date().toLocaleDateString('bn-BD')}</span></div>
          </div>

          {/* ===== স্বাক্ষর ===== */}
          <div className="signature-section">
            <div className="signature-left">
              <p>সাক্ষী: __________________</p>
              <p className="signature-title">(সচিব)</p>
            </div>
            <div className="signature-right">
              <p>স্বাক্ষর: __________________</p>
              <p className="signature-title">(চেয়ারম্যান)</p>
            </div>
          </div>

          {/* ===== ফুটার ===== */}
          <div className="certificate-footer">
            <p>এই সনদটি ইউনিয়ন পরিষদ কর্তৃক জারি করা হয়েছে এবং এটি বৈধ।</p>
          </div>

          {/* ===== প্রিন্ট বাটন ===== */}
          <div className="print-button-container print-hidden">
            <button onClick={handlePrint} className="print-btn">🖨️ প্রিন্ট / ডাউনলোড (PDF)</button>
          </div>
        </div>

        {/* ========== CSS (আগের মতোই) ========== */}
        <style jsx>{`
          .certificate-wrapper {
            padding: 20px;
            background: #f0f4f8;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .certificate-card {
            max-width: 900px;
            width: 100%;
            background: #ffffff;
            padding: 40px 45px;
            border: 18px double #1e3a5f;
            outline: 3px solid #1e3a5f;
            outline-offset: -10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
          }
          .union-header {
            text-align: center;
            border-bottom: 3px solid #1e3a5f;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .union-name {
            font-size: 26px;
            font-weight: 700;
            color: #1e3a5f;
            margin: 0 0 4px 0;
            letter-spacing: 1px;
          }
          .union-address {
            font-size: 14px;
            color: #4a5568;
            margin: 0 0 8px 0;
          }
          .union-contact {
            display: flex;
            justify-content: center;
            gap: 18px;
            font-size: 13px;
            color: #2d3748;
            flex-wrap: wrap;
          }
          .union-contact span {
            background: #edf2f7;
            padding: 3px 14px;
            border-radius: 30px;
            font-weight: 500;
          }
          .certificate-title {
            text-align: center;
            margin-bottom: 22px;
          }
          .certificate-title h2 {
            font-size: 22px;
            font-weight: 700;
            color: #1e3a5f;
            margin: 0 0 10px 0;
            letter-spacing: 1px;
          }
          .certificate-number {
            display: inline-block;
            background: #ebf8ff;
            padding: 6px 24px;
            border-radius: 40px;
            border: 2px solid #3182ce;
            font-size: 16px;
            font-weight: 600;
          }
          .certificate-number .label {
            color: #2b6cb0;
          }
          .certificate-number .number {
            color: #1a365d;
            margin-left: 6px;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
          }
          .info-section {
            margin: 20px 0 28px 0;
            border: 1px solid #cbd5e0;
            border-radius: 12px;
            padding: 14px 22px;
            background: #f7fafc;
          }
          .info-row {
            display: flex;
            padding: 7px 0;
            border-bottom: 1px dashed #e2e8f0;
            font-size: 15px;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            width: 130px;
            font-weight: 600;
            color: #2d3748;
            flex-shrink: 0;
          }
          .info-value {
            color: #1a202c;
            font-weight: 500;
            word-break: break-word;
          }
          .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 28px;
            padding-top: 18px;
            border-top: 2px solid #cbd5e0;
          }
          .signature-left,
          .signature-right {
            text-align: center;
          }
          .signature-left p,
          .signature-right p {
            font-size: 14px;
            color: #2d3748;
            margin: 0;
            letter-spacing: 0.5px;
          }
          .signature-title {
            font-size: 12px !important;
            color: #718096 !important;
            margin-top: 4px !important;
          }
          .certificate-footer {
            margin-top: 18px;
            text-align: center;
            font-size: 13px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
            padding-top: 14px;
          }
          .print-button-container {
            text-align: center;
            margin-top: 24px;
          }
          .print-btn {
            background: #1e3a5f;
            color: white;
            border: none;
            padding: 12px 36px;
            border-radius: 40px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .print-btn:hover {
            background: #0f2a44;
          }

          @media print {
            .print-hidden { display: none !important; }
            .certificate-wrapper { padding: 0; background: white; min-height: auto; }
            .certificate-card {
              border: 18px double #1e3a5f !important;
              outline: 3px solid #1e3a5f !important;
              outline-offset: -10px !important;
              box-shadow: none !important;
              padding: 30px 35px !important;
              max-width: 100% !important;
            }
            .union-contact span { background: none !important; padding: 0 6px !important; }
            .info-section { border: 1px solid #ccc !important; background: white !important; }
            .signature-section { border-top: 2px solid #000 !important; }
            .certificate-footer { border-top: 1px solid #ccc !important; }
            body { background: white !important; margin: 0 !important; }
          }

          @media (max-width: 640px) {
            .certificate-card { padding: 20px !important; border-width: 10px !important; outline-offset: -6px !important; }
            .union-name { font-size: 20px; }
            .union-contact { flex-direction: column; gap: 4px; align-items: center; }
            .info-row { flex-direction: column; align-items: flex-start; padding: 5px 0; }
            .info-label { width: 100%; font-size: 13px; }
            .info-value { font-size: 14px; padding-left: 4px; }
            .signature-section { flex-direction: column; gap: 14px; }
            .certificate-title h2 { font-size: 18px; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative max-w-4xl w-full max-h-[95vh] overflow-y-auto bg-transparent">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white rounded-full p-2 shadow-lg z-10 print-hidden"
        >
          <FaTimes size={20} />
        </button>
        {renderCertificate()}
      </div>
    </div>
  );
};

export default CertificateModal;