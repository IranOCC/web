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
    //
    if (data.category) $s.set("filter[category]", data.category);
    else $s.delete("filter[category]");
    //
    if (!!data.type?.length) {
      $s.delete("filter[type]");
      for (let i = 0; i < data.type.length; i++) {
        $s.append("filter[type]", data.type[i]);
      }
    } else $s.delete("filter[type]");
    //
    if (!!data.documentType?.length) {
      $s.delete("filter[documentType]");
      for (let i = 0; i < data.documentType.length; i++) {
        $s.append("filter[documentType]", data.documentType[i]);
      }
    } else $s.delete("filter[documentType]");
    //
    if (!!data.features?.length) {
      $s.delete("filter[features]");
      for (let i = 0; i < data.features.length; i++) {
        $s.append("filter[features]", data.features[i]);
      }
    } else $s.delete("filter[features]");

    //
    if (data.province) $s.set("filter[province]", data.province);
    else $s.delete("filter[province]");
    //
    if (data.city) $s.set("filter[city]", data.city);
    else $s.delete("filter[city]");
    //
    if (!!data.district?.length) {
      $s.delete("filter[district]");
      for (let i = 0; i < data.district.length; i++) {
        $s.append("filter[district]", data.district[i]);
      }
    } else $s.delete("filter[district]");

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

    if (data.barter) $s.set("filter[barter]", data.barter + "");
    else $s.delete("filter[barter]");

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
  const CompFilter = isOpenFilter === null ? (p: any) => null : _filters[isOpenFilter].Content;

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
    <form onSubmit={handleSubmit(onSubmit)} className="sticky top-14 z-10 bg-gray-200 md:bg-white">
      <div className="grid grid-cols-1 gap-2">
        <WebInput
          //
          name="search"
          control={control}
          placeholder="کلمه کلیدی خود را تایپ کنید ..."
          submitIcon={
            <i className={"block h-6 w-6 text-gray-400" + (dataLoading ? " animate-spin" : "")} onClick={() => setUpdate([true])}>
              {/*  */}
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
        <div className={"relative transition-all" + (isOpenFilter !== null ? " h-64" : " h-0")}>
          {isOpenFilter !== null && (
            <i className="absolute left-1 top-1 cursor-pointer text-sm text-red-600" onClick={() => setOpenFilter(null)}>
              <Close sx={{ fontSize: 16 }} />
            </i>
          )}
          <div className="flex h-full w-full rounded-lg bg-white/70 p-6 empty:hidden md:bg-gray-100">
            <CompFilter
              //
              form={form}
              dataLoading={dataLoading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
        <div />
      </div>
    </form>
  );
};

export default EstateSearchFilteringBox;

// =============> filters
const _filters = [
  {
    title: "تعیین دسته و نوع",
    width: "9.5rem",
    filters: ["category", "type"],
    Content: ({ form, dataLoading, onSubmit }: any) => {
      const { control, isSubmitting, handleSubmit } = form;
      const searchParams = useSearchParams();
      const timeoutRef = useRef<Timeout | null>(null);
      return (
        <>
          <div className="flex w-full flex-col gap-2">
            <WebSelect
              //
              control={control}
              name="category"
              size="small"
              label="دسته"
              loading={dataLoading || isSubmitting}
              apiPath="/tools/estate/category/autoComplete"
              searchable
              noSpace
              onChange={(v) => {
                handleSubmit(onSubmit)();
              }}
              //
            />
            <WebSelect
              //
              control={control}
              name="type"
              size="small"
              label="نوع"
              loading={dataLoading || isSubmitting}
              apiPath="/tools/estate/type/autoComplete"
              filterApi={{ categories: searchParams?.get("filter[category]") || undefined }}
              searchable
              multiple
              noSpace
              showTitle
              tagsMode
              onChange={(v) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  handleSubmit(onSubmit)();
                  timeoutRef.current = null;
                }, 1000);
              }}
              //
            />
          </div>
        </>
      );
    },
  },
  {
    //
    title: "تعیین نوع سند",
    width: "8.5rem",
    filters: ["documentType"],
    Content: ({ form, dataLoading, onSubmit }: any) => {
      const { control, isSubmitting, handleSubmit } = form;
      const searchParams = useSearchParams();
      const timeoutRef = useRef<Timeout | null>(null);
      return (
        <>
          <div className="flex w-full flex-col gap-2">
            <WebSelect
              //
              control={control}
              name="documentType"
              size="small"
              label="نوع سند"
              loading={dataLoading || isSubmitting}
              apiPath="/tools/estate/documentType/autoComplete"
              filterApi={{ categories: searchParams?.get("filter[category]") || undefined }}
              searchable
              multiple
              noSpace
              showTitle
              tagsMode
              onChange={(v) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  handleSubmit(onSubmit)();
                  timeoutRef.current = null;
                }, 1000);
              }}
              //
            />
          </div>
        </>
      );
    },
  },
  {
    //
    title: "تعیین امکانات",
    width: "8.5rem",
    filters: ["features"],
    Content: ({ form, dataLoading, onSubmit }: any) => {
      const { control, isSubmitting, handleSubmit } = form;
      const searchParams = useSearchParams();
      const timeoutRef = useRef<Timeout | null>(null);
      return (
        <>
          <div className="flex w-full flex-col gap-2">
            <WebSelect
              //
              control={control}
              name="features"
              size="small"
              label="امکانات"
              loading={dataLoading || isSubmitting}
              apiPath="/tools/estate/feature/autoComplete"
              filterApi={{ categories: searchParams?.get("filter[category]") || undefined }}
              searchable
              multiple
              noSpace
              showTitle
              tagsMode
              onChange={(v) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  handleSubmit(onSubmit)();
                  timeoutRef.current = null;
                }, 1000);
              }}
              //
            />
          </div>
        </>
      );
    },
  },
  {
    //
    title: "تعیین موقعیت مکانی",
    width: "10.5rem",
    filters: ["province", "city", "district"],
    Content: ({ form, dataLoading, onSubmit }: any) => {
      const { control, isSubmitting, handleSubmit } = form;
      const searchParams = useSearchParams();
      const timeoutRef = useRef<Timeout | null>(null);
      return (
        <>
          <div className="flex w-full flex-col gap-2">
            <WebSelect
              //
              control={control}
              name="province"
              size="small"
              label="استان"
              loading={dataLoading || isSubmitting}
              apiPath="/tools/estate/autoComplete/province"
              searchable
              noSpace
              onChange={(v) => {
                handleSubmit(onSubmit)();
              }}
              //
            />
            {!!searchParams?.get("filter[province]") && (
              <WebSelect
                //
                control={control}
                name="city"
                size="small"
                label="شهر"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/autoComplete/city"
                filterApi={{ province: searchParams?.get("filter[province]") || undefined }}
                searchable
                noSpace
                onChange={(v) => {
                  handleSubmit(onSubmit)();
                }}
                //
              />
            )}
            {!!searchParams?.get("filter[province]") && !!searchParams?.get("filter[city]") && (
              <WebSelect
                //
                control={control}
                name="district"
                size="small"
                label="منطقه"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/autoComplete/district"
                filterApi={{ province: searchParams?.get("filter[province]") || undefined, city: searchParams?.get("filter[city]") || undefined }}
                searchable
                multiple
                noSpace
                showTitle
                tagsMode
                onChange={(v) => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    handleSubmit(onSubmit)();
                    timeoutRef.current = null;
                  }, 1000);
                }}
                //
              />
            )}
          </div>
        </>
      );
    },
  },
  {
    //
    title: "تعیین متراژ",
    width: "7.5rem",
    filters: ["area"],
    Content: ({ form, dataLoading, onSubmit }: any) => {
      const { control, isSubmitting, handleSubmit } = form;
      const searchParams = useSearchParams();
      const timeoutRef = useRef<Timeout | null>(null);
      return (
        <>
          <div className="flex w-full flex-col gap-2">
            <RangeBox
              //
              control={control}
              name="area"
              label="متراژ کل"
              valueLabelFormat={(ex) => ex?.toLocaleString("fa-IR") + " متر مربع"}
              apiPath="/tools/estate/range/area"
              loading={dataLoading || isSubmitting}
              onChange={(v) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  handleSubmit(onSubmit)();
                  timeoutRef.current = null;
                }, 1000);
              }}
            />
          </div>
        </>
      );
    },
  },
  {
    //
    title: "تعیین بازه قیمتی",
    width: "9rem",
    filters: ["price", "totalPrice", "barter"],
    Content: ({ form, dataLoading, onSubmit }: any) => {
      const { control, isSubmitting, handleSubmit } = form;
      const searchParams = useSearchParams();
      const timeoutRef = useRef<Timeout | null>(null);
      return (
        <>
          <div className="flex w-full flex-col gap-2">
            <RangeBox
              //
              control={control}
              name="totalPrice"
              label="قیمت کل"
              valueLabelFormat={(ex) => ex?.toLocaleString("fa-IR") + " تومان"}
              apiPath="/tools/estate/range/totalPrice"
              loading={dataLoading || isSubmitting}
              onChange={(v) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  handleSubmit(onSubmit)();
                  timeoutRef.current = null;
                }, 1000);
              }}
            />

            <CheckBox
              //
              control={control}
              name="barter"
              label="قابل تهاتر"
              loading={dataLoading || isSubmitting}
              onChange={(v) => {
                handleSubmit(onSubmit)();
              }}
            />
          </div>
        </>
      );
    },
  },
];
