import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ClickAwayListener, Grow, Paper, Popper, PopperPlacementType } from "@mui/material";
import { ChangeEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";
import ArrowDownIcon from "../Icons/ArrowDown";
import SearchIcon from "../Icons/Search";

const Select = (props: IProps) => {
  const { name, control, defaultValue = "", className = "", label, placeholder, icon, disabled = false, loading = false, readOnly = false, error, warning, success, direction, noSpace, size = "default", items, apiPath, searchable, multiple } = props;
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
  const [search, setSearch] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  const api = useAxiosAuth();
  const getItems = async () => {
    setDataLoading(true);
    try {
      const data = await api.get(apiPath! + (!!search.length ? "?search=" + search : ""));
      const _items = data.data;
      if (Array.isArray(_items)) setDataList(_items);
      else setDataList(Object.keys(_items).map((value) => ({ value: value, title: _items[value] } as DataType)));
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!items && apiPath) getItems();
    else if (items)
      setDataList(
        items.filter(({ title, value }) => {
          if (search.length) return title.search(search) >= 0;
          return true;
        })
      );
    else setDataList([]);
  }, [search]);

  return (
    <div className={"w-full relative z-20" + (noSpace ? " mb-0" : " mb-6")}>
      {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass}`}>{label}</label>}
      <div className="w-full relative" ref={anchorRef}>
        <Controller
          render={({ field }) => {
            return (
              <ClickAwayListener
                onClickAway={() => {
                  setOpen(false);
                }}
              >
                <div>
                  <input
                    type="text"
                    disabled={disabled || loading || dataLoading}
                    placeholder={placeholder}
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
                    // onBlur={(e) => {
                    //   if (!multiple) setOpen(false);
                    // }}
                  />
                  <Popper open={open} anchorEl={anchorRef.current} placement={"bottom-end"} transition disablePortal style={{ width: "100%" }} className="shadow-lg">
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: "right top",
                        }}
                      >
                        <Paper style={{ boxShadow: "none" }}>
                          <div className="z-10  bg-white w-full border border-gray-300  mt-1">
                            <ul className="text-sm text-gray-700 dark:text-gray-200 ">
                              {searchable ? (
                                <div className="w-full relative flex items-center">
                                  <input
                                    //
                                    type="text"
                                    disabled={disabled || loading || dataLoading}
                                    placeholder="جستجو ..."
                                    className={`w-full placeholder:text-gray-400 bg-white focus:bg-white p-2.5 text-gray-900 focus:ring-0 block text-sm border-b focus:border-gray-300 border-gray-300 border-0`}
                                    dir={direction}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                  <div className="absolute left-2.5 cursor-pointer text-blue-600">
                                    <SearchIcon />
                                  </div>
                                </div>
                              ) : null}
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
                                      } else {
                                        field.onChange(value);
                                        setOpen(false);
                                      }
                                    }}
                                  />
                                );
                              })}
                              {dataList.length === 0 && <SelectOption title="موردی پیدا نشد" key={-1} selected={false} />}
                            </ul>
                          </div>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
            );
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />
        <span className={`absolute top-0 end-0 text-blue-600  flex items-center justify-center h-full me-2.5 text-md ms-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
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
      className={`relative flex items-center justify-between cursor-pointer px-4 py-2 ${selected ? "bg-blue-300 " : onClick ? "hover:bg-gray-100" : ""}`}
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
  searchable?: boolean;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";

  items?: DataType[];
  apiPath?: string;
};

export default Select;
