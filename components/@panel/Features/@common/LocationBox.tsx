import { Input } from "@/components/Input";
import { useEffect } from "react";
import PanelCard from "@/components/@panel/Card";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import LocationChooser from "./LocationChooser";

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

  return (
    <PanelCard title="موقعیت مکانی" loading={loading}>
      <div className="grid lg:grid-cols-2 gap-4 ">
        <Input
          //
          control={control}
          name="province"
          label="استان"
          error={errors.province?.message}
          loading={isSubmitting}
          noSpace
        />
        <Input
          //
          control={control}
          name="city"
          label="شهر"
          error={errors.city?.message}
          loading={isSubmitting}
          noSpace
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
