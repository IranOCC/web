import { Button } from "@/components/@panel/Button";
import { CheckBox, Input } from "@/components/@panel/Input";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";

export default function EmailAddressBox({ form, loading, props, allowVerify = true }: AddEditComponentProps & { allowVerify?: boolean }) {
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

  const { checkingData } = props;
  if (!checkingData) return null;

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
          defaultValue={checkingData?.email?.value?.default}
          disabled={checkingData?.email?.value?.disabled}
          containerClassName={!!checkingData?.email?.value?.hidden ? "hidden" : ""}
        />
        {allowVerify && (
          <CheckBox //
            control={control}
            name="email.verified"
            label="تایید شده"
            // @ts-ignore
            error={errors?.email?.verified?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.email?.verified?.default}
            disabled={checkingData?.email?.verified?.disabled}
            containerClassName={!!checkingData?.email?.verified?.hidden ? "hidden" : ""}
          />
        )}
      </div>
    </PanelCard>
  );
}
