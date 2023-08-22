"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Empty } from "antd";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { WebBlogPost } from "@/types/interfaces";
import BlogPostCard from "./BlogPostCard";
import BlogSearchFilteringBox from "./BlogSearchFilteringBox";
import InfiniteScroll from "react-infinite-scroll-component";

const BlogList = ({ data }: { data?: { items?: WebBlogPost[]; total: number } }) => {
  const { blogPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    blogPage();
  }, []);

  const searchParams = useSearchParams();
  const api = useAxiosAuth();

  const [update, setUpdate] = useState(false);
  const [current, setCurrent] = useState([0]);
  const [dataList, setDataList] = useState<WebBlogPost[]>(data?.items || []);
  const [itemsCount, setItemsCount] = useState(data?.total || 0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/blog/post?size=10&current=${current[0]}${!!searchParams?.toString() ? `&${searchParams?.toString()}` : ""}`);
      const data = response.data as { items: WebBlogPost[]; total: number };
      if (current[0] === 1) {
        setDataList(data?.items || []);
        setItemsCount(data?.total || 0);
      } else {
        setDataList((d) => [...d, ...data.items]);
      }
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    setCurrent([1]);
  }, [searchParams, update]);

  const loadMoreData = () => {
    setCurrent((prev) => [prev[0] + 1]);
  };

  useEffect(() => {
    if (!!current[0]) getData();
  }, [current]);

  return (
    <>
      <div className="sticky top-0 z-20 bg-gray-200 py-4 font-bold md:bg-white">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
      <div className="flex w-full flex-col gap-2 self-center">
        <BlogSearchFilteringBox
          //
          dataLoading={dataLoading}
          setUpdate={setUpdate}
        />
        {/* list */}
        <div className="flex flex-col gap-4">
          {!dataLoading && !dataList?.length && <Empty description="چیزی پیدا نشد :(" />}
          <div>
            <InfiniteScroll
              //
              dataLength={dataList.length}
              next={loadMoreData}
              hasMore={dataList.length < itemsCount}
              loader={<LoadingWithoutBg />}
              scrollableTarget="mainScroll"
            >
              <div className="grid grid-cols-1 gap-4 min-[580px]:grid-cols-2 md:grid-cols-1">
                {dataList.map((post, idx) => {
                  return <BlogPostCard key={post._id} data={post} />;
                })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
