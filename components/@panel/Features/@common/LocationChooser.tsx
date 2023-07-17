import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Controller } from "react-hook-form";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const def = defaultValue?.split(",");
  const [center, setCenter] = useState<L.LatLngTuple>(def ? [+def[0], +def[1]] : [0, 0]);
  //
  return (
    <>
      <div className={"relative z-10 w-full" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        {label && <label className={`mb-1 block text-sm font-light text-gray-500 text-start dark:text-white${labelClass} whitespace-nowrap`}>{label}</label>}

        <div className="relative w-full">
          <Controller
            render={({ field }) => {
              let value: L.LatLngExpression | null = null;
              if (typeof field.value === "string") {
                const m = field.value.split(",").map((v) => +v);
                value = [m[0], m[1]];
              }

              return (
                <>
                  <MapContainer
                    //
                    center={center}
                    zoom={15}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    // attributionControl
                    style={{ height: 400, width: "100%" }}
                    className={"rounded " + className + " flex items-center justify-center"}
                  >
                    <TileLayer
                      //
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarker
                      //
                      isSelected={!!value}
                      location={value || center}
                      setLocation={(data: L.LatLngTuple) => field.onChange(data.join(","))}
                      disabled={disabled || loading || readOnly}
                    />
                    <LocationEvent
                      //
                      isSelected={!!value}
                      setCenter={(data: L.LatLngTuple) => setCenter(data)}
                      center={center}
                      marker={value || center}
                      autoLocate={!value}
                    />
                  </MapContainer>
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
};

function LocationEvent({ isSelected, marker, center, setCenter, autoLocate }: { isSelected: boolean; marker: L.LatLngTuple; center: L.LatLngTuple; setCenter: any; autoLocate: any }) {
  //
  //
  const map = useMapEvents({
    locationfound(e) {
      setCenter([e.latlng?.lat, e.latlng?.lng]);
      map.flyTo(new L.LatLng(e.latlng?.lat, e.latlng?.lng), 15);
    },
    moveend(e) {
      const c = map.getCenter();
      setCenter([c.lat, c.lng]);
    },
    locationerror(e) {
      console.log("LocErr:", e);
      toast.error("خطا در دریافت موقعیت");
    },
  });

  useEffect(() => {
    if (center) {
      map.panTo(new L.LatLng(center[0], center[1]));
    }
  }, [center]);

  const mapLocate = () => {
    map.locate();
  };
  useEffect(() => {
    if (autoLocate) mapLocate();
  }, [autoLocate]);

  const locateToMarker = () => {
    map.flyTo(new L.LatLng(marker[0], marker[1]), 15);
  };

  return (
    <>
      <div
        //
        onClick={mapLocate}
        className="absolute bottom-1 left-1 z-[9999] rounded bg-orange-500 p-2 font-bold text-white"
      >
        موقعیت من
      </div>
      {isSelected && (
        <div
          //
          onClick={locateToMarker}
          className="absolute bottom-11 left-1 z-[9999] rounded bg-green-500 p-2 font-bold text-white"
        >
          موقعیت ثبت شده
        </div>
      )}
    </>
  );
}

function DraggableMarker({ location, setLocation, isSelected, disabled }: { location: L.LatLngTuple; setLocation: any; isSelected?: boolean; disabled?: boolean }) {
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );

  const markerIcon = new L.Icon({
    iconUrl: isSelected ? "/assets/icons/marker-selected.svg" : "/assets/icons/marker.svg",
    iconRetinaUrl: isSelected ? "/assets/icons/marker-selected.svg" : "/assets/icons/marker.svg",
    iconSize: new L.Point(60, 75),
    // className: "leaflet-div-icon",
  });

  return (
    <Marker
      //
      icon={markerIcon}
      draggable={!disabled}
      eventHandlers={eventHandlers}
      position={{ lat: location[0], lng: location[1] }}
      ref={markerRef}
    />
  );
}
