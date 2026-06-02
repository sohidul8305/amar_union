// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Dashboard from "../Pages/Home/Dashboard/Dashboard";
import Treadlicence from "../Components/Treadlicence/Treadlicence";
import Premises from "../Components/Premises/Premises";

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
    ],
  },
]);

// 💡 এখানে Named Export করা হলো যাতে main.jsx এ { router } এভাবে ইম্পোর্ট করা যায়
export { router };