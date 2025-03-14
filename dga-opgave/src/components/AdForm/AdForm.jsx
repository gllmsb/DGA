import { useState, useEffect, useContext } from "react";
import styles from "./AdForm.module.scss";
import { UserContext } from "../../context/UserContext";
import { IoIosArrowDown } from "react-icons/io";

export const AdForm = () => {
  const { user } = useContext(UserContext);
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
    if (!user) {
      alert("Du skal være logget ind for at oprette en annonce.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:4242/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          imageUrl: formData.imageUrl,
          price: formData.price,
          userId: user.id, 
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
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <IoIosArrowDown className={styles.arrowIcon} />
        </div>

        <label>Annonce Tekst</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Skriv en annonce tekst her der beskriver produktet"
          required
        />

        <label>URL til billede</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
        />

        <label>Pris</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Pris..."
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Opretter..." : "Opret"}
        </button>
      </form>

      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Annonce er oprettet!</p>
            <button onClick={() => setShowSuccessModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};
