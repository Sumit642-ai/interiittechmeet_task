import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={user ? <Post /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}
