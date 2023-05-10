import { CheckBox, Input } from "@/components/Input";
import { EstateCategoryFormData } from "@/types/formsData";
import { useEffect } from "react";
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
    register("title", { required: "عنوان را وارد کنید", minLength: { value: 5, message: "حداقل 5 کاراکتر باید باشد" } });
    register("slug");
    register("parent");
    register("description");
    register("tags");
    register("icon");
  }, []);

  useEffect(() => {
    const vv = getValues("title") || "";
    setValue(
      "slug",
      slugify(vv, {
        replacement: "_",
        remove: undefined,
        lower: false,
        strict: false,
        locale: "fa",
        trim: true,
      })
    );
  }, [getValues("title")]);

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
      />
      <Input
        //
        control={control}
        name="slug"
        direction="ltr"
        placeholder="آدرس اینترنتی"
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
        apiPath="/estate/category/parentList"
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
        label="آیکون"
        control={control}
        name="icon"
        error={errors.icon?.message}
        loading={isSubmitting}
        noSpace
      />
    </>
  );
}
