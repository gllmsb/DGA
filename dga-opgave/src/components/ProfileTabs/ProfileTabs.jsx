import styles from "./ProfileTabs.module.scss";

export const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabsContainer}>
      <button
        className={`${styles.tab} ${activeTab === "profile" ? styles.active : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        Min Profil
      </button>

      <button
        className={`${styles.tab} ${activeTab === "ads" ? styles.active : ""}`}
        onClick={() => setActiveTab("ads")}
      >
        Mine Annoncer
      </button>
    </div>
  );
};
