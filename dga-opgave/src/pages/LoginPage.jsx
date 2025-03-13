import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { LoginForm } from "../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { HorizontalLine } from "../components/HorizoantalLine/HorizontalLine";

export const LoginPage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
    <HorizontalLine />
    <div className={styles.pageContainer}>
      {!user ? (
        <LoginForm />
      ) : (
        <div className={styles.profileContainer}>
          <h2>Min Profil</h2>
          <p>Velkommen, {user.firstname} {user.lastname}</p>
          <button onClick={() => logout(navigate)}>Log Out</button>
        </div>
      )}
    </div>
    </>
  );
};
