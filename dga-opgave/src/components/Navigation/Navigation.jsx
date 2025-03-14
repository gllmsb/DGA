import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import styles from "./Navigation.module.scss";
import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";
import mail from "../../assets/icons/mail.png";
import info from "../../assets/icons/info-squared.png";
import account from "../../assets/icons/account.png";
import { UserContext } from "../../context/UserContext";

export const Navigation = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCreateAd = () => {
    if (user) {
      navigate("/opret-annonce");
    } else {
      setShowModal(true);
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.greenPart}>Den Grønne</span>
        <span className={styles.whitePart}> Avis</span>
      </Link>

      <div className={styles.rightSection}>
        <CategoryDropdown />
        <button className={styles.createAdBtn} onClick={handleCreateAd}>Opret Annonce</button>
        <div className={styles.icon}>
          <img src={mail} alt="mail" />
          <img src={info} alt="info" />
          <Link to={user ? "/profile" : "/login"}>
            <img src={account} alt="account" />
          </Link>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <p>Du skal være logget ind for at oprette en annonce.</p>
            <div className={styles.modalButtons}>
              <button 
                onClick={() => {
                  setShowModal(false); 
                  navigate("/login");  
                }} 
                className={styles.loginButton}
              >
                Log ind
              </button>
              <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                Luk
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
