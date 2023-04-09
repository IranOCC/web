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
      <main className="grow min-h-[300px] mt-16">
        <div className="w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
