import styles from "./CategoryPage.module.scss";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { CategoryList } from "../components/CategoryList/CategoryList";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper"; 
import { HorizontalLine } from "../components/HorizoantalLine/HorizontalLine";

export const CategoryPage = () => {
  return (
    <>
    <HorizontalLine />
    <div className={styles.categoryPage}> 
      <Sidebar />

      <SectionWrapper>
        <CategoryList />
      </SectionWrapper>
    </div>
    </>
  );
};
