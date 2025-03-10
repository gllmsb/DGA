import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RandomCategories.module.scss";

export const RandomCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4242/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const shuffled = [...data.data].sort(() => 0.5 - Math.random()); 
          setCategories(shuffled.slice(0, 6)); 
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <div className={styles.categoryNameContainer}>
              <Link to={`/category/${category.slug}`} className={styles.categoryName}>
                {category.name}
              </Link>
            </div>
            <div className={styles.imageContainer}>
              <img src={category.category_image} alt={category.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
