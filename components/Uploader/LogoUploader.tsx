import React, { ReactNode, useEffect, useState } from "react";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Modal, Spin, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { StorageFile } from "@/types/interfaces";
import Loading from "../Loading";

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
  const { name, control, defaultValue, disabled, loading, label, noSpace, containerClassName = "", error, warning, success, uploadPath } = props;
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
        <Controller
          render={({ field }) => {
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
                  accept="image/*"
                  name="file"
                  headers={{ Authorization: `Bearer ${session?.accessToken}` }}
                  action={process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + uploadPath}
                  listType="picture-circle"
                  className="logo-uploader"
                  multiple={false}
                  showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                  fileList={fileListState}
                  onChange={({ fileList, file, event }) => {
                    setFileListState(fileList);
                    if (file.status === "removed") {
                      field.onChange(undefined);
                    } else if (file.status === "done") {
                      setTimeout(() => {
                        field.onChange(file.response);
                      }, 1000);
                    }
                  }}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  disabled={disabled || loading}
                >
                  {!!fileListState?.length ? null : <div>{label}</div>}
                </Upload>
              </>
            );
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />
        {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
      </div>
    </>
  );
};

export type IProps = {
  name: string;
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

  uploadPath: "offices" | "estates" | "users" | "posts" | "others";
};

export default LogoUploader;
