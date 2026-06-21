import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://amar-union-backend.vercel.app/api/admin/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('isAdmin', 'true');
        toast.success('লগইন সফল!');
        navigate('/admin-dashboard');
      } else {
        toast.error('ইমেইল বা পাসওয়ার্ড ভুল');
      }
    } catch (err) {
      toast.error('সার্ভারে সমস্যা, পরে চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#000F9F] mb-6">প্রশাসনিক প্যানেল</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required className="w-full p-3 border rounded-xl" placeholder="ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required className="w-full p-3 border rounded-xl" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-[#000F9F] text-white py-3 rounded-xl hover:bg-blue-800">
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;