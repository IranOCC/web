import { ReactNode } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const TextEditor = (props: IProps) => {
  const { label, name, control, defaultValue, placeholder, disabled, loading, readOnly, error, warning, success, containerClassName = "" } = props;
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

  return (
    <>
      <div className={"w-full relative z-10" + " " + containerClassName}>
        {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
        <div className="w-full relative">
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <Editor
                  apiKey={"c5202p0ybgpmcrokfgwn78asoww5xabm9hxbqxxvzxwgsmhg"}
                  onEditorChange={field.onChange}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "directionality"],
                    toolbar: "undo redo | blocks | " + "image | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | ltr rtl | bullist numlist outdent indent | " + "removeformat | help |",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, }",
                  }}
                />
              );
            }}
            name={name}
            defaultValue={defaultValue}
          />
        </div>
        {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
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
};

export default TextEditor;
