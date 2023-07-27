"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Phone, StorageFile, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { useContext, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Tab from "@/components/Tab";
import { Verified, Favorite, ReportGmailerrorredOutlined, ShareOutlined, VerifiedTwoTone } from "@mui/icons-material";
import { Tooltip } from "antd";

const SingleEstate = ({ data }: { data: WebEstate }) => {
  const { _id, title, slug, content, excerpt, tags, category, image, gallery, pinned, office, createdBy, publishedAt, owner, code, province, city, district } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singleEstate(_id, title, category, code || "-", [province, city, district].join(" - "));
  }, []);

  const tabEq = (
    <div className="">
      {/*  */}
      eq
    </div>
  );
  const tabDe = (
    <div className="">
      {/*  */}
      de
    </div>
  );
  const tabNe = (
    <div className="">
      {/*  */}
      ne
    </div>
  );

  return (
    <div className="bg-gray-200 md:bg-transparent md:px-4">
      {!!gallery?.length && <ImageGallery items={gallery} />}
      <Tab
        data={[
          {
            title: "امکانات",
            content: tabEq,
          },
          {
            title: "توضیحات",
            content: tabDe,
          },
          {
            title: "اماکن نزدیک",
            content: tabNe,
          },
        ]}
        clx={{
          //
          container: "pt-2",
          buttonList: "justify-center",
          button: "!w-auto px-4 !bg-white !text-black border-none",
          activeButton: "!font-extrabold !text-black underline underline-offset-8 decoration-secondary decoration-2",
        }}
      />
      <div className="flex items-center justify-center rounded-xl bg-gray-200 p-4">
        <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-2 gap-y-4 lg:flex-row">
          {/* icons */}
          <div className="order-last grid h-full grid-cols-4 gap-2 lg:order-first lg:grid-cols-2">
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
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:w-56 lg:grid-cols-1">
            <div className=" bg-secondary p-2 text-center">رزرو بازدید حضوری</div>
            <div className=" bg-gray-400 p-2 text-center">رزرو بازدید آنلاین</div>
          </div>
          <div className="flex w-full flex-row gap-2 lg:w-auto">
            <div className="flex w-full flex-col items-center ">
              <span>
                ثبت شده توسط <b>{office.name}</b>
              </span>
              <b>{createdBy.fullName}</b>
              <hr className="my-2 w-full border-gray-500" />
              <span>شماره تماس</span>
              <a className="font-bold" dir="ltr" href={`tel:${(createdBy.phone as Phone)?.value}`}>
                {(createdBy.phone as Phone)?.value || "-"}
              </a>
            </div>
            {createdBy.avatar && (
              <div className="flex items-center justify-center">
                <Image
                  //
                  src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (createdBy.avatar as StorageFile)?.path}
                  alt={(createdBy.avatar as StorageFile)?.alt}
                  width={80}
                  height={80}
                  className="aspect-square h-20 min-h-[5rem] w-20 min-w-[5rem] rounded-full me-3"
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
