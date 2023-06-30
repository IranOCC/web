import Layout from "@/components/@web/Layout";
import { WebInfo } from "@/types/interfaces";
import { fetchWebInfo } from "@/lib/ssr.fetch";
import Link from "next/link";

// dynamic metadata
export async function generateMetadata() {
  const settings = await fetchWebInfo();
  const { title, description, keywords } = settings;
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
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        {/*  */}
        <Link href="/admin" className="text-blue-500">
          ورود به پنل مدیریت
        </Link>
        {/*
        <Link href="/auth" className="text-blue-500">
          لاگین یا عضویت
        </Link>
        */}
      </div>
    </>
  );
  // return <Layout>{children}</Layout>;
}
