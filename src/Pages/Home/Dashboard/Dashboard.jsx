import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider'; 
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingApps, setLoadingApps] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const navigate = useNavigate();

    // 💡 ফিক্স ১: user.number এর বদলে ইউনিক user.email দিয়ে ডাটাবেজ থেকে প্রোফাইল লোড করা
    useEffect(() => {
        if (user?.email) {
            setLoadingProfile(true);
            fetch(`http://localhost:5000/api/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setUserProfile(data);
                    setLoadingProfile(false);
                })
                .catch(err => {
                    console.error("Profile fetch error:", err);
                    setLoadingProfile(false);
                });
        }
    }, [user]);

    // আবেদন লোড করা
    useEffect(() => {
        if (user?.email) {
            setLoadingApps(true);
            fetch(`http://localhost:5000/api/my-applications/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setApplications(data);
                    setLoadingApps(false);
                })
                .catch(err => {
                    console.error("Error fetching applications:", err);
                    setLoadingApps(false);
                });
        }
    }, [user]);

    const handleLogOut = async () => {
        try {
            await logOut();
            Swal.fire({ icon: 'success', title: 'লগআউট সফল হয়েছে', showConfirmButton: false, timer: 1500 });
            navigate('/login');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* সাইডবার */}
            <div className="w-64 bg-[#0b6330] text-white p-6 hidden md:block flex-shrink-0">
                <h2 className="text-2xl font-black mb-8 border-b border-green-700 pb-4">আমার ইউনিয়ন</h2>
                <nav className="space-y-4">
                    <a href="#" className="block py-2.5 px-4 rounded bg-green-800 font-bold transition">হোম / ড্যাশবোর্ড</a>
                    <button onClick={handleLogOut} className="w-full text-left mt-10 block py-2.5 px-4 rounded bg-red-600 hover:bg-red-700 font-bold transition cursor-pointer">লগআউট করুন</button>
                </nav>
            </div>

            {/* মেইন কন্টেন্ট */}
            <div className="flex-grow p-6 md:p-10">
                {/* টপ বার */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-8 border border-slate-100">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">স্বাগতম, ড্যাশবোর্ডে</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-600 hidden sm:inline">{userProfile?.name || userProfile?.displayName || user?.displayName || "ব্যবহারকারী"}</span>
                        {/* 💡 ফিক্স ২: রিয়েল-টাইম ইমেজ লোডিং নিশ্চিত করার জন্য key ও সঠিক সোর্স ব্যবহার */}
                        <img 
                            key={userProfile?.photoURL || user?.photoURL}
                            src={userProfile?.photoURL || user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full object-cover border border-[#0b6330]" 
                        />
                    </div>
                </div>

                {/* প্রোফাইলカード */}
                <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 max-w-2xl mb-10">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* 💡 ফিক্স ৩: মেইন প্রোফাইল ছবির জন্য রেন্ডারিং ইস্যু সমাধান */}
                        <img 
                            key={userProfile?.photoURL || user?.photoURL}
                            src={userProfile?.photoURL || user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                            alt="User Profile" 
                            className="h-28 w-28 rounded-full object-cover ring-4 ring-green-100 shadow" 
                        />
                        <div className="text-center sm:text-left space-y-2">
                            <span className="bg-green-100 text-[#0b6330] text-xs font-bold px-3 py-1 rounded-full uppercase">নাগরিক প্রোফাইল</span>
                            <h3 className="text-2xl font-extrabold text-slate-800">{userProfile?.name || userProfile?.displayName || user?.displayName || "নাম পাওয়া যায়নি"}</h3>
                            <p className="text-sm text-slate-500 font-medium">📧 ইমেইল: {user?.email || "ইমেইল পাওয়া যায়নি"}</p>
                            {/* 💡 ফিক্স ৪: ডাটাবেজের 'mobile' ফিল্ডটি এখানে কল করা হয়েছে যেন সঠিক নম্বর শো করে */}
                            <p className="text-sm text-slate-600 font-medium">📞 মোবাইল নম্বর: {userProfile?.mobile || user?.phoneNumber || "নম্বর পাওয়া যায়নি"}</p>
                            {userProfile?.nidOrBrd && <p className="text-sm text-slate-600 font-medium">🆔 এনআইডি / জন্ম নিবন্ধন: {userProfile.nidOrBrd}</p>}
                            <p className="text-xs text-slate-400">অ্যাকাউন্ট আইডি (UID): {user?.uid}</p>
                        </div>
                    </div>
                </div>

                {/* আবেদন তালিকা */}
                <h3 className="text-xl font-bold text-slate-700 mb-4">আমার করা আবেদনপত্রের তালিকা</h3>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                    {loadingApps ? (
                        <div className="p-6 text-center text-slate-500">আবেদনপত্র লোড হচ্ছে...</div>
                    ) : applications.length === 0 ? (
                        <div className="p-6 text-center text-slate-500">আপনি এখনো কোনো বিষয়ে আবেদন করেননি।</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 text-sm font-semibold">
                                    <th className="p-4">আবেদন আইডি</th>
                                    <th className="p-4">আবেদনের বিষয় (সেবা)</th>
                                    <th className="p-4">আবেদনের তারিখ</th>
                                    <th className="p-4">অবস্থা (Status)</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                                {applications.map((app, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition">
                                        <td className="p-4 font-mono font-bold text-slate-700">{app.id || 'N/A'}</td>
                                        <td className="p-4 font-bold">{app.type}</td>
                                        <td className="p-4">{app.date ? new Date(app.date).toLocaleDateString('bn-BD') : 'N/A'}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                app.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                                app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {app.status === 'Pending' ? 'চলমান (Pending)' : app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* মোবাইল লগআউট */}
                <div className="mt-8 md:hidden">
                    <button onClick={handleLogOut} className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-center transition cursor-pointer">লগআউট করুন</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;