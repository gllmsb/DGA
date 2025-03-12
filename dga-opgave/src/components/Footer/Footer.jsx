import { useState } from "react";
import styles from "./Footer.module.scss";

export const Footer = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true); 
      return;
    }
    alert("Du er tilmeldt nyhedsbrevet!");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h3>Nyhedsbrev</h3>
        <p>
          Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få de seneste
          klimaopdateringer direkte i din indbakke.
        </p>
        <form onSubmit={handleNewsletterSignup} className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Indtast din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Tilmeld</button>
        </form>
      </div>

      <div className={styles.footerSection}>
        <h3>Kontakt</h3>
        <p>Redningen 32</p>
        <p>2210 Vinterby Øster</p>
        <p>+45 88229422</p>
        <p>dga@info.dk</p>
      </div>

      <div className={styles.footerSection}>
        <h3>FN's Verdensmål</h3>
        <p>
          Vi støtter på organisatorisk plan op om FN´s verdensmål og har derfor besluttet at en del
          af overskuddet går direkte til verdensmål nr. 13; Klimahandling.
        </p>
        <a href="https://www.fn.dk/verdensmaal" target="_blank" rel="noopener noreferrer">
          Læs mere om verdensmålene her
        </a>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <p>Du skal være logget ind for at tilmelde dig nyhedsbrevet.</p>
            <button onClick={() => setShowModal(false)}>Luk</button>
          </div>
        </div>
      )}
    </footer>
  );
};
