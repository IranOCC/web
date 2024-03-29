import React, { ReactNode, useEffect, useState } from "react";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Modal, Spin, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { useSession } from "next-auth/react";
import { StorageFile } from "@/types/interfaces";

import { Session } from "next-auth";

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

const LogoUploader = (props: IProps) => {
  const { name, body, uploaderField, control, defaultValue, disabled = false, loading = false, label, noSpace, containerClassName = "", error, warning, success, uploadPath } = props;
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
      <div className={"relative z-20 flex w-full flex-col items-center justify-center" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        <Controller
          render={({ field }) => (
            <FieldComponent
              //
              field={field}
              disabled={disabled}
              loading={loading}
              session={session}
              label={label}
              uploaderField={uploaderField}
              uploadPath={uploadPath}
              body={body}
            />
          )}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />
        {helperText && <p className={"mt-1 block text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
      </div>
    </>
  );
};

type FieldComponentType = {
  field: ControllerRenderProps<FieldValues, string>;
  disabled: boolean;
  loading: boolean;
  label?: string;
  uploaderField: string;
  session: Session | null;
  uploadPath: string;
  body?: any;
};

const FieldComponent = (props: FieldComponentType) => {
  const {
    //
    label,
    field,
    session,
    uploadPath,
    uploaderField,
    disabled,
    loading,
    body,
  } = props;

  const [fileListState, setFileListState] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (!field.value) {
      setFileListState([]);
      return;
    }
    const item = field.value as StorageFile;
    const gg = {
      uid: item._id,
      name: item.alt,
      url: process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + item.path,
      status: "done",
    } as UploadFile;
    setFileListState([gg]);
  }, [field.value]);

  return (
    <>
      <Upload
        //
        accept=".jpg, .jpeg, .png"
        name={uploaderField}
        headers={{ Authorization: `Bearer ${session?.accessToken}` }}
        data={body}
        action={process.env.NEXT_PUBLIC_BASE_URL + "/" + uploadPath}
        listType="picture-circle"
        className="logo-uploader"
        multiple={false}
        showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
        fileList={fileListState}
        onChange={({ fileList, file, event }) => {
          setFileListState(fileList);
          if (file.status === "removed") {
            field.onChange(null);
          } else if (file.status === "done") {
            setTimeout(() => {
              field.onChange(file.response);
            }, 1000);
          }
        }}
        beforeUpload={beforeUpload}
        maxCount={1}
        disabled={disabled || loading}
        locale={{
          uploading: "در حال آپلود",
          uploadError: "خطا در آپلود",
          removeFile: "حذف",
          downloadFile: "دانلود",
          previewFile: "نمایش",
        }}
      >
        {!!fileListState?.length ? null : <div>{label}</div>}
      </Upload>
    </>
  );
};

export type IProps = {
  name: string;
  uploaderField: string;
  control: any;
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
  body?: any;
};

export default LogoUploader;
