import { Input } from "@/components/@panel/Input";
import { useEffect, useState } from "react";
import PanelCard from "@/components/@panel/Card";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import LocationChooser from "./LocationChooser";
import { Select } from "@/components/@panel/Select";

export default function LocationBox({ form, loading }: { form: any; loading?: boolean }) {
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

  return (
    <PanelCard title="موقعیت مکانی" loading={loading}>
      <div className="grid lg:grid-cols-2 gap-4 ">
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
          defaultValue="مازندران"
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
          defaultValue="چالوس"
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
