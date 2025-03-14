import { useContext } from "react";
import styles from "./ProfileDetails.module.scss";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const ProfileDetails = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className={styles.profileContainer}>
      <form className={styles.profileForm}>
        
        <div className={styles.leftSection}>
          <div className={styles.inputGroup}>
            <label>Fornavn</label>
            <input type="text" name="firstname" value={user?.firstname || ""} placeholder="Dit navn...." />
          </div>

          <div className={styles.inputGroup}>
            <label>Efternavn</label>
            <input type="text" name="lastname" value={user?.lastname || ""} placeholder="Dit efternavn...." />
          </div>

          <div className={styles.inputGroup}>
            <label>Adresse</label>
            <input type="text" name="address" value={user?.address || ""} placeholder="Din adresse...."/>
          </div>

          <div className={styles.inputGroup}>
            <label>Postnummer</label>
            <input type="text" name="zipcode" value={user?.zipcode || ""} placeholder="Dit postnummer....."/>
          </div>

          <div className={styles.inputGroup}>
            <label>Telefon</label>
            <input type="text" name="phone" value={user?.phone || ""} placeholder="Dit telefon nummer...." />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" name="email" value={user?.email || ""} placeholder="Din email adresse...."  />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.checkboxGroup}>
            <input className={styles.check} type="checkbox" />
            <label>Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud osv.</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input className={styles.check} type="checkbox" />
            <label>Jeg ønsker at modtage notifikationer i form af emails når der sker en opdatering.</label>
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.deleteButton}>
              Slet profil
            </button>
            <button type="button" className={styles.saveButton}>
              Gem ændringer
            </button>
            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
              Log ud
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
