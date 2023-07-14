import { CheckBox, Input } from "@/components/@panel/Input";
import { EstateCategoryFormData, IconFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/@panel/Select";
import IconSelection from "@/components/@panel/Select/IconSelection";
import { Button } from "@/components/@panel/Button";
import { AddEditComponentProps } from "@/components/@panel/EditAddPage";

export default function IconBox({ form, loading, cancelForm }: AddEditComponentProps) {
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form as UseFormReturn<IconFormData>;

  useEffect(() => {
    register("name", { required: "عنوان را وارد کنید", minLength: { value: 5, message: "حداقل 5 کاراکتر باید باشد" } });
    register("content", { required: "کد آیکون را وارد کنید", minLength: { value: 10, message: "حداقل 10 کاراکتر باید باشد" } });
  }, []);

  return (
    <>
      <p>آیکون ها را به صورت کد svg وارد کنید. بدون پارامتر های width و height و color</p>
      <Input
        //
        control={control}
        name="name"
        placeholder="عنوان"
        error={errors.name?.message}
        loading={isSubmitting}
        noSpace
      />
      <Input
        //
        control={control}
        name="content"
        direction="ltr"
        placeholder="<svg> {...} </svg>"
        error={errors.content?.message}
        loading={isSubmitting}
        multiline
        lines={8}
        noSpace
      />
    </>
  );
}
