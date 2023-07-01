import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import Link from "next/link";

export default function PhoneNumberBox({ form, loading, allowVerify = true }: { form: any; loading?: boolean; allowVerify?: boolean }) {
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form as UseFormReturn<OfficeFormData | UserFormData>;

  useEffect(() => {
    register("phone.value", {
      pattern: {
        value: /^(0|\+98)([1-9])([0-9]{9})$/,
        message: "شماره معتبر نیست",
      },
    });
  }, []);

  return (
    <PanelCard title="شماره" loading={loading}>
      <div className="grid grid-cols-1 gap-4 ">
        <Input
          //
          control={control}
          name="phone.value"
          label="شماره"
          // @ts-ignore
          error={errors?.phone?.value?.message}
          loading={isSubmitting}
          direction="ltr"
          noSpace
          maxLength={15}
        />
        {allowVerify && (
          <CheckBox //
            control={control}
            name="phone.verified"
            label="تایید شده"
            // @ts-ignore
            error={errors?.phone?.verified?.message}
            loading={isSubmitting}
            noSpace
          />
        )}
      </div>
    </PanelCard>
  );
}
