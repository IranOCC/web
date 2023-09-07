"use client";

import { WebEstate } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import FeaturesList from "./FeaturesList";
import { Card } from "@nextui-org/react";
import { useRef, useState } from "react";

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

  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState(0);
  const [isOpenTools, setOpenTools] = useState(false);

  const pullStart = (e: any) => {
    const { screenX } = e.targetTouches[0];
    setStartPoint(screenX);
  };

  const pull = (e: any) => {
    const touch = e.targetTouches[0];
    const { screenX } = touch;
    let pullLength = startPoint < screenX ? Math.abs(screenX - startPoint) : 0;
    setPullChange(pullLength);
    console.log({ screenX, startPoint, pullLength, pullChange });
  };

  const pullEnd = (e: any) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 70) setOpenTools(true);
    if (pullChange < 30) setOpenTools(false);
  };

  const onMouseEnter = (e: any) => {
    setPullChange(50);
  };
  const onMouseLeave = (e: any) => {
    setPullChange(0);
  };
  return (
    <div className="md:max-h-[12rem] md:min-h-[12rem]">
      <div className="relative flex w-full flex-row">
        <div
          //
          style={{ width: `calc(100% - ${(pullChange > 100 ? 100 : pullChange || (isOpenTools && 50)) || 12}px)` }}
          className="z-10 w-full overflow-hidden transition-all"
        >
          <Card
            //
            onTouchStart={pullStart}
            onTouchEnd={pullEnd}
            onTouchMove={pull}
            className="group relative w-full overflow-hidden"
            shadow="none"
            isPressable
            isHoverable
          >
            <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
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
          </Card>
        </div>
        <div
          //
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-0 mt-4 h-[calc(100%-16px)] w-28 cursor-pointer rounded-xl rounded-tl-3xl bg-secondary/40"
        >
          <div className="bg-red-500"></div>
        </div>
      </div>
    </div>
  );
};

export default EstateCard;
