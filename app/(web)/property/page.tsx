"use client";

import { WebInput } from "@/components/@web/Input";
import { WebSelect } from "@/components/@web/Select";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { SearchEstateFormData, SendSmsBoxFormData } from "@/types/formsData";
import { Search } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const { searchPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    searchPage();
  }, []);

  const count = 107;
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
  return (
    <>
      <div className="flex h-auto min-h-full flex-col gap-2 bg-gray-200 px-3 pb-16 md:bg-transparent md:px-4 md:pb-4">
        {/*  */}
        <div className="py-4 font-bold">{count} مورد یافت شد</div>
        <div className=" flex w-full max-w-xl flex-col gap-2 self-center">
          <WebInput
            //
            name="text"
            control={control}
            placeholder="کلمه کلیدی خود را تایپ کنید ..."
            innerSubmitBtn={"جستجو"}
            noSpace
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
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
        </div>
      </div>
    </>
  );
}
