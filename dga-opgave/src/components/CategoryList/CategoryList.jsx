import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./CategoryList.module.scss";
import { Pagination } from "../Pagination/Pagination";

export const CategoryList = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const url =
      !categorySlug || categorySlug === "all"
        ? "http://localhost:4242/products" 
        : `http://localhost:4242/products/category/${categorySlug}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setProducts(data.data);
          setCurrentPage(1);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [categorySlug]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className={styles.categorySection}>
      <div className={styles.productGrid}>
        {currentProducts.map((product) => (
          <Link 
          key={product.id} 
          to={`/product/${product.slug}?category=${categorySlug}`} 
          className={styles.productCard}
        >
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
        </Link>        
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
