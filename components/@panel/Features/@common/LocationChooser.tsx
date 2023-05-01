import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Controller } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import L from "leaflet";
const LocationChooser = (props: IProps) => {
  const { name, control, defaultValue = [35.7219, 51.3347, 12], containerClassName = "", className = "", noSpace, loading, disabled, readOnly, error, warning, success } = props;
  let { status, helperText } = props;

  return (
    <>
      <div className={"w-full relative z-10" + (noSpace ? " mb-0" : " mb-6") + " " + containerClassName}>
        <div className="w-full relative">
          <Controller
            render={({ field }) => {
              return (
                <>
                  <MapContainer
                    //
                    center={[field.value[0], field.value[1]]}
                    zoom={field.value[2]}
                    scrollWheelZoom={false}
                    style={{ height: 300, width: "100%" }}
                    className={className}
                  >
                    <TileLayer
                      //
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <LocationEvent
                      //
                      setLocation={(data: [number, number]) => field.onChange([...data, 13])}
                      location={field.value}
                    /> */}
                  </MapContainer>
                </>
              );
            }}
            defaultValue={defaultValue}
            name={name}
            control={control}
          />
        </div>
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

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;

  status?: "success" | "error" | "warning";
  helperText?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
};

// function LocationEvent({ location, setLocation }: { location: [number, number, number]; setLocation: any }) {
//   useEffect(() => {
//     map.locate();
//   }, []);

//   //   useEffect(() => {
//   //     map.addHandler().forEach(function (handler: any) {
//   //       if (disabled) handler.disable();
//   //       else handler.enable();
//   //     });
//   //   }, [disabled]);

//   useEffect(() => {
//     if (location) {
//       map.panTo(new L.LatLng(location[0], location[1]));
//     }
//   }, [location]);

//   const map = useMapEvents({
//     locationfound(e) {
//       setLocation([e.latlng?.lat, e.latlng?.lng]);
//     },
//     moveend(e) {
//       const c = map.getCenter();
//       setLocation([c.lat, c.lng]);
//     },
//   });
//   return null;
// }
