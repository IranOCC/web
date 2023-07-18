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
  return children;
  return (
    <>
      <div
        //
        style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
        className="flex h-full flex-col items-center justify-center bg-gray-300/50 bg-[image:var(--image-url)] bg-cover bg-no-repeat"
      >
        {/*  */}
        <Link href="/admin" className="text-blue-500">
          ورود به پنل مدیریت
        </Link>
      </div>
    </>
  );
}
