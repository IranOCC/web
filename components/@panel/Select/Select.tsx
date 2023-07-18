import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePrevious } from "@/hooks/usePrevious";
import { SelectDataType } from "@/types/interfaces";
import { Chip, ClickAwayListener, Grow, Paper, Popper, PopperPlacementType } from "@mui/material";
import { Spin } from "antd";
import { ChangeEventHandler, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Controller, ControllerRenderProps, FieldValues, useController } from "react-hook-form";
import { Button } from "../Button";
import ArrowDownIcon from "../../Icons/ArrowDown";
import SearchIcon from "../../Icons/Search";

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
    disabledItems = [],
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

  const isFirstRenderResetApply = useRef(true);

  const api = useAxiosAuth();
  const getItems = async () => {
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
  }, [search, apiPath]);

  useEffect(() => {
    if (!items && apiPath && filterApi) {
      if (!isFirstRenderResetApply.current) getItems();
      else isFirstRenderResetApply.current = false;
    }
  }, [filterApi?.categories, filterApi?.province]);

  useEffect(() => {
    setSearch("");
    setDataLoading(false);
  }, [open]);

  const _className = `placeholder:text-left overflow-x-hidden ${
    disabled ? "cursor-not-allowed bg-gray-200" : "cursor-default bg-slate-100"
  } rounded focus:bg-white text-gray-900 focus:ring-0 focus:shadow-lg placeholder:text-start pe-8 border${bordersClass} block flex-1 min-w-0 w-full text-sm p-2.5 ${inputClass} ${sizeClass} ${className}`;

  return (
    <div className={"relative w-full" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      {label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
        }}
      >
        <div className="relative w-full" ref={anchorRef}>
          <div
            //
            className={_className}
            dir={direction}
            style={{ height: multiline ? (lines || 4) * 30 + "px" : "" }}
            onClick={(e) => {
              if (disabled || loading) return;
              console.log((e.target as any)?.nodeName);
              if (!["LI", "INPUT"].includes((e.target as any)?.nodeName)) setOpen((o) => !o);
            }}
          >
            <div className="float-right h-5 w-0" />
            {!!dataLoading && "انتخاب نشده"}
            {!dataLoading && !dataList && "در حال دریافت ..."}
            <Controller
              render={({ field }) => {
                if (!dataList) return <></>;
                return (
                  <FieldComponent
                    //
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
                    disabledItems={disabledItems}
                  />
                );
              }}
              defaultValue={defaultValue}
              name={name}
              control={control}
            />
          </div>

          <span className={`text-md absolute top-0 flex  h-full items-center justify-center text-secondary transition-transform ms-1 me-2.5 end-0 ${open ? "rotate-180" : "rotate-0"}`}>
            <ArrowDownIcon />
          </span>
          {icon && <span className={`absolute top-0 flex h-full w-12 items-center justify-center text-sm${iconClass} border-e${bordersClass}`}>{icon}</span>}
        </div>
      </ClickAwayListener>

      {helperText && <p className={"mt-1 block text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
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

  defaultValue?: string | string[];
  disabledItems: string[];
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
    tagsMode,
    defaultValue,
    disabledItems = [],
  } = props;

  const [objectValue, setObjectValue] = useState<SelectDataType[] | SelectDataType | undefined>();

  useEffect(() => {
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
    if (onChange) onChange(field.value);
  }, [field.value, dataList]);

  // ==========================>
  useEffect(() => {
    if (!multiple) {
      if (!dataList.some(({ value }) => value === field.value)) {
        field.onChange(null);
      }
    } else {
      if (dataList.filter(({ value }) => (field.value || []).includes(value)).length !== (field.value || []).length) {
        field.onChange([]);
      }
    }
  }, [dataList]);

  // ===> onChange
  // useEffect(() => {
  //   if (onChange) onChange(field.value);
  // }, []);

  const _value =
    !dataLoading && multiple ? (
      //
      showTitle ? (
        //
        !!(objectValue as SelectDataType[])?.length ? (
          tagsMode ? (
            <div className="flex flex-wrap gap-1">
              {(objectValue as SelectDataType[]).map((item: SelectDataType, index) => (
                <span key={index} className="flex cursor-default items-center justify-center rounded bg-secondary px-2 text-white">
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
        <Popper ref={field.ref} open={open} anchorEl={anchorRef.current} placement={"bottom-end"} transition disablePortal style={{ width: "100%" }} className="z-20 shadow-lg">
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: "right top",
              }}
            >
              <Paper style={{ boxShadow: "none" }}>
                <div className="relative mt-1 w-full border border-gray-300  bg-white">
                  {searchable ? (
                    <li className="relative flex w-full items-center">
                      <input
                        //
                        type="text"
                        disabled={disabled || loading}
                        placeholder="جستجو ..."
                        className={`block w-full border-0 border-b border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-0`}
                        dir={direction}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="absolute left-2.5 cursor-pointer text-secondary">
                        <SearchIcon />
                      </div>
                    </li>
                  ) : null}
                  <ul className="max-h-60 overflow-x-hidden text-sm text-gray-700 dark:text-gray-200">
                    <SelectOption
                      //
                      title="هیچکدام"
                      selected={!field.value?.length}
                      onClick={() => {
                        if (disabled || loading) return;
                        if (multiple) {
                          field.onChange(null);
                        } else {
                          field.onChange(null);
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
                          disabled={disabledItems.includes(value)}
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
                  <div className={"bg-slate-50 absolute bottom-0 w-full items-center justify-center opacity-70" + (searchable ? " top-10" : "") + (dataLoading ? " flex" : " hidden")}>
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

const SelectOption = ({ onClick, title, selected, disabled }: { onClick?: any; title: string; selected: boolean; disabled?: boolean }) => {
  return (
    <li
      //
      role="button"
      aria-label={"list item " + title}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`relative flex items-center justify-between px-4 py-2 ${selected ? "bg-disable " : onClick && !disabled ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed"} ${disabled ? "text-gray-400 " : ""}`}
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
  disabledItems?: string[];

  items?: SelectDataType[];
  apiPath?: string;
  filterApi?: { [K: string]: string | null | undefined };
  onChange?: (value: any) => void;
};

export default Select;
