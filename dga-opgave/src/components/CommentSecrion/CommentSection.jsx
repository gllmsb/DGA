import { useState } from "react";
import styles from "./CommentSection.module.scss";

export const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = false; 

  const handleSendComment = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    console.log("Kommentar sendt:", comment);
  };

  return (
    <div className={styles.commentSection}>
      <h3>Kontakt sælger</h3>

      <div className={styles.commentBox}>
        <textarea
          placeholder="Skriv en besked til sælger..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p>Du skal være logget ind for at skrive en kommentar.</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};
