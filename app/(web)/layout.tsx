import "../globals.css";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Suspense } from "react";
import Loading from "@/components/Loading";

import StoreProviders from "@/components/Providers/StoreProvider";
import AuthProvider from "@/components/Providers/AuthProvider";

import Layout from "@/components/Layout";

import { store } from "@/store";
import Preloader from "@/components/Providers/Preloader";
import { setSettings } from "@/store/settings";
import { Settings } from "@/types/interfaces";
import AntdProvider from "@/components/Providers/AntdProvider";

config.autoAddCss = false;

const IRANSansX = localFont({
  src: [
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXUltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXDemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANSansX/IRANSansXBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

// dynamic metadata
export async function generateMetadata() {
  const settings = await getWebInitialData();
  const { title, description, keywords } = settings;
  return {
    title: {
      default: title + " | " + description,
      template: title + " | %s",
    },
    description,
    keywords,
    viewport: {
      width: "device-width",
      initialScale: 1,
      minimumScale: 1,
      maximumScale: 1,
    },
  };
}

interface IProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  const settings = await getWebInitialData();
  store.dispatch(setSettings(settings));

  return (
    <html lang="fa" className={IRANSansX.className + " h-full"} dir="rtl">
      <body className="h-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
        <Suspense fallback={<Loading label={settings.title} />}>
          <AntdProvider style={{ fontFamily: IRANSansX.style }}>
            <Preloader settings={settings} />
            <AuthProvider>
              <StoreProviders>
                {/*  */}
                <Layout>{children}</Layout>
                {/*  */}
              </StoreProviders>
            </AuthProvider>
          </AntdProvider>
        </Suspense>
      </body>
    </html>
  );
}

async function getWebInitialData() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/setting/webInitialData");
  const data = await res.json();
  return data as Settings;
}
