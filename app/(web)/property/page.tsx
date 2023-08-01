"use client";

import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { WebInput } from "@/components/@web/Input";
import { WebSelect } from "@/components/@web/Select";
import { LoadingWithoutBg } from "@/components/Loading";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SearchEstateFormData, SendSmsBoxFormData } from "@/types/formsData";
import { WebEstate } from "@/types/interfaces";
import { Search } from "@mui/icons-material";
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
      // if (data.category) $s.set("filter", [data.search]);
      // else $s.delete("search");
      // $s.set("filter[category]", "های");
      router.push(pathname + "?" + $s.toString());

      // if (isNew) {
      //   const { data: result } = await api.post(`/admin/${endpoint}`, data);
      //   toast.success("با موفقیت ایجاد شد");
      //   if (redirect) router.replace(baseRoute);
      //   else router.replace(baseRoute + result._id);
      // } else {
      //   await api.patch(`/admin/${endpoint}/` + (SECTION || ID), data);
      //   toast.success("با موفقیت ویرایش شد");
      //   if (redirect) router.replace(baseRoute);
      //   else window.location.reload();
      // }
    } catch (error) {
      // handleFieldsError(error, setError);
    }
  };

  const api = useAxiosAuth();
  const [dataList, setDataList] = useState<WebEstate[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/estate?${searchParams?.toString()}`);
      const data = response.data as { items: WebEstate[]; total: number };
      setDataList(data?.items || []);
      setItemsCount(data?.total);
      setDataLoading(false);
    } catch (error) {
      //
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams]);
  const timeoutRef = useRef<Timeout | null>(null);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col gap-2 bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-8">
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
                submitIcon={<Search />}
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
                type="search"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
              <WebSelect
                //
                control={control}
                name="category"
                noSpace
              />
            </div>
          </form>

          {/* list */}
          <div className="grid grid-cols-1 gap-4 min-[580px]:grid-cols-2 md:grid-cols-1">
            {dataList.map((estate, idx) => {
              return <EstateCard key={estate._id} data={estate} />;
            })}
          </div>
          {dataLoading && (
            <div className="">
              <LoadingWithoutBg />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
