import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io"; 
import styles from "./CategoryDropdown.module.scss"; 

export const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4242/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Kunne ikke indlæse kategorier");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownBtn}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        Vælg Kategori <IoIosArrowDown className={styles.arrowIcon} />
      </button>

      {isDropdownOpen && (
        <ul className={styles.dropdownMenu}>
          {loading ? (
            <li>Indlæser...</li>
          ) : error ? (
            <li>{error}</li>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id}>
                <Link to={`/category/${category.slug}`} onClick={() => setDropdownOpen(false)}>
                  {category.name}
                </Link>
              </li>
            ))
          ) : (
            <li>Ingen kategorier</li>
          )}
        </ul>
      )}
    </div>
  );
};
