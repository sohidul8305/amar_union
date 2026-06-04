// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  // টোকেন না থাকলে লগইন পেজে রিডাইরেক্ট
  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
    }
  }, [token, navigate]);

  // সকল আবেদন লোড করা
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const url = filterType === 'all' 
        ? 'http://localhost:5000/api/admin/applications'
        : `http://localhost:5000/api/admin/applications?type=${filterType}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error(error);
      toast.error('আবেদন লোড করতে ব্যর্থ হয়েছে');
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchApplications();
  }, [filterType, token]);

  // স্ট্যাটাস আপডেট (approve/reject)
  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(`http://localhost:5000/api/admin/application/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`আবেদন ${newStatus === 'Approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে`);
      fetchApplications(); // রিফ্রেশ
    } catch (error) {
      toast.error('স্ট্যাটাস আপডেট ব্যর্থ হয়েছে');
    } finally {
      setUpdatingId(null);
    }
  };

  // লগআউট
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('লগআউট সফল');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* প্রশাসক হেডার */}
      <div className="bg-[#0b6330] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">প্রশাসক ড্যাশবোর্ড - ইউনিয়ন পরিষদ</h1>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
            লগআউট
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ফিল্টার অপশন */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3 items-center">
          <label className="font-semibold text-gray-700">সেবা অনুযায়ী ফিল্টার:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0b6330] outline-none"
          >
            <option value="all">সকল সেবা</option>
            <option value="trade-license">ট্রেড লাইসেন্স</option>
            <option value="premises-license">প্রিমিসেস লাইসেন্স</option>
            <option value="warish-certificate">ওয়ারিশ সনদপত্র</option>
            <option value="family-certificate">পারিবারিক সনদপত্র</option>
            <option value="citizenship-certificate">নাগরিকত্ব সনদ</option>
            <option value="successor-certificate">উত্তরাধিকারী সনদ</option>
            <option value="power-of-attorney">ক্ষমতা অর্পণের প্রত্যয়ন</option>
            <option value="death-certificate">মৃত্যু সনদ</option>
            <option value="landless-certificate">ভূমিহীন সনদ</option>
          </select>
        </div>

        {/* আবেদন তালিকা টেবিল */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">আবেদন লোড হচ্ছে...</div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">কোনো আবেদন পাওয়া যায়নি।</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-4">আবেদন আইডি</th>
                    <th className="p-4">আবেদনকারীর নাম</th>
                    <th className="p-4">ইমেইল</th>
                    <th className="p-4">সেবার ধরণ</th>
                    <th className="p-4">তারিখ</th>
                    <th className="p-4">স্ট্যাটাস</th>
                    <th className="p-4">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {applications.map((app) => (
                    <tr key={app._id || app.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono text-sm">{app.id || app._id?.slice(-6)}</td>
                      <td className="p-4 font-medium">{app.userName || 'নাম নেই'}</td>
                      <td className="p-4 text-sm">{app.userEmail}</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {app.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{new Date(app.date).toLocaleDateString('bn-BD')}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status === 'Pending' ? 'Pending' : app.status}
                        </span>
                      </td>
                      <td className="p-4 space-x-2">
                        <button
                          onClick={() => updateStatus(app._id || app.id, 'Approved')}
                          disabled={updatingId === (app._id || app.id) || app.status === 'Approved'}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          অনুমোদন
                        </button>
                        <button
                          onClick={() => updateStatus(app._id || app.id, 'Rejected')}
                          disabled={updatingId === (app._id || app.id) || app.status === 'Rejected'}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          প্রত্যাখ্যান
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;