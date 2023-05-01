import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Grow, Paper, Popper, PopperPlacementType } from "@mui/material";
import { ChangeEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";
import ArrowDownIcon from "../Icons/ArrowDown";

const Select = (props: IProps) => {
  const { name, control, defaultValue = "", className = "", label, placeholder, icon, disabled = false, loading = false, readOnly = false, error, warning, success, direction, noSpace, size = "default", items, apiPath, multiple } = props;
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

  // ===>
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [dataList, setDataList] = useState<DataType[]>([]);

  const api = useAxiosAuth();
  const getItems = async () => {
    try {
      const data = await api.get(apiPath!);
      const _items = data.data;
      if (Array.isArray(_items)) setDataList(_items);
      else setDataList(Object.keys(_items).map((value) => ({ value: value, title: _items[value] } as DataType)));
    } catch (error) {}
  };
  useEffect(() => {
    if (!items && apiPath) getItems();
    else if (items) setDataList(items);
    else setDataList([]);
  }, []);

  return (
    <div className={"w-full relative z-20" + (noSpace ? " mb-0" : " mb-6")}>
      {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass}`}>{label}</label>}
      <div className="w-full relative" ref={anchorRef}>
        <Controller
          render={({ field }) => {
            return (
              <>
                <input
                  type="text"
                  disabled={disabled || loading}
                  placeholder={placeholder}
                  // readOnly={readOnly || loading}
                  readOnly={true}
                  className={`placeholder:text-left
              ${disabled ? "cursor-not-allowed bg-gray-200" : "cursor-default bg-slate-100"}
              rounded focus:bg-white text-gray-900 focus:ring-0 focus:shadow-lg
              placeholder:text-start
              border${bordersClass} block flex-1 min-w-0 w-full text-sm p-2.5 ${inputClass} ${sizeClass} ${className}
              `}
                  dir={direction}
                  name={field.name}
                  value={
                    multiple
                      ? dataList
                          .filter((e) => field.value.includes(e.value))
                          .map((m) => m.title)
                          .join(", ")
                      : dataList.filter((e) => e.value === field.value)[0]?.title
                  }
                  onFocus={(e) => setOpen(true)}
                  onBlur={(e) => {
                    setOpen(false);
                    field.onBlur();
                  }}
                />
                <Popper open={open} anchorEl={anchorRef.current} placement={"bottom-end"} transition disablePortal style={{ width: "100%" }}>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: "right top",
                      }}
                    >
                      <Paper style={{ boxShadow: "none" }}>
                        <div className="z-10 bg-white w-full border mt-1">
                          <ul className="text-sm text-gray-700 dark:text-gray-200 ">
                            {dataList.map(({ title, value }, index) => {
                              return (
                                <SelectOption
                                  //
                                  title={title}
                                  key={index}
                                  selected={multiple ? field.value.includes(value) : value === field.value}
                                  onClick={() => {
                                    if (multiple) {
                                      if (field.value.includes(value)) {
                                        field.onChange(field.value.filter((item: any) => item !== value));
                                      } else field.onChange([...field.value, value]);
                                    } else field.onChange(value);
                                  }}
                                />
                              );
                            })}
                            {dataList.length === 0 && <SelectOption title="دیتا یافت نشد" key={-1} selected={false} />}
                          </ul>
                        </div>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            );
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}

          // onFocus={handleFocus}
        />
        <span className={`absolute top-0 end-0 text-blue-600  flex items-center justify-center h-full w-12 text-md ms-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
          <ArrowDownIcon />
        </span>
        {icon && <span className={`absolute top-0 flex items-center justify-center h-full w-12 text-sm${iconClass} border-e${bordersClass}`}>{icon}</span>}
      </div>
      {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
    </div>
  );
};

const SelectOption = ({ key, onClick, title, selected }: { key: any; onClick?: any; title: string; selected: boolean }) => {
  return (
    <li
      //
      key={key}
      onClick={onClick}
      className={`relative flex items-center justify-between cursor-pointer px-4 py-2 ${selected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
    >
      {title}
    </li>
  );
};

interface DataType {
  title: string;
  value: string;
}

export type IProps = {
  name: string;
  control: any;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  direction?: "ltr" | "rtl";
  noSpace?: boolean;

  multiple?: boolean;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";

  items?: DataType[];
  apiPath?: string;
};

export default Select;
