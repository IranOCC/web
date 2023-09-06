import MediaHandler from "@/components/Uploader/MediaHandler";
import { EstateFormData } from "@/types/formsData";
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

  return (
    <>
      <MediaHandler
        //
        name="gallery"
        control={control}
        uploadPath="property"
        uploaderField="image"
        indexFileName="image"
        noSpace
        fromLibrary={false}
        showFilesList
        showUploadList
      />
    </>
  );
};
