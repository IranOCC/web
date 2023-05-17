import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Controller } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import L from "leaflet";
import MarkerIcon from "@/components/Icons/MarkerIcon";

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

  //
  return (
    <>
      <div className={"w-full relative z-10" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`block mb-1 text-sm font-light text-start text-gray-500 dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

        <div className="w-full relative">
          <Controller
            render={({ field }) => {
              let center: L.LatLngExpression;
              if (Array.isArray(field.value)) {
                const m = field.value as number[];
                center = [m[0], m[1]];
              } else if (typeof field.value === "string") {
                const m = field.value.split(",").map((v) => +v);
                center = [m[0], m[1]];
              } else {
                center = [35.7219, 51.3347];
              }

              return (
                <>
                  <MapContainer
                    //
                    center={center}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: 300, width: "100%" }}
                    className={"rounded " + className + " flex justify-center items-center"}
                  >
                    <div className="text-blue-500 w-12 h-12 -mt-6 z-[9999]">
                      <MarkerIcon />
                    </div>
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
  useEffect(() => {
    map.locate();
  }, []);

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

  const map = useMapEvents({
    locationfound(e) {
      setLocation([e.latlng?.lat, e.latlng?.lng]);
    },
    moveend(e) {
      const c = map.getCenter();
      setLocation([c.lat, c.lng]);
    },
  });
  return null;
}
