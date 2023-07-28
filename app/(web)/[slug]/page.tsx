import SinglePage from "@/components/@web/Features/Page/SinglePage";
import { fetchSinglePage } from "@/lib/ssr.fetch";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await fetchSinglePage(params.slug);
  const { title, tags } = data;
  return {
    title,
    keywords: tags,
  };
}

export default async function Page({ params }: any) {
  const data = await fetchSinglePage(params.slug);
  return <SinglePage data={data} />;
}
