"use client";

import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { WebInput } from "@/components/@web/Input";
import { WebSelect } from "@/components/@web/Select";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { CheckBox } from "@/components/Input";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SearchEstateFormData, SendSmsBoxFormData } from "@/types/formsData";
import { WebEstate } from "@/types/interfaces";
import { Search } from "@mui/icons-material";
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

  const filters = [
    //
    { title: "تعیین دسته و نوع", width: "9rem", filters: ["category", "type"] },
    { title: "تعیین نوع سند", width: "8.5rem", filters: ["documentType"] },
    { title: "تعیین ویژگی ها", width: "8.5rem", filters: ["features"] },
    { title: "تعیین موقعیت مکانی", width: "10rem", filters: ["province", "city", "district"] },
    { title: "تعیین متراژ", width: "7.5rem", filters: ["area"] },
    { title: "تعیین بازه قیمتی", width: "8.5rem", filters: ["price", "total_price", "barter"] },
  ];

  return (
    <>
      <div className="flex h-auto min-h-full flex-col gap-2 bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-4">
        {/*  */}
        <div className="py-4 font-bold">{!!itemsCount ? `${itemsCount} مورد یافت شد` : dataLoading ? `در حال دریافت...` : `چیزی یافت نشد`}</div>
        <div className=" flex w-full flex-col gap-4 self-center">
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 min-[350px]:grid-cols-2 md:grid-cols-3 ">
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
                containerClassName="col-span-full"
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
              <div className="relative col-span-full w-full">
                <div ref={filtersRef} className="keen-slider flex h-full !w-auto flex-row items-center">
                  {filters.map(({ title, width, filters }, idx) => {
                    const isActive = filters.some((v) => searchParams?.has(`filter[${v}]`));
                    return (
                      <button
                        key={idx}
                        style={{ width: width, maxWidth: width, minWidth: width }}
                        className={`keen-slider__slide relative flex items-center justify-center whitespace-nowrap rounded-3xl border py-1 text-sm ` + (isActive ? "border-secondary bg-disable text-white" : "border-gray-300 bg-gray-100 text-gray-700")}
                      >
                        <span className="w-full text-center text-sm">{title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
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
