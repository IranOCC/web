"use client";

import { SearchEstateFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { WebInput } from "../../Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { Timeout } from "react-number-format/types/types";
import { Cancel, Close, Search } from "@mui/icons-material";
import { WebSelect } from "../../Select";
import { CheckBox, RangeBox } from "@/components/Input";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useKeenSlider } from "keen-slider/react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { LocationCity, LocationProvince } from "../Dashboard/Components/LocationChoose";
import { LocationFilter } from "./Filters/LocationFilter";
import { FeaturesFilter } from "./Filters/FeaturesFilter";
import { DocumentTypeFilter } from "./Filters/DocumentTypeFilter";
import { CategoryTypeFilter } from "./Filters/CategoryTypeFilter";
import { RentFilter } from "./Filters/RentFilter";
import { SpecialFilter } from "./Filters/SpecialFilter";
import { AreaFilter } from "./Filters/AreaFilter";
import { PriceFilter } from "./Filters/PriceFilter";

const EstateSearchFilteringBox = ({ dataLoading, setUpdate }: any) => {
  const timeoutRef = useRef<Timeout | null>(null);

  const form = useForm<SearchEstateFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const onSubmit = async (data: SearchEstateFormData) => {
    console.log("data", data);

    const $s = new URLSearchParams(searchParams?.toString());
    if (data.search) $s.set("search", data.search);
    else $s.delete("search");

    // ===> category
    if (!!data.category && data.category !== "null") $s.set("filter[category]", data.category);
    else $s.delete("filter[category]");

    // ===> type
    if (!!data.type && !!data.type?.length) {
      // @ts-ignore
      if (!Array.isArray(data.type)) data.type = (data.type as string).split(",");
      $s.delete("filter[type]");
      for (let i = 0; i < data.type.length; i++) {
        $s.append("filter[type]", data.type[i]);
      }
    } else {
      $s.delete("filter[type]");
    }

    // ===> documentType
    if (!!data.documentType && !!data.documentType?.length) {
      // @ts-ignore
      if (!Array.isArray(data.documentType)) data.documentType = (data.documentType as string).split(",");
      $s.delete("filter[documentType]");
      for (let i = 0; i < data.documentType.length; i++) {
        $s.append("filter[documentType]", data.documentType[i]);
      }
    } else {
      $s.delete("filter[documentType]");
    }

    // ===> features
    if (!!data.features && !!data.features?.length) {
      // @ts-ignore
      if (!Array.isArray(data.features)) data.features = (data.features as string).split(",");
      $s.delete("filter[features]");
      for (let i = 0; i < data.features.length; i++) {
        $s.append("filter[features]", data.features[i]);
      }
    } else {
      $s.delete("filter[features]");
    }

    // ===> location
    if (!!data.province && data.province !== "null") {
      $s.set("filter[province]", data.province);
      //
      if (!!data.city && data.city !== "null") {
        $s.set("filter[city]", data.city);
        //
        if (!!data.district && !!data.district?.length) {
          // @ts-ignore
          if (!Array.isArray(data.district)) data.district = (data.district as string).split(",");
          $s.delete("filter[district]");
          for (let i = 0; i < data.district.length; i++) {
            $s.append("filter[district]", data.district[i]);
          }
        } else {
          $s.delete("filter[district]");
        }
        //
      } else {
        $s.delete("filter[city]");
        $s.delete("filter[district]");
      }
      //
    } else {
      $s.delete("filter[province]");
      $s.delete("filter[city]");
      $s.delete("filter[district]");
    }

    // dailyRent
    if (data.dailyRent) $s.set("filter[dailyRent]", data.dailyRent + "");
    else $s.delete("filter[dailyRent]");
    // annualRent
    if (data.annualRent) $s.set("filter[annualRent]", data.annualRent + "");
    else $s.delete("filter[annualRent]");

    // special
    if (data.special) $s.set("filter[special]", data.special + "");
    else $s.delete("filter[special]");

    // ==============
    if (!!data.area?.length) {
      $s.delete("filter[area]");
      for (let i = 0; i < data.area.length; i++) {
        $s.append("filter[area]", data.area[i] + "");
      }
    } else $s.delete("filter[area]");

    if (!!data.price?.length) {
      $s.delete("filter[price]");
      for (let i = 0; i < data.price.length; i++) {
        $s.append("filter[price]", data.price[i] + "");
      }
    } else $s.delete("filter[price]");

    if (!!data.totalPrice?.length) {
      $s.delete("filter[totalPrice]");
      for (let i = 0; i < data.totalPrice.length; i++) {
        $s.append("filter[totalPrice]", data.totalPrice[i] + "");
      }
    } else $s.delete("filter[totalPrice]");

    // barter
    if (data.barter) $s.set("filter[barter]", data.barter + "");
    else $s.delete("filter[barter]");

    // swap
    if (data.swap) $s.set("filter[swap]", data.swap + "");
    else $s.delete("filter[swap]");

    router.push(pathname + "?" + $s.toString());
  };

  useEffect(() => {
    const $s = new URLSearchParams(searchParams?.toString());
    // =====
    setValue("search", $s.get("search") || undefined);
    // ==
    setValue("category", $s.get("filter[category]") || undefined);
    setValue("type", $s.getAll("filter[type]") || []);
    // ==
    setValue("documentType", $s.getAll("filter[documentType]") || []);
    // ==
    setValue("features", $s.getAll("filter[features]") || []);
    // ==
    setValue("province", $s.get("filter[province]") || undefined);
    setValue("city", $s.get("filter[city]") || undefined);
    setValue("district", $s.getAll("filter[district]") || []);
    // ==
    const $area = $s.getAll("filter[area]");
    if (!!$area?.length) setValue("area", $area);

    const $price = $s.getAll("filter[price]");
    if (!!$price?.length) setValue("price", $price);

    const $totalPrice = $s.getAll("filter[totalPrice]");
    if (!!$totalPrice?.length) setValue("totalPrice", $totalPrice);
    // // // //
    setValue("barter", $s.get("filter[barter]") === "true" || undefined);
    setValue("swap", $s.get("filter[swap]") === "true" || undefined);
    setValue("dailyRent", $s.get("filter[dailyRent]") === "true" || undefined);
    setValue("annualRent", $s.get("filter[annualRent]") === "true" || undefined);
    setValue("special", $s.get("filter[special]") === "true" || undefined);
  }, []);

  const cancelFilter = (idx: number) => {
    const _s = _filters[idx].filters;
    for (let i = 0; i < _s.length; i++) {
      const ff = _s[i];
      resetField(ff as any);
    }
    handleSubmit(onSubmit)();
  };
  const [isOpenFilter, setOpenFilter] = useState<number | null>(null);
  const CompFilter = isOpenFilter === null || !_filters[isOpenFilter]?.Content ? null : _filters[isOpenFilter].Content;

  const [filtersRef, filtersInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "free",
      rtl: true,
      rubberband: false,
      slides: {
        perView: "auto",
        spacing: 10,
      },
    },
    []
  );

  const adaptSize = () => {
    const slider = filtersInstanceRef.current!;
    // @ts-ignore
    if (slider) slider.container.style.width = slider.slides[slider.track.details.rel]?.parentNode?.parentNode?.offsetWidth + "px";
    if (slider) slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px";
    if (slider) slider.update();
  };

  useEffect(() => {
    window.addEventListener("resize", adaptSize, false);
  }, []);

  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    setTimeout(adaptSize, 700);
    setTimeout(adaptSize, 1000);
    setTimeout(adaptSize, 1500);
  }, [isFullscreen, isFullContent]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sticky top-[55px] z-20 bg-gray-200 md:bg-white">
      <div className="grid grid-cols-1 gap-2">
        <WebInput
          //
          name="search"
          control={control}
          placeholder="کلمه کلیدی خود را تایپ کنید ..."
          submitIcon={
            <i className={"block h-6 w-6 text-gray-400" + (dataLoading ? " animate-spin" : "")} onClick={() => setUpdate([true])}>
              {dataLoading ? <LoadingIcon /> : <Search />}
            </i>
          }
          onKeyDown={(e: any) => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
              handleSubmit(onSubmit)();
              timeoutRef.current = null;
            }, 1000);
          }}
          loading={dataLoading}
          defaultValue={searchParams?.get("search") || undefined}
          type="search"
          noSpace
        />
        <div className="relative w-full">
          <div ref={filtersRef} className="keen-slider flex h-full !w-auto flex-row items-center">
            {
              // [
              //   //
              //   ..._filters.filter(({ filters }) => filters.some((v) => searchParams?.has(`filter[${v}]`))),
              //   ..._filters.filter(({ filters }) => !filters.some((v) => searchParams?.has(`filter[${v}]`))),
              // ]
              _filters
                // .sort(({ filters }) => {
                //   return filters.some((v) => searchParams?.has(`filter[${v}]`)) ? 1 : -1;
                // })
                .map(({ title, width, filters }, idx) => {
                  const isActive = filters.some((v) => searchParams?.has(`filter[${v}]`));
                  return (
                    <button
                      key={idx}
                      style={{ width: width, maxWidth: width, minWidth: width }}
                      className={
                        `keen-slider__slide relative flex items-center justify-center overflow-hidden whitespace-nowrap rounded-3xl border text-sm ` + (isActive ? "border-secondary bg-secondary text-white" : "border-gray-300 text-gray-700" + (isOpenFilter === idx ? " bg-disable" : " bg-gray-100"))
                      }
                    >
                      <span
                        //
                        onClick={(e) => setOpenFilter((m) => (m === idx ? null : idx))}
                        className="flex w-full flex-1 items-center justify-center py-1 text-center text-sm"
                      >
                        {title}
                      </span>
                      {isActive && (
                        <i className="absolute left-1 cursor-pointer text-sm text-red-600 hover:text-red-100" onClick={() => cancelFilter(idx)}>
                          <Cancel sx={{ fontSize: 16 }} />
                        </i>
                      )}
                    </button>
                  );
                })
            }
          </div>
        </div>
        {/* === */}
        {CompFilter !== null && (
          <Modal
            //
            backdrop="opaque"
            isOpen={isOpenFilter !== null}
            onClose={() => setOpenFilter(null)}
            className="z-[102]"
            placement="bottom"
            classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
          >
            <ModalContent>
              <ModalBody className={"group py-6" + (dataLoading ? " isLoading" : "")}>
                <div className="relative flex w-full p-6 empty:hidden">
                  <CompFilter
                    //
                    form={form}
                    dataLoading={dataLoading}
                    onSubmit={onSubmit}
                  />
                  <div className="absolute left-0 top-0 hidden h-full w-full bg-black/30 group-[.isLoading]:block"></div>
                </div>
                <Button onPress={() => setOpenFilter(null)}>ثبت</Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        <div />
      </div>
    </form>
  );
};

export default EstateSearchFilteringBox;

// =============> filters
const _filters: { title: string; width: string; filters: string[]; Content?: any }[] = [
  {
    //
    title: "املاک ویژه",
    width: "7.5rem",
    filters: ["special"],
    Content: SpecialFilter,
  },
  {
    //
    title: "تعیین متراژ",
    width: "7.5rem",
    filters: ["area"],
    Content: AreaFilter,
  },
  {
    //
    title: "تعیین بازه قیمتی",
    width: "9rem",
    filters: ["price", "totalPrice", "barter", "swap"],
    Content: PriceFilter,
  },
  {
    //
    title: "اجاره",
    width: "5rem",
    filters: ["dailyRent", "annualRent"],
    Content: RentFilter,
  },
  {
    title: "تعیین دسته و نوع",
    width: "9.5rem",
    filters: ["category", "type"],
    Content: CategoryTypeFilter,
  },
  {
    //
    title: "تعیین نوع سند",
    width: "8.5rem",
    filters: ["documentType"],
    Content: DocumentTypeFilter,
  },
  {
    //
    title: "تعیین امکانات",
    width: "8.5rem",
    filters: ["features"],
    Content: FeaturesFilter,
  },
  {
    //
    title: "تعیین موقعیت مکانی",
    width: "10.5rem",
    filters: ["province", "city", "district"],
    Content: LocationFilter,
  },
];
