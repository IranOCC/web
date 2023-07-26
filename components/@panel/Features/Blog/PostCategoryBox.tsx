import { CheckBox, Input } from "@/components/Input";
import { BlogPostFormData, EstateFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";

export default function BlogPostCategoryBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<BlogPostFormData>;

  useEffect(() => {
    register("categories");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="دسته بندی" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="categories"
            label=""
            error={errors.categories?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            multiple
            noSpace
            showTitle
            multiline
            lines={3}
            apiPath="/tools/blog/category/autoComplete"
            defaultValue={checkingData?.categories?.default}
            disabled={checkingData?.categories?.disabled}
            containerClassName={!!checkingData?.categories?.hidden ? "hidden" : ""}
          />
        </div>
      </PanelCard>
    </>
  );
}
