"use client";
import "@/assets/css/map.css";

import Mapir from "mapir-react-component";
import { useState } from "react";

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

export default function Page() {
  const [center, setCenter] = useState([51.42, 35.72]);
  const [position, setPosition] = useState<string | undefined>(undefined);

  async function reverseFunction(map: any, e: any) {
    const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    });
    const data = await response.json();
    console.log(data);
    setPosition([e.lngLat.lng, e.lngLat.lat].join(","));
  }

  // convert to array
  let value: number[] | null = null;
  if (!!position) {
    const m = position.split(",").map((v: string) => +v);
    value = [m[0], m[1]];
  }
  return (
    <>
      <div>
        <Mapir
          //
          Map={Map}
          center={center}
          userLocation
          className={" !h-96 !w-full overflow-hidden rounded"}
          onClick={reverseFunction}
        >
          {/* zoom */}
          <Mapir.ZoomControl position="top-left" />
          {/* marker */}
          <Mapir.Marker
            //
            coordinates={value || center}
            anchor="bottom"
          />
          {/* {markerArray} */}
        </Mapir>
      </div>
    </>
  );
}
