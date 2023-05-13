import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";
import EstateSetCategoryModal from "./EstateSetCategoryModal";
import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateCategoryTypeBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<EstateFormData>;

  useEffect(() => {
    register("category");
    register("type");
  }, []);

  return (
    <>
      <PanelCard title="دسته و نوع ملک" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="category"
            error={errors.category?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/estate/category/assignList"
            searchable
            noSpace
          />
          <Select
            //
            control={control}
            name="type"
            error={errors.type?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/estate/type/assignList"
            filterApi={{ cat: props?.selectedCat }}
            searchable
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
