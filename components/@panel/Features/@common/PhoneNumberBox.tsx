import { CheckBox, Input } from "@/components/@panel/Input";
import { OfficeFormData, UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";

export default function PhoneNumberBox({ form, loading, props, allowVerify = true }: AddEditComponentProps & { allowVerify?: boolean }) {
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

  const { checkingData } = props;
  if (!checkingData) return null;

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
          patternFormatProps={{
            format: "+98 9## ### ####",
            allowEmptyFormatting: true,
            mask: "_",
          }}
          defaultValue={checkingData?.phone?.value?.default}
          disabled={checkingData?.phone?.value?.disabled}
          containerClassName={!!checkingData?.phone?.value?.hidden ? "hidden" : ""}
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
            defaultValue={checkingData?.phone?.verified?.default}
            disabled={checkingData?.phone?.verified?.disabled}
            containerClassName={!!checkingData?.phone?.verified?.hidden ? "hidden" : ""}
          />
        )}
      </div>
    </PanelCard>
  );
}
