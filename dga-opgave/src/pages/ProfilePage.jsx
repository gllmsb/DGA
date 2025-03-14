
import { useState} from "react";

import styles from "./ProfilePage.module.scss";
import { ProfileTabs } from "../components/ProfileTabs/ProfileTabs";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className={styles.profilePage}>
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "profile" ? <ProfileDetails /> : <p>Mine annoncer kommer her...</p>}

    </div>
  );
};
