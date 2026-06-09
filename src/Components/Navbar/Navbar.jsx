import React, { useState, useContext, useRef, useEffect } from 'react';
import logo from "../../assets/image/amarunion.logo.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider'; // 💡 আপনার সঠিক পাথ অনুযায়ী ইমপোর্ট করুন
import toast from 'react-hot-toast'; // 💡 react-hot-toast ইমপোর্ট করা হয়েছে

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false); // প্রোফাইল ড্রপডাউন স্টেট
  const dropdownRef = useRef(null);
  
  // AuthContext থেকে ডেটা এবং ফাংশন নেওয়া
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // প্রোফাইল ড্রপডাউনের বাইরে ক্লিক করলে তা বন্ধ করার জন্য
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 💡 লগইন চেকিং ফাংশন (লগইন না থাকলে আটকে দেবে)
  const handleProtectedNavigation = (e, path) => {
    if (!user) {
      e.preventDefault(); // লিংকের ডিফল্ট বিহেভিয়ার বন্ধ করবে
      toast.error('আবেদন করতে প্রথমে লগইন করুন!'); // টোস্ট মেসেজ
      navigate('/login'); // লগইন পেজে রিডাইরেক্ট
      setIsOpen(false); // মোবাইল মেনু খোলা থাকলে বন্ধ করবে
    }
  };

  // লগআউট হ্যান্ডলার
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('সফলভাবে লগআউট হয়েছে');
        setProfileDropdown(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const navItems = [
    { name: 'হোম', link: '/' },
    {
      name: 'আমাদের কথা', 
      hasDropdown: true,
      submenu: [
        { name: 'পরিচিতি', id: 'intro' },
        { name: 'এক নজরে ইউনিয়ন', id: 'at-a-glance' },
        { name: 'সাংগঠনিক কাঠামো', id: 'structure' }
      ]
    },
    { 
      name: 'জন প্রতিনিধি', 
      hasDropdown: true,
      submenu: [
        { name: 'বর্তমান চেয়ারম্যান', id: 'current-chairman' },
        { name: 'সাবেক চেয়ারম্যানবৃন্দ', id: 'ex-chairmans' },
        { name: 'কাউন্সিলর তালিকা', id: 'councillors' }
      ]
    },
    { 
      name: 'কর্মকর্তা-কর্মচারী', 
      hasDropdown: true,
      submenu: [
        { name: 'সচিব', id: 'secretary' },
        { name: 'হিসাব সহকারী', id: 'accountant' },
        { name: 'অন্যান্য কর্মচারী', id: 'other-staff' }
      ]
    },
    {
      name: 'নাগরিক সেবা আবেদন',
      hasDropdown: true, 
      isMega: true,
      submenu: [
        { 
          title: 'লাইসেন্স ও ব্যবসা', 
          items: [
            { name: 'ট্রেড লাইসেন্স', id: 'trade-license' },
            { name: 'প্রিমিসেস লাইসেন্স', id: 'premises-license' }
          ]
        },
        { 
          title: 'সনদপত্র সমূহ', 
          items: [
            { name: 'ওয়ারিশ সনদপত্র', id: 'warish-certificate' }, 
            { name: 'পারিবারিক সনদপত্র', id: 'family-certificate' }, 
            { name: 'নাগরিকত্ব সনদ', id: 'citizenship-certificate' }, 
            { name: 'উত্তরাধিকারী সনদ', id: 'successor-certificate' }
          ] 
        },
        { 
          title: 'অন্যান্য আবেদন', 
          items: [
            { name: 'ক্ষমতা অর্পণের প্রত্যয়ন', id: 'power-of-attorney' },
            { name: 'মৃত্যু সনদ', id: 'death-certificate' }, 
            { name: 'ভূমিহীন সনদ', id: 'landless-certificate' }
          ] 
        }
      ]
    },
    { name: 'আপডেট', link: '/update' },
    { name: 'গ্যালারী', link: '/gellary' },
    { name: 'সনদ যাচাই', link: '/check' },
    { name: 'যোগাযোগ', link: '/contact' },
  ];

  return (
    <nav className="w-full bg-white text-gray-800 shadow-md sticky top-0 z-50 font-sans">
      
      {/* ================= ১. ওপরের টপ বার ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* লোগো সেকশন */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <img
            src={logo}
            alt="Amar Union Logo"
            className="h-11 w-11 rounded-full object-cover border-2 border-[#000F9F] shadow-sm transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-wide text-[#000F9F]">
              আমার ইউনিয়ন
            </span>
            <span className="text-[10px] text-gray-500 font-medium -mt-1 hidden sm:block">ডিজিটাল ইউনিয়ন পরিষদ সেবা</span>
          </div>
        </Link>

        {/* ডেক্সটপ রাইট সেকশন (লগইন বা প্রোফাইল ড্রপডাউন) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            /* 💡 লগইন করা থাকলে প্রোফাইল ড্রপডাউন দেখাবে */
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 border border-gray-200 p-1 pr-3 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
              >
                <img 
                  src={user?.photoURL || "https://www.w3schools.com/howto/img_avatar.png"} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full object-cover border border-[#000F9F]"
                />
                <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                  {user?.displayName || 'ইউজার'}
                </span>
                <svg className={`w-3 h-3 text-gray-500 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* প্রোফাইল ড্রপডাউন মেনু */}
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">লগইন করা আছেন</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setProfileDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#000F9F] font-medium">
                    ড্যাশবোর্ড
                  </Link>
                  <button onClick={handleLogOut} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer">
                    লগআউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* লগইন না করা থাকলে আগের বাটনগুলো দেখাবে */
            <>
              <Link to="/login">
                <button className="text-sm font-semibold text-gray-600 hover:text-[#000F9F] transition-colors px-3 py-2 cursor-pointer">
                  লগইন
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-[#000F9F] text-white font-bold text-sm px-5 py-2 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                  রেজিস্ট্রেশন
                </button>
              </Link>
            </>
          )}
        </div>

        {/* মোবাইল রেসপনসিভ বাটন */}
        <div className="md:hidden flex items-center gap-3">
          {!user && (
            <Link to="/login" className="text-xs bg-[#000F9F] text-white font-medium px-3 py-1.5 rounded-lg">
              লগইন
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none transition-all cursor-pointer"
          >
            {!isOpen ? (
              <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ================= ২. ডেক্সটপ মেইন মেনু বার ================= */}
      <div className="hidden md:block bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-[14px] font-semibold tracking-wide">
            {navItems.map((item, index) => (
              <div key={index} className="relative group h-full flex items-center px-3 cursor-pointer transition-all duration-200 hover:bg-white/10">
                {item.hasDropdown ? (
                  <span className="whitespace-nowrap flex items-center">
                    {item.name}
                    <svg className="w-3 h-3 ml-1 text-gray-300 group-hover:text-white transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                ) : (
                  <Link to={item.link} className="whitespace-nowrap">{item.name}</Link>
                )}

                {/* ড্রপডাউন এবং মেগা মেনু */}
                {item.hasDropdown && (
                  item.isMega ? (
                    /* মেগা মেনু (নাগরিক সেবা) -> এখানে ক্লিক করলে লগইন প্রোটেকশন চেক হবে */
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[650px] bg-white text-gray-800 rounded-b-2xl shadow-2xl p-5 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 border border-gray-100 grid grid-cols-3 gap-4">
                      {item.submenu.map((subGroup, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <h4 className="font-bold text-xs text-[#000F9F] tracking-wide uppercase border-b pb-1 border-gray-100">{subGroup.title}</h4>
                          <ul className="space-y-1">
                            {subGroup.items.map((subItem, iIdx) => (
                              <li key={iIdx}>
                                {/* 💡 onClick এ প্রটেকশন হ্যান্ডলার যোগ করা হয়েছে */}
                                <Link 
                                  to={`/service/${subItem.id}`} 
                                  onClick={(e) => handleProtectedNavigation(e, `/service/${subItem.id}`)}
                                  className="block py-1 px-1.5 text-xs font-semibold text-gray-600 rounded-md hover:bg-blue-50 hover:text-[#000F9F] transition-colors"
                                >
                                  • {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* নরমাল ড্রপডাউন (যদি এগুলোতেও প্রোটেকশন চান তবে এখানেও onClick দিতে পারেন, বর্তমানে শুধু নাগরিক সেবায় দেওয়া হয়েছে) */
                    <div className="absolute top-full left-0 mt-0 w-48 bg-white text-gray-800 rounded-b-xl shadow-2xl py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 border border-gray-100">
                      {item.submenu?.map((subItem, sIdx) => (
                        <Link key={sIdx} to={`/service/${subItem.id}`} className="block px-4 py-2 hover:bg-blue-50 text-sm font-semibold text-gray-700 hover:text-[#000F9F] transition-colors">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ৩. মোবাইল ড্রপডাউন মেনু ================= */}
      <div className={`${isOpen ? 'max-h-[80vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#000b70] text-white border-t border-white/10`}>
        <div className="px-3 py-3 space-y-1 text-sm">
          
          {/* 💡 মোবাইল মেনুতে লগইন করা থাকলে প্রোফাইল ইনফো ও ড্যাশবোর্ড লিংক দেখাবে */}
          {user && (
            <div className="bg-white/10 p-3 rounded-xl mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={user?.photoURL || "https://www.w3schools.com/howto/img_avatar.png"} className="h-9 w-9 rounded-full border border-white" alt="" />
                <div>
                  <p className="font-bold text-xs">{user?.displayName || 'ইউজার'}</p>
                  <p className="text-[10px] text-gray-300">{user?.email}</p>
                </div>
              </div>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xs bg-white text-[#000F9F] font-bold px-2.5 py-1 rounded-lg">ড্যাশবোর্ড</Link>
            </div>
          )}

          {navItems.map((item, index) => (
            <div key={index} className="border-b border-white/5 last:border-none">
              <div className="block px-4 py-2.5 font-medium hover:bg-white/5 transition-all flex justify-between items-center">
                <span>{item.name}</span>
                {item.hasDropdown && <span className="text-gray-400 text-xs">▼</span>}
              </div>
              
              {item.hasDropdown && (
                <div className="pl-6 bg-black/10 py-1 rounded-lg mb-1 space-y-1 text-xs text-gray-300">
                  {item.isMega ? (
                    item.submenu.map((group, gIdx) => (
                      <div key={gIdx} className="py-1">
                        <p className="text-[#00e5ff] font-bold text-[11px] px-2">{group.title}</p>
                        {group.items.map((sub, iIdx) => (
                          /* 💡 মোবাইল মেগা মেনুতে ও প্রোটেকশন চেক */
                          <Link 
                            key={iIdx} 
                            to={`/service/${sub.id}`} 
                            onClick={(e) => handleProtectedNavigation(e, `/service/${sub.id}`)} 
                            className="block py-1.5 px-4 hover:text-white"
                          >
                            • {sub.name}
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    item.submenu?.map((sub, sIdx) => (
                      <Link key={sIdx} to={`/service/${sub.id}`} onClick={() => setIsOpen(false)} className="block py-1.5 px-2 hover:text-white">• {sub.name}</Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          {/* মোবাইল নিচের বাটন */}
          <div className="pt-2">
            {user ? (
              <button onClick={handleLogOut} className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl shadow-md text-center block text-sm cursor-pointer">
                লগআউট করুন
              </button>
            ) : (
              <Link to="/register" onClick={() => setIsOpen(false)} className="w-full bg-white text-[#000F9F] font-bold py-2.5 rounded-xl shadow-md text-center block text-sm">
                রেজিস্ট্রেশন করুন
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;