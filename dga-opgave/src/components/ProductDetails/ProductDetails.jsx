import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";

export const ProductDetails = ({ productSlug }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productSlug) {
      setError("Produkt slug mangler!");
      setLoading(false);
      return;
    }

    const apiUrl = `http://localhost:4242/products/${productSlug}`;
    console.log("Fetching product from:", apiUrl);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data && data.data) {
          setProduct(data.data);
        } else {
          setError("Produktet blev ikke fundet.");
        }
      })
      .catch((err) => {
        console.error("Fejl ved hentning af produkt:", err);
        setError("Kunne ikke hente produktet.");
      })
      .finally(() => setLoading(false));
  }, [productSlug]);

  if (loading) {
    return <p>Indlæser produkt...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Ingen produktdata tilgængelig.</p>;
  }

  return (
    <div className={styles.productContainer}>
      <img className={styles.productImage} src={product.image || "fallback-image.jpg"} alt={product.name || "Produkt"} />
      <div className={styles.productInfo}>
        <h2>{product.name || "Ingen navn"}</h2>
        <p className={styles.description}>{product.description || "Ingen beskrivelse"}</p>
        <p className={styles.price}>Pris: {product.price ? `${product.price} kr.` : "Ukendt pris"}</p>
      </div>
    </div>
  );
};
