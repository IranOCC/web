import React from "react";
import { Upload as UploadIcon } from "@mui/icons-material";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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

const Uploader = ({ label }: any) => (
  <>
    {label && <label className={`block ms-2 text-sm text-start font-medium text-gray-500 dark:text-white`}>{label}</label>}
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <UploadIcon />
      </p>
      <p className="ant-upload-text">فایل را برای آپلود اینجا رها کنید و یا کلیک کنید</p>
    </Dragger>
  </>
);

export default Uploader;
