"use client";

import { SearchEstateFormData } from "@/types/formsData";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { WebInput } from "../../Input";
import { useRouter } from "next/navigation";

const SearchBox = () => {
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

  const router = useRouter();

  const onSubmit = async (data: SearchEstateFormData) => {
    const $s = new URLSearchParams();
    if (data.search) {
      $s.set("search", data.search);
      router.push(`/property?${$s.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center justify-center px-3">
      <div className="w-full max-w-md">
        <WebInput
          //
          name="search"
          control={control}
          placeholder="کلمه کلیدی خود را تایپ کنید ..."
          submitIcon={
            <i className={"block h-6 w-6 text-gray-400"} onClick={handleSubmit(onSubmit)}>
              <Search />
            </i>
          }
          type="search"
          noSpace
        />
      </div>
    </form>
  );
};

export default SearchBox;
