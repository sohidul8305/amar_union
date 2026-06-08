import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingApps, setLoadingApps] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const navigate = useNavigate();

    // ব্যাকএন্ড থেকে প্রোফাইল লোড (মোবাইল নম্বর ও ছবির জন্য)
    useEffect(() => {
        if (user?.email) {
            setLoadingProfile(true);
            fetch(`http://localhost:5000/api/users/${user.email}`)
                .then(res => {
                    if (!res.ok) throw new Error('Profile not found');
                    return res.json();
                })
                .then(data => {
                    setUserProfile(data);
                })
                .catch(err => {
                    console.warn("Backend profile fetch failed, using Firebase data.");
                    setUserProfile(null); // ব্যাকএন্ড ব্যর্থ হলে শুধু Firebase ব্যবহার করবে
                })
                .finally(() => setLoadingProfile(false));
        }
    }, [user]);

    // আবেদন লোড (আপনার পুরনো কোড অনুযায়ী)
    useEffect(() => {
        if (user?.email) {
            setLoadingApps(true);
            fetch(`http://localhost:5000/api/my-applications/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setApplications(data);
                })
                .catch(err => console.error("Apps fetch error:", err))
                .finally(() => setLoadingApps(false));
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

    // ছবি সোর্স নির্ধারণ – ব্যাকএন্ড > Firebase > ডিফল্ট
const getUserAvatar = () => {
    // ১. Firebase photoURL সবচেয়ে নির্ভরযোগ্য
    if (user?.photoURL && user.photoURL !== "null" && user.photoURL !== "") {
        return user.photoURL;
    }
    // ২. ব্যাকএন্ড photoURL
    if (userProfile?.photoURL && userProfile.photoURL !== "null") {
        return userProfile.photoURL;
    }
    // ৩. UI Avatars ডিফল্ট
    const name = userProfile?.name || user?.displayName || 'Union User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0b6330&color=fff&bold=true`;
};

// মোবাইল নম্বর দেখানোর ফাংশন
// const getMobileNumber = () => {
//     if (userProfile?.mobile) return userProfile.mobile;
//     if (user?.phoneNumber) return user.phoneNumber;
// return "নম্বর পাওয়া যায়নি";
// };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* সাইডবার (আপনার মতো রাখা হয়েছে) */}
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
                        <span className="text-sm font-semibold text-slate-600 hidden sm:inline">
                            {userProfile?.name || user?.displayName || "ব্যবহারকারী"}
                        </span>
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-[#0b6330] shadow-sm bg-slate-100">
                            <img src={getUserAvatar()} alt="Profile" className="h-full w-full object-cover" 
                                onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} />
                        </div>
                    </div>
                </div>

                {/* প্রোফাইল কার্ড – এখানে মোবাইল ও ছবি দেখানো হবে */}
                <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 max-w-2xl mb-10">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-green-100 shadow bg-slate-100 flex-shrink-0">
                            <img src={getUserAvatar()} alt="User Profile" className="h-full w-full object-cover"
                                onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} />
                        </div>
                        <div className="text-center sm:text-left space-y-2 flex-grow">
                            <span className="bg-green-100 text-[#0b6330] text-xs font-bold px-3 py-1 rounded-full uppercase">নাগরিক প্রোফাইল</span>
                            <h3 className="text-2xl font-extrabold text-slate-800">
                                {userProfile?.name || user?.displayName || "নাম পাওয়া যায়নি"}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium">📧 ইমেইল: {user?.email || "ইমেইল পাওয়া যায়নি"}</p>
                            {/* <p className="text-sm text-slate-600 font-medium">📞 মোবাইল নম্বর: {getMobileNumber()}</p>
                            {userProfile?.nidOrBrd && <p className="text-sm text-slate-600 font-medium">🆔 এনআইডি / জন্ম নিবন্ধন: {userProfile.nidOrBrd}</p>}
                            <p className="text-xs text-slate-400">অ্যাকাউন্ট আইডি (UID): {user?.uid}</p> */}
                        </div>
                    </div>
                </div>

                {/* আবেদন তালিকা – পূর্বের মতই */}
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