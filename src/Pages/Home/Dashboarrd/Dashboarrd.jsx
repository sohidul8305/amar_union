import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaBullhorn, FaCogs, FaArrowLeft, FaInfoCircle, FaSave, FaListAlt, FaUsers, FaUserTie, FaHistory, FaTrashAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // ==================== AUTHENTICATION STATE (FIRST) ====================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // ==================== ALL ORIGINAL STATES ====================
  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [serviceTitle, setServiceTitle] = useState('');
  const [servicePath, setServicePath] = useState('');
  const [iconName, setIconName] = useState('FaFileAlt');
  const [iconColor, setIconColor] = useState('text-blue-600');

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

  const [glancePop, setGlancePop] = useState('');
  const [glanceVoters, setGlanceVoters] = useState('');
  const [glanceArea, setGlanceArea] = useState('');
  const [glanceLiteracy, setGlanceLiteracy] = useState('');
  const [glanceVillages, setGlanceVillages] = useState('');
  const [glanceSchools, setGlanceSchools] = useState('');
  const [glanceHealth, setGlanceHealth] = useState('');
  const [glanceEst, setGlanceEst] = useState('');

  const [chairmanName, setChairmanName] = useState('মোঃ আবদুর রহমান');
  const [chairmanPhone, setChairmanPhone] = useState('+৮৮০ ১৭১১-২২৩৩৪৪');
  const [chairmanEmail, setChairmanEmail] = useState('chairman@union.gov.bd');
  const [chairmanImg, setChairmanImg] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400');
  const [secretaryName, setSecretaryName] = useState('নাব সুকোমল বড়ুয়া');
  const [secretaryPhone, setSecretaryPhone] = useState('+৮৮০ ১৭১২-৫৫৬৬৭৭');
  const [secretaryEmail, setSecretaryEmail] = useState('secretary@union.gov.bd');
  const [secretaryImg, setSecretaryImg] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400');

  const [chTitle, setChTitle] = useState('সম্মানিত চেয়ারম্যান');
  const [chUnion, setChUnion] = useState('১৬ নং মোহনপুর ইউনিয়ন পরিষদ');
  const [chJoinDate, setChJoinDate] = useState('১০ জানুয়ারি, ২০২২');
  const [chAddress, setChAddress] = useState('চেয়ারম্যান বাসভবন, ইউনিয়ন পরিষদ কমপ্লেক্স।');
  const [chMessage, setChMessage] = useState('আসসালামু আলাইকুম। আমাদের ইউনিয়নকে একটি আদর্শ, ডিজিটাল এবং দুর্নীতিমুক্ত ইউনিয়ন হিসেবে গড়ে তোলাই আমার প্রধান লক্ষ্য...');
  const [fatherName, setFatherName] = useState('মরহুম আলহাজ্ব আলী আহমেদ');
  const [education, setEducation] = useState('স্নাতকোত্তর (এম.এ)');
  const [politicalRole, setPoliticalRole] = useState('সভাপতি, ইউনিয়ন আওয়ামী লীগ / বিএনপি / স্বতন্ত্র');
  const [socialContribution, setSocialContribution] = useState('প্রধান উপদেষ্টা, স্থানীয় সমাজকল্যাণ সংস্থা।');

  const [exChairmansList, setExChairmansList] = useState([
    { id: 1, name: 'আলহাজ্ব মোঃ শামসুল হক', title: 'সাবেক চেয়ারম্যান', duration: '২০১৬ - ২০২২', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300', status: 'জীবিত', village: 'উত্তর পাড়া' },
    { id: 2, name: 'মরহুম আলতাফ আলী মিয়া', title: 'সাবেক চেয়ারম্যান', duration: '২০১১ - ২০১৬', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', status: 'প্রয়াত', village: 'দক্ষিণ বাজার' },
    { id: 3, name: 'মোঃ দেলোয়ার হোসেন (বিএ)', title: 'সাবেক চেয়ারম্যান', duration: '২০০৩ - ২০১১', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', status: 'জীবিত', village: 'পূর্ব ধলপুর' },
    { id: 4, name: 'মরহুম আলহাজ্ব মফিজ উদ্দিন', title: 'সাবেক চেয়ারম্যান', duration: '১৯৯৮ - ২০০৩', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300', status: 'প্রয়াত', village: 'পশ্চিম পাড়া' }
  ]);
  useEffect(() => { if (isAuthenticated) fetchProjects(); }, [isAuthenticated]);
  const fetchProjects = async () => {
  try {
    const res = await axios.get('/api/projects');
    if (res.data.success) setProjectsList(res.data.projects);
    else setProjectsList([]);
  } catch (err) { console.error('প্রকল্প লোড ব্যর্থ:', err); }
};

  // প্রজেক্ট স্টেট
const [projectsList, setProjectsList] = useState([]);
const [projectForm, setProjectForm] = useState({ name: '', budget: '', status: 'প্রক্রিয়াধীন' });
const [editingProjectId, setEditingProjectId] = useState(null);
const [projectLoading, setProjectLoading] = useState(false);
  const [exName, setExName] = useState('');
  const [exDuration, setExDuration] = useState('');
  const [exImage, setExImage] = useState('');
  const [exStatus, setExStatus] = useState('জীবিত');
  const [exVillage, setExVillage] = useState('');
  const [editingExId, setEditingExId] = useState(null);

  const [councillorsList, setCouncillorsList] = useState([]);
  const [councillorForm, setCouncillorForm] = useState({
    name: '', ward: '', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '', email: '', image: ''
  });
  const [editingCouncillorId, setEditingCouncillorId] = useState(null);
  const [councillorLoading, setCouncillorLoading] = useState(false);

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

  const [staffList, setStaffList] = useState([]);
  const [staffForm, setStaffForm] = useState({
    name: '', role: '', area: '', image: '', phone: ''
  });
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [staffLoading, setStaffLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    addressLine1: '১নং মডেল ইউনিয়ন পরিষদ কমপ্লেক্স',
    addressLine2: 'ঢাকা, বাংলাদেশ',
    phone1: '+৮৮০ ১৭০০-XXXXXX (সচিব)',
    phone2: 'জাতীয় সেবা নং: ৩৩৩, ৯৯৯',
    email: 'info@yourunionup.gov.bd',
    mapEmbedUrl: '', facebook: '', twitter: '', youtube: ''
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

  const [secretaryProfile, setSecretaryProfile] = useState({
    name: '', title: '', department: '', image: '', joiningDate: '', phone: '', email: '', officeTime: '', education: '', responsibilities: []
  });
  const [secretaryLoading, setSecretaryLoading] = useState(false);

  const [accountConfig, setAccountConfig] = useState({
    financialYear: '২০২৫ - ২০২৬',
    accountStats: [
      { id: 1, label: 'মোট বরাদ্দ / বাজেট', value: '১,২৫,৫০,০০০ টাকা', detail: 'চলতি অর্থবছর', icon: '💰' },
      { id: 2, label: 'রাজস্ব আয় (ট্যাক্স/ফি)', value: '৪৫,২০,০০০ টাকা', detail: 'লক্ষ্যমাত্রা: ৮০%', icon: '📈' },
      { id: 3, label: 'উন্নয়নমূলক ব্যয়', value: '৬৮,৩০,০০০ টাকা', detail: 'রাস্তা ও অবকাঠামো', icon: '🏗️' },
      { id: 4, label: 'সংরক্ষিত তহবিল', value: '১১,৯০,০০০ টাকা', detail: 'জরুরী আপদকালীন', icon: '🏦' }
    ],
    budgetSectors: [
      { id: 1, sector: 'অবকাঠামো ও রাস্তাঘাট উন্নয়ন', allocation: '৪০%', amount: '৫০,২০,০০০ টাকা', status: 'চলমান' },
      { id: 2, sector: 'শিক্ষা, সংস্কৃতি ও ক্রীড়া', allocation: '২০%', amount: '২৫,১০,০০০ টাকা', status: 'অনুমোদিত' },
      { id: 3, sector: 'স্বাস্থ্য ও সমাজকল্যাণ', allocation: '১৫%', amount: '১৮,৮২,৫০০ টাকা', status: 'চলমান' },
      { id: 4, sector: 'কৃষি ও মৎস্য সম্পদ উন্নয়ন', allocation: '১৫%', amount: '১৮,৮২,৫০০ টাকা', status: 'অনুমোদিত' },
      { id: 5, sector: 'দুর্যোগ ব্যবস্থাপনা ও ত্রাণ', allocation: '১০%', amount: '১২,৫৫,০০০ টাকা', status: 'সংরক্ষিত' }
    ],
    footerNotice: 'ইউনিয়ন পরিষদের যাবতীয় কর (ট্যাক্স), ট্রেড লাইসেন্স ফি এবং বিবিধ ফি ডিজিটাল ক্যাশ কাউন্টারে জমা দিয়ে রশিদ সংগ্রহ করার জন্য অনুরোধ করা হলো। অর্থ সংক্রান্ত স্বচ্ছতা রক্ষায় আমরা প্রতিশ্রুতিবদ্ধ।'
  });
  const [accountLoading, setAccountLoading] = useState(false);

  const [footerConfig, setFooterConfig] = useState({
    logoUrl: '',
    unionName: '৪নং সুবিল ইউনিয়ন পরিষদ',
    aboutText: 'স্মার্ট প্রযুক্তি ব্যবহারের মাধ্যমে সুবিল ইউনিয়নের নাগরিকদের দোরগোড়ায় দ্রুত ও স্বচ্ছ ডিজিটাল সেবা পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।',
    address: 'ইউনিয়ন পরিষদ ভবন, সুবিল, দেবিদ্বার, কুমিল্লা।',
    phone: '+৮৮০১XXXXXXXXX',
    email: 'info@subilup.gov.bd',
    facebook: '', youtube: '',
    quickLinks: [
      { title: 'ট্রেড লাইসেন্স আবেদন', path: '/service/trade-license' },
      { title: 'নাগরিকত্ব সনদের আবেদন', path: '/service/citizenship-certificate' },
      { title: 'জন্ম ও মৃত্যু নিবন্ধন', path: '/service/death-certificate' },
      { title: 'চারিত্রিক সনদ আবেদন', path: '/service/premises-license' },
      { title: 'ওয়ারিশন সনদ আবেদন', path: '/service/warish-certificate' }
    ],
    govLinks: [
      { title: 'জাতীয় তথ্য বাতায়ন', url: 'https://bangladesh.gov.bd' },
      { title: 'জন্ম-মৃত্যু নিবন্ধন', url: 'https://bdris.gov.bd' },
      { title: 'এনআইডি পোর্টাল', url: 'https://services.nidw.gov.bd' },
      { title: 'ই-পর্চা বাতায়ন', url: 'https://eporcha.gov.bd' }
    ],
    copyrightText: '© ২০২৬ ৪নং সুবিল ইউনিয়ন পরিষদ। সর্বস্বত্ব সংরক্ষিত।',
    developerCredit: 'Sohidul Islam'
  });
  const [footerLoading, setFooterLoading] = useState(false);

  const [councillorsPageConfig, setCouncillorsPageConfig] = useState({
    pageTitle: 'কাউন্সিলর / সদস্যবৃন্দ',
    pageSubtitle: 'আপনাদের স্ব-স্ব ওয়ার্ডের উন্নয়ন ও নাগরিক সেবা নিশ্চিতকরণে নিয়োজিত জনপ্রতিনিধিবৃন্দ।',
    showPhone: true, showEmail: true
  });
  const [councillorsPageLoading, setCouncillorsPageLoading] = useState(false);

  // ==================== FETCH FUNCTIONS ====================
  const fetchCouncillors = async () => {
    try {
      const res = await axios.get('/api/councillors');
      if (res.data.success && Array.isArray(res.data.councillors)) {
        setCouncillorsList(res.data.councillors);
      } else {
        setCouncillorsList([]);
      }
    } catch (err) {
      console.error('কাউন্সিলর লোড ব্যর্থ:', err);
      setCouncillorsList([]);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const res = await axios.get('/api/contact-info');
      if (res.data && Object.keys(res.data).length) setContactInfo(prev => ({ ...prev, ...res.data }));
    } catch (err) { console.error(err); }
  };

  const fetchVerificationConfig = async () => {
    try {
      const res = await axios.get('/api/verification-page');
      if (res.data && Object.keys(res.data).length) setVerificationConfig(prev => ({ ...prev, ...res.data }));
    } catch (err) { console.error(err); }
  };

  const fetchGallery = async () => {
    try {
      const res = await axios.get('/api/gallery');
      if (res.data.success) setGalleryItems(res.data.items);
      else setGalleryItems([]);
    } catch (err) { console.error('গ্যালারি লোড ব্যর্থ:', err); }
  };

  const fetchUpdates = async () => {
    try {
      const res = await axios.get('/api/updates');
      if (res.data.success) setUpdatesList(res.data.updates);
      else setUpdatesList([]);
    } catch (err) { console.error(err); }
  };

  const fetchSecretaryProfile = async () => {
    try {
      const res = await axios.get('/api/secretary');
      if (res.data && res.data.name) setSecretaryProfile(prev => ({ ...prev, ...res.data }));
      else {
        setSecretaryProfile({
          name: 'জনাব সুকোমল বড়ুয়া', title: 'ইউনিয়ন পরিষদ সচিব', department: 'স্থানীয় সরকার বিভাগ (এলজিডি)',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
          joiningDate: '১৫ মে, ২০২০', phone: '+৮৮০ ১৭১২-৫৫৬৬৭৭', email: 'secretary@union.gov.bd',
          officeTime: 'সকাল ৯:০০ - বিকেল ৫:০০ (রবি - বৃহস্পতিবার)', education: 'স্নাতকোত্তর (লোক প্রশাসন), ঢাকা বিশ্ববিদ্যালয়',
          responsibilities: [
            'ইউনিয়ন পরিষদের যাবতীয় প্রশাসনিক ও দাপ্তরিক কার্য পরিচালনা।',
            'পরিষদের বাজেট প্রণয়ন, হিসাব সংরক্ষণ এবং আর্থিক বিবরণী প্রস্তুতকরণ।',
            'জন্ম-মৃত্যু নিবন্ধন, নাগরিক সনদ ও বিভিন্ন লাইসেন্স ইস্যুকরণে সমন্বয়।'
          ]
        });
      }
    } catch (err) { console.error(err); }
  };

  const fetchAccountConfig = async () => {
    try {
      const res = await axios.get('/api/account');
      if (res.data && Object.keys(res.data).length) setAccountConfig(prev => ({ ...prev, ...res.data }));
    } catch (err) { console.error(err); }
  };

  const fetchOtherStaff = async () => {
    try {
      const res = await axios.get('/api/other-staff');
      if (res.data.success) setStaffList(res.data.staff);
      else setStaffList([]);
    } catch (err) { console.error('স্টাফ লোড ব্যর্থ:', err); }
  };

  const fetchExChairmans = async () => {
    try {
      const res = await axios.get('/api/ex-chairmans');
      if (res.data.success && res.data.chairmans.length > 0) {
        setExChairmansList(res.data.chairmans);
      }
    } catch (err) { console.error('সাবেক চেয়ারম্যান লোড ব্যর্থ:', err); }
  };

  const fetchFooterConfig = async () => {
    try {
      const res = await axios.get('/api/footer');
      if (res.data && Object.keys(res.data).length) setFooterConfig(prev => ({ ...prev, ...res.data }));
    } catch (err) { console.error('ফুটার কনফিগ লোড ব্যর্থ:', err); }
  };

  const fetchCouncillorsPageConfig = async () => {
    try {
      const res = await axios.get('/api/councillors-page-config');
      if (res.data && Object.keys(res.data).length) setCouncillorsPageConfig(prev => ({ ...prev, ...res.data }));
    } catch (err) { console.error('কনফিগ লোড ব্যর্থ:', err); }
  };

  // ==================== useEffect (login check + conditional data fetch) ====================
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => { if (isAuthenticated) fetchCouncillors(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchContactInfo(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchVerificationConfig(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchGallery(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchUpdates(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchSecretaryProfile(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchAccountConfig(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchOtherStaff(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchExChairmans(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchFooterConfig(); }, [isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchCouncillorsPageConfig(); }, [isAuthenticated]);

  // ==================== HANDLERS (all your original handlers) ====================
  const saveAllCouncillors = async () => {
    setCouncillorLoading(true);
    try {
      const payload = councillorsList.map(({ _id, ...rest }) => rest);
      const response = await axios.post('/api/councillors', { councillors: payload });
      if (response.data.success) {
        setMessage({ text: 'কাউন্সিলর তালিকা সফলভাবে সংরক্ষিত!', isError: false });
        await fetchCouncillors();
      } else {
        setMessage({ text: 'সংরক্ষণ ব্যর্থ: ' + (response.data.message || ''), isError: true });
      }
    } catch (err) {
      setMessage({ text: 'সংরক্ষণ ব্যর্থ! সার্ভার এরর', isError: true });
    } finally {
      setCouncillorLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
  e.preventDefault();
  const { name, budget, status } = projectForm;
  if (!name || !budget) {
    setMessage({ text: 'নাম ও বাজেট আবশ্যক', isError: true });
    return;
  }
  setProjectLoading(true);
  try {
    if (editingProjectId) {
      await axios.put(`/api/projects/${editingProjectId}`, { name, budget, status });
      setMessage({ text: 'প্রকল্প আপডেট হয়েছে', isError: false });
    } else {
      await axios.post('/api/projects', { name, budget, status });
      setMessage({ text: 'নতুন প্রকল্প যুক্ত হয়েছে', isError: false });
    }
    fetchProjects();
    setProjectForm({ name: '', budget: '', status: 'প্রক্রিয়াধীন' });
    setEditingProjectId(null);
  } catch (err) {
    setMessage({ text: 'সংরক্ষণ ব্যর্থ', isError: true });
  } finally {
    setProjectLoading(false);
  }
};

const startEditProject = (item) => {
  setEditingProjectId(item._id);
  setProjectForm({ name: item.name, budget: item.budget, status: item.status });
};

const deleteProject = async (id) => {
  if (!window.confirm('মুছতে চান?')) return;
  try {
    await axios.delete(`/api/projects/${id}`);
    setMessage({ text: 'প্রকল্প মুছে ফেলা হয়েছে', isError: false });
    fetchProjects();
    if (editingProjectId === id) {
      setEditingProjectId(null);
      setProjectForm({ name: '', budget: '', status: 'প্রক্রিয়াধীন' });
    }
  } catch (err) {
    setMessage({ text: 'মুছতে ব্যর্থ', isError: true });
  }
};

  const handleCouncillorSubmit = (e) => {
    e.preventDefault();
    const { name, ward, role, phone, email, image } = councillorForm;
    if (!name || !ward) {
      setMessage({ text: 'নাম ও ওয়ার্ড আবশ্যক', isError: true });
      return;
    }
    if (editingCouncillorId) {
      setCouncillorsList(prev =>
        prev.map(c => c._id === editingCouncillorId ? { ...c, name, ward, role, phone, email, image } : c)
      );
      setEditingCouncillorId(null);
      setMessage({ text: 'সদস্য হালনাগাদ করা হয়েছে। "তালিকা সংরক্ষণ করুন" বাটনে ক্লিক করুন।', isError: false });
    } else {
      const newItem = { _id: 'temp_' + Date.now(), name, ward, role, phone, email, image };
      setCouncillorsList(prev => [...prev, newItem]);
      setMessage({ text: 'নতুন সদস্য যুক্ত করা হয়েছে। "তালিকা সংরক্ষণ করুন" বাটনে ক্লিক করুন।', isError: false });
    }
    setCouncillorForm({ name: '', ward: '', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '', email: '', image: '' });
  };

  const startEditCouncillor = (item) => {
    setEditingCouncillorId(item._id);
    setCouncillorForm({
      name: item.name, ward: item.ward, role: item.role, phone: item.phone, email: item.email, image: item.image || ''
    });
    setMessage({ text: 'সদস্য তথ্য এডিট মোডে। পরিবর্তন করে "হালনাগাদ করুন" বাটনে ক্লিক করুন।', isError: false });
  };

  const deleteCouncillor = (id) => {
    if (window.confirm('মুছতে চান?')) {
      setCouncillorsList(prev => prev.filter(c => c._id !== id));
      if (editingCouncillorId === id) {
        setEditingCouncillorId(null);
        setCouncillorForm({ name: '', ward: '', role: 'ইউপি সদস্য / কাউন্সিলর', phone: '', email: '', image: '' });
      }
      setMessage({ text: 'সদস্য মুছে ফেলা হয়েছে। "তালিকা সংরক্ষণ করুন" বাটনে ক্লিক করুন।', isError: false });
    }
  };

  const handleMemberChange = (id, field, val) => {
    setMembersList(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/notices', { title: noticeTitle, date: noticeDate });
      setMessage({ text: res.data.message, isError: false });
      setNoticeTitle(''); setNoticeDate('');
    } catch (err) { setMessage({ text: 'নোটিশ যোগ করতে সমস্যা', isError: true }); }
    finally { setLoading(false); }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/services', { title: serviceTitle, path: servicePath, iconName, iconColor });
      setMessage({ text: res.data.message, isError: false });
      setServiceTitle(''); setServicePath('');
    } catch (err) { setMessage({ text: 'সেবা যোগ করতে সমস্যা', isError: true }); }
    finally { setLoading(false); }
  };

  const handleIntroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalIntroData = { title: introTitle, subtitle: introSubtitle, history: introHistory, established: establishedIntro, area: areaIntro, totalVillages: totalVillagesIntro, totalPopulation: totalPopulationIntro, literacyRate: literacyRateIntro, college, highSchool, primarySchool, madrasah, landmarks };
    try {
      const response = await axios.post('/api/intro', finalIntroData);
      setMessage({ text: response.data.message, isError: false });
    } catch (error) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const handleGlanceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalGlanceData = { totalPopulation: glancePop, totalVoters: glanceVoters, area: glanceArea, literacyRate: glanceLiteracy, totalVillages: glanceVillages, primarySchools: glanceSchools, healthCenters: glanceHealth, established: glanceEst };
    try {
      const response = await axios.post('/api/glance', finalGlanceData);
      setMessage({ text: response.data.message, isError: false });
    } catch (error) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const handleStructureSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const topManagement = [{ id: 1, name: chairmanName, role: 'চেয়ারম্যান', image: chairmanImg, phone: chairmanPhone, email: chairmanEmail }, { id: 2, name: secretaryName, role: 'সচিব', image: secretaryImg, phone: secretaryPhone, email: secretaryEmail }];
    try {
      const response = await axios.post('/api/structure', { topManagement, members: membersList });
      setMessage({ text: response.data.message, isError: false });
    } catch (error) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const handleChairmanProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const chairmanProfileData = { name: chairmanName, title: chTitle, union: chUnion, image: chairmanImg, joiningDate: chJoinDate, phone: chairmanPhone, email: chairmanEmail, address: chAddress, message: chMessage, bio: [{ label: 'পিতার নাম', value: fatherName }, { label: 'শিক্ষাগত যোগ্যতা', value: education }, { label: 'রাজনৈতিক পদবী', value: politicalRole }, { label: 'সামাজিক অবদান', value: socialContribution }] };
    try {
      const response = await axios.post('/api/chairman', chairmanProfileData);
      setMessage({ text: response.data.message, isError: false });
    } catch (error) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact-info', contactInfo);
      setMessage({ text: 'যোগাযোগের তথ্য আপডেট হয়েছে', isError: false });
    } catch (err) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const handleVerificationConfigSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/verification-page', verificationConfig);
      setMessage({ text: 'যাচাই পৃষ্ঠার তথ্য আপডেট হয়েছে', isError: false });
    } catch (err) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const handleExChairmanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let updatedList;
    if (editingExId) updatedList = exChairmansList.map(item => item.id === editingExId ? { ...item, name: exName, duration: exDuration, image: exImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', status: exStatus, village: exVillage } : item);
    else updatedList = [...exChairmansList, { id: Date.now(), name: exName, title: 'সাবেক চেয়ারম্যান', duration: exDuration, image: exImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', status: exStatus, village: exVillage }];
    try {
      await axios.post('/api/ex-chairmans', { chairmans: updatedList });
      setExChairmansList(updatedList);
      setMessage({ text: 'সাবেক চেয়ারম্যান তালিকা আপডেট হয়েছে', isError: false });
      setExName(''); setExDuration(''); setExImage(''); setExVillage(''); setExStatus('জীবিত'); setEditingExId(null);
    } catch (error) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setLoading(false); }
  };

  const startEditEx = (item) => {
    setEditingExId(item.id);
    setExName(item.name); setExDuration(item.duration); setExImage(item.image); setExVillage(item.village); setExStatus(item.status);
  };

  const deleteExChairman = async (id) => {
    if (!window.confirm('মুছতে চান?')) return;
    const filtered = exChairmansList.filter(item => item.id !== id);
    try {
      await axios.post('/api/ex-chairmans', { chairmans: filtered });
      setExChairmansList(filtered);
      setMessage({ text: 'মুছে ফেলা হয়েছে', isError: false });
    } catch (err) { setMessage({ text: 'মুছতে ব্যর্থ', isError: true }); }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const { title, category, image, date } = galleryForm;
    if (!title || !category || !image) { setMessage({ text: 'সব তথ্য দিন', isError: true }); return; }
    setGalleryLoading(true);
    try {
      if (editingGalleryId) await axios.put(`/api/gallery/${editingGalleryId}`, { title, category, image, date });
      else await axios.post('/api/gallery', { title, category, image, date });
      setMessage({ text: 'গ্যালারি আইটেম সংরক্ষিত', isError: false });
      fetchGallery();
      setGalleryForm({ title: '', category: 'উন্নয়ন প্রকল্প', image: '', date: '' });
      setEditingGalleryId(null);
    } catch (err) { setMessage({ text: 'ব্যর্থ', isError: true }); }
    finally { setGalleryLoading(false); }
  };

  const startEditGallery = (item) => {
    setEditingGalleryId(item._id);
    setGalleryForm({ title: item.title, category: item.category, image: item.image, date: item.date || '' });
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('মুছতে চান?')) return;
    try {
      await axios.delete(`/api/gallery/${id}`);
      setMessage({ text: 'মুছে ফেলা হয়েছে', isError: false });
      fetchGallery();
      if (editingGalleryId === id) { setEditingGalleryId(null); setGalleryForm({ title: '', category: 'উন্নয়ন প্রকল্প', image: '', date: '' }); }
    } catch (err) { setMessage({ text: 'মুছতে ব্যর্থ', isError: true }); }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tag, tagColor, date, link } = updateForm;
    if (!title || !description) { setMessage({ text: 'শিরোনাম ও বিবরণ দিন', isError: true }); return; }
    setUpdateLoading(true);
    try {
      if (editingUpdateId) await axios.put(`/api/updates/${editingUpdateId}`, { title, description, tag, tagColor, date, link });
      else await axios.post('/api/updates', { title, description, tag, tagColor, date, link });
      setMessage({ text: 'আপডেট সংরক্ষিত', isError: false });
      fetchUpdates();
      setUpdateForm({ title: '', description: '', tag: 'সাধারণ নোটিশ', tagColor: 'bg-blue-500', date: '', link: '#' });
      setEditingUpdateId(null);
    } catch (err) { setMessage({ text: 'ব্যর্থ', isError: true }); }
    finally { setUpdateLoading(false); }
  };

  const startEditUpdate = (item) => {
    setEditingUpdateId(item._id);
    setUpdateForm({ title: item.title, description: item.description, tag: item.tag, tagColor: item.tagColor, date: item.date || '', link: item.link || '#' });
  };

  const deleteUpdate = async (id) => {
    if (!window.confirm('মুছতে চান?')) return;
    try {
      await axios.delete(`/api/updates/${id}`);
      setMessage({ text: 'মুছে ফেলা হয়েছে', isError: false });
      fetchUpdates();
      if (editingUpdateId === id) { setEditingUpdateId(null); setUpdateForm({ title: '', description: '', tag: 'সাধারণ নোটিশ', tagColor: 'bg-blue-500', date: '', link: '#' }); }
    } catch (err) { setMessage({ text: 'মুছতে ব্যর্থ', isError: true }); }
  };

  const handleSecretarySubmit = async (e) => {
    e.preventDefault();
    setSecretaryLoading(true);
    try {
      await axios.post('/api/secretary', secretaryProfile);
      setMessage({ text: 'সচিব প্রোফাইল আপডেট হয়েছে', isError: false });
    } catch (err) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setSecretaryLoading(false); }
  };

  const handleResponsibilitiesChange = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    setSecretaryProfile({ ...secretaryProfile, responsibilities: lines });
  };

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    setFooterLoading(true);
    setMessage({ text: '', isError: false });
    try {
      await axios.post('/api/footer', footerConfig);
      setMessage({ text: 'ফুটারের তথ্য সফলভাবে আপডেট হয়েছে!', isError: false });
    } catch (err) {
      setMessage({ text: 'আপডেট করতে ব্যর্থ!', isError: true });
    } finally {
      setFooterLoading(false);
    }
  };
const handleQuickLinksChange = (linksJson) => {
  try {
    const parsed = JSON.parse(linksJson);
    if (Array.isArray(parsed)) {
      setFooterConfig({...footerConfig, quickLinks: parsed});
      setMessage({ text: 'দ্রুত লিংক ভ্যালিড JSON', isError: false });
    } else {
      throw new Error('অ্যারে না');
    }
  } catch(e) {
    setMessage({ text: 'JSON ফরম্যাট ভুল! উদাহরণ: [{"title":"সেবা","path":"/link"}]', isError: true });
    console.error('JSON Parse Error:', e);
  }
};

const handleGovLinksChange = (linksJson) => {
  try {
    const parsed = JSON.parse(linksJson);
    if (Array.isArray(parsed)) {
      setFooterConfig({...footerConfig, govLinks: parsed});
      setMessage({ text: 'সরকারি লিংক ভ্যালিড JSON', isError: false });
    } else {
      throw new Error('অ্যারে না');
    }
  } catch(e) {
    setMessage({ text: 'JSON ফরম্যাট ভুল! উদাহরণ: [{"title":"বাংলাদেশ","url":"https://gov.bd"}]', isError: true });
    console.error('JSON Parse Error:', e);
  }
};

  const handleCouncillorsPageSubmit = async (e) => {
    e.preventDefault();
    setCouncillorsPageLoading(true);
    setMessage({ text: '', isError: false });
    try {
      await axios.post('/api/councillors-page-config', councillorsPageConfig);
      setMessage({ text: 'কাউন্সিলর পেজ কনফিগারেশন আপডেট হয়েছে!', isError: false });
    } catch (err) {
      setMessage({ text: 'আপডেট করতে ব্যর্থ!', isError: true });
    } finally {
      setCouncillorsPageLoading(false);
    }
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setAccountLoading(true);
    try {
      await axios.post('/api/account', accountConfig);
      setMessage({ text: 'একাউন্ট পেজ আপডেট হয়েছে', isError: false });
    } catch (err) { setMessage({ text: 'আপডেট ব্যর্থ', isError: true }); }
    finally { setAccountLoading(false); }
  };

  const handleStatsChange = (statsJson) => {
    try {
      const parsed = JSON.parse(statsJson);
      if (Array.isArray(parsed)) setAccountConfig({...accountConfig, accountStats: parsed});
    } catch(e) {}
  };

  const handleSectorsChange = (sectorsJson) => {
    try {
      const parsed = JSON.parse(sectorsJson);
      if (Array.isArray(parsed)) setAccountConfig({...accountConfig, budgetSectors: parsed});
    } catch(e) {}
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    const { name, role, area, image, phone } = staffForm;
    if (!name || !role) {
      setMessage({ text: 'নাম ও পদবি আবশ্যক', isError: true });
      return;
    }
    setStaffLoading(true);
    let updatedList;
    if (editingStaffId) {
      updatedList = staffList.map(item => item._id === editingStaffId ? { ...item, name, role, area, image, phone } : item);
    } else {
      const newStaff = { name, role, area, image, phone, createdAt: new Date() };
      updatedList = [...staffList, newStaff];
    }
    try {
      await axios.post('/api/other-staff', { staffList: updatedList });
      setStaffList(updatedList);
      setMessage({ text: 'কর্মচারী তালিকা আপডেট হয়েছে', isError: false });
      setStaffForm({ name: '', role: '', area: '', image: '', phone: '' });
      setEditingStaffId(null);
    } catch (err) {
      setMessage({ text: 'সংরক্ষণ ব্যর্থ', isError: true });
    } finally {
      setStaffLoading(false);
    }
  };

  const startEditStaff = (item) => {
    setEditingStaffId(item._id);
    setStaffForm({
      name: item.name, role: item.role, area: item.area || '', image: item.image || '', phone: item.phone || ''
    });
  };

  const deleteStaff = async (id) => {
    if (!window.confirm('মুছতে চান?')) return;
    const updatedList = staffList.filter(item => item._id !== id);
    try {
      await axios.post('/api/other-staff', { staffList: updatedList });
      setStaffList(updatedList);
      setMessage({ text: 'মুছে ফেলা হয়েছে', isError: false });
      if (editingStaffId === id) {
        setEditingStaffId(null);
        setStaffForm({ name: '', role: '', area: '', image: '', phone: '' });
      }
    } catch (err) {
      setMessage({ text: 'মুছতে ব্যর্থ', isError: true });
    }
  };

  // ==================== LOGIN / LOGOUT HANDLERS ====================
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const validEmail = "admin@union.gov.bd";
    const validPassword = "admin123";
    if (loginEmail === validEmail && loginPassword === validPassword) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
    } else {
      setLoginError('ভুল ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে সঠিক তথ্য দিন।');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  // ==================== RENDER ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">UP</div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">প্রশাসক লগইন</h2>
            <p className="text-gray-500 text-sm mt-1">ইউনিয়ন পরিষদ কন্ট্রোল প্যানেলে প্রবেশ করুন</p>
          </div>
          {loginError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
              <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="admin@union.gov.bd" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••" />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg">{loginLoading ? 'লগইন হচ্ছে...' : 'প্রবেশ করুন'}</button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== AUTHENTICATED DASHBOARD ====================
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-slate-900 text-white py-5 px-6 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3"><div className="bg-amber-500 p-2 rounded text-slate-900 font-bold text-xs sm:text-sm">ADMIN</div><h1 className="text-base sm:text-xl font-bold tracking-wide">ইউনিয়ন পরিষদ কন্ট্রোল প্যানেল</h1></div>
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-lg border border-slate-700 transition"><FaArrowLeft /> মূল ওয়েবসাইট</Link>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-xs px-4 py-2 rounded-lg transition"><FaSignOutAlt /> লগআউট</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {message.text && (
          <div className={`p-4 rounded-xl text-sm font-semibold text-center border shadow-sm ${message.isError ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
            {message.text}
          </div>
        )}

        {/* নোটিশ ও সার্ভিস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-4"><FaBullhorn className="text-amber-500" /><h2>নতুন নোটিশ জারি করুন</h2></div>
            <form onSubmit={handleNoticeSubmit} className="space-y-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">নোটিশের শিরোনাম *</label><textarea required rows="2" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">তারিখ</label><input type="text" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} placeholder="যেমন: ০৭ জুন, ২০২৬" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">নোটিশ আপডেট করুন</button>
            </form>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-4"><FaCogs className="text-emerald-500" /><h2>নতুন নাগরিক সেবা যোগ করুন</h2></div>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">সেবার নাম *</label><input type="text" required value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">রাউট লিংক *</label><input type="text" required value={servicePath} onChange={(e) => setServicePath(e.target.value)} placeholder="/service/trade-license" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" /></div>
              <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg">সেবা গ্রিডে যোগ করুন</button>
            </form>
          </div>
        </div>

        {/* বর্তমান চেয়ারম্যান প্রোফাইল */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUserTie className="text-teal-600" /><h2>চেয়ারম্যান প্রোফাইল আপডেট</h2></div>
          <form onSubmit={handleChairmanProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label>নাম</label><input type="text" value={chairmanName} onChange={(e) => setChairmanName(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
              <div><label>পদবী</label><input type="text" value={chTitle} onChange={(e) => setChTitle(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
              <div><label>ইউনিয়নের নাম</label><input type="text" value={chUnion} onChange={(e) => setChUnion(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
              <div><label>দায়িত্ব গ্রহণের তারিখ</label><input type="text" value={chJoinDate} onChange={(e) => setChJoinDate(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
              <div><label>ঠিকানা</label><input type="text" value={chAddress} onChange={(e) => setChAddress(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
              <div><label>ছবির URL</label><input type="text" value={chairmanImg} onChange={(e) => setChairmanImg(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
            </div>
            <div><label>চেয়ারম্যানের বাণী</label><textarea rows="4" value={chMessage} onChange={(e) => setChMessage(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
            <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-xl">আপডেট করুন</button>
          </form>
        </div>

        {/* সাবেক চেয়ারম্যান */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaHistory className="text-amber-600" /><h2>সাবেক চেয়ারম্যান</h2></div>
          <form onSubmit={handleExChairmanSubmit} className="grid grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl mb-6">
            <div className="col-span-2"><h3>{editingExId ? 'এডিট' : 'নতুন যোগ'}</h3></div>
            <input type="text" placeholder="নাম" value={exName} onChange={(e)=>setExName(e.target.value)} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="কার্যকাল" value={exDuration} onChange={(e)=>setExDuration(e.target.value)} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="গ্রাম" value={exVillage} onChange={(e)=>setExVillage(e.target.value)} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="ছবি URL" value={exImage} onChange={(e)=>setExImage(e.target.value)} className="border rounded p-2 text-sm col-span-2" />
            <select value={exStatus} onChange={(e)=>setExStatus(e.target.value)} className="border rounded p-2 text-sm"><option>জীবিত</option><option>প্রয়াত</option></select>
            <button type="submit" className="bg-amber-600 text-white py-2 rounded">{editingExId ? 'আপডেট' : 'যোগ করুন'}</button>
          </form>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead><tr className="bg-slate-100"><th>ক্রম</th><th>নাম</th><th>কার্যকাল</th><th>গ্রাম</th><th>অবস্থা</th><th>অ্যাকশন</th></tr></thead>
              <tbody>
                {exChairmansList.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-2">{idx+1}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.duration}</td>
                    <td className="p-2">{item.village||'N/A'}</td>
                    <td className="p-2"><span className={`px-2 py-0.5 rounded ${item.status==='জীবিত'?'bg-blue-50 text-blue-700':'bg-gray-100 text-gray-600'}`}>{item.status}</span></td>
                    <td className="p-2"><button onClick={()=>startEditEx(item)}>✏️</button><button onClick={()=>deleteExChairman(item.id)}>🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* কাউন্সিলর */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUsers className="text-indigo-600" /><h2>কাউন্সিলর / সদস্যবৃন্দ</h2></div>
          <form onSubmit={handleCouncillorSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-indigo-50 p-4 rounded-xl mb-6">
            <input type="text" placeholder="নাম *" value={councillorForm.name} onChange={(e)=>setCouncillorForm({...councillorForm,name:e.target.value})} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="ওয়ার্ড *" value={councillorForm.ward} onChange={(e)=>setCouncillorForm({...councillorForm,ward:e.target.value})} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="ভূমিকা" value={councillorForm.role} onChange={(e)=>setCouncillorForm({...councillorForm,role:e.target.value})} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="মোবাইল" value={councillorForm.phone} onChange={(e)=>setCouncillorForm({...councillorForm,phone:e.target.value})} className="border rounded p-2 text-sm" />
            <input type="email" placeholder="ইমেইল" value={councillorForm.email} onChange={(e)=>setCouncillorForm({...councillorForm,email:e.target.value})} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="ছবি URL" value={councillorForm.image} onChange={(e)=>setCouncillorForm({...councillorForm,image:e.target.value})} className="border rounded p-2 text-sm" />
            <button type="submit" className="col-span-3 bg-indigo-600 text-white py-2 rounded">{editingCouncillorId ? 'হালনাগাদ করুন' : 'তালিকায় যোগ করুন'}</button>
          </form>
          <table className="w-full text-sm border">
            <thead><tr><th>#</th><th>নাম</th><th>ওয়ার্ড</th><th>অ্যাকশন</th></tr></thead>
            <tbody>
              {councillorsList.map((item,idx)=>(
                <tr key={item._id}>
                  <td>{idx+1}</td>
                  <td>{item.name}</td>
                  <td>{item.ward}</td>
                  <td><button onClick={()=>startEditCouncillor(item)}>✏️</button><button onClick={()=>deleteCouncillor(item._id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end"><button onClick={saveAllCouncillors} disabled={councillorLoading} className="bg-emerald-600 text-white py-2 px-4 rounded">{councillorLoading ? 'সংরক্ষণ হচ্ছে...' : 'তালিকা সংরক্ষণ করুন'}</button></div>
        </div>

        {/* সাংগঠনিক কাঠামো */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUsers className="text-violet-600" /><h2>সাংগঠনিক কাঠামো</h2></div>
          <form onSubmit={handleStructureSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><h3>চেয়ারম্যান</h3><input type="text" value={chairmanName} onChange={(e)=>setChairmanName(e.target.value)} className="w-full border rounded p-2" /></div>
              <div><h3>সচিব</h3><input type="text" value={secretaryName} onChange={(e)=>setSecretaryName(e.target.value)} className="w-full border rounded p-2" /></div>
            </div>
            <button type="submit" className="bg-violet-600 text-white py-2 rounded">আপডেট</button>
          </form>
        </div>

        {/* এক নজরে ইউনিয়ন */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaListAlt className="text-green-600" /><h2>এক নজরে ইউনিয়ন</h2></div>
          <form onSubmit={handleGlanceSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input type="text" placeholder="মোট জনসংখ্যা" value={glancePop} onChange={(e)=>setGlancePop(e.target.value)} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="মোট ভোটার" value={glanceVoters} onChange={(e)=>setGlanceVoters(e.target.value)} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="আয়তন" value={glanceArea} onChange={(e)=>setGlanceArea(e.target.value)} className="border rounded p-2 text-sm" />
            <input type="text" placeholder="শিক্ষার হার" value={glanceLiteracy} onChange={(e)=>setGlanceLiteracy(e.target.value)} className="border rounded p-2 text-sm" />
            <button type="submit" className="col-span-4 bg-green-600 text-white py-2 rounded">আপডেট</button>
          </form>
        </div>

        {/* ইউনিয়ন পরিচিতি */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-blue-600" /><h2>ইউনিয়ন পরিচিতি</h2></div>
          <form onSubmit={handleIntroSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="শিরোনাম" value={introTitle} onChange={(e)=>setIntroTitle(e.target.value)} className="border rounded p-2" />
              <input type="text" placeholder="উপশিরোনাম" value={introSubtitle} onChange={(e)=>setIntroSubtitle(e.target.value)} className="border rounded p-2" />
            </div>
            <textarea placeholder="ইতিহাস" rows="4" value={introHistory} onChange={(e)=>setIntroHistory(e.target.value)} className="border rounded p-2 w-full"></textarea>
            <button type="submit" className="bg-blue-950 text-white py-2 rounded">আপডেট</button>
          </form>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-purple-600" /><h2>যোগাযোগ তথ্য</h2></div>
          <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="ঠিকানা লাইন ১" value={contactInfo.addressLine1} onChange={(e)=>setContactInfo({...contactInfo, addressLine1:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="ঠিকানা লাইন ২" value={contactInfo.addressLine2} onChange={(e)=>setContactInfo({...contactInfo, addressLine2:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="ফোন ১" value={contactInfo.phone1} onChange={(e)=>setContactInfo({...contactInfo, phone1:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="ফোন ২" value={contactInfo.phone2} onChange={(e)=>setContactInfo({...contactInfo, phone2:e.target.value})} className="border rounded p-2" />
            <input type="email" placeholder="ইমেইল" value={contactInfo.email} onChange={(e)=>setContactInfo({...contactInfo, email:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="ম্যাপ URL" value={contactInfo.mapEmbedUrl} onChange={(e)=>setContactInfo({...contactInfo, mapEmbedUrl:e.target.value})} className="border rounded p-2" />
            <button type="submit" className="col-span-2 bg-purple-600 text-white py-2 rounded">আপডেট</button>
          </form>
        </div>

        {/* সনদ যাচাই কনফিগারেশন */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-blue-600" /><h2>সনদ যাচাই কনফিগ</h2></div>
          <form onSubmit={handleVerificationConfigSubmit} className="space-y-4">
            <input type="text" placeholder="পৃষ্ঠার ব্যাজ টেক্সট" value={verificationConfig.badgeText} onChange={(e)=>setVerificationConfig({...verificationConfig, badgeText:e.target.value})} className="w-full border rounded p-2" />
            <input type="text" placeholder="মূল শিরোনাম" value={verificationConfig.pageTitle} onChange={(e)=>setVerificationConfig({...verificationConfig, pageTitle:e.target.value})} className="w-full border rounded p-2" />
            <textarea placeholder="উপশিরোনাম" value={verificationConfig.pageSubtitle} onChange={(e)=>setVerificationConfig({...verificationConfig, pageSubtitle:e.target.value})} className="w-full border rounded p-2"></textarea>
            <button type="submit" className="bg-blue-600 text-white py-2 rounded">আপডেট</button>
          </form>
        </div>

        {/* গ্যালারি */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaPlusCircle className="text-pink-600" /><h2>গ্যালারি</h2></div>
          <form onSubmit={handleGallerySubmit} className="grid grid-cols-2 gap-3 bg-pink-50 p-4 rounded-xl mb-6">
            <input type="text" placeholder="শিরোনাম" value={galleryForm.title} onChange={(e)=>setGalleryForm({...galleryForm, title:e.target.value})} className="border rounded p-2" />
            <select value={galleryForm.category} onChange={(e)=>setGalleryForm({...galleryForm, category:e.target.value})} className="border rounded p-2">{galleryCategories.map(c=><option key={c}>{c}</option>)}</select>
            <input type="text" placeholder="ছবি URL" value={galleryForm.image} onChange={(e)=>setGalleryForm({...galleryForm, image:e.target.value})} className="col-span-2 border rounded p-2" />
            <input type="text" placeholder="তারিখ" value={galleryForm.date} onChange={(e)=>setGalleryForm({...galleryForm, date:e.target.value})} className="border rounded p-2" />
            <button type="submit" className="bg-pink-600 text-white py-2 rounded col-span-2">{editingGalleryId ? 'আপডেট' : 'যোগ করুন'}</button>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr><th>শিরোনাম</th><th>ক্যাটাগরি</th><th>ছবি</th><th>অ্যাকশন</th></tr></thead>
              <tbody>
                {galleryItems.map(item=>(
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td><img src={item.image} className="w-12 h-12 object-cover" alt="gallery" /></td>
                    <td><button onClick={()=>startEditGallery(item)}>✏️</button><button onClick={()=>deleteGalleryItem(item._id)}>🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* আপডেট/নোটিশ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaBullhorn className="text-orange-500" /><h2>আপডেট ও নোটিশ</h2></div>
          <form onSubmit={handleUpdateSubmit} className="grid grid-cols-2 gap-3 bg-orange-50 p-4 rounded-xl mb-6">
            <input type="text" placeholder="শিরোনাম" value={updateForm.title} onChange={(e)=>setUpdateForm({...updateForm, title:e.target.value})} className="col-span-2 border rounded p-2" />
            <textarea placeholder="বিবরণ" rows="3" value={updateForm.description} onChange={(e)=>setUpdateForm({...updateForm, description:e.target.value})} className="col-span-2 border rounded p-2"></textarea>
            <select value={updateForm.tag} onChange={(e)=>{const sel=tagOptions.find(opt=>opt.label===e.target.value); setUpdateForm({...updateForm, tag:e.target.value, tagColor:sel.color})}} className="border rounded p-2">{tagOptions.map(opt=><option key={opt.label}>{opt.label}</option>)}</select>
            <input type="text" placeholder="তারিখ" value={updateForm.date} onChange={(e)=>setUpdateForm({...updateForm, date:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="লিংক" value={updateForm.link} onChange={(e)=>setUpdateForm({...updateForm, link:e.target.value})} className="border rounded p-2" />
            <button type="submit" className="col-span-2 bg-orange-600 text-white py-2 rounded">{editingUpdateId ? 'আপডেট' : 'যোগ করুন'}</button>
          </form>
          <table className="w-full text-sm">
            <thead><tr><th>শিরোনাম</th><th>ট্যাগ</th><th>অ্যাকশন</th></tr></thead>
            <tbody>
              {updatesList.map(item=>(
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td><span className={`${item.tagColor} text-white px-2 py-0.5 rounded text-xs`}>{item.tag}</span></td>
                  <td><button onClick={()=>startEditUpdate(item)}>✏️</button><button onClick={()=>deleteUpdate(item._id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ইউপি সচিব প্রোফাইল */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUserTie className="text-cyan-600" /><h2>সচিব প্রোফাইল</h2></div>
          <form onSubmit={handleSecretarySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="নাম" value={secretaryProfile.name} onChange={(e)=>setSecretaryProfile({...secretaryProfile, name:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="পদবী" value={secretaryProfile.title} onChange={(e)=>setSecretaryProfile({...secretaryProfile, title:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="বিভাগ" value={secretaryProfile.department} onChange={(e)=>setSecretaryProfile({...secretaryProfile, department:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="ছবি URL" value={secretaryProfile.image} onChange={(e)=>setSecretaryProfile({...secretaryProfile, image:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="যোগদানের তারিখ" value={secretaryProfile.joiningDate} onChange={(e)=>setSecretaryProfile({...secretaryProfile, joiningDate:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="মোবাইল" value={secretaryProfile.phone} onChange={(e)=>setSecretaryProfile({...secretaryProfile, phone:e.target.value})} className="border rounded p-2" />
            <input type="email" placeholder="ইমেইল" value={secretaryProfile.email} onChange={(e)=>setSecretaryProfile({...secretaryProfile, email:e.target.value})} className="border rounded p-2" />
            <input type="text" placeholder="অফিস সময়" value={secretaryProfile.officeTime} onChange={(e)=>setSecretaryProfile({...secretaryProfile, officeTime:e.target.value})} className="border rounded p-2" />
            <div className="md:col-span-2"><label className="block text-xs">শিক্ষাগত যোগ্যতা</label><textarea rows="2" value={secretaryProfile.education} onChange={(e)=>setSecretaryProfile({...secretaryProfile, education:e.target.value})} className="w-full border rounded p-2"></textarea></div>
            <div className="md:col-span-2"><label className="block text-xs">দায়িত্বসমূহ (প্রতি লাইনে একটি)</label><textarea rows="4" value={secretaryProfile.responsibilities?.join('\n') || ''} onChange={(e)=>handleResponsibilitiesChange(e.target.value)} className="w-full border rounded p-2" placeholder="প্রতি লাইনে একটি দায়িত্ব"></textarea></div>
            <button type="submit" className="col-span-2 bg-cyan-600 text-white py-2 rounded">প্রোফাইল আপডেট করুন</button>
          </form>
        </div>

        {/* একাউন্ট পেজ কনফিগারেশন */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-yellow-600" /><h2>অর্থ ও হিসাব পৃষ্ঠার তথ্য আপডেট</h2></div>
          <form onSubmit={handleAccountSubmit} className="space-y-5">
            <div><label className="block text-xs font-bold">আর্থিক বছর</label><input type="text" value={accountConfig.financialYear} onChange={(e)=>setAccountConfig({...accountConfig, financialYear:e.target.value})} className="w-full border rounded p-2" /></div>
            <div><label className="block text-xs font-bold">পরিসংখ্যান কার্ড (JSON)</label><textarea rows="6" value={JSON.stringify(accountConfig.accountStats, null, 2)} onChange={(e)=>handleStatsChange(e.target.value)} className="w-full border rounded p-2 font-mono text-sm"></textarea><p className="text-[10px] text-gray-400">প্রতিটি অবজেক্ট: id, label, value, detail, icon</p></div>
            <div><label className="block text-xs font-bold">বাজেট সেক্টর তালিকা (JSON)</label><textarea rows="8" value={JSON.stringify(accountConfig.budgetSectors, null, 2)} onChange={(e)=>handleSectorsChange(e.target.value)} className="w-full border rounded p-2 font-mono text-sm"></textarea><p className="text-[10px] text-gray-400">প্রতিটি: id, sector, allocation, amount, status</p></div>
            <div><label className="block text-xs font-bold">ফুটার নোটিশ</label><textarea rows="2" value={accountConfig.footerNotice} onChange={(e)=>setAccountConfig({...accountConfig, footerNotice:e.target.value})} className="w-full border rounded p-2"></textarea></div>
            <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-xl">একাউন্ট পেজ আপডেট করুন</button>
          </form>
        </div>

        {/* অন্যান্য কর্মচারী ব্যবস্থাপনা */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUsers className="text-cyan-600" /><h2>অন্যান্য কর্মচারী ব্যবস্থাপনা (পুলিশ, সহায়ক, পরিচ্ছন্নতা)</h2></div>
          <form onSubmit={handleStaffSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cyan-50/30 p-4 rounded-xl border border-cyan-100 mb-6">
            <div className="md:col-span-2"><h3 className="text-xs font-bold text-cyan-800">{editingStaffId ? '✏️ কর্মচারী তথ্য পরিবর্তন করুন' : '➕ নতুন কর্মচারী যুক্ত করুন'}</h3></div>
            <div className="md:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">নাম *</label><input type="text" required value={staffForm.name} onChange={(e) => setStaffForm({...staffForm, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">পদবী *</label><input type="text" required value={staffForm.role} onChange={(e) => setStaffForm({...staffForm, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">এলাকা/ওয়ার্ড</label><input type="text" value={staffForm.area} onChange={(e) => setStaffForm({...staffForm, area: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="যেমন: ১ নং ওয়ার্ড" /></div>
            <div className="md:col-span-2"><label className="block text-[11px] font-bold text-gray-700 mb-1">ছবির URL</label><input type="text" value={staffForm.image} onChange={(e) => setStaffForm({...staffForm, image: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="https://..." /></div>
            <div><label className="block text-[11px] font-bold text-gray-700 mb-1">মোবাইল</label><input type="text" value={staffForm.phone} onChange={(e) => setStaffForm({...staffForm, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div className="md:col-span-2 pt-2"><button type="submit" disabled={staffLoading} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg text-sm">{staffLoading ? 'সংরক্ষণ হচ্ছে...' : (editingStaffId ? 'হালনাগাদ করুন' : 'তালিকায় যোগ করুন')}</button></div>
          </form>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100">
                <tr><th className="p-3 text-center">ক্রম</th><th className="p-3">নাম</th><th className="p-3">পদবী</th><th className="p-3">এলাকা</th><th className="p-3">ফোন</th><th className="p-3 text-center">অ্যাকশন</th></tr>
              </thead>
              <tbody>
                {staffList.map((item, idx) => (
                  <tr key={item._id}>
                    <td className="p-3 text-center">{idx+1}</td>
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3">{item.role}</td>
                    <td className="p-3">{item.area || '—'}</td>
                    <td className="p-3">{item.phone || '—'}</td>
                    <td className="p-3 text-center space-x-2">
                      <button onClick={()=>startEditStaff(item)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><FaEdit /></button>
                      <button onClick={()=>deleteStaff(item._id)} className="p-1.5 bg-red-50 text-red-600 rounded"><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
                {staffList.length === 0 && (<tr><td colSpan="6" className="p-6 text-center text-gray-400">কোনো কর্মচারী যোগ করা হয়নি</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        {/* ফুটার পৃষ্ঠার তথ্য আপডেট */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaInfoCircle className="text-emerald-600" /><h2>ফুটার তথ্য আপডেট করুন</h2></div>
          <form onSubmit={handleFooterSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">লোগো URL</label><input type="text" value={footerConfig.logoUrl} onChange={(e) => setFooterConfig({...footerConfig, logoUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="লোগো ছবির লিংক দিন" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ইউনিয়নের নাম</label><input type="text" value={footerConfig.unionName} onChange={(e) => setFooterConfig({...footerConfig, unionName: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">ইউনিয়ন বর্ণনা</label><textarea rows="2" value={footerConfig.aboutText} onChange={(e) => setFooterConfig({...footerConfig, aboutText: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"></textarea></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা</label><input type="text" value={footerConfig.address} onChange={(e) => setFooterConfig({...footerConfig, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ফোন নম্বর</label><input type="text" value={footerConfig.phone} onChange={(e) => setFooterConfig({...footerConfig, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ইমেইল</label><input type="email" value={footerConfig.email} onChange={(e) => setFooterConfig({...footerConfig, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ফেসবুক পেজ URL</label><input type="text" value={footerConfig.facebook} onChange={(e) => setFooterConfig({...footerConfig, facebook: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ইউটিউব চ্যানেল URL</label><input type="text" value={footerConfig.youtube} onChange={(e) => setFooterConfig({...footerConfig, youtube: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-2">দ্রুত লিংক সমূহ (JSON অ্যারে)</label><textarea rows="5" value={JSON.stringify(footerConfig.quickLinks, null, 2)} onChange={(e) => handleQuickLinksChange(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-mono"></textarea><p className="text-[10px] text-gray-400 mt-1">প্রতিটি অবজেক্ট: {"{ title, path }"}</p></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-2">সরকারি ই-সেবা লিংক (JSON অ্যারে)</label><textarea rows="5" value={JSON.stringify(footerConfig.govLinks, null, 2)} onChange={(e) => handleGovLinksChange(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-mono"></textarea><p className="text-[10px] text-gray-400 mt-1">প্রতিটি অবজেক্ট: {"{ title, url }"}</p></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">কপিরাইট টেক্সট</label><input type="text" value={footerConfig.copyrightText} onChange={(e) => setFooterConfig({...footerConfig, copyrightText: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">ডেভেলপারের নাম</label><input type="text" value={footerConfig.developerCredit} onChange={(e) => setFooterConfig({...footerConfig, developerCredit: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            </div>
            <button type="submit" disabled={footerLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"><FaSave /> {footerLoading ? 'সংরক্ষণ হচ্ছে...' : 'ফুটার তথ্য আপডেট করুন'}</button>
          </form>
        </div>

        {/* কাউন্সিলর পেজ কনফিগারেশন */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6"><FaUsers className="text-indigo-600" /><h2>কাউন্সিলর পেজ কনফিগারেশন</h2></div>
          <form onSubmit={handleCouncillorsPageSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">পৃষ্ঠার শিরোনাম</label><input type="text" value={councillorsPageConfig.pageTitle} onChange={(e) => setCouncillorsPageConfig({...councillorsPageConfig, pageTitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">পৃষ্ঠার উপশিরোনাম</label><input type="text" value={councillorsPageConfig.pageSubtitle} onChange={(e) => setCouncillorsPageConfig({...councillorsPageConfig, pageSubtitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700"><input type="checkbox" checked={councillorsPageConfig.showPhone} onChange={(e) => setCouncillorsPageConfig({...councillorsPageConfig, showPhone: e.target.checked})} className="w-4 h-4" /> ফোন নম্বর দেখান</label>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700"><input type="checkbox" checked={councillorsPageConfig.showEmail} onChange={(e) => setCouncillorsPageConfig({...councillorsPageConfig, showEmail: e.target.checked})} className="w-4 h-4" /> ইমেইল দেখান</label>
                </div>
              </div>
            </div>
            <button type="submit" disabled={councillorsPageLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"><FaSave /> {councillorsPageLoading ? 'সংরক্ষণ হচ্ছে...' : 'পেজ কনফিগারেশন আপডেট করুন'}</button>
          </form>
        </div>

        {/* উন্নয়ন প্রকল্প ব্যবস্থাপনা */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
  <div className="flex items-center gap-2 text-blue-900 font-bold text-lg border-b pb-3 mb-6">
    <FaListAlt className="text-teal-600" />
    <h2>উন্নয়ন প্রকল্প ব্যবস্থাপনা</h2>
  </div>

  {/* ফর্ম */}
  <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-teal-50 p-4 rounded-xl mb-6">
    <input type="text" placeholder="প্রকল্পের নাম *" value={projectForm.name} onChange={(e) => setProjectForm({...projectForm, name: e.target.value})} className="border rounded p-2 text-sm" />
    <input type="text" placeholder="বাজেট * (যেমন: ৫,০০,০০০ টাকা)" value={projectForm.budget} onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})} className="border rounded p-2 text-sm" />
    <select value={projectForm.status} onChange={(e) => setProjectForm({...projectForm, status: e.target.value})} className="border rounded p-2 text-sm">
      <option>প্রক্রিয়াধীন</option>
      <option>চলমান</option>
      <option>সম্পন্ন</option>
    </select>
    <div className="md:col-span-3">
      <button type="submit" disabled={projectLoading} className="w-full bg-teal-600 text-white py-2 rounded">
        {projectLoading ? 'সংরক্ষণ হচ্ছে...' : (editingProjectId ? 'আপডেট করুন' : 'যোগ করুন')}
      </button>
    </div>
  </form>

  {/* টেবিল */}
  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-3">ক্রম</th><th>প্রকল্পের নাম</th><th>বাজেট</th><th>অবস্থা</th><th>অ্যাকশন</th>
        </tr>
      </thead>
      <tbody>
        {projectsList.map((item, idx) => (
          <tr key={item._id} className="border-b">
            <td className="p-3">{idx+1}</td>
            <td className="p-3 font-medium">{item.name}</td>
            <td className="p-3">{item.budget}</td>
            <td className="p-3">
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.status === 'সম্পন্ন' ? 'bg-green-100 text-green-700' :
                item.status === 'চলমান' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>{item.status}</span>
            </td>
            <td className="p-3 space-x-2">
              <button onClick={() => startEditProject(item)} className="text-blue-600"><FaEdit /></button>
              <button onClick={() => deleteProject(item._id)} className="text-red-600"><FaTrashAlt /></button>
            </td>
          </tr>
        ))}
        {projectsList.length === 0 && (
          <tr><td colSpan="5" className="p-6 text-center text-gray-400">কোনো প্রকল্প যোগ করা হয়নি</td></tr>
        )}
      </tbody>
    </table>
  </div>
</div>
      </main>
    </div>
  );
};

export default Dashboard;