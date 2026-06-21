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
        .get(`https://amar-union-backend.vercel.app/api/certificate/${collectionName}/${docId}`)
        .then((res) => {
          console.log('API Response:', res.data); // ডিবাগ করার জন্য
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

  // ===== হেলপার ফাংশন: যেকোনো অবজেক্ট থেকে ফিল্ড বের করে =====
  const getField = (obj, keys, defaultValue = 'N/A') => {
    if (!obj) return defaultValue;
    for (let key of keys) {
      // nested path যেমন 'personalInfo.dob'
      if (key.includes('.')) {
        const parts = key.split('.');
        let val = obj;
        for (let part of parts) {
          if (val && val[part] !== undefined && val[part] !== null && val[part] !== '') {
            val = val[part];
          } else {
            val = undefined;
            break;
          }
        }
        if (val !== undefined && val !== null && val !== '' && val !== 'N/A') {
          return val;
        }
      } else {
        const val = obj[key];
        if (val !== undefined && val !== null && val !== '' && val !== 'N/A') {
          return val;
        }
      }
    }
    return defaultValue;
  };

  const renderCertificate = () => {
    if (loading) return <div className="text-center py-8 text-gray-600 text-lg">লোড হচ্ছে...</div>;
    if (error) return <div className="text-center py-8 text-red-600 text-lg">{error}</div>;
    if (!certData) return null;

    const { application, certificateNo, unionInfo } = certData;

    // ===== সব ফিল্ড এক্সট্রাক্ট =====
    const name = getField(application, ['ownerName', 'name', 'fullName', 'applicantName', 'userName'], 'N/A');
    const father = getField(application, ['fatherName', 'father'], 'N/A');
    const mother = getField(application, ['motherName', 'mother'], null);
    const village = getField(application, ['village', 'address', 'permanentAddress'], 'N/A');
    const postOffice = getField(application, ['postOffice', 'postoffice'], 'N/A');
    const upazila = getField(application, ['upazila', 'thana'], 'N/A');
    const district = getField(application, ['district', 'zilla'], 'N/A');
    const nid = getField(application, ['nid', 'nidNumber', 'nationalId'], 'N/A');
    const mobile = getField(application, ['mobile', 'phone', 'applicantInfo.applicantMobile'], 'N/A');
    const email = getField(application, ['email', 'applicantInfo.applicantEmail'], 'N/A');
    const religion = getField(application, ['religion'], 'ইসলাম');

    // ===== জন্ম তারিখ =====
    // application ও তার fullData থেকে খোঁজ
    let dob = getField(application, ['dob', 'dateOfBirth', 'birthDate', 'birthday'], null);
    if (!dob || dob === 'N/A') {
      if (application.fullData) {
        dob = getField(application.fullData, ['dob', 'dateOfBirth', 'birthDate', 'personalInfo.dob', 'personalInfo.dateOfBirth'], null);
      }
    }
    if (!dob || dob === 'N/A') dob = 'N/A';

    // ===== ইস্যুর তারিখ =====
    // IMPORTANT: ইস্যুর তারিখ হিসেবে জন্ম তারিখ ব্যবহার করা হবে (যেমন ইউজার চেয়েছে)
    let issueDateValue = dob; // ডিফল্ট জন্ম তারিখ
    // যদি আলাদা কোনো ইস্যু তারিখ ফিল্ড থাকে, তাহলে সেটা নেবে (কিন্তু ইউজার চাচ্ছে জন্ম তারিখই হোক)
    // তাই আমরা dob-ই ব্যবহার করছি
    const issueDate = issueDateValue !== 'N/A' ? issueDateValue : new Date().toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      era: 'narrow'
    });

    const fullAddress = `গ্রাম/মহল্লা: ${village}, ডাকঘর: ${postOffice}, উপজেলা: ${upazila}, জেলা: ${district}।`;

    return (
      <div id="certificate-content" className="certificate-wrapper">
        <div className="certificate-card border-pattern">
          
          <div className="inner-border">
            
            {/* ===== উন্নত ও স্পষ্ট সিল/ওয়াটারমার্ক (ব্যাকগ্রাউন্ড লোগো) ===== */}
            <div className="watermark-logo">
              <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* পিঙ্ক ব্যাকগ্রাউন্ড */}
                <circle cx="130" cy="130" r="105" fill="#fadbd8" />
                {/* সবুজ রিং (মোটা করা হয়েছে যাতে ভালো দেখা যায়) */}
                <circle cx="130" cy="130" r="120" stroke="#bde0c9" strokeWidth="12" />
                {/* ভেতরের সাদা রিং */}
                <circle cx="130" cy="130" r="115" stroke="#ffffff" strokeWidth="3" />
                <circle cx="130" cy="130" r="95" stroke="#ffffff" strokeWidth="3" />
                
                {/* গোলাপি/লাল তারা (4টি) */}
                <path d="M 130 15 L 133 25 L 143 25 L 135 32 L 138 42 L 130 37 L 122 42 L 125 32 L 117 25 L 127 25 Z" fill="#f1948a" />
                <path d="M 130 245 L 133 235 L 143 235 L 135 228 L 138 218 L 130 223 L 122 218 L 125 228 L 117 235 L 127 235 Z" fill="#f1948a" />
                <path d="M 245 130 L 235 127 L 235 117 L 228 125 L 218 122 L 223 130 L 218 138 L 228 135 L 235 143 L 235 133 Z" fill="#f1948a" />
                <path d="M 15 130 L 25 133 L 25 143 L 32 135 L 42 138 L 37 130 L 42 122 L 32 125 L 25 117 L 25 127 Z" fill="#f1948a" />

                {/* বৃত্তাকার পাঠ্য */}
                <path id="textPathTop" d="M 130 25 A 105 105 0 0 1 130 235" fill="none" />
                <text fontFamily="'Kalpurush', 'SolaimanLipi', sans-serif" fontSize="16" fill="#9bcbae" fontWeight="bold">
                  <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</textPath>
                </text>

                {/* বাংলাদেশের মানচিত্র (হলুদ) */}
                <path d="M148 118 L165 108 L182 115 L190 132 L185 155 L175 168 L188 188 L175 202 L160 196 L145 185 L130 165 L138 145 Z" fill="#f9e79f" transform="translate(-20, -10)" />
              </svg>
            </div>

            {/* ===== হেডার ===== */}
            <div className="header-section">
              <div className="logo-container">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg"
                  alt="Govt Logo"
                  className="govt-logo"
                />
              </div>
              <div className="header-text-container">
                <p className="govt-text">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
                <h1 className="union-name">{unionInfo.name}</h1>
                <p className="union-address">{unionInfo.address}</p>
                <p className="union-contact">ওয়েব সাইট : {unionInfo.website || 'N/A'}</p>
                <p className="union-contact">ই-মেইল : {unionInfo.email || 'N/A'}</p>
                <p className="union-contact">মোবাইল : {unionInfo.mobile || 'N/A'}</p>
              </div>
              <div className="logo-container hidden-space"></div>
            </div>

            {/* ===== সনদ শিরোনাম ===== */}
            <div className="certificate-title-box">
              <span className="title-badge">নাগরিক সনদপত্র</span>
            </div>

            {/* ===== সনদ নম্বর ও তারিখ ===== */}
            <div className="meta-info-row">
              <div className="cert-no-container">
                <span className="cert-label">সনদ নং :</span>
                <div className="digit-boxes">
                  {String(certificateNo || '00000000000000000')
                    .split('')
                    .map((char, index) => (
                      <span key={index} className="digit-box">{char}</span>
                    ))}
                </div>
              </div>
              <div className="date-text">
                তারিখ: {issueDate}
              </div>
            </div>

            {/* ===== বডি ===== */}
            <div className="body-content">
              <p className="intro-text">এই মর্মে প্রত্যয়ন করা যাইতেছে যে ,</p>

              <table className="info-table">
                <tbody>
                  <tr>
                    <td className="info-label">নাম</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{name}</td>
                  </tr>
                  <tr>
                    <td className="info-label">পিতার নাম</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{father}</td>
                  </tr>
                  {mother && mother !== 'N/A' && (
                    <tr>
                      <td className="info-label">মাতার নাম</td>
                      <td className="info-colon">:</td>
                      <td className="info-val">{mother}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="info-label">বর্তমান ঠিকানা</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{fullAddress}</td>
                  </tr>
                  <tr>
                    <td className="info-label">স্থায়ী ঠিকানা</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{fullAddress}</td>
                  </tr>
                  <tr>
                    <td className="info-label">জাতীয় পরিচয়পত্র</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{nid}</td>
                  </tr>
                  <tr>
                    <td className="info-label">মোবাইল</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{mobile}</td>
                  </tr>
                  <tr>
                    <td className="info-label">ইমেইল</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{email}</td>
                  </tr>
                  <tr>
                    <td className="info-label">ধর্ম</td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{religion}</td>
                  </tr>
                  <tr>
                    <td className="info-label">জন্ম তারিখ </td>
                    <td className="info-colon">:</td>
                    <td className="info-val">{issueDate}</td>
                  </tr>
                </tbody>
              </table>

              <p className="paragraph-text">
                অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা। তিনি জন্মগত ভাবে বাংলাদেশী এবং আমার পরিচিত। তাহার স্বভাব চরিত্র ভালো। আমার জানামতে তিনি বাংলাদেশের আইন-শৃঙ্খলা ও রাষ্ট্র বিরোধী বা অপরাধমূলক কোন কাজে জড়িত নন। তিনি জন্মসূত্রে বাংলাদেশী।
              </p>
              <p className="paragraph-text mt-3">
                আমি তাহার সর্বাঙ্গীণ মঙ্গল ও উন্নতি কামনা করি।
              </p>
            </div>

            {/* ===== স্বাক্ষর ===== */}
            <div className="signature-area">
              <div className="signature-box">
                <div className="sig-line"></div>
                <p>চেয়ারম্যানের স্বাক্ষর</p>
              </div>
            </div>

            {/* ===== ফুটার ===== */}
            <div className="footer-area">
              <div className="qr-box">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CertificateNo:${certificateNo}`}
                  alt="QR Code"
                  className="qr-img"
                />
                <p className="dev-credit">Developed by IT Village<br />www.itvillagecu.com</p>
              </div>
              <div className="instructions-box">
                <p className="inst-title">নির্দেশাবলী:</p>
                <p>১) সার্টিফিকেট টি ১৭ ডিজিটের সনদ নম্বর দিয়ে ওয়েবসাইট থেকে যাচাই করুন অথবা QRcode টি Scan করুন</p>
                <p>২) যে কোন ধরনের তথ্য নেয়ার জন্য ফোন করুন অথবা ইমেইল করুন।</p>
              </div>
            </div>

            <div className="footer-bottom-line">
              <span>{unionInfo.name} - Email: {unionInfo.email}</span>
            </div>
          </div>
        </div>

        {/* ===== প্রিন্ট বাটন ===== */}
        <div className="print-button-container print-hidden">
          <button onClick={handlePrint} className="print-btn">🖨️ প্রিন্ট / ডাউনলোড (PDF)</button>
        </div>

        {/* ========== CSS (ফুলের প্যাটার্ন আরও ছোট করা হয়েছে & লোগো আরও পরিষ্কার করা হয়েছে) ========== */}
        <style jsx>{`
          .certificate-wrapper {
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            justify-content: center;
          }

/* মেইন বর্ডার ডিজাইন (অত্যন্ত ছোট ও সূক্ষ্ম প্যাটার্ন) */
.border-pattern {
  padding: 16px; /* বর্ডার ও সাদা জায়গার ব্যবধান */
  position: relative;
  max-width: 850px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-family: 'Kalpurush', 'SolaimanLipi', sans-serif;
  
  /* হুবহু ছোট ছোট ফুলের প্যাটার্ন (সাইজ ২০px) */
  background-color: #1b5e20;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="%231b5e20"/><path d="M10 4 L12 10 L10 16 L8 10 Z" fill="%23ffffff"/><circle cx="4" cy="4" r="2" fill="%23ffffff"/><circle cx="16" cy="4" r="2" fill="%23ffffff"/><circle cx="4" cy="16" r="2" fill="%23ffffff"/><circle cx="16" cy="16" r="2" fill="%23ffffff"/></svg>');
  background-size: 20px 20px;
}

/* ভেতরের ডাবল লাইনের বর্ডার */
.inner-border {
  position: relative; /* ভেতরের ওয়াটারমার্কের জন্য অত্যন্ত গুরুত্বপূর্ণ */
  border: 3px solid #1b5e20; /* ভেতরের সবুজ লাইন */
  padding: 40px;
  min-height: 800px;
  background: #ffffff;
  z-index: 2;
  outline: 2px solid #1b5e20; /* বাইরের সবুজ লাইন */
  outline-offset: -10px;
}

/* ===== ব্যাকগ্রাউন্ডের সিল/লোগো (স্বচ্ছতা বাড়িয়ে পরিষ্কার করা হয়েছে) ===== */
.watermark-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.25; /* স্বচ্ছতা 0.14 থেকে বাড়িয়ে 0.25 করা হয়েছে */
  z-index: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.watermark-logo svg {
  width: 260px;
  height: 260px;
}

          .header-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            position: relative;
            z-index: 2;
          }
          .logo-container {
            width: 100px;
          }
          .hidden-space {
            opacity: 0;
          }
          .govt-logo {
            width: 85px;
            height: auto;
          }
          .header-text-container {
            text-align: center;
            flex-grow: 1;
          }
          .govt-text {
            color: #2e7d32;
            font-size: 15px;
            font-weight: bold;
            margin: 0;
          }
          .union-name {
            color: #1b5e20;
            font-size: 26px;
            font-weight: bold;
            margin: 5px 0;
          }
          .union-address {
            color: #000;
            font-size: 15px;
            margin: 0 0 5px 0;
          }
          .union-contact {
            color: #333;
            font-size: 13px;
            margin: 2px 0;
          }
          .certificate-title-box {
            text-align: center;
            margin: 20px 0;
            position: relative;
            z-index: 2;
          }
          .title-badge {
            background-color: #1b5e20;
            color: #fff;
            padding: 6px 25px;
            border-radius: 20px;
            font-size: 18px;
            font-weight: bold;
          }
          .meta-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
            z-index: 2;
          }
          .cert-no-container {
            display: flex;
            align-items: center;
            border: 2px solid #000;
            padding: 0;
          }
          .cert-label {
            padding: 4px 10px;
            font-weight: bold;
            border-right: 2px solid #000;
          }
          .digit-boxes {
            display: flex;
          }
          .digit-box {
            padding: 4px 8px;
            border-right: 1px solid #000;
            font-weight: bold;
            font-family: 'Courier New', Courier, monospace;
          }
          .digit-box:last-child {
            border-right: none;
          }
          .date-text {
            font-weight: bold;
            font-size: 15px;
          }
          .body-content {
            position: relative;
            z-index: 2;
            font-size: 16px;
            color: #000;
            line-height: 1.5;
          }
          .intro-text {
            font-weight: bold;
            margin-bottom: 15px;
          }
          .info-table {
            width: 100%;
            margin-bottom: 25px;
            border-collapse: collapse;
          }
          .info-table td {
            padding: 5px 0;
            vertical-align: top;
          }
          .info-label {
            width: 160px;
            padding-left: 30px !important;
          }
          .info-colon {
            width: 20px;
            text-align: center;
          }
          .info-val {
            font-weight: bold;
          }
          .paragraph-text {
            text-align: justify;
            margin: 0;
            padding: 0 10px;
          }
          .mt-3 {
            margin-top: 15px;
          }
          .signature-area {
            display: flex;
            justify-content: flex-end;
            margin-top: 50px;
            margin-bottom: 30px;
            position: relative;
            z-index: 2;
          }
          .signature-box {
            text-align: center;
            width: 200px;
          }
          .sig-line {
            border-top: 1px solid #000;
            margin-bottom: 5px;
          }
          .signature-box p {
            margin: 0;
            font-weight: bold;
            font-size: 14px;
          }
          .footer-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 10px 0;
            position: relative;
            z-index: 2;
          }
          .qr-box {
            width: 120px;
            text-align: center;
          }
          .qr-img {
            width: 80px;
            height: 80px;
            margin-bottom: 5px;
          }
          .dev-credit {
            font-size: 8px;
            color: #555;
            margin: 0;
            line-height: 1.2;
          }
          .instructions-box {
            flex-grow: 1;
            padding-left: 20px;
          }
          .inst-title {
            font-weight: bold;
            margin: 0 0 5px 0;
            font-size: 13px;
          }
          .instructions-box p {
            margin: 0;
            font-size: 12px;
            line-height: 1.4;
          }
          .footer-bottom-line {
            text-align: center;
            font-size: 11px;
            margin-top: 5px;
            color: #555;
            position: relative;
            z-index: 2;
          }
          .print-button-container {
            text-align: center;
            margin-top: 20px;
          }
          .print-btn {
            background: #1b5e20;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .print-btn:hover {
            background: #0f4a14;
          }
          @media print {
            .print-hidden { display: none !important; }
            .certificate-wrapper { padding: 0; display: block; min-height: auto; justify-content: flex-start; }
            .border-pattern {
              box-shadow: none !important;
              max-width: 100% !important;
              padding: 12px !important;
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="%231b5e20"/><path d="M10 4 L12 10 L10 16 L8 10 Z" fill="%23ffffff"/><circle cx="4" cy="4" r="2" fill="%23ffffff"/><circle cx="16" cy="4" r="2" fill="%23ffffff"/><circle cx="4" cy="16" r="2" fill="%23ffffff"/><circle cx="16" cy="16" r="2" fill="%23ffffff"/></svg>') !important;
              background-size: 20px 20px !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .watermark-logo {
              opacity: 0.25 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .title-badge {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body { margin: 0; background: white; }
            @page { size: A4; margin: 10mm; }
          }
          @media (max-width: 640px) {
            .certificate-wrapper { padding: 10px; }
            .border-pattern { padding: 6px; background-size: 20px 20px !important; }
            .inner-border { padding: 16px 18px; min-height: 600px; outline-offset: -8px; }
            .header-section { flex-direction: column; align-items: center; }
            .logo-container { width: 60px; }
            .govt-logo { width: 60px; }
            .hidden-space { display: none; }
            .union-name { font-size: 20px; }
            .govt-text { font-size: 13px; }
            .union-address { font-size: 13px; }
            .union-contact { font-size: 11px; }
            .title-badge { font-size: 15px; padding: 4px 18px; }
            .meta-info-row { flex-direction: column; align-items: flex-start; gap: 10px; }
            .cert-no-container { flex-wrap: wrap; }
            .digit-box { padding: 2px 4px; font-size: 12px; }
            .cert-label { font-size: 13px; padding: 2px 8px; }
            .date-text { font-size: 13px; }
            .info-label { width: 110px !important; padding-left: 10px !important; font-size: 14px; }
            .info-val { font-size: 14px; }
            .paragraph-text { font-size: 14px; padding: 0 4px; }
            .signature-area { justify-content: center; margin-top: 30px; }
            .signature-box { width: 150px; }
            .footer-area { flex-direction: column; align-items: center; gap: 10px; }
            .qr-box { width: 100%; }
            .instructions-box { padding-left: 0; text-align: center; }
            .instructions-box p { font-size: 11px; }
            .footer-bottom-line { font-size: 10px; }
            .print-btn { font-size: 14px; padding: 8px 20px; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center print:block">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 bg-white rounded-full p-2 shadow-lg z-20 print-hidden"
        >
          <FaTimes size={24} />
        </button>
        <div className="w-full h-full overflow-y-auto flex items-start justify-center py-8 print:py-0">
          {renderCertificate()}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;