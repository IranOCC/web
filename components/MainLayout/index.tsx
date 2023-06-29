"use client";

import { ReactNode, useContext, useEffect } from "react";
import { ThemeContext, ThemeContextType } from "@/context/theme.context";
import { LoadingContext, LoadingContextType } from "@/context/loading.context";
import { useRouter } from "next/navigation";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextType;
  const { hideLoading } = useContext(LoadingContext) as LoadingContextType;

  useEffect(() => {
    hideLoading();
  }, []);

  return (
    <body lang="fa" dir="rtl" className={"select-none selection:bg-yellow-200 selection:text-yellow-900 font-rubik print:hidden scroll-smooth" + (darkMode ? " dark" : "")}>
      {children}
      {/*  */}
    </body>
  );
};

export default MainLayout;
