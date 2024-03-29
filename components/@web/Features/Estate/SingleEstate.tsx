"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Icon, Office, Phone, StorageFile, User, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import Tab from "@/components/Tab";
import { Verified, Favorite } from "@mui/icons-material";
import { Tooltip } from "antd";
import MapEstate from "./MapEstate";
import ShareButton from "../@common/ShareButton";
import ReportButton from "../@common/ReportButton";
import FavoriteButton from "../@common/FavoriteButton";
import VerifiedButton from "../@common/VerifiedButton";
import GalleryContent from "../@common/GalleryContent";
import WebTab from "../../Tab";
import { WebButton } from "../../Button";
import Modal from "@/components/Modals";
import { ReservationModal } from "./ReservationModal";
import { Avatar } from "@nextui-org/react";
import moment from "jalali-moment";

const SingleEstate = ({ data }: { data?: WebEstate }) => {
  if (!data) throw Error("PropertyNotFound");

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
    nearPlaces,
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
    location,

    isFavorite,
  } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;

  useEffect(() => {
    console.log(data, "data");

    singleEstate(_id, title, category.title, province, city, district, code, location as [number, number]);
  }, []);

  const [openReserveModal, setReserveModal] = useState(false);

  const tabEq = (
    <div className="flex flex-col gap-2">
      {category && (
        <h6 className="flex items-center gap-1.5 font-bold">
          {!!category?.icon && <i className="h-6 w-6 fill-gray-800" dangerouslySetInnerHTML={{ __html: (category.icon as Icon).content }} />}
          <span>{category?.title}</span>
        </h6>
      )}

      {!!type && (
        <h6 className="flex items-center gap-1.5 font-bold">
          {!!type?.icon && <i className="h-6 w-6 fill-gray-800" dangerouslySetInnerHTML={{ __html: (type.icon as Icon).content }} />}
          <span>{type?.title}</span>
        </h6>
      )}
      {!!documentType && (
        <h6 className="flex items-center gap-1.5 font-bold">
          {!!documentType?.icon && <i className="h-6 w-6 fill-gray-800" dangerouslySetInnerHTML={{ __html: (documentType.icon as Icon).content }} />}
          <span>{documentType?.title}</span>
        </h6>
      )}
      {!!features?.length && (
        <div className="flex flex-col gap-2 py-4">
          <h6 className="font-bold">امکانات: {/*  */}</h6>
          <ul className="flex flex-row flex-wrap gap-4 font-normal">
            {features.map(({ title, icon, slug }) => {
              return (
                <li key={slug} className="flex items-center gap-1.5">
                  {!!icon && <i className="h-5 w-5 fill-green-500" dangerouslySetInnerHTML={{ __html: (icon as Icon).content }} />}
                  {title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
  const tabDe = <div className="" dangerouslySetInnerHTML={{ __html: content || "توضیحاتی درج نشده است" }} />;
  const tabNe = (
    <div className="">
      {!!nearPlaces?.length ? (
        <ul>
          {nearPlaces?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      ) : (
        "مکانی ثبت نشده است"
      )}
    </div>
  );

  return (
    <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4">
      <GalleryContent
        //
        items={gallery}
        id={_id}
        estateData={data}
      />

      <WebTab
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
          },
        ]}
      />
      {(!data?.sold && !!data?.dailyRent) && (
          <div className="w-full flex flex-col my-2">
            <div className="flex gap-x-1">
              <label className="font-bold">اجاره روزانه:</label>
              <span>{data?.rentPricePerDay?.toLocaleString()} تومان</span>
            </div>
          </div>
      )}
      {(!data?.sold && !!data?.annualRent) && (
          <div className="w-full flex flex-col my-2">
            <div className="flex gap-x-1">
              <label className="font-bold">رهن:</label>
              <span>{data?.mortgagePrice?.toLocaleString()} تومان</span>
            </div>
            <div className="flex gap-x-1">
              <label className="font-bold">اجاره ماهانه:</label>
              <span>{data?.rentPricePerMonth?.toLocaleString()} تومان</span>
            </div>
          </div>
      )}
      {(!data?.sold && !data?.dailyRent && !data?.annualRent) && (
          <div className="w-full flex flex-col my-2">
            <div className="flex gap-x-1">
              <label className="font-bold">قیمت هر متر:</label>
              <span>{data?.price?.toLocaleString()} تومان</span>
            </div>
            <div className="flex gap-x-1">
              <label className="font-bold">قیمت کل:</label>
              <span>{data?.totalPrice?.toLocaleString()} تومان</span>
            </div>
          </div>
      )}
      {moment(data?.confirmedAt).isBefore(moment().subtract(6, 'months')) && (
          <div className="w-full flex flex-col my-2">
            <div className="flex gap-x-1">
              <label className="font-bold">جهت استعلام قیمت یا وضعیت ملک با کارشناسان تماس بگیرید.</label>
            </div>
          </div>
      )}
      <div className="flex items-center justify-center rounded-xl bg-gray-200 p-4">
        <div className="flex w-full max-w-full flex-row items-center justify-between gap-2 gap-y-4 overflow-y-hidden md:max-w-2xl">
          {/* icons */}
          <div className="order-first grid h-full w-fit min-w-[2rem] grid-cols-1 gap-2 min-[400px]:min-w-[4rem] min-[400px]:grid-cols-2">
            <VerifiedButton isVerified={office?.verified || false} />
            <FavoriteButton isFav={isFavorite || false} />
            <ReportButton />
            <ShareButton />
          </div>
          {/* view */}
          <div className="hidden w-56 grid-cols-1 gap-2 lg:grid">
            <a href={`tel:${(createdBy?.phone as Phone)?.value || "-"}`}>
              <WebButton
                //
                title="رزرو بازدید حضوری"
                size="default"
                noSpace
              />
            </a>
            <a href={`tel:${(createdBy?.phone as Phone)?.value || "-"}`}>
              <WebButton
                //
                title="رزرو بازدید آنلاین"
                size="default"
                variant="outline"
                noSpace
              />
            </a>
          </div>
          {/* created */}
          <div className="flex w-auto flex-row gap-2">
            <div className="flex w-full flex-col justify-center text-center">
              <span className="truncate">
                ثبت شده توسط <b>{office?.name || "-"}</b>
              </span>
              <b className="truncate">{(createdBy?.firstName + " " + createdBy?.lastName).trim() || "-"}</b>
              <hr className="my-2 hidden w-full border-gray-500 lg:block" />
              <span className="hidden lg:block">شماره تماس</span>
              <a className="hidden truncate font-bold lg:block" dir="ltr" href={`tel:${(createdBy?.phone as Phone)?.value || "-"}`}>
                {(createdBy?.phone as Phone)?.value || "-"}
              </a>
              <WebButton
                //
                title="رزرو بازدید و تماس"
                size="small"
                className="mt-2 lg:hidden"
                onClick={() => setReserveModal(true)}
                noSpace
              />
            </div>
            <div className="flex items-center justify-center">
              <Avatar
                //
                src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (createdBy?.avatar as StorageFile)?.path}
                className="h-20 w-20"
                showFallback
                name={(createdBy?.firstName + " " + createdBy?.lastName).trim()}
              />
            </div>
          </div>
        </div>
      </div>
      <ReservationModal
        //
        _id={_id}
        isOpen={openReserveModal}
        setOpen={setReserveModal}
        office={office}
        createdBy={createdBy}
      />
    </div>
  );
};

export default SingleEstate;
