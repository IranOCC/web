"use client";

import EstateCard from "@/components/@web/Features/Estate/EstateCard";
import { WebInput } from "@/components/@web/Input";
import { WebSelect } from "@/components/@web/Select";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SearchEstateFormData, SendSmsBoxFormData } from "@/types/formsData";
import { WebEstate } from "@/types/interfaces";
import { Search } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

  const onSubmit = async (data: SearchEstateFormData) => {
    try {
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
      const response = await api.get(`/estate`);
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
  }, []);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col gap-2 bg-gray-200 px-3 pb-20 md:bg-transparent md:px-4 md:pb-8">
        {/*  */}
        <div className="py-4 font-bold">{itemsCount} مورد یافت شد</div>
        <div className=" flex w-full flex-col gap-4 self-center">
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 min-[350px]:grid-cols-2 md:grid-cols-3 ">
              <WebInput
                //
                name="text"
                control={control}
                placeholder="کلمه کلیدی خود را تایپ کنید ..."
                submitIcon={<Search />}
                containerClassName="col-span-full"
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
        </div>
      </div>
    </>
  );
}
