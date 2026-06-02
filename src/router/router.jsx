// src/router/router.jsx
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/service/trade-license",
        element: <Treadlicence />,
      },
      {
        path: "service/premises-license",
        element: <Premises />,
      },
      {
        path: "service/warish-certificate",
        element: <Warish />,
      },
      {
        path: "service/family-certificate",
        element: <Family_certificate />,
      },
      {
        path: "service/citizenship-certificate",
        element: <Citizenship_certificate />,
      },
      {
        path: "service/successor-certificate",
        element: <Successor_certificate />,
      },
      {
        path: "service/power-of-attorney",
        element: <Power_of_attorney />,
      },
      {
        path: "service/death-certificate",
        element: <Death_certificate />,
      },
      {
        path: "service/landless-certificate",
        element: <Landless_certificate />,
      },
    ],
  },
]);

// 💡 এখানে Named Export করা হলো যাতে main.jsx এ { router } এভাবে ইম্পোর্ট করা যায়
export { router };