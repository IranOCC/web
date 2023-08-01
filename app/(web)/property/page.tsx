"use client";

import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { WebInput } from "@/components/@web/Input";
import { WebSelect } from "@/components/@web/Select";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SearchEstateFormData, SendSmsBoxFormData } from "@/types/formsData";
import { WebEstate } from "@/types/interfaces";
import { Search } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export default function Page() {
  const { searchPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    searchPage();
  }, []);

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
  } = useForm<SearchEstateFormData>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const onSubmit = async (data: SearchEstateFormData) => {
    try {
      const $s = new URLSearchParams(searchParams?.toString());
      if (data.search) $s.set("search", data.search);
      else $s.delete("search");
      // if (data.category) $s.set("filter", [data.search]);
      // else $s.delete("search");
      // $s.set("filter[category]", "های");
      router.push(pathname + "?" + $s.toString());
    } catch (error) {
      //
    }
  };

  const api = useAxiosAuth();
  const [current, setCurrent] = useState([1]);
  const [dataList, setDataList] = useState<WebEstate[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/estate?${searchParams?.toString()}&size=10&current=${current[0]}`);
      const data = response.data as { items: WebEstate[]; total: number };
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
  }, [searchParams]);
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
    if (sh === oh + st && !dataLoading && itemsCount > dataList.length) {
      console.log("==>>>");
      setCurrent((prev) => [prev[0] + 1]);
    }
  };
  useEffect(() => {
    const _main_scroll = document.getElementById("main")?.firstChild;
    // scrollHeight === offsetHeight
    // on scroll
    _main_scroll?.addEventListener("scroll", checkLoadMore);
    return () => _main_scroll?.removeEventListener("scroll", checkLoadMore);
  }, [dataList.length, dataLoading]);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col gap-2 bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-8">
        {/*  */}
        <div className="py-4 font-bold">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
        <div className=" flex w-full flex-col gap-4 self-center">
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 min-[350px]:grid-cols-2 md:grid-cols-3 ">
              <WebInput
                //
                name="search"
                control={control}
                placeholder="کلمه کلیدی خود را تایپ کنید ..."
                submitIcon={
                  <i className={"block h-6 w-6 text-gray-400" + (dataLoading ? " animate-spin" : "")}>
                    {/*  */}
                    {dataLoading ? <LoadingIcon /> : <Search />}
                  </i>
                }
                containerClassName="col-span-full"
                onKeyDown={(e: any) => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    handleSubmit(onSubmit)();
                    timeoutRef.current = null;
                  }, 1000);
                }}
                defaultValue={searchParams?.get("search") || undefined}
                type="search"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
            </div>
          </form>

          {/* list */}
          <div className="grid grid-cols-1 gap-4 min-[580px]:grid-cols-2 md:grid-cols-1">
            {dataList.map((estate, idx) => {
              return <EstateCard key={estate._id} data={estate} />;
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
