import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";

import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateRegistrantBox({ form, loading }: AddEditComponentProps) {
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
    register("createdBy", { required: "ثبت کننده نامشخص است" });
    register("confirmedBy", { required: "تایید کننده نامشخص است" });
    register("office", { required: "شعبه ثبت کننده نامشخص است" });
  }, []);

  return (
    <>
      <PanelCard title="جزییات فایل" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="createdBy"
            error={errors.createdBy?.message}
            loading={isSubmitting}
            label="ثبت کننده"
            placeholder="انتخاب کنید"
            apiPath="/user/assignList"
            searchable
            noSpace
          />
          <Select
            //
            control={control}
            name="confirmedBy"
            error={errors.confirmedBy?.message}
            loading={isSubmitting}
            label="تایید کننده"
            placeholder="انتخاب کنید"
            apiPath="/user/assignList"
            searchable
            noSpace
          />
          <Select
            //
            control={control}
            name="office"
            error={errors.office?.message}
            loading={isSubmitting}
            label="شعبه"
            placeholder="انتخاب کنید"
            apiPath="/office/assignList"
            searchable
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
