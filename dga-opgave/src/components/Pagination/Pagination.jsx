import styles from "./Pagination.module.scss";

export const Pagination = ({ currentPage, totalProducts, productsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Forrige</button>
      )}

      <span>{currentPage}/{totalPages}</span>

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Næste</button>
      )}
    </div>
  );
};
