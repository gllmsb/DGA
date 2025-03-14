import { useState, useEffect, useContext } from "react";
import styles from "./AdForm.module.scss";
import { UserContext } from "../../context/UserContext";
import { IoIosArrowDown } from "react-icons/io";

export const AdForm = () => {
  const { user } = useContext(UserContext);
  
  console.log("User from Context:", user); 

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 

  useEffect(() => {
    fetch("http://localhost:4242/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token || !user || !user.id) {
      console.warn("User not logged in or missing ID:", user);
      setShowLoginModal(true); 
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:4242/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.title, 
          category_id: parseInt(formData.category), 
          description: formData.description,
          image: formData.imageUrl,
          price: formData.price,
          user_id: user.id, 
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Kunne ikke oprette annoncen");
      }

      setShowSuccessModal(true);
      setFormData({
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        price: "",
      });

      setTimeout(() => {
        setShowSuccessModal(false);
        window.location.href = "/profile";
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.adFormContainer}>
      <h2>Opret en annonce</h2>
      <form onSubmit={handleSubmit} className={styles.adForm}>
        {/* Title */}
        <label>Titel</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Titel for produkt..."
          required
        />

        {/* Category Dropdown */}
        <label>Kategori</label>
        <div className={styles.dropdownContainer}>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Hvilken kategori tilhører dit produkt...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <IoIosArrowDown className={styles.arrowIcon} />
        </div>

        {/* Description */}
        <label>Annonce Tekst</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Skriv en annonce tekst her der beskriver produktet"
          required
        />

        {/* Image URL */}
        <label>URL til billede</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
        />

        {/* Price */}
        <label>Pris</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Pris..."
          required
        />

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Opretter..." : "Opret"}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Annonce er oprettet!</p>
            <button onClick={() => setShowSuccessModal(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Du skal være logget ind for at oprette en annonce!</p>
            <button onClick={() => {
              setShowLoginModal(false);
              window.location.href = "/login"; 
            }}>
              Log ind
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
