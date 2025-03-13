import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      console.log("User restored from sessionStorage:", JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Saving user to sessionStorage:", user);
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = (userData, token) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
  };

  const logout = (navigate) => {
    console.log("Logging out...");
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    
    if (navigate) {
      navigate("/login");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
