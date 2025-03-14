import { useParams, useLocation } from "react-router-dom";
import styles from "./ProductDetailPage.module.scss";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { HorizontalLine } from "../components/HorizoantalLine/HorizontalLine";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { CommentSection } from "../components/CommentSecrion/CommentSection";


export const ProductDetailPage = () => {
  const { productSlug } = useParams(); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get("category");

  // console.log("ProductDetailPage - Product Slug:", productSlug);
  // console.log("ProductDetailPage - Category Slug:", categorySlug);

  return (
  <>
    <HorizontalLine />
    <div className={styles.productDetailPage}>
      <Sidebar activeCategory={categorySlug} />
      <ProductDetails productSlug={productSlug} />
    </div>
    <HorizontalLine />
    <SectionWrapper>
      <CommentSection productSlug={productSlug} />
    </SectionWrapper>
  </>
  );
};
