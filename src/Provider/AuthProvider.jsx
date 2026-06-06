import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      loading && setLoading(false); // লোডিং ট্র্যাকিং ফিক্স
    });

    return () => unsubscribe();
  }, []);

  // প্রোফাইল আপডেট করার পর রিয়েক্ট স্টেট সিঙ্ক করার জন্য ইন্টারনাল ফাংশন
  const updateUserProfile = async (currentUser, profile) => {
    await updateProfile(currentUser, profile);
    // 💡 ফিক্স: প্রোফাইল আপডেটের পর লোকাল স্টেট আপডেট করা হচ্ছে যেন রিফ্রেশ ছাড়া ইমেজ দেখায়
    setUser((prevUser) => ({
      ...prevUser,
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    }));
  };

  const authInfo = {
    user,
    loading,
    registerUser: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    signInUser: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    signInGoogle: () => signInWithPopup(auth, googleProvider),
    logOut: () => signOut(auth),
    updateUserProfile, // আপডেট করা ফাংশনটি পাস করা হলো
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;