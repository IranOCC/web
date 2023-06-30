import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";
import BaseDatePicker from "react-multi-date-picker";
import jalali from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const DateTimePicker = (props: IProps) => {
  const { name, control, defaultValue, className = "", label, placeholder, icon, disabled = false, loading = false, readOnly = false, error, warning, success, direction, noSpace, innerSubmitBtn, size = "default", containerClassName = "" } = props;
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
            return (
              <>
                <BaseDatePicker
                  //
                  format="YYYY/MM/DD HH:mm:ss"
                  name={name}
                  placeholder={placeholder}
                  inputClass={_className}
                  containerClassName="z-20 w-full"
                  disabled={disabled || loading}
                  readOnly={readOnly || loading}
                  arrow={false}
                  style={{ direction: "ltr" }}
                  editable={false}
                  value={field.value}
                  onChange={(v) => {
                    field.onChange((v as any).unix * 1000);
                  }}
                  calendar={jalali}
                  locale={persian_fa}
                  weekDays={["ش", "ی", "د", "س", "چ", "پ", "ج"]}
                  shadow={false}
                  plugins={[<TimePicker key="tpicker" position="left" />]}
                  mapDays={({ date }) => {
                    let props: any = {};
                    let isWeekend = date.weekDay.index === 6;
                    if (isWeekend) props.className = "highlight highlight-red";
                    return props;
                  }}
                  hideOnScroll
                  inputMode="none"
                  showOtherDays
                />
              </>
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
  defaultValue?: string | Date | number;
  label?: ReactNode;
  placeholder?: string;
  type?: string;
  className?: string;
  containerClassName?: string;

  icon?: ReactNode;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;

  direction?: "ltr" | "rtl";
  noSpace?: boolean;

  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  innerSubmitBtn?: string;
  size?: "small" | "default" | "large";
};

export default DateTimePicker;
