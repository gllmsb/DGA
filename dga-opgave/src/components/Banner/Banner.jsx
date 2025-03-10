import styles from "./Banner.module.scss";
import bannerImage from "../../assets/banners/banner_image.png";

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <img src={bannerImage} alt="Den Grønne Avis" className={styles.image} />
      <div className={styles.overlay}>
        <h1>Den Grønne Avis</h1>
        <p>Vi går forrest i kampen om klimaet ved at give 2 kr. til<br /> klima-venlige formål, hver gang du handler brugt på Den<br/> Grønne Avis.</p>
      </div>
    </div>
  );
};
