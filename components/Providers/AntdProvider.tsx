"use client";

import { ConfigProvider, Layout } from "antd";
import { ReactNode } from "react";

const AntdProvider = ({ children, style }: { children: ReactNode; style: {} }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(255 230 0)",
          ...style,
        },
      }}
      direction="rtl"
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
