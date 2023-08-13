import { ContactFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { WebInput } from "../../Input";
import { WebButton } from "../../Button";

const ContactForm = () => {
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

  return (
    <>
      <div className="flex w-full max-w-md flex-col gap-4 self-center px-4">
        {/*  */}
        <WebInput
          //
          control={control}
          name="name"
          label="نام و نام خانوادگی"
          noSpace
        />
        <WebInput
          //
          control={control}
          name="phone"
          label="شماره تماس"
          noSpace
        />
        <WebInput
          //
          control={control}
          name="text"
          label="متن پیام"
          noSpace
          multiline={true}
          lines={6}
        />
        <WebButton
          //
          title="ارسال"
        />
        {/*  */}
      </div>
    </>
  );
};

export default ContactForm;
