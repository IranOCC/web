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

export default function EmailAddressBox({ form }: any) {
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
    register("emailAddress", {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "ایمیل معتبر نیست",
      },
    });
  }, []);

  return (
    <PanelCard title="آدرس ایمیل">
      <button type="submit" className="hidden" />
      <div className="grid grid-cols-1 gap-4 ">
        <Input
          //
          control={control}
          name="emailAddress"
          label="آدرس ایمیل"
          error={errors.emailAddress?.message}
          loading={isSubmitting}
          direction="ltr"
          noSpace
          // innerSubmitBtn="تاییــد"
        />
      </div>
    </PanelCard>
  );
}
