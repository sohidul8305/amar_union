import React from 'react';
import { 
  Users, 
  MapPin, 
  School, 
  Activity, 
  Briefcase, 
  Calendar 
} from 'lucide-react'; // Ekta sundor icon library (optional, install na thakle bad dite paren)

const Glance = () => {
  // Demo Data: Apnar union er tottho ekhane boshate parben
  const stats = [
    { id: 1, label: 'মোট জনসংখ্যা', value: '৪৫,২৫০ জন', icon: Users, color: 'bg-blue-500' },
    { id: 2, label: 'মোট ভোটার', value: '২৮,২০০ জন', icon: Briefcase, color: 'bg-green-500' },
    { id: 3, label: 'আয়তন', value: '২৫.৪ বর্গ কি.মি.', icon: MapPin, color: 'bg-amber-500' },
    { id: 4, label: 'শিক্ষার হার', value: '৭২.৫%', icon: School, color: 'bg-purple-500' },
    { id: 5, label: 'গ্রামের সংখ্যা', value: '১৮ টি', icon: MapPin, color: 'bg-rose-500' },
    { id: 6, label: 'সরকারি প্রাথমিক বিদ্যালয়', value: '১২ টি', icon: School, color: 'bg-indigo-500' },
    { id: 7, label: 'স্বাস্থ্য কেন্দ্র', value: '২ টি', icon: Activity, color: 'bg-emerald-500' },
    { id: 8, label: 'স্থাপিত', value: '১৯৬০ খ্রিস্টাব্দ', icon: Calendar, color: 'bg-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            এক নজরে ইউনিয়ন
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            ইউনিয়নের যাবতীয় গুরুত্বপূর্ণ তথ্য এবং পরিসংখ্যান সমূহের সংক্ষিপ্ত বিবরণী।
          </p>
          <div className="mt-4 h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Responsive Grid Layout */}
        {/* Mobile-e 1টা, Tablet-e 2টা, Laptop-e 3টা, Desktop-e 4টা card dekhabe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className="bg-white overflow-hidden shadow rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    {/* Icon Container */}
                    <div className={`p-3 rounded-lg ${item.color} text-white`}>
                      <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {/* Content */}
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {item.label}
                        </dt>
                        <dd className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                          {item.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                
                {/* Card Footer Accent Line */}
                <div className={`h-1 w-full ${item.color} opacity-70`} />
              </div>
            );
          })}
        </div>

        {/* Additional Info Box */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-600 rounded-full inline-block"></span>
            ইউনিয়ন পরিচিতি
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            আমাদের ইউনিয়ন একটি ঐতিহ্যবাহী এবং আদর্শ ইউনিয়ন হিসেবে পরিচিত। কৃষি, শিক্ষা এবং সংস্কৃতির দিক থেকে এই ইউনিয়ন অনন্য অবদান রেখে চলেছে। ডিজিটাল বাংলাদেশ বিনির্মাণের অংশ হিসেবে আমরা আমাদের সব নাগরিক সেবা অনলাইনের মাধ্যমে জনগণের দোরগোড়ায় পৌঁছে দিতে বদ্ধপরিকর।
          </p>
        </div>

      </div>
    </div>
  );
};

export default Glance;