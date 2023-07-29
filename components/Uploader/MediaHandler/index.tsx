import React, { ReactNode, useEffect, useState } from "react";
import { message, Modal, Spin, Tooltip, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Controller, ControllerRenderProps, FieldValues, useController, UseControllerReturn } from "react-hook-form";
import { useSession } from "next-auth/react";
import { StorageFile } from "@/types/interfaces";
import { Session } from "next-auth";
import Upload2Cloud from "@/components/Icons/Upload2Cloud";
import MediaLibrary from "./MediaLibrary";
import { toast } from "@/lib/toast";
import LinkOutlineIcon from "@/components/Icons/LinkOutline";
import TickIcon from "@/components/Icons/TickIcon";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import ErrorIcon from "@/components/Icons/ErrorIcon";
import Image from "next/image";
import { Cancel, Star } from "@mui/icons-material";

const MediaHandler = (props: IProps) => {
  const { name, control, defaultValue, maxFile, indexFileName, showUploadList = true, showFilesList = false, onChange, uploaderField = "image", fromLibrary, disabled = false, loading = false, label, noSpace, containerClassName = "", error, warning, success, uploadPath } = props;
  let { status, helperText } = props;

  const { data: session } = useSession();

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

  return (
    <>
      <div className={"relative z-10 flex w-full flex-col items-center justify-center" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
        {!!control && !!name ? (
          <Controller
            render={({ field }) => (
              <FieldComponentWithController
                //
                field={field}
                disabled={disabled}
                loading={loading}
                session={session}
                uploadPath={uploadPath}
                uploaderField={uploaderField}
                fromLibrary={fromLibrary}
                showUploadList={showUploadList}
                showFilesList={showFilesList}
                control={control}
                indexFileName={indexFileName}
                maxFile={maxFile}
              />
            )}
            defaultValue={defaultValue}
            name={name}
            control={control}
          />
        ) : (
          <FieldComponent
            //
            disabled={disabled}
            loading={loading}
            session={session}
            uploadPath={uploadPath}
            uploaderField={uploaderField}
            fromLibrary={fromLibrary}
            onChange={onChange}
            showUploadList={showUploadList}
            showFilesList={showFilesList}
            maxFile={maxFile}
          />
        )}

        {helperText && <p className={"mt-1 block text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
      </div>
    </>
  );
};

type FieldComponentType = {
  field?: ControllerRenderProps<FieldValues, string>;
  indexFileControl?: UseControllerReturn<FieldValues, string>;
  disabled: boolean;
  loading: boolean;
  session: Session | null;
  uploadPath: string;
  fromLibrary?: boolean;

  uploaderField: string;

  onChange?: any;
  showUploadList?: boolean;
  showFilesList?: boolean;

  maxFile?: number;
};

const FieldComponentWithController = (props: FieldComponentType & { control: any; indexFileName?: string }) => {
  const { control, indexFileName, ...otherProps } = props;
  const indexFileControl = useController({ control, name: indexFileName || "image" });

  return <FieldComponent indexFileControl={indexFileControl} {...otherProps} />;
};

const FieldComponent = (props: FieldComponentType) => {
  const {
    //
    field,
    session,
    uploadPath,
    uploaderField,
    disabled,
    loading,
    fromLibrary = true,
    onChange,
    showUploadList,
    showFilesList,
    indexFileControl,
    maxFile,
  } = props;

  useEffect(() => {
    if (indexFileControl) {
      if (!!field?.value?.length) {
        indexFileControl.field.onChange(field.value[0]);
      } else {
        indexFileControl.field.onChange(undefined);
      }
    }
  }, [field?.value]);

  const [fileListState, setFileListState] = useState<UploadFile[]>([]);

  const { Dragger } = Upload;

  const _props: UploadProps = {
    accept: "image/*",
    name: uploaderField,
    multiple: maxFile !== 1,
    action: process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + uploadPath,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    onChange(info) {
      if (disabled || loading) return;
      const { status } = info.file;
      if (status !== "uploading") {
        toast.warning(`${info.file.name} در حال آپلود ...`);
      }
      if (status === "done") {
        toast.success(`${info.file.name} با موفقیت آپلود شد`);
        if (onChange) onChange([info.file.response]);
        if (field?.onChange) {
          const d = !!field.value?.length ? [...field.value, info.file.response] : [info.file.response];
          if (maxFile && d.length > maxFile) field.onChange(d.slice(-1 * maxFile));
          else field.onChange(d);
        }
      } else if (status === "error") {
        toast.error(`${info.file.name} آپلود نشد`);
      }
      setFileListState(info.fileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false,
    disabled: disabled || loading,
    maxCount: maxFile,
    locale: {
      uploading: "در حال آپلود",
      uploadError: "خطا در آپلود",
      removeFile: "حذف",
      downloadFile: "دانلود",
      previewFile: "نمایش",
    },
  };

  const [openLibrary, setOpenLibrary] = useState(false);

  return (
    <>
      {showFilesList && field?.value && (
        <div className={"relative mb-2 w-full" + (!maxFile || maxFile > 3 ? " max-h-96 overflow-x-hidden" : "")}>
          {/*  */}
          <div className={"grid gap-2" + (!maxFile || maxFile >= 3 ? " grid-cols-3" : maxFile === 2 ? " grid-cols-2" : " grid-cols-1")}>
            {(field?.value as StorageFile[])?.map((item, index) => {
              const isMain =
                !!indexFileControl?.field.value && typeof indexFileControl?.field.value === "string"
                  ? //
                    indexFileControl?.field.value === item._id
                  : //
                    indexFileControl?.field.value?._id === item._id;
              return (
                <div key={index} className="relative aspect-square min-h-max cursor-pointer overflow-hidden">
                  <Image
                    //
                    fill
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + item.path}
                    alt={item.alt}
                    title={item.title}
                  />

                  {!!(disabled || loading) ? (
                    <>
                      {!!indexFileControl && !!isMain && (
                        <>
                          <Star className="absolute bottom-1 left-1 text-yellow-300" />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {!!indexFileControl && (
                        <div className="absolute flex h-full w-full items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                          {/*  */}
                          {!isMain && (
                            <div onClick={() => indexFileControl?.field.onChange(item)} className="w-auto rounded border border-yellow-300 bg-white px-1 text-yellow-300">
                              شاخص شود؟
                            </div>
                          )}
                          {/*  */}
                        </div>
                      )}
                      <Cancel
                        //
                        onClick={() => {
                          if (disabled || loading) return;
                          field.value.splice(index, 1);
                          field.onChange([...field.value]);
                        }}
                        className="absolute right-1 top-1 cursor-pointer text-red-500 hover:text-gray-500"
                      />
                      {!!indexFileControl && !!isMain && (
                        <Tooltip title="شاخص">
                          <Star className="absolute bottom-1 left-1 text-yellow-300" />
                        </Tooltip>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {/*  */}
        </div>
      )}
      <Dragger {..._props} className="h-40 w-full">
        <p className="ant-upload-drag-icon flex items-center justify-center text-secondary">
          <Upload2Cloud />
        </p>
        <p className="ant-upload-text !text-sm font-bold">فایل ها رو به اینجا درگ کنید تا آپلود شوند یا کلیک کنید</p>
        {fromLibrary && (
          <p className="ant-upload-hint">
            یا برای افزودن از کتابخانه{" "}
            <span
              className={disabled || loading ? "text-disable" : "text-secondary"}
              onClick={(e) => {
                if (disabled || loading) return;
                e.stopPropagation();
                setOpenLibrary(true);
              }}
            >
              کلیک کنید
            </span>
            {/*  */}
          </p>
        )}
      </Dragger>
      {showUploadList && !!fileListState.length && (
        <div className="relative mt-1 flex max-h-64 w-full flex-col gap-1 overflow-x-hidden">
          {fileListState.map((item, idx) => {
            let iconColor = "text-gray-500";
            let StatusIcon = LinkOutlineIcon;
            let statusText = "نامشخص";
            let uploadingClass = " border-b-2 border-gray-500";
            if (item.status === "uploading") {
              iconColor = "text-orange-500";
              StatusIcon = LoadingIcon;
              statusText = "در حال آپلود ...";
              uploadingClass = " border-b-2 border-orange-500";
            } else if (item.status === "success") {
              iconColor = "text-green-500";
              StatusIcon = TickIcon;
              statusText = "آپلود با موفقیت انجام شده";
              uploadingClass = " border-b-2 border-green-500";
            } else if (item.status === "error") {
              iconColor = "text-red-500";
              StatusIcon = ErrorIcon;
              statusText = "آپلود با خطا روبرو شده";
              uploadingClass = " border-b-2 border-red-500";
            } else if (item.status === "done") {
              iconColor = "text-green-500";
              StatusIcon = TickIcon;
              statusText = "آپلود کامل شد";
              uploadingClass = " border-b-2 border-green-500";
            }

            return (
              <>
                <Tooltip title={statusText}>
                  <div className={"flex cursor-pointer items-center rounded bg-gray-100 p-1 hover:bg-gray-200 " + iconColor + uploadingClass}>
                    {/*  */}
                    <i className={"h-6 w-6 " + (item.status === "uploading" && " animate-spin")}>
                      <StatusIcon />
                    </i>
                    <span className="text-black ms-1">{item.name}</span>
                  </div>
                </Tooltip>
              </>
            );
          })}
        </div>
      )}
      {fromLibrary && (
        <MediaLibrary
          //
          open={openLibrary}
          setOpen={setOpenLibrary}
          uploadPath={uploadPath}
          setSelectFiles={(data: StorageFile[]) => {
            if (disabled || loading) return;
            if (onChange) onChange(data);
            if (field?.onChange) {
              const d = !!field.value?.length ? [...field.value, ...data] : [...data];
              if (maxFile && d.length > maxFile) field.onChange(d.slice(-1 * maxFile));
              else field.onChange(d);
            }
            setOpenLibrary(false);
          }}
          maxFile={maxFile}
        />
      )}
    </>
  );
};

export type IProps = {
  name?: string;
  control?: any;
  defaultValue?: StorageFile;
  label?: string;
  className?: string;
  containerClassName?: string;

  disabled?: boolean;
  loading?: boolean;

  noSpace?: boolean;
  size?: "small" | "default" | "large";

  status?: "success" | "error" | "warning";
  helperText?: ReactNode;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;

  uploadPath: string;
  uploaderField?: string;
  fromLibrary?: boolean;

  onChange?: any;
  showUploadList?: boolean;
  showFilesList?: boolean;
  indexFileName?: string;
  maxFile?: number;
};

export default MediaHandler;
