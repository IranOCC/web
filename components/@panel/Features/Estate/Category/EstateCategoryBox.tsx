import { CheckBox, Input } from "@/components/Input";
import { EstateCategoryFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import IconSelection from "@/components/Select/IconSelection";
import { AddEditComponentProps } from "@/components/@panel/EditAddPage";
import { Button } from "@/components/Button";
import slugify from "slugify";

export default function EstateCategoryBox({ form, loading, cancelForm }: AddEditComponentProps) {
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
  } = form as UseFormReturn<EstateCategoryFormData>;

  useEffect(() => {
    register("title", { required: "عنوان را وارد کنید" });
    register("slug");
    register("parent");
    register("description");
    register("tags");
    register("icon");
  }, []);

  return (
    <>
      <Input
        //
        control={control}
        name="title"
        placeholder="عنوان"
        error={errors.title?.message}
        loading={isSubmitting}
        noSpace
        onKeyUp={(e: any) => {
          setValue(
            "slug",
            slugify(e.target.value, {
              replacement: "_",
              remove: undefined,
              lower: false,
              strict: false,
              locale: "fa",
              trim: true,
            }),
            { shouldValidate: true }
          );
        }}
      />
      <Input
        //
        control={control}
        name="slug"
        direction="ltr"
        placeholder="شناسه"
        error={errors.slug?.message}
        loading={isSubmitting}
        noSpace
      />
      <Select
        //
        control={control}
        name="parent"
        error={errors.parent?.message}
        loading={isSubmitting}
        placeholder="دسته مادر"
        apiPath={"/tools/estate/category/autoComplete"}
        searchable
        noSpace
      />
      <Input
        //
        control={control}
        name="description"
        placeholder="توضیحات"
        error={errors.description?.message}
        loading={isSubmitting}
        multiline
        lines={3}
        noSpace
      />
      <Input
        //
        control={control}
        name="tags"
        placeholder="برچسب ها"
        error={errors.tags?.message}
        loading={isSubmitting}
        tagsMode
        noSpace
      />
      <IconSelection
        //
        control={control}
        name="icon"
        error={errors.icon?.message}
        loading={isSubmitting}
        noSpace
      />
    </>
  );
}
