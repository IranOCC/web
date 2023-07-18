import { Input } from "@/components/@panel/Input";
import { useEffect, useState } from "react";
import PanelCard from "@/components/@panel/Card";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import LocationChooser from "./LocationChooser";
import { Select } from "@/components/@panel/Select";
import { AddEditComponentProps } from "../../EditAddPage";

export default function LocationBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<OfficeFormData | UserFormData>;

  useEffect(() => {
    register("province", {});
    register("city", {});
    register("address", {});
    register("location", {});
  }, []);

  const [province, setProvince] = useState(null);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <PanelCard title="موقعیت مکانی" loading={loading}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Select
          //
          control={control}
          name="province"
          label="استان"
          error={errors.province?.message}
          loading={isSubmitting}
          placeholder="انتخاب کنید"
          apiPath="/static/province"
          onChange={(value) => setProvince(value)}
          searchable
          noSpace
          defaultValue={checkingData?.province?.default}
          disabled={checkingData?.province?.disabled}
          containerClassName={!!checkingData?.province?.hidden ? "hidden" : ""}
        />
        <Select
          //
          control={control}
          name="city"
          label="شهر"
          error={errors.city?.message}
          loading={isSubmitting}
          placeholder="انتخاب کنید"
          apiPath="/static/city"
          filterApi={{ province: province || undefined }}
          searchable
          noSpace
          defaultValue={checkingData?.city?.default}
          disabled={checkingData?.city?.disabled}
          containerClassName={!!checkingData?.city?.hidden ? "hidden" : ""}
        />
        <Input
          //
          control={control}
          name="address"
          label="آدرس"
          error={errors.address?.message}
          loading={isSubmitting}
          noSpace
          defaultValue={checkingData?.address?.default}
          disabled={checkingData?.address?.disabled}
          containerClassName={["col-span-full", !!checkingData?.address?.hidden ? "hidden" : ""].join(" ")}
        />
        <LocationChooser
          //
          name="location"
          control={control}
          error={errors.location?.message}
          loading={isSubmitting}
          noSpace
          defaultValue={checkingData?.location?.default}
          disabled={checkingData?.location?.disabled}
          containerClassName={["col-span-full", !!checkingData?.location?.hidden ? "hidden" : ""].join(" ")}
        />
      </div>
    </PanelCard>
  );
}
