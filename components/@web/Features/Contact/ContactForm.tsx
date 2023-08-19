"use client";

import { ContactFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { WebInput } from "../../Input";
import { WebButton } from "../../Button";
import { useContext, useEffect } from "react";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

const ContactForm = () => {
  const { internalPage } = useContext(WebPreviewContext) as WebPreviewContextType;

  useEffect(() => {
    internalPage();
  }, []);

  const form = useForm<ContactFormData>();
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
    register("name", {
      required: "نام خود را وارد کنید",
      minLength: {
        value: 3,
        message: "متن پیام را به درستی وارد کنید",
      },
    });
    register("phone", { required: "شماره تماس را وارد کنید" });
    register("text", {
      required: "متن پیام را وارد کنید",
      minLength: {
        value: 10,
        message: "متن پیام را به درستی وارد کنید",
      },
    });
  }, []);

  const onSubmit = (data: ContactFormData) => {
    //
  };

  return (
    <>
      {/*  */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-4 self-center">
        <WebInput
          //
          control={control}
          name="name"
          label="نام و نام خانوادگی"
          noSpace
          error={errors.name?.message}
          loading={isSubmitting}
        />
        <WebInput
          //
          control={control}
          name="phone"
          label="شماره تماس"
          direction="ltr"
          type="tel"
          noSpace
          error={errors.phone?.message}
          loading={isSubmitting}
        />
        <WebInput
          //
          control={control}
          name="text"
          label="متن پیام"
          noSpace
          multiline={true}
          lines={6}
          error={errors.text?.message}
          loading={isSubmitting}
        />
        <WebButton
          //
          type="submit"
          title="ارسال"
        />
      </form>
      {/*  */}
    </>
  );
};

export default ContactForm;
