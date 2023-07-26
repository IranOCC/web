import { CheckBox, DateTimePicker, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";
import moment from "moment";

export default function EstateVisibilityBox({ form, loading, props }: AddEditComponentProps) {
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
    register("status");
    register("visibility");
    register("publishedAt");
    register("pinned");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="وضعیت نمایش" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="status"
            label="وضعیت"
            error={errors.status?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            noSpace
            apiPath="/tools/estate/statics/status"
            defaultValue={checkingData?.status?.default}
            disabled={checkingData?.status?.disabled}
            containerClassName={!!checkingData?.status?.hidden ? "hidden" : ""}
          />
          <Select
            //
            control={control}
            name="visibility"
            label="نمایش"
            error={errors.visibility?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            noSpace
            apiPath="/tools/estate/statics/visibility"
            defaultValue={checkingData?.visibility?.default}
            disabled={checkingData?.visibility?.disabled}
            containerClassName={!!checkingData?.visibility?.hidden ? "hidden" : ""}
          />
          <DateTimePicker
            //
            control={control}
            name="publishedAt"
            label="تاریخ انتشار"
            error={errors.publishedAt?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.publishedAt?.default}
            disabled={checkingData?.publishedAt?.disabled}
            containerClassName={!!checkingData?.publishedAt?.hidden ? "hidden" : ""}
          />
          <CheckBox //
            control={control}
            name="pinned"
            label="سنجاق شده"
            error={errors.pinned?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.pinned?.default}
            disabled={checkingData?.pinned?.disabled}
            containerClassName={!!checkingData?.pinned?.hidden ? "hidden" : ""}
          />
        </div>
      </PanelCard>
    </>
  );
}
