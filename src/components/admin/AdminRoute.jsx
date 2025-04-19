// src/routes/AdminRoute.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

const ADMIN_EMAIL = "nirbhay12@gmail.com";

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return user.email === ADMIN_EMAIL ? children : <Navigate to="/" />;
};

export default AdminRoute;
