import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const { registerUser, updateUserProfile, signInGoogle } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        fullName: '',
        nidOrBrd: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [registeredUser, setRegisteredUser] = useState(null);
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // ব্যাকএন্ডে ইউজার ডাটা সেভ করার ফাংশন (ত্রুটি থেকেও রেজিস্ট্রেশন সফল দেখাবে)
    const saveUserToBackend = async (userData) => {
        try {
            const response = await fetch('https://amar-union-backend.vercel.app/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                console.warn("Backend save failed, but registration successful.");
            }
        } catch (err) {
            console.warn("Backend error:", err);
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // NID/জন্ম নিবন্ধন ভ্যালিডেশন (আগের মতো)
    const nidLength = formData.nidOrBrd.trim().length;
    if (nidLength !== 10 && nidLength !== 13 && nidLength !== 17) {
        return setError("জাতীয় পরিচয়পত্র (NID) নম্বর ১০, ১৩ অথবা ১৭ ডিজিটের এবং জন্ম নিবন্ধন নম্বর ১৭ ডিজিটের হতে হবে!");
    }
    if (formData.password !== formData.confirmPassword) {
        return setError("পাসওয়ার্ড দুটি মিলছে না!");
    }
    if (formData.password.length < 6) {
        return setError("পাসওয়ার্ডটি অবশ্যই কমপক্ষে ৬ অক্ষরের হতে হবে!");
    }

    setLoading(true);

    try {
        let photoURL = "";
        if (image) {
            try {
                const imgFormData = new FormData();
                imgFormData.append("image", image);
                // ✅ এখানে আপনার একচুয়াল API key বসানো হয়েছে
                const response = await fetch("https://api.imgbb.com/1/upload?key=8bf6838d246dba2d2f07c95a50b28938", {
                    method: "POST",
                    body: imgFormData,
                });
                const imgData = await response.json();
                if (imgData.success) {
                    photoURL = imgData.data.url;
                } else {
                    console.warn("ImgBB upload failed:", imgData);
                    // ব্যর্থ হলে ইউজারকে জানান, কিন্তু রেজিস্ট্রেশন থামাবেন না
                    Toast.fire({ icon: "warning", title: "ছবি আপলোড ব্যর্থ, ডিফল্ট ছবি ব্যবহার করা হবে" });
                }
            } catch (imgErr) {
                console.error("Image Upload Error:", imgErr);
                Toast.fire({ icon: "warning", title: "ছবি আপলোড ব্যর্থ, পরে যোগ করতে পারবেন" });
            }
        }

        // যদি কোনো ছবি না থাকে বা আপলোড ব্যর্থ হয়, তাহলে একটি ডিফল্ট ছবি দিন (UI Avatars)
        if (!photoURL) {
            const defaultName = formData.fullName || "Union User";
            photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(defaultName)}&background=0b6330&color=fff&bold=true`;
        }

        // ১. ফায়ারবেস রেজিস্ট্রেশন
        const userCredential = await registerUser(formData.email, formData.password);
        
        // ২. ফায়ারবেস প্রোফাইল আপডেট (নাম ও ছবি)
        await updateUserProfile(userCredential.user, {
            displayName: formData.fullName,
            photoURL: photoURL
        });

        // ৩. ব্যাকএন্ডে ইউজার ইনফো সেভ (মোবাইল নম্বরসহ)
        const userData = {
            name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            nidOrBrd: formData.nidOrBrd,
            photoURL: photoURL,
            createdAt: new Date()
        };
        await saveUserToBackend(userData);

        // ৪. রেজিস্ট্রেশন সফল – UI তে দেখানোর জন্য ডাটা সংরক্ষণ
        setRegisteredUser({
            name: formData.fullName,
            photoURL: photoURL,
            mobile: formData.mobile
        });

        Toast.fire({ icon: "success", title: "নিবন্ধন সফল হয়েছে!" });
        setTimeout(() => navigate('/dashboard'), 4000);

    } catch (err) {
        console.error("Registration Error: ", err);
        if (err.code === 'auth/email-already-in-use') {
            setError("এই ইমেইলটি দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে।");
        } else if (err.code === 'auth/weak-password') {
            setError("পাসওয়ার্ডটি দুর্বল, আরও শক্তিশালী পাসওয়ার্ড দিন।");
        } else {
            setError(err.message.replace("Firebase: ", ""));
        }
        Toast.fire({ icon: "error", title: "নিবন্ধন ব্যর্থ হয়েছে!" });
    } finally {
        setLoading(false);
    }
};

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            const result = await signInGoogle();
            let mobileNumber = result.user.phoneNumber;

            if (!mobileNumber) {
                const { value: typedMobile } = await Swal.fire({
                    title: 'আপনার মোবাইল নম্বরটি দিন',
                    input: 'tel',
                    inputLabel: 'নিবন্ধনের জন্য একটি সচল মোবাইল নম্বর প্রয়োজন',
                    inputPlaceholder: '01XXXXXXXXX',
                    allowOutsideClick: false,
                    confirmButtonText: 'নিশ্চিত করুন',
                    inputValidator: (value) => {
                        if (!value) return 'মোবাইল নম্বর দেওয়া বাধ্যতামূলক!';
                        if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(value)) {
                            return 'সঠিক বাংলাদেশী মোবাইল নম্বর প্রদান করুন!';
                        }
                    }
                });
                mobileNumber = typedMobile;
            }

            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                mobile: mobileNumber,
                photoURL: result.user.photoURL,
                createdAt: new Date()
            };
            await fetch('https://amar-union-backend.vercel.app/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            setRegisteredUser({
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                mobile: mobileNumber
            });

            Toast.fire({ icon: "success", title: "গুগল সাইন-ইন সফল!" });
            setTimeout(() => navigate('/dashboard'), 4000);
        } catch (err) {
            console.error(err);
            setError(err.message.replace("Firebase: ", ""));
            Toast.fire({ icon: "error", title: "গুগল সাইন-ইন ব্যর্থ!" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-6 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
                {/* হেডার ও ফর্মের JSX আগের মতোই – সংক্ষেপে দেখানো হলো */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#0b6330] to-[#0f4c81] text-white text-2xl font-bold shadow-md">
                        AU
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold text-[#0b6330]">নতুন অ্যাকাউন্ট নিবন্ধন</h2>
                    <p className="mt-1 text-sm font-medium text-[#0f4c81]">আমার ইউনিয়ন — সেবা সহজ, জীবন উন্নত</p>
                </div>

                {registeredUser && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 text-center shadow-sm space-y-3 animate-fadeIn">
                        <p className="text-sm font-bold text-green-700 bg-green-100/70 inline-block px-3 py-1 rounded-full">🎉 নিবন্ধন সফল হয়েছে! স্বাগতম,</p>
                        <h3 className="text-lg font-extrabold text-slate-800">{registeredUser.name}</h3>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            {registeredUser.photoURL ? (
                                <img src={registeredUser.photoURL} alt="Profile" className="h-20 w-20 rounded-full object-cover border-2 border-[#0b6330] shadow-md" />
                            ) : (
                                <div className="h-20 w-20 rounded-full bg-slate-200 border-2 border-[#0b6330] flex items-center justify-center text-slate-500 font-bold">No Image</div>
                            )}
                            <div className="text-left bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                                <p className="text-xs text-slate-500 font-medium">নিবন্ধিত মোবাইল নম্বর:</p>
                                <p className="text-base font-bold text-[#0f4c81] tracking-wide">{registeredUser.mobile}</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 pt-1">কিছুক্ষণের মধ্যে আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হবে...</p>
                    </div>
                )}

                {error && <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-sm text-red-700">{error}</div>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* ইমেজ আপলোড ফিল্ড, ইনপুট ফিল্ডসমূহ – আগের মতোই */}
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <label className="block text-sm font-medium text-slate-700">ব্যবহারকারীর ছবি সংযুক্ত করুন</label>
                        <div className="relative h-24 w-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 hover:border-[#0b6330] transition duration-200 cursor-pointer">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <div className="text-center p-2">
                                    <svg className="mx-auto h-6 w-6 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mt-1 block text-[10px] font-semibold text-slate-500">ছবি বাছুন</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">পূর্ণ নাম</label><input name="fullName" type="text" required value={formData.fullName} onChange={handleInputChange} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330]" placeholder="উদা: মোঃ আব্দুর রহমান" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">এনআইডি / জন্ম নিবন্ধন নম্বর</label><input name="nidOrBrd" type="text" required value={formData.nidOrBrd} onChange={handleInputChange} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330]" placeholder="১০, ১৩ বা ১৭ ডিজিটের নম্বর লিখুন" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">মোবাইল নম্বর</label><input name="mobile" type="tel" required value={formData.mobile} onChange={handleInputChange} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330]" placeholder="01XXXXXXXXX" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label><input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330]" placeholder="example@email.com" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">পাসওয়ার্ড</label><input name="password" type="password" required value={formData.password} onChange={handleInputChange} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330]" placeholder="••••••••" autoComplete="new-password" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label><input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleInputChange} className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0b6330] focus:border-[#0b6330]" placeholder="••••••••" autoComplete="new-password" /></div>
                    </div>

                    <div className="flex items-center">
                        <input id="terms" type="checkbox" required className="h-4 w-4 text-[#0b6330] border-slate-300 rounded cursor-pointer" />
                        <label htmlFor="terms" className="ml-2 block text-xs sm:text-sm text-slate-700 cursor-pointer">আমি সকল শর্তাবলী মেনে অ্যাকাউন্ট খুলতে সম্মত আছি।</label>
                    </div>

                    <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 text-base font-bold rounded-lg text-white bg-[#0b6330] hover:bg-[#074722] shadow-md transition disabled:opacity-60 cursor-pointer">
                        {loading ? 'নিবন্ধন হচ্ছে...' : 'নিবন্ধন সম্পন্ন করুন'}
                    </button>
                </form>

                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase">অথবা</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 shadow-sm transition cursor-pointer">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google অ্যাকাউন্ট দিয়ে দ্রুত নিবন্ধন করুন
                </button>

                <div className="text-center pt-3 border-t border-slate-100">
                    <p className="text-sm text-slate-600">পূর্বেই অ্যাকাউন্ট করা আছে? <Link to="/login" className="font-bold text-[#0f4c81] hover:text-[#0b6330]">লগইন করুন</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;