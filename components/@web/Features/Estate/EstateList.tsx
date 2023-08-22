"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Empty } from "antd";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { WebEstate } from "@/types/interfaces";
import EstateCard from "./EstateCard";
import EstateSearchFilteringBox from "./EstateSearchFilteringBox";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Skeleton } from "antd";

const EstateList = ({ data }: { data: { items?: WebEstate[]; total: number } }) => {
  const { searchPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    searchPage();
  }, []);

  const searchParams = useSearchParams();

  const [update, setUpdate] = useState(false);

  const api = useAxiosAuth();
  // const [pageSuccess, setPageSuccess] = useState(0);
  const [current, setCurrent] = useState([0]);
  const [dataList, setDataList] = useState<WebEstate[]>(data?.items || []);
  const [itemsCount, setItemsCount] = useState(data.total);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  // const isFirst = useRef(true);
  // const getData = async () => {
  //   // if (isFirst.current) {
  //   //   isFirst.current = false;
  //   //   return true;
  //   // }
  //   setDataLoading(true);
  //   try {
  //     const response = await api.get(`/estate?size=10&current=${current[0]}${!!searchParams?.toString() ? `&${searchParams?.toString()}` : ""}`);
  //     const data = response.data as { items: WebEstate[]; total: number };
  //     if (current[0] === 1) {
  //       setDataList(data?.items || []);
  //       setItemsCount(data?.total || 0);
  //     } else {
  //       setDataList((d) => [...d, ...data.items]);
  //     }
  //     setDataLoading(false);
  //     setPageSuccess(current[0]);
  //   } catch (error) {
  //     setDataLoading(false);
  //   }
  // };

  //
  // const scrollLoadingRef = useRef<any>(null);
  // const checkLoadMore = (e: any) => {
  //   const sh = e.target.scrollHeight;
  //   const oh = e.target.offsetHeight;
  //   const st = e.target.scrollTop;
  //   if (sh - oh - st < 20 && !dataLoading && itemsCount > dataList.length && pageSuccess === current[0]) {
  //     setCurrent([pageSuccess + 1]);
  //   }
  // };
  // useEffect(() => {
  //   const _main_scroll = document.getElementById("main")?.firstChild;
  //   _main_scroll?.addEventListener("scroll", checkLoadMore);
  //   return () => _main_scroll?.removeEventListener("scroll", checkLoadMore);
  // }, [dataList.length, dataLoading, itemsCount, pageSuccess]);

  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/estate?size=10&current=${current[0]}${!!searchParams?.toString() ? `&${searchParams?.toString()}` : ""}`);
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
  }, [searchParams, update]);

  const loadMoreData = () => {
    setCurrent((prev) => [prev[0] + 1]);
  };

  useEffect(() => {
    console.log("current", current);
  }, [current]);

  return (
    <>
      <div className="sticky top-0 z-10 bg-gray-200 py-4 font-bold md:bg-white">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
      <div className="flex w-full flex-col gap-2 self-center">
        <EstateSearchFilteringBox
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
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="mainScroll"
            >
              <div className="grid grid-cols-1 gap-4 min-[580px]:grid-cols-2 md:grid-cols-1">
                {dataList.map((post, idx) => {
                  return <EstateCard key={post._id} data={post} />;
                })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstateList;
