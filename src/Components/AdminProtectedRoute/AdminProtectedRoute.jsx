// Components/AdminProtectedRoute/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin !== "true") {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};
export default AdminProtectedRoute;