import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Secretary = () => {
  const [secretaryData, setSecretaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডিফল্ট ডাটা (ডাটাবেজ খালি থাকলে এটি দেখাবে)
  const defaultData = {
    name: 'জনাব সুকোমল বড়ুয়া',
    title: 'ইউনিয়ন পরিষদ সচিব',
    department: 'স্থানীয় সরকার বিভাগ (এলজিডি)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    joiningDate: '১৫ মে, ২০২০',
    phone: '+৮৮০ ১৭১২-৫৫৬৬৭৭',
    email: 'secretary@union.gov.bd',
    officeTime: 'সকাল ৯:০০ - বিকেল ৫:০০ (রবি - বৃহস্পতিবার)',
    education: 'স্নাতকোত্তর (লোক প্রশাসন), ঢাকা বিশ্ববিদ্যালয়',
    responsibilities: [
      'ইউনিয়ন পরিষদের যাবতীয় প্রশাসনিক ও দাপ্তরিক কার্য পরিচালনা।',
      'পরিষদের বাজেট প্রণয়ন, হিসাব সংরক্ষণ এবং আর্থিক বিবরণী প্রস্তুতকরণ।',
      'জন্ম-মৃত্যু নিবন্ধন, নাগরিক সনদ ও বিভিন্ন লাইসেন্স ইস্যুকরণে সমন্বয়।'
    ]
  };

  useEffect(() => {
    const fetchSecretaryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/secretary');
        if (response.data && response.data.name) {
          setSecretaryData(response.data);
        } else {
          setSecretaryData(defaultData);
        }
      } catch (error) {
        console.error("সচিবের তথ্য লোড করতে সমস্যা হয়েছে:", error);
        setSecretaryData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchSecretaryData();
  }, []);

  if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* প্রোফাইল কার্ড */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <img src={secretaryData.image} alt={secretaryData.name} className="w-48 h-48 rounded-full mx-auto object-cover mb-4" />
          <h2 className="text-2xl font-bold">{secretaryData.name}</h2>
          <p className="text-green-600 font-semibold">{secretaryData.title}</p>
          <div className="mt-6 text-left space-y-3">
            <p><strong>মোবাইল:</strong> {secretaryData.phone}</p>
            <p><strong>ইমেইল:</strong> {secretaryData.email}</p>
            <p><strong>সময়:</strong> {secretaryData.officeTime}</p>
          </div>
        </div>

        {/* তথ্য ও দায়িত্ব */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">ব্যক্তিগত পরিচিতি</h3>
            <p><strong>শিক্ষাগত যোগ্যতা:</strong> {secretaryData.education}</p>
            <p><strong>যোগদানের তারিখ:</strong> {secretaryData.joiningDate}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">দায়িত্বসমূহ</h3>
            <ul className="list-decimal pl-5 space-y-2">
              {secretaryData.responsibilities?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secretary;