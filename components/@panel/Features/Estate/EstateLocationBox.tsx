import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import PanelCard from "@/components/@panel/Card";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { EstateFormData, OfficeFormData, UserFormData } from "@/types/formsData";
import LocationChooser from "../@common/LocationChooser";
import { AddEditComponentProps } from "../../EditAddPage";
import { Select } from "@/components/Select";

export default function EstateLocationBox({ form, loading, props }: AddEditComponentProps) {
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
    register("alley");
    register("address");
    register("location");
  }, []);

  const [province, setProvince] = useState(null);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <PanelCard title="موقعیت مکانی" loading={loading}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
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
            name="district"
            label="منطقه"
            error={errors.district?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.district?.default}
            disabled={checkingData?.district?.disabled}
            containerClassName={!!checkingData?.district?.hidden ? "hidden" : ""}
          />
          <Input
            //
            control={control}
            name="quarter"
            label="محله"
            error={errors.quarter?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.quarter?.default}
            disabled={checkingData?.quarter?.disabled}
            containerClassName={!!checkingData?.quarter?.hidden ? "hidden" : ""}
          />
          <Input
            //
            control={control}
            name="alley"
            label="کوچه"
            error={errors.alley?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.alley?.default}
            disabled={checkingData?.alley?.disabled}
            containerClassName={!!checkingData?.alley?.hidden ? "hidden" : ""}
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
            containerClassName={!!checkingData?.address?.hidden ? "hidden" : ""}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <LocationChooser
            //
            name="location"
            control={control}
            error={errors.location?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.location?.default}
            disabled={checkingData?.location?.disabled}
            containerClassName={!!checkingData?.location?.hidden ? "hidden" : ""}
            getAddress={(data: any) => {
              setValue("province", data.province);
              setValue("city", data.city || data.county);
              setValue("district", data.district);
              setValue("quarter", data.neighbourhood || data.primary);
              setValue("alley", data.last);
              setValue("address", data.address_compact);
              console.log("Address:", data);
            }}
          />
        </div>
      </div>
    </PanelCard>
  );
}
