import "../globals.css";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Suspense } from "react";
import Loading from "@/components/Loading";

import StoreProviders from "@/components/Providers/StoreProvider";
import AuthProvider from "@/components/Providers/AuthProvider";
import AntdProvider from "@/components/Providers/AntdProvider";
import AuthLayout from "@/components/@auth/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
  const title = "احراز هویت";
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
  const session = await getServerSession(authOptions);
  if (session) return redirect("/");

  return (
    <html lang="fa" className={IRANSansX.className} dir="rtl">
      <body className="selection:bg-blue-300 selection:text-blue-600 bg-blue-100">
        <Suspense fallback={<Loading />}>
          <AntdProvider style={{ fontFamily: IRANSansX.style }}>
            <AuthProvider>
              <StoreProviders>
                {/*  */}
                <AuthLayout>{children}</AuthLayout>
                {/*  */}
              </StoreProviders>
            </AuthProvider>
          </AntdProvider>
        </Suspense>
      </body>
    </html>
  );
}
