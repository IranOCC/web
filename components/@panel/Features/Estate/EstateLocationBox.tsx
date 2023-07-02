import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import PanelCard from "@/components/@panel/Card";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { EstateFormData, OfficeFormData, UserFormData } from "@/types/formsData";
import LocationChooser from "../@common/LocationChooser";
import { AddEditComponentProps } from "../../EditAddPage";
import { Select } from "@/components/Select";

export default function EstateLocationBox({ form, loading }: AddEditComponentProps) {
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
    register("province", { required: "استان را مشخص کنید" });
    register("city", { required: "شهر را مشخص کنید" });
    register("district", { required: "منطقه را مشخص کنید" });
    register("quarter", { required: "محله را مشخص کنید" });
    register("alley", {});
    register("address", {});
    register("location", {});
  }, []);

  const [province, setProvince] = useState(null);

  return (
    <PanelCard title="موقعیت مکانی" loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
          containerClassName="md:col-span-3"
          searchable
          noSpace
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
          containerClassName="md:col-span-3"
          searchable
          noSpace
        />
        <Input
          //
          control={control}
          name="district"
          label="منطقه"
          error={errors.district?.message}
          loading={isSubmitting}
          noSpace
          containerClassName="md:col-span-2"
        />
        <Input
          //
          control={control}
          name="quarter"
          label="محله"
          error={errors.quarter?.message}
          loading={isSubmitting}
          noSpace
          containerClassName="md:col-span-2"
        />
        <Input
          //
          control={control}
          name="alley"
          label="کوچه"
          error={errors.alley?.message}
          loading={isSubmitting}
          noSpace
          containerClassName="md:col-span-2"
        />
        <Input
          //
          control={control}
          name="address"
          label="آدرس"
          error={errors.address?.message}
          loading={isSubmitting}
          noSpace
          containerClassName="col-span-full"
        />
        <LocationChooser
          //
          name="location"
          control={control}
          error={errors.location?.message}
          loading={isSubmitting}
          noSpace
          containerClassName="col-span-full"
        />
      </div>
    </PanelCard>
  );
}
