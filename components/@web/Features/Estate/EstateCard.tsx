"use client";

import { WebEstate } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import FeaturesList from "./FeaturesList";
import { Button, Card, Chip } from "@nextui-org/react";
import { ReactNode, useRef, useState } from "react";
import FavoriteButton from "../@common/FavoriteButton";
import { Call, FavoriteBorderOutlined, Visibility } from "@mui/icons-material";
import { Tooltip } from "antd";

const EstateCard = ({ data, tools, toolsClassName = "" }: { data: WebEstate; tools?: (data: WebEstate) => ReactNode; toolsClassName?: string }) => {
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

    dailyRent,
    annualRent,
    special,
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
    setPullChange(56);
  };
  const onMouseLeave = (e: any) => {
    setPullChange(0);
  };
  return (
    <div className="md:max-h-[12rem] md:min-h-[12rem]">
      <div className="relative flex w-full flex-row">
        <div
          //
          style={{ width: !tools ? "100%" : `calc(100% - ${(pullChange > 100 ? 100 : pullChange || (isOpenTools && 56)) || 12}px)` }}
          className="z-10 w-full overflow-hidden transition-all"
        >
          <Card
            //
            onTouchStart={!tools ? undefined : pullStart}
            onTouchEnd={!tools ? undefined : pullEnd}
            onTouchMove={!tools ? undefined : pull}
            className="group relative w-full overflow-hidden"
            shadow="none"
            isPressable
            isHoverable
          >
            {slug ? (
              <Link href={`/property/${slug}`} className="w-full">
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
                  {(dailyRent || annualRent) && (
                    <div className="absolute right-3 top-3 block">
                      <div className="relative flex flex-col gap-1">
                        {dailyRent && (
                          <Chip variant="shadow" color="secondary" className="text-sm">
                            اجاره روزانه
                          </Chip>
                        )}
                        {annualRent && (
                          <Chip variant="shadow" color="secondary" className="text-sm">
                            اجاره سالانه
                          </Chip>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex w-full flex-col justify-center gap-2 md:py-3">
                    <h3 className="flex w-full flex-row gap-2 text-start font-bold">
                      {special && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-secondary" fill="currentColor">
                          <path
                            fill="currentColor"
                            d="M3.49709 8.06489L4.78355 18.9998H19.2266L20.513 8.06489L16.5032 10.7381L12.0051 4.44076L7.50694 10.7381L3.49709 8.06489ZM2.80577 5.20031L7.00505 7.99983L11.1913 2.13905C11.5123 1.68964 12.1369 1.58555 12.5863 1.90656C12.6761 1.9707 12.7546 2.04926 12.8188 2.13905L17.0051 7.99983L21.2043 5.20031C21.6639 4.89395 22.2847 5.01813 22.5911 5.47766C22.7228 5.67527 22.7799 5.91332 22.7522 6.1492L21.109 20.1167C21.0497 20.6203 20.6229 20.9998 20.1158 20.9998H3.8943C3.38722 20.9998 2.9604 20.6203 2.90115 20.1167L1.25792 6.1492C1.19339 5.6007 1.58573 5.10374 2.13423 5.03921C2.37011 5.01146 2.60816 5.06856 2.80577 5.20031ZM12.0051 14.9998C10.9005 14.9998 10.0051 14.1044 10.0051 12.9998C10.0051 11.8953 10.9005 10.9998 12.0051 10.9998C13.1096 10.9998 14.0051 11.8953 14.0051 12.9998C14.0051 14.1044 13.1096 14.9998 12.0051 14.9998Z"
                          />
                        </svg>
                      )}
                      {title}
                    </h3>
                    <FeaturesList data={data} isEstateCard />
                  </div>
                </div>
              </Link>
            ) : (
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
            )}
          </Card>
        </div>
        {!!tools && (
          <div
            //
            onMouseEnter={!tools ? undefined : onMouseEnter}
            onMouseLeave={!tools ? undefined : onMouseLeave}
            className={`absolute left-0 mt-4 h-[calc(100%-16px)] w-32 overflow-hidden rounded-bl-xl rounded-br-xl rounded-tl-3xl bg-secondary/40 ${toolsClassName}`}
          >
            <div className="float-left flex h-full w-14 flex-col items-center justify-center gap-3 p-3">
              {tools(data)}
              {/*  */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstateCard;
