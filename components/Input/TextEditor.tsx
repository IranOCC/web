import { ReactNode, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import MediaHandler from "@/components/Uploader/MediaHandler";
import MediaLibrary from "@/components/Uploader/MediaHandler/MediaLibrary";
import { StorageFile } from "@/types/interfaces";
import { LoadingWithoutBg } from "@/components/Loading";
import useAxiosAuth from "@/hooks/useAxiosAuth";

const TextEditor = (props: IProps) => {
  const { label, name, control, defaultValue, placeholder, useMediaLibrary, mediaUploadPath, mediaUploaderField = "image", disabled, loading, readOnly, error, warning, success, containerClassName = "" } = props;
  let { status, helperText } = props;
  if (error) {
    status = "error";
    helperText = error;
  } else if (warning) {
    status = "warning";
    helperText = warning;
  } else if (success) {
    status = "success";
    helperText = success;
  }

  let labelClass = "";
  if (status === "success") {
    labelClass = " text-green-500";
  } else if (status === "error") {
    labelClass = " text-red-500";
  } else if (status === "warning") {
    labelClass = " text-orange-500";
  }

  const [loader, setLoader] = useState(true);
  const [openLibrary, setOpenLibrary] = useState(false);
  const callbackInsertImage = useRef<any>(null);

  const api = useAxiosAuth();

  return (
    <>
      <div className={"relative z-10 w-full" + " " + containerClassName}>
        {loader && <LoadingWithoutBg label="بارگذاری ویرایشگر ..." />}
        {!loader && label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
        <div className="relative w-full">
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <Editor
                  apiKey="c5202p0ybgpmcrokfgwn78asoww5xabm9hxbqxxvzxwgsmhg"
                  onEditorChange={field.onChange}
                  textareaName={field.name}
                  value={field.value}
                  onInit={() => {
                    setLoader(false);
                  }}
                  init={{
                    height: 500,
                    menubar: true,
                    directionality: "rtl",
                    plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "directionality"],
                    toolbar: "insertfile undo redo | blocks | " + "image | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | ltr rtl | bullist numlist outdent indent | " + "removeformat | help |",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, }",
                    images_upload_handler: !mediaUploadPath
                      ? undefined
                      : async (blobInfo, progress) => {
                          const formData = new FormData();
                          formData.append(mediaUploaderField, blobInfo.blob(), blobInfo.filename());
                          const headers = { "Content-Type": "multipart/form-data" };
                          const { data } = await api.post(process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + mediaUploadPath, formData, { headers });
                          return process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + data.path;
                        },
                    automatic_uploads: !!mediaUploadPath,
                    paste_data_images: !!mediaUploadPath,
                    file_picker_types: "image",
                    file_picker_callback: !useMediaLibrary
                      ? undefined
                      : function (callback, value, meta) {
                          callbackInsertImage.current = callback;
                          setOpenLibrary(true);
                        },
                  }}
                  disabled={loading || disabled || readOnly}
                />
              );
            }}
            name={name}
            defaultValue={defaultValue}
          />
        </div>
        {useMediaLibrary && (
          <MediaLibrary
            //
            open={openLibrary}
            setOpen={setOpenLibrary}
            uploadPath={mediaUploadPath}
            uploaderField={mediaUploaderField}
            setSelectFiles={(data: StorageFile[]) => {
              if (disabled || loading) return;
              if (!!callbackInsertImage.current && typeof callbackInsertImage.current === "function") {
                callbackInsertImage.current(process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + data[0].path, { title: data[0].title, alt: data[0].alt });
              }
              setOpenLibrary(false);
            }}
            maxFile={1}
          />
        )}

        {helperText && <p className={"mt-1 block text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
      </div>
    </>
  );
};

export type IProps = {
  name: string;
  control: any;
  defaultValue?: string;
  label?: ReactNode;
  placeholder?: string;

  containerClassName?: string;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;

  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;

  useMediaLibrary?: boolean;
  mediaUploadPath?: string;
  mediaUploaderField?: string;
};

export default TextEditor;
