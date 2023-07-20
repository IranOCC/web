import "@/assets/css/map.css";
import { Controller } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import Mapir from "mapir-react-typescript";
import { Search } from "@mui/icons-material";

const API_KEY = process.env.NEXT_PUBLIC_MAPIR_TOKEN || "";

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

const MapEstate = (props: IProps) => {
  const {} = props;

  return (
    <>
      <div className="relative z-10 w-full">
        <Mapir
          //
          Map={Map}
          // center={center}
          zoom={[16]}
          userLocation
          className="!h-full !w-full overflow-hidden"
          // onClick={(m: any, e: any) => setMarkerAndAddress([e.lngLat.lng, e.lngLat.lat])}
          interactive
          hash
        >
          {/* zoom */}
          <Mapir.ZoomControl position="top-left" />
          {/* marker */}
          {/* {!!value && (
                      <Mapir.Marker
                        //
                        coordinates={value}
                        anchor="bottom"
                        Image={"https://map.ir/css/images/marker-default-yellow.svg"}
                      />
                    )} */}
        </Mapir>
      </div>
    </>
  );
};

export default MapEstate;

export type IProps = {};
