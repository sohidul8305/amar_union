import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Plan = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // প্রকল্প লোড ফাংশন
  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      if (res.data.success) {
        setProjects(res.data.projects);
      } else {
        setError('প্রকল্প লোড করতে ব্যর্থ');
      }
    } catch (err) {
      console.error(err);
      setError('সার্ভার সমস্যা');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // পরিসংখ্যান ক্যালকুলেশন
  const totalProjects = projects.length;
  const ongoingProjects = projects.filter(p => p.status === 'চলমান').length;
  const completedProjects = projects.filter(p => p.status === 'সম্পন্ন').length;
  const totalBudget = projects.reduce((sum, p) => {
    const budgetNum = parseInt(p.budget.replace(/[^০-৯0-9]/g, '')) || 0;
    return sum + budgetNum;
  }, 0);
  const formattedBudget = totalBudget.toLocaleString('bn-BD') + ' টাকা';

  if (loading) return <div className="min-h-screen flex justify-center items-center">লোড হচ্ছে...</div>;
  if (error) return <div className="min-h-screen text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#000F9F]">বাজেট ও উন্নয়ন পরিকল্পনা</h2>
          <p className="mt-2 text-gray-600">আমাদের ইউনিয়নের বার্ষিক বাজেট এবং উন্নয়নমূলক কাজের তালিকা নিচে দেওয়া হলো।</p>
        </div>

        {/* বাজেট কার্ড সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-gray-500 font-medium">মোট বাজেট</h3>
            <p className="text-2xl font-bold text-[#000F9F] mt-2">{formattedBudget}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-gray-500 font-medium">চলমান প্রকল্প</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">{ongoingProjects} টি</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-gray-500 font-medium">সম্পন্ন প্রকল্প</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">{completedProjects} টি</p>
          </div>
        </div>

        {/* প্রজেক্ট টেবিল */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">উন্নয়ন কাজের তালিকা</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-sm border-b">
                  <th className="px-6 py-4 font-semibold">প্রকল্পের নাম</th>
                  <th className="px-6 py-4 font-semibold">বাজেট</th>
                  <th className="px-6 py-4 font-semibold">অবস্থা</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-700">{project.name}</td>
                    <td className="px-6 py-4 text-gray-600">{project.budget}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.status === 'সম্পন্ন' ? 'bg-green-100 text-green-700' : 
                        project.status === 'চলমান' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan="3" className="text-center py-8 text-gray-400">কোনো প্রকল্প যোগ করা হয়নি</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;