import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Open_space_license = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: '',              // ✅ জন্ম তারিখ যুক্ত করা হয়েছে
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
    nid: '',
    mobile: '',
    email: '',
    areaSize: '',
    purpose: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmResult = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'আপনার খোলা জায়গার লাইসেন্সের আবেদন জমা দিতে চান?',
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
      const response = await fetch('https://amar-union-backend.vercel.app/api/open-space-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'আবেদন সফলভাবে গৃহীত হয়েছে!',
          text: `আপনার ট্র্যাকিং আইডি: ${data.licenseId}`,
          confirmButtonColor: '#000F9F'
        });
        setSubmitted(true);
        setFormData({
          fullName: '',
          fatherName: '',
          dob: '',              // ✅ রিসেট করার সময়ও dob যুক্ত করা হয়েছে
          village: '',
          postOffice: '',
          upazila: '',
          district: '',
          nid: '',
          mobile: '',
          email: '',
          areaSize: '',
          purpose: '',
        });
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

  // স্ট্যাটিক লাইসেন্স তথ্য
  const currentLicense = {
    licenseNumber: 'OSL-2025-001284',
    holder: 'মোঃ রহিম উদ্দিন',
    area: '১২০০ বর্গফুট',
    validUntil: '৩১ ডিসেম্বর ২০২৫',
    status: 'সক্রিয়',
  };

  return (
    <div className="osl-page">
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .osl-page { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%); min-height: 100vh; padding: 2rem 1rem; }
        .osl-container { max-width: 1280px; margin: 0 auto; }
        .osl-header { text-align: center; margin-bottom: 2.5rem; }
        .osl-header h1 { font-size: 2.5rem; color: #1e3a5f; }
        .osl-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem; }
        .osl-card { background: white; border-radius: 1.5rem; box-shadow: 0 20px 35px -10px rgba(0,0,0,0.1); overflow: hidden; }
        .osl-card-header { background: #1e3a5f; color: white; padding: 1.25rem 1.5rem; }
        .osl-card-header h2 { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .osl-card-body { padding: 1.5rem; }
        .license-detail { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0; }
        .license-label { font-weight: 600; color: #2d3748; }
        .license-value { color: #1a202c; text-align: right; }
        .status-badge { background: #38a169; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; }
        .btn-outline { background: transparent; border: 2px solid #1e3a5f; color: #1e3a5f; padding: 0.6rem 1.2rem; border-radius: 2rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: #1e3a5f; color: white; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-weight: 600; color: #2d3748; margin-bottom: 0.5rem; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e0; border-radius: 0.75rem; font-size: 1rem; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #1e3a5f; box-shadow: 0 0 0 3px rgba(30,58,95,0.2); }
        .btn-primary { background: #1e3a5f; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 2rem; font-weight: 600; font-size: 1rem; cursor: pointer; width: 100%; transition: background 0.2s; }
        .btn-primary:hover { background: #0f2a44; }
        .success-message { background: #c6f6d5; color: #22543d; padding: 0.75rem; border-radius: 0.75rem; margin-top: 1rem; text-align: center; font-weight: 500; }
        .info-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem; margin-top: 1rem; }
        .info-card { background: white; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .info-card h3 { color: #1e3a5f; margin-bottom: 0.75rem; font-size: 1.2rem; }
        .info-card ul { list-style-position: inside; color: #4a5568; }
        .fee-amount { font-size: 1.5rem; font-weight: 700; color: #1e3a5f; margin: 0.5rem 0; }
        .osl-footer { text-align: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #cbd5e0; color: #4a5568; }
        @media (max-width: 768px) { .osl-grid, .info-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="osl-container">
        <div className="osl-header">
          <h1>🏞️ খোলা জায়গার লাইসেন্স</h1>
          <p>ওপেন স্পেস লাইসেন্স ব্যবস্থাপনা — আপনার খোলা স্থানের বৈধতা নিশ্চিত করুন</p>
        </div>

        <div className="osl-grid">
          {/* বর্তমান লাইসেন্স কার্ড */}
          <div className="osl-card">
            <div className="osl-card-header"><h2>📄 বর্তমান লাইসেন্সের তথ্য</h2></div>
            <div className="osl-card-body">
              <div className="license-detail"><span className="license-label">লাইসেন্স নম্বর:</span><span className="license-value">{currentLicense.licenseNumber}</span></div>
              <div className="license-detail"><span className="license-label">লাইসেন্সধারী:</span><span className="license-value">{currentLicense.holder}</span></div>
              <div className="license-detail"><span className="license-label">জায়গার পরিমাণ:</span><span className="license-value">{currentLicense.area}</span></div>
              <div className="license-detail"><span className="license-label">মেয়াদ শেষ:</span><span className="license-value">{currentLicense.validUntil}</span></div>
              <div className="license-detail"><span className="license-label">স্ট্যাটাস:</span><span className="license-value"><span className="status-badge">{currentLicense.status}</span></span></div>
              <div className="button-group" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-outline" onClick={() => alert('নবায়ন ফর্ম শীঘ্রই আসছে।')}>🔄 লাইসেন্স নবায়ন</button>
                <button className="btn-outline" onClick={() => alert('পিডিএফ ডাউনলোড শুরু হচ্ছে...')}>⬇️ ডাউনলোড কপি</button>
              </div>
            </div>
          </div>

          {/* আবেদন ফর্ম (নতুন ফিল্ডসহ) */}
          <div className="osl-card">
            <div className="osl-card-header"><h2>📝 নতুন লাইসেন্সের আবেদন</h2></div>
            <div className="osl-card-body">
              <form onSubmit={handleSubmit}>
                {/* ——— ব্যক্তিগত তথ্য ——— */}
                <div className="form-group">
                  <label htmlFor="fullName">পূর্ণ নাম *</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="আপনার নাম লিখুন" required />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">পিতার নাম</label>
                  <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="পিতার নাম" />
                </div>
                {/* ✅ জন্ম তারিখ যুক্ত করা হয়েছে */}
                <div className="form-group">
                  <label htmlFor="dob">জন্ম তারিখ *</label>
                  <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="nid">জাতীয় পরিচয়পত্র (NID) *</label>
                  <input type="number" id="nid" name="nid"   autoComplete="off"  value={formData.nid} onChange={handleChange} placeholder="এনআইডি নম্বর" required />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">মোবাইল নম্বর *</label>
                  <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="01XXXXXXXXX" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">ইমেইল *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@domain.com" required />
                </div>

                {/* ——— ঠিকানা ——— */}
                <div className="form-group">
                  <label htmlFor="village">গ্রাম/মহল্লা *</label>
                  <input type="text" id="village" name="village" value={formData.village} onChange={handleChange} placeholder="গ্রাম বা মহল্লার নাম" required />
                </div>
                <div className="form-group">
                  <label htmlFor="postOffice">ডাকঘর *</label>
                  <input type="text" id="postOffice" name="postOffice" value={formData.postOffice} onChange={handleChange} placeholder="ডাকঘরের নাম" required />
                </div>
                <div className="form-group">
                  <label htmlFor="upazila">উপজেলা *</label>
                  <input type="text" id="upazila" name="upazila" value={formData.upazila} onChange={handleChange} placeholder="উপজেলার নাম" required />
                </div>
                <div className="form-group">
                  <label htmlFor="district">জেলা *</label>
                  <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} placeholder="জেলার নাম" required />
                </div>

                {/* ——— লাইসেন্স সংক্রান্ত ——— */}
                <div className="form-group">
                  <label htmlFor="areaSize">জায়গার পরিমাণ (বর্গফুট) *</label>
                  <input type="number" id="areaSize" name="areaSize" value={formData.areaSize} onChange={handleChange} placeholder="যেমন: 2500" required />
                </div>
                <div className="form-group">
                  <label htmlFor="purpose">ব্যবহারের উদ্দেশ্য *</label>
                  <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required>
                    <option value="">নির্বাচন করুন</option>
                    <option value="ব্যবসায়িক">ব্যবসায়িক (ইভেন্ট/মেলা)</option>
                    <option value="আবাসিক">আবাসিক সম্প্রসারণ</option>
                    <option value="কৃষি">কৃষি কাজ</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary">আবেদন জমা দিন</button>
                {submitted && <div className="success-message">✅ আপনার আবেদন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।</div>}
              </form>
            </div>
          </div>
        </div>

        {/* অতিরিক্ত তথ্য */}
        <div className="info-grid">
          <div className="info-card">
            <h3>📋 প্রয়োজনীয় ডকুমেন্টস</h3>
            <ul>
              <li>জাতীয় পরিচয়পত্রের কপি</li>
              <li>জমির দলিল / অধিকারপত্র</li>
              <li>স্থানীয় সরকারের অনুমতি (যদি প্রযোজ্য)</li>
              <li>নকশা ও ম্যাপ (স্কেল অনুযায়ী)</li>
              <li>ট্যাক্স রসিদের কপি</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>💰 ফি ও শর্তাবলী</h3>
            <div className="fee-amount">বার্ষিক ফি: ৳ ২,৫০০ - ৳ ১৫,০০০</div>
            <p>(জায়গার আকার ও ব্যবহারের উপর নির্ভরশীল)</p>
            <ul style={{ marginTop: '0.75rem' }}>
              <li>লাইসেন্সের মেয়াদ: ১ বছর</li>
              <li>নবায়নের সময়: ৩০ দিন আগে</li>
              <li>জরিমানা: নির্ধারিত সময়ের পরে ৫০% অতিরিক্ত</li>
            </ul>
          </div>
        </div>

        <div className="osl-footer">
          <p>© ২০২৫ — খোলা জায়গার লাইসেন্স কর্তৃপক্ষ | হেল্পলাইন: ১২৩৪৫ | all rights reserved.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>সরকারি নির্দেশনা অনুযায়ী লাইসেন্স ব্যবস্থাপনা</p>
        </div>
      </div>
    </div>
  );
};

export default Open_space_license;