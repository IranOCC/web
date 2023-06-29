import Layout from "@/components/@web/Layout";
import { WebInfo } from "@/types/interfaces";
import { fetchWebInfo } from "@/lib/ssr.fetch";

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
  return <Layout>{children}</Layout>;
}
