import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "http://localhost:4242/login";

    if (!email || !password) {
      alert("Indtast email og password.");
      return;
    }

    let body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: body,
      });

      if (!response.ok) {
        throw new Error("Forkert email eller adgangskode");
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.data?.access_token) {
        sessionStorage.setItem("token", data.data.access_token);
        sessionStorage.setItem("userData", JSON.stringify(data.data.user));

        console.log("User Data Saved:", data.data.user);
        login(data.data.user, data.data.access_token);
        navigate("/profile");
      } else {
        alert("Forkert email eller adgangskode");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login mislykkedes.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Velkommen tilbage</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.inputWrapper}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Din email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputWrapper}>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Dit password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
