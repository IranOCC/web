import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Slider } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const RangeBox = (props: IProps) => {
  const { name, control, defaultValue, className = "", label, disabled = false, loading = false, readOnly = false, onChange, error, warning, success, direction, noSpace, size = "default", containerClassName = "", minmaxstep, valueLabelFormat, apiPath, filterApi } = props;
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
  let inputClass = " text-secondary";
  if (status === "success") {
    labelClass = " text-green-500";
    inputClass = " text-green-500";
  } else if (status === "error") {
    labelClass = " text-red-500";
    inputClass = " text-red-500";
  } else if (status === "warning") {
    labelClass = " text-orange-500";
    inputClass = " text-orange-500";
  }

  const [pps, setPPS] = useState<{ min: number; max: number; step?: number } | undefined>(undefined);
  const [dataLoading, setDataLoading] = useState(true);

  const api = useAxiosAuth();
  const getItems = async () => {
    setDataLoading(true);
    try {
      const { data } = await api.get(apiPath!, { params: { filter: filterApi } });
      setPPS(data);
      setDataLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (!minmaxstep && apiPath) getItems();
    else if (minmaxstep) {
      setPPS(minmaxstep);
      setDataLoading(false);
    }
  }, [apiPath]);

  return (
    <div className={"relative z-10 w-full" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
      {label && <label className={`mb-2 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}
      <div className="relative flex w-full items-center">
        <Controller
          render={({ field }) => {
            return (
              <>
                <Slider
                  //
                  value={field.value}
                  onChange={(e, v) => {
                    field.onChange(v);
                    if (!!onChange) onChange(v);
                  }}
                  min={pps?.min}
                  max={pps?.max}
                  step={pps?.step}
                  valueLabelDisplay="auto"
                  slotProps={{ input: { ref: field.ref } }}
                  disabled={disabled || loading || readOnly || dataLoading}
                  name={name}
                  size={size === "small" ? "small" : "medium"}
                  valueLabelFormat={valueLabelFormat}
                />
              </>
            );
          }}
          defaultValue={defaultValue || (!!pps?.min && !!pps?.max ? [(pps?.min, pps?.max)] : undefined)}
          name={name}
          control={control}
        />
      </div>

      {helperText && <p className={"mt-1 block w-full text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
    </div>
  );
};

export type IProps = {
  name: string;
  control: any;
  defaultValue?: number | number[];
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

  onChange?: (value: any) => void;

  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  size?: "small" | "default" | "large";

  valueLabelFormat?: string | ((value: number, index: number) => ReactNode);

  minmaxstep?: { min: number; max: number; step?: number };
  apiPath?: string;
  filterApi?: { [K: string]: string | null | undefined };
};

export default RangeBox;
