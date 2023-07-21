"use client";

import "@/assets/css/map.css";
import Mapir from "mapir-react-typescript";
import { useEffect, useState } from "react";

const MapEstate = () => {
  const API_KEY =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1NTg4YzVkM2I3YjFjYWU0NWE2OWNjZTM4ZjU3ZTdmN2U1Yjg4YTkxNWMwM2JhOTdiYWJlZWI4OWE2NDMxNDg1Nzc4YTYyNGQ0ZDMwMTc5In0.eyJhdWQiOiI5OTk2IiwianRpIjoiZDU1ODhjNWQzYjdiMWNhZTQ1YTY5Y2NlMzhmNTdlN2Y3ZTViODhhOTE1YzAzYmE5N2JhYmVlYjg5YTY0MzE0ODU3NzhhNjI0ZDRkMzAxNzkiLCJpYXQiOjE1OTQyMDM0MzMsIm5iZiI6MTU5NDIwMzQzMywiZXhwIjoxNTk2Nzk1NDMzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.RfZI-G-vJsKB8AaAXLtoR93ilorPnOWqEkGnap18EVEOoiWsFwuQaxSpNzYrzSbPeskmo68FdWvfrfcS0IaXvtU2rwI3D1udVrUlz5oDD_Z7NJMB-Dm9qY6mWC2OTsaTyTgNJ2ZC2q8ZK1aTdoEWUv27QrAsYEu_thQgTvSIPn0RoSFwMa-MHH6v7ATGTFY8MNdrazi2VdvTSR49REcssAn5iNjxFX7C9XLwltOA3VKTtCjY6MjkeVOhVrc2Bgo1QDukFTNSWGiEX0nSm1xKAs-OIXRKxvmmt9Sm6lcaT_2WbyPVn6Mo3aO7AjjhtxPjQZZk1PKtFwRH4r-JJdY2SA";

  useEffect(() => {
    //
    // setTimeout
  }, []);

  const Map = Mapir.setToken({
    accessToken: API_KEY,
    // transformRequest: (url: string) => {
    //   return {
    //     url: url,
    //     headers: {
    //       "x-api-key": API_KEY,
    //       "Mapir-SDK": "reactjs",
    //     },
    //   };
    // },
  });

  return (
    <>
      <div className="relative z-10 h-full w-full overflow-hidden bg-white p-2 ps-0">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-purple-400 rounded-s-none">
          {/*
           <Mapir
            //
            Map={Map}
            center={[51.42, 35.71]}
          ></Mapir>
           */}
        </div>
      </div>
    </>
  );
};

export default MapEstate;
