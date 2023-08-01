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
    <div className="overflow-hidden rounded-xl  ">
      <Link href={`/property/${slug}`}>
        <div className="flex flex-col overflow-hidden rounded-xl bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
          <Image
            //
            src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path}
            alt={image.alt}
            title={image.title}
            width={800}
            height={400}
            className="block w-full rounded-xl object-contain md:h-full md:max-w-xs"
          />
          <div className="flex flex-col p-2 pb-0 md:flex-row md:pb-2">
            <h3 className="font-bold ">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EstateCard;
