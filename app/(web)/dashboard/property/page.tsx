"use client";

import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, Chip, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { Empty, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { WebEstate } from "@/types/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingWithoutBg } from "@/components/Loading";
import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { AccessTime, ArrowForwardIos, Call, Check, Close, FavoriteBorderOutlined, Info, InfoOutlined, Pending, SelectAll, Visibility } from "@mui/icons-material";
import { ReservationModal } from "@/components/@web/Features/Estate/ReservationModal";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { toast } from "@/lib/toast";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Alert, AlertTitle } from "@mui/material";
import moment from "jalali-moment";

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
      const response = await api.get(`/estate/myEstates?size=10&current=${current[0]}${!!searchParams?.toString() ? `&${searchParams?.toString()}` : ""}`);
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

  const router = useRouter();

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:pb-4">
        <div className="sticky top-[-1px] z-20 flex w-full flex-row gap-2 self-start bg-gray-200 px-4 py-3 md:bg-white">
          <Button
            //
            isIconOnly
            size="sm"
            onPress={() => router.back()}
            className="text-white"
            radius="md"
            color="secondary"
          >
            <ArrowForwardIos />
          </Button>
          <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
            املاک من
            {/*  */}
          </h1>
        </div>
        <div className="flex w-full flex-col gap-2 self-center px-4">
          {!!dataList?.length && (
            <Tabs
              //
              // selectedKey={period}
              // onSelectionChange={setPeriod}
              color="secondary"
              radius="full"
              size="lg"
            >
              <Tab
                key="all"
                title={
                  <div className="flex items-center gap-2">
                    <SelectAll />
                    <span>همه</span>
                    {/* <b>(0)</b> */}
                  </div>
                }
              />
              <Tab
                key="pending"
                title={
                  <div className="flex items-center gap-2">
                    <AccessTime />
                    <span>در انتظار</span>
                    {/* <b>(0)</b> */}
                  </div>
                }
              />
              <Tab
                key="confirmed"
                title={
                  <div className="flex items-center gap-2">
                    <Check />
                    <span>تایید شده</span>
                    {/* <b>(0)</b> */}
                  </div>
                }
              />
              <Tab
                key="rejected"
                title={
                  <div className="flex items-center gap-2">
                    <Close />
                    <span>رد شده</span>
                    {/* <b>(0)</b> */}
                  </div>
                }
              />
            </Tabs>
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
                    let tlClass = "!bg-warning";
                    if (!!property?.isConfirmed) tlClass = "!bg-success";
                    if (!!property?.isRejected) tlClass = "!bg-danger";
                    return (
                      <EstateCard
                        //
                        key={property._id}
                        data={property}
                        tools={(data) => <PropertyTools data={data} />}
                        toolsClassName={tlClass}
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

  const [openDetailModal, setOpenDetailModal] = useState(false);
  return (
    <>
      <Tooltip title="جزئیات" placement="top" arrow={false}>
        <div
          //
          role="info"
          onClick={() => setOpenDetailModal(true)}
          className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-white"
        >
          <InfoOutlined style={{ fontSize: 28 }} />
        </div>
      </Tooltip>
      <Modal
        //
        backdrop="blur"
        isOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        className="z-[102]"
        placement="center"
        classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
        title="جزئیات ملک من"
      >
        <ModalContent>
          <ModalHeader>جزئیات ملک من</ModalHeader>
          <ModalBody>
            {/*  */}
            <div className="flex flex-col">
              <div className="">
                <b>زمان ثبت: </b>
                <span>{moment(data.createdAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>
              </div>
              {data.isRejected && (
                <Alert color="error">
                  <AlertTitle>رد شده</AlertTitle>
                  <div className="">
                    <b>زمان رد: </b>
                    <span>{moment(data.rejectedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>
                  </div>
                  <div className="">
                    <b>دلیل رد: </b>
                    <span>{data.rejectedReason}</span>
                  </div>
                </Alert>
              )}
              {data.isConfirmed && (
                <Alert color="success">
                  <AlertTitle>تایید شده</AlertTitle>
                  <div className="">
                    <b>زمان تایید: </b>
                    <span>{moment(data.confirmedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>
                  </div>
                </Alert>
              )}
              {!data.isConfirmed && !data.isRejected && (
                <Alert color="error">
                  <AlertTitle>در انتظار تایید</AlertTitle>
                  <div className="">این آگهی هنوز در انتظار تایید یا رد توسط کارشناسان ما می باشد</div>
                </Alert>
              )}
            </div>
            {/*  */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpenDetailModal(false)}>باشه!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
