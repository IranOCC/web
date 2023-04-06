import { ChangeEventHandler, ReactNode } from "react";
import { Controller } from "react-hook-form";

const Input = (props: IProps) => {
  const { name, control, label, placeholder, icon, disabled = false, loading = false, readOnly = false, type = "text", error, warning, success, direction, noSpace, maxLength } = props;
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
  let bordersClass = " border-gray-300 focus:border-gray-300";
  let iconClass = " text-blue-500";
  let inputClass = " placeholder:text-gray-400 text-gray-500";
  if (status === "success") {
    labelClass = " text-green-500";
    bordersClass = " border-green-400 focus:border-green-400";
    iconClass = " text-green-500 fill-green-500";
    inputClass = " placeholder:text-green-400 text-green-500";
  } else if (status === "error") {
    labelClass = " text-red-500";
    bordersClass = " border-red-400 focus:border-red-400";
    iconClass = " text-red-500 fill-red-500";
    inputClass = " placeholder:text-red-400 text-red-500";
  } else if (status === "warning") {
    labelClass = " text-orange-500";
    bordersClass = " border-orange-400 focus:border-orange-400";
    iconClass = " text-orange-500 fill-orange-500";
    inputClass = " placeholder:text-orange-400 text-orange-500";
  }
  if (direction === "ltr") inputClass += " text-left";
  else if (direction === "rtl") inputClass += " text-right";

  return (
    <Controller
      render={({ field }) => (
        <div className={"relative z-10" + (noSpace ? " mb-0" : " mb-6")}>
          {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass}`}>{label}</label>}
          <div className="relative">
            <input
              type={type}
              disabled={disabled || loading}
              placeholder={placeholder}
              readOnly={readOnly || loading}
              maxLength={maxLength}
              className={`placeholder:text-left
              ${disabled ? "cursor-not-allowed bg-gray-200" : "bg-slate-100"}
              rounded focus:bg-white text-gray-900 focus:ring-0 focus:shadow-lg
              border${bordersClass} block flex-1 min-w-0 w-full text-sm  ${icon ? " ps-14" : ""} p-2.5 ${inputClass}
              `}
              {...field}
            />
            {icon && <span className={`absolute top-0 flex items-center justify-center h-full w-12 text-sm${iconClass} border-e${bordersClass}`}>{icon}</span>}
          </div>
          {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
        </div>
      )}
      name={name}
      control={control}
    />
  );
};

export type IProps = {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  direction?: "ltr" | "rtl";
  noSpace?: boolean;
  maxLength?: number;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
};

export default Input;
