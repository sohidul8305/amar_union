import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? 'https://amar-union-backend.vercel.app/api/admin/applications'
        : `https://amar-union-backend.vercel.app/api/admin/applications?type=${filter}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
      } else {
        toast.error('আবেদন লোড করতে ব্যর্থ');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, collectionName, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(
        `https://amar-union-backend.vercel.app/api/admin/application/${collectionName}/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`আবেদন ${newStatus === 'Approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে`);
      fetchApplications(); // রিফ্রেশ
    } catch (error) {
      toast.error('স্ট্যাটাস আপডেট ব্যর্থ');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('লগআউট সফল');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* হেডার */}
      <div className="bg-[#0b6330] text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">প্রশাসনিক ড্যাশবোর্ড</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">লগআউট</button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ফিল্টার */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <label className="font-semibold mr-2">সেবা অনুযায়ী ফিল্টার: </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">সকল</option>
            <option value="family_certificates">পারিবারিক সনদ</option>
            <option value="warish">ওয়ারিশ সনদ</option>
            <option value="citizenship_certificates">নাগরিকত্ব সনদ</option>
            <option value="successor_certificates">উত্তরাধিকারী সনদ</option>
            <option value="power_of_attorney">পাওয়ার অফ অ্যাটর্নি</option>
            <option value="death_certificates">মৃত্যু সনদ</option>
            <option value="landless_certificates">ভূমিহীন সনদ</option>
            <option value="trade_licenses">ট্রেড লাইসেন্স</option>
            <option value="premises">প্রাঙ্গণ লাইসেন্স</option>
          </select>
        </div>

        {/* আবেদন তালিকা */}
        {loading ? (
          <p className="text-center py-10">লোড হচ্ছে...</p>
        ) : applications.length === 0 ? (
          <p className="text-center py-10">কোনো আবেদন পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">আবেদনকারী</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ইমেইল</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">সেবা</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">তারিখ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">স্ট্যাটাস</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4">{app.userName}</td>
                    <td className="px-6 py-4">{app.userEmail}</td>
                    <td className="px-6 py-4">{app.type}</td>
                    <td className="px-6 py-4">{new Date(app.submittedAt).toLocaleDateString('bn-BD')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status === 'Pending' ? 'বিচারাধীন' : app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => updateStatus(app.id, app.collectionName, 'Approved')}
                        disabled={updatingId === app.id || app.status !== 'Pending'}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        অনুমোদন
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, app.collectionName, 'Rejected')}
                        disabled={updatingId === app.id || app.status !== 'Pending'}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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
  );
};

export default AdminDashboard;