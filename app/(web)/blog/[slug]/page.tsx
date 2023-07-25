import SingleBlogPost from "@/components/@web/Features/Blog/SingleBlogPost";
import { fetchSingleBlogPost } from "@/lib/ssr.fetch";

export default async function Page({ params }: any) {
  const data = await fetchSingleBlogPost(params.slug);
  return <SingleBlogPost data={data} />;
}
