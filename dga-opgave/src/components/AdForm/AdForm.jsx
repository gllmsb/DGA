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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let newErrors = {};

    if (formData.title.trim() === "") {
      newErrors.title = "Titel er påkrævet!";
    }

    if (formData.category === "") {
      newErrors.category = "Vælg en kategori!";
    }

    if (formData.description.trim() === "") {
      newErrors.description = "Beskrivelse er påkrævet!";
    }

    if (formData.price.trim() === "" || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Indtast en gyldig pris!";
    }

    if (formData.imageUrl.trim() !== "") {
      const urlRegex = /\.(jpg|jpeg|png|webp|gif)$/i;
      if (!urlRegex.test(formData.imageUrl)) {
        newErrors.imageUrl = "Indtast en gyldig billed-URL (jpg, png, webp, gif)!";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!user || !token) {
      alert("Du skal være logget ind for at oprette en annonce.");
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
          title: formData.title,
          category_id: formData.category, 
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
        {errors.title && <p className={styles.error}>{errors.title}</p>}

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
        {errors.category && <p className={styles.error}>{errors.category}</p>}

        {/* Description */}
        <label>Annonce Tekst</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Skriv en annonce tekst her der beskriver produktet"
          required
        />
        {errors.description && <p className={styles.error}>{errors.description}</p>}

        {/* Image URL */}
        <label>URL til billede</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
        />
        {errors.imageUrl && <p className={styles.error}>{errors.imageUrl}</p>}

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
        {errors.price && <p className={styles.error}>{errors.price}</p>}

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
    </div>
  );
};
