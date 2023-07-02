import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";

const Input = (props: IProps) => {
  const {
    name,
    multiline,
    lines,
    control,
    defaultValue,
    className = "",
    label,
    placeholder,
    icon,
    disabled = false,
    loading = false,
    readOnly = false,
    type = "text",
    error,
    warning,
    success,
    direction,
    noSpace,
    maxLength,
    innerSubmitBtn,
    size = "default",
    containerClassName = "",
    tagsMode,
    noResize = false,
    onKeyUp,
  } = props;
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
  let iconClass = " text-secondary";
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

  if (icon) inputClass += " ltr:pl-14 rtl:pr-14";
  let sizeClass = " py-2.5";
  if (size === "small") sizeClass = " py-1.5";
  else if (size === "large") sizeClass = " py-4";

  if (innerSubmitBtn) {
    inputClass += " ltr:pl-32 rtl:pl-32";
  }

  const _className = `${disabled ? "cursor-not-allowed bg-gray-200" : "bg-slate-100"} rounded focus:bg-white text-gray-900 focus:ring-0 focus:shadow-lg placeholder:text-start border${bordersClass} block flex-1 min-w-0 w-full text-sm p-2.5 ${inputClass} ${sizeClass} ${className} `;
  return (
    <div className={"w-full relative z-10" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
      <div className="w-full relative">
        <Controller
          render={({ field }) => {
            const removeItem = (index: number) => {
              field.value.splice(index, 1);
              field.onChange([...field.value]);
            };
            if (tagsMode)
              return (
                <>
                  <div className={_className} style={{ height: multiline ? (lines || 4) * 25.5 + "px" : "" }} dir={direction}>
                    <div className="flex flex-wrap gap-1">
                      {
                        //
                        Array.isArray(field.value)
                          ? field.value?.map((label: string, index: number) => {
                              return (
                                <span key={index} className="cursor-default bg-secondary text-white px-2 rounded flex justify-center items-center">
                                  {label}
                                  <div className="text-slate-100 hover:text-slate-300 ps-3 cursor-pointer" onClick={() => removeItem(index)}>
                                    ×
                                  </div>
                                </span>
                              );
                            })
                          : null
                        //
                      }
                      <input
                        //
                        className={`bg-transparent ${disabled ? "cursor-not-allowed" : ""} text-gray-900 outline-none focus:outline-none block flex-1 w-full text-sm border-none min-w-[100px] ${inputClass}`}
                        disabled={disabled || loading}
                        placeholder={placeholder}
                        readOnly={readOnly || loading}
                        onKeyDown={(e) => {
                          // @ts-ignore
                          if (e.key === "Enter" && e.target?.value) {
                            e.preventDefault();
                            // @ts-ignore
                            field.onChange(field.value ? [...field.value, e.target.value] : [e.target.value]);
                            // @ts-ignore
                            e.target.value = "";
                          }
                          // @ts-ignore
                          if ((e.key === "Backspace" || e.key === "Delete") && !e.target?.value) {
                            removeItem(field.value.length - 1);
                          }
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            if (multiline)
              return (
                <textarea
                  //
                  rows={lines || 4}
                  disabled={disabled || loading}
                  placeholder={placeholder}
                  readOnly={readOnly || loading}
                  maxLength={maxLength}
                  className={_className}
                  style={{ resize: noResize ? "none" : "vertical", minHeight: "42px" }}
                  dir={direction}
                  {...field}
                  value={field.value || ""}
                  onKeyUp={onKeyUp as KeyboardEventHandler<HTMLTextAreaElement> | undefined}
                />
              );
            else
              return (
                <input
                  //
                  type={type}
                  disabled={disabled || loading}
                  placeholder={placeholder}
                  readOnly={readOnly || loading}
                  maxLength={maxLength}
                  className={_className}
                  dir={direction}
                  {...field}
                  value={field.value || ""}
                  onKeyUp={onKeyUp as KeyboardEventHandler<HTMLInputElement> | undefined}
                />
              );
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />

        {innerSubmitBtn && (
          <div className={`end-0 h-full absolute top-0 flex items-center justify-center p-2`}>
            <Button type="submit" title={innerSubmitBtn} noSpace size={"small"} className="h-full" loading={loading} disabled={disabled} />
          </div>
        )}
        {icon && <span className={`absolute top-0 flex items-center justify-center h-full w-12 text-sm${iconClass} border-e${bordersClass}`}>{icon}</span>}
      </div>
      {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
    </div>
  );
};

export type IProps = {
  name: string;
  control: any;
  defaultValue?: string;
  label?: ReactNode;
  placeholder?: string;
  type?: string;
  className?: string;
  containerClassName?: string;

  icon?: ReactNode;
  multiline?: boolean;
  lines?: number;
  noResize?: boolean;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  tagsMode?: boolean;

  direction?: "ltr" | "rtl";
  noSpace?: boolean;
  maxLength?: number;

  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  innerSubmitBtn?: string;
  size?: "small" | "default" | "large";

  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement> | KeyboardEventHandler<HTMLInputElement>;
};

export default Input;
