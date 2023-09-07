"use client";

import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect, useState } from "react";
import { Card, CardBody, Chip, ScrollShadow } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { Empty, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { WebEstate } from "@/types/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingWithoutBg } from "@/components/Loading";
import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { AccessTime, Call, Check, Close, FavoriteBorderOutlined, Info, InfoOutlined, Pending, Visibility } from "@mui/icons-material";
import { ReservationModal } from "@/components/@web/Features/Estate/ReservationModal";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { toast } from "@/lib/toast";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  const searchParams = useSearchParams();

  const api = useAxiosAuth();
  const [update, setUpdate] = useState(false);
  const [current, setCurrent] = useState([0]);
  const [dataList, setDataList] = useState<WebEstate[]>([]);
  const [itemsCount, setItemsCount] = useState(1);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

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
    if (!!current[0]) getData();
  }, [current]);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:pb-4">
        <div className="sticky top-[-1px] z-20 flex w-full flex-col gap-2 self-start bg-gray-200 px-4 py-3 md:bg-white">
          <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
            املاک من
            {/*  */}
          </h1>
        </div>
        <div className="flex w-full flex-col gap-2 self-center px-4">
          {!!dataList?.length && (
            <ScrollShadow
              //
              hideScrollBar
              size={0}
              orientation="horizontal"
              className="sticky top-[55px] z-20 flex w-full gap-2 bg-gray-200 py-2 md:bg-white"
            >
              <Chip
                //
                startContent={<AccessTime />}
                endContent={<b>(5)</b>}
                variant="faded"
                color="warning"
                size="lg"
                classNames={{ content: "whitespace-nowrap" }}
              >
                در انتظار
              </Chip>
              <Chip
                //
                startContent={<Check />}
                endContent={<b>(5)</b>}
                variant="faded"
                color="success"
                size="lg"
                classNames={{ content: "whitespace-nowrap" }}
              >
                تایید شده
              </Chip>
              <Chip
                //
                startContent={<Close />}
                endContent={<b>(5)</b>}
                variant="faded"
                color="danger"
                size="lg"
                classNames={{ content: "whitespace-nowrap" }}
              >
                رد شده
              </Chip>
            </ScrollShadow>
          )}
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
                  {dataList.map((property, idx) => {
                    return (
                      <EstateCard
                        //
                        key={property._id}
                        data={property}
                        tools={(data) => <PropertyTools data={data} />}
                        // toolsClassName="!bg-success"
                        // toolsClassName="!bg-warning"
                        toolsClassName="!bg-danger"
                      />
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const PropertyTools = ({ data }: { data: WebEstate }) => {
  const router = useRouter();
  const { setShowLoginModal, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  return (
    <>
      <Tooltip title="مشاهده" placement="top" arrow={false}>
        <div
          //
          role="view"
          onClick={() => router.push(`/property/${data.slug}`)}
          className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-white"
        >
          <Visibility style={{ fontSize: 28 }} />
        </div>
      </Tooltip>
      <Tooltip title="جزئیات" placement="top" arrow={false}>
        <div
          //
          role="info"
          // onClick={() => router.push(`/property/${data.slug}`)}
          className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-white"
        >
          <InfoOutlined style={{ fontSize: 28 }} />
        </div>
      </Tooltip>
    </>
  );
};
