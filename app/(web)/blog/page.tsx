"use client";

import BlogPostCard from "@/components/@web/Features/Blog/BlogPostCard";
import { WebInput } from "@/components/@web/Input";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SearchBlogFormData } from "@/types/formsData";
import { WebBlogPost } from "@/types/interfaces";
import { Search } from "@mui/icons-material";
import { Empty } from "antd";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export default function Page() {
  const { blogPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    blogPage();
  }, []);

  const form = useForm<SearchBlogFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const onSubmit = async (data: SearchBlogFormData) => {
    const $s = new URLSearchParams(searchParams?.toString());
    if (data.search) $s.set("search", data.search);
    else $s.delete("search");
    router.push(pathname + "?" + $s.toString());
    setUpdate([true]);
  };

  const [update, setUpdate] = useState([true]);

  const api = useAxiosAuth();
  const [current, setCurrent] = useState([1]);
  const [dataList, setDataList] = useState<WebBlogPost[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/blog/post?size=10&current=${current[0]}${searchParams?.toString() && "&" + searchParams?.toString()}`);
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
  }, [update]);
  useEffect(() => {
    getData();
  }, [current]);
  const timeoutRef = useRef<Timeout | null>(null);

  //
  const scrollLoadingRef = useRef<any>(null);
  const checkLoadMore = (e: any) => {
    console.log(e);
    const sh = e.target.scrollHeight;
    const oh = e.target.offsetHeight;
    const st = e.target.scrollTop;
    console.log(sh, oh, st);
    if (sh - oh - st < 20 && !dataLoading && itemsCount > dataList.length) {
      console.log("==>>>");
      setCurrent((prev) => [prev[0] + 1]);
    }
  };
  useEffect(() => {
    const _main_scroll = document.getElementById("main")?.firstChild;
    _main_scroll?.addEventListener("scroll", checkLoadMore);
    return () => _main_scroll?.removeEventListener("scroll", checkLoadMore);
  }, [dataList.length, dataLoading]);

  useEffect(() => {
    const $s = new URLSearchParams(searchParams?.toString());
    // =====
    setValue("search", $s.get("search") || undefined);
  }, []);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-4">
        {/*  */}
        <div className="sticky top-0 z-10 bg-gray-200 py-4 font-bold md:bg-white">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
        <div className=" flex w-full flex-col gap-2 self-center">
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)} className="sticky top-14 z-10 bg-gray-200 md:bg-white">
            <div className="grid grid-cols-1 gap-2">
              <WebInput
                //
                name="search"
                control={control}
                placeholder="کلمه کلیدی خود را تایپ کنید ..."
                submitIcon={
                  <i className={"block h-6 w-6 text-gray-400" + (dataLoading ? " animate-spin" : "")} onClick={() => handleSubmit(onSubmit)()}>
                    {/*  */}
                    {dataLoading ? <LoadingIcon /> : <Search />}
                  </i>
                }
                onKeyDown={(e: any) => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    handleSubmit(onSubmit)();
                    timeoutRef.current = null;
                  }, 1000);
                }}
                loading={dataLoading}
                defaultValue={searchParams?.get("search") || undefined}
                type="search"
                noSpace
              />
              <div />
            </div>
          </form>

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
      </div>
    </>
  );
}
