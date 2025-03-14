import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./LoginForm.module.scss";
import icon1 from "../../assets/icons/at-sign.png";
import icon2 from "../../assets/icons/secure.png";
import { SignUpForm } from "../SignUpForm/SignUpForm";

export const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Before login");
    await login(email, password, navigate);
    console.log("After login: should redirect now");
  };

  return (
    <div className={styles.loginContainer}>
      {showSignUp ? ( 
        <SignUpForm setShowSignUp={setShowSignUp} />
      ) : (
        <>
          <h2>Velkommen tilbage</h2>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputWrapper}>
              <label>Email:</label>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Din email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <img src={icon1} alt="Email Icon" className={styles.inputIcon} />
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label>Password:</label>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  placeholder="Dit password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img src={icon2} alt="Password Icon" className={styles.inputIcon} />
              </div>
            </div>

            <p>
              Har du ikke allerede en konto? Klik{" "}
              <span onClick={() => setShowSignUp(true)} className={styles.toggleLink}>
                her
              </span>{" "}
              for at gå til sign up
            </p>

            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};
