import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User state updated, navigating to /profile...");
      navigate("/profile"); 
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      console.log("Attempting login...");
      console.log("Sending credentials:", { email, password });

      const response = await fetch("http://localhost:4242/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      console.log("Request Sent...");
      console.log("Response Status:", response.status);

      const data = await response.json();
      console.log("Parsed Response Body:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      if (data.access_token) {
        console.log("Login Success!");
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user); 
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
