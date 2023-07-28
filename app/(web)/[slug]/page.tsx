import SingleBlogPost from "@/components/@web/Features/Blog/SingleBlogPost";
import { fetchSinglePage } from "@/lib/ssr.fetch";

export default async function Page({ params }: any) {
  const data = await fetchSinglePage(params.slug);
  // return <SingleBlogPost data={data} />;
}
