"use client";

import styles from "./style.module.css";
import Logo from "../Logo";
import Search from "./Search";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import ThemeProvider from "@/components/ConfigProvider";
import MainMenu from "./MainMenu";
import UserCenter from "./UserCenter";
const { Header, Content, Footer } = Layout;

const Toolbar = ({ style }: any) => {
  return (
    <ThemeProvider {...{ style }}>
      <div>Toolbar</div>
      {/* <Layout className={styles.header_layout}>
        <Header className={styles.main_header}>
          <Logo />
          <Search />
          <MainMenu />
          <UserCenter />
        </Header>
      </Layout> */}
    </ThemeProvider>
  );
};

export default Toolbar;
