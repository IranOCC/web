"use client";

import styles from "./style.module.css";
import FooterBox from "@/components/Layout/FooterBox";
import Toolbar from "@/components/Layout/Toolbar";

const Layout = ({ style, children }: any) => {
  return (
    <section id="main">
      <Toolbar {...{ style }} />
      <section className={styles.main_content}>{children}</section>
      <FooterBox {...{ style }} />
    </section>
  );
};

export default Layout;
