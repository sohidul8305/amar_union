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
import Dashboarrd from "../Pages/Home/Dashboarrd/Dashboarrd";
import Plan from "../Pages/Home/Plan/Plan";
import Trade_renewal from "../Components/Trade_renewal/Trade_renewal";
import Open_space_license from "../Components/Open_space_license/Open_space_license";
import Character_certificate from "../Components/Character_certificate/Character_certificate";
import Unmarried_certificate from "../Components/Unmarried_certificate/Unmarried_certificate";
import Nationality from "../Components/Nationality/Nationality";
import Remarriage from "../Components/Remarriage/Remarriage";
import Annual_income from "../Components/Annual_income/Annual_income";
import Same_name from "../Components/Same_name/Same_name";
import Disability from "../Components/Disability/Disability";
import Religion_cert from "../Components/Religion_cert/Religion_cert";
import Permission from "../Components/Permission/Permission";
import Passport from "../Components/Passport/Passport";
import Voter_transfer from "../Components/Voter_transfer/Voter_transfer";
import River_erosion from "../Components/River_erosion/River_erosion";
import New_voter from "../Components/New_voter/New_voter";
import Married_certificate from "../Components/Married_certificate/Married_certificate";
import Voter_update from "../Components/Voter_update/Voter_update";
import Guardian_consent from "../Components/Guardian_consent/Guardian_consent";
import Non_citizen from "../Components/Non_citizen/Non_citizen";
import Noc from "../Components/Noc/Noc";
import Voter_verification from "../Components/Voter_verification/Voter_verification";

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
      { path: "/service/plan", element: <Plan/> },
      { path: "/service/trade-renewal", element: <Trade_renewal/> },
      { path: "service/open-space-license", element: <Open_space_license/> },
      { path: "service/character-certificate", element: <Character_certificate/> },
      { path: "service/unmarried-certificate", element: <Unmarried_certificate/> },
      { path: "service/nationality", element: <Nationality/> },
      { path: "service/remarriage-not-happened", element: <Remarriage/> },
      { path: "service/annual-income", element: <Annual_income/> },
      { path: "service/same-name", element: <Same_name/> },
      { path: "service/disability", element: <Disability/> },
      { path: "service/religion-cert", element: <Religion_cert/> },
      { path: "service/permission", element: <Permission/> },
      { path: "service/passport-recommendation", element: <Passport/> },
      { path: "service/voter-transfer", element: <Voter_transfer/> },
      { path: "service/river-erosion", element: <River_erosion/> },
      { path: "service/new-voter", element: <New_voter/> },
      { path: "service/married-certificate", element: <Married_certificate/> },
      { path: "service/voter-update", element: <Voter_update/> },
      { path: "service/guardian-consent", element: <Guardian_consent/> },
      { path: "service/non-citizen", element: <Non_citizen/> },
      { path: "service/noc", element: <Noc/> },
      { path: "service/voter-verification", element: <Voter_verification/> },
    ],
  },
  // 🆕 অ্যাডমিন রাউট (লেআউট ছাড়া)
{
  path: "/admin-login",
  element: <AdminLogin />,
},
  {
    path: "/admin-dashboard-secret",
    element: <Dashboarrd />,
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