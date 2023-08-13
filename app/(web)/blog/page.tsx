import BlogList from "@/components/@web/Features/Blog/BlogList";
import { fetchBlogList } from "@/lib/ssr.fetch";

type Props = {
  searchParams?: URLSearchParams;
};

export default async function Page(params: Props) {
  const data = await fetchBlogList(new URLSearchParams(params.searchParams));
  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-4">
        <BlogList data={data} />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
