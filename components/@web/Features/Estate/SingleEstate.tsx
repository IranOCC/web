"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { useContext, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Tab from "@/components/Tab";
import { Verified, Favorite, ReportGmailerrorredOutlined, ShareOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";

const SingleEstate = ({ data }: { data: WebEstate }) => {
  const { _id, title, slug, content, excerpt, tags, category, image, gallery, pinned, publishedAt, owner, code, province, city, district } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singleEstate(_id, title, category, code || "-", [province, city, district].join(" - "));
  }, []);
  useEffect(() => {
    //
  }, []);

  return (
    <>
      {!!gallery?.length && <ImageGallery items={gallery} />}
      <Tab
        data={[
          {
            title: "توضیحات",
            content: <p>سلام</p>,
          },
          {
            title: "امکانات",
            content: <p>سلام</p>,
          },
          {
            title: "اماکن نزدیک",
            content: <p>سلام</p>,
          },
        ]}
        clx={{ buttonList: "justify-center", button: "!w-auto px-4 !bg-white !text-black border-none", activeButton: "!font-extrabold underline underline-offset-8 decoration-secondary decoration-2" }}
      />

      <div className="flex items-center justify-center rounded-xl bg-gray-200 p-4">
        <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-2 gap-y-4 lg:flex-row">
          {/* icons */}
          <div className="order-last grid h-full grid-cols-4 gap-2 lg:order-first lg:grid-cols-2">
            <Tooltip title="تایید شده" placement="top" arrow={false}>
              <div role="verified" className="flex cursor-pointer items-center justify-center text-secondary">
                <Verified style={{ fontSize: 28 }} />
              </div>
            </Tooltip>
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
              <span>ثبت شده توسط IRANOCC</span>
              <b>اکبر قلیوف</b>
              <hr className="my-2 w-full border-gray-500" />
              <span>شماره تماس</span>
              <b>09212728307</b>
            </div>
            <div className="flex items-center justify-center">
              <Image
                //
                src="https://storage.iranocc.com/user/O1erYiC0r1glsun9.png"
                width={80}
                height={80}
                style={{ borderRadius: "50%" }}
                alt="user"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEstate;
