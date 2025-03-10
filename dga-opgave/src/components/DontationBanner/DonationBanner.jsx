import styles from "./DonationBanner.module.scss";
import imgLeft from "../../assets/banners/banner_image2.jpg";
import imgRight from "../../assets/banners/banner_image3.jpg";

export const DonationBanner = ({ leftNumberColor, rightNumberColor }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerItem}>
        <img src={imgLeft} alt="Donationer til dato" />
        <div className={styles.overlay}>
          <div className={styles.textLeft}>
            <h2>Donationer til Dato</h2>
            <p>Sammen med dig har vi siden starten indsamlet:</p>
          </div>
          <span className={styles.number} style={{ color: leftNumberColor }}>
            452.231,50 kr
          </span>
          <p className={styles.textLeft}>Tak fordi du handler brugt, med omtanke for klimaet</p>
        </div>
      </div>

      <div className={styles.bannerItem}>
        <img src={imgRight} alt="Donationer i år" />
        <div className={styles.overlay}>
          <div className={styles.textLeft}>
            <h2>Donationer i år</h2>
            <p>Sammen med dig har vi i år indsamlet:</p>
          </div>
          <span className={styles.number} style={{ color: rightNumberColor }}>
            112.452,75 kr
          </span>
          <p className={styles.textLeft}>Tak fordi du handler brugt, med omtanke for jorden</p>
        </div>
      </div>
    </div>
  );
};
