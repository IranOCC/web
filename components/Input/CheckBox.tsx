import { ReactNode } from "react";
import { Controller } from "react-hook-form";

const CheckBox = (props: IProps) => {
  const { name, control, defaultValue, className = "", label, disabled = false, loading = false, readOnly = false, error, warning, success, direction, noSpace, size = "default", containerClassName = "", onChange } = props;
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
  let inputClass = " text-secondary";
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

  return (
    <div className={"relative flex w-full flex-col items-end" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      <div className={"relative flex w-full items-center "}>
        <Controller
          render={({ field }) => {
            return (
              <>
                <input
                  //
                  type="checkbox"
                  disabled={disabled || loading}
                  readOnly={readOnly || loading}
                  className={`focus:ring-0 focus:ring-offset-0 ${disabled ? "cursor-not-allowed bg-gray-200" : "cursor-pointer bg-gray-200"} rounded border-gray-300 ${inputClass} ${className}`}
                  {...field}
                  onChange={(e) => {
                    if (disabled || readOnly || loading) return;
                    field.onChange(!field.value);
                    if (!!onChange) onChange(!field.value);
                  }}
                  checked={field.value}
                />
                {label && (
                  <label
                    //
                    onClick={() => {
                      if (disabled || readOnly || loading) return;
                      field.onChange(!field.value);
                      if (!!onChange) onChange(!field.value);
                    }}
                    className={`block w-full whitespace-nowrap text-sm font-medium text-gray-500 ms-2 text-start dark:text-white ${disabled ? "cursor-not-allowed" : "cursor-pointer"}${labelClass}`}
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

      {helperText && <p className={"mt-1 block w-full text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
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

  onChange?: (value: any) => void;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";
};

export default CheckBox;
