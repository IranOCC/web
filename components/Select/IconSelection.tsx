import { ChangeEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

type IconData = {
  _id: string;
  name: string;
  content: string;
};

const IconSelection = (props: IProps) => {
  const { name, control, defaultValue, className = "", label, disabled = false, loading = false, readOnly = false, error, warning, success, direction, noSpace, size = "default", containerClassName = "" } = props;
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
  let bordersClass = " border-gray-300";
  if (status === "success") {
    labelClass = " text-green-500";
    bordersClass = " border-green-400";
  } else if (status === "error") {
    labelClass = " text-red-500";
    bordersClass = " border-red-400";
  } else if (status === "warning") {
    labelClass = " text-orange-500";
    bordersClass = " border-orange-400";
  }
  const _className = `flex flex-row flex-wrap  p-1 min-h-[3rem] max-h-[8rem] justify-center overflow-y-scroll gap-2 ${disabled ? "cursor-not-allowed bg-gray-200" : "bg-slate-100"} rounded text-gray-900 border${bordersClass} block flex-1 min-w-0 w-full text-sm p-2.5 ${className} `;

  const [iconsList, setIconsList] = useState<IconData[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  const api = useAxiosAuth();
  const getItems = async () => {
    setDataLoading(true);
    try {
      const { data } = await api.get("icon");
      setIconsList(data);
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className={"w-full relative z-10 flex items-end flex-col" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      {label && <label className={`w-full block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
      <div className={"w-full relative"}>
        <Controller
          render={({ field }) => {
            return (
              <>
                <div className={_className}>
                  {/*  */}
                  <Tooltip title={"بدون آیکون"} arrow placement="bottom">
                    <div onClick={() => field.onChange(null)} className={"rounded text-pink-500 fill-current min-w-[2.5rem] h-10 w-10 overflow-hidden flex justify-center items-center cursor-pointer" + (!field.value ? " bg-green-200 " : " hover:bg-slate-200")}>
                      None
                    </div>
                  </Tooltip>
                  {iconsList?.map((icon, index) => {
                    const isActive = icon._id === field.value;
                    return (
                      <Tooltip key={index} title={icon.name} arrow placement="bottom">
                        <div onClick={() => field.onChange(icon._id)} className={"rounded text-pink-500 fill-current min-w-[2.5rem] h-10 w-10 overflow-hidden flex justify-center items-center cursor-pointer" + (isActive ? " bg-green-200 " : " hover:bg-slate-200")}>
                          <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon.content }} />
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </>
            );
          }}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />
      </div>

      {helperText && <p className={"w-full mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
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

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";
};

export default IconSelection;
