import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (email) => {
    const ok = email.endsWith("@iit.ac.in") || email === "admin@example.com";
    if (!ok) throw new Error("Use your @iit.ac.in email");
    const u = { email, role: email.startsWith("admin") ? "ADMIN" : "USER" };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };
  const logout = () => { setUser(null); localStorage.removeItem("user"); };

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
};
export const useAuth = () => useContext(AuthCtx);
