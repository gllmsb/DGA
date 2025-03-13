import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export const ProfilePage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div>
      <h2>Min Profil</h2>
      <p>Velkommen, {user?.firstname} {user?.lastname}!</p>
      <p>Email: {user?.email}</p>

      <button className={StyleSheet.logoutBtn} onClick={handleLogout}>Log ud</button>
    </div>
  );
};
