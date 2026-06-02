import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider'; 
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, signInGoogle } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // টোস্ট অ্যালার্ট কনফিগারেশন
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInUser(email, password);
            Toast.fire({
                icon: "success",
                title: "লগইন সফল হয়েছে!"
            });
            navigate('/dashboard'); // ড্যাশবোর্ডে রিডাইরেক্ট
        } catch (err) {
            console.error(err);
            setError(err.message.replace("Firebase: ", ""));
            Toast.fire({
                icon: "error",
                title: "লগইন ব্যর্থ হয়েছে!"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await signInGoogle();
            Toast.fire({
                icon: "success",
                title: "গুগল লগইন সফল হয়েছে!"
            });
            navigate('/dashboard'); // ড্যাশবোর্ডে রিডাইরেক্ট
        } catch (err) {
            console.error("Google Sign-In Error:", err);
            setError(err.message.replace("Firebase: ", ""));
            Toast.fire({
                icon: "error",
                title: "গুগল সাইন-ইন পপআপ বন্ধ করা হয়েছে বা সমস্যা হয়েছে।"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#0b6330] to-[#0f4c81] text-white text-3xl font-bold shadow-md">
                        AU
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold text-[#0b6330]">আমার ইউনিয়ন</h2>
                    <p className="mt-1 text-sm font-medium text-[#0f4c81] tracking-wide">সেবা সহজ, জীবন উন্নত</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg placeholder-slate-400 text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330] text-sm"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">পাসওয়ার্ড</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg placeholder-slate-400 text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330] text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="h-4 w-4 text-[#0b6330] border-slate-300 rounded cursor-pointer" />
                            <label htmlFor="remember-me" className="ml-2 block text-slate-700 cursor-pointer select-none">মনে রাখুন</label>
                        </div>
                        <a href="#" className="font-medium text-[#0f4c81] hover:text-[#0b6330]">পাসওয়ার্ড ভুলে গেছেন?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#0b6330] hover:bg-[#074722] shadow-md transition disabled:opacity-60"
                    >
                        {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
                    </button>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase">অথবা</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 shadow-sm transition"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google অ্যাকাউন্ট দিয়ে প্রবেশ করুন
                </button>

                <div className="text-center pt-2 border-t border-slate-100">
                    <p className="text-sm text-slate-600">
                        নতুন অ্যাকাউন্ট প্রয়োজন? <a href="/register" className="font-semibold text-[#0f4c81] hover:text-[#0b6330]">নিবন্ধন করুন</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;