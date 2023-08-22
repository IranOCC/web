"use client";

import { SearchBlogFormData, SearchEstateFormData } from "@/types/formsData";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { WebInput } from "../../Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { Timeout } from "react-number-format/types/types";

const BlogSearchFilteringBox = ({ dataLoading, setUpdate }: any) => {
  const timeoutRef = useRef<Timeout | null>(null);

  const form = useForm<SearchBlogFormData>();
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
  const onSubmit = async (data: SearchBlogFormData) => {
    const $s = new URLSearchParams(searchParams?.toString());
    if (data.search) $s.set("search", data.search);
    else $s.delete("search");
    router.push(pathname + "?" + $s.toString());
  };

  useEffect(() => {
    const $s = new URLSearchParams(searchParams?.toString());
    // =====
    setValue("search", $s.get("search") || undefined);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sticky top-14 z-20 bg-gray-200 md:bg-white">
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
        <div />
      </div>
    </form>
  );
};

export default BlogSearchFilteringBox;
