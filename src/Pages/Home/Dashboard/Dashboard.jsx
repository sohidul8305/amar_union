import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider'; // 💡 আপনার প্রজেক্ট অনুযায়ী পাথ ঠিক করে নিবেন
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            Swal.fire({
                icon: 'success',
                title: 'লগআউট সফল হয়েছে',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* সাইডবার (Sidebar) */}
            <div className="w-64 bg-[#0b6330] text-white p-6 hidden md:block flex-shrink-0">
                <h2 className="text-2xl font-black mb-8 border-b border-green-700 pb-4">আমার ইউনিয়ন</h2>
                <nav className="space-y-4">
                    <a href="#" className="block py-2.5 px-4 rounded bg-green-800 font-bold transition">হোম / ড্যাশবোর্ড</a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-green-700 transition">নাগরিক সেবা</a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-green-700 transition">আবেদনপত্র</a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-green-700 transition">সার্টিফিকেট</a>
                    <button 
                        onClick={handleLogOut}
                        className="w-full text-left mt-10 block py-2.5 px-4 rounded bg-red-600 hover:bg-red-700 font-bold transition cursor-pointer"
                    >
                        লগআউট করুন
                    </button>
                </nav>
            </div>

            {/* মেইন কন্টেন্ট এরিয়া */}
            <div className="flex-grow p-6 md:p-10">
                {/* টপ বার */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-8 border border-slate-100">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">স্বাগতম, ড্যাশবোর্ডে</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-600 hidden sm:inline">{user?.displayName || "ব্যবহারকারী"}</span>
                        <img 
                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full object-cover border border-[#0b6330]"
                        />
                    </div>
                </div>

                {/* ইউজার প্রোফাইল কার্ড */}
                <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 max-w-2xl">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <img 
                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                            alt="User Profile" 
                            className="h-28 w-28 rounded-full object-cover ring-4 ring-green-100 shadow"
                        />
                        <div className="text-center sm:text-left space-y-2">
                            <span className="bg-green-100 text-[#0b6330] text-xs font-bold px-3 py-1 rounded-full uppercase">নাগরিক প্রোফাইল</span>
                            <h3 className="text-2xl font-extrabold text-slate-800">{user?.displayName || "নাম পাওয়া যায়নি"}</h3>
                            <p className="text-sm text-slate-500 font-medium">ইমেইল: {user?.email || "ইমেইল পাওয়া যায়নি"}</p>
                            <p className="text-xs text-slate-400">অ্যাকাউন্ট আইডি (UID): {user?.uid}</p>
                        </div>
                    </div>
                </div>

                {/* সেবাসমূহের গ্রিড (ডেমো কার্ডস) */}
                <h3 className="text-xl font-bold text-slate-700 mt-10 mb-4">অনলাইন নাগরিক সেবাসমূহ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="text-3xl mb-2">📜</div>
                        <h4 className="font-bold text-slate-800 mb-1">চারিত্রিক সনদপত্র</h4>
                        <p className="text-xs text-slate-500">অনলাইনে চারিত্রিক সনদের জন্য আবেদন করুন ও ডাউনলোড করুন।</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="text-3xl mb-2">🏡</div>
                        <h4 className="font-bold text-slate-800 mb-1">উত্তরাধিকার সনদপত্র</h4>
                        <p className="text-xs text-slate-500">ওয়ারিশ বা উত্তরাধিকারী সনদের ডিজিটাল কপি সংগ্রহ করুন।</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="text-3xl mb-2">📞</div>
                        <h4 className="font-bold text-slate-800 mb-1">জরুরি যোগাযোগ</h4>
                        <p className="text-xs text-slate-500">ইউনিয়ন পরিষদের চেয়ারম্যান ও মেম্বারদের সাথে যোগাযোগের মাধ্যম।</p>
                    </div>
                </div>
                
                {/* মোবাইল স্ক্রিনের জন্য লগআউট বাটন */}
                <div className="mt-8 md:hidden">
                    <button 
                        onClick={handleLogOut}
                        className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-center transition cursor-pointer"
                    >
                        লগআউট করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;