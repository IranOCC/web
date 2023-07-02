import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePrevious } from "@/hooks/usePrevious";
import { SelectDataType } from "@/types/interfaces";
import { Chip, ClickAwayListener, Grow, Paper, Popper, PopperPlacementType } from "@mui/material";
import { Spin } from "antd";
import { ChangeEventHandler, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Controller, ControllerRenderProps, FieldValues, useController } from "react-hook-form";
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
    addNew = false,
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

  const _c = useController({ control, name });

  // ===>
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  // const [totalDataList, setTotalDataList] = useState<SelectDataType[] | null>(null);
  const [dataList, setDataList] = useState<SelectDataType[] | null>(null);
  const [search, setSearch] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [resetValue, setResetValue] = useState<boolean[] | null>(null);

  const isFirstRenderResetApply = useRef(true);

  const api = useAxiosAuth();
  const getItems = async (reset = false) => {
    if (reset) setResetValue([true]);

    setDataLoading(true);
    try {
      const data = await api.get(apiPath!, { params: { initial: _c.field.value, search, filter: filterApi } });
      const _items = data.data;
      if (Array.isArray(_items)) setDataList(_items);
      else setDataList(Object.keys(_items).map((value) => ({ value: value, title: _items[value] } as SelectDataType)));
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
  }, [filterApi?.categories, filterApi?.province]);

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
            onClick={(e) => {
              if (disabled || loading) return;
              console.log((e.target as any)?.nodeName);
              if (!["LI", "INPUT"].includes((e.target as any)?.nodeName)) setOpen((o) => !o);
            }}
          >
            <div className="h-5 w-0 float-right" />
            {!!dataLoading && "انتخاب نشده"}
            {!dataLoading && !dataList && "در حال دریافت ..."}
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

          <span className={`absolute top-0 end-0 text-secondary  flex items-center justify-center h-full me-2.5 text-md ms-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
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
  dataList: SelectDataType[];
  setOpen: (s: boolean) => void;
  open: boolean;
  dataLoading: boolean;
  tagsMode?: boolean;

  anchorRef: RefObject<HTMLDivElement>;
  search: string;
  setSearch: (s: string) => void;
  onChange?: (value: any) => void;

  resetValue?: any;
  defaultValue?: string | string[];
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

  const [objectValue, setObjectValue] = useState<SelectDataType[] | SelectDataType | undefined>();

  useEffect(() => {
    // alert(field.value);
    setObjectValue(
      multiple
        ? //
          field.value?.map((dtype: SelectDataType | string) => {
            return typeof dtype === "object" ? dtype : dataList.filter((item) => item.value === dtype)[0] || undefined;
          })
        : //
        typeof field.value === "object"
        ? field.value
        : dataList.filter((item) => item.value === field.value)[0] || undefined
    );
  }, [field.value]);

  // ==========================>
  useEffect(() => {
    // console.log(resetValue, defaultValue);
    if (!!resetValue) field.onChange(defaultValue);
  }, [resetValue]);

  useEffect(() => {
    // console.log(resetValue, defaultValue);
    // field.onChange(field.value || defaultValue);
  }, []);

  const _value =
    !dataLoading && multiple ? (
      //
      showTitle ? (
        //
        !!(objectValue as SelectDataType[])?.length ? (
          tagsMode ? (
            <div className="flex flex-wrap gap-1">
              {(objectValue as SelectDataType[]).map((item: SelectDataType, index) => (
                <span key={index} className="cursor-default bg-secondary text-white px-2 rounded flex justify-center items-center">
                  {item.title}
                </span>
              ))}
            </div>
          ) : (
            (objectValue as SelectDataType[]).map((item: SelectDataType) => item?.title).join(", ")
          )
        ) : (
          "انتخاب نشده"
        )
      ) : //
      !!(objectValue as SelectDataType[])?.length ? (
        (objectValue as SelectDataType[]).length + " مورد انتخاب شده"
      ) : (
        "انتخاب نشده"
      )
    ) : //
    objectValue ? (
      (objectValue as SelectDataType)?.title
    ) : (
      "انتخاب نشده"
    );

  // const _value = "jsj";

  return (
    <>
      {!dataLoading && _value}
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
                    <li className="w-full relative flex items-center">
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
                      <div className="absolute left-2.5 cursor-pointer text-secondary">
                        <SearchIcon />
                      </div>
                    </li>
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
                          selected={
                            multiple
                              ? //
                                !!field.value?.filter((dtype: SelectDataType | string) => {
                                  return typeof dtype === "object" ? dtype.value === value : value === dtype;
                                })?.length
                              : //
                              !!field.value && typeof field.value === "object"
                              ? field.value.value === value
                              : value === field.value
                          }
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
      role="button"
      aria-label={"list item " + title}
      onClick={onClick}
      className={`relative flex items-center justify-between cursor-pointer px-4 py-2 ${selected ? "bg-disable " : onClick ? "hover:bg-gray-100" : ""}`}
    >
      {title}
    </li>
  );
};

export type IProps = {
  name: string;
  control: any;
  defaultValue?: string | string[];
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

  addNew?: boolean;
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

  items?: SelectDataType[];
  apiPath?: string;
  filterApi?: { [K: string]: string | null | undefined };
  onChange?: (value: any) => void;
};

export default Select;
