"use client";

import { WebEstate } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import FeaturesList from "./FeaturesList";
import { Card } from "@nextui-org/react";

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
    <div className="md:max-h-[12rem] md:min-h-[12rem]">
      <Card className="group relative w-full overflow-hidden" shadow="none" isPressable isHoverable>
        <Link href={`/property/${slug}`} className="w-full">
          <div className="flex w-full flex-col gap-2 bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
            <Image
              //
              src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path}
              alt={image.alt}
              title={image.title}
              width={500}
              height={200}
              className="block max-h-[10rem] w-full rounded-xl object-cover md:h-full md:max-h-[12rem] md:min-h-[12rem] md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem]"
            />

            <div className="flex w-full flex-col justify-center gap-2 md:py-3">
              <h3 className="w-full truncate text-start font-bold">{title}</h3>
              <FeaturesList data={data} isEstateCard />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default EstateCard;
