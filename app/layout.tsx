import { Suspense } from "react";

import { store } from "@/store";
import { setToken } from "@/store/auth";
import Preloader from "@/store/preloader";

import { cookies, headers } from "next/headers";
import Loading from "@/components/Layout/Loading";
import "antd/dist/reset.css";

import localFont from "next/font/local";
import Layout from "@/components/Layout";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "./globals.css";
import Providers from "@/store/provider";

config.autoAddCss = false;

const IRANSansX = localFont({
  src: [
    {
      path: "../assets/fonts/IRANSansX/IRANSansXThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXUltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXDemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX/IRANSansXBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

// dynamic metadata
export async function generateMetadata() {
  const { title, description, keywords } = await getWebInitialData();
  return {
    title: {
      default: title + " | " + description,
      template: title + " | %s",
    },
    description,
    keywords,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");
  store.dispatch(setToken(authToken?.value ?? "--"));
  const { title, time, token } = await getWebInitialData();

  return (
    <html lang="fa" className={IRANSansX.className}>
      <body>
        <Suspense fallback={<Loading label={title} />}>
          <Preloader token={authToken?.value ?? null} />
          <Providers>
            <Layout style={IRANSansX.style}>
              Pp {store.getState().auth.token}
              <br />
              {children}
            </Layout>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}

async function getWebInitialData() {
  const token = store.getState().auth.token;
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/setting/webInitialData", {});
  const data = await res.json();
  return { ...data, token };
}
