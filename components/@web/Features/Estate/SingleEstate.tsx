"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Icon, Phone, StorageFile, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { ReactNode, useContext, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Tab from "@/components/Tab";
import { Verified, Favorite, ReportGmailerrorredOutlined, ShareOutlined, VerifiedTwoTone } from "@mui/icons-material";
import { Tooltip } from "antd";
import MapEstate from "./MapEstate";

const SingleEstate = ({ data }: { data: WebEstate }) => {
  const {
    //
    _id,
    title,
    slug,
    content,
    excerpt,
    tags,
    category,
    type,
    documentType,
    features,
    image,
    gallery,
    pinned,
    office,
    createdBy,
    publishedAt,
    owner,
    code,
    province,
    city,
    district,

    area,
    buildingArea,
    constructionYear,
    roomsCount,
    mastersCount,
    canBarter,
    floorsCount,
    unitsCount,
    floor,
    withOldBuilding,
  } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;

  const _address = [province, city, district].join(" - ");
  useEffect(() => {
    singleEstate(_id, title, category.title, code || "-", _address);
  }, []);

  const tabEq = (
    <div className="flex flex-col gap-2">
      <h6 className="flex items-center gap-1 font-bold">
        {!!category?.icon && <i className="h-5 w-5 fill-gray-800" dangerouslySetInnerHTML={{ __html: (category.icon as Icon).content }} />}
        <span>{category.title}</span>
      </h6>
      <h6 className="flex items-center gap-1 font-bold">
        {!!type?.icon && <i className="h-5 w-5 fill-gray-800" dangerouslySetInnerHTML={{ __html: (type.icon as Icon).content }} />}
        <span>{type.title}</span>
      </h6>
      <h6 className="flex items-center gap-1 font-bold">
        {!!documentType?.icon && <i className="h-5 w-5 fill-gray-800" dangerouslySetInnerHTML={{ __html: (documentType.icon as Icon).content }} />}
        <span>{documentType.title}</span>
      </h6>
      {!!features?.length && (
        <h6 className="mt-2 font-bold">
          امکانات: {/*  */}
          <br />
          <ul className="flex flex-row gap-4 font-normal">
            {features.map(({ title, icon, slug }) => {
              return (
                <li key={slug} className="flex items-center gap-1">
                  {!!icon && <i className="h-5 w-5 fill-green-500" dangerouslySetInnerHTML={{ __html: (icon as Icon).content }} />}
                  {title}
                </li>
              );
            })}
          </ul>
        </h6>
      )}
    </div>
  );
  const tabDe = <div className="" dangerouslySetInnerHTML={{ __html: content || "توضیحاتی درج نشده است" }} />;
  const tabNe = <MapEstate id={_id} />;

  const featuresItems: { title: string; value: string; icon: ReactNode }[] = [];
  switch (category.slug) {
    case "villa":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: "" });
      featuresItems.push({ title: "متراژ بنا", value: `${buildingArea} مترمربع`, icon: "" });
      featuresItems.push({ title: "سال ساخت", value: `${constructionYear}`, icon: "" });
      featuresItems.push({ title: "تعداد اتاق", value: `${roomsCount}`, icon: "" });
      featuresItems.push({ title: "تعداد مستر", value: `${mastersCount}`, icon: "" });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: "" });
      break;
    case "apartment":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: "" });
      featuresItems.push({ title: "تعداد طبقات", value: `${floorsCount}`, icon: "" });
      featuresItems.push({ title: "تعداد واحدها", value: `${unitsCount}`, icon: "" });
      featuresItems.push({ title: "طبقه", value: `${floor}`, icon: "" });
      featuresItems.push({ title: "تعداد خواب", value: `${roomsCount}`, icon: "" });
      featuresItems.push({ title: "تعداد مستر", value: `${mastersCount}`, icon: "" });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: "" });
      break;
    case "commercial":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: "" });
      featuresItems.push({ title: "متراژ بر تجاری", value: `${buildingArea} مترمربع`, icon: "" });
      featuresItems.push({ title: "طبقه", value: `${floor}`, icon: "" });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: "" });
      break;
    case "land":
    case "hectare":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: "" });
      featuresItems.push({ title: "ساختمان قدیمی", value: `${withOldBuilding ? "دارد" : "ندارد"}`, icon: "" });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: "" });
      break;
  }

  return (
    <div className="h-auto bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4 md:pt-4">
      {!!gallery?.length && (
        <ImageGallery
          //
          items={gallery}
          title={title}
          address={_address}
          id={_id}
          features={featuresItems}
          code={code}
        />
      )}
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
          panelList: "bg-white md:bg-transparent !mt-0 md:!mt-2 p-3 overflow-hidden",
          panel: "text-sm min-h-[20rem] overflow-x-hidden w-full h-full",
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
