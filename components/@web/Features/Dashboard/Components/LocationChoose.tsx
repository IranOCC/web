import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePokemonList } from "@/hooks/useGetList";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Input, Select, SelectItem, Selection } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import Mapir from "mapir-react-typescript";
import React from "react";
import { Key, useState, useEffect } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

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

export const LocationChoose = ({ control }: { control: Control<EstateFormData, any> }) => {
  const [province, setProvince] = useState<Selection>(new Set([]));
  const [center, setCenter] = useState([36.699735, 51.196246]);
  return (
    <>
      <div className="relative min-h-[15rem] overflow-hidden">
        <div className="absolute h-full w-full overflow-hidden rounded-lg">
          <Controller
            render={({ field }) => {
              async function setMarkerAndAddress(data: number[]) {
                // if (loading || readOnly || disabled) return;
                field.onChange([data[1], data[0]].join(","));
                setCenter([data[0], data[1]]);

                const url = `https://map.ir/reverse/no?lat=${data[1]}&lon=${data[0]}`;
                const response = await fetch(url, {
                  headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
                });
                const _data = await response.json();
                // getAddress(_data);
              }

              // convert to array
              let value: number[] | null = null;
              if (!!field.value) {
                const m = (field.value as string).split(",").map((v: string) => +v);
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
                    onClick={(m: any, e: any) => setMarkerAndAddress([e.lngLat.lng, e.lngLat.lat])}
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
                </>
              );
            }}
            name="location"
            control={control}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <LocationProvince setProvince={setProvince} />
        <LocationCity province={province} />
        <Input
          //
          className="col-span-1"
          type="text"
          variant="faded"
          label="منطقه"
          maxLength={200}
        />
        <Input
          //
          className="col-span-1"
          type="text"
          variant="faded"
          label="محله"
          maxLength={200}
        />
        <Input
          //
          className="col-span-1"
          type="text"
          variant="faded"
          label="کوچه"
          maxLength={200}
        />
        <Input
          //
          className="col-span-full"
          type="text"
          variant="faded"
          label="آدرس"
          maxLength={200}
        />
      </div>
    </>
  );
};

const LocationProvince = ({ setProvince }: { setProvince: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/static/province", {});
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, []);

  return (
    <Select
      //
      isLoading={loading}
      items={[data[23], data[25], data[26]]}
      label="استان"
      placeholder="استان را انتخاب کنید"
      selectionMode="single"
      variant="faded"
      classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
      onSelectionChange={setProvince}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};

const LocationCity = ({ province }: { province?: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/static/city", { params: { filter: { province: province?.currentKey } } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [province]);

  return (
    <Select
      //
      isLoading={loading}
      items={data}
      label="شهر"
      placeholder="شهر را انتخاب کنید"
      selectionMode="single"
      variant="faded"
      classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};
