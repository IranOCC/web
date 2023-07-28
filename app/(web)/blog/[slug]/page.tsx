import SingleBlogPost from "@/components/@web/Features/Blog/SingleBlogPost";
import { fetchSingleBlogPost } from "@/lib/ssr.fetch";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await fetchSingleBlogPost(params.slug);
  const { title, excerpt, tags, image } = data || {};
  return {
    title,
    description: excerpt,
    keywords: tags,
    openGraph: {
      images: image && { url: process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path },
    },
  };
}

export default async function Page({ params }: any) {
  const data = await fetchSingleBlogPost(params.slug);
  return <SingleBlogPost data={data} />;
}
