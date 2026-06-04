// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
        toast.success('প্রশাসক লগইন সফল!');
        navigate('/admin-dashboard');
      } else {
        toast.error('লগইন তথ্য সঠিক নয়!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'লগইন ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#000F9F]">প্রশাসনিক প্যানেল</h2>
          <p className="text-gray-500 mt-1">ইউনিয়ন পরিষদ প্রশাসক লগইন</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">ইমেইল ঠিকানা</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none"
              placeholder="admin@amarunion.gov.bd"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000F9F] outline-none"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#000F9F] text-white font-bold py-3 rounded-xl hover:bg-[#0015cc] transition duration-200 disabled:opacity-50"
          >
            {loading ? 'লগইন হচ্ছে...' : 'প্রশাসক লগইন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;