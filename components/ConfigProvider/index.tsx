import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { ReactNode } from "react";
const { Header, Content, Footer } = Layout;

const ThemeProvider = ({ children, style }: { children: ReactNode; style: {} }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFC700",
          ...style,
        },
      }}
      direction="rtl"
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
