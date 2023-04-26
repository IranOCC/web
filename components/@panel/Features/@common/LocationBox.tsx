import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { SendSmsBoxFormData, UserFormData, UserPhoneFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";

export default function LocationBox({ form }: any) {
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
  } = form;

  useEffect(() => {
    register("phoneNumber", {});
  }, []);

  return (
    <PanelCard title="موقعیت مکانی">
      <button type="submit" className="hidden" />
      <div className="grid grid-cols-2 gap-4 ">
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
      </div>
    </PanelCard>
  );
}
