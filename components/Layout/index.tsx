// "use client";

import styles from "./style.module.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

const Layout = ({ style, children }: any) => {
  return (
    <main>
      {/* <Toolbar {...{ style }} /> */}
      <section className={styles.main_content}>{children}</section>
      {/* <Footer {...{ style }} /> */}
    </main>
  );
};

export default Layout;
