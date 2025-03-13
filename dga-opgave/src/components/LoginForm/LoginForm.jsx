import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import styles from "./LoginForm.module.scss";
import emailIcon from "../../assets/icons/at-sign.png";
import passwordIcon from "../../assets/icons/secure.png";

export const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Before login");
    await login(email, password);
    console.log("After login: should redirect now");
    navigate("/profile");
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Velkommen tilbage</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <label>Email:</label>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Din email....."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <img src={emailIcon} alt="Email Icon" className={styles.icon} />
        </div>

        <label>Password:</label>
        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Dit password......"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img src={passwordIcon} alt="Password Icon" className={styles.icon} />
        </div>

        <p>
          Har du ikke allerede en konto? Klik <a href="/signup">her</a> for at gå til sign up
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
