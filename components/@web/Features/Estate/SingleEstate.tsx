"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Phone, StorageFile, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { useContext, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Tab from "@/components/Tab";
import { Verified, Favorite, ReportGmailerrorredOutlined, ShareOutlined, VerifiedTwoTone } from "@mui/icons-material";
import { Tooltip } from "antd";
import MapEstate from "./MapEstate";

const SingleEstate = ({ data }: { data: WebEstate }) => {
  const { _id, title, slug, content, excerpt, tags, category, image, gallery, pinned, office, createdBy, publishedAt, owner, code, province, city, district } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singleEstate(_id, title, category, code || "-", [province, city, district].join(" - "));
  }, []);

  const tabEq = (
    <div className="flex flex-col">
      <h6 className="font-bold">
        نوع: {/*  */}
        <span className="font-normal">فلت</span>
      </h6>
      <h6 className="font-bold">
        سند: {/*  */}
        <span className="font-normal">مشاع</span>
      </h6>
      <h6 className="font-bold">
        امکانات: {/*  */}
        <br />
        <ul className="flex flex-row gap-3 font-normal">
          <li>آسانسور</li>
          <li>آسانسور</li>
        </ul>
      </h6>
    </div>
  );
  const tabDe = <div className="" dangerouslySetInnerHTML={{ __html: content || "توضیحاتی درج نشده است" }} />;
  const tabNe = <MapEstate id={_id} />;

  return (
    <div className="bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4 md:pt-4">
      {!!gallery?.length && <ImageGallery items={gallery} />}
      <Tab
        data={[
          {
            title: "ویژگی ها",
            content: tabEq,
          },
          {
            title: "توضیحات",
            content: tabDe,
          },
          {
            title: "اماکن نزدیک",
            content: tabNe,
            clx: { button: "block xl:hidden", panel: "block xl:hidden" },
          },
        ]}
        clx={{
          //
          container: "py-3 !px-0",
          buttonList: "justify-between md:justify-center",
          button: "!w-full md:!w-auto px-4 !text-black !font-extrabold border-none",
          activeButton: "!font-extrabold rounded-t-xl !bg-white !text-black md:underline underline-offset-8 decoration-secondary decoration-2",
          notActiveButton: "!bg-transparent",
          panelList: "bg-white md:bg-transparent !mt-0 md:!mt-2 overflow-hidden",
          panel: "px-2 md:px-0 text-sm",
        }}
      />
      <div className="flex items-center justify-center rounded-xl bg-gray-200 p-4">
        <div className="flex w-full max-w-2xl flex-row items-center justify-between gap-2 gap-y-4">
          {/* icons */}
          <div className="order-first grid h-full grid-cols-1 gap-2 min-[400px]:grid-cols-2">
            {office.verified && (
              <Tooltip title="تایید شده" placement="top" arrow={false}>
                <div role="verified" className="flex cursor-pointer items-center justify-center text-secondary">
                  <Verified style={{ fontSize: 28 }} />
                </div>
              </Tooltip>
            )}
            {!office.verified && (
              <Tooltip title="تایید نشده" placement="top" arrow={false}>
                <div role="not-verified" className="flex cursor-pointer items-center justify-center text-gray-400/70">
                  <Verified style={{ fontSize: 28 }} />
                </div>
              </Tooltip>
            )}
            <Tooltip title="افزودن به مورد علاقه ها" placement="top" arrow={false}>
              <div role="add-to-favorites" className="flex cursor-pointer items-center justify-center  text-red-500">
                {/* <FavoriteBorderOutlined style={{ fontSize: 28 }} /> */}
                <Favorite style={{ fontSize: 28 }} />
              </div>
            </Tooltip>
            <Tooltip title="گزارش مشکل" placement="top" arrow={false}>
              <div role="report" className="flex cursor-pointer items-center justify-center text-gray-500">
                <ReportGmailerrorredOutlined style={{ fontSize: 28 }} />
              </div>
            </Tooltip>
            <Tooltip title="اشتراک گذاری" placement="top" arrow={false}>
              <div role="share" className="flex cursor-pointer items-center justify-center text-gray-500">
                <ShareOutlined style={{ fontSize: 28 }} />
              </div>
            </Tooltip>
          </div>
          {/* view */}
          <div className="hidden w-56 grid-cols-1 gap-2 lg:grid">
            <div className="bg-secondary p-2 text-center">رزرو بازدید حضوری</div>
            <div className="bg-gray-400 p-2 text-center">رزرو بازدید آنلاین</div>
          </div>
          <div className="flex w-auto flex-row gap-2">
            <div className="flex w-full flex-col items-center justify-center ">
              <span>
                ثبت شده توسط <b>{office.name}</b>
              </span>
              <b>{createdBy.fullName}</b>
              <hr className="my-2 hidden w-full border-gray-500 lg:block" />
              <span className="hidden lg:block">شماره تماس</span>
              <a className="hidden font-bold lg:block" dir="ltr" href={`tel:${(createdBy.phone as Phone)?.value}`}>
                {(createdBy.phone as Phone)?.value || "-"}
              </a>
              <div className="mt-2 bg-secondary p-2 text-center lg:hidden">رزرو بازدید و تماس</div>
            </div>
            {createdBy.avatar && (
              <div className="flex items-center justify-center">
                <Image
                  //
                  src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (createdBy.avatar as StorageFile)?.path}
                  alt={(createdBy.avatar as StorageFile)?.alt}
                  width={80}
                  height={80}
                  className="aspect-square h-20 min-h-[5rem] w-20 min-w-[5rem] rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEstate;
