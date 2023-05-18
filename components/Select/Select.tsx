import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { usePrevious } from "@/lib/hooks/usePrevious";
import { Chip, ClickAwayListener, Grow, Paper, Popper, PopperPlacementType } from "@mui/material";
import { Spin } from "antd";
import { ChangeEventHandler, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { Button } from "../Button";
import ArrowDownIcon from "../Icons/ArrowDown";
import SearchIcon from "../Icons/Search";

const Select = (props: IProps) => {
  const {
    name,
    control,
    defaultValue,
    className = "",
    multiline,
    lines,
    filterApi,
    label,
    placeholder,
    icon,
    disabled = false,
    loading = false,
    error,
    warning,
    success,
    direction,
    noSpace,
    size = "default",
    items,
    apiPath,
    searchable,
    tagsMode,
    multiple,
    showTitle = false,
    containerClassName = "",
    onChange,
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

  const [dataList, setDataList] = useState<DataType[] | null>(null);
  const [search, setSearch] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [resetValue, setResetValue] = useState<boolean[] | null>(null);

  const isFirstRenderResetApply = useRef(true);

  const api = useAxiosAuth();
  const getItems = async (reset = false) => {
    if (reset) setResetValue([true]);

    setDataLoading(true);
    try {
      const data = await api.get(apiPath!, { params: { search, ...filterApi } });
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
    else if (items) {
      setDataList(
        items.filter(({ title, value }) => {
          if (search.length) return title.search(search) >= 0;
          return true;
        })
      );
      setDataLoading(false);
    } else {
      setDataList([]);
      setDataLoading(false);
    }
  }, [search]);

  useEffect(() => {
    if (!items && apiPath && filterApi) {
      if (!isFirstRenderResetApply.current) getItems(true);
      else isFirstRenderResetApply.current = false;
    }
  }, [filterApi?.cat]);

  useEffect(() => {
    setSearch("");
    setDataLoading(false);
  }, [open]);

  const _className = `placeholder:text-left ${
    disabled ? "cursor-not-allowed bg-gray-200" : "cursor-default bg-slate-100"
  } rounded focus:bg-white text-gray-900 focus:ring-0 focus:shadow-lg placeholder:text-start pe-8 border${bordersClass} block flex-1 min-w-0 w-full text-sm p-2.5 ${inputClass} ${sizeClass} ${className}`;

  return (
    <div className={"w-full relative" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
        }}
      >
        <div className="w-full relative" ref={anchorRef}>
          <div
            //
            className={_className}
            dir={direction}
            style={{ height: multiline ? (lines || 4) * 25.5 + "px" : "" }}
            onClick={() => {
              if (disabled || loading) return;
              if (!open) setOpen(true);
            }}
          >
            <div className="h-5 w-0 float-right" />
            {!!dataLoading && "انتخاب نشده"}
            {!dataLoading && !dataList && "خطا در دریافت"}

            <Controller
              render={({ field }) => {
                if (!dataList) return <></>;
                return (
                  <FieldComponent
                    //
                    resetValue={resetValue}
                    dataList={dataList}
                    setOpen={setOpen}
                    open={open}
                    dataLoading={dataLoading}
                    anchorRef={anchorRef}
                    field={field}
                    placeholder={placeholder}
                    disabled={disabled}
                    loading={loading}
                    direction={direction}
                    searchable={searchable}
                    multiple={multiple}
                    showTitle={showTitle}
                    search={search}
                    setSearch={setSearch}
                    className={_className}
                    onChange={onChange}
                    tagsMode={tagsMode}
                    defaultValue={defaultValue}
                  />
                );
              }}
              defaultValue={defaultValue}
              name={name}
              control={control}
            />
          </div>
          <span className={`absolute top-0 end-0 text-blue-600  flex items-center justify-center h-full me-2.5 text-md ms-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
            <ArrowDownIcon />
          </span>
          {icon && <span className={`absolute top-0 flex items-center justify-center h-full w-12 text-sm${iconClass} border-e${bordersClass}`}>{icon}</span>}
        </div>
      </ClickAwayListener>

      {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
    </div>
  );
};

type FieldComponentType = {
  className: string;
  field: ControllerRenderProps<FieldValues, string>;
  placeholder?: string;
  disabled: boolean;
  loading: boolean;
  direction?: "ltr" | "rtl";
  searchable?: boolean;
  multiple?: boolean;
  showTitle: boolean;
  dataList: DataType[];
  setOpen: (s: boolean) => void;
  open: boolean;
  dataLoading: boolean;
  tagsMode?: boolean;

  anchorRef: RefObject<HTMLDivElement>;
  search: string;
  setSearch: (s: string) => void;
  onChange?: (value: any) => void;

  resetValue?: any;
  defaultValue?: string;
};

const FieldComponent = (props: FieldComponentType) => {
  const {
    //
    className = "",
    field,
    placeholder,
    disabled = false,
    loading = false,
    direction,
    searchable,
    multiple,
    showTitle = false,
    dataList,
    setOpen,
    dataLoading,
    open,
    anchorRef,
    search,
    setSearch,
    onChange,
    resetValue,
    tagsMode,
    defaultValue,
  } = props;

  const [objectValue, setObjectValue] = useState<DataType[] | DataType | undefined>(
    multiple
      ? //
        dataList.filter((item) => field.value?.includes(item.value)) || ([] as DataType[])
      : //
        dataList.filter((item) => item.value === field.value)[0] || undefined
  );

  useEffect(() => {
    setObjectValue(
      multiple
        ? //
          dataList.filter((item) => field.value?.includes(item.value)) || ([] as DataType[])
        : //
          dataList.filter((item) => item.value === field.value)[0] || undefined
    );
  }, [field.value]);

  useEffect(() => {
    if (!!resetValue) field.onChange(defaultValue);
  }, [resetValue]);

  //
  const _value =
    !dataLoading && multiple ? (
      //
      showTitle ? (
        //
        !!(objectValue as DataType[])?.length ? (
          tagsMode ? (
            <div className="flex flex-wrap gap-1">
              {(objectValue as DataType[]).map((item: DataType, index) => (
                <span key={index} className="cursor-default bg-blue-500 text-white px-2 rounded flex justify-center items-center">
                  {item.title}
                </span>
              ))}
            </div>
          ) : (
            (objectValue as DataType[]).map((item: DataType) => item.title).join(", ")
          )
        ) : (
          "انتخاب نشده"
        )
      ) : //
      !!(objectValue as DataType[])?.length ? (
        (objectValue as DataType[]).length + " مورد انتخاب شده"
      ) : (
        "انتخاب نشده"
      )
    ) : //
    objectValue ? (
      (objectValue as DataType)?.title
    ) : (
      "انتخاب نشده"
    );
  return (
    <>
      {_value}
      {!!dataList && (
        <Popper open={open} anchorEl={anchorRef.current} placement={"bottom-end"} transition disablePortal style={{ width: "100%" }} className="shadow-lg z-20">
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: "right top",
              }}
            >
              <Paper style={{ boxShadow: "none" }}>
                <div className="relative bg-white w-full border border-gray-300  mt-1">
                  {searchable ? (
                    <div className="w-full relative flex items-center">
                      <input
                        //
                        type="text"
                        disabled={disabled || loading}
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
                  <ul className="text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-x-hidden">
                    <SelectOption
                      //
                      title="انتخاب نشده"
                      selected={!field.value?.length}
                      onClick={() => {
                        if (disabled || loading) return;
                        if (multiple) {
                          field.onChange(null);
                          if (onChange) onChange(null);
                        } else {
                          field.onChange(null);
                          if (onChange) onChange(null);
                          setOpen(false);
                        }
                      }}
                    />
                    {dataList.map(({ title, value }, _index) => {
                      return (
                        <SelectOption
                          //
                          title={title}
                          key={_index}
                          selected={multiple ? field.value?.includes(value) : value === field.value}
                          onClick={() => {
                            if (disabled || loading) return;
                            if (multiple) {
                              let a = [];
                              if (field.value?.includes(value)) {
                                a = field.value.filter((item: any) => item !== value);
                              } else {
                                a = [...(field.value || []), value];
                              }
                              field.onChange(a);
                              if (onChange) onChange(a);
                            } else {
                              field.onChange(value);
                              if (onChange) onChange(value);
                              setOpen(false);
                            }
                          }}
                        />
                      );
                    })}
                    {dataList.length === 0 && <SelectOption title="موردی پیدا نشد" key={-1} selected={false} />}
                  </ul>
                  <div className={"absolute bg-slate-50 opacity-70 w-full bottom-0 items-center justify-center" + (searchable ? " top-10" : "") + (dataLoading ? " flex" : " hidden")}>
                    <Spin />
                  </div>
                </div>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
};

const SelectOption = ({ onClick, title, selected }: { onClick?: any; title: string; selected: boolean }) => {
  return (
    <li
      //
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
  containerClassName?: string;

  icon?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  direction?: "ltr" | "rtl";
  noSpace?: boolean;

  multiple?: boolean;
  showTitle?: boolean;
  searchable?: boolean;
  tagsMode?: boolean;

  multiline?: boolean;
  lines?: number;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";

  items?: DataType[];
  apiPath?: string;
  filterApi?: { cat?: string };
  onChange?: (value: any) => void;
};

export default Select;
