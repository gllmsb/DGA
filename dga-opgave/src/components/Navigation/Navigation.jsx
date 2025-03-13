import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from "./Navigation.module.scss";
import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";
import mail from "../../assets/icons/mail.png";
import info from "../../assets/icons/info-squared.png";
import account from "../../assets/icons/account.png";
import { UserContext } from "../../context/UserContext";


export const Navigation = () => {
  const { user } = useContext(UserContext);

  console.log("Current User:", user);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.greenPart}>Den Grønne</span>
        <span className={styles.whitePart}> Avis</span>
      </Link>

      <div className={styles.rightSection}>
        <CategoryDropdown />
        <button className={styles.createAdBtn}>Opret Annonce</button>
        <div className={styles.icon}>
          <img src={mail} alt="mail" />
          <img src={info} alt="info" />
          <Link to={user ? "/profile" : "/login"}>
            <img src={account} alt="account" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
