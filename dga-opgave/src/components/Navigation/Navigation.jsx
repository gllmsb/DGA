import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss"; 
import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";
import mail from "../../assets/icons/mail.png";
import info from "../../assets/icons/info-squared.png";
import account from "../../assets/icons/account.png";

export const Navigation = () => {
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
          <img src={account} alt="account" />
        </div>
      </div>
    </nav>
  );
};
