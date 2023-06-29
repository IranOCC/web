import "../globals.css";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Suspense } from "react";
import Loading from "@/components/Loading";

import AuthProvider from "@/components/Providers/AuthProvider";
import PanelLayout from "@/components/@panel/Layout";
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
  const title = "پنل مدیریت";
  return {
    title: {
      default: title,
      template: title + " | %s",
    },
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
  return (
    <html lang="fa" className={IRANSansX.className} dir="rtl">
      <body className="selection:bg-fuchsia-300 selection:text-fuchsia-900 bg-slate-100">
        <Suspense fallback={<Loading />}>
          <AntdProvider style={{ fontFamily: IRANSansX.style }}>
            <AuthProvider>
              {/*  */}
              <PanelLayout>{children}</PanelLayout>
              {/*  */}
            </AuthProvider>
          </AntdProvider>
        </Suspense>
      </body>
    </html>
  );
}
