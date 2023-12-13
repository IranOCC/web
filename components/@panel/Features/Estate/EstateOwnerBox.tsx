import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";

import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateOwnerBox({ form, loading, props }: AddEditComponentProps) {
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
    register("owner");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

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
            defaultValue={checkingData?.owner?.default}
            disabled={checkingData?.owner?.disabled}
            containerClassName={!!checkingData?.owner?.hidden ? "hidden" : ""}
          />
        </div>
      </PanelCard>
    </>
  );
}
