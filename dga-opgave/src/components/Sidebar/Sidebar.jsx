import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:4242/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li
          className={!categorySlug || categorySlug === "all" ? styles.active : ""}
          onClick={() => navigate("/category/all")} 
        >
          <span>Alle Kategorier</span>
        </li>

        {categories.map((category) => (
          <li key={category.id} className={category.slug === categorySlug ? styles.active : ""}>
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
