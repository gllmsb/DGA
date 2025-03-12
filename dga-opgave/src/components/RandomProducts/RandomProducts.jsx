import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RandomProducts.module.scss";

export const RandomProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4242/products")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const shuffled = [...data.data].sort(() => 0.5 - Math.random()); 
          setProducts(shuffled.slice(0, 6)); 
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className={styles.productSection}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.slug}`} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <div className={styles.overlay}>{product.name}</div> 
          </Link>
        ))}
      </div>
    </div>
  );
};
