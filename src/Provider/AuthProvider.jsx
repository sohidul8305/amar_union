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
googleProvider.setCustomParameters({ prompt: 'select_account' });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // লোডিং শেষ
    });
    return () => unsubscribe();
  }, []);

  // প্রোফাইল আপডেট করার পর React state ও Firebase সিঙ্ক
const updateUserProfile = async (currentUser, profile) => {
    await updateProfile(currentUser, profile);
    setUser((prevUser) => ({
        ...prevUser,
        displayName: profile.displayName || prevUser.displayName,
        photoURL: profile.photoURL || prevUser.photoURL,
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
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;