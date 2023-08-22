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

const BlogList = ({ data }: { data?: { items?: WebBlogPost[]; total: number } }) => {
  const { blogPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    blogPage();
  }, []);

  const [update, setUpdate] = useState([true]);

  const searchParams = useSearchParams();
  const api = useAxiosAuth();
  const [pageSuccess, setPageSuccess] = useState(0);
  const [current, setCurrent] = useState([0]);
  const [dataList, setDataList] = useState<WebBlogPost[]>(data?.items || []);
  const [itemsCount, setItemsCount] = useState(data?.total || 0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const isFirst = useRef(true);
  const getData = async () => {
    if (isFirst.current) {
      isFirst.current = false;
      return true;
    }
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
      setPageSuccess(current[0]);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    setCurrent([1]);
  }, [searchParams, update]);
  useEffect(() => {
    if (pageSuccess < current[0] && !dataLoading) getData();
  }, [current]);

  //
  const scrollLoadingRef = useRef<any>(null);
  const checkLoadMore = (e: any) => {
    const sh = e.target.scrollHeight;
    const oh = e.target.offsetHeight;
    const st = e.target.scrollTop;
    if (sh - oh - st < 20 && itemsCount > dataList.length) {
      setCurrent([pageSuccess + 1]);
    }
  };
  useEffect(() => {
    const _main_scroll = document.getElementById("main")?.firstChild;
    _main_scroll?.addEventListener("scroll", checkLoadMore);
    return () => _main_scroll?.removeEventListener("scroll", checkLoadMore);
  }, [dataList.length, dataLoading]);

  return (
    <>
      <div className="sticky top-0 z-10 bg-gray-200 py-4 font-bold md:bg-white">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
      <div className="flex w-full flex-col gap-2 self-center">
        <BlogSearchFilteringBox
          //
          dataLoading={dataLoading}
          setUpdate={setUpdate}
        />
        {/* list */}
        <div className="grid grid-cols-1 gap-4 min-[580px]:grid-cols-2 md:grid-cols-1">
          {!dataLoading && !dataList?.length && <Empty description="چیزی پیدا نشد :(" />}
          {dataList.map((post, idx) => {
            return <BlogPostCard key={post._id} data={post} />;
          })}
        </div>
        {itemsCount > dataList.length && (
          <div ref={scrollLoadingRef}>
            <LoadingWithoutBg />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
