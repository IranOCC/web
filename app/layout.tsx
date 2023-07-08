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
import { CurrentUserProvider } from "@/context/currentUser.context";
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
    manifest: "/manifest.webmanifest",
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const webInfo = await fetchWebInfo();
  return (
    <AntdProvider style={{ fontFamily: IRANSansX.style }}>
      <AuthProvider>
        <WebInfoProvider initial={webInfo}>
          <ThemeProvider initial={{ dark: false }}>
            <LoadingProvider initial={{ loading: true }}>
              <CurrentUserProvider>
                <html className={IRANSansX.className}>
                  <MainLayout>
                    {children}
                    <Loading />
                    {/*  */}
                  </MainLayout>
                </html>
              </CurrentUserProvider>
            </LoadingProvider>
          </ThemeProvider>
        </WebInfoProvider>
      </AuthProvider>
    </AntdProvider>
  );
}

export function reportWebVitals(metric: any) {
  console.log(metric);
}
