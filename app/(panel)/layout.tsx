import "../globals.css";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Suspense } from "react";
import Loading from "@/components/Loading";

import StoreProviders from "@/components/Providers/StoreProvider";
import AuthProvider from "@/components/Providers/AuthProvider";
import PanelLayout from "@/components/@panel/Layout";

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
  };
}

interface IProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  return (
    <html lang="fa" className={IRANSansX.className + " h-full"} dir="rtl">
      <body className="h-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            <StoreProviders>
              {/*  */}
              <PanelLayout>{children}</PanelLayout>
              {/*  */}
            </StoreProviders>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
