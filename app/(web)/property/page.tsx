"use client";

import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { WebInput } from "@/components/@web/Input";
import { WebSelect } from "@/components/@web/Select";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { CheckBox } from "@/components/Input";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePrevious } from "@/hooks/usePrevious";
import { SearchEstateFormData } from "@/types/formsData";
import { WebEstate } from "@/types/interfaces";
import { Cancel, Close, Search } from "@mui/icons-material";
import { useKeenSlider } from "keen-slider/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export default function Page() {
  const { searchPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    searchPage();
  }, []);

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
  } = useForm<SearchEstateFormData>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const onSubmit = async (data: SearchEstateFormData) => {
    try {
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

      if (data.barter) $s.set("filter[barter]", data.barter + "");
      else $s.delete("filter[barter]");

      router.push(pathname + "?" + $s.toString());
    } catch (error) {
      //
    }
  };

  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;

  const api = useAxiosAuth();
  const [current, setCurrent] = useState([1]);
  const [dataList, setDataList] = useState<WebEstate[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/estate?size=10&current=${current[0]}${searchParams?.toString() && "&" + searchParams?.toString()}`);
      const data = response.data as { items: WebEstate[]; total: number };
      if (current[0] === 1) {
        setDataList(data?.items || []);
        setItemsCount(data?.total || 0);
      } else {
        setDataList((d) => [...d, ...data.items]);
      }
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    setCurrent([1]);
  }, [searchParams]);
  useEffect(() => {
    getData();
  }, [current]);
  const timeoutRef = useRef<Timeout | null>(null);

  //
  const scrollLoadingRef = useRef<any>(null);
  const checkLoadMore = (e: any) => {
    console.log(e);
    const sh = e.target.scrollHeight;
    const oh = e.target.offsetHeight;
    const st = e.target.scrollTop;
    console.log(sh, oh, st);
    if (sh - oh - st < 20 && !dataLoading && itemsCount > dataList.length) {
      console.log("==>>>");
      setCurrent((prev) => [prev[0] + 1]);
    }
  };
  useEffect(() => {
    const _main_scroll = document.getElementById("main")?.firstChild;
    // scrollHeight === offsetHeight
    // on scroll
    _main_scroll?.addEventListener("scroll", checkLoadMore);
    return () => _main_scroll?.removeEventListener("scroll", checkLoadMore);
  }, [dataList.length, dataLoading]);

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

  useEffect(() => {
    setTimeout(adaptSize, 700);
    setTimeout(adaptSize, 1000);
    setTimeout(adaptSize, 1500);
  }, [isFullscreen, isFullContent]);

  const _filters = [
    {
      title: "تعیین دسته و نوع",
      width: "9.5rem",
      filters: ["category", "type"],
      content: <div className="h-full w-full">دستههههه</div>,
      cancelFilter: () => {},
    },
    {
      //
      title: "تعیین نوع سند",
      width: "8.5rem",
      filters: ["documentType"],
      content: <div className="h-full w-full">دستههههه</div>,
      cancelFilter: () => {},
    },
    {
      //
      title: "تعیین ویژگی ها",
      width: "8.5rem",
      filters: ["features"],
      content: <div className="h-full w-full">دستههههه</div>,
      cancelFilter: () => {},
    },
    {
      //
      title: "تعیین موقعیت مکانی",
      width: "10.5rem",
      filters: ["province", "city", "district"],
      content: <div className="h-full w-full">دستههههه</div>,
      cancelFilter: () => {},
    },
    {
      //
      title: "تعیین متراژ",
      width: "7.5rem",
      filters: ["area"],
      content: <div className="h-full w-full bg-red-500">دستههههه</div>,
      cancelFilter: () => {},
    },
    {
      //
      title: "تعیین بازه قیمتی",
      width: "9rem",
      filters: ["price", "total_price", "barter"],
      content: <div className="h-full w-full">دستههههه</div>,
      cancelFilter: () => {},
    },
  ];
  const [isOpenFilter, setOpenFilter] = useState<number | null>(null);
  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-4">
        {/*  */}
        <div className="sticky top-0 z-10 bg-gray-200 py-4 font-bold md:bg-white">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
        <div className=" flex w-full flex-col gap-2 self-center">
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)} className="sticky top-14 z-10 bg-gray-200 md:bg-white">
            <div className="grid grid-cols-1 gap-2">
              <WebInput
                //
                name="search"
                control={control}
                placeholder="کلمه کلیدی خود را تایپ کنید ..."
                submitIcon={
                  <i className={"block h-6 w-6 text-gray-400" + (dataLoading ? " animate-spin" : "")}>
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
                  {[
                    //
                    ..._filters.filter(({ filters }) => filters.some((v) => searchParams?.has(`filter[${v}]`))),
                    ..._filters.filter(({ filters }) => !filters.some((v) => searchParams?.has(`filter[${v}]`))),
                  ].map(({ title, width, filters, cancelFilter }, idx) => {
                    const isActive = filters.some((v) => searchParams?.has(`filter[${v}]`));
                    return (
                      <button
                        key={idx}
                        onClick={(e) => setOpenFilter((m) => (m === idx ? null : idx))}
                        style={{ width: width, maxWidth: width, minWidth: width }}
                        className={
                          `keen-slider__slide relative flex items-center justify-center overflow-hidden whitespace-nowrap rounded-3xl border py-1 text-sm ` +
                          (isActive || isOpenFilter === idx ? "border-secondary bg-secondary text-white" : "border-gray-300 bg-gray-100 text-gray-700 hover:border-secondary hover:bg-secondary hover:text-white")
                        }
                      >
                        <span className="flex w-full items-center justify-center text-center text-sm">
                          {title}
                          {isActive && cancelFilter && (
                            <i className="absolute left-1 cursor-pointer text-sm text-red-600" onClick={() => cancelFilter()}>
                              <Cancel sx={{ fontSize: 16 }} />
                            </i>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* === */}
              <div className={"relative col-span-full overflow-hidden transition-all duration-1000" + (isOpenFilter !== null ? " h-64" : " h-0")}>
                <i className="absolute left-1 top-1 cursor-pointer text-sm text-red-600" onClick={() => setOpenFilter(null)}>
                  <Close sx={{ fontSize: 16 }} />
                </i>
                <div className="flex h-full w-full overflow-hidden rounded-lg bg-white/70 p-1 pe-6 empty:hidden md:bg-gray-100">
                  {isOpenFilter !== null ? _filters[isOpenFilter].content : null}
                  {/*  */}
                </div>
              </div>
              <div />
              {/* <WebSelect
                //
                control={control}
                name="category"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/category/autoComplete"
                noSpace
                defaultValue={searchParams?.get("filter[category]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                containerClassName="col-span-full"
                //
              />
              <WebSelect
                //
                control={control}
                name="type"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/type/autoComplete"
                filterApi={{ categories: searchParams?.get("filter[category]") || undefined }}
                multiple
                noSpace
                showTitle
                tagsMode
                defaultValue={searchParams?.getAll("filter[type]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                //
              />
              <WebSelect
                //
                control={control}
                name="documentType"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/documentType/autoComplete"
                filterApi={{ categories: searchParams?.get("filter[category]") || undefined }}
                multiple
                noSpace
                showTitle
                tagsMode
                defaultValue={searchParams?.getAll("filter[documentType]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                //
              />
              <WebSelect
                //
                control={control}
                name="features"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/feature/autoComplete"
                filterApi={{ categories: searchParams?.get("filter[category]") || undefined }}
                multiple
                noSpace
                showTitle
                tagsMode
                defaultValue={searchParams?.getAll("filter[features]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                containerClassName="col-span-full"
                //
              />
              <WebSelect
                //
                control={control}
                name="province"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/autoComplete/province"
                noSpace
                defaultValue={searchParams?.get("filter[province]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                //
              />
              <WebSelect
                //
                control={control}
                name="city"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/autoComplete/city"
                filterApi={{ province: searchParams?.get("filter[province]") || undefined }}
                noSpace
                defaultValue={searchParams?.get("filter[city]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                //
              />
              <WebSelect
                //
                control={control}
                name="district"
                loading={dataLoading || isSubmitting}
                apiPath="/tools/estate/autoComplete/district"
                filterApi={{ province: searchParams?.get("filter[province]") || undefined, city: searchParams?.get("filter[city]") || undefined }}
                multiple
                noSpace
                showTitle
                tagsMode
                defaultValue={searchParams?.getAll("filter[district]") || undefined}
                onChange={(v) => handleSubmit(onSubmit)()}
                //
              />
              <CheckBox
                //
                control={control}
                name="barter"
                loading={dataLoading || isSubmitting}
                noSpace
                label="قابل تهاتر"
                defaultValue={searchParams?.get("filter[barter]") === "true" || undefined}
                // onChange={(v) => handleSubmit(onSubmit)()}
              /> 
              <br />
              Price
              <br />
              TotalPrice
              <br />
              Area*/}
            </div>
          </form>

          {/* list */}
          <div className="grid grid-cols-1 gap-4 min-[580px]:grid-cols-2 md:grid-cols-1">
            {dataList.map((estate, idx) => {
              return <EstateCard key={estate._id} data={estate} />;
            })}
          </div>
          {itemsCount > dataList.length && (
            <div ref={scrollLoadingRef}>
              <LoadingWithoutBg />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
