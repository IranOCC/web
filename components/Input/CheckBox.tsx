import { ChangeEventHandler, ReactNode, useRef } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CheckBox = (props: IProps) => {
  const { name, control, defaultValue = false, className = "", label, disabled = false, loading = false, readOnly = false, error, warning, success, direction, noSpace, size = "default", containerClassName = "" } = props;
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
  let inputClass = " text-blue-500";
  if (status === "success") {
    labelClass = " text-green-500";
    inputClass = " text-green-500";
  } else if (status === "error") {
    labelClass = " text-red-500";
    inputClass = " text-red-500";
  } else if (status === "warning") {
    labelClass = " text-orange-500";
    inputClass = " text-orange-500";
  }

  // if (icon) inputClass += " ltr:pl-14 rtl:pr-14";
  let sizeClass = " ";
  // if (size === "small") sizeClass = " py-1.5";
  // else if (size === "large") sizeClass = " py-4";

  return (
    <div className={"w-full relative z-10" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      <div className={"w-full relative flex items-center "}>
        <Controller
          render={({ field }) => {
            return (
              <>
                <input
                  //
                  type="checkbox"
                  disabled={disabled || loading}
                  readOnly={readOnly || loading}
                  className={`focus:ring-0 focus:ring-offset-0 ${disabled ? "cursor-not-allowed" : "cursor-pointer"} border-gray-300 rounded ${inputClass} ${className}`}
                  {...field}
                  checked={field.value}
                />
                {label && (
                  <label
                    //
                    onClick={() => {
                      if (disabled || readOnly) return;
                      field.onChange(!field.value);
                    }}
                    className={`block ms-2 text-sm text-start font-medium text-gray-500 dark:text-white ${disabled ? "cursor-not-allowed" : "cursor-pointer"}${labelClass}`}
                  >
                    {label}
                  </label>
                )}
              </>
            );
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />
      </div>

      {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
    </div>
  );
};

export type IProps = {
  name: string;
  control: any;
  defaultValue?: boolean;
  label?: string;
  className?: string;
  containerClassName?: string;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  direction?: "ltr" | "rtl";
  noSpace?: boolean;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";
};

export default CheckBox;
