import { BlogPostFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";
import MediaHandler from "@/components/Uploader/MediaHandler";

export default function BlogPostMediaBox({ form, loading }: AddEditComponentProps) {
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
  } = form as UseFormReturn<BlogPostFormData>;

  useEffect(() => {
    register("image");
  }, []);

  return (
    <>
      <PanelCard title="رسانه" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          {/*  */}
          {}
          <MediaHandler
            //
            name="image"
            control={control}
            uploadPath="blog"
            uploaderField="images"
            // indexFileName="image"
            noSpace
            fromLibrary
            showFilesList
            showUploadList
          />
          {/*  */}
        </div>
      </PanelCard>
    </>
  );
}
