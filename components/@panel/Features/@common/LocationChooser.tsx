import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Controller } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import L from "leaflet";
import MarkerIcon from "@/components/Icons/MarkerIcon";
import { toast } from "@/lib/toast";

const LocationChooser = (props: IProps) => {
  const { name, control, defaultValue, label, containerClassName = "", className = "", noSpace, loading, disabled, readOnly, error, warning, success } = props;
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

  const initialLocation: L.LatLngExpression = [0.0, 0.0];

  //
  return (
    <>
      <div className={"relative z-10 w-full" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

        <div className="relative w-full">
          <Controller
            render={({ field }) => {
              let center: L.LatLngExpression | null = null;
              if (Array.isArray(field.value)) {
                const m = field.value as number[];
                center = [m[0], m[1]];
              } else if (typeof field.value === "string") {
                const m = field.value.split(",").map((v) => +v);
                center = [m[0], m[1]];
              }

              return (
                <>
                  <MapContainer
                    //
                    center={center || initialLocation}
                    zoom={15}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    // attributionControl
                    style={{ height: 400, width: "100%" }}
                    className={"rounded " + className + " flex items-center justify-center"}
                  >
                    <div className="z-[9999] -mt-6 h-12 w-12 text-blue-500">
                      <MarkerIcon />
                    </div>
                    {!center && <div className="absolute top-3 z-[9999] rounded bg-white p-2 font-bold text-blue-500">لوکیشن ثبت نشده است</div>}

                    <TileLayer
                      //
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationEvent
                      //
                      setLocation={(data: [number, number]) => field.onChange(data.join(","))}
                      location={field.value}
                    />
                  </MapContainer>
                </>
              );
            }}
            defaultValue={defaultValue}
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
  defaultValue?: [number, number, number];
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
};

function LocationEvent({ location, setLocation }: { location: string; setLocation: any }) {
  //
  //
  const map = useMapEvents({
    locationfound(e) {
      toast.success("موقعیت پیدا شد");
      setLocation([e.latlng?.lat, e.latlng?.lng, map.getZoom()]);
    },
    moveend(e) {
      toast.success("موقعیت رفت");
      const c = map.getCenter();
      setLocation([c.lat, c.lng, map.getZoom()]);
    },
  });

  // useMapEvents({
  //   locationfound(e) {
  //     const c = map.getCenter();
  //     setLocation([c.lat, c.lng]);
  //   },
  //   moveend(e) {
  //     const c = map.getCenter();
  //     setLocation([c.lat, c.lng]);
  //   },
  // });

  // useEffect(() => {
  //   map.addHandler().forEach(function (handler: any) {
  //     if (disabled) handler.disable();
  //     else handler.enable();
  //   });
  // }, [disabled]);

  useEffect(() => {
    if (location) {
      const loc = location.split(",");
      map.panTo(new L.LatLng(+loc[0], +loc[1]));
    }
  }, [location]);

  return (
    <>
      <div
        onClick={() => {
          // alert("location");
          toast.info("در حال دریافت موقعیت مکانی ...");
          map.locate();
        }}
        className="absolute bottom-1 left-1 z-[9999] rounded bg-orange-500 p-2 font-bold text-white"
      >
        موقعیت من
      </div>
    </>
  );
}
