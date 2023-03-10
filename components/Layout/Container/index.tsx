"use client";

import styles from "./style.module.css";

const Container = ({ children }: any) => {
  return <section className={styles.container}>{children}</section>;
};

export default Container;
