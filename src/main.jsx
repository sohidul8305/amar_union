// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // ✅ ইম্পোর্ট সোর্স ঠিক করা হয়েছে
import { router } from '../src/router/router' // ✅ এখন এটি পারফেক্টলি কাজ করবে
import AuthProvider from './Provider/AuthProvider' 
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />

    </AuthProvider>
  </React.StrictMode>
) // ✅ শেষের অতিরিক্ত কমাটি বাদ দেওয়া হয়েছে