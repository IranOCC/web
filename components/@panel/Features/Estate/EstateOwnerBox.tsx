import { CheckBox, Input } from "@/components/@panel/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/@panel/Select";

import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateOwnerBox({ form, loading }: AddEditComponentProps) {
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
  } = form as UseFormReturn<EstateFormData>;

  useEffect(() => {
    register("owner", { required: "صاحب ملک نامشخص است" });
  }, []);

  return (
    <>
      <PanelCard title="صاحب ملک" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="owner"
            error={errors.owner?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/tools/user/autoComplete"
            searchable
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
