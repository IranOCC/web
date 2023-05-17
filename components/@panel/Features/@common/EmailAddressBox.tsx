import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";
import Link from "next/link";

export default function EmailAddressBox({ form, loading }: AddEditComponentProps) {
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
  } = form as UseFormReturn<OfficeFormData | UserFormData>;

  useEffect(() => {
    register("email.value", {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "ایمیل معتبر نیست",
      },
    });
  }, []);

  return (
    <PanelCard title="ایمیل" loading={loading}>
      <div className="grid grid-cols-1 gap-4 ">
        <Input
          //
          control={control}
          name="email.value"
          label="آدرس ایمیل"
          // @ts-ignore
          error={errors?.email?.value?.message}
          loading={isSubmitting}
          direction="ltr"
          noSpace
        />
        <CheckBox //
          control={control}
          name="email.verified"
          label="تایید شده"
          // @ts-ignore
          error={errors?.email?.verified?.message}
          loading={isSubmitting}
          noSpace
        />
      </div>
    </PanelCard>
  );
}
