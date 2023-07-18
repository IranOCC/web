import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Controller } from "react-hook-form";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";

import "@/assets/css/map.css";
import { toast } from "@/lib/toast";
import Mapir from "mapir-react-component";
import { Button } from "../../Button";

const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1NTg4YzVkM2I3YjFjYWU0NWE2OWNjZTM4ZjU3ZTdmN2U1Yjg4YTkxNWMwM2JhOTdiYWJlZWI4OWE2NDMxNDg1Nzc4YTYyNGQ0ZDMwMTc5In0.eyJhdWQiOiI5OTk2IiwianRpIjoiZDU1ODhjNWQzYjdiMWNhZTQ1YTY5Y2NlMzhmNTdlN2Y3ZTViODhhOTE1YzAzYmE5N2JhYmVlYjg5YTY0MzE0ODU3NzhhNjI0ZDRkMzAxNzkiLCJpYXQiOjE1OTQyMDM0MzMsIm5iZiI6MTU5NDIwMzQzMywiZXhwIjoxNTk2Nzk1NDMzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.RfZI-G-vJsKB8AaAXLtoR93ilorPnOWqEkGnap18EVEOoiWsFwuQaxSpNzYrzSbPeskmo68FdWvfrfcS0IaXvtU2rwI3D1udVrUlz5oDD_Z7NJMB-Dm9qY6mWC2OTsaTyTgNJ2ZC2q8ZK1aTdoEWUv27QrAsYEu_thQgTvSIPn0RoSFwMa-MHH6v7ATGTFY8MNdrazi2VdvTSR49REcssAn5iNjxFX7C9XLwltOA3VKTtCjY6MjkeVOhVrc2Bgo1QDukFTNSWGiEX0nSm1xKAs-OIXRKxvmmt9Sm6lcaT_2WbyPVn6Mo3aO7AjjhtxPjQZZk1PKtFwRH4r-JJdY2SA";
const Map = Mapir.setToken({
  transformRequest: (url: string) => {
    return {
      url: url,
      headers: {
        "x-api-key": API_KEY,
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

const LocationChooser = (props: IProps) => {
  const { name, control, defaultValue, label, getAddress, containerClassName = "", className = "", noSpace, loading, disabled, readOnly, error, warning, success } = props;
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
  if (status === "success") {
    labelClass = " text-green-500";
  } else if (status === "error") {
    labelClass = " text-red-500";
  } else if (status === "warning") {
    labelClass = " text-orange-500";
  }

  // here [lng, lat] accepted but in the server [lat, lng]
  // so every things from server reversed (***)

  const def = defaultValue?.split(",");
  // (***)
  const [center, setCenter] = useState(def ? [+def[1], +def[0]] : [0, 0]);

  return (
    <>
      <div className={"relative z-10 w-full" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

        <div className="relative w-full">
          <Controller
            render={({ field }) => {
              async function reverseFunction(map: any, e: any) {
                field.onChange([e.lngLat.lat, e.lngLat.lng].join(","));
                setCenter([e.lngLat.lng, e.lngLat.lat]);
                if (!!getAddress) {
                  const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
                  const response = await fetch(url, {
                    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
                  });
                  const data = await response.json();
                  getAddress(data);
                }
              }

              // convert to array
              let value: number[] | null = null;
              if (!!field.value) {
                const m = field.value.split(",").map((v: string) => +v);
                // (***)
                value = [m[1], m[0]];
              }

              return (
                <>
                  <Mapir
                    //
                    Map={Map}
                    center={center}
                    zoom={[16]}
                    userLocation
                    className={"rounded " + className + " !h-[30rem] !w-full overflow-hidden"}
                    onClick={reverseFunction}
                    interactive
                    hash
                  >
                    {/* zoom */}
                    <Mapir.ZoomControl position="top-left" />
                    {/* marker */}
                    {!!value && (
                      <Mapir.Marker
                        //
                        coordinates={value}
                        anchor="bottom"
                        Image={"https://map.ir/css/images/marker-default-yellow.svg"}
                      />
                    )}
                  </Mapir>
                  {!!value && <Button noSpace title="نمایش موقعیت ثبت شده" onClick={() => setCenter(value!)} />}
                  {!value && <Button noSpace title="موقعیت را با کلیک بر روی نقشه مشخص کنید" disabled />}
                </>
              );
            }}
            name={name}
            control={control}
          />
        </div>
        {helperText && <p className={"mt-1 block text-sm font-light text-gray-500 text-start dark:text-white" + labelClass}>{helperText}</p>}
      </div>
    </>
  );
};

export default LocationChooser;

export type IProps = {
  name: string;
  control: any;
  defaultValue?: string;
  noSpace?: boolean;
  className?: string;
  containerClassName?: string;
  label?: string;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;

  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;

  getAddress?: (data: any) => void;
};
