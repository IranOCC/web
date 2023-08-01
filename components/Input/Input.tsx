import { KeyboardEventHandler, ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";
import { NumericFormat, PatternFormat } from "react-number-format";

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
    submitIcon,
    size = "default",
    containerClassName = "",
    tagsMode,
    noResize = false,
    onKeyUp,
    onKeyDown,
    numericFormatProps,
    patternFormatProps,
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

  if (!!innerSubmitBtn) {
    inputClass += " ltr:pl-32 rtl:pl-32";
  }
  if (!!submitIcon) {
    inputClass += " ltr:pl-8 rtl:pl-8";
  }

  const _className = `${disabled ? "cursor-not-allowed bg-gray-200" : "bg-gray-100"} rounded overflow-x-hidden focus:bg-white text-gray-900 focus:ring-0 focus:shadow-lg placeholder:text-start border${bordersClass} block flex-1 min-w-0 w-full text-sm p-2.5 ${inputClass} ${sizeClass} ${className} `;
  return (
    <div className={"relative z-10 w-full" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      {label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
      <div className="relative w-full">
        <Controller
          render={({ field }) => {
            const removeItem = (index: number) => {
              if (disabled || loading || readOnly) return;
              field.value.splice(index, 1);
              field.onChange([...field.value]);
            };
            if (tagsMode) {
              return (
                <>
                  <div className={_className} style={{ height: multiline ? (lines || 4) * 30 + "px" : "" }} dir={direction}>
                    <div className="flex flex-wrap gap-1">
                      {
                        //
                        Array.isArray(field.value)
                          ? field.value?.map((label: string, index: number) => {
                              return (
                                <span key={index} className={"flex  cursor-default items-center justify-center rounded px-2 text-white" + (disabled || loading || readOnly ? " bg-disable" : " bg-secondary")}>
                                  {label}
                                  {!(disabled || loading || readOnly) && (
                                    <div className="cursor-pointer text-gray-100 ps-3 hover:text-gray-300" onClick={() => removeItem(index)}>
                                      ×
                                    </div>
                                  )}
                                </span>
                              );
                            })
                          : null
                        //
                      }
                      <input
                        //
                        // enterKeyHint="enter"
                        type="search"
                        className={`bg-transparent p-0 !ring-0 ${disabled ? "cursor-not-allowed" : ""} block w-full min-w-[100px] flex-1 border-none text-sm text-gray-900 outline-none focus:outline-none ${inputClass}`}
                        disabled={disabled || loading}
                        placeholder={placeholder}
                        readOnly={readOnly || loading}
                        ref={field.ref}
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
                          if (field.value?.length && (e.key === "Backspace" || e.key === "Delete") && !e.target?.value) {
                            removeItem(field.value?.length - 1);
                          }
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            }
            if (multiline) {
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
                  onKeyDown={onKeyDown as KeyboardEventHandler<HTMLTextAreaElement> | undefined}
                />
              );
            }
            if (!!numericFormatProps) {
              return (
                <NumericFormat
                  //
                  disabled={disabled || loading}
                  placeholder={placeholder}
                  readOnly={readOnly || loading}
                  maxLength={maxLength}
                  className={_className}
                  dir={direction}
                  getInputRef={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={field.value || ""}
                  onKeyUp={onKeyUp as KeyboardEventHandler<HTMLInputElement> | undefined}
                  onKeyDown={onKeyDown as KeyboardEventHandler<HTMLInputElement> | undefined}
                  // props
                  {...numericFormatProps}
                />
              );
            }
            if (!!patternFormatProps) {
              return (
                <PatternFormat
                  //
                  disabled={disabled || loading}
                  placeholder={placeholder}
                  readOnly={readOnly || loading}
                  maxLength={maxLength}
                  className={_className}
                  dir={direction}
                  getInputRef={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={field.value || ""}
                  onKeyUp={onKeyUp as KeyboardEventHandler<HTMLInputElement> | undefined}
                  onKeyDown={onKeyDown as KeyboardEventHandler<HTMLInputElement> | undefined}
                  // props
                  format="#"
                  {...patternFormatProps}
                />
              );
            } else {
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
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={field.value || ""}
                  onKeyUp={onKeyUp as KeyboardEventHandler<HTMLInputElement> | undefined}
                  onKeyDown={onKeyDown as KeyboardEventHandler<HTMLInputElement> | undefined}
                />
              );
            }
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />

        {innerSubmitBtn && (
          <div className={`absolute top-0 flex h-full items-center justify-center p-2 end-0`}>
            <Button type="submit" title={innerSubmitBtn} noSpace size={"small"} className="h-full" loading={loading} disabled={disabled} />
          </div>
        )}
        {submitIcon && (
          <div className={`absolute top-0 flex h-full items-center justify-center p-2 end-0`}>
            <button type="submit">{submitIcon}</button>
          </div>
        )}
        {icon && <span className={`absolute top-0 flex h-full w-12 items-center justify-center text-sm${iconClass} border-e${bordersClass}`}>{icon}</span>}
      </div>
      {helperText && <p className={"mt-1 block text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
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
  submitIcon?: ReactNode;
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
  priceFormat?: boolean;
  numericFormatProps?: {};
  patternFormatProps?: {};

  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement> | KeyboardEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | KeyboardEventHandler<HTMLInputElement>;
};

export default Input;
