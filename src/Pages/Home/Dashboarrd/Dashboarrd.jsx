import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaBullhorn, FaCogs, FaArrowLeft, FaInfoCircle, FaSave, FaListAlt, FaUsers, FaUserTie, FaHistory, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // গ্লোবাল মেসেজ ও লোডিং স্টেট
  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  // ১. নোটিশ ও নাগরিক সেবা স্টেটসমূহ
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [serviceTitle, setServiceTitle] = useState('');
  const [servicePath, setServicePath] = useState('');
  const [iconName, setIconName] = useState('FaFileAlt');
  const [iconColor, setIconColor] = useState('text-blue-600');

  // ২. ইউনিয়ন পরিচিতি (Intro) স্টেটসমূহ
  const [introTitle, setIntroTitle] = useState('১৬ নং মোহনপুর ইউনিয়ন পরিষদ');
  const [introSubtitle, setIntroSubtitle] = useState('এক নজরে আমাদের গৌরব ও ঐতিহ্য');
  const [introHistory, setIntroHistory] = useState('');
  const [establishedIntro, setEstablishedIntro] = useState('');
  const [areaIntro, setAreaIntro] = useState('');
  const [totalVillagesIntro, setTotalVillagesIntro] = useState('');
  const [totalPopulationIntro, setTotalPopulationIntro] = useState('');
  const [literacyRateIntro, setLiteracyRateIntro] = useState('');
  const [college, setCollege] = useState('');
  const [highSchool, setHighSchool] = useState('');
  const [primarySchool, setPrimarySchool] = useState('');
  const [madrasah, setMadrasah] = useState('');
  const [landmarks, setLandmarks] = useState('');

  // ৩. এক নজরে ইউনিয়ন (Glance) স্টেটসমূহ
  const [glancePop, setGlancePop] = useState('');
  const [glanceVoters, setGlanceVoters] = useState('');
  const [glanceArea, setGlanceArea] = useState('');
  const [glanceLiteracy, setGlanceLiteracy] = useState('');
  const [glanceVillages, setGlanceVillages] = useState('');
  const [glanceSchools, setGlanceSchools] = useState('');
  const [glanceHealth, setGlanceHealth] = useState('');
  const [glanceEst, setGlanceEst] = useState('');

  // ৪. সাংগঠনিক কাঠামো (Structure) স্টেটসমূহ
  const [chairmanName, setChairmanName] = useState('মোঃ আবদুর রহমান');
  const [chairmanPhone, setChairmanPhone] = useState('+৮৮০ ১৭১১-২২৩৩৪৪');
  const [chairmanEmail, setChairmanEmail] = useState('chairman@union.gov.bd');
  const [chairmanImg, setChairmanImg] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400');

  const [secretaryName, setSecretaryName] = useState('নাব সুকোমল বড়ুয়া');
  const [secretaryPhone, setSecretaryPhone] = useState('+৮৮০ ১৭১২-৫৫৬৬৭৭');
  const [secretaryEmail, setSecretaryEmail] = useState('secretary@union.gov.bd');
  const [secretaryImg, setSecretaryImg] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400');

  // ৫. বর্তমান চেয়ারম্যান প্রোফাইল স্টেটসমূহ
  const [chTitle, setChTitle] = useState('সম্মানিত চেয়ারম্যান');
  const [chUnion, setChUnion] = useState('১৬ নং মোহনপুর ইউনিয়ন পরিষদ');
  const [chJoinDate, setChJoinDate] = useState('১০ জানুয়ারি, ২০২২');
  const [chAddress, setChAddress] = useState('চেয়ারম্যান বাসভবন, ইউনিয়ন পরিষদ কমপ্লেক্স।');
  const [chMessage, setChMessage] = useState('আসসালামু আলাইকুম। আমাদের ইউনিয়নকে একটি আদর্শ, ডিজিটাল এবং দুর্নীতিমুক্ত ইউনিয়ন হিসেবে গড়ে তোলাই আমার প্রধান লক্ষ্য...');
  const [fatherName, setFatherName] = useState('মরহুম আলহাজ্ব আলী আহমেদ');
  const [education, setEducation] = useState('স্নাতকোত্তর (এম.এ)');
  const [politicalRole, setPoliticalRole] = useState('সভাপতি, ইউনিয়ন আওয়ামী লীগ / বিএনপি / স্বতন্ত্র');
  const [socialContribution, setSocialContribution] = useState('প্রধান উপদেষ্টা, স্থানীয় সমাজকল্যাণ সংস্থা।');

  // ৬. সাবেক চেয়ারম্যান (Ex-Chairman) স্টেটসমূহ
  const [exChairmansList, setExChairmansList] = useState([
    { id: 1, name: 'আলহাজ্ব মোঃ শামসুল হক', title: 'সাবেক চেয়ারম্যান', duration: '২০১৬ - ২০২২', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300', status: 'জীবিত', village: 'উত্তর পাড়া' },
    { id: 2, name: 'মরহুম আলতাফ আলী মিয়া', title: 'সাবেক চেয়ারম্যান', duration: '২০১১ - ২০১৬', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', status: 'প্রয়াত', village: 'দক্ষিণ বাজার' },
    { id: 3, name: 'মোঃ দেলোয়ার হোসেন (বিএ)', title: 'সাবেক চেয়ারম্যান', duration: '২০০৩ - ২০১১', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', status: 'জীবিত', village: 'পূর্ব ধলপুর' },
    { id: 4, name: 'মরহুম আলহাজ্ব মফিজ উদ্দিন', title: 'সাবেক চেয়ারম্যান', duration: '১৯৯৮ - ২০০৩', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300', status: 'প্রয়াত', village: 'পশ্চিম পাড়া' }
  ]);
  const [exName, setExName] = useState('');
  const [exDuration, setExDuration] = useState('');
  const [exImage, setExImage] = useState('');
  const [exStatus, setExStatus] = useState('জীবিত');
  const [exVillage, setExVillage] = useState('');
  const [editingExId, setEditingExId] = useState(null);

  // ৭. কাউন্সিলর / সদস্যদের জন্য স্টেট (ডায়নামিক)
  const [councillorsList, setCouncillorsList] = useState([]);
  const [councillorForm, setCouncillorForm] = useState({
    name: '', ward: '', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '', email: '', image: ''
  });
  const [editingCouncillorId, setEditingCouncillorId] = useState(null);
  const [councillorLoading, setCouncillorLoading] = useState(false);

  // মেম্বারদের জন্য আগের স্টেট (সাংগঠনিক কাঠামোর জন্য ১২ জন)
  const [membersList, setMembersList] = useState([
    { id: 1, ward: '১ নং ওয়ার্ড', name: 'মোঃ রফিকুল ইসলাম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০১_ _ _ _' },
    { id: 2, ward: '২ নং ওয়ার্ড', name: 'আব্দুল কুদ্দুস', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০২_ _ _ _' },
    { id: 3, ward: '৩ নং ওয়ার্ড', name: 'মোঃ জয়নাল আবেদীন', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৩_ _ _ _' },
    { id: 4, ward: '১, ২ ও ৩ নং ওয়ার্ড', name: 'মোছাঃ ফাতেমা বেগম', role: 'সংরক্ষিত মহিলা সদস্য', phone: '+৮৮০ ১৭১৩-০৪_ _ _ _' },
    { id: 5, ward: '৪ নং ওয়ার্ড', name: 'মোঃ আনোয়ার হোসেন', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৫_ _ _ _' },
    { id: 6, ward: '৫ নং ওয়ার্ড', name: 'মোঃ মোস্তফা কামাল', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৬_ _ _ _' },
    { id: 7, ward: '৬ নং ওয়ার্ড', name: 'মোঃ সিরাজুল ইসলাম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৭_ _ _ _' },
    { id: 8, ward: '৪, ৫ ও ২৬ নং ওয়ার্ড', name: 'মোছাঃ রাশেদা আক্তার', role: 'সংরক্ষিত মহিলা সদস্য', phone: '+৮৮০ ১৭১৩-০৮_ _ _ _' },
    { id: 9, ward: '৭ নং ওয়ার্ড', name: 'মোঃ আবুল কাশেম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-০৯_ _ _ _' },
    { id: 10, ward: '৮ নং ওয়ার্ড', name: 'মোঃ আলী আকবর', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-১০_ _ _ _' },
    { id: 11, ward: '৯ নং ওয়ার্ড', name: 'মোঃ সফিকুল ইসলাম', role: 'ইউপি সদস্য', phone: '+৮৮০ ১৭১৩-১১_ _ _ _' },
    { id: 12, ward: '৭, ৮ ও ৯ নং ওয়ার্ড', name: 'মোছাঃ পারভীন সুলতানা', role: 'সংরক্ষিত মহিলা সদস্য', phone: '+৮৮০ ১৭১৩-১২_ _ _ _' },
  ]);

  // ==================== নতুন যোগ করা স্টেটসমূহ ====================
  const [contactInfo, setContactInfo] = useState({
    addressLine1: '১নং মডেল ইউনিয়ন পরিষদ কমপ্লেক্স',
    addressLine2: 'ঢাকা, বাংলাদেশ',
    phone1: '+৮৮০ ১৭০০-XXXXXX (সচিব)',
    phone2: 'জাতীয় সেবা নং: ৩৩৩, ৯৯৯',
    email: 'info@yourunionup.gov.bd',
    mapEmbedUrl: 'https://www.google.com/maps/embed?...',
    facebook: 'https://facebook.com/yourunion',
    twitter: 'https://twitter.com/yourunion',
    youtube: 'https://youtube.com/yourunion'
  });

  const [verificationConfig, setVerificationConfig] = useState({
    pageTitle: 'অনলাইন সনদ যাচাইকরণ',
    pageSubtitle: 'ইউনিয়ন পরিষদ কর্তৃক প্রদত্ত যেকোনো ডিজিটাল সনদ বা প্রত্যয়নপত্রের সত্যতা তাৎক্ষণিকভাবে যাচাই করুন।',
    badgeText: 'ডিজিটাল সেবা পোর্টাল',
    formTitle: 'সনদ অনুসন্ধান ফরম',
    formDescription: 'সঠিক তথ্য দিয়ে নিচের ঘরগুলো পূরণ করুন',
    certificateTypes: [
      { value: 'birth', label: 'জন্ম নিবন্ধন প্রত্যয়নপত্র' },
      { value: 'character', label: 'নাগরিকত্ব / চারিত্রিক সনদ' },
      { value: 'warish', label: 'ওয়ারিশ সনদপত্র' },
      { value: 'trade', label: 'ট্রেড লাইসেন্স' },
      { value: 'income', label: 'বাৎসরিক আয় বা বিবিধ প্রত্যয়ন' }
    ],
    instructionsTitle: 'জরুরি নির্দেশনাবলী',
    instructionsList: [
      'আপনার হাতে থাকা সনদের ওপরের ডানদিকের কোণায় প্রিন্ট করা সনদ নম্বরটি সঠিকভাবে বসান।',
      'সনদের ধরণ ড্রপডাউন মেনু থেকে নির্বাচন করা আবশ্যিক।',
      'অনলাইন কপিতে থাকা কিউআর (QR) কোডটি স্ক্যান করেও সরাসরি এই ভেরিফিকেশন সম্পন্ন করা সম্ভব।'
    ],
    helplineLabel: 'যেকোনো সমস্যায় হেল্পলাইন',
    helplineNumber: '০৯৬১২-XXXXXX (সকাল ৯টা - বিকাল ৫টা)',
    trustMessage: 'এই সিস্টেমটি সম্পূর্ণ এনক্রিপ্টেড এবং সরকারি ডাটা প্রাইভেসী আইন মেনে পরিচালিত।',
    submitButtonText: 'সনদ যাচাই করুন',
    placeholderCertNo: 'উদা: UP-2026-XXXX',
    placeholderNid: 'জাতীয় পরিচয়পত্র নম্বর দিন'
  });

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'উন্নয়ন প্রকল্প', image: '', date: ''
  });
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const galleryCategories = ['উন্নয়ন প্রকল্প', 'স্বাস্থ্যসেবা', 'নাগরিক সেবা', 'অনুষ্ঠান'];

  const [updatesList, setUpdatesList] = useState([]);
  const [updateForm, setUpdateForm] = useState({
    title: '', description: '', tag: 'সাধারণ নোটিশ', tagColor: 'bg-blue-500', date: '', link: '#'
  });
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const tagOptions = [
    { label: 'জরুরি নোটিশ', color: 'bg-red-500' },
    { label: 'ট্যাক্স আপডেট', color: 'bg-blue-500' },
    { label: 'স্বাস্থ্যসেবা', color: 'bg-emerald-500' },
    { label: 'উন্নয়ন প্রকল্প', color: 'bg-amber-500' },
    { label: 'সাধারণ নোটিশ', color: 'bg-gray-500' }
  ];

  // ==================== useEffect হুকসমূহ ====================
  const fetchCouncillors = async () => {
    try {
      const res = await axios.get('/api/councillors');
      if (res.data.success && res.data.councillors.length > 0) {
        setCouncillorsList(res.data.councillors);
      } else {
        setCouncillorsList([
          { id: 1, name: 'মোঃ রফিকুল ইসলাম', ward: '১ নং ওয়ার্ড', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '+৮৮০ ১৭১৩-০১_ _ _ _', email: 'ward1@union.gov.bd', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
          { id: 2, name: 'আব্দুল কুদ্দুস', ward: '২ নং ওয়ার্ড', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '+৮৮০ ১৭১৩-০২_ _ _ _', email: 'ward2@union.gov.bd', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300' },
          { id: 3, name: 'মোঃ জয়নাল আবেদীন', ward: '৩ নং ওয়ার্ড', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '+৮৮০ ১৭১৩-০৩_ _ _ _', email: 'ward3@union.gov.bd', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300' },
        ]);
      }
    } catch (err) { console.error('কাউন্সিলর লোড করতে ব্যর্থ:', err); }
  };
  useEffect(() => { fetchCouncillors(); }, []);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try { const res = await axios.get('/api/contact-info'); if (res.data && Object.keys(res.data).length) setContactInfo(prev => ({ ...prev, ...res.data })); } catch (err) { console.error('কন্টাক্ট তথ্য লোড ব্যর্থ:', err); }
    };
    fetchContactInfo();
  }, []);

  useEffect(() => {
    const fetchVerificationConfig = async () => {
      try { const res = await axios.get('/api/verification-page'); if (res.data && Object.keys(res.data).length) setVerificationConfig(prev => ({ ...prev, ...res.data })); } catch (err) { console.error('ভেরিফিকেশন কনফিগ লোড ব্যর্থ:', err); }
    };
    fetchVerificationConfig();
  }, []);

  const fetchGallery = async () => {
    try { const res = await axios.get('/api/gallery'); if (res.data.success) setGalleryItems(res.data.items); else setGalleryItems([]); } catch (err) { console.error('গ্যালারি লোড ব্যর্থ:', err); }
  };
  useEffect(() => { fetchGallery(); }, []);

  const fetchUpdates = async () => {
    try { const res = await axios.get('/api/updates'); if (res.data.success) setUpdatesList(res.data.updates); } catch (err) { console.error('আপডেট লোড ব্যর্থ:', err); }
  };
  useEffect(() => { fetchUpdates(); }, []);

  // ==================== হ্যান্ডলার ফাংশনসমূহ ====================
  const saveAllCouncillors = async () => {
    setCouncillorLoading(true);
    try {
      const payload = councillorsList.map(({ id, ...rest }) => rest);
      await axios.post('/api/councillors', { councillors: payload });
      setMessage({ text: 'কাউন্সিলর তালিকা সফলভাবে সংরক্ষিত!', isError: false });
    } catch (err) { setMessage({ text: 'সংরক্ষণ করতে ব্যর্থ!', isError: true }); } finally { setCouncillorLoading(false); }
  };

  const handleCouncillorSubmit = (e) => {
    e.preventDefault();
    const { name, ward, role, phone, email, image } = councillorForm;
    if (!name || !ward) { setMessage({ text: 'নাম ও ওয়ার্ড অবশ্যই দিতে হবে', isError: true }); return; }
    if (editingCouncillorId) {
      setCouncillorsList(prev => prev.map(c => c.id === editingCouncillorId ? { ...c, name, ward, role, phone, email, image } : c));
      setEditingCouncillorId(null);
    } else {
      const newId = Date.now();
      setCouncillorsList(prev => [...prev, { id: newId, name, ward, role, phone, email, image }]);
    }
    setCouncillorForm({ name: '', ward: '', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '', email: '', image: '' });
    setMessage({ text: 'তালিকা আপডেট হয়েছে, সংরক্ষণ করতে "তালিকা সংরক্ষণ করুন" বাটনে ক্লিক করুন', isError: false });
  };

  const startEditCouncillor = (item) => {
    setEditingCouncillorId(item.id);
    setCouncillorForm({ name: item.name, ward: item.ward, role: item.role, phone: item.phone, email: item.email, image: item.image || '' });
  };
  const deleteCouncillor = (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই সদস্য মুছতে চান?')) {
      setCouncillorsList(prev => prev.filter(c => c.id !== id));
      if (editingCouncillorId === id) { setEditingCouncillorId(null); setCouncillorForm({ name: '', ward: '', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '', email: '', image: '' }); }
    }
  };

  const handleMemberChange = (id, field, val) => {
    const updated = membersList.map(m => m.id === id ? { ...m, [field]: val } : m);
    setMembersList(updated);
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    try { const res = await axios.post('/api/notices', { title: noticeTitle, date: noticeDate }); setMessage({ text: res.data.message || 'নোটিশ সফলভাবে যোগ হয়েছে!', isError: false }); setNoticeTitle(''); setNoticeDate(''); } catch (err) { setMessage({ text: 'নোটিশ যোগ করতে সমস্যা হয়েছে!', isError: true }); } finally { setLoading(false); }
  };
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    try { const res = await axios.post('/api/services', { title: serviceTitle, path: servicePath, iconName, iconColor }); setMessage({ text: res.data.message || 'সেবাটি সফলভাবে যোগ হয়েছে!', isError: false }); setServiceTitle(''); setServicePath(''); } catch (err) { setMessage({ text: 'সেবা যোগ করতে সমস্যা হয়েছে!', isError: true }); } finally { setLoading(false); }
  };
  const handleIntroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    const finalIntroData = { title: introTitle, subtitle: introSubtitle, history: introHistory, established: establishedIntro, area: areaIntro, totalVillages: totalVillagesIntro, totalPopulation: totalPopulationIntro, literacyRate: literacyRateIntro, college, highSchool, primarySchool, madrasah, landmarks };
    try { const response = await axios.post('/api/intro', finalIntroData); setMessage({ text: response.data.message || 'ইউনিয়ন পরিচিতি সফলভাবে আপডেট করা হয়েছে!', isError: false }); } catch (error) { setMessage({ text: 'পরিচিতি তথ্য আপডেট করতে ব্যর্থ হয়েছে!', isError: true }); } finally { setLoading(false); }
  };
  const handleGlanceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    const finalGlanceData = { totalPopulation: glancePop, totalVoters: glanceVoters, area: glanceArea, literacyRate: glanceLiteracy, totalVillages: glanceVillages, primarySchools: glanceSchools, healthCenters: glanceHealth, established: glanceEst };
    try { const response = await axios.post('/api/glance', finalGlanceData); setMessage({ text: response.data.message || 'এক নজরে ইউনিয়নের তথ্য আপডেট হয়েছে!', isError: false }); } catch (error) { setMessage({ text: 'এক নজরে তথ্য আপডেট করতে ব্যর্থ!', isError: true }); } finally { setLoading(false); }
  };
  const handleStructureSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    const topManagement = [{ id: 1, name: chairmanName, role: 'ইউনিয়ন পরিষদ চেয়ারম্যান', image: chairmanImg, phone: chairmanPhone, email: chairmanEmail }, { id: 2, name: secretaryName, role: 'ইউনিয়ন পরিষদ সচিব', image: secretaryImg, phone: secretaryPhone, email: secretaryEmail }];
    try { const response = await axios.post('/api/structure', { topManagement, members: membersList }); setMessage({ text: response.data.message || 'সাংগঠনিক কাঠামোর তথ্য সফলভাবে আপডেট হয়েছে!', isError: false }); } catch (error) { setMessage({ text: 'সাংগঠনিক কাঠামো আপডেট করতে ব্যর্থ!', isError: true }); } finally { setLoading(false); }
  };
  const handleChairmanProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    const chairmanProfileData = { name: chairmanName, title: chTitle, union: chUnion, image: chairmanImg, joiningDate: chJoinDate, phone: chairmanPhone, email: chairmanEmail, address: chAddress, message: chMessage, bio: [{ label: 'পিতার নাম', value: fatherName }, { label: 'শিক্ষাগত যোগ্যতা', value: education }, { label: 'রাজনৈতিক পদবী', value: politicalRole }, { label: 'সামাজিক অবদান', value: socialContribution }] };
    try { const response = await axios.post('/api/chairman', chairmanProfileData); setMessage({ text: response.data.message || 'সম্মানিত চেয়ারম্যান প্রোফাইল সফলভাবে আপডেট হয়েছে!', isError: false }); } catch (error) { setMessage({ text: 'চেয়ারম্যান প্রোফাইল আপডেট করতে ব্যর্থ!', isError: true }); } finally { setLoading(false); }
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMessage({ text: '', isError: false });
    try { await axios.post('/api/contact-info', contactInfo); setMessage({ text: 'যোগাযোগের তথ্য সফলভাবে আপডেট হয়েছে!', isError: false }); } catch (err) { setMessage({ text: 'আপডেট করতে ব্যর্থ!', isError: true }); } finally { setLoading(false); }
  };
  const handleVerificationConfigSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMessage({ text: '', isError: false });
    try { await axios.post('/api/verification-page', verificationConfig); setMessage({ text: 'যাচাই পৃষ্ঠার তথ্য সফলভাবে আপডেট হয়েছে!', isError: false }); } catch (err) { setMessage({ text: 'আপডেট করতে ব্যর্থ!', isError: true }); } finally { setLoading(false); }
  };
  const handleExChairmanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ text: '', isError: false });
    let updatedList;
    if (editingExId) { updatedList = exChairmansList.map(item => item.id === editingExId ? { ...item, name: exName, duration: exDuration, image: exImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', status: exStatus, village: exVillage } : item); }
    else { const newEx = { id: Date.now(), name: exName, title: 'সাবেক চেয়ারম্যান', duration: exDuration, image: exImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', status: exStatus, village: exVillage }; updatedList = [...exChairmansList, newEx]; }
    try { const response = await axios.post('/api/ex-chairmans', { chairmans: updatedList }); setExChairmansList(updatedList); setMessage({ text: response.data.message || 'পূর্বতন চেয়ারম্যান তালিকা আপডেট হয়েছে!', isError: false }); setExName(''); setExDuration(''); setExImage(''); setExVillage(''); setExStatus('জীবিত'); setEditingExId(null); } catch (error) { setMessage({ text: 'তালিকা সংরক্ষণ করতে সমস্যা হয়েছে!', isError: true }); } finally { setLoading(false); }
  };
  const startEditEx = (item) => { setEditingExId(item.id); setExName(item.name); setExDuration(item.duration); setExImage(item.image); setExVillage(item.village); setExStatus(item.status); };
  const deleteExChairman = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?')) return;
    const filtered = exChairmansList.filter(item => item.id !== id);
    try { const response = await axios.post('/api/ex-chairmans', { chairmans: filtered }); setExChairmansList(filtered); setMessage({ text: 'সফলভাবে মুছে ফেলা হয়েছে!', isError: false }); } catch (err) { setMessage({ text: 'মুছে ফেলতে ব্যর্থ!', isError: true }); }
  };
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const { title, category, image, date } = galleryForm;
    if (!title || !category || !image) { setMessage({ text: 'শিরোনাম, ক্যাটাগরি ও ছবির URL দিন', isError: true }); return; }
    setGalleryLoading(true);
    try {
      if (editingGalleryId) { await axios.put(`/api/gallery/${editingGalleryId}`, { title, category, image, date }); setMessage({ text: 'আইটেম আপডেট হয়েছে', isError: false }); }
      else { await axios.post('/api/gallery', { title, category, image, date }); setMessage({ text: 'নতুন ছবি যোগ হয়েছে', isError: false }); }
      fetchGallery(); setGalleryForm({ title: '', category: 'উন্নয়ন প্রকল্প', image: '', date: '' }); setEditingGalleryId(null);
    } catch (err) { setMessage({ text: 'সংরক্ষণ ব্যর্থ!', isError: true }); } finally { setGalleryLoading(false); }
  };
  const startEditGallery = (item) => { setEditingGalleryId(item._id); setGalleryForm({ title: item.title, category: item.category, image: item.image, date: item.date || '' }); };
  const deleteGalleryItem = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ছবিটি মুছতে চান?')) return;
    try { await axios.delete(`/api/gallery/${id}`); setMessage({ text: 'সফলভাবে মুছে ফেলা হয়েছে', isError: false }); fetchGallery(); if (editingGalleryId === id) { setEditingGalleryId(null); setGalleryForm({ title: '', category: 'উন্নয়ন প্রকল্প', image: '', date: '' }); } } catch (err) { setMessage({ text: 'মুছতে ব্যর্থ!', isError: true }); }
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tag, tagColor, date, link } = updateForm;
    if (!title || !description) { setMessage({ text: 'শিরোনাম ও বিবরণ দিন', isError: true }); return; }
    setUpdateLoading(true);
    try {
      if (editingUpdateId) { await axios.put(`/api/updates/${editingUpdateId}`, { title, description, tag, tagColor, date, link }); setMessage({ text: 'আপডেট পরিবর্তিত হয়েছে', isError: false }); }
      else { await axios.post('/api/updates', { title, description, tag, tagColor, date, link }); setMessage({ text: 'নতুন আপডেট যুক্ত হয়েছে', isError: false }); }
      fetchUpdates(); setUpdateForm({ title: '', description: '', tag: 'সাধারণ নোটিশ', tagColor: 'bg-blue-500', date: '', link: '#' }); setEditingUpdateId(null);
    } catch (err) { setMessage({ text: 'সংরক্ষণ ব্যর্থ!', isError: true }); } finally { setUpdateLoading(false); }
  };
  const startEditUpdate = (item) => { setEditingUpdateId(item._id); setUpdateForm({ title: item.title, description: item.description, tag: item.tag, tagColor: item.tagColor, date: item.date || '', link: item.link || '#' }); };
  const deleteUpdate = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি মুছতে চান?')) return;
    try { await axios.delete(`/api/updates/${id}`); setMessage({ text: 'মুছে ফেলা হয়েছে', isError: false }); fetchUpdates(); if (editingUpdateId === id) { setEditingUpdateId(null); setUpdateForm({ title: '', description: '', tag: 'সাধারণ নোটিশ', tagColor: 'bg-blue-500', date: '', link: '#' }); } } catch (err) { setMessage({ text: 'মুছতে ব্যর্থ!', isError: true }); }
  };

  // ==================== JSX রিটার্ন ====================
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-slate-900 text-white py-5 px-6 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3"><div className="bg-amber-500 p-2 rounded text-slate-900 font-bold text-xs sm:text-sm">ADMIN</div><h1 className="text-base sm:text-xl font-bold tracking-wide">ইউনিয়ন পরিষদ কন্ট্রোল প্যানেল</h1></div>
        <Link to="/" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-lg border border-slate-700 transition"><FaArrowLeft /> মূল ওয়েবসাইট</Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {message.text && (<div className={`p-4 rounded-xl text-sm font-semibold text-center border shadow-sm ${message.isError ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>{message.text}</div>)}

        {/* নোটিশ ও সার্ভিস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"><div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-4"><FaBullhorn className="text-amber-500" /><h2>নতুন নোটিশ জারি করুন</h2></div><form onSubmit={handleNoticeSubmit} className="space-y-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">নোটিশের শিরোনাম *</label><textarea required rows="2" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">তারিখ</label><input type="text" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} placeholder="যেমন: ০৭ জুন, ২০২৬" className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" /></div><button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-sm">নোটিশ আপডেট করুন</button></form></div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"><div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-4"><FaCogs className="text-emerald-500" /><h2>নতুন নাগরিক সেবা যোগ করুন</h2></div><form onSubmit={handleServiceSubmit} className="space-y-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">সেবার নাম *</label><input type="text" required value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">রাউট লিংক / পাথ *</label><input type="text" required value={servicePath} onChange={(e) => setServicePath(e.target.value)} placeholder="/service/trade-license" className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" /></div><button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-sm">সেবা গ্রিডে যোগ করুন</button></form></div>
        </div>

        {/* চেয়ারম্যান প্রোফাইল (সংক্ষেপিত) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUserTie className="text-teal-600" /><h2>সম্মানিত চেয়ারম্যান প্রোফাইল পেজ আপডেট ফরম</h2></div>
          <form onSubmit={handleChairmanProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">চেয়ারম্যানের নাম</label><input type="text" value={chairmanName} onChange={(e) => setChairmanName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">পদবী</label><input type="text" value={chTitle} onChange={(e) => setChTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ইউনিয়নের নাম</label><input type="text" value={chUnion} onChange={(e) => setChUnion(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">দায়িত্ব গ্রহণের তারিখ</label><input type="text" value={chJoinDate} onChange={(e) => setChJoinDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">কার্যালয় / বাসভবন ঠিকানা</label><input type="text" value={chAddress} onChange={(e) => setChAddress(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ছবির লিঙ্ক (Image URL)</label><input type="text" value={chairmanImg} onChange={(e) => setChairmanImg(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div></div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-4"><h3 className="text-xs font-bold text-slate-800 border-b pb-1">ব্যক্তিগত ও সামাজিক পরিচিতি</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-[11px] font-bold text-gray-600 mb-1">পিতার নাম</label><input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="w-full px-3 py-1.5 border rounded text-xs bg-white" /></div><div><label className="block text-[11px] font-bold text-gray-600 mb-1">শিক্ষাগত যোগ্যতা</label><input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full px-3 py-1.5 border rounded text-xs bg-white" /></div><div><label className="block text-[11px] font-bold text-gray-600 mb-1">রাজনৈতিক পদবী</label><input type="text" value={politicalRole} onChange={(e) => setPoliticalRole(e.target.value)} className="w-full px-3 py-1.5 border rounded text-xs bg-white" /></div><div><label className="block text-[11px] font-bold text-gray-600 mb-1">সামাজিক অবদান</label><input type="text" value={socialContribution} onChange={(e) => setSocialContribution(e.target.value)} className="w-full px-3 py-1.5 border rounded text-xs bg-white" /></div></div></div>
            <div><label className="block text-xs font-bold text-gray-700 mb-1">চেয়ারম্যানের বাণী (Message)</label><textarea rows="4" value={chMessage} onChange={(e) => setChMessage(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"><FaSave /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'চেয়ারম্যান প্রোফাইল পেজের তথ্য লাইভ আপডেট করুন'}</button>
          </form>
        </div>

        {/* সাবেক চেয়ারম্যান (সংক্ষেপিত) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaHistory className="text-amber-600" /><h2>পূর্বতন/সাবেক চেয়ারম্যানদের তালিকা আপডেট ফরম</h2></div>
          <form onSubmit={handleExChairmanSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100 mb-6">
            <div className="sm:col-span-2 md:col-span-3"><h3 className="text-xs font-bold text-amber-800">{editingExId ? '🔒 সাবেক চেয়ারম্যান তথ্য পরিবর্তন করুন' : '➕ নতুন সাবেক চেয়ারম্যান যুক্ত করুন'}</h3></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">চেয়ারম্যানের নাম *</label><input type="text" required value={exName} onChange={(e) => setExName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">কার্যকাল/মেয়াদকাল *</label><input type="text" required value={exDuration} onChange={(e) => setExDuration(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">গ্রাম</label><input type="text" value={exVillage} onChange={(e) => setExVillage(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div className="sm:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">ছবির ইউআরএল (Image URL)</label><input type="text" value={exImage} onChange={(e) => setExImage(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">বর্তমান অবস্থা</label><select value={exStatus} onChange={(e) => setExStatus(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white"><option value="জীবিত">জীবিত</option><option value="প্রয়াত">প্রয়াত</option></select></div>
            <div className="sm:col-span-2 md:col-span-3 pt-2"><button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-xs transition shadow-sm">{editingExId ? 'তথ্য আপডেট করুন' : 'তালিকায় সাবেক চেয়ারম্যান যুক্ত করুন'}</button></div>
          </form>
          <div className="overflow-x-auto rounded-xl border border-gray-200"><table className="w-full text-left border-collapse text-xs"><thead><tr className="bg-slate-100 text-slate-700 font-bold border-b"><th className="p-3 text-center">ক্রমিক</th><th className="p-3">চেয়ারম্যানের নাম</th><th className="p-3">কার্যকাল</th><th className="p-3">গ্রাম</th><th className="p-3 text-center">অবস্থা</th><th className="p-3 text-center">অ্যাকশন</th></tr></thead><tbody>{exChairmansList.map((item, idx) => (<tr key={item.id}><td className="p-3 text-center">{idx+1}</td><td className="p-3">{item.name}</td><td className="p-3">{item.duration}</td><td className="p-3">{item.village||'N/A'}</td><td className="p-3 text-center"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.status==='জীবিত'?'bg-blue-50 text-blue-700':'bg-gray-100 text-gray-600'}`}>{item.status}</span></td><td className="p-3 text-center space-x-2"><button onClick={() => startEditEx(item)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><FaEdit /></button><button onClick={() => deleteExChairman(item.id)} className="p-1.5 bg-red-50 text-red-600 rounded"><FaTrashAlt /></button></td></tr>))}</tbody></table></div>
        </div>

        {/* কাউন্সিলর (সংক্ষেপিত) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUsers className="text-indigo-600" /><h2>কাউন্সিলর / সদস্যবৃন্দ তালিকা আপডেট ফরম</h2></div>
          <form onSubmit={handleCouncillorSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-indigo-50/30 p-4 rounded-xl border border-indigo-100 mb-6">
            <div className="sm:col-span-2 md:col-span-3"><h3 className="text-xs font-bold text-indigo-800">{editingCouncillorId ? '✏️ সদস্য তথ্য পরিবর্তন করুন' : '➕ নতুন সদস্য যুক্ত করুন'}</h3></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">পূর্ণ নাম *</label><input type="text" required value={councillorForm.name} onChange={(e) => setCouncillorForm({...councillorForm, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ওয়ার্ড *</label><input type="text" required value={councillorForm.ward} onChange={(e) => setCouncillorForm({...councillorForm, ward: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ভূমিকা</label><input type="text" value={councillorForm.role} onChange={(e) => setCouncillorForm({...councillorForm, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">মোবাইল</label><input type="text" value={councillorForm.phone} onChange={(e) => setCouncillorForm({...councillorForm, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ইমেইল</label><input type="email" value={councillorForm.email} onChange={(e) => setCouncillorForm({...councillorForm, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div className="sm:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">ছবির URL</label><input type="text" value={councillorForm.image} onChange={(e) => setCouncillorForm({...councillorForm, image: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div>
            <div className="sm:col-span-2 md:col-span-3 pt-2"><button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-xs">{editingCouncillorId ? 'হালনাগাদ করুন' : 'তালিকায় যোগ করুন'}</button></div>
          </form>
          <div className="overflow-x-auto rounded-xl border border-gray-200"><table className="w-full text-left border-collapse text-xs"><thead className="bg-slate-100 text-slate-700 font-bold border-b"><tr><th className="p-3 text-center">#</th><th className="p-3">নাম</th><th className="p-3">ওয়ার্ড</th><th className="p-3">ভূমিকা</th><th className="p-3">মোবাইল</th><th className="p-3 text-center">অ্যাকশন</th></tr></thead><tbody>{councillorsList.map((item,idx)=>(<tr key={item.id}><td className="p-3 text-center">{idx+1}</td><td className="p-3">{item.name}</td><td className="p-3">{item.ward}</td><td className="p-3">{item.role}</td><td className="p-3">{item.phone}</td><td className="p-3 text-center space-x-2"><button onClick={()=>startEditCouncillor(item)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><FaEdit /></button><button onClick={()=>deleteCouncillor(item.id)} className="p-1.5 bg-red-50 text-red-600 rounded"><FaTrashAlt /></button></td></tr>))}</tbody></table></div>
          <div className="mt-6 flex justify-end"><button onClick={saveAllCouncillors} disabled={councillorLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg text-sm shadow-md flex items-center gap-2"><FaSave /> {councillorLoading ? 'সংরক্ষণ হচ্ছে...' : 'তালিকা সংরক্ষণ করুন'}</button></div>
        </div>

        {/* সাংগঠনিক কাঠামো (সংক্ষেপিত) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUsers className="text-violet-600" /><h2>ইউনিয়ন পরিষদ সাংগঠনিক কাঠামো আপডেট ফরম</h2></div>
          <form onSubmit={handleStructureSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-gray-100"><div className="space-y-3"><h3 className="text-sm font-bold text-green-700 border-b pb-1">চেয়ারম্যান তথ্য</h3><input type="text" value={chairmanName} onChange={(e)=>setChairmanName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /><input type="text" value={chairmanPhone} onChange={(e)=>setChairmanPhone(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /><input type="text" value={chairmanEmail} onChange={(e)=>setChairmanEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /><input type="text" value={chairmanImg} onChange={(e)=>setChairmanImg(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div><div className="space-y-3"><h3 className="text-sm font-bold text-green-700 border-b pb-1">সচিব তথ্য</h3><input type="text" value={secretaryName} onChange={(e)=>setSecretaryName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /><input type="text" value={secretaryPhone} onChange={(e)=>setSecretaryPhone(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /><input type="text" value={secretaryEmail} onChange={(e)=>setSecretaryEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /><input type="text" value={secretaryImg} onChange={(e)=>setSecretaryImg(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white" /></div></div>
            <div><h3 className="text-sm font-bold text-gray-800 mb-3">ইউপি সদস্য ও সংরক্ষিত মহিলা সদস্যবৃন্দ (১২ জন)</h3><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2 border rounded-xl bg-gray-50">{membersList.map((member)=>(<div key={member.id} className="bg-white p-3 rounded-lg border shadow-sm space-y-2"><div className="flex justify-between items-center"><span className="text-[11px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded">{member.ward}</span><span className="text-[10px] text-gray-400 font-semibold">{member.role}</span></div><input type="text" value={member.name} onChange={(e)=>handleMemberChange(member.id,'name',e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white" /><input type="text" value={member.phone} onChange={(e)=>handleMemberChange(member.id,'phone',e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white" /></div>))}</div></div>
            <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"><FaSave /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'সাংগঠনিক কাঠামোর তথ্য লাইভ আপডেট করুন'}</button>
          </form>
        </div>

        {/* এক নজরে ইউনিয়ন */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaListAlt className="text-green-600" /><h2>"এক নজরে ইউনিয়ন" তথ্য আপডেট ফরম</h2></div>
          <form onSubmit={handleGlanceSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">মোট জনসংখ্যা</label><input type="text" value={glancePop} onChange={(e)=>setGlancePop(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">মোট ভোটার</label><input type="text" value={glanceVoters} onChange={(e)=>setGlanceVoters(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">আয়তন</label><input type="text" value={glanceArea} onChange={(e)=>setGlanceArea(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষার হার</label><input type="text" value={glanceLiteracy} onChange={(e)=>setGlanceLiteracy(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div className="col-span-2 md:col-span-4 pt-2"><button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl"><FaSave /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'এক নজরে পেজের তথ্য আপডেট করুন'}</button></div></form>
        </div>

        {/* ইউনিয়ন পরিচিতি */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-blue-600" /><h2>ইউনিয়ন পরিচিতি ও ইতিহাস আপডেট ফরম</h2></div>
          <form onSubmit={handleIntroSubmit} className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">পেইজের মূল শিরোনাম *</label><input type="text" required value={introTitle} onChange={(e)=>setIntroTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">উপ-শিরোনাম *</label><input type="text" required value={introSubtitle} onChange={(e)=>setIntroSubtitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div></div><div><label className="block text-xs font-bold text-gray-700 mb-1">Detailed History *</label><textarea required rows="4" value={introHistory} onChange={(e)=>setIntroHistory(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><button type="submit" disabled={loading} className="w-full bg-blue-950 hover:bg-sky-950 text-white font-bold py-3 rounded-xl"><FaSave /> {loading ? 'তথ্য সংরক্ষণ করা হচ্ছে...' : 'ইউনিয়ন পরিচিতি পেজ আপডেট করুন'}</button></form>
        </div>

        {/* যোগাযোগ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-purple-600" /><h2>যোগাযোগ পৃষ্ঠার তথ্য আপডেট করুন</h2></div>
          <form onSubmit={handleContactSubmit} className="space-y-5"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা (লাইন ১)</label><input type="text" value={contactInfo.addressLine1} onChange={(e)=>setContactInfo({...contactInfo, addressLine1: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা (লাইন ২)</label><input type="text" value={contactInfo.addressLine2} onChange={(e)=>setContactInfo({...contactInfo, addressLine2: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ফোন নম্বর (হটলাইন)</label><input type="text" value={contactInfo.phone1} onChange={(e)=>setContactInfo({...contactInfo, phone1: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">অন্য ফোন/জরুরি নম্বর</label><input type="text" value={contactInfo.phone2} onChange={(e)=>setContactInfo({...contactInfo, phone2: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ইমেইল ঠিকানা</label><input type="email" value={contactInfo.email} onChange={(e)=>setContactInfo({...contactInfo, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">গুগল ম্যাপ এম্বেড URL</label><input type="text" value={contactInfo.mapEmbedUrl} onChange={(e)=>setContactInfo({...contactInfo, mapEmbedUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ফেসবুক পেজ URL</label><input type="text" value={contactInfo.facebook} onChange={(e)=>setContactInfo({...contactInfo, facebook: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">টুইটার URL</label><input type="text" value={contactInfo.twitter} onChange={(e)=>setContactInfo({...contactInfo, twitter: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ইউটিউব চ্যানেল URL</label><input type="text" value={contactInfo.youtube} onChange={(e)=>setContactInfo({...contactInfo, youtube: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div></div><button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl"><FaSave /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'যোগাযোগ পৃষ্ঠার তথ্য লাইভ আপডেট করুন'}</button></form>
        </div>

        {/* সনদ যাচাই কনফিগারেশন */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-blue-600" /><h2>সনদ যাচাই পৃষ্ঠার কনফিগারেশন</h2></div>
          <form onSubmit={handleVerificationConfigSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">পৃষ্ঠার ব্যাজ টেক্সট</label><input type="text" value={verificationConfig.badgeText} onChange={(e)=>setVerificationConfig({...verificationConfig, badgeText: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">পৃষ্ঠার মূল শিরোনাম</label><input type="text" value={verificationConfig.pageTitle} onChange={(e)=>setVerificationConfig({...verificationConfig, pageTitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">উপশিরোনাম</label><textarea rows="2" value={verificationConfig.pageSubtitle} onChange={(e)=>setVerificationConfig({...verificationConfig, pageSubtitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"></textarea></div></div><div className="border-t pt-4"><h3 className="text-sm font-bold text-gray-800 mb-3">যাচাই ফর্মের লেবেল</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-700 mb-1">ফর্মের শিরোনাম</label><input type="text" value={verificationConfig.formTitle} onChange={(e)=>setVerificationConfig({...verificationConfig, formTitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">ফর্মের বিবরণ</label><input type="text" value={verificationConfig.formDescription} onChange={(e)=>setVerificationConfig({...verificationConfig, formDescription: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">সনদ নম্বর প্লেসহোল্ডার</label><input type="text" value={verificationConfig.placeholderCertNo} onChange={(e)=>setVerificationConfig({...verificationConfig, placeholderCertNo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">এনআইডি প্লেসহোল্ডার</label><input type="text" value={verificationConfig.placeholderNid} onChange={(e)=>setVerificationConfig({...verificationConfig, placeholderNid: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">বাটনের টেক্সট</label><input type="text" value={verificationConfig.submitButtonText} onChange={(e)=>setVerificationConfig({...verificationConfig, submitButtonText: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div></div></div><div className="border-t pt-4"><label className="block text-xs font-bold text-gray-700 mb-2">সনদের ধরণের তালিকা (JSON অ্যারে)</label><textarea rows="4" value={JSON.stringify(verificationConfig.certificateTypes, null, 2)} onChange={(e)=>{ try{ const parsed=JSON.parse(e.target.value); setVerificationConfig({...verificationConfig, certificateTypes: parsed}); }catch(err){} }} className="w-full px-3 py-2 border rounded-lg text-sm font-mono"></textarea><p className="text-[10px] text-gray-400 mt-1">{'ফরম্যাট: [{"value":"id","label":"নাম"}, ...]'}</p></div><div className="border-t pt-4"><h3 className="text-sm font-bold text-gray-800 mb-3">নির্দেশনা ও হেল্পলাইন</h3><div><label className="block text-xs font-bold text-gray-700 mb-1">নির্দেশনা শিরোনাম</label><input type="text" value={verificationConfig.instructionsTitle} onChange={(e)=>setVerificationConfig({...verificationConfig, instructionsTitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div className="mt-3"><label className="block text-xs font-bold text-gray-700 mb-1">নির্দেশনা লাইন (প্রতি লাইনে একটি)</label><textarea rows="4" value={verificationConfig.instructionsList.join('\n')} onChange={(e)=>setVerificationConfig({...verificationConfig, instructionsList: e.target.value.split('\n')})} className="w-full px-3 py-2 border rounded-lg text-sm"></textarea></div><div className="grid grid-cols-2 gap-4 mt-3"><div><label className="block text-xs font-bold text-gray-700 mb-1">হেল্পলাইন লেবেল</label><input type="text" value={verificationConfig.helplineLabel} onChange={(e)=>setVerificationConfig({...verificationConfig, helplineLabel: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div><div><label className="block text-xs font-bold text-gray-700 mb-1">হেল্পলাইন নম্বর</label><input type="text" value={verificationConfig.helplineNumber} onChange={(e)=>setVerificationConfig({...verificationConfig, helplineNumber: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div></div><div className="mt-3"><label className="block text-xs font-bold text-gray-700 mb-1">ট্রাস্ট মেসেজ (নিচের ব্যানার)</label><input type="text" value={verificationConfig.trustMessage} onChange={(e)=>setVerificationConfig({...verificationConfig, trustMessage: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div></div><button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl"><FaSave /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'যাচাই পৃষ্ঠার তথ্য সংরক্ষণ করুন'}</button></form>
        </div>

        {/* গ্যালারি */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaPlusCircle className="text-pink-600" /><h2>গ্যালারি ব্যবস্থাপনা (ছবি ও বিবরণ)</h2></div>
          <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-50/30 p-4 rounded-xl border border-pink-100 mb-6">
            <div className="md:col-span-2"><h3 className="text-xs font-bold text-pink-800">{editingGalleryId ? '✏️ ছবির তথ্য পরিবর্তন করুন' : '➕ নতুন ছবি যুক্ত করুন'}</h3></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ছবির শিরোনাম *</label><input type="text" required value={galleryForm.title} onChange={(e)=>setGalleryForm({...galleryForm, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ক্যাটাগরি *</label><select value={galleryForm.category} onChange={(e)=>setGalleryForm({...galleryForm, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">{galleryCategories.map(cat=><option key={cat} value={cat}>{cat}</option>)}</select></div>
            <div className="md:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">ছবির URL (ইমেজ লিংক) *</label><input type="url" required value={galleryForm.image} onChange={(e)=>setGalleryForm({...galleryForm, image: e.target.value})} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">তারিখ (ঐচ্ছিক)</label><input type="text" value={galleryForm.date} onChange={(e)=>setGalleryForm({...galleryForm, date: e.target.value})} placeholder="যেমন: ০৭ জুন, ২০২৬" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
            <div className="md:col-span-2 pt-2"><button type="submit" disabled={galleryLoading} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg text-sm">{galleryLoading ? 'সংরক্ষণ হচ্ছে...' : (editingGalleryId ? 'হালনাগাদ করুন' : 'গ্যালারিতে যোগ করুন')}</button></div>
          </form>
          <div className="overflow-x-auto rounded-xl border border-gray-200"><table className="w-full text-left border-collapse text-xs"><thead className="bg-slate-100 text-slate-700 font-bold"><tr><th className="p-3 text-center">ক্রম</th><th className="p-3">শিরোনাম</th><th className="p-3">ক্যাটাগরি</th><th className="p-3">তারিখ</th><th className="p-3">ছবি</th><th className="p-3 text-center">অ্যাকশন</th></tr></thead><tbody>{galleryItems.map((item,idx)=>(<tr key={item._id}><td className="p-3 text-center">{idx+1}</td><td className="p-3">{item.title}</td><td className="p-3">{item.category}</td><td className="p-3">{item.date||'N/A'}</td><td className="p-3"><img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover shadow-sm" /></td><td className="p-3 text-center"><button onClick={()=>startEditGallery(item)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><FaEdit /></button><button onClick={()=>deleteGalleryItem(item._id)} className="p-1.5 bg-red-50 text-red-600 rounded"><FaTrashAlt /></button></td></tr>))}</tbody></table></div>
        </div>

        {/* আপডেট/নোটিশ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaBullhorn className="text-orange-500" /><h2>আপডেট ও নোটিশ ব্যবস্থাপনা</h2></div>
          <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50/30 p-4 rounded-xl border border-orange-100 mb-6">
            <div className="md:col-span-2"><h3 className="text-xs font-bold text-orange-800">{editingUpdateId ? '✏️ আপডেট তথ্য পরিবর্তন করুন' : '➕ নতুন আপডেট যুক্ত করুন'}</h3></div>
            <div className="md:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">শিরোনাম *</label><input type="text" required value={updateForm.title} onChange={(e)=>setUpdateForm({...updateForm, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
            <div className="md:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">বিবরণ *</label><textarea rows="3" required value={updateForm.description} onChange={(e)=>setUpdateForm({...updateForm, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm bg-white"></textarea></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ট্যাগ/ক্যাটাগরি</label><select value={updateForm.tag} onChange={(e)=>{ const selected=tagOptions.find(opt=>opt.label===e.target.value); setUpdateForm({...updateForm, tag: e.target.value, tagColor: selected.color}); }} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">{tagOptions.map(opt=><option key={opt.label} value={opt.label}>{opt.label}</option>)}</select></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">ট্যাগ রং (প্রি-সেট)</label><input type="text" value={updateForm.tagColor} disabled className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-100" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">তারিখ (ঐচ্ছিক)</label><input type="text" value={updateForm.date} onChange={(e)=>setUpdateForm({...updateForm, date: e.target.value})} placeholder="যেমন: ০৭ জুন, ২০২৬" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">লিংক (ঐচ্ছিক)</label><input type="text" value={updateForm.link} onChange={(e)=>setUpdateForm({...updateForm, link: e.target.value})} placeholder="#" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
            <div className="md:col-span-2 pt-2"><button type="submit" disabled={updateLoading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg text-sm">{updateLoading ? 'সংরক্ষণ হচ্ছে...' : (editingUpdateId ? 'হালনাগাদ করুন' : 'তালিকায় যোগ করুন')}</button></div>
          </form>
          <div className="overflow-x-auto rounded-xl border border-gray-200"><table className="w-full text-left border-collapse text-xs"><thead className="bg-slate-100 text-slate-700 font-bold"><tr><th className="p-3 text-center">ক্রম</th><th className="p-3">শিরোনাম</th><th className="p-3">ট্যাগ</th><th className="p-3">তারিখ</th><th className="p-3 text-center">অ্যাকশন</th></tr></thead><tbody>{updatesList.map((item,idx)=>(<tr key={item._id}><td className="p-3 text-center">{idx+1}</td><td className="p-3 font-semibold max-w-[300px] truncate">{item.title}</td><td className="p-3"><span className={`${item.tagColor} text-white text-[10px] px-2 py-0.5 rounded`}>{item.tag}</span></td><td className="p-3">{item.date||'N/A'}</td><td className="p-3 text-center"><button onClick={()=>startEditUpdate(item)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><FaEdit /></button><button onClick={()=>deleteUpdate(item._id)} className="p-1.5 bg-red-50 text-red-600 rounded"><FaTrashAlt /></button></td></tr>))}</tbody></table></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;