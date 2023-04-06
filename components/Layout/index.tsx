// "use client";

import styles from "./style.module.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { useState } from "react";

const Layout = ({ style, children }: any) => {
  return (
    <div className="min-h-full flex flex-col bg-slate-100">
      <Header />
      <main className="grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
