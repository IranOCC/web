import MediaHandler from "@/components/Uploader/MediaHandler";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export const ImageGallery = ({ form }: { form: UseFormReturn<EstateFormData, any, undefined> }) => {
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
    register("image", {required: "لطفا تصویر را وارد کنید"})
  },[])

  return (
    <>
      <MediaHandler
        //
        name="gallery"
        control={control}
        uploadPath="property"
        uploaderField="image"
        indexFileName="image"
        error={errors.image?.message}
        noSpace
        fromLibrary={false}
        showFilesList
        showUploadList
      />
    </>
  );
};
