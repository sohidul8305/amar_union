import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingApps, setLoadingApps] = useState(true);
    const navigate = useNavigate();

    // আবেদন লোড করার জন্য useEffect
    useEffect(() => {
        if (user?.email) {
            setLoadingApps(true);
            fetch(`http://localhost:5000/api/my-applications/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    // ডাটা আসলে তা সেট করুন
                    setApplications(Array.isArray(data) ? data : []);
                })
                .catch(err => console.error("Apps fetch error:", err))
                .finally(() => setLoadingApps(false));
        }
    }, [user?.email]);

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) { console.error("Logout Error:", error); }
    };


    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* সাইডবার */}
            <div className="w-64 bg-[#0b6330] text-white p-6 hidden md:block">
                <h2 className="text-2xl font-black mb-8 border-b border-green-700 pb-4">আমার ইউনিয়ন</h2>
                <button onClick={handleLogOut} className="w-full text-left bg-red-600 p-2 rounded">লগআউট</button>
            </div>

            <div className="flex-grow p-10">
                <h3 className="text-xl font-bold mb-4">আমার আবেদনসমূহ</h3>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    {loadingApps ? <p>লোড হচ্ছে...</p> : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 border-b">
                                    <th className="p-2">আইডি</th>
                                    <th className="p-2">সেবার নাম</th>
                                    <th className="p-2">তারিখ</th>
                                    <th className="p-2">অবস্থা</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2 font-mono">{app.id}</td>
                                        <td className="p-2">{app.type}</td>
                                        <td className="p-2">{new Date(app.date).toLocaleDateString('bn-BD')}</td>
                                        <td className="p-2 font-bold text-green-700">{app.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;