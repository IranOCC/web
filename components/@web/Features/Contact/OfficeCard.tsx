"use client";

import { WebOffice } from "@/types/interfaces";
import { Category } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { WebButton } from "../../Button";

const OfficeCard = ({ data }: { data: WebOffice }) => {
  const {
    //
    _id,
    name,
    management,
    logo,

    phone,
    email,

    province,
    city,
    address,
    location,

    verified,
  } = data;

  return (
    <div className="relative overflow-hidden rounded-xl md:max-h-[12rem] md:min-h-[12rem]">
      <Link href={`/property`}>
        <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
          {logo && (
            <Image
              //
              src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + logo.path}
              alt={logo.alt}
              title={logo.title}
              width={200}
              height={200}
              className="block max-h-[10rem] w-full rounded-xl object-cover md:h-full md:max-h-[12rem] md:min-h-[12rem] md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem]"
            />
          )}
          <div className="flex flex-col justify-center gap-2 md:py-3 md:pe-2">
            <h3 className="w-full truncate font-bold">{name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OfficeCard;
