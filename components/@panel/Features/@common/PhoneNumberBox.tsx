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

export default function PhoneNumberBox({ form }: any) {
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
    register("phoneNumber", {
      pattern: {
        value: /^09([0-9]{2})-?[0-9]{3}-?[0-9]{4}$/,
        message: "شماره معتبر نیست",
      },
    });
  }, []);

  return (
    <PanelCard title="شماره تماس">
      <button type="submit" className="hidden" />
      <div className="grid grid-cols-1 gap-4 ">
        <Input
          //
          control={control}
          name="phoneNumber"
          label="شماره موبایل"
          error={errors.phoneNumber?.message}
          loading={isSubmitting}
          direction="ltr"
          noSpace
          maxLength={11}
          // innerSubmitBtn="تاییــد"
          // readOnly
          // success="فعال نشده است"
        />
      </div>
    </PanelCard>
  );
}
