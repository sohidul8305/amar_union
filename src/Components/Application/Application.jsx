import React from 'react';
import { Link } from 'react-router-dom';

const Application = () => {
  const services = [
    { name: 'উত্তরাধিকারী সনদ', path: '/service/successor-certificate' },
    { name: 'পাওয়ার অফ অ্যাটর্নি', path: '/service/power-of-attorney' },
    { name: 'মৃত্যু সনদ', path: '/service/death-certificate' },
    { name: 'ভূমিহীন সনদ', path: '/service/landless-certificate' },
    { name: 'ট্রেড লাইসেন্স', path: '/service/trade-license' },
  ];
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">আবেদনপত্র নির্বাচন করুন</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((svc, idx) => (
          <Link key={idx} to={svc.path} className="bg-white p-4 rounded-xl shadow border hover:shadow-md transition">
            <h3 className="font-bold text-lg">{svc.name}</h3>
            <p className="text-sm text-gray-500">আবেদন করতে ক্লিক করুন</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Application;