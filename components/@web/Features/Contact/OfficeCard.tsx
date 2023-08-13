"use client";

import { Phone, WebOffice } from "@/types/interfaces";
import { Category } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { WebButton } from "../../Button";
import MarkerIcon from "@/components/Icons/MarkerIcon";
import PhoneIcon from "@/components/Icons/Phone";
import { CSSProperties } from "react";

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
    // max-w-3xl
    <div className=" relative flex w-full justify-center self-center overflow-hidden rounded-xl">
      <Link href="#" className="w-full">
        <div
          style={{ "--tw-shadow": "inset 0 6px 12px 0 rgb(0 0 0 / 0.15)" } as CSSProperties}
          className="flex h-full w-full items-center gap-2 overflow-hidden rounded-xl bg-white p-2 transition-all duration-700 hover:bg-gray-100 group-[.isActive]:bg-disable group-[.isActive]:shadow-inner max-[425px]:flex-col md:bg-gray-200 md:p-0 "
        >
          {logo && (
            <Image
              //
              src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + logo.path}
              alt={logo.alt}
              title={logo.title}
              width={128}
              height={128}
              className="block aspect-square min-h-[128px] min-w-[128px] rounded-xl object-cover"
            />
          )}
          {!logo && (
            <svg xmlns="http://www.w3.org/2000/svg" className="min-w-[128px] rounded-xl bg-gray-100 fill-gray-300 max-[425px]:w-full md:bg-transparent" width={128} height={128} viewBox="0 0 24 24">
              <path d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></path>
            </svg>
          )}
          <div className="flex w-full flex-col justify-center gap-2 md:py-3 md:pe-2">
            <h3 className="w-full truncate font-bold">{name}</h3>
            <h6 className="col-span-full flex items-center gap-1 text-sm font-medium text-gray-600">
              <MarkerIcon />
              <span className="truncate">{address || "-"}</span>
            </h6>
            <h6 className="col-span-full flex items-center gap-1 text-sm font-medium text-gray-600">
              <PhoneIcon />
              <span className="truncate">{(phone as Phone)?.value || "-"}</span>
            </h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OfficeCard;
