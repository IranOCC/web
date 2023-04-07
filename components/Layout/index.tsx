// "use client";

import styles from "./style.module.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { ReactNode, useState } from "react";
import { Session } from "next-auth";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-full flex flex-col bg-slate-100">
      {/* @ts-expect-error Server Component */}
      <Header />
      <main className="grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
