import React, { ReactNode, useEffect, useState } from "react";
import { message, Modal, Spin, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { useSession } from "next-auth/react";
import { StorageFile } from "@/types/interfaces";
import { Session } from "next-auth";
import Dragger from "antd/es/upload/Dragger";
import Upload2Cloud from "@/components/Icons/Upload2Cloud";
import Link from "next/link";
import MediaLibrary from "./MediaLibrary";

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const MediaHandler = (props: IProps) => {
  const { name, control, defaultValue, onChange, fromLibrary, disabled = false, loading = false, label, noSpace, containerClassName = "", error, warning, success, uploadPath } = props;
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
          />
        )}

        {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
      </div>
    </>
  );
};

type FieldComponentType = {
  field?: ControllerRenderProps<FieldValues, string>;
  disabled: boolean;
  loading: boolean;
  session: Session | null;
  uploadPath: "office" | "estate" | "user" | "post" | "other";
  fromLibrary?: boolean;

  onChange?: any;
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
  } = props;

  //   const [fileListState, setFileListState] = useState<UploadFile[]>([]);
  //   useEffect(() => {
  //     if (!field.value) {
  //       setFileListState([]);
  //       return;
  //     }
  //     const item = field.value as StorageFile;
  //     const gg = {
  //       uid: item._id,
  //       name: item.alt,
  //       url: process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + item.path,
  //       status: "done",
  //     } as UploadFile;
  //     setFileListState([gg]);
  //   }, [field.value]);

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
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const [openLibrary, setOpenLibrary] = useState(false);

  return (
    <>
      <Dragger {..._props} className="w-full">
        <p className="ant-upload-drag-icon flex justify-center items-center text-blue-500">
          <Upload2Cloud />
        </p>
        <p className="ant-upload-text !text-sm font-bold">فایل ها رو به اینجا درگ کنید تا آپلود شوند یا کلیک کنید</p>
        {fromLibrary && (
          <p className="ant-upload-hint">
            یا برای افزودن از کتابخانه{" "}
            <span
              className="text-blue-500"
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
      {fromLibrary && (
        <MediaLibrary
          //
          open={openLibrary}
          setOpen={setOpenLibrary}
          uploadPath={uploadPath}
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
};

export default MediaHandler;
