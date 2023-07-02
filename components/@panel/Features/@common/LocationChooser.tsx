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

  const initialLocation: L.LatLngExpression = [36.6560965, 51.4432027];

  //
  return (
    <>
      <div className={"w-full relative z-10" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

        <div className="w-full relative">
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
                    zoomControl
                    attributionControl
                    style={{ height: 300, width: "100%" }}
                    className={"rounded " + className + " flex justify-center items-center"}
                  >
                    <div className="text-blue-500 w-12 h-12 -mt-6 z-[9999]">
                      <MarkerIcon />
                    </div>
                    {!center && <div className="text-blue-500 font-bold rounded absolute top-3 bg-white p-2 z-[9999]">لوکیشن ثبت نشده است</div>}

                    <TileLayer
                      //
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
        {helperText && <p className={"mt-1 block text-sm font-light text-start text-gray-500 dark:text-white" + labelClass}>{helperText}</p>}
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

function LocationEvent({ location, setLocation }: { location: [number, number]; setLocation: any }) {
  //
  //
  const map = useMap();

  useMapEvents({
    locationfound(e) {
      const c = map.getCenter();
      setLocation([c.lat, c.lng]);
    },
    moveend(e) {
      const c = map.getCenter();
      setLocation([c.lat, c.lng]);
    },
  });

  // useEffect(() => {
  //   map.addHandler().forEach(function (handler: any) {
  //     if (disabled) handler.disable();
  //     else handler.enable();
  //   });
  // }, [disabled]);

  // useEffect(() => {
  //   if (location) {
  //     map.panTo(new L.LatLng(location[0], location[1]));
  //   }
  // }, [location]);

  return (
    <>
      <div
        onClick={() => {
          // alert("location");
          toast.info("در حال دریافت موقعیت مکانی ...");
          map.locate();
        }}
        className="text-white font-bold absolute rounded left-1 bottom-1 bg-orange-500 p-2 z-[9999]"
      >
        موقعیت من
      </div>
    </>
  );
}
