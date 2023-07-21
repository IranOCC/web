import "@/assets/css/map.css";
import { Controller } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import Mapir from "mapir-react-typescript";
import { Button } from "../../Button";
import { Search } from "@mui/icons-material";

const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1NTg4YzVkM2I3YjFjYWU0NWE2OWNjZTM4ZjU3ZTdmN2U1Yjg4YTkxNWMwM2JhOTdiYWJlZWI4OWE2NDMxNDg1Nzc4YTYyNGQ0ZDMwMTc5In0.eyJhdWQiOiI5OTk2IiwianRpIjoiZDU1ODhjNWQzYjdiMWNhZTQ1YTY5Y2NlMzhmNTdlN2Y3ZTViODhhOTE1YzAzYmE5N2JhYmVlYjg5YTY0MzE0ODU3NzhhNjI0ZDRkMzAxNzkiLCJpYXQiOjE1OTQyMDM0MzMsIm5iZiI6MTU5NDIwMzQzMywiZXhwIjoxNTk2Nzk1NDMzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.RfZI-G-vJsKB8AaAXLtoR93ilorPnOWqEkGnap18EVEOoiWsFwuQaxSpNzYrzSbPeskmo68FdWvfrfcS0IaXvtU2rwI3D1udVrUlz5oDD_Z7NJMB-Dm9qY6mWC2OTsaTyTgNJ2ZC2q8ZK1aTdoEWUv27QrAsYEu_thQgTvSIPn0RoSFwMa-MHH6v7ATGTFY8MNdrazi2VdvTSR49REcssAn5iNjxFX7C9XLwltOA3VKTtCjY6MjkeVOhVrc2Bgo1QDukFTNSWGiEX0nSm1xKAs-OIXRKxvmmt9Sm6lcaT_2WbyPVn6Mo3aO7AjjhtxPjQZZk1PKtFwRH4r-JJdY2SA";
const Map = Mapir.setToken({
  accessToken: API_KEY,
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

const searchLocation = (params: any) => {
  return fetch(`https://map.ir/search/v2/`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};

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
        {(disabled || loading) && <div className="absolute z-20 h-full w-full" />}
        <div className="relative w-full">
          <Controller
            render={({ field }) => {
              async function setMarkerAndAddress(data: number[]) {
                if (loading || readOnly || disabled) return;
                field.onChange([data[1], data[0]].join(","));
                setCenter([data[0], data[1]]);
                if (!!getAddress) {
                  const url = `https://map.ir/reverse/no?lat=${data[1]}&lon=${data[0]}`;
                  const response = await fetch(url, {
                    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
                  });
                  const _data = await response.json();
                  getAddress(_data);
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
                    className={className + " mb-2 !h-[30rem] !w-full overflow-hidden rounded"}
                    onClick={(m: any, e: any) => setMarkerAndAddress([e.lngLat.lng, e.lngLat.lat])}
                    interactive
                    hash
                  >
                    {/* zoom */}
                    <Mapir.ZoomControl position="bottom-right" />
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
                  <SearchBox
                    //
                    setMarkerPosition={(data: number[]) => {
                      setMarkerAndAddress(data);
                    }}
                  />
                  {!!value && <Button noSpace title="نمایش موقعیت ثبت شده" onClick={() => setCenter(value!)} />}
                  {!value && <Button noSpace title="بر روی نقشه کلیک کنید" disabled />}
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

const SearchBox = ({ setMarkerPosition }: { setMarkerPosition: any }) => {
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [text, setText] = useState("");
  useEffect(() => {
    if (text.length > 1) {
      const params: any = {};
      const options: any = { text };
      for (let key in options) {
        if (options[key] !== null && options[key] !== "") {
          params[key] = options[key];
        }
      }
      searchLocation(params)
        .then((data: any) => data.json())
        .then((data: any) => {
          if (data["odata.count"] > 0) {
            setSearchResult(data.value);
          } else {
            setSearchResult([]);
          }
        });
    } else {
      setSearchResult(null);
    }
  }, [text]);

  function clearSearch() {
    setSearchResult(null);
    setText("");
  }
  return (
    <>
      <div className="absolute top-2.5 z-10 mx-12 flex w-[calc(100%-3rem)] flex-col">
        <div className="relative flex max-h-full w-full flex-col pe-3">
          <div className="flex w-full flex-row">
            <input
              //
              autoComplete="off"
              type="search"
              placeholder="جستجوی مکان..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              className={"w-0 flex-1 rounded-tr-lg border-0 bg-yellow-100 text-sm ring-0 transition-all focus:ring-0" + (!!searchResult?.length ? "" : " rounded-br-lg")}
            />
            <button
              //
              className={"rounded-tl-lg bg-secondary px-2.5 transition-all" + (!!searchResult?.length ? "" : " rounded-bl-lg")}
            >
              <Search sx={{ fontSize: 16 }} />
            </button>
          </div>
          {searchResult?.length === 0 && <span className="flex items-center justify-center p-1 font-bold">موردی یافت نشد ...</span>}
          {!!searchResult?.length && (
            <div className="flex max-h-[15rem] w-full max-w-full flex-col overflow-x-hidden rounded-b-lg">
              {searchResult?.map((item: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchResult(null);
                      setText("");
                      setMarkerPosition(item.geom.coordinates);
                    }}
                    className="flex w-full cursor-pointer flex-col items-start bg-yellow-100 p-2 hover:bg-yellow-200"
                  >
                    <p className="flex gap-2 font-bold">
                      <img src="https://map.ir/css/images/marker-default-yellow.svg" width={25} />
                      {item.title || item.district || item.county}
                    </p>
                    <p className="search-result-item-address">{item.address}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
