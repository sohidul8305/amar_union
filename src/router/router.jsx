import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Dashboard from "../Pages/Home/Dashboard/Dashboard";
import Treadlicence from "../Components/Treadlicence/Treadlicence";
import Premises from "../Components/Premises/Premises";
import Warish from "../Components/warish/Warish";
import Family_certificate from "../Components/Family_certificate/Family_certificate";
import Citizenship_certificate from "../Components/Citizenship_certificate/Citizenship_certificate";
import Successor_certificate from "../Components/Successor_certificate/Successor_certificate";
import Power_of_attorney from "../Components/Power_of_attorney/Power_of_attorney";
import Death_certificate from "../Components/Death_certificate/Death_certificate";
import Landless_certificate from "../Components/Landless_certificate/Landless_certificate";

// 🆕 অ্যাডমিন সম্পর্কিত ইম্পোর্ট
import AdminLogin from "../Pages/Home/admin/AdminLogin";
import AdminDashboard from "../Pages/Home/admin/AdminDashboard";
import AdminProtectedRoute from "../Components/AdminProtectedRoute/AdminProtectedRoute";
import Intro from "../Pages/Home/Intro/Intro";
import Glance from "../Pages/Home/Glance/Glance";
import Structure from "../Pages/Home/Structure/Structure";
import Current_chairman from "../Pages/Home/Current_chairman/Current_chairman";
import Councillors from "../Pages/Home/Councillors/Councillors";
import Secretary from "../Pages/Home/Secretary/Secretary";
import Ex_chairmans from "../Pages/Home/Ex_chairmans/Ex_chairmans";
import Account from "../Pages/Home/Account/Account";
import Other_staff from "../Pages/Home/Other_staff/Other_staff";
import Update from "../Pages/Home/Update/Update";
import Gellary from "../Pages/Home/Gellary/Gellary";
import Check from "../Pages/Home/Check/Check";
import Contact from "../Pages/Home/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/service/trade-license", element: <Treadlicence /> },
      { path: "service/premises-license", element: <Premises /> },
      { path: "service/warish-certificate", element: <Warish /> },
      { path: "service/family-certificate", element: <Family_certificate /> },
      { path: "service/citizenship-certificate", element: <Citizenship_certificate /> },
      { path: "service/successor-certificate", element: <Successor_certificate /> },
      { path: "service/power-of-attorney", element: <Power_of_attorney /> },
      { path: "service/death-certificate", element: <Death_certificate /> },
      { path: "service/landless-certificate", element: <Landless_certificate /> },
      { path: "service/intro", element: <Intro/> },
      { path: "service/at-a-glance", element: <Glance/> },
      { path: "service/structure", element: <Structure/> },
      { path: "service/current-chairman", element: <Current_chairman/> },
      { path: "service/councillors", element: <Councillors/> },
      { path: "service/secretary", element: <Secretary/> },
      { path: "service/ex-chairmans", element: <Ex_chairmans/> },
      { path: "service/accountant", element: <Account/> },
      { path: "service/other-staff", element: <Other_staff/> },
      { path: "/update", element: <Update/> },
      { path: "/gellary", element: <Gellary/> },
      { path: "/check", element: <Check/> },
      { path: "/contact", element: <Contact/> },
    ],
  },
  // 🆕 অ্যাডমিন রাউট (লেআউট ছাড়া)
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
  },
]);

export { router };