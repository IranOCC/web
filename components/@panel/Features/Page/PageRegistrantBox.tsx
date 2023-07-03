import { PageFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";

export default function PageRegistrantBox({ form, loading }: AddEditComponentProps) {
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
  } = form as UseFormReturn<PageFormData>;

  useEffect(() => {
    register("createdBy", { required: "نویسنده نامشخص است" });
  }, []);

  return (
    <>
      <PanelCard title="جزییات پست" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="createdBy"
            error={errors.createdBy?.message}
            loading={isSubmitting}
            label="ثبت کننده"
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
