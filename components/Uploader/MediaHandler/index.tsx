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
  const { name, control, defaultValue, indexFileName, showUploadList = true, showFilesList = false, onChange, fromLibrary, disabled = false, loading = false, label, noSpace, containerClassName = "", error, warning, success, uploadPath } = props;
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

  const indexFileControl = useController({ control, name: indexFileName || "image" });

  return (
    <>
      <div className={"w-full relative z-10 flex flex-col items-center justify-center" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
        {!!control && !!name ? (
          <Controller
            render={({ field }) => (
              <FieldComponent
                //
                field={field}
                disabled={disabled}
                loading={loading}
                session={session}
                uploadPath={uploadPath}
                fromLibrary={fromLibrary}
                showUploadList={showUploadList}
                showFilesList={showFilesList}
                indexFileControl={(indexFileName && indexFileControl) || undefined}
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
            fromLibrary={fromLibrary}
            onChange={onChange}
            showUploadList={showUploadList}
            showFilesList={showFilesList}
          />
        )}

        {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
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
  uploadPath: "office" | "estate" | "user" | "post" | "other";
  fromLibrary?: boolean;

  onChange?: any;
  showUploadList?: boolean;
  showFilesList?: boolean;
};

const FieldComponent = (props: FieldComponentType) => {
  const {
    //
    field,
    session,
    uploadPath,
    disabled,
    loading,
    fromLibrary = true,
    onChange,
    showUploadList,
    showFilesList,
    indexFileControl,
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
    name: "file",
    multiple: true,
    action: process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + uploadPath,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        toast.warning(`${info.file.name} در حال آپلود ...`);
      }
      if (status === "done") {
        toast.success(`${info.file.name} با موفقیت آپلود شد`);
        if (onChange) onChange([info.file.response]);
        if (field?.onChange) field.onChange(!!field.value?.length ? [...field.value, info.file.response] : [info.file.response]);
      } else if (status === "error") {
        toast.error(`${info.file.name} آپلود نشد`);
      }
      setFileListState(info.fileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false,
  };

  const [openLibrary, setOpenLibrary] = useState(false);

  return (
    <>
      {showFilesList && field?.value && (
        <div className="relative w-full mb-2 max-h-96 overflow-x-hidden">
          {/*  */}
          <div className="grid grid-cols-3 gap-2">
            {(field?.value as StorageFile[]).map((item, index) => {
              const isMain =
                !!indexFileControl?.field.value && typeof indexFileControl?.field.value === "string"
                  ? //
                    indexFileControl?.field.value === item._id
                  : //
                    indexFileControl?.field.value?._id === item._id;
              return (
                <>
                  <div key={index} className="relative overflow-hidden aspect-square min-h-max cursor-pointer">
                    <Image
                      //
                      fill
                      src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + item.path}
                      alt={item.alt}
                      title={item.title}
                    />

                    <div className="absolute flex justify-center items-center bg-black/40 w-full h-full transition-opacity opacity-0 hover:opacity-100">
                      {/*  */}
                      {!isMain && (
                        <div onClick={() => indexFileControl?.field.onChange(item)} className="border bg-white text-yellow-300 px-1 border-yellow-300 rounded w-auto">
                          شاخص شود؟
                        </div>
                      )}
                      {/*  */}
                    </div>

                    <Cancel
                      //
                      onClick={() => {
                        field.value.splice(index, 1);
                        field.onChange([...field.value]);
                      }}
                      className="absolute text-red-500 top-1 right-1 cursor-pointer hover:text-gray-500"
                    />
                    {!!isMain && (
                      <Tooltip title="شاخص">
                        <Star
                          //
                          onClick={() => {
                            field.value.splice(index, 1);
                            field.onChange([...field.value]);
                          }}
                          className="absolute text-yellow-300 bottom-1 left-1"
                        />
                      </Tooltip>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          {/*  */}
        </div>
      )}
      <Dragger {..._props} className="w-full">
        <p className="ant-upload-drag-icon flex justify-center items-center text-secondary">
          <Upload2Cloud />
        </p>
        <p className="ant-upload-text !text-sm font-bold">فایل ها رو به اینجا درگ کنید تا آپلود شوند یا کلیک کنید</p>
        {fromLibrary && (
          <p className="ant-upload-hint">
            یا برای افزودن از کتابخانه{" "}
            <span
              className="text-secondary"
              onClick={(e) => {
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
        <div className="w-full mt-1 relative flex flex-col max-h-32 gap-1 overflow-x-hidden">
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
                  <div className={"flex items-center cursor-pointer rounded bg-slate-100 hover:bg-slate-200 p-1 " + iconColor + uploadingClass}>
                    {/*  */}
                    <i className="w-6 h-6">
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
            if (onChange) onChange(data);
            if (field?.onChange) field.onChange(!!field.value?.length ? [...field.value, ...data] : [...data]);
            setOpenLibrary(false);
          }}
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

  uploadPath: "office" | "estate" | "user" | "post" | "other";
  fromLibrary?: boolean;

  onChange?: any;
  showUploadList?: boolean;
  showFilesList?: boolean;
  indexFileName?: string;
};

export default MediaHandler;
