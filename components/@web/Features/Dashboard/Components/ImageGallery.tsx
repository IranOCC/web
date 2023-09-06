import Upload2Cloud from "@/components/Icons/Upload2Cloud";
import MediaHandler from "@/components/Uploader/MediaHandler";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Upload, UploadFile, UploadProps } from "antd";
import { useSession } from "next-auth/react";
import { Key, useState, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const { Dragger } = Upload;

export const ImageGallery = ({ form }: { form: UseFormReturn<EstateFormData, any, undefined> }) => {
  const { data: session } = useSession();

  const maxFile = 25;

  const [fileListState, setFileListState] = useState<UploadFile[]>([]);

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
  // const _props: UploadProps = {
  //   accept: "image/*",
  //   name: "image",
  //   multiple: maxFile > 1,
  //   action: process.env.NEXT_PUBLIC_BASE_URL + "/storage/property",
  //   headers: { Authorization: `Bearer ${session?.accessToken}` },
  //   onChange(info) {
  //     // if (disabled || loading) return;
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       toast.warning(`${info.file.name} در حال آپلود ...`);
  //     }
  //     if (status === "done") {
  //       toast.success(`${info.file.name} با موفقیت آپلود شد`);
  //       if (onChange) onChange([info.file.response]);
  //       if (field?.onChange) {
  //         const d = !!field.value?.length ? [...field.value, info.file.response] : [info.file.response];
  //         if (maxFile && d.length > maxFile) field.onChange(d.slice(-1 * maxFile));
  //         else field.onChange(d);
  //       }
  //     } else if (status === "error") {
  //       toast.error(`${info.file.name} آپلود نشد`);
  //     }
  //     setFileListState(info.fileList);
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  //   // disabled: disabled || loading,
  //   showUploadList: false,
  //   maxCount: maxFile,
  //   locale: {
  //     uploading: "در حال آپلود",
  //     uploadError: "خطا در آپلود",
  //     removeFile: "حذف",
  //     downloadFile: "دانلود",
  //     previewFile: "نمایش",
  //   },
  // };

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
      {/* <div className="grid h-full w-full grid-cols-1 content-between justify-center gap-3">
        <ScrollShadow hideScrollBar className="flex justify-center">
          <Chip
            //
            color="default"
            variant="flat"
          >
            هیچ تصویری انتخاب نشده است
          </Chip>
        </ScrollShadow>
        <Dragger {..._props} className="grid h-full w-full gap-1">
          <p className="ant-upload-drag-icon flex items-center justify-center text-secondary">
            <Upload2Cloud />
          </p>
          <p className="ant-upload-text !text-sm font-bold">تصاویر رو به اینجا درگ کنید تا آپلود شوند یا کلیک کنید</p>
          <Chip
            //
            color="secondary"
            variant="flat"
          >
            آپلود تصاویر
          </Chip>
        </Dragger>
      </div> */}
    </>
  );
};
