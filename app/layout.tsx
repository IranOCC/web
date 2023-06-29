import "./globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { IRANSansX } from "@/lib/font";

import MainLayout from "@/components/MainLayout";
import Loading from "@/components/Loading";

import { ThemeProvider } from "@/context/theme.context";
import { WebInfoProvider } from "@/context/webInfo.context";
import { LoadingProvider } from "@/context/loading.context";
import AntdProvider from "@/components/Providers/AntdProvider";
import AuthProvider from "@/components/Providers/AuthProvider";

import { fetchWebInfo } from "@/lib/ssr.fetch";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "املاک اکازیون",
      template: "%s",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      minimumScale: 1,
      maximumScale: 1,
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const webInfo = await fetchWebInfo();
  return (
    <ThemeProvider initial={{ dark: false }}>
      <WebInfoProvider initial={webInfo}>
        <LoadingProvider initial={{ loading: true }}>
          <AntdProvider style={{ fontFamily: IRANSansX.style }}>
            <AuthProvider>
              <html className={IRANSansX.className}>
                <MainLayout>
                  {children}
                  <Loading />
                  {/*  */}
                </MainLayout>
              </html>
            </AuthProvider>
          </AntdProvider>
        </LoadingProvider>
      </WebInfoProvider>
    </ThemeProvider>
  );
}
