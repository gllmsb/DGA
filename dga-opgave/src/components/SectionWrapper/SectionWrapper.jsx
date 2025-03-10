import styles from "./SectionWrapper.module.scss";

export const SectionWrapper = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};
