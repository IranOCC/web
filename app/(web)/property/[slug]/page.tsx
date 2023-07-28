import { Metadata } from "next";
import SingleEstate from "@/components/@web/Features/Estate/SingleEstate";
import { fetchSingleEstate } from "@/lib/ssr.fetch";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await fetchSingleEstate(params.slug);
  const { title, excerpt, tags, image, gallery } = data;
  return {
    title,
    description: excerpt,
    keywords: tags,
    openGraph: {
      images: [...(gallery || [])].map(({ path, alt }) => ({ url: process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + path })),
    },
  };
}

export default async function Page({ params }: any) {
  const data = await fetchSingleEstate(params.slug);
  return <SingleEstate data={data} />;
}
