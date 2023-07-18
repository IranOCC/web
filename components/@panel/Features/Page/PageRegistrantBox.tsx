import { PageFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddEditComponentProps } from "../../EditAddPage";
import moment from "jalali-moment";

export default function PageRegistrantBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<PageFormData>;

  const { detail } = props;

  return (
    <>
      {!!detail && (
        <>
          ثبت شده توسط: {detail?.createdBy?.fullName}
          <br />
          زمان ایجاد: {moment(detail?.createdAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}
          <br />
          آخرین ویرایش: {moment(detail?.updatedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}
          <hr />
        </>
      )}
    </>
  );
}
