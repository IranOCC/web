import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
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

  useEffect(() => {}, []);

  return (
    <>
      <PanelCard title="دسته و نوع ملک" loading={loading}>
        <div className="grid grid-cols-1 gap-4 "></div>
      </PanelCard>
    </>
  );
}
