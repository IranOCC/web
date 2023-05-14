import { CheckBox, DateTimePicker, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";
import moment from "moment";

export default function EstateVisibilityBox({ form, loading }: AddEditComponentProps) {
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
    register("status", { required: "وضعیت را مشخص کنید" });
    register("visibility", { required: "وضعیت نمایش را مشخص کنید" });
    register("publishedAt", { required: "تاریخ انتشار را مشخص کنید" });
    register("pinned");
  }, []);

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
            apiPath="/estate/statics/status"
            defaultValue="Publish"
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
            apiPath="/estate/statics/visibility"
            defaultValue="Public"
          />
          <DateTimePicker
            //
            control={control}
            name="publishedAt"
            label="تاریخ انتشار"
            error={errors.publishedAt?.message}
            defaultValue={new Date()}
            loading={isSubmitting}
            noSpace
          />
          <CheckBox //
            control={control}
            name="pinned"
            label="سنجاق شده"
            error={errors.pinned?.message}
            loading={isSubmitting}
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
