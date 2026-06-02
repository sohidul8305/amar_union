import React, { useState } from 'react';
import logo from "../../assets/image/amarunion.logo.jpeg"; 
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // স্ক্রিনশটের সব নাগরিক সেবাসহ ফুল মেনু লিস্ট
  const navItems = [
    { name: 'হোম', link: '#' },
    { 
      name: 'আমাদের কথা', 
      hasDropdown: true,
      submenu: ['পরিচিতি', 'এক নজরে ইউনিয়ন', 'সাংগঠনিক কাঠামো']
    },
    { 
      name: 'জন প্রতিনিধি', 
      hasDropdown: true,
      submenu: ['বর্তমান চেয়ারম্যান', 'সাবেক চেয়ারম্যানবৃন্দ', 'কাউন্সিলর তালিকা']
    },
    { 
      name: 'কর্মকর্তা-কর্মচারী', 
      hasDropdown: true,
      submenu: ['সচিব', 'হিসাব সহকারী', 'অন্যান্য কর্মচারী']
    },
    { 
      name: 'নাগরিক সেবা আবেদন', 
      hasDropdown: true, 
      isMega: true, 
      submenu: [
        { title: 'লাইসেন্স ও ব্যবসা', items: ['ট্রেড লাইসেন্স', 'প্রিমিসেস লাইসেন্স'] },
        { title: 'সনদপত্র সমূহ', items: ['ওয়ারিশ সনদপত্র', 'পারিবারিক সনদপত্র', 'নাগরিকত্ব সনদ', 'উত্তরাধিকারী সনদ'] },
        { title: 'অন্যান্য আবেদন', items: ['ক্ষমতা অর্পণের প্রত্যয়ন', 'মৃত্যু সনদ', 'ভূমিহীন সনদ'] }
      ]
    },
    { name: 'আপডেট', link: '#' },
    { name: 'গ্যালারী', link: '#' },
    { name: 'সনদ যাচাই', link: '#' },
    { name: 'যোগাযোগ', link: '#' },
  ];

  return (
    <nav className="w-full bg-white text-gray-800 shadow-md sticky top-0 z-50 font-sans">
      
      {/* ================= ১. ওপরের টপ বার (লোগো এবং লগইন/রেজিস্টার) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* লোগো সেকশন */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <img 
            src={logo} 
            alt="Amar Union Logo" 
            className="h-11 w-11 rounded-full object-cover border-2 border-[#000F9F] shadow-sm transform group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-wide text-[#000F9F]">
              আমার ইউনিয়ন
            </span>
            <span className="text-[10px] text-gray-500 font-medium -mt-1 hidden sm:block">डिजिटल ইউনিয়ন পরিষদ সেবা</span>
          </div>
        </div>

        {/* ডেক্সটপ লগইন/রেজিস্টার বাটন */}
        <div className="hidden md:flex items-center gap-3">
         <Link to="/login">
           <button className="text-sm font-semibold text-gray-600 hover:text-[#000F9F] transition-colors px-3 py-2">
            লগইন
          </button>
         </Link>
         <Link to="/register">
           <button className="bg-[#000F9F] text-white font-bold text-sm px-5 py-2 rounded-xl hover:bg-[#0015cc] shadow-md hover:shadow-lg transition-all duration-200">
            রেজিস্ট্রেশন
          </button>
         </Link>
        </div>

        {/* মোবাইল রেসপনসিভ বাটন (লগইন + হ্যামবার্গার) */}
        <div className="md:hidden flex items-center gap-3">
          <button className="text-xs bg-[#000F9F] text-white font-medium px-3 py-1.5 rounded-lg">
            লগইন
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none transition-all"
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

      {/* ================= ২. মেইন মেনু বার (সব আইটেম এক লাইনে দেখানোর জন্য আলাদা বার) ================= */}
      <div className="hidden md:block bg-gradient-to-r from-[#000F9F] to-[#0015cc] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-[14px] font-semibold tracking-wide">
            {navItems.map((item, index) => (
              <div key={index} className="relative group h-full flex items-center px-3 cursor-pointer transition-all duration-200 hover:bg-white/10">
                <a href={item.link || '#'} className="whitespace-nowrap">
                  {item.name}
                </a>
                {item.hasDropdown && (
                  <svg className="w-3 h-3 ml-1 text-gray-300 group-hover:text-white transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                )}

                {/* ড্রপডাউন এবং মেগা মেনু পজিশনিং */}
                {item.hasDropdown && (
                  item.isMega ? (
                    /* মেগা মেনু (নাগরিক সেবা) */
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[600px] bg-white text-gray-800 rounded-b-2xl shadow-2xl p-5 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 border border-gray-100 grid grid-cols-3 gap-4">
                      {item.submenu.map((subGroup, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <h4 className="font-bold text-xs text-[#000F9F] tracking-wide uppercase border-b pb-1 border-gray-100">{subGroup.title}</h4>
                          <ul className="space-y-1">
                            {subGroup.items.map((subItem, iIdx) => (
                              <li key={iIdx}>
                                <a href="#" className="block py-1 px-1.5 text-xs font-semibold text-gray-600 rounded-md hover:bg-blue-50 hover:text-[#000F9F] transition-colors">
                                  • {subItem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* নরমাল ড্রপডাউন */
                    <div className="absolute top-full left-0 mt-0 w-48 bg-white text-gray-800 rounded-b-xl shadow-2xl py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 border border-gray-100">
                      {item.submenu?.map((subItem, sIdx) => (
                        <a key={sIdx} href="#" className="block px-4 py-2 hover:bg-blue-50 text-sm font-semibold text-gray-700 hover:text-[#000F9F] transition-colors">
                          {subItem}
                        </a>
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
                          <a key={iIdx} href="#" className="block py-1.5 px-4 hover:text-white">• {sub}</a>
                        ))}
                      </div>
                    ))
                  ) : (
                    item.submenu?.map((sub, sIdx) => (
                      <a key={sIdx} href="#" className="block py-1.5 px-2 hover:text-white">• {sub}</a>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 px-4">
      <Link
  to="/register"
  className="w-full bg-white text-[#000F9F] font-bold py-2.5 rounded-xl shadow-md text-center block text-sm"
>
  রেজিস্ট্রেশন করুন
</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;