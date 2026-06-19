import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Remarriage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    husbandName: '',
    dateOfBirth: '',
    // নতুন ফিল্ডসমূহ
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
    mobile: '',
    email: '',
    nid: '',
    address: '',
    maritalStatus: '',
    issueDate: '',
    declaration: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [certificateId, setCertificateId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ফিল্ড ভ্যালিডেশন
    const required = [
      'fullName', 'fatherName', 'motherName', 'dateOfBirth',
      'village', 'postOffice', 'upazila', 'district', 'mobile', 'email', 'nid',
      'address', 'maritalStatus', 'issueDate', 'declaration'
    ];
    const missing = required.filter(f => !formData[f]);
    if (missing.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'তথ্য অসম্পূর্ণ!',
        text: 'দয়া করে সব তথ্য পূরণ করুন এবং ঘোষণায় টিক দিন।',
        confirmButtonColor: '#000F9F'
      });
      return;
    }

    // কনফার্মেশন ডায়ালগ
    const confirmResult = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'আপনার পুনঃ বিবাহ না হওয়ার সনদের আবেদন জমা দিতে চান?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000F9F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'হ্যাঁ, জমা দিন',
      cancelButtonText: 'বাতিল'
    });
    if (!confirmResult.isConfirmed) return;

    Swal.fire({
      title: 'আবেদন জমা হচ্ছে...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const submissionData = {
      ...formData,
      submittedAt: new Date(),
      status: 'Pending'
    };

    try {
      const response = await fetch('http://localhost:5000/api/remarriage-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const data = await response.json();

      if (data.success) {
        setCertificateId(data.certificateId);
        Swal.fire({
          icon: 'success',
          title: 'আবেদন সফলভাবে গৃহীত হয়েছে!',
          text: `আপনার ট্র্যাকিং আইডি: ${data.certificateId}`,
          confirmButtonColor: '#000F9F'
        });
        setSubmitted(true);
        setCertificateGenerated(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(data.message || 'সাবমিট ব্যর্থ');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'দুঃখিত!',
        text: 'সার্ভার বা নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।',
        confirmButtonColor: '#000F9F'
      });
    }
  };

  const handleDownload = () => {
    Swal.fire({
      icon: 'info',
      title: 'ডাউনলোড শুরু হচ্ছে...',
      text: 'আপনার সনদ ডাউনলোডের জন্য প্রস্তুত হচ্ছে।',
      confirmButtonColor: '#000F9F'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rem-page">
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .rem-page { font-family: 'Segoe UI', 'Roboto', 'Noto Sans Bengali', sans-serif; background: linear-gradient(145deg, #f0f4fa 0%, #e2e8f0 100%); min-height: 100vh; padding: 2rem 1rem; }
        .rem-container { max-width: 1280px; margin: 0 auto; }
        .rem-header { text-align: center; margin-bottom: 2.5rem; }
        .rem-header h1 { font-size: 2.5rem; color: #1e3a5f; margin-bottom: 0.5rem; }
        .rem-header p { font-size: 1.1rem; color: #2c5282; max-width: 650px; margin: 0 auto; }
        .rem-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem; }
        .rem-card { background: white; border-radius: 1.5rem; box-shadow: 0 20px 30px -12px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
        .rem-card:hover { transform: translateY(-4px); box-shadow: 0 25px 35px -14px rgba(0,0,0,0.15); }
        .rem-card-header { background: #1e3a5f; color: white; padding: 1.25rem 1.5rem; }
        .rem-card-header h2 { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .rem-card-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-weight: 600; color: #2d3748; margin-bottom: 0.4rem; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e0; border-radius: 0.75rem; font-size: 1rem; transition: all 0.2s; font-family: inherit; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #1e3a5f; box-shadow: 0 0 0 3px rgba(30,58,95,0.2); }
        .checkbox-group { display: flex; align-items: flex-start; gap: 0.75rem; margin: 1rem 0; }
        .checkbox-group input { margin-top: 0.2rem; transform: scale(1.2); flex-shrink: 0; }
        .checkbox-group label { font-weight: normal; margin-bottom: 0; }
        .btn-primary { background: #1e3a5f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 2rem; font-weight: 600; font-size: 1rem; cursor: pointer; width: 100%; transition: background 0.2s; }
        .btn-primary:hover { background: #0f2a44; }
        .certificate-preview { background: #fffef7; border: 2px dashed #6b9bc0; border-radius: 1rem; padding: 1.5rem; margin-top: 1rem; text-align: center; }
        .certificate-preview h3 { color: #1e3a5f; margin-bottom: 0.5rem; }
        .certificate-details { text-align: left; margin: 1rem 0; border-top: 1px solid #eee; padding-top: 1rem; }
        .certificate-line { margin: 0.5rem 0; font-size: 0.95rem; display: flex; flex-wrap: wrap; }
        .certificate-label { font-weight: 700; min-width: 150px; }
        .button-group { display: flex; gap: 1rem; justify-content: center; margin-top: 1.2rem; flex-wrap: wrap; }
        .btn-outline { background: transparent; border: 2px solid #1e3a5f; color: #1e3a5f; padding: 0.5rem 1.2rem; border-radius: 2rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.95rem; }
        .btn-outline:hover { background: #1e3a5f; color: white; }
        .success-message { background: #d1ecf1; color: #0c5460; padding: 0.75rem; border-radius: 0.75rem; margin-top: 1rem; text-align: center; font-weight: 500; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1rem; }
        .info-card { background: white; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .info-card h3 { color: #1e3a5f; margin-bottom: 0.75rem; font-size: 1.2rem; }
        .info-card ul { list-style-position: inside; color: #4a5568; padding-left: 0.5rem; }
        .info-card li { margin-bottom: 0.5rem; }
        .fee-amount { font-size: 1.5rem; font-weight: 700; color: #1e3a5f; margin: 0.5rem 0; }
        .rem-footer { text-align: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #cbd5e0; color: #4a5568; font-size: 0.9rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 768px) { 
          .rem-page { padding: 1rem; } 
          .rem-header h1 { font-size: 1.8rem; } 
          .rem-grid { grid-template-columns: 1fr; gap: 1.5rem; } 
          .info-grid { grid-template-columns: 1fr; gap: 1rem; } 
          .certificate-label { min-width: 120px; } 
          .form-row { grid-template-columns: 1fr; gap: 0.75rem; }
        }
        @media (max-width: 480px) { 
          .rem-header h1 { font-size: 1.5rem; } 
          .rem-card-body { padding: 1rem; } 
          .btn-primary, .btn-outline { padding: 0.5rem 1rem; font-size: 0.9rem; } 
          .certificate-label { min-width: 100px; font-size: 0.85rem; }
        }
        @media print { 
          .rem-page { background: white; padding: 0; } 
          .rem-header, .form-group, .btn-primary, .button-group, .info-grid, .rem-footer, .rem-card-header { display: none; } 
          .rem-grid { grid-template-columns: 1fr; gap: 0; } 
          .certificate-preview { border: none; box-shadow: none; padding: 0; } 
          .rem-card { box-shadow: none; } 
          .certificate-details { margin-top: 0; }
        }
      `}</style>

      <div className="rem-container">
        <div className="rem-header">
          <h1>📜 পুনঃ বিবাহ না হওয়ার সনদ</h1>
          <p>নিম্নলিখিত তথ্য সঠিক ও সত্য বলে ঘোষণা করে এই সনদ প্রদান করা হচ্ছে</p>
        </div>

        <div className="rem-grid">
          {/* আবেদন ফর্ম */}
          <div className="rem-card">
            <div className="rem-card-header">
              <h2>📝 আবেদন ফর্ম</h2>
            </div>
            <div className="rem-card-body">
              <form onSubmit={handleSubmit}>
                {/* নাম, পিতা, মাতা */}
                <div className="form-row">
                  <div className="form-group">
                    <label>পূর্ণ নাম *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="আপনার নাম" required />
                  </div>
                  <div className="form-group">
                    <label>পিতার নাম *</label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="পিতার নাম" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>মাতার নাম *</label>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="মাতার নাম" required />
                  </div>
                  <div className="form-group">
                    <label>প্রাক্তন স্বামীর নাম (যদি প্রযোজ্য)</label>
                    <input type="text" name="husbandName" value={formData.husbandName} onChange={handleChange} placeholder="স্বামীর নাম" />
                  </div>
                </div>

                {/* জন্ম তারিখ, এনআইডি, মোবাইল, ইমেইল */}
                <div className="form-row">
                  <div className="form-group">
                    <label>জন্ম তারিখ *</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>এনআইডি নম্বর *</label>
                    <input type="text" name="nid" value={formData.nid} onChange={handleChange} placeholder="জাতীয় পরিচয়পত্র" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>মোবাইল নম্বর *</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="01XXXXXXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>ইমেইল ঠিকানা *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="আপনার ইমেইল" required />
                  </div>
                </div>

                {/* ঠিকানা: গ্রাম, ডাকঘর, উপজেলা, জেলা */}
                <div className="form-row">
                  <div className="form-group">
                    <label>গ্রাম/মহল্লা *</label>
                    <input type="text" name="village" value={formData.village} onChange={handleChange} placeholder="গ্রাম/মহল্লা" required />
                  </div>
                  <div className="form-group">
                    <label>ডাকঘর *</label>
                    <input type="text" name="postOffice" value={formData.postOffice} onChange={handleChange} placeholder="ডাকঘর" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>উপজেলা *</label>
                    <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} placeholder="উপজেলা" required />
                  </div>
                  <div className="form-group">
                    <label>জেলা *</label>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="জেলা" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>বিস্তারিত ঠিকানা (বাড়ি/রাস্তা) *</label>
                  <textarea name="address" rows="2" value={formData.address} onChange={handleChange} placeholder="বাড়ি নম্বর, রাস্তা, প্রয়োজনীয় বিবরণ" required />
                </div>

                {/* বৈবাহিক অবস্থা ও ইস্যুর তারিখ */}
                <div className="form-row">
                  <div className="form-group">
                    <label>বর্তমান বৈবাহিক অবস্থা *</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                      <option value="">নির্বাচন করুন</option>
                      <option value="বিধবা">বিধবা</option>
                      <option value="তালাকপ্রাপ্তা">তালাকপ্রাপ্তা</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>ইস্যুর তারিখ *</label>
                    <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
                  </div>
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required />
                  <label>
                    আমি ঘোষণা করছি যে, আমার স্বামী/প্রাক্তন স্বামী মৃত্যুবরণ করেছেন অথবা আমাদের মধ্যে তালাক হয়েছে এবং আমি এখনও পুনরায় বিবাহ করিনি। উপরোক্ত তথ্যগুলো সম্পূর্ণ সত্য।
                  </label>
                </div>

                <button type="submit" className="btn-primary">সনদের আবেদন জমা দিন</button>
                {submitted && (
                  <div className="success-message">
                    ✅ আপনার আবেদন প্রক্রিয়াধীন। নিচে সনদের প্রিভিউ দেখুন।
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* সনদ প্রিভিউ */}
          <div className="rem-card">
            <div className="rem-card-header">
              <h2>🖺 সনদের নমুনা / প্রিভিউ</h2>
            </div>
            <div className="rem-card-body">
              {certificateGenerated && formData.fullName ? (
                <div className="certificate-preview">
                  <h3>পুনঃ বিবাহ না হওয়ার সনদ</h3>
                  <p>এই সনদটি সরকারি বিধি অনুযায়ী জারি করা হয়েছে</p>
                  <div className="certificate-details">
                    <div className="certificate-line"><span className="certificate-label">সিরিয়াল নং:</span> {certificateId || 'RMD-' + Math.floor(Math.random() * 100000)}</div>
                    <div className="certificate-line"><span className="certificate-label">নাম:</span> {formData.fullName}</div>
                    <div className="certificate-line"><span className="certificate-label">পিতা:</span> {formData.fatherName}</div>
                    <div className="certificate-line"><span className="certificate-label">মাতা:</span> {formData.motherName}</div>
                    {formData.husbandName && <div className="certificate-line"><span className="certificate-label">প্রাক্তন স্বামী:</span> {formData.husbandName}</div>}
                    <div className="certificate-line"><span className="certificate-label">জন্ম তারিখ:</span> {formData.dateOfBirth}</div>
                    <div className="certificate-line"><span className="certificate-label">এনআইডি:</span> {formData.nid}</div>
                    <div className="certificate-line"><span className="certificate-label">মোবাইল:</span> {formData.mobile}</div>
                    <div className="certificate-line"><span className="certificate-label">ইমেইল:</span> {formData.email}</div>
                    <div className="certificate-line"><span className="certificate-label">গ্রাম/মহল্লা:</span> {formData.village}</div>
                    <div className="certificate-line"><span className="certificate-label">ডাকঘর:</span> {formData.postOffice}</div>
                    <div className="certificate-line"><span className="certificate-label">উপজেলা:</span> {formData.upazila}</div>
                    <div className="certificate-line"><span className="certificate-label">জেলা:</span> {formData.district}</div>
                    <div className="certificate-line"><span className="certificate-label">ঠিকানা:</span> {formData.address}</div>
                    <div className="certificate-line"><span className="certificate-label">বৈবাহিক অবস্থা:</span> {formData.maritalStatus}</div>
                    <div className="certificate-line"><span className="certificate-label">ঘোষণা:</span> আমি পুনরায় বিবাহ করিনি ও করব না (যতদিন এই সনদ বৈধ)।</div>
                    <div className="certificate-line"><span className="certificate-label">ইস্যু তারিখ:</span> {formData.issueDate ? new Date(formData.issueDate).toLocaleDateString('bn-BD') : new Date().toLocaleDateString('bn-BD')}</div>
                  </div>
                  <div className="button-group">
                    <button className="btn-outline" onClick={handleDownload}>ডাউনলোড PDF</button>
                    <button className="btn-outline" onClick={handlePrint}>প্রিন্ট করুন</button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#718096', padding: '2rem 0' }}>
                  <p>⬅️ বাম পাশের ফর্মটি পূরণ করে আবেদন করুন।</p>
                  <p>সনদের প্রিভিউ এখানে দেখাবে।</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ডকুমেন্ট ও ফি */}
        <div className="info-grid">
          <div className="info-card">
            <h3>📋 প্রয়োজনীয় ডকুমেন্টস</h3>
            <ul>
              <li>জাতীয় পরিচয়পত্রের কপি</li>
              <li>জন্ম নিবন্ধন সনদ</li>
              <li>স্বামীর মৃত্যু সনদ (বিধবা ক্ষেত্রে)</li>
              <li>তালাকের নথি (তালাকপ্রাপ্তা ক্ষেত্রে)</li>
              <li>২ কপি পাসপোর্ট সাইজের ছবি</li>
              <li>বর্তমান ঠিকানার প্রমাণ</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>💰 ফি ও সময়সীমা</h3>
            <div className="fee-amount">সনদ ফি: ৳ ৩০০</div>
            <p>(জরুরি প্রক্রিয়াকরণ: ৳ ৬০০)</p>
            <ul style={{ marginTop: '0.75rem' }}>
              <li>সাধারণ প্রক্রিয়াকরণ: ৫ কার্যদিবস</li>
              <li>জরুরি প্রক্রিয়াকরণ: ২ কার্যদিবস</li>
              <li>সনদের বৈধতা: ১ বছর</li>
            </ul>
          </div>
        </div>

        <div className="rem-footer">
          <p>© ২০২৫ — পুনঃ বিবাহ না হওয়ার সনদ ব্যবস্থাপনা | হেল্পলাইন: ১৬৩২০ | ই-মেইল: support@remarriage.gov.bd</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>মিথ্যা তথ্য দিলে আইনানুগ ব্যবস্থা গ্রহণযোগ্য।</p>
        </div>
      </div>
    </div>
  );
};

export default Remarriage;