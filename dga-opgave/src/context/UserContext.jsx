import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Restoring User:", parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const login = (userData, token) => {
    console.log("Logging in user:", userData);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    console.log("Logging out...");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
