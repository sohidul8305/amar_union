// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import CertificateModal from '../../../Components/CertificateModal/CertificateModal';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [selectedAppForCert, setSelectedAppForCert] = useState(null);

  const navigate = useNavigate();

  // ========== নাম বের করার হেলপার ফাংশন ==========
const getApplicantName = (app) => {
  // প্রথমে সরাসরি ফিল্ড চেক
  if (app.ownerName && app.ownerName !== 'নাম নেই') return app.ownerName;
  if (app.userName && app.userName !== 'নাম নেই') return app.userName;
  if (app.fullName && app.fullName !== 'নাম নেই') return app.fullName;
  if (app.name && app.name !== 'নাম নেই') return app.name;
  if (app.applicantName && app.applicantName !== 'নাম নেই') return app.applicantName;

  // যদি fullData থাকে, সেখান থেকে খুঁজি
  if (app.fullData) {
    const data = app.fullData;
    if (data.ownerName && data.ownerName !== 'নাম নেই') return data.ownerName;
    if (data.userName && data.userName !== 'নাম নেই') return data.userName;
    if (data.fullName && data.fullName !== 'নাম নেই') return data.fullName;
    if (data.name && data.name !== 'নাম নেই') return data.name;
    if (data.applicantName && data.applicantName !== 'নাম নেই') return data.applicantName;
    // বিশেষ কিছু ফর্মের জন্য (যেমন warish-এ applicantInfo.applicantName)
    if (data.applicantInfo?.applicantName && data.applicantInfo.applicantName !== 'নাম নেই') return data.applicantInfo.applicantName;
    if (data.deceasedInfo?.deceasedName && data.deceasedInfo.deceasedName !== 'নাম নেই') return data.deceasedInfo.deceasedName;
    if (data.headInfo?.headName && data.headInfo.headName !== 'নাম নেই') return data.headInfo.headName;
    if (data.headName && data.headName !== 'নাম নেই') return data.headName;
  }

  return 'N/A';
};

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin-login');
    } else {
      fetchApplications();
    }
  }, [navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://amar-union-backend.vercel.app/api/admin/applications');
      setApplications(res.data);
      setFilteredApps(res.data);
    } catch (error) {
      toast.error('আবেদন লোড করতে ব্যর্থ');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === 'all') {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter(app => app.status === status));
    }
  };

  const updateStatus = async (collectionName, docId, newStatus) => {
    setUpdatingId(docId);
    try {
      await axios.put(`https://amar-union-backend.vercel.app/api/admin/application/${collectionName}/${docId}`, { status: newStatus });
      toast.success(`আবেদন ${newStatus === 'Approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে`);
      fetchApplications();
    } catch (error) {
      toast.error('স্ট্যাটাস আপডেট ব্যর্থ');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    toast.success('লগআউট সফল');
    navigate('/admin-login');
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('bn-BD');
  };

  const handleSelectApplication = (e) => {
    const appId = e.target.value;
    if (appId === '') {
      setSelectedApp(null);
      return;
    }
    const app = applications.find(a => a.id === appId);
    setSelectedApp(app);
  };

  const openCertificateModal = (app) => {
    setSelectedAppForCert(app);
    setCertModalOpen(true);
  };

  const renderFullDetails = (app) => {
    if (!app) return null;
    const data = app.fullData;
    return (
      <div className="bg-white p-6 rounded-lg shadow mt-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">আবেদনের সম্পূর্ণ তথ্য</h3>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* হেডার */}
      <div className="bg-[#0b6330] text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">প্রশাসনিক ড্যাশবোর্ড</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
          লগআউট
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ড্রপডাউন */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            যেকোনো আবেদন সিলেক্ট করে বিস্তারিত দেখুন:
          </label>
          <select
            onChange={handleSelectApplication}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
          >
            <option value="">-- একটি আবেদন বাছাই করুন --</option>
            {applications.map(app => (
              <option key={app.id} value={app.id}>
                {getApplicantName(app)} - {app.type} ({app.status}) - {formatDate(app.submittedAt)}
              </option>
            ))}
          </select>
        </div>

        {selectedApp && renderFullDetails(selectedApp)}

        {/* ফিল্টার বাটন */}
        <div className="flex gap-3 mb-6 mt-8 flex-wrap">
          {['all', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'all' ? 'সব' : status === 'Pending' ? 'বিচারাধীন' : status === 'Approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
            </button>
          ))}
        </div>

        {/* টেবিল */}
        {loading ? (
          <div className="text-center py-10">লোড হচ্ছে...</div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-10 text-gray-500">কোনো আবেদন পাওয়া যায়নি</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ক্রমিক</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ইমেইল</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">মোবাইল</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ধরন</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">তারিখ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">স্ট্যাটাস</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">সনদ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApps.map((app, idx) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getApplicantName(app)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.userEmail || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.mobile || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(app.submittedAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status === 'Pending' ? 'বিচারাধীন' : app.status === 'Approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.status === 'Approved' ? (
                        <button
                          onClick={() => openCertificateModal(app)}
                          className="text-green-600 hover:text-green-800 text-xl transition"
                          title="সনদ দেখুন"
                        >
                          <FaCheckCircle />
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(app.collectionName, app.id, 'Approved')}
                            disabled={updatingId === app.id}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                          >
                            অনুমোদন
                          </button>
                          <button
                            onClick={() => updateStatus(app.collectionName, app.id, 'Rejected')}
                            disabled={updatingId === app.id}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                          >
                            প্রত্যাখ্যান
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* সনদ মডাল */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        collectionName={selectedAppForCert?.collectionName}
        docId={selectedAppForCert?.id}
      />
    </div>
  );
};

export default AdminDashboard;