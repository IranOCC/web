"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Icon, Phone, StorageFile, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { ReactNode, useContext, useEffect } from "react";
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
import Link from "next/link";
import FeaturesList from "./FeaturesList";

const EstateCard = ({ data }: { data: WebEstate }) => {
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

  return (
    <div className="overflow-hidden rounded-xl md:max-h-[12rem] md:min-h-[12rem]">
      <Link href={`/property/${slug}`}>
        <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
          <Image
            //
            src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path}
            alt={image.alt}
            title={image.title}
            width={500}
            height={200}
            className="block max-h-[10rem] w-full rounded-xl object-cover md:h-full md:max-h-[12rem] md:min-h-[12rem] md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem]"
          />

          <div className="flex flex-col justify-center gap-2 md:py-3">
            <h3 className="w-full truncate font-bold">{title}</h3>
            <FeaturesList data={data} isEstateCard />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EstateCard;
